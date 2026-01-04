// Chess Game

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

class ChessGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 'white'; // 'white' or 'black'
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
        this.computerDifficulty = 'moderate'; // 'easy', 'moderate', 'hard'
        
        // Piece Unicode symbols
        this.pieces = {
            white: {
                king: '♔',
                queen: '♕',
                rook: '♖',
                bishop: '♗',
                knight: '♘',
                pawn: '♙'
            },
            black: {
                king: '♚',
                queen: '♛',
                rook: '♜',
                bishop: '♝',
                knight: '♞',
                pawn: '♟'
            }
        };
        
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
        this.chessBoard = document.getElementById('chessBoard');
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
                alert('You do not have enough credits to play. Chess costs 3 credits per game. Please earn more credits.');
                return;
            }
            
            if (!p2IsComputer) {
                const p2Player = this.players[p2Id];
                if (!p2Player || p2Player.credits === undefined || p2Player.credits < 3) {
                    alert(`${p2Player.name} does not have enough credits to play. Chess costs 3 credits per game.`);
                    return;
                }
            }
            
            // Deduct credits (3 credits for Chess)
            const deductResult1 = await deductCredits(parseInt(p1Id), 'chess', null, 3);
            if (!deductResult1.success) {
                alert('Unable to deduct credits. Please try again.');
                return;
            }
            p1Player.credits = deductResult1.newBalance;
            
            if (!p2IsComputer) {
                const deductResult2 = await deductCredits(parseInt(p2Id), 'chess', null, 3);
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
        // Initialize empty board
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Place pieces in starting positions
        const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        
        // Black pieces (top)
        for (let col = 0; col < 8; col++) {
            this.board[0][col] = { type: pieces[col], color: 'black' };
            this.board[1][col] = { type: 'pawn', color: 'black' };
        }
        
        // White pieces (bottom)
        for (let col = 0; col < 8; col++) {
            this.board[7][col] = { type: pieces[col], color: 'white' };
            this.board[6][col] = { type: 'pawn', color: 'white' };
        }
        
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.possibleMoves = [];
        this.moveCount = 0;
        this.gameActive = true;
        this.gameStartTime = Date.now();
        this.gameMessage.style.visibility = 'hidden';
        
        this.renderBoard();
        this.updateDisplay();
        
        // If it's the computer's turn, make a move automatically
        if (this.isComputerTurn()) {
            setTimeout(() => this.computerMove(), 500);
        }
    }
    
    renderBoard() {
        this.chessBoard.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                
                const piece = this.board[row][col];
                if (piece) {
                    square.textContent = this.pieces[piece.color][piece.type];
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
                this.chessBoard.appendChild(square);
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
        const isOpponentPiece = piece && piece.color !== this.currentPlayer;
        
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
    
    getPossibleMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        const moves = [];
        // Simplified move generation (basic implementation)
        // This is a simplified version - a full implementation would be much more complex
        
        if (piece.type === 'pawn') {
            const direction = piece.color === 'white' ? -1 : 1;
            const startRow = piece.color === 'white' ? 6 : 1;
            
            // Move forward one square
            if (row + direction >= 0 && row + direction < 8 && !this.board[row + direction][col]) {
                moves.push({ row: row + direction, col });
            }
            
            // Move forward two squares from starting position
            if (row === startRow && !this.board[row + direction][col] && !this.board[row + 2 * direction][col]) {
                moves.push({ row: row + 2 * direction, col });
            }
            
            // Capture diagonally
            for (const dcol of [-1, 1]) {
                const newCol = col + dcol;
                if (newCol >= 0 && newCol < 8 && row + direction >= 0 && row + direction < 8) {
                    const target = this.board[row + direction][newCol];
                    if (target && target.color !== piece.color) {
                        moves.push({ row: row + direction, col: newCol });
                    }
                }
            }
        } else if (piece.type === 'rook') {
            // Horizontal and vertical moves
            for (const [drow, dcol] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + drow * i;
                    const newCol = col + dcol * i;
                    if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
                    if (this.board[newRow][newCol]) {
                        if (this.board[newRow][newCol].color !== piece.color) {
                            moves.push({ row: newRow, col: newCol });
                        }
                        break;
                    }
                    moves.push({ row: newRow, col: newCol });
                }
            }
        } else if (piece.type === 'bishop') {
            // Diagonal moves
            for (const [drow, dcol] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + drow * i;
                    const newCol = col + dcol * i;
                    if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
                    if (this.board[newRow][newCol]) {
                        if (this.board[newRow][newCol].color !== piece.color) {
                            moves.push({ row: newRow, col: newCol });
                        }
                        break;
                    }
                    moves.push({ row: newRow, col: newCol });
                }
            }
        } else if (piece.type === 'queen') {
            // Combination of rook and bishop moves
            for (const [drow, dcol] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + drow * i;
                    const newCol = col + dcol * i;
                    if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
                    if (this.board[newRow][newCol]) {
                        if (this.board[newRow][newCol].color !== piece.color) {
                            moves.push({ row: newRow, col: newCol });
                        }
                        break;
                    }
                    moves.push({ row: newRow, col: newCol });
                }
            }
        } else if (piece.type === 'king') {
            // One square in any direction
            for (const [drow, dcol] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                const newRow = row + drow;
                const newCol = col + dcol;
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const target = this.board[newRow][newCol];
                    if (!target || target.color !== piece.color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                }
            }
        } else if (piece.type === 'knight') {
            // L-shaped moves
            for (const [drow, dcol] of [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]) {
                const newRow = row + drow;
                const newCol = col + dcol;
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const target = this.board[newRow][newCol];
                    if (!target || target.color !== piece.color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                }
            }
        }
        
        return moves;
    }
    
    makeMove(fromRow, fromCol, toRow, toCol) {
        if (this.isProcessingMove) return;
        
        const piece = this.board[fromRow][fromCol];
        if (!piece || piece.color !== this.currentPlayer) return;
        
        // Check if move is valid - either from possibleMoves (player clicks) or validate directly (computer moves)
        let validMove = false;
        if (this.possibleMoves.length > 0) {
            // Player clicked on a square, use stored possible moves
            validMove = this.possibleMoves.some(m => m.row === toRow && m.col === toCol);
        } else {
            // Computer move or direct call - validate the move directly
            const possibleMoves = this.getPossibleMoves(fromRow, fromCol);
            validMove = possibleMoves.some(m => m.row === toRow && m.col === toCol);
        }
        
        if (!validMove) {
            console.log('Invalid move attempted:', { fromRow, fromCol, toRow, toCol });
            return;
        }
        
        this.isProcessingMove = true;
        
        // Make the move
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Check for pawn promotion
        if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
            this.board[toRow][toCol].type = 'queen';
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
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        this.renderBoard();
        this.updateDisplay();
        
        this.isProcessingMove = false;
        
        // If computer's turn, make a move automatically
        if (this.gameActive && this.isComputerTurn()) {
            setTimeout(() => this.computerMove(), 500);
        }
    }
    
    isComputerTurn() {
        if (this.currentPlayer === 'white') {
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
                            piece: piece
                        });
                    });
                }
            }
        }
        
        if (allMoves.length === 0) {
            // No moves available - checkmate or stalemate
            this.isProcessingMove = false;
            this.endGame('draw');
            return;
        }
        
        // Select move based on difficulty
        let selectedMove;
        
        if (this.computerDifficulty === 'easy') {
            // Easy: Random move
            selectedMove = allMoves[Math.floor(Math.random() * allMoves.length)];
        } else if (this.computerDifficulty === 'moderate') {
            // Moderate: Prefer captures, avoid losing pieces
            const captures = allMoves.filter(move => {
                const targetPiece = this.board[move.toRow][move.toCol];
                return targetPiece && targetPiece.color !== this.currentPlayer;
            });
            
            if (captures.length > 0) {
                // Prefer capturing higher value pieces
                const pieceValues = { pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: 100 };
                captures.sort((a, b) => {
                    const aValue = pieceValues[this.board[a.toRow][a.toCol]?.type] || 0;
                    const bValue = pieceValues[this.board[b.toRow][b.toCol]?.type] || 0;
                    return bValue - aValue;
                });
                selectedMove = captures[0];
            } else {
                // No captures, pick random
                selectedMove = allMoves[Math.floor(Math.random() * allMoves.length)];
            }
        } else {
            // Hard: Evaluate moves with look-ahead
            const evaluatedMoves = allMoves.map(move => {
                const score = this.evaluateMove(move);
                return { move, score };
            });
            
            // Sort by score (higher is better)
            evaluatedMoves.sort((a, b) => b.score - a.score);
            
            // Pick from top moves (top 30% or at least top 3)
            const topCount = Math.max(3, Math.floor(evaluatedMoves.length * 0.3));
            const topMoves = evaluatedMoves.slice(0, topCount);
            const randomTop = topMoves[Math.floor(Math.random() * topMoves.length)];
            selectedMove = randomTop.move;
        }
        
        // Make the move after a short delay for better UX
        setTimeout(() => {
            this.isProcessingMove = false;
            this.makeMove(selectedMove.fromRow, selectedMove.fromCol, selectedMove.toRow, selectedMove.toCol);
        }, 300);
    }
    
    evaluateMove(move) {
        // Simple evaluation: prefer captures, center control, piece development
        let score = 0;
        const targetPiece = this.board[move.toRow][move.toCol];
        
        // Capture bonus
        if (targetPiece && targetPiece.color !== this.currentPlayer) {
            const pieceValues = { pawn: 10, knight: 30, bishop: 30, rook: 50, queen: 90, king: 0 };
            score += pieceValues[targetPiece.type] || 0;
        }
        
        // Center control bonus
        const centerDistance = Math.abs(move.toRow - 3.5) + Math.abs(move.toCol - 3.5);
        score += (7 - centerDistance) * 2;
        
        // Avoid moving into danger (simplified)
        // This is a basic check - full implementation would check if square is attacked
        
        return score;
    }
    
    checkGameEnd() {
        // Simplified check - look for king capture or no moves
        let whiteKing = null;
        let blackKing = null;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.type === 'king') {
                    if (piece.color === 'white') {
                        whiteKing = { row, col };
                    } else {
                        blackKing = { row, col };
                    }
                }
            }
        }
        
        if (!whiteKing) return 'black'; // Black wins
        if (!blackKing) return 'white'; // White wins
        
        // Check if current player has any moves
        const hasMoves = this.hasAnyMoves(this.currentPlayer);
        if (!hasMoves) {
            // Check if in check (simplified - just return draw for now)
            return 'draw';
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
        
        if (result === 'white') {
            message = `${this.player1Name} (White) wins!`;
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
        this.gameMessage.style.visibility = 'visible';
        
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
            const player1Result = result === 'white' ? 'win' : (result === 'black' ? 'loss' : 'draw');
            await supabase
                .from('chess_scores')
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
                const player2Result = result === 'black' ? 'win' : (result === 'white' ? 'loss' : 'draw');
                await supabase
                    .from('chess_scores')
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
        const playerName = this.currentPlayer === 'white' ? this.player1Name : this.player2Name;
        const isComputerTurn = this.isComputerTurn();
        let displayText = `Current Player: ${playerName} (${this.currentPlayer})`;
        
        if (isComputerTurn) {
            displayText += ' 🤖 (Computer is thinking...)';
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
        this.gameMessage.style.visibility = 'hidden';
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChessGame();
});

