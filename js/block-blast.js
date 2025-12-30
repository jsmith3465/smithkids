// Block Blast Game
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { initializeApprovalNotifications } from './notification-system.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

// Credit cost for Block Blast
const BLOCK_BLAST_CREDIT_COST = 5;

// Check if user has enough credits
async function checkCredits(userUid, cost) {
    try {
        const { data, error } = await supabase
            .from('User_Credits')
            .select('balance')
            .eq('user_uid', userUid)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error checking credits:', error);
            return { hasCredits: false, balance: 0 };
        }
        
        const balance = data ? data.balance : 0;
        return { hasCredits: balance >= cost, balance: balance };
    } catch (error) {
        console.error('Error checking credits:', error);
        return { hasCredits: false, balance: 0 };
    }
}

// Deduct credits for a game
async function deductCredits(userUid, gameType, gameId = null) {
    try {
        const { data: creditData, error: fetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userUid)
            .single();
        
        if (fetchError) {
            if (fetchError.code === 'PGRST116') {
                return { success: false, message: 'Insufficient credits' };
            }
            throw fetchError;
        }
        
        if (!creditData || creditData.balance < BLOCK_BLAST_CREDIT_COST) {
            return { success: false, message: 'Insufficient credits' };
        }
        
        const newBalance = creditData.balance - BLOCK_BLAST_CREDIT_COST;
        
        const { error: updateError } = await supabase
            .from('User_Credits')
            .update({ balance: newBalance, updated_at: new Date().toISOString() })
            .eq('credit_id', creditData.credit_id);
        
        if (updateError) throw updateError;
        
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: userUid,
                amount: BLOCK_BLAST_CREDIT_COST,
                transaction_type: 'game_payment',
                game_type: gameType,
                game_id: gameId,
                description: `Played ${gameType.replace('_', ' ')}`
            });
        
        if (transError) throw transError;
        
        return { success: true, newBalance: newBalance };
    } catch (error) {
        console.error('Error deducting credits:', error);
        return { success: false, message: 'Error processing payment' };
    }
}

function showCreditWarning(balance) {
    return `You have ${balance} credit(s) remaining. You need ${BLOCK_BLAST_CREDIT_COST} credits to play. Please contact an admin to add more credits.`;
}

// Block colors
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

