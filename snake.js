// Snake Game with Score Tracking
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { checkCredits, deductCredits, showCreditWarning } from './credit-system.js';

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
        this.backToHomeBtn = document.getElementById('backToHomeBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.lengthDisplay = document.getElementById('lengthDisplay');
        this.highScoresList = document.getElementById('highScoresList');
        
        // Event listeners
        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.backToHomeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch controls
        this.controlButtons.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.dataset.direction;
                this.changeDirection(direction);
            });
        });
        
        // Load high scores
        this.loadHighScores();
        
        // Draw initial state
        this.draw();
    }
    
    async startGame() {
        if (this.gameRunning) return;
        
        // Check credits before starting (skip for admins)
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
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
        this.dx = 1;
        this.dy = 0;
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
        if (!this.gameRunning || this.gamePaused) return;
        
        const key = e.key;
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
        
        // Deduct credits (skip for admins)
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            await deductCredits(session.uid, 'snake');
        }
        
        // Save score to database
        await this.saveScore(gameDuration);
        
        // Show game over modal
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        document.getElementById('finalLength').textContent = this.snake.length;
        this.gameOverModal.classList.add('show');
        
        // Reload high scores
        this.loadHighScores();
        
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
    
    async loadHighScores() {
        try {
            // First, get the scores
            const { data: scores, error: scoresError } = await supabase
                .from('Snake_Scores')
                .select('score_id, user_uid, score, level, snake_length, game_duration_seconds, created_at')
                .order('score', { ascending: false })
                .limit(10);
            
            if (scoresError) {
                console.error('Error loading scores:', scoresError);
                this.highScoresList.innerHTML = '<p style="text-align: center; color: #999;">Error loading scores</p>';
                return;
            }
            
            if (!scores || scores.length === 0) {
                this.highScoresList.innerHTML = '<p style="text-align: center; color: #999;">No scores yet. Be the first!</p>';
                return;
            }
            
            // Get user UIDs
            const userIds = [...new Set(scores.map(s => s.user_uid))];
            
            // Fetch user information
            const { data: users, error: usersError } = await supabase
                .from('Users')
                .select('UID, First_Name, Last_Name, Username')
                .in('UID', userIds);
            
            if (usersError) {
                console.error('Error loading users:', usersError);
            }
            
            // Create a map of user data
            const userMap = {};
            if (users) {
                users.forEach(user => {
                    userMap[user.UID] = user;
                });
            }
            
            this.highScoresList.innerHTML = '';
            
            scores.forEach((scoreData, index) => {
                const user = userMap[scoreData.user_uid];
                const displayName = (user && user.First_Name && user.Last_Name) 
                    ? `${user.First_Name} ${user.Last_Name}` 
                    : (user && user.Username) || 'Unknown';
                
                const scoreItem = document.createElement('div');
                scoreItem.className = 'score-item';
                scoreItem.innerHTML = `
                    <div class="score-item-rank">#${index + 1}</div>
                    <div class="score-item-details">
                        <div class="score-item-name">${displayName}</div>
                        <div style="font-size: 0.85rem; color: #666;">
                            Level ${scoreData.level} • Length ${scoreData.snake_length} • ${scoreData.game_duration_seconds}s
                        </div>
                    </div>
                    <div class="score-item-score">${scoreData.score}</div>
                `;
                this.highScoresList.appendChild(scoreItem);
            });
        } catch (error) {
            console.error('Error loading scores:', error);
            this.highScoresList.innerHTML = '<p style="text-align: center; color: #999;">Error loading scores</p>';
        }
    }
}

// Initialize the game when DOM is loaded and authenticated
document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            new SnakeGame();
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

