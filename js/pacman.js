// Pac-Man Game
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

// Credit cost for Pac-Man
const PACMAN_CREDIT_COST = 3;

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
        
        if (!creditData || creditData.balance < PACMAN_CREDIT_COST) {
            return { success: false, message: 'Insufficient credits' };
        }
        
        const newBalance = creditData.balance - PACMAN_CREDIT_COST;
        
        const { error: updateError } = await supabase
            .from('User_Credits')
            .update({ balance: newBalance, updated_at: new Date().toISOString() })
            .eq('credit_id', creditData.credit_id);
        
        if (updateError) throw updateError;
        
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: userUid,
                amount: PACMAN_CREDIT_COST,
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
    return `You have ${balance} credit(s) remaining. You need ${PACMAN_CREDIT_COST} credits to play. Please contact an admin to add more credits.`;
}

// Maze layout (1 = wall, 0 = dot, 2 = power pellet, 3 = empty)
const MAZE_LAYOUT = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,2,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,2,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,3,1,1,3,1,1,1,1,1,0,1,1,1,1,1,1],
    [3,3,3,3,3,1,0,1,1,1,1,1,3,1,1,3,1,1,1,1,1,0,1,3,3,3,3,3],
    [3,3,3,3,3,1,0,1,1,3,3,3,3,3,3,3,3,3,3,1,1,0,1,3,3,3,3,3],
    [3,3,3,3,3,1,0,1,1,3,1,1,1,4,4,1,1,1,3,1,1,0,1,3,3,3,3,3],
    [1,1,1,1,1,1,0,1,1,3,1,3,3,3,3,3,3,1,3,1,1,0,1,1,1,1,1,1],
    [3,3,3,3,3,3,0,3,3,3,1,3,3,3,3,3,3,1,3,3,3,0,3,3,3,3,3,3],
    [1,1,1,1,1,1,0,1,1,3,1,3,3,3,3,3,3,1,3,1,1,0,1,1,1,1,1,1],
    [3,3,3,3,3,1,0,1,1,3,1,1,1,1,1,1,1,1,3,1,1,0,1,3,3,3,3,3],
    [3,3,3,3,3,1,0,1,1,3,3,3,3,3,3,3,3,3,3,1,1,0,1,3,3,3,3,3],
    [3,3,3,3,3,1,0,1,1,3,1,1,1,1,1,1,1,1,3,1,1,0,1,3,3,3,3,3],
    [1,1,1,1,1,1,0,1,1,3,1,1,1,1,1,1,1,1,3,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,2,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,2,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const TILE_SIZE = 20;
const MAZE_WIDTH = MAZE_LAYOUT[0].length;
const MAZE_HEIGHT = MAZE_LAYOUT.length;

class PacManGame {
    constructor() {
        this.canvas = document.getElementById('pacmanCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Resize canvas to fit container
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.maze = JSON.parse(JSON.stringify(MAZE_LAYOUT)); // Deep copy
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameStartTime = null;
        this.dotsRemaining = 0;
        this.powerPelletActive = false;
        this.powerPelletTimer = 0;
        this.lastFrameTime = 0;
        this.frameDelay = 1000 / 60; // 60 FPS
        
        // Pac-Man
        this.pacman = {
            x: 14,
            y: 23,
            direction: 0, // 0=right, 1=down, 2=left, 3=up
            nextDirection: 0,
            mouthOpen: true,
            mouthAngle: 0,
            speed: 0.15
        };
        
        // Ghosts
        this.ghosts = [
            { x: 13.5, y: 11, direction: 0, color: '#FF0000', name: 'Blinky', scared: false, inHouse: false, speed: 0.12 },
            { x: 13.5, y: 14, direction: 0, color: '#FFB8FF', name: 'Pinky', scared: false, inHouse: true, speed: 0.12 },
            { x: 11.5, y: 14, direction: 0, color: '#00FFFF', name: 'Inky', scared: false, inHouse: true, speed: 0.12 },
            { x: 15.5, y: 14, direction: 0, color: '#FFB851', name: 'Clyde', scared: false, inHouse: true, speed: 0.12 }
        ];
        
        this.init();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        const maxWidth = Math.min(containerWidth - 20, 800);
        const width = Math.max(560, maxWidth);
        const height = Math.round(width * (620 / 560));
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        if (this.gameRunning) {
            this.draw();
        }
    }
    
    init() {
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.upBtn = document.getElementById('upBtn');
        this.downBtn = document.getElementById('downBtn');
        this.leftBtn = document.getElementById('leftBtn');
        this.rightBtn = document.getElementById('rightBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.livesDisplay = document.getElementById('livesDisplay');
        this.gameMessage = document.getElementById('gameMessage');
        
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.upBtn.addEventListener('click', () => this.setDirection(3));
        this.downBtn.addEventListener('click', () => this.setDirection(1));
        this.leftBtn.addEventListener('click', () => this.setDirection(2));
        this.rightBtn.addEventListener('click', () => this.setDirection(0));
        
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    this.checkUserAccess();
                }
            }, 100);
        }, 100);
        
        this.countDots();
        this.draw();
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
    
    async startGame() {
        if (this.gameRunning) return;
        
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid, PACMAN_CREDIT_COST);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
            
            const deductResult = await deductCredits(session.uid, 'pacman');
            if (!deductResult.success) {
                alert('Unable to process payment. Please try again.');
                return;
            }
        }
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameStartTime = Date.now();
        this.startBtn.classList.add('hidden');
        this.resetBtn.classList.remove('hidden');
        this.hideMessage();
        
        this.countDots();
        this.lastFrameTime = performance.now();
        this.gameLoop();
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.maze = JSON.parse(JSON.stringify(MAZE_LAYOUT));
        this.pacman = { x: 14, y: 23, direction: 0, nextDirection: 0, mouthOpen: true, mouthAngle: 0, speed: 0.15 };
        this.ghosts = [
            { x: 13.5, y: 11, direction: 0, color: '#FF0000', name: 'Blinky', scared: false, inHouse: false, speed: 0.12 },
            { x: 13.5, y: 14, direction: 0, color: '#FFB8FF', name: 'Pinky', scared: false, inHouse: true, speed: 0.12 },
            { x: 11.5, y: 14, direction: 0, color: '#00FFFF', name: 'Inky', scared: false, inHouse: true, speed: 0.12 },
            { x: 15.5, y: 14, direction: 0, color: '#FFB851', name: 'Clyde', scared: false, inHouse: true, speed: 0.12 }
        ];
        this.powerPelletActive = false;
        this.powerPelletTimer = 0;
        this.startBtn.classList.remove('hidden');
        this.resetBtn.classList.add('hidden');
        this.hideMessage();
        this.countDots();
        this.updateDisplay();
        this.draw();
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused) {
            this.hideMessage();
            this.lastFrameTime = performance.now();
            this.gameLoop();
        } else {
            this.showMessage('Game Paused', 'paused');
        }
    }
    
    countDots() {
        this.dotsRemaining = 0;
        for (let row = 0; row < MAZE_HEIGHT; row++) {
            for (let col = 0; col < MAZE_WIDTH; col++) {
                if (this.maze[row][col] === 0 || this.maze[row][col] === 2) {
                    this.dotsRemaining++;
                }
            }
        }
    }
    
    setDirection(dir) {
        if (!this.gameRunning || this.gamePaused) return;
        this.pacman.nextDirection = dir;
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.setDirection(3);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.setDirection(1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.setDirection(2);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.setDirection(0);
                break;
            case 'p':
            case 'P':
                this.togglePause();
                break;
        }
    }
    
    isWall(tileX, tileY) {
        if (tileX < 0 || tileX >= MAZE_WIDTH || tileY < 0 || tileY >= MAZE_HEIGHT) return true;
        const tile = this.maze[tileY][tileX];
        return tile === 1 || tile === 4;
    }
    
    canMove(x, y, direction) {
        const tileX = Math.floor(x);
        const tileY = Math.floor(y);
        
        // Check tunnel wrap (row 14)
        if (tileY === 14) {
            if (x < -0.5) return { canMove: true, wrap: { x: MAZE_WIDTH - 1, y: tileY } };
            if (x >= MAZE_WIDTH - 0.5) return { canMove: true, wrap: { x: 0, y: tileY } };
        }
        
        // Check if we're at a tile center (within threshold)
        const centerX = tileX + 0.5;
        const centerY = tileY + 0.5;
        const threshold = 0.05;
        
        const isAlignedX = Math.abs(x - centerX) < threshold;
        const isAlignedY = Math.abs(y - centerY) < threshold;
        
        // Calculate next position
        let nextX = x;
        let nextY = y;
        
        if (direction === 0) nextX += this.pacman.speed; // right
        else if (direction === 1) nextY += this.pacman.speed; // down
        else if (direction === 2) nextX -= this.pacman.speed; // left
        else if (direction === 3) nextY -= this.pacman.speed; // up
        
        const nextTileX = Math.floor(nextX);
        const nextTileY = Math.floor(nextY);
        
        // Check if moving into a wall
        if (this.isWall(nextTileX, nextTileY)) {
            return { canMove: false, wrap: null };
        }
        
        return { canMove: true, wrap: null };
    }
    
    updatePacman() {
        // Try to change direction if requested
        if (this.pacman.nextDirection !== this.pacman.direction) {
            const check = this.canMove(this.pacman.x, this.pacman.y, this.pacman.nextDirection);
            if (check.canMove) {
                // Only change if we're aligned to center
                const tileX = Math.floor(this.pacman.x);
                const tileY = Math.floor(this.pacman.y);
                const centerX = tileX + 0.5;
                const centerY = tileY + 0.5;
                
                const isAligned = (this.pacman.nextDirection === 0 || this.pacman.nextDirection === 2) 
                    ? Math.abs(this.pacman.y - centerY) < 0.1
                    : Math.abs(this.pacman.x - centerX) < 0.1;
                
                if (isAligned) {
                    this.pacman.direction = this.pacman.nextDirection;
                    // Snap to center
                    if (this.pacman.direction === 0 || this.pacman.direction === 2) {
                        this.pacman.y = centerY;
                    } else {
                        this.pacman.x = centerX;
                    }
                }
            }
        }
        
        // Move in current direction
        const check = this.canMove(this.pacman.x, this.pacman.y, this.pacman.direction);
        if (check.wrap) {
            this.pacman.x = check.wrap.x;
            this.pacman.y = check.wrap.y;
        } else if (check.canMove) {
            if (this.pacman.direction === 0) this.pacman.x += this.pacman.speed;
            else if (this.pacman.direction === 1) this.pacman.y += this.pacman.speed;
            else if (this.pacman.direction === 2) this.pacman.x -= this.pacman.speed;
            else if (this.pacman.direction === 3) this.pacman.y -= this.pacman.speed;
        }
        
        // Animate mouth
        this.pacman.mouthAngle += 0.2;
        this.pacman.mouthOpen = Math.sin(this.pacman.mouthAngle) > 0;
        
        // Check for dot collection
        const tileX = Math.floor(this.pacman.x);
        const tileY = Math.floor(this.pacman.y);
        
        if (tileY >= 0 && tileY < MAZE_HEIGHT && tileX >= 0 && tileX < MAZE_WIDTH) {
            if (this.maze[tileY][tileX] === 0) {
                this.maze[tileY][tileX] = 3;
                this.score += 10;
                this.dotsRemaining--;
                this.updateDisplay();
            } else if (this.maze[tileY][tileX] === 2) {
                this.maze[tileY][tileX] = 3;
                this.score += 50;
                this.dotsRemaining--;
                this.powerPelletActive = true;
                this.powerPelletTimer = 300;
                this.ghosts.forEach(ghost => {
                    if (!ghost.inHouse) ghost.scared = true;
                });
                this.updateDisplay();
            }
        }
        
        // Check level complete
        if (this.dotsRemaining === 0) {
            this.levelComplete();
        }
    }
    
    updateGhosts() {
        this.ghosts.forEach((ghost, index) => {
            // Ghost house logic
            if (ghost.inHouse) {
                if (ghost.y > 11) {
                    ghost.y -= 0.1;
                } else {
                    ghost.inHouse = false;
                }
            } else {
                // Simple AI: move towards or away from Pac-Man
                const targetX = this.powerPelletActive && ghost.scared ? 0 : this.pacman.x;
                const targetY = this.powerPelletActive && ghost.scared ? MAZE_HEIGHT : this.pacman.y;
                
                const dx = targetX - ghost.x;
                const dy = targetY - ghost.y;
                
                // Check if at intersection (aligned to tile center)
                const tileX = Math.floor(ghost.x);
                const tileY = Math.floor(ghost.y);
                const centerX = tileX + 0.5;
                const centerY = tileY + 0.5;
                const isAtIntersection = Math.abs(ghost.x - centerX) < 0.1 && Math.abs(ghost.y - centerY) < 0.1;
                
                if (isAtIntersection) {
                    // Choose direction based on target
                    let newDirection = ghost.direction;
                    const dirs = [];
                    
                    // Try all directions
                    for (let dir = 0; dir < 4; dir++) {
                        let testX = centerX;
                        let testY = centerY;
                        if (dir === 0) testX += 0.5;
                        else if (dir === 1) testY += 0.5;
                        else if (dir === 2) testX -= 0.5;
                        else if (dir === 3) testY -= 0.5;
                        
                        if (!this.isWall(Math.floor(testX), Math.floor(testY))) {
                            dirs.push(dir);
                        }
                    }
                    
                    if (dirs.length > 0) {
                        // Choose best direction
                        let bestDir = dirs[0];
                        let bestDist = Infinity;
                        
                        for (const dir of dirs) {
                            let testX = centerX;
                            let testY = centerY;
                            if (dir === 0) testX += 1;
                            else if (dir === 1) testY += 1;
                            else if (dir === 2) testX -= 1;
                            else if (dir === 3) testY -= 1;
                            
                            const dist = Math.sqrt(Math.pow(testX - targetX, 2) + Math.pow(testY - targetY, 2));
                            if (dist < bestDist) {
                                bestDist = dist;
                                bestDir = dir;
                            }
                        }
                        
                        ghost.direction = bestDir;
                        ghost.x = centerX;
                        ghost.y = centerY;
                    }
                }
                
                // Move ghost
                const speed = ghost.scared ? 0.08 : ghost.speed;
                let moveX = ghost.x;
                let moveY = ghost.y;
                
                if (ghost.direction === 0) moveX += speed;
                else if (ghost.direction === 1) moveY += speed;
                else if (ghost.direction === 2) moveX -= speed;
                else if (ghost.direction === 3) moveY -= speed;
                
                // Check tunnel wrap
                if (Math.floor(moveY) === 14) {
                    if (moveX < -0.5) {
                        ghost.x = MAZE_WIDTH - 1;
                        ghost.y = moveY;
                    } else if (moveX >= MAZE_WIDTH - 0.5) {
                        ghost.x = 0;
                        ghost.y = moveY;
                    } else if (!this.isWall(Math.floor(moveX), Math.floor(moveY))) {
                        ghost.x = moveX;
                        ghost.y = moveY;
                    }
                } else if (!this.isWall(Math.floor(moveX), Math.floor(moveY))) {
                    ghost.x = moveX;
                    ghost.y = moveY;
                }
            }
            
            // Check collision with Pac-Man
            const dist = Math.sqrt(Math.pow(ghost.x - this.pacman.x, 2) + Math.pow(ghost.y - this.pacman.y, 2));
            if (dist < 0.6) {
                if (ghost.scared && !ghost.inHouse) {
                    // Eat ghost
                    ghost.x = 13.5;
                    ghost.y = 14;
                    ghost.inHouse = true;
                    ghost.scared = false;
                    this.score += 200;
                    this.updateDisplay();
                } else if (!ghost.inHouse) {
                    // Pac-Man dies
                    this.pacmanDies();
                }
            }
        });
        
        // Update power pellet timer
        if (this.powerPelletActive) {
            this.powerPelletTimer--;
            if (this.powerPelletTimer <= 0) {
                this.powerPelletActive = false;
                this.ghosts.forEach(ghost => ghost.scared = false);
            }
        }
    }
    
    pacmanDies() {
        this.lives--;
        this.updateDisplay();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Reset positions
            this.pacman.x = 14;
            this.pacman.y = 23;
            this.pacman.direction = 0;
            this.ghosts.forEach((ghost, i) => {
                if (i === 0) {
                    ghost.x = 13.5;
                    ghost.y = 11;
                    ghost.inHouse = false;
                } else {
                    ghost.x = 13.5 + (i - 1) * 2;
                    ghost.y = 14;
                    ghost.inHouse = true;
                }
                ghost.scared = false;
            });
            this.powerPelletActive = false;
            this.powerPelletTimer = 0;
        }
    }
    
    levelComplete() {
        this.level++;
        this.maze = JSON.parse(JSON.stringify(MAZE_LAYOUT));
        this.pacman.x = 14;
        this.pacman.y = 23;
        this.pacman.direction = 0;
        this.ghosts.forEach((ghost, i) => {
            if (i === 0) {
                ghost.x = 13.5;
                ghost.y = 11;
                ghost.inHouse = false;
            } else {
                ghost.x = 13.5 + (i - 1) * 2;
                ghost.y = 14;
                ghost.inHouse = true;
            }
            ghost.scared = false;
        });
        this.powerPelletActive = false;
        this.powerPelletTimer = 0;
        this.pacman.speed = Math.min(0.2, 0.15 + (this.level - 1) * 0.01);
        this.countDots();
        this.updateDisplay();
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const scaleX = this.canvas.width / (MAZE_WIDTH * TILE_SIZE);
        const scaleY = this.canvas.height / (MAZE_HEIGHT * TILE_SIZE);
        const scale = Math.min(scaleX, scaleY);
        const offsetX = (this.canvas.width - MAZE_WIDTH * TILE_SIZE * scale) / 2;
        const offsetY = (this.canvas.height - MAZE_HEIGHT * TILE_SIZE * scale) / 2;
        
        this.ctx.save();
        this.ctx.translate(offsetX, offsetY);
        this.ctx.scale(scale, scale);
        
        // Draw maze
        for (let row = 0; row < MAZE_HEIGHT; row++) {
            for (let col = 0; col < MAZE_WIDTH; col++) {
                const x = col * TILE_SIZE;
                const y = row * TILE_SIZE;
                const tile = this.maze[row][col];
                
                if (tile === 1) {
                    // Wall
                    this.ctx.fillStyle = '#2121DE';
                    this.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                } else if (tile === 0) {
                    // Dot
                    this.ctx.fillStyle = '#FFB8FF';
                    this.ctx.beginPath();
                    this.ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2, 0, Math.PI * 2);
                    this.ctx.fill();
                } else if (tile === 2) {
                    // Power pellet
                    this.ctx.fillStyle = '#FFB8FF';
                    this.ctx.beginPath();
                    this.ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 6, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        }
        
        // Draw Pac-Man
        const pacX = this.pacman.x * TILE_SIZE;
        const pacY = this.pacman.y * TILE_SIZE;
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.beginPath();
        const startAngle = [0, Math.PI / 2, Math.PI, -Math.PI / 2][this.pacman.direction];
        const mouthAngle = this.pacman.mouthOpen ? Math.PI / 3 : 0;
        this.ctx.arc(pacX + TILE_SIZE / 2, pacY + TILE_SIZE / 2, TILE_SIZE / 2 - 2, 
                     startAngle + mouthAngle, startAngle + Math.PI * 2 - mouthAngle);
        this.ctx.lineTo(pacX + TILE_SIZE / 2, pacY + TILE_SIZE / 2);
        this.ctx.fill();
        
        // Draw ghosts
        this.ghosts.forEach(ghost => {
            const ghostX = ghost.x * TILE_SIZE;
            const ghostY = ghost.y * TILE_SIZE;
            this.ctx.fillStyle = ghost.scared ? '#2121DE' : ghost.color;
            this.ctx.beginPath();
            this.ctx.arc(ghostX + TILE_SIZE / 2, ghostY + TILE_SIZE / 2, TILE_SIZE / 2 - 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.restore();
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score.toLocaleString();
        this.levelDisplay.textContent = this.level;
        this.livesDisplay.textContent = this.lives;
    }
    
    showMessage(text, type) {
        this.gameMessage.textContent = text;
        this.gameMessage.className = `game-message ${type}`;
        this.gameMessage.classList.remove('hidden');
    }
    
    hideMessage() {
        this.gameMessage.classList.add('hidden');
    }
    
    gameLoop(currentTime = performance.now()) {
        if (!this.gameRunning) return;
        
        const deltaTime = currentTime - this.lastFrameTime;
        
        if (deltaTime >= this.frameDelay) {
            // Update ghosts (always moving)
            this.updateGhosts();
            
            // Update Pac-Man if not paused
            if (!this.gamePaused) {
                this.updatePacman();
            }
            
            this.draw();
            this.lastFrameTime = currentTime;
        }
        
        requestAnimationFrame((time) => this.gameLoop(time));
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
                .from('pacman_scores')
                .insert({
                    user_uid: session.uid,
                    score: this.score,
                    level: this.level,
                    dots_eaten: (MAZE_WIDTH * MAZE_HEIGHT) - this.dotsRemaining,
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
    new PacManGame();
});
