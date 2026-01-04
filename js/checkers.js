// Checkers Game

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { checkCredits, deductCredits } from './credit-system.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class CheckersGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 'red'; // 'red' or 'black'
        this.player1Name = '';
        this.player2Name = '';
        this.player1Id = null;
        this.player2Id = null;
        this.gameActive = false;
        this.selectedSquare = null;
        this.possibleMoves = [];
        this.moveCount = 0;
        this.gameStartTime = null;
        this.COMPUTER_ID = 'COMPUTER';
        this.players = {};
        this.users = [];
        this.isAdmin = false;
        this.isProcessingMove = false;
        this.mustJump = false; // Track if player must make a jump
        this.computerDifficulty = 'moderate'; // 'easy', 'moderate', 'hard'
        
        this.init();
    }
    
    async init() {
        // Wait for auth
        setTimeout(() => {
            const checkAuth = setInterval(() => {
                if (window.authStatus) {
                    clearInterval(checkAuth);
                    if (window.authStatus.isAuthenticated) {
                        this.initializeGame();
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
    
    async initializeGame() {
        const authCheck = document.getElementById('authCheck');
        const mainContent = document.getElementById('mainContent');
        
        if (authCheck && mainContent) {
            authCheck.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }
        
        // Initialize DOM elements
        this.playerSetup = document.getElementById('playerSetup');
        this.gameSection = document.getElementById('gameSection');
        this.player1Select = document.getElementById('player1Select');
        this.player2Select = document.getElementById('player2Select');
        this.startGameBtn = document.getElementById('startGameBtn');
        this.checkersBoard = document.getElementById('checkersBoard');
        this.gameMessage = document.getElementById('gameMessage');
        this.currentPlayerDisplay = document.getElementById('currentPlayerDisplay');
        this.moveCountDisplay = document.getElementById('moveCount');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.newPlayersBtn = document.getElementById('newPlayersBtn');
        this.computerDifficultySelect = document.getElementById('computerDifficulty');
        this.computerDifficultyGroup = document.getElementById('computerDifficultyGroup');
        
        // Initialize Computer player
        this.players[this.COMPUTER_ID] = {
            name: 'Computer',
            wins: 0,
            losses: 0,
            draws: 0,
            credits: Infinity
        };
        
        // Load users from database
        await this.loadUsersFromDatabase();
        this.updatePlayerSelects();
        
        // Check if current user is admin
        const session = window.authStatus?.getSession();
        this.isAdmin = session && session.userType === 'admin';
        
        // Event listeners
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.newPlayersBtn.addEventListener('click', () => this.newPlayers());
        this.player2Select.addEventListener('change', () => this.updateDifficultyVisibility());
        if (this.computerDifficultySelect) {
            this.computerDifficultySelect.addEventListener('change', (e) => {
                this.computerDifficulty = e.target.value;
            });
        }
    }
    
    async loadUsersFromDatabase() {
        try {
            const { data, error } = await supabase
                .from('Users')
                .select('UID, First_Name, Last_Name, Username, user_type')
                .order('First_Name', { ascending: true });
            
            if (error) {
                console.error('Error loading users:', error);
                return;
            }
            
            this.users = data || [];
            
            // Load credit balances
            const { data: credits } = await supabase
                .from('User_Credits')
                .select('user_uid, balance');
            
            const creditMap = {};
            if (credits) {
                credits.forEach(credit => {
                    creditMap[credit.user_uid] = credit.balance || 0;
                });
            }
            
            // Add users to players object
            this.users.forEach(user => {
                const displayName = this.getDisplayName(user);
                const creditBalance = user.user_type === 'admin' ? Infinity : (creditMap[user.UID] || 0);
                this.players[user.UID] = {
                    name: displayName,
                    uid: user.UID,
                    firstName: user.First_Name || '',
                    lastName: user.Last_Name || '',
                    wins: 0,
                    losses: 0,
                    draws: 0,
                    credits: creditBalance
                };
            });
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }
    
    getDisplayName(user) {
        const firstName = user.First_Name || '';
        const lastName = user.Last_Name || '';
        const fullName = `${firstName} ${lastName}`.trim();
        return fullName || user.Username || 'Unknown';
    }
    
    updatePlayerSelects() {
        const session = window.authStatus?.getSession();
        const currentUserUid = session?.uid;
        
        if (!currentUserUid) {
            console.error('No logged-in user found');
            return;
        }
        
        // Set Player 1 to always be the logged-in user
        if (this.players[currentUserUid]) {
            this.player1Select.innerHTML = '';
            const option1 = document.createElement('option');
            option1.value = currentUserUid;
            option1.textContent = this.players[currentUserUid].name;
            option1.selected = true;
            this.player1Select.appendChild(option1);
        } else {
            this.player1Select.innerHTML = '<option value="">Loading...</option>';
        }
        
        // Build Player 2 options (Computer + all other users except current user)
        const playerArray = Object.entries(this.players).filter(([id]) => {
            return id !== currentUserUid;
        }).sort((a, b) => {
            if (a[0] === this.COMPUTER_ID) return -1;
            if (b[0] === this.COMPUTER_ID) return 1;
            return a[1].name.localeCompare(b[1].name);
        });
        
        this.player2Select.innerHTML = '<option value="">Select a player...</option>';
        
        playerArray.forEach(([id, player]) => {
            const option2 = document.createElement('option');
            option2.value = id;
            option2.textContent = player.name + (id === this.COMPUTER_ID ? ' 🤖' : '');
            this.player2Select.appendChild(option2);
        });
        
        this.updateDifficultyVisibility();
    }
    
    async startGame() {
        const session = window.authStatus?.getSession();
        const currentUserUid = session?.uid;
        
        if (!currentUserUid) {
            alert('You must be logged in to play!');
            return;
        }
        
        const p1Id = currentUserUid.toString();
        const p2Id = this.player2Select.value;
        
        if (!p2Id) {
            alert('Please select Player 2!');
            return;
        }
        
        if (p1Id === p2Id) {
            alert('Please select a different player for Player 2!');
            return;
        }
        
        const isAdmin = session && session.userType === 'admin';
        const p2IsComputer = this.isComputerPlayer(p2Id);
        
        // Check and deduct credits
        if (!isAdmin && !this.isAdmin) {
            const p1Player = this.players[p1Id];
            if (!p1Player || p1Player.credits === undefined || p1Player.credits < 3) {
                alert('You do not have enough credits to play. Checkers costs 3 credits per game. Please earn more credits.');
                return;
            }
            
            if (!p2IsComputer) {
                const p2Player = this.players[p2Id];
                if (!p2Player || p2Player.credits === undefined || p2Player.credits < 3) {
                    alert(`${p2Player.name} does not have enough credits to play. Checkers costs 3 credits per game.`);
                    return;
                }
            }
            
            // Deduct credits (3 credits for Checkers)
            const deductResult1 = await deductCredits(parseInt(p1Id), 'checkers', null, 3);
            if (!deductResult1.success) {
                alert('Unable to deduct credits. Please try again.');
                return;
            }
            p1Player.credits = deductResult1.newBalance;
            
            if (!p2IsComputer) {
                const deductResult2 = await deductCredits(parseInt(p2Id), 'checkers', null, 3);
                if (!deductResult2.success) {
                    alert(`Unable to deduct credits from ${this.players[p2Id].name}.`);
                    return;
                }
                this.players[p2Id].credits = deductResult2.newBalance;
            }
        }
        
        this.player1Id = p1Id;
        this.player2Id = p2Id;
        this.player1Name = this.players[p1Id].name;
        this.player2Name = this.players[p2Id].name;
        
        this.playerSetup.classList.add('hidden');
        this.gameSection.classList.remove('hidden');
        
        this.initializeBoard();
    }
    
    initializeBoard() {
        // Initialize empty board (8x8)
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Place red pieces (top 3 rows, dark squares only)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { color: 'red', isKing: false };
                }
            }
        }
        
        // Place black pieces (bottom 3 rows, dark squares only)
        for (let row = 5; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { color: 'black', isKing: false };
                }
            }
        }
        
        this.currentPlayer = 'red';
        this.selectedSquare = null;
        this.possibleMoves = [];
        this.moveCount = 0;
        this.gameActive = true;
        this.gameStartTime = Date.now();
        this.mustJump = false;
        this.gameMessage.style.display = 'none';
        
        this.renderBoard();
        this.updateDisplay();
        this.checkForJumps();
        
        // If it's the computer's turn, make a move automatically
        if (this.isComputerTurn()) {
            setTimeout(() => this.computerMove(), 500);
        }
    }
    
    renderBoard() {
        this.checkersBoard.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `checkers-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                
                const piece = this.board[row][col];
                if (piece) {
                    const pieceDiv = document.createElement('div');
                    pieceDiv.className = `checker-piece ${piece.color}${piece.isKing ? ' king' : ''}`;
                    pieceDiv.textContent = piece.isKing ? '♔' : '●';
                    square.appendChild(pieceDiv);
                }
                
                // Highlight selected square
                if (this.selectedSquare && this.selectedSquare.row === row && this.selectedSquare.col === col) {
                    square.classList.add('selected');
                }
                
                // Highlight possible moves
                if (this.possibleMoves.some(m => m.row === row && m.col === col)) {
                    square.classList.add('possible-move');
                }
                
                square.addEventListener('click', () => this.handleSquareClick(row, col));
                this.checkersBoard.appendChild(square);
            }
        }
    }
    
    handleSquareClick(row, col) {
        if (!this.gameActive || this.isProcessingMove) return;
        
        // Don't allow player interaction when it's the computer's turn
        if (this.isComputerTurn()) {
            return;
        }
        
        const piece = this.board[row][col];
        const isCurrentPlayerPiece = piece && piece.color === this.currentPlayer;
        
        // If clicking on a possible move square
        if (this.selectedSquare && this.possibleMoves.some(m => m.row === row && m.col === col)) {
            this.makeMove(this.selectedSquare.row, this.selectedSquare.col, row, col);
            return;
        }
        
        // If clicking on current player's piece, select it
        if (isCurrentPlayerPiece) {
            this.selectedSquare = { row, col };
            this.possibleMoves = this.getPossibleMoves(row, col);
            this.renderBoard();
            return;
        }
        
        // Deselect if clicking elsewhere
        this.selectedSquare = null;
        this.possibleMoves = [];
        this.renderBoard();
    }
    
    checkForJumps() {
        // Check if current player has any jumps available
        const jumps = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    const pieceJumps = this.getJumps(row, col);
                    if (pieceJumps.length > 0) {
                        jumps.push(...pieceJumps.map(j => ({ fromRow: row, fromCol: col, ...j })));
                    }
                }
            }
        }
        
        this.mustJump = jumps.length > 0;
        return jumps;
    }
    
    getJumps(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        const jumps = [];
        const directions = piece.isKing 
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : piece.color === 'red' 
                ? [[1, -1], [1, 1]]  // Red moves down
                : [[-1, -1], [-1, 1]]; // Black moves up
        
        for (const [drow, dcol] of directions) {
            const jumpRow = row + 2 * drow;
            const jumpCol = col + 2 * dcol;
            const middleRow = row + drow;
            const middleCol = col + dcol;
            
            if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8) {
                const middlePiece = this.board[middleRow][middleCol];
                const targetSquare = this.board[jumpRow][jumpCol];
                
                if (middlePiece && middlePiece.color !== piece.color && !targetSquare) {
                    jumps.push({ row: jumpRow, col: jumpCol, captureRow: middleRow, captureCol: middleCol });
                }
            }
        }
        
        return jumps;
    }
    
    getPossibleMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        // If jumps are available, only return jumps
        const jumps = this.getJumps(row, col);
        if (jumps.length > 0 || this.mustJump) {
            return jumps;
        }
        
        // Otherwise return regular moves
        const moves = [];
        const directions = piece.isKing 
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : piece.color === 'red' 
                ? [[1, -1], [1, 1]]  // Red moves down
                : [[-1, -1], [-1, 1]]; // Black moves up
        
        for (const [drow, dcol] of directions) {
            const newRow = row + drow;
            const newCol = col + dcol;
            
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                if (!this.board[newRow][newCol]) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }
        
        return moves;
    }
    
    makeMove(fromRow, fromCol, toRow, toCol, captureRow = undefined, captureCol = undefined) {
        if (this.isProcessingMove) return;
        
        const piece = this.board[fromRow][fromCol];
        if (!piece || piece.color !== this.currentPlayer) return;
        
        // Check if move is valid - either from possibleMoves (player clicks) or validate directly (computer moves)
        let validMove = null;
        if (this.possibleMoves.length > 0) {
            // Player clicked on a square, use stored possible moves
            validMove = this.possibleMoves.find(m => m.row === toRow && m.col === toCol);
        } else {
            // Computer move or direct call - validate the move directly
            const possibleMoves = this.getPossibleMoves(fromRow, fromCol);
            validMove = possibleMoves.find(m => m.row === toRow && m.col === toCol);
            // If validMove found and it has capture info, use it
            if (validMove && validMove.captureRow !== undefined) {
                captureRow = validMove.captureRow;
                captureCol = validMove.captureCol;
            }
        }
        
        if (!validMove) {
            console.log('Invalid move attempted:', { fromRow, fromCol, toRow, toCol });
            return;
        }
        
        this.isProcessingMove = true;
        
        // Make the move
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Check if this was a jump
        if (validMove.captureRow !== undefined || captureRow !== undefined) {
            const capRow = captureRow !== undefined ? captureRow : validMove.captureRow;
            const capCol = captureCol !== undefined ? captureCol : validMove.captureCol;
            // Remove captured piece
            this.board[capRow][capCol] = null;
            
            // Check for king promotion
            if ((piece.color === 'red' && toRow === 7) || (piece.color === 'black' && toRow === 0)) {
                this.board[toRow][toCol].isKing = true;
            }
            
            // Check for additional jumps from this position
            const additionalJumps = this.getJumps(toRow, toCol);
            if (additionalJumps.length > 0) {
                // Must continue jumping
                this.selectedSquare = { row: toRow, col: toCol };
                this.possibleMoves = additionalJumps;
                this.renderBoard();
                this.updateDisplay();
                this.isProcessingMove = false;
                return;
            }
        } else {
            // Regular move - check for king promotion
            if ((piece.color === 'red' && toRow === 7) || (piece.color === 'black' && toRow === 0)) {
                this.board[toRow][toCol].isKing = true;
            }
        }
        
        this.moveCount++;
        this.selectedSquare = null;
        this.possibleMoves = [];
        
        // Check for game end conditions
        const gameResult = this.checkGameEnd();
        if (gameResult) {
            this.endGame(gameResult);
            return;
        }
        
        // Switch player
        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        this.mustJump = false;
        this.checkForJumps();
        this.renderBoard();
        this.updateDisplay();
        
        this.isProcessingMove = false;
        
        // If computer's turn, make a move automatically
        if (this.gameActive && this.isComputerTurn()) {
            setTimeout(() => this.computerMove(), 500);
        }
    }
    
    isComputerTurn() {
        if (this.currentPlayer === 'red') {
            return this.isComputerPlayer(this.player1Id);
        } else {
            return this.isComputerPlayer(this.player2Id);
        }
    }
    
    isComputerPlayer(playerId) {
        return playerId === this.COMPUTER_ID;
    }
    
    updateDifficultyVisibility() {
        const p2Id = this.player2Select?.value;
        const hasComputer = this.isComputerPlayer(p2Id);
        if (this.computerDifficultyGroup) {
            this.computerDifficultyGroup.style.display = hasComputer ? 'block' : 'none';
        }
    }
    
    computerMove() {
        if (!this.gameActive || this.isProcessingMove) return;
        
        this.isProcessingMove = true;
        
        // Find all possible moves
        const allMoves = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    const moves = this.getPossibleMoves(row, col);
                    moves.forEach(move => {
                        allMoves.push({ 
                            fromRow: row, 
                            fromCol: col, 
                            toRow: move.row, 
                            toCol: move.col, 
                            captureRow: move.captureRow, 
                            captureCol: move.captureCol,
                            piece: piece
                        });
                    });
                }
            }
        }
        
        if (allMoves.length === 0) {
            // No moves available - game over
            this.isProcessingMove = false;
            const winner = this.currentPlayer === 'red' ? 'black' : 'red';
            this.endGame(winner);
            return;
        }
        
        // Separate jumps and regular moves
        const jumps = allMoves.filter(m => m.captureRow !== undefined);
        const regularMoves = allMoves.filter(m => m.captureRow === undefined);
        
        // Select move based on difficulty
        let selectedMove;
        
        if (this.computerDifficulty === 'easy') {
            // Easy: Random move, prefer jumps if available
            const movesToUse = jumps.length > 0 ? jumps : regularMoves;
            selectedMove = movesToUse[Math.floor(Math.random() * movesToUse.length)];
        } else if (this.computerDifficulty === 'moderate') {
            // Moderate: Always prefer jumps, prefer moves that advance pieces
            if (jumps.length > 0) {
                // Prefer jumps that move pieces forward (toward king row)
                const forwardJumps = jumps.filter(move => {
                    const direction = this.currentPlayer === 'red' ? -1 : 1;
                    return (move.toRow - move.fromRow) * direction > 0;
                });
                const movesToUse = forwardJumps.length > 0 ? forwardJumps : jumps;
                selectedMove = movesToUse[Math.floor(Math.random() * movesToUse.length)];
            } else {
                // Prefer forward moves
                const forwardMoves = regularMoves.filter(move => {
                    const direction = this.currentPlayer === 'red' ? -1 : 1;
                    return (move.toRow - move.fromRow) * direction > 0;
                });
                const movesToUse = forwardMoves.length > 0 ? forwardMoves : regularMoves;
                selectedMove = movesToUse[Math.floor(Math.random() * movesToUse.length)];
            }
        } else {
            // Hard: Strategic play - prefer jumps, king pieces, center control
            if (jumps.length > 0) {
                // Prefer jumps with kings, or jumps that create more jumps
                const kingJumps = jumps.filter(move => move.piece.isKing);
                const movesToUse = kingJumps.length > 0 ? kingJumps : jumps;
                
                // Evaluate jumps
                const evaluatedJumps = movesToUse.map(move => {
                    let score = 10; // Base score for jump
                    if (move.piece.isKing) score += 5;
                    // Prefer jumps that move toward center
                    const centerDistance = Math.abs(move.toCol - 3.5);
                    score += (4 - centerDistance);
                    return { move, score };
                });
                
                evaluatedJumps.sort((a, b) => b.score - a.score);
                const topJumps = evaluatedJumps.slice(0, Math.max(1, Math.floor(evaluatedJumps.length * 0.3)));
                selectedMove = topJumps[Math.floor(Math.random() * topJumps.length)].move;
            } else {
                // Evaluate regular moves
                const evaluatedMoves = regularMoves.map(move => {
                    let score = 0;
                    if (move.piece.isKing) score += 3;
                    // Prefer moves toward opponent's side
                    const direction = this.currentPlayer === 'red' ? -1 : 1;
                    if ((move.toRow - move.fromRow) * direction > 0) score += 2;
                    // Prefer center control
                    const centerDistance = Math.abs(move.toCol - 3.5);
                    score += (4 - centerDistance);
                    return { move, score };
                });
                
                evaluatedMoves.sort((a, b) => b.score - a.score);
                const topMoves = evaluatedMoves.slice(0, Math.max(1, Math.floor(evaluatedMoves.length * 0.3)));
                selectedMove = topMoves[Math.floor(Math.random() * topMoves.length)].move;
            }
        }
        
        // Make the move after a short delay for better UX
        setTimeout(() => {
            this.isProcessingMove = false;
            this.makeMove(
                selectedMove.fromRow, 
                selectedMove.fromCol, 
                selectedMove.toRow, 
                selectedMove.toCol,
                selectedMove.captureRow,
                selectedMove.captureCol
            );
        }, 300);
    }
    
    checkGameEnd() {
        // Check if current player has any pieces
        let redPieces = 0;
        let blackPieces = 0;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    if (piece.color === 'red') redPieces++;
                    else blackPieces++;
                }
            }
        }
        
        if (redPieces === 0) return 'black'; // Black wins
        if (blackPieces === 0) return 'red'; // Red wins
        
        // Check if current player has any moves
        const hasMoves = this.hasAnyMoves(this.currentPlayer);
        if (!hasMoves) {
            // Current player loses (no moves available)
            return this.currentPlayer === 'red' ? 'black' : 'red';
        }
        
        return null;
    }
    
    hasAnyMoves(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === color) {
                    const moves = this.getPossibleMoves(row, col);
                    if (moves.length > 0) return true;
                }
            }
        }
        return false;
    }
    
    endGame(result) {
        this.gameActive = false;
        const gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
        
        let message = '';
        let messageClass = '';
        
        if (result === 'red') {
            message = `${this.player1Name} (Red) wins!`;
            messageClass = 'win';
        } else if (result === 'black') {
            message = `${this.player2Name} (Black) wins!`;
            messageClass = 'loss';
        } else {
            message = 'Game ended in a draw!';
            messageClass = 'draw';
        }
        
        this.gameMessage.textContent = message;
        this.gameMessage.className = `game-message ${messageClass}`;
        this.gameMessage.style.display = 'block';
        
        // Save game statistics
        this.saveGameStats(result, gameDuration);
    }
    
    async saveGameStats(result, gameDuration) {
        try {
            const session = window.authStatus?.getSession();
            if (!session) return;
            
            const isComputerOpponent = this.isComputerPlayer(this.player2Id);
            const opponentUid = isComputerOpponent ? null : parseInt(this.player2Id);
            
            // Save for Player 1
            const player1Result = result === 'red' ? 'win' : (result === 'black' ? 'loss' : 'draw');
            await supabase
                .from('checkers_scores')
                .insert({
                    user_uid: parseInt(this.player1Id),
                    opponent_uid: opponentUid,
                    is_computer_opponent: isComputerOpponent,
                    result: player1Result,
                    moves_count: this.moveCount,
                    game_duration_seconds: gameDuration
                });
            
            // Save for Player 2 (if not computer)
            if (!isComputerOpponent) {
                const player2Result = result === 'black' ? 'win' : (result === 'red' ? 'loss' : 'draw');
                await supabase
                    .from('checkers_scores')
                    .insert({
                        user_uid: opponentUid,
                        opponent_uid: parseInt(this.player1Id),
                        is_computer_opponent: false,
                        result: player2Result,
                        moves_count: this.moveCount,
                        game_duration_seconds: gameDuration
                    });
            }
        } catch (error) {
            console.error('Error saving game stats:', error);
        }
    }
    
    updateDisplay() {
        const playerName = this.currentPlayer === 'red' ? this.player1Name : this.player2Name;
        const playerColor = this.currentPlayer === 'red' ? 'Red' : 'Black';
        const isComputerTurn = this.isComputerTurn();
        let displayText = `Current Player: ${playerName} (${playerColor})`;
        
        if (isComputerTurn) {
            displayText += ' 🤖 (Computer is thinking...)';
        }
        
        if (this.mustJump) {
            displayText += ' - Must Jump!';
        }
        
        this.currentPlayerDisplay.textContent = displayText;
        this.moveCountDisplay.textContent = `Moves: ${this.moveCount}`;
    }
    
    newGame() {
        this.initializeBoard();
    }
    
    newPlayers() {
        this.gameSection.classList.add('hidden');
        this.playerSetup.classList.remove('hidden');
        this.gameMessage.style.display = 'none';
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CheckersGame();
});

