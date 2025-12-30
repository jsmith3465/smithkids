// Galaga Game
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

// Credit cost for Galaga
const GALAGA_CREDIT_COST = 3;

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
        
        if (!creditData || creditData.balance < GALAGA_CREDIT_COST) {
            return { success: false, message: 'Insufficient credits' };
        }
        
        const newBalance = creditData.balance - GALAGA_CREDIT_COST;
        
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
                amount: GALAGA_CREDIT_COST,
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
    return `You have ${balance} credit(s) remaining. You need ${GALAGA_CREDIT_COST} credits to play. Please contact an admin to add more credits.`;
}

class GalagaGame {
    constructor() {
        this.canvas = document.getElementById('galagaCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Game state
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameStartTime = null;
        this.gameDuration = 0;
        this.enemiesDestroyed = 0;
        
        // Player
        this.player = {
            x: this.width / 2,
            y: this.height - 50,
            width: 40,
            height: 30,
            speed: 5
        };
        
        // Bullets
        this.bullets = [];
        this.bulletSpeed = 8;
        
        // Enemies
        this.enemies = [];
        this.enemyBullets = [];
        this.enemySpeed = 1;
        this.enemyShootInterval = 2000; // milliseconds
        this.lastEnemyShot = 0;
        
        // Input
        this.keys = {};
        this.mouseX = 0;
        this.usingMouse = false;
        
        this.init();
    }
    
    init() {
        // Wait for auth
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    if (window.authStatus.isAuthenticated) {
                        document.getElementById('authCheck').classList.add('hidden');
                        document.getElementById('mainContent').classList.remove('hidden');
                        this.setupGame();
                        
                        // Initialize approval notifications for standard users
                        const session = window.authStatus.getSession();
                        if (session && session.userType !== 'admin') {
                            initializeApprovalNotifications();
                        }
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
    
    setupGame() {
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.leftBtn = document.getElementById('leftBtn');
        this.rightBtn = document.getElementById('rightBtn');
        this.shootBtn = document.getElementById('shootBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.livesDisplay = document.getElementById('livesDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.gameMessage = document.getElementById('gameMessage');
        
        // Event listeners
        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.leftBtn.addEventListener('click', () => this.moveLeft());
        this.rightBtn.addEventListener('click', () => this.moveRight());
        this.shootBtn.addEventListener('click', () => this.shoot());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
                this.shoot();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        
        // Mouse controls
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.gameRunning && !this.gamePaused) {
                const rect = this.canvas.getBoundingClientRect();
                this.mouseX = e.clientX - rect.left;
                this.usingMouse = true;
            }
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.usingMouse = false;
        });
        
        this.canvas.addEventListener('click', () => {
            if (this.gameRunning && !this.gamePaused) {
                this.shoot();
            }
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
        
        // Initial draw
        this.draw();
    }
    
    async startGame() {
        if (this.gameRunning) return;
        
        // Check and deduct credits before starting (skip for admins)
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid, GALAGA_CREDIT_COST);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
            
            // Deduct credits when game begins
            const deductResult = await deductCredits(session.uid, 'galaga');
            if (!deductResult.success) {
                alert('Unable to process payment. Please try again.');
                return;
            }
        }
        
        // Reset game state
        this.gameRunning = true;
        this.gamePaused = false;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.bullets = [];
        this.enemyBullets = [];
        this.enemies = [];
        this.enemySpeed = 1;
        this.enemyShootInterval = 2000;
        this.gameStartTime = Date.now();
        this.gameDuration = 0;
        this.enemiesDestroyed = 0;
        
        // Reset player position
        this.player.x = this.width / 2;
        this.player.y = this.height - 50;
        
        // Create enemies
        this.createEnemies();
        
        // UI updates
        this.startBtn.classList.add('hidden');
        this.pauseBtn.classList.remove('hidden');
        this.gameMessage.innerHTML = '';
        this.gameMessage.className = '';
        
        this.updateDisplay();
        this.gameLoop();
    }
    
    createEnemies() {
        this.enemies = [];
        const rows = 4;
        const cols = 8;
        const spacing = 60;
        const startX = (this.width - (cols - 1) * spacing) / 2;
        const startY = 80;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.enemies.push({
                    x: startX + col * spacing,
                    y: startY + row * spacing,
                    width: 30,
                    height: 30,
                    speed: this.enemySpeed,
                    direction: 1,
                    alive: true
                });
            }
        }
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        this.pauseBtn.textContent = this.gamePaused ? 'Resume' : 'Pause';
        
