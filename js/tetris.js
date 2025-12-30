// Tetris Game
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { initializeApprovalNotifications } from './notification-system.js';
// Badge checking will be imported dynamically

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

// Credit cost for Tetris
const TETRIS_CREDIT_COST = 5;

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
        // Get current balance
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
        
        if (!creditData || creditData.balance < TETRIS_CREDIT_COST) {
            return { success: false, message: 'Insufficient credits' };
        }
        
        const newBalance = creditData.balance - TETRIS_CREDIT_COST;
        
        // Update balance
        const { error: updateError } = await supabase
            .from('User_Credits')
            .update({ balance: newBalance, updated_at: new Date().toISOString() })
            .eq('credit_id', creditData.credit_id);
        
        if (updateError) throw updateError;
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: userUid,
                amount: TETRIS_CREDIT_COST,
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
    return `You have ${balance} credit(s) remaining. You need ${TETRIS_CREDIT_COST} credits to play. Please contact an admin to add more credits.`;
}

// Tetris pieces (Tetrominoes)
const PIECES = [
    // I piece
    [
        [[1,1,1,1]]
    ],
    // O piece
    [
        [[1,1],[1,1]]
    ],
    // T piece
    [
        [[0,1,0],[1,1,1]],
        [[1,0],[1,1],[1,0]],
        [[1,1,1],[0,1,0]],
        [[0,1],[1,1],[0,1]]
    ],
    // S piece
    [
        [[0,1,1],[1,1,0]],
        [[1,0],[1,1],[0,1]]
    ],
    // Z piece
    [
        [[1,1,0],[0,1,1]],
        [[0,1],[1,1],[1,0]]
    ],
    // J piece
    [
        [[1,0,0],[1,1,1]],
        [[1,1],[1,0],[1,0]],
        [[1,1,1],[0,0,1]],
        [[0,1],[0,1],[1,1]]
    ],
    // L piece
    [
        [[0,0,1],[1,1,1]],
        [[1,0],[1,0],[1,1]],
        [[1,1,1],[1,0,0]],
        [[1,1],[0,1],[0,1]]
    ]
];

const COLORS = ['#00f0f0', '#f0f000', '#a000f0', '#00f000', '#f00000', '#0000f0', '#f0a000'];