class BlockBlastGame {
    constructor() {
        this.canvas = document.getElementById('blockBlastCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Resize canvas to fit container
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 15;
        this.BLOCK_SIZE = this.canvas.width / this.BOARD_WIDTH;
        
        this.board = [];
        this.score = 0;
        this.level = 1;
        this.blocksCleared = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameStartTime = null;
        this.selectedBlocks = [];
        this.blocksToRemove = [];
        this.animationFrame = 0;
        
        this.init();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        const maxWidth = Math.min(containerWidth - 20, 600);
        const width = Math.max(400, maxWidth);
        const height = Math.round(width * 1.5); // Maintain 2:3 aspect ratio
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.BLOCK_SIZE = this.canvas.width / this.BOARD_WIDTH;
        
        if (this.gameRunning) {
            this.draw();
        }
    }
    
    init() {
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.blocksDisplay = document.getElementById('blocksDisplay');
        this.gameMessage = document.getElementById('gameMessage');
        
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'P') {
                this.togglePause();
            }
        });
        
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    this.checkUserAccess();
                }
            }, 100);
        }, 100);
    }
    
    async checkUserAccess() {
        const authCheck = document.getElementById('authCheck');
        const mainContent = document.getElementById('mainContent');
        
        try {
            const session = window.authStatus?.getSession();
            if (!session || !session.uid) {
                window.location.href = getPagePath('login.html');
                return;
            }
            
            authCheck.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            initializeApprovalNotifications();
        } catch (error) {
            console.error('Error checking access:', error);
            window.location.href = getPagePath('login.html');
        }
    }
    
    generateBoard() {
        this.board = [];
        for (let row = 0; row < this.BOARD_HEIGHT; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.BOARD_WIDTH; col++) {
                this.board[row][col] = Math.floor(Math.random() * COLORS.length);
            }
        }
    }
    
    async startGame() {
        if (this.gameRunning) return;
        
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid, BLOCK_BLAST_CREDIT_COST);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
            
            const deductResult = await deductCredits(session.uid, 'block_blast');
            if (!deductResult.success) {
                alert('Unable to process payment. Please try again.');
                return;
            }
        }
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameStartTime = Date.now();
        this.score = 0;
        this.level = 1;
        this.blocksCleared = 0;
        this.startBtn.classList.add('hidden');
        this.resetBtn.classList.remove('hidden');
        this.hideMessage();
        
        this.generateBoard();
        this.updateDisplay();
        this.draw();
        this.checkGameOver();
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.level = 1;
        this.blocksCleared = 0;
        this.selectedBlocks = [];
        this.blocksToRemove = [];
        this.startBtn.classList.remove('hidden');
        this.resetBtn.classList.add('hidden');
        this.hideMessage();
        this.updateDisplay();
        this.draw();
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused) {
            this.hideMessage();
            this.draw();
        } else {
            this.showMessage('Game Paused', 'paused');
        }
    }
    
    handleClick(e) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const col = Math.floor(x / this.BLOCK_SIZE);
        const row = Math.floor(y / this.BLOCK_SIZE);
        
        if (row >= 0 && row < this.BOARD_HEIGHT && col >= 0 && col < this.BOARD_WIDTH) {
            this.selectBlock(row, col);
        }
    }
    
    selectBlock(row, col) {
        if (this.board[row][col] === -1) return; // Empty cell
        
        const color = this.board[row][col];
        const connected = this.findConnectedBlocks(row, col, color);
        
        if (connected.length >= 2) {
            this.removeBlocks(connected);
        }
    }
    
    findConnectedBlocks(startRow, startCol, color) {
        const visited = Array(this.BOARD_HEIGHT).fill(null).map(() => Array(this.BOARD_WIDTH).fill(false));
        const connected = [];
        const stack = [[startRow, startCol]];
        
        while (stack.length > 0) {
            const [row, col] = stack.pop();
            
            if (row < 0 || row >= this.BOARD_HEIGHT || col < 0 || col >= this.BOARD_WIDTH) continue;
            if (visited[row][col]) continue;
            if (this.board[row][col] !== color) continue;
            
            visited[row][col] = true;
            connected.push([row, col]);
            
            // Check neighbors
            stack.push([row - 1, col]);
            stack.push([row + 1, col]);
            stack.push([row, col - 1]);
            stack.push([row, col + 1]);
        }
        
        return connected;
    }
    
    removeBlocks(blocks) {
        // Calculate score
        const blockCount = blocks.length;
        let points = 0;
        if (blockCount === 2) points = 10;
        else if (blockCount === 3) points = 30;
        else points = 50 * blockCount;
        
        this.score += points;
        this.blocksCleared += blockCount;
        
        // Remove blocks
        blocks.forEach(([row, col]) => {
            this.board[row][col] = -1;
        });
        
        // Drop blocks
        this.dropBlocks();
        
        // Check level up
        const blocksNeededForLevel = this.level * 50;
        if (this.blocksCleared >= blocksNeededForLevel) {
            this.level++;
        }
        
        this.updateDisplay();
        this.draw();
        this.checkGameOver();
    }
    
    dropBlocks() {
        // Drop blocks down
        for (let col = 0; col < this.BOARD_WIDTH; col++) {
            let writeIndex = this.BOARD_HEIGHT - 1;
            for (let row = this.BOARD_HEIGHT - 1; row >= 0; row--) {
                if (this.board[row][col] !== -1) {
                    if (writeIndex !== row) {
                        this.board[writeIndex][col] = this.board[row][col];
                        this.board[row][col] = -1;
                    }
                    writeIndex--;
                }
            }
        }
        
        // Shift columns left
        let writeCol = 0;
        for (let col = 0; col < this.BOARD_WIDTH; col++) {
            let hasBlocks = false;
            for (let row = 0; row < this.BOARD_HEIGHT; row++) {
                if (this.board[row][col] !== -1) {
                    hasBlocks = true;
                    break;
                }
            }
            
            if (hasBlocks) {
                if (writeCol !== col) {
                    for (let row = 0; row < this.BOARD_HEIGHT; row++) {
                        this.board[row][writeCol] = this.board[row][col];
                        this.board[row][col] = -1;
                    }
                }
                writeCol++;
            }
        }
    }
    
    checkGameOver() {
        // Check if there are any valid moves
        for (let row = 0; row < this.BOARD_HEIGHT; row++) {
            for (let col = 0; col < this.BOARD_WIDTH; col++) {
                if (this.board[row][col] === -1) continue;
                
                const color = this.board[row][col];
                const connected = this.findConnectedBlocks(row, col, color);
                if (connected.length >= 2) {
                    return; // Still has moves
                }
            }
        }
        
        // No moves available
        this.gameOver();
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        for (let row = 0; row <= this.BOARD_HEIGHT; row++) {
            const y = row * this.BLOCK_SIZE;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        for (let col = 0; col <= this.BOARD_WIDTH; col++) {
            const x = col * this.BLOCK_SIZE;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Draw blocks
        for (let row = 0; row < this.BOARD_HEIGHT; row++) {
            for (let col = 0; col < this.BOARD_WIDTH; col++) {
                if (this.board[row][col] === -1) continue;
                
                const x = col * this.BLOCK_SIZE;
                const y = row * this.BLOCK_SIZE;
                const color = COLORS[this.board[row][col]];
                
                // Draw block
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x + 2, y + 2, this.BLOCK_SIZE - 4, this.BLOCK_SIZE - 4);
                
                // Draw border
                this.ctx.strokeStyle = '#333';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x + 2, y + 2, this.BLOCK_SIZE - 4, this.BLOCK_SIZE - 4);
            }
        }
        
        // Highlight selected blocks
        if (this.selectedBlocks.length > 0) {
            this.ctx.strokeStyle = '#FFFF00';
            this.ctx.lineWidth = 3;
            this.selectedBlocks.forEach(([row, col]) => {
                const x = col * this.BLOCK_SIZE;
                const y = row * this.BLOCK_SIZE;
                this.ctx.strokeRect(x + 1, y + 1, this.BLOCK_SIZE - 2, this.BLOCK_SIZE - 2);
            });
        }
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score.toLocaleString();
        this.levelDisplay.textContent = this.level;
        this.blocksDisplay.textContent = this.blocksCleared;
    }
    
    showMessage(text, type) {
        this.gameMessage.textContent = text;
        this.gameMessage.className = `game-message ${type}`;
        this.gameMessage.classList.remove('hidden');
    }
    
    hideMessage() {
        this.gameMessage.classList.add('hidden');
    }
    
    async gameOver() {
        this.gameRunning = false;
        this.showMessage('Game Over!', 'game-over');
        this.startBtn.classList.remove('hidden');
        this.resetBtn.classList.add('hidden');
        
        const session = window.authStatus?.getSession();
        if (session && session.uid) {
            await this.saveScore();
            
            try {
                const { checkAllBadges } = await import('./badge-checker.js');
                await checkAllBadges(session.uid, 'game_completed');
            } catch (error) {
                console.error('Error checking badges:', error);
            }
        }
    }
    
    async saveScore() {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found');
            return;
        }
        
        try {
            const gameDuration = this.gameStartTime ? Math.floor((Date.now() - this.gameStartTime) / 1000) : 0;
            
            const { error } = await supabase
                .from('block_blast_scores')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    level: this.level,
                    blocks_cleared: this.blocksCleared,
                    game_duration_seconds: gameDuration
                });
            
            if (error) {
                console.error('Error saving game result:', error);
            } else {
                console.log('Game result saved successfully');
            }
        } catch (error) {
            console.error('Error saving game result:', error);
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BlockBlastGame();
});

