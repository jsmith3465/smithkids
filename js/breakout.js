// Breakout Game
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

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

// Credit cost for Breakout
const BREAKOUT_CREDIT_COST = 2;

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
        
        if (!creditData || creditData.balance < BREAKOUT_CREDIT_COST) {
            return { success: false, message: 'Insufficient credits' };
        }
        
        const newBalance = creditData.balance - BREAKOUT_CREDIT_COST;
        
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
                amount: BREAKOUT_CREDIT_COST,
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
    return `You have ${balance} credit(s) remaining. You need ${BREAKOUT_CREDIT_COST} credits to play. Please contact an admin to add more credits.`;
}

class BreakoutGame {
    constructor() {
        this.canvas = document.getElementById('breakoutCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.paddle = {
            x: this.canvas.width / 2 - 50,
            y: this.canvas.height - 30,
            width: 100,
            height: 10,
            speed: 5
        };
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            radius: 8,
            dx: 3,
            dy: -3,
            speed: 3
        };
        this.bricks = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        this.keys = {};
        this.gameStartTime = null;
        this.brickRows = 5;
        this.brickCols = 10;
        this.brickWidth = 55;
        this.brickHeight = 20;
        this.brickPadding = 5;
        this.brickOffsetTop = 50;
        this.brickOffsetLeft = 30;
        