        if (!this.gamePaused) {
            this.gameLoop();
        }
    }
    
    moveLeft() {
        if (this.gameRunning && !this.gamePaused) {
            this.usingMouse = false; // Switch to keyboard/button control
            this.player.x = Math.max(this.player.width / 2, this.player.x - this.player.speed);
        }
    }
    
    moveRight() {
        if (this.gameRunning && !this.gamePaused) {
            this.usingMouse = false; // Switch to keyboard/button control
            this.player.x = Math.min(this.width - this.player.width / 2, this.player.x + this.player.speed);
        }
    }
    
    shoot() {
        if (!this.gameRunning || this.gamePaused) return;
        
        this.bullets.push({
            x: this.player.x,
            y: this.player.y,
            width: 4,
            height: 10,
            speed: this.bulletSpeed
        });
    }
    
    update() {
        if (!this.gameRunning || this.gamePaused) return;
        
        // Handle keyboard input
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
            this.usingMouse = false; // Switch to keyboard control
            this.moveLeft();
        }
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
            this.usingMouse = false; // Switch to keyboard control
            this.moveRight();
        }
        
        // Update player position with mouse (only if actively using mouse)
        if (this.usingMouse && this.mouseX > 0) {
            this.player.x = Math.max(
                this.player.width / 2,
                Math.min(this.width - this.player.width / 2, this.mouseX)
            );
        }
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.y -= bullet.speed;
            return bullet.y > 0;
        });
        
        // Update enemy bullets
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.y += bullet.speed;
            return bullet.y < this.height;
        });
        
        // Move enemies
        let shouldMoveDown = false;
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            
            enemy.x += enemy.direction * enemy.speed;
            
            if (enemy.x <= enemy.width / 2 || enemy.x >= this.width - enemy.width / 2) {
                shouldMoveDown = true;
            }
        }
        
        if (shouldMoveDown) {
            for (let enemy of this.enemies) {
                if (enemy.alive) {
                    enemy.direction *= -1;
                    enemy.y += 20;
                }
            }
        }
        
        // Enemy shooting
        const now = Date.now();
        if (now - this.lastEnemyShot > this.enemyShootInterval) {
            const aliveEnemies = this.enemies.filter(e => e.alive);
            if (aliveEnemies.length > 0) {
                const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                this.enemyBullets.push({
                    x: randomEnemy.x,
                    y: randomEnemy.y + randomEnemy.height,
                    width: 4,
                    height: 10,
                    speed: 3
                });
                this.lastEnemyShot = now;
            }
        }
        
        // Collision detection: bullets vs enemies
        for (let bullet of this.bullets) {
            for (let enemy of this.enemies) {
                if (!enemy.alive) continue;
                
                if (this.checkCollision(bullet, enemy)) {
                    enemy.alive = false;
                    this.bullets = this.bullets.filter(b => b !== bullet);
                    this.score += 100;
                    this.enemiesDestroyed++;
                    break;
                }
            }
        }
        
        // Collision detection: enemy bullets vs player
        for (let bullet of this.enemyBullets) {
            if (this.checkCollision(bullet, this.player)) {
                this.enemyBullets = this.enemyBullets.filter(b => b !== bullet);
                this.loseLife();
                break;
            }
        }
        
        // Collision detection: enemies vs player
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            
            if (this.checkCollision(enemy, this.player)) {
                enemy.alive = false;
                this.loseLife();
                break;
            }
        }
        
        // Check if all enemies are destroyed
        const aliveEnemies = this.enemies.filter(e => e.alive);
        if (aliveEnemies.length === 0) {
            this.nextLevel();
        }
        
        // Check if enemies reached bottom
        for (let enemy of this.enemies) {
            if (enemy.alive && enemy.y + enemy.height >= this.player.y) {
                this.gameOver();
                return;
            }
        }
        
        this.updateDisplay();
    }
    
    checkCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width / 2 &&
               obj1.x + obj1.width > obj2.x - obj2.width / 2 &&
               obj1.y < obj2.y + obj2.height / 2 &&
               obj1.y + obj1.height > obj2.y - obj2.height / 2;
    }
    
    loseLife() {
        this.lives--;
        this.updateDisplay();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Reset player position
            this.player.x = this.width / 2;
            this.player.y = this.height - 50;
            // Clear bullets
            this.bullets = [];
            this.enemyBullets = [];
        }
    }
    
    nextLevel() {
        this.level++;
        this.enemySpeed += 0.2;
        this.enemyShootInterval = Math.max(1000, this.enemyShootInterval - 200);
        
        // Reset player position
        this.player.x = this.width / 2;
        this.player.y = this.height - 50;
        
        // Clear bullets
        this.bullets = [];
        this.enemyBullets = [];
        
        // Create new enemies
        this.createEnemies();
        
        // Update enemy speeds
        for (let enemy of this.enemies) {
            enemy.speed = this.enemySpeed;
        }
    }
    
    async gameOver() {
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Save score
        await this.saveScore();
        
        // Check for badge eligibility
        try {
            const session = window.authStatus?.getSession();
            if (session && session.uid) {
                const { checkAllBadges } = await import('./badge-checker.js');
                await checkAllBadges(session.uid, 'game_completed');
            }
        } catch (error) {
            console.error('Error checking badges:', error);
        }
        
        // Calculate game duration
        if (this.gameStartTime) {
            this.gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
        }
        
        this.startBtn.classList.remove('hidden');
        this.pauseBtn.classList.add('hidden');
        
        this.gameMessage.innerHTML = `Game Over! Final Score: ${this.score} | Level: ${this.level} | Enemies Destroyed: ${this.enemiesDestroyed}`;
        this.gameMessage.className = 'game-message game-over';
        
        // Save score
        this.saveScore();
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score;
        this.livesDisplay.textContent = this.lives;
        this.levelDisplay.textContent = this.level;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        if (!this.gameRunning) {
            // Draw start screen
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GALAGA', this.width / 2, this.height / 2);
            this.ctx.font = '16px Arial';
            this.ctx.fillText('Click "Start Game" to begin', this.width / 2, this.height / 2 + 40);
            return;
        }
        
        // Draw stars background
        this.ctx.fillStyle = '#fff';
        for (let i = 0; i < 50; i++) {
            const x = (i * 37) % this.width;
            const y = (i * 53 + Date.now() / 10) % this.height;
            this.ctx.fillRect(x, y, 2, 2);
        }
        
        // Draw player ship
        this.ctx.fillStyle = '#0f0';
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(this.player.x - this.player.width / 2, this.player.y + this.player.height);
        this.ctx.lineTo(this.player.x + this.player.width / 2, this.player.y + this.player.height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw bullets
        this.ctx.fillStyle = '#0ff';
        for (let bullet of this.bullets) {
            this.ctx.fillRect(bullet.x - bullet.width / 2, bullet.y, bullet.width, bullet.height);
        }
        
        // Draw enemy bullets
        this.ctx.fillStyle = '#f00';
        for (let bullet of this.enemyBullets) {
            this.ctx.fillRect(bullet.x - bullet.width / 2, bullet.y, bullet.width, bullet.height);
        }
        
        // Draw enemies
        this.ctx.fillStyle = '#f0f';
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            
            this.ctx.beginPath();
            this.ctx.arc(enemy.x, enemy.y, enemy.width / 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw enemy details
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(enemy.x - 5, enemy.y - 5, 10, 10);
            this.ctx.fillStyle = '#f0f';
        }
    }
    
    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    async saveScore() {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found');
            return;
        }
        
        try {
            const { error } = await supabase
                .from('galaga_scores')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    level: this.level,
                    enemies_destroyed: this.enemiesDestroyed,
                    game_duration_seconds: this.gameDuration || null
                });
            
            if (error) {
                console.error('Error saving galaga score:', error);
            } else {
                console.log('Galaga score saved successfully');
            }
        } catch (error) {
            console.error('Error saving galaga score:', error);
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new GalagaGame();
});