class TetrisGame {
    constructor() {
        this.canvas = document.getElementById('tetrisCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextPieceCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        // Resize canvas to fit container
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 20;
        this.BLOCK_SIZE = this.canvas.width / this.BOARD_WIDTH;
        
        this.board = Array(this.BOARD_HEIGHT).fill(null).map(() => Array(this.BOARD_WIDTH).fill(0));
        this.currentPiece = null;
        this.nextPiece = null;
        this.currentX = 0;
        this.currentY = 0;
        this.currentRotation = 0;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameStartTime = null;
        this.dropTime = 0;
        this.dropInterval = 1000; // milliseconds
        this.lastTime = 0;
        
        this.init();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        const maxWidth = Math.min(containerWidth - 20, 400);
        const width = Math.max(300, maxWidth);
        const height = width * 2; // Maintain 1:2 aspect ratio
        
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
        this.leftBtn = document.getElementById('leftBtn');
        this.rightBtn = document.getElementById('rightBtn');
        this.rotateBtn = document.getElementById('rotateBtn');
        this.downBtn = document.getElementById('downBtn');
        this.dropBtn = document.getElementById('dropBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.linesDisplay = document.getElementById('linesDisplay');
        this.gameMessage = document.getElementById('gameMessage');
        
        // Event listeners
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.leftBtn.addEventListener('click', () => this.moveLeft());
        this.rightBtn.addEventListener('click', () => this.moveRight());
        this.rotateBtn.addEventListener('click', () => this.rotate());
        this.downBtn.addEventListener('click', () => this.moveDown());
        this.dropBtn.addEventListener('click', () => this.hardDrop());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Wait for auth
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
            
            // Initialize notifications
            initializeApprovalNotifications();
        } catch (error) {
            console.error('Error checking access:', error);
            window.location.href = getPagePath('login.html');
        }
    }
    
    async startGame() {
        if (this.gameRunning) return;
        
        // Check and deduct credits before starting (skip for admins)
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid, TETRIS_CREDIT_COST);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
            
            // Deduct credit when game begins
            const deductResult = await deductCredits(session.uid, 'tetris');
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
        this.lines = 0;
        this.dropInterval = 1000;
        this.board = Array(this.BOARD_HEIGHT).fill(null).map(() => Array(this.BOARD_WIDTH).fill(0));
        
        this.startBtn.classList.add('hidden');
        this.resetBtn.classList.remove('hidden');
        this.hideMessage();
        
        this.spawnPiece();
        this.gameLoop(0);
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.board = Array(this.BOARD_HEIGHT).fill(null).map(() => Array(this.BOARD_WIDTH).fill(0));
        this.currentPiece = null;
        this.nextPiece = null;
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
            this.gameLoop(performance.now());
        } else {
            this.showMessage('Game Paused', 'paused');
        }
    }
    
    spawnPiece() {
        if (!this.nextPiece) {
            this.nextPiece = {
                shape: PIECES[Math.floor(Math.random() * PIECES.length)],
                color: COLORS[Math.floor(Math.random() * COLORS.length)]
            };
        }
        
        this.currentPiece = this.nextPiece;
        this.nextPiece = {
            shape: PIECES[Math.floor(Math.random() * PIECES.length)],
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
        
        this.currentRotation = 0;
        this.currentX = Math.floor(this.BOARD_WIDTH / 2) - 1;
        this.currentY = 0;
        
        // Check game over
        if (this.isCollision(this.currentPiece.shape[this.currentRotation], this.currentX, this.currentY)) {
            this.gameOver();
        }
        
        this.drawNextPiece();
    }
    
    isCollision(shape, x, y) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const newX = x + col;
                    const newY = y + row;
                    
                    if (newX < 0 || newX >= this.BOARD_WIDTH || 
                        newY >= this.BOARD_HEIGHT ||
                        (newY >= 0 && this.board[newY][newX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    placePiece() {
        const shape = this.currentPiece.shape[this.currentRotation];
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const y = this.currentY + row;
                    const x = this.currentX + col;
                    if (y >= 0) {
                        this.board[y][x] = this.currentPiece.color;
                    }
                }
            }
        }
        
        this.clearLines();
        this.spawnPiece();
    }
    
    clearLines() {
        let linesCleared = 0;
        for (let row = this.BOARD_HEIGHT - 1; row >= 0; row--) {
            if (this.board[row].every(cell => cell !== 0)) {
                this.board.splice(row, 1);
                this.board.unshift(Array(this.BOARD_WIDTH).fill(0));
                linesCleared++;
                row++; // Check same row again
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            // Score: 100 * lines^2 * level
            this.score += 100 * linesCleared * linesCleared * this.level;
            
            // Level up every 10 lines
            const newLevel = Math.floor(this.lines / 10) + 1;
            if (newLevel > this.level) {
                this.level = newLevel;
                this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
            }
            
            this.updateDisplay();
        }
    }
    
    moveLeft() {
        if (!this.gameRunning || this.gamePaused) return;
        const shape = this.currentPiece.shape[this.currentRotation];
        if (!this.isCollision(shape, this.currentX - 1, this.currentY)) {
            this.currentX--;
            this.draw();
        }
    }
    
    moveRight() {
        if (!this.gameRunning || this.gamePaused) return;
        const shape = this.currentPiece.shape[this.currentRotation];
        if (!this.isCollision(shape, this.currentX + 1, this.currentY)) {
            this.currentX++;
            this.draw();
        }
    }
    
    moveDown() {
        if (!this.gameRunning || this.gamePaused) return;
        const shape = this.currentPiece.shape[this.currentRotation];
        if (!this.isCollision(shape, this.currentX, this.currentY + 1)) {
            this.currentY++;
            this.draw();
        } else {
            this.placePiece();
        }
    }
    
    rotate() {
        if (!this.gameRunning || this.gamePaused) return;
        const nextRotation = (this.currentRotation + 1) % this.currentPiece.shape.length;
        const shape = this.currentPiece.shape[nextRotation];
        
        // Try to rotate, with wall kicks
        let offsetX = 0;
        if (this.isCollision(shape, this.currentX, this.currentY)) {
            // Try moving left
            if (!this.isCollision(shape, this.currentX - 1, this.currentY)) {
                offsetX = -1;
            }
            // Try moving right
            else if (!this.isCollision(shape, this.currentX + 1, this.currentY)) {
                offsetX = 1;
            } else {
                return; // Can't rotate
            }
        }
        
        this.currentRotation = nextRotation;
        this.currentX += offsetX;
        this.draw();
    }
    
    hardDrop() {
        if (!this.gameRunning || this.gamePaused) return;
        const shape = this.currentPiece.shape[this.currentRotation];
        while (!this.isCollision(shape, this.currentX, this.currentY + 1)) {
            this.currentY++;
        }
        this.placePiece();
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.moveLeft();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.moveRight();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveDown();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.rotate();
                break;
            case ' ':
                e.preventDefault();
                this.hardDrop();
                break;
            case 'p':
            case 'P':
                this.togglePause();
                break;
        }
    }
    
    gameLoop(time) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        
        if (this.dropTime > this.dropInterval) {
            this.moveDown();
            this.dropTime = 0;
        } else {
            this.dropTime += deltaTime;
        }
        
        this.draw();
        requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw board
        for (let row = 0; row < this.BOARD_HEIGHT; row++) {
            for (let col = 0; col < this.BOARD_WIDTH; col++) {
                if (this.board[row][col]) {
                    this.ctx.fillStyle = this.board[row][col];
                    this.ctx.fillRect(
                        col * this.BLOCK_SIZE,
                        row * this.BLOCK_SIZE,
                        this.BLOCK_SIZE - 1,
                        this.BLOCK_SIZE - 1
                    );
                }
            }
        }
        
        // Draw current piece
        if (this.currentPiece && this.gameRunning) {
            const shape = this.currentPiece.shape[this.currentRotation];
            this.ctx.fillStyle = this.currentPiece.color;
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        const x = (this.currentX + col) * this.BLOCK_SIZE;
                        const y = (this.currentY + row) * this.BLOCK_SIZE;
                        if (y >= 0) {
                            this.ctx.fillRect(x, y, this.BLOCK_SIZE - 1, this.BLOCK_SIZE - 1);
                        }
                    }
                }
            }
        }
    }
    
    drawNextPiece() {
        this.nextCtx.fillStyle = '#000';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (this.nextPiece) {
            const shape = this.nextPiece.shape[0];
            const blockSize = 20;
            const offsetX = (this.nextCanvas.width - shape[0].length * blockSize) / 2;
            const offsetY = (this.nextCanvas.height - shape.length * blockSize) / 2;
            
            this.nextCtx.fillStyle = this.nextPiece.color;
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        this.nextCtx.fillRect(
                            offsetX + col * blockSize,
                            offsetY + row * blockSize,
                            blockSize - 1,
                            blockSize - 1
                        );
                    }
                }
            }
        }
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score.toLocaleString();
        this.levelDisplay.textContent = this.level;
        this.linesDisplay.textContent = this.lines;
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
            
            // Check for badges
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
                .from('tetris_scores')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    level: this.level,
                    lines_cleared: this.lines,
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
    new TetrisGame();
});