        this.initBricks();
        this.setupEventListeners();
    }
    
    initBricks() {
        this.bricks = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
        
        for (let row = 0; row < this.brickRows; row++) {
            for (let col = 0; col < this.brickCols; col++) {
                const brickX = col * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = row * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                
                this.bricks.push({
                    x: brickX,
                    y: brickY,
                    width: this.brickWidth,
                    height: this.brickHeight,
                    color: colors[row % colors.length],
                    points: (this.brickRows - row) * 10,
                    visible: true
                });
            }
        }
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.keys['left'] = true;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.keys['right'] = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.keys['left'] = false;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.keys['right'] = false;
            }
        });
        
        // Button controls
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        
        leftBtn.addEventListener('mousedown', () => { this.keys['left'] = true; });
        leftBtn.addEventListener('mouseup', () => { this.keys['left'] = false; });
        leftBtn.addEventListener('mouseleave', () => { this.keys['left'] = false; });
        leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys['left'] = true; });
        leftBtn.addEventListener('touchend', () => { this.keys['left'] = false; });
        
        rightBtn.addEventListener('mousedown', () => { this.keys['right'] = true; });
        rightBtn.addEventListener('mouseup', () => { this.keys['right'] = false; });
        rightBtn.addEventListener('mouseleave', () => { this.keys['right'] = false; });
        rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys['right'] = true; });
        rightBtn.addEventListener('touchend', () => { this.keys['right'] = false; });
    }
    
    updatePaddle() {
        if (this.keys['left'] || this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
            this.paddle.x -= this.paddle.speed;
        }
        if (this.keys['right'] || this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
            this.paddle.x += this.paddle.speed;
        }
        
        // Keep paddle within canvas
        if (this.paddle.x < 0) {
            this.paddle.x = 0;
        }
        if (this.paddle.x + this.paddle.width > this.canvas.width) {
            this.paddle.x = this.canvas.width - this.paddle.width;
        }
    }
    
    updateBall() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
        
        // Ball collision with walls
        if (this.ball.x + this.ball.radius > this.canvas.width || this.ball.x - this.ball.radius < 0) {
            this.ball.dx = -this.ball.dx;
        }
        if (this.ball.y - this.ball.radius < 0) {
            this.ball.dy = -this.ball.dy;
        }
        
        // Ball collision with paddle
        if (this.ball.y + this.ball.radius > this.paddle.y &&
            this.ball.y - this.ball.radius < this.paddle.y + this.paddle.height &&
            this.ball.x + this.ball.radius > this.paddle.x &&
            this.ball.x - this.ball.radius < this.paddle.x + this.paddle.width) {
            
            // Calculate hit position on paddle (0 = left edge, 1 = right edge)
            const hitPos = (this.ball.x - this.paddle.x) / this.paddle.width;
            // Adjust angle based on where ball hits paddle
            const angle = (hitPos - 0.5) * Math.PI / 3; // Max 60 degrees
            const speed = Math.sqrt(this.ball.dx * this.ball.dx + this.ball.dy * this.ball.dy);
            this.ball.dx = Math.sin(angle) * speed;
            this.ball.dy = -Math.abs(Math.cos(angle) * speed);
            
            this.ball.y = this.paddle.y - this.ball.radius;
        }
        
        // Ball falls below paddle
        if (this.ball.y > this.canvas.height) {
            this.lives--;
            this.resetBall();
            if (this.lives <= 0) {
                this.gameOver();
            }
        }
        
        // Ball collision with bricks
        for (let brick of this.bricks) {
            if (brick.visible) {
                if (this.ball.x + this.ball.radius > brick.x &&
                    this.ball.x - this.ball.radius < brick.x + brick.width &&
                    this.ball.y + this.ball.radius > brick.y &&
                    this.ball.y - this.ball.radius < brick.y + brick.height) {
                    
                    brick.visible = false;
                    this.score += brick.points;
                    this.ball.dy = -this.ball.dy;
                    
                    // Check if all bricks are destroyed
                    if (this.bricks.every(b => !b.visible)) {
                        this.nextLevel();
                    }
                }
            }
        }
    }
    
    resetBall() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 50;
        this.ball.dx = 3 + (this.level - 1) * 0.5;
        this.ball.dy = -3 - (this.level - 1) * 0.5;
    }
    
    nextLevel() {
        this.level++;
        this.brickRows = Math.min(this.brickRows + 1, 8);
        this.initBricks();
        this.resetBall();
        this.paddle.x = this.canvas.width / 2 - 50;
        this.updateDisplay();
    }
    
    gameOver() {
        this.gameRunning = false;
        this.saveGameResult();
        this.showMessage('Game Over!', 'game-over');
        document.getElementById('startBtn').textContent = 'Play Again';
        document.getElementById('startBtn').classList.remove('hidden');
        document.getElementById('pauseBtn').classList.add('hidden');
    }
    
    showMessage(text, className) {
        const messageDiv = document.getElementById('gameMessage');
        messageDiv.textContent = text;
        messageDiv.className = `game-message ${className}`;
        messageDiv.style.display = 'block';
    }
    
    hideMessage() {
        const messageDiv = document.getElementById('gameMessage');
        messageDiv.style.display = 'none';
    }
    
    updateDisplay() {
        document.getElementById('scoreDisplay').textContent = this.score;
        document.getElementById('livesDisplay').textContent = this.lives;
        document.getElementById('levelDisplay').textContent = this.level;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw paddle
        this.ctx.fillStyle = '#DAA520';
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        this.ctx.strokeStyle = '#CC5500';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        
        // Draw ball
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#DAA520';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw bricks
        for (let brick of this.bricks) {
            if (brick.visible) {
                this.ctx.fillStyle = brick.color;
                this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            }
        }
    }
    
    gameLoop() {
        if (!this.gameRunning || this.gamePaused) {
            return;
        }
        
        this.updatePaddle();
        this.updateBall();
        this.updateDisplay();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    start() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gamePaused = false;
            this.gameStartTime = Date.now();
            this.hideMessage();
            document.getElementById('startBtn').classList.add('hidden');
            document.getElementById('pauseBtn').classList.remove('hidden');
            this.gameLoop();
        }
    }
    
    pause() {
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused) {
            this.gameLoop();
        }
        document.getElementById('pauseBtn').textContent = this.gamePaused ? 'Resume' : 'Pause';
    }
    
    reset() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.brickRows = 5;
        this.initBricks();
        this.resetBall();
        this.paddle.x = this.canvas.width / 2 - 50;
        this.updateDisplay();
        this.hideMessage();
    }
    
    async saveGameResult() {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found');
            return;
        }
        
        try {
            const gameDuration = this.gameStartTime ? Math.floor((Date.now() - this.gameStartTime) / 1000) : 0;
            const bricksDestroyed = this.bricks.filter(b => !b.visible).length;
            
            const { error } = await supabase
                .from('breakout_scores')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    level: this.level,
                    lives_remaining: this.lives,
                    bricks_destroyed: bricksDestroyed,
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
let game;

class BreakoutGameManager {
    constructor() {
        this.game = null;
        this.init();
    }
    
    init() {
        // Wait for auth
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    if (window.authStatus.isAuthenticated) {
                        this.setupGame();
                    } else {
                        window.location.href = getPagePath('login.html');
                    }
                }
            }, 100);
            
            setTimeout(() => {
                clearInterval(checkAuth);
                if (!window.authStatus) {
                    window.location.href = getPagePath('login.html');
                }
            }, 5000);
        }, 200);
    }
    
    async setupGame() {
        const session = window.authStatus?.getSession();
        if (!session) {
            window.location.href = getPagePath('login.html');
            return;
        }
        
        // Check credits before allowing game to start (skip for admins)
        if (session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid, BREAKOUT_CREDIT_COST);
            
            if (!creditCheck.hasCredits) {
                document.getElementById('authCheck').innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <h2>Insufficient Credits</h2>
                        <p>${showCreditWarning(creditCheck.balance)}</p>
                        <button class="btn btn-primary" onclick="window.location.href='${getPagePath('index.html')}'">Return to Home</button>
                    </div>
                `;
                return;
            }
        }
        
        document.getElementById('authCheck').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        
        // Initialize game
        this.game = new BreakoutGame();
        
        // Setup button event listeners
        document.getElementById('startBtn').addEventListener('click', async () => {
            if (!this.game.gameRunning) {
                // Deduct credits when starting a new game (skip for admins)
                if (session.userType !== 'admin') {
                    const deductResult = await deductCredits(session.uid, 'breakout');
                    if (!deductResult.success) {
                        alert(deductResult.message || 'Error processing payment. Please try again.');
                        return;
                    }
                }
                this.game.reset();
                this.game.start();
            } else {
                this.game.reset();
                this.game.start();
            }
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.game.pause();
        });
        
        // Instructions toggle
        const instructionsLink = document.getElementById('instructionsLink');
        const instructions = document.getElementById('instructions');
        const instructionsClose = document.getElementById('instructionsClose');
        
        if (instructionsLink && instructions && instructionsClose) {
            instructionsLink.addEventListener('click', (e) => {
                e.preventDefault();
                instructions.classList.add('show');
            });
            
            instructionsClose.addEventListener('click', () => {
                instructions.classList.remove('show');
            });
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    new BreakoutGameManager();
});

