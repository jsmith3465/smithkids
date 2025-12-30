// Snake Game with Score Tracking
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { checkCredits, deductCredits, showCreditWarning } from './credit-system.js';
import { initializeApprovalNotifications } from './notification-system.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.level = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameStartTime = null;
        this.gameLoop = null;
        this.speed = 150; // milliseconds between moves
        
        this.init();
    }
    
    init() {
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.controlButtons = document.getElementById('controlButtons');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.lengthDisplay = document.getElementById('lengthDisplay');
        
        // Event listeners
        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch controls
        if (this.controlButtons) {
            this.controlButtons.querySelectorAll('.control-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const direction = btn.dataset.direction;
                    this.changeDirection(direction);
                });
            });
        }
        
        // Draw initial state
        this.draw();
    }
    
    async startGame(initialDirection = null) {
        if (this.gameRunning) return;
        
        // Check and deduct credits before starting (skip for admins)
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
            
            // Deduct credit when game begins
            const deductResult = await deductCredits(session.uid, 'snake');
            if (!deductResult.success) {
                alert('Unable to process payment. Please try again.');
                return;
            }
        }
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameStartTime = Date.now();
        this.startBtn.classList.add('hidden');
        this.pauseBtn.classList.remove('hidden');
        this.controlButtons.classList.remove('hidden');
        
        // Reset snake position and direction
        this.snake = [{ x: 10, y: 10 }];
        
        // Set direction based on parameter or default to right
        if (initialDirection) {
            if (initialDirection === 'up') {
                this.dx = 0;
                this.dy = -1;
            } else if (initialDirection === 'down') {
                this.dx = 0;
                this.dy = 1;
            } else if (initialDirection === 'left') {
                this.dx = -1;
                this.dy = 0;
            } else if (initialDirection === 'right') {
                this.dx = 1;
                this.dy = 0;
            }
        } else {
            this.dx = 1;
            this.dy = 0;
        }
        
        this.score = 0;
        this.level = 1;
        this.speed = 150;
        this.generateFood();
        
        this.updateDisplay();
        this.gameLoop = setInterval(() => this.update(), this.speed);
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            clearInterval(this.gameLoop);
            this.pauseBtn.textContent = 'Resume';
        } else {
            this.pauseBtn.textContent = 'Pause';
            this.gameLoop = setInterval(() => this.update(), this.speed);
        }
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        clearInterval(this.gameLoop);
        this.gameOverModal.classList.remove('show');
        this.startBtn.classList.remove('hidden');
        this.pauseBtn.classList.add('hidden');
        this.controlButtons.classList.add('hidden');
        
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.level = 1;
        this.speed = 150;
        this.generateFood();
        this.updateDisplay();
        this.draw();
    }
    
    handleKeyPress(e) {
        const key = e.key;
        
        // If game is not running, arrow keys start the game
        if (!this.gameRunning) {
            if (key === 'ArrowUp') {
                e.preventDefault();
                this.startGame('up');
                return;
            } else if (key === 'ArrowDown') {
                e.preventDefault();
                this.startGame('down');
                return;
            } else if (key === 'ArrowLeft') {
                e.preventDefault();
                this.startGame('left');
                return;
            } else if (key === 'ArrowRight') {
                e.preventDefault();
                this.startGame('right');
                return;
            }
        }
        
        // If game is paused, don't process movement
        if (!this.gameRunning || this.gamePaused) return;
        
        if (key === 'ArrowUp' || key === 'w' || key === 'W') {
            e.preventDefault();
            this.changeDirection('up');
        } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
            e.preventDefault();
            this.changeDirection('down');
        } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
            e.preventDefault();
            this.changeDirection('left');
        } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
            e.preventDefault();
            this.changeDirection('right');
        }
    }
    
    changeDirection(direction) {
        if (!this.gameRunning || this.gamePaused) return;
        
        // Prevent reversing into itself
        if (direction === 'up' && this.dy === 1) return;
        if (direction === 'down' && this.dy === -1) return;
        if (direction === 'left' && this.dx === 1) return;
        if (direction === 'right' && this.dx === -1) return;
        
        if (direction === 'up') {
            this.dx = 0;
            this.dy = -1;
        } else if (direction === 'down') {
            this.dx = 0;
            this.dy = 1;
        } else if (direction === 'left') {
            this.dx = -1;
            this.dy = 0;
        } else if (direction === 'right') {
            this.dx = 1;
            this.dy = 0;
        }
    }
    
    update() {
        if (!this.gameRunning || this.gamePaused) return;
        
        // Move snake head
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += this.calculateScore();
            this.generateFood();
            this.checkLevelUp();
            this.updateDisplay();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    calculateScore() {
        // Score increases with level: base score * level
        const baseScore = 10;
        return baseScore * this.level;
    }
    
    checkLevelUp() {
        // Level up every 5 food items
        const newLevel = Math.floor(this.score / (10 * 5)) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            // Increase speed (decrease delay) as level increases
            this.speed = Math.max(80, 150 - (this.level - 1) * 10);
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => this.update(), this.speed);
        }
    }
    
    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        this.food = newFood;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#0f0';
        for (let segment of this.snake) {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        }
        
        // Draw snake head with different color
        this.ctx.fillStyle = '#0a0';
        const head = this.snake[0];
        this.ctx.fillRect(head.x * this.gridSize, head.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        
        // Draw food
        this.ctx.fillStyle = '#f00';
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score;
        this.levelDisplay.textContent = this.level;
        this.lengthDisplay.textContent = this.snake.length;
    }
    
    async gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        
        const gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
        
        // Save score to database
        await this.saveScore(gameDuration);
        
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
        
        // Show game over modal
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        document.getElementById('finalLength').textContent = this.snake.length;
        this.gameOverModal.classList.add('show');
        
        // Hide controls
        this.startBtn.classList.remove('hidden');
        this.pauseBtn.classList.add('hidden');
        this.controlButtons.classList.add('hidden');
    }
    
    async saveScore(duration) {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found');
            return;
        }
        
        try {
            const { error } = await supabase
                .from('Snake_Scores')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    level: this.level,
                    snake_length: this.snake.length,
                    game_duration_seconds: duration
                });
            
            if (error) {
                console.error('Error saving score:', error);
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }
    
}

// Initialize the game when DOM is loaded and authenticated
document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            new SnakeGame();
            
            // Initialize approval notifications for standard users
            const session = window.authStatus.getSession();
            if (session && session.userType !== 'admin') {
                initializeApprovalNotifications();
            }
        } else if (window.authStatus && !window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
        if (!window.authStatus || !window.authStatus.isAuthenticated) {
            console.error('Authentication check timed out');
        }
    }, 5000);
});

