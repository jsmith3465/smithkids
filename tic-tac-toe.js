// Tic Tac Toe Game - Using Users from Database
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { checkCredits, deductCredits, showCreditWarning } from './credit-system.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.player1Name = '';
        this.player2Name = '';
        this.player1Id = null;
        this.player2Id = null;
        this.gameActive = false;
        this.winningLine = null;
        this.COMPUTER_ID = 'COMPUTER'; // Special ID for Computer player
        this.players = {};
        this.computerDifficulty = this.loadDifficulty();
        this.users = []; // Store users from database
        
        this.init();
    }

    async init() {
        // Fetch users from database
        await this.loadUsersFromDatabase();
        
        this.playerSetup = document.getElementById('playerSetup');
        this.gameSection = document.getElementById('gameSection');
        this.gameSetup = document.querySelector('.game-setup');
        this.player1Select = document.getElementById('player1Select');
        this.player2Select = document.getElementById('player2Select');
        this.computerDifficultyGroup = document.getElementById('computerDifficultyGroup');
        this.computerDifficultySelect = document.getElementById('computerDifficulty');
        this.gameDifficultyGroup = document.getElementById('gameDifficultyGroup');
        this.gameComputerDifficultySelect = document.getElementById('gameComputerDifficulty');
        this.startGameBtn = document.getElementById('startGameBtn');
        
        // Set difficulty selector to saved value
        if (this.computerDifficultySelect) {
            this.computerDifficultySelect.value = this.computerDifficulty;
        }
        this.memePopup = document.getElementById('memePopup');
        this.memeImage = document.getElementById('memeImage');
        this.closeMemeBtn = document.getElementById('closeMemeBtn');
        this.winnerNameSpan = document.getElementById('winnerNameSpan');
        this.gameBoard = document.getElementById('gameBoard');
        this.currentPlayerName = document.getElementById('currentPlayerName');
        this.player1Display = document.getElementById('player1Display');
        this.player2Display = document.getElementById('player2Display');
        this.player1Wins = document.getElementById('player1Wins');
        this.player1Losses = document.getElementById('player1Losses');
        this.player1Draws = document.getElementById('player1Draws');
        this.player2Wins = document.getElementById('player2Wins');
        this.player2Losses = document.getElementById('player2Losses');
        this.player2Draws = document.getElementById('player2Draws');
        this.gameMessage = document.getElementById('gameMessage');
        this.currentWinnerName = null;
        this.newGameBtn = document.getElementById('newGameBtn');
        this.newPlayersBtn = document.getElementById('newPlayersBtn');
        this.winLine = document.getElementById('winLine');
        this.line = document.getElementById('line');
        this.boardContainer = document.querySelector('.board-container');
        this.gameStartTime = null;

        // Event listeners
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.player1Select.addEventListener('change', () => this.updateDifficultyVisibility());
        this.player2Select.addEventListener('change', () => this.updateDifficultyVisibility());
        if (this.computerDifficultySelect) {
            this.computerDifficultySelect.addEventListener('change', (e) => {
                this.computerDifficulty = e.target.value;
                this.saveDifficulty();
                if (this.gameComputerDifficultySelect) {
                    this.gameComputerDifficultySelect.value = this.computerDifficulty;
                }
            });
        }
        if (this.gameComputerDifficultySelect) {
            this.gameComputerDifficultySelect.addEventListener('change', (e) => {
                this.computerDifficulty = e.target.value;
                this.saveDifficulty();
                if (this.computerDifficultySelect) {
                    this.computerDifficultySelect.value = this.computerDifficulty;
                }
            });
        }
        this.closeMemeBtn.addEventListener('click', () => this.hideMeme());
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.newPlayersBtn.addEventListener('click', () => this.newPlayers());
        
        // Winning memes
        this.winningMemeTemplates = [
            { top: "WHEN YOU WIN", bottom: "AT TIC TAC TOE", emoji: "😎" },
            { top: "ME AFTER WINNING", bottom: "TIC TAC TOE", emoji: "🎉" },
            { top: "I JUST WON", bottom: "FEELING UNSTOPPABLE", emoji: "💪" },
            { top: "VICTORY DANCE", bottom: "AFTER WINNING", emoji: "🕺" },
            { top: "I'M THE CHAMPION", bottom: "OF TIC TAC TOE", emoji: "🏆" },
            { top: "WINNING FEELS", bottom: "SO GOOD", emoji: "🔥" },
            { top: "I DOMINATED", bottom: "THAT GAME", emoji: "👑" },
            { top: "ANOTHER WIN", bottom: "ANOTHER DAY", emoji: "✨" },
        ];
        
        // Initialize UI
        this.updatePlayerSelects();
        this.updateDifficultyVisibility();
    }
    
    // Load users from database
    async loadUsersFromDatabase() {
        try {
            const { data, error } = await supabase
                .from('Users')
                .select('UID, First_Name, Last_Name, Username')
                .order('First_Name', { ascending: true });
            
            if (error) {
                console.error('Error loading users:', error);
                return;
            }
            
            this.users = data || [];
            
            // Build players object with Computer player
            this.players[this.COMPUTER_ID] = {
                name: 'Computer',
                wins: 0,
                losses: 0,
                draws: 0
            };
            
            // Add users to players object
            this.users.forEach(user => {
                const displayName = this.getDisplayName(user);
                this.players[user.UID] = {
                    name: displayName,
                    uid: user.UID,
                    wins: 0,
                    losses: 0,
                    draws: 0
                };
            });
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }
    
    // Get display name: "First Name Last Name"
    getDisplayName(user) {
        const firstName = user.First_Name || '';
        const lastName = user.Last_Name || '';
        const fullName = `${firstName} ${lastName}`.trim();
        return fullName || user.Username || 'Unknown';
    }
    
    updateDifficultyVisibility() {
        const p1Id = this.player1Select.value;
        const p2Id = this.player2Select.value;
        const hasComputer = this.isComputerPlayer(p1Id) || this.isComputerPlayer(p2Id);
        
        if (hasComputer && this.computerDifficultyGroup) {
            this.computerDifficultyGroup.classList.remove('hidden');
        } else if (this.computerDifficultyGroup) {
            this.computerDifficultyGroup.classList.add('hidden');
        }
    }

    loadDifficulty() {
        const stored = localStorage.getItem('ticTacToeDifficulty');
        return stored || 'moderate';
    }
    
    saveDifficulty() {
        localStorage.setItem('ticTacToeDifficulty', this.computerDifficulty);
    }
    
    isComputerPlayer(playerId) {
        return playerId === this.COMPUTER_ID;
    }
    
    isCurrentPlayerComputer() {
        if (this.currentPlayer === 'X') {
            return this.isComputerPlayer(this.player1Id);
        } else {
            return this.isComputerPlayer(this.player2Id);
        }
    }

    updatePlayerSelects() {
        const playerArray = Object.entries(this.players).sort((a, b) => {
            // Put Computer first, then sort others alphabetically
            if (a[0] === this.COMPUTER_ID) return -1;
            if (b[0] === this.COMPUTER_ID) return 1;
            return a[1].name.localeCompare(b[1].name);
        });

        // Save current selections
        const p1Selected = this.player1Select.value;
        const p2Selected = this.player2Select.value;

        // Clear and rebuild options
        this.player1Select.innerHTML = '<option value="">Select a player...</option>';
        this.player2Select.innerHTML = '<option value="">Select a player...</option>';

        playerArray.forEach(([id, player]) => {
            const option1 = document.createElement('option');
            option1.value = id;
            option1.textContent = player.name + (id === this.COMPUTER_ID ? ' 🤖' : '');
            this.player1Select.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = id;
            option2.textContent = player.name + (id === this.COMPUTER_ID ? ' 🤖' : '');
            this.player2Select.appendChild(option2);
        });

        // Restore selections if they still exist
        if (this.players[p1Selected]) {
            this.player1Select.value = p1Selected;
        }
        if (this.players[p2Selected]) {
            this.player2Select.value = p2Selected;
        }
        
        this.updateDifficultyVisibility();
    }

    async startGame() {
        const p1Id = this.player1Select.value;
        const p2Id = this.player2Select.value;

        if (!p1Id || !p2Id) {
            alert('Please select both players!');
            return;
        }

        if (p1Id === p2Id) {
            alert('Please select two different players!');
            return;
        }
        
        // Check and deduct credits before starting (skip for admins)
        const session = window.authStatus?.getSession();
        if (session && session.userType !== 'admin') {
            const creditCheck = await checkCredits(session.uid);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
            
            // Deduct credit when game begins
            const deductResult = await deductCredits(session.uid, 'tic_tac_toe');
            if (!deductResult.success) {
                alert('Unable to process payment. Please try again.');
                return;
            }
        }

        this.player1Id = p1Id;
        this.player2Id = p2Id;
        this.player1Name = this.players[p1Id].name;
        this.player2Name = this.players[p2Id].name;
        this.player1Symbol = null; // Will be set in initializeBoard
        this.player2Symbol = null; // Will be set in initializeBoard

        this.playerSetup.classList.add('hidden');
        this.gameSection.classList.remove('hidden');
        
        const hasComputer = this.isComputerPlayer(p1Id) || this.isComputerPlayer(p2Id);
        if (hasComputer && this.gameDifficultyGroup) {
            this.gameDifficultyGroup.classList.remove('hidden');
            if (this.gameComputerDifficultySelect) {
                this.gameComputerDifficultySelect.value = this.computerDifficulty;
            }
        } else if (this.gameDifficultyGroup) {
            this.gameDifficultyGroup.classList.add('hidden');
        }
        
        this.initializeBoard();
        this.updatePlayerStats();
    }

    initializeBoard() {
        this.board = Array(9).fill(null);
        this.currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
        // Player 1 is always X, Player 2 is always O (as per UI labels)
        this.player1Symbol = 'X';
        this.player2Symbol = 'O';
        this.gameActive = true;
        this.winningLine = null;
        this.clearWinLine();
        this.gameMessage.textContent = '';
        this.gameMessage.className = 'game-message';
        this.gameMessage.onclick = null;
        this.currentWinnerName = null;
        this.hideMeme();
        this.gameStartTime = Date.now(); // Track game start time
        
        this.newGameBtn.disabled = true;
        this.newGameBtn.classList.add('btn-disabled');
        
        this.gameBoard.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('button');
            cell.className = 'cell';
            cell.dataset.index = i;
            cell.addEventListener('click', () => this.handleCellClick(i));
            this.gameBoard.appendChild(cell);
        }
        
        this.updateDisplay();
        
        if (this.isCurrentPlayerComputer() && this.gameActive) {
            setTimeout(() => {
                this.computerMove();
            }, 500);
        }
    }

    handleCellClick(index) {
        if (this.isCurrentPlayerComputer()) {
            return;
        }
        
        if (!this.gameActive || this.board[index] !== null || this.winningLine) {
            return;
        }

        this.makeMove(index);
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        const cell = this.gameBoard.children[index];
        cell.textContent = this.currentPlayer;
        cell.offsetHeight;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.classList.add('disabled');

        const winner = this.checkWinner();
        
        if (winner) {
            this.gameActive = false;
            this.handleWin(winner);
        } else if (this.board.every(cell => cell !== null)) {
            this.gameActive = false;
            this.handleDraw();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
            
            if (this.isCurrentPlayerComputer() && this.gameActive) {
                setTimeout(() => {
                    this.computerMove();
                }, 500);
            }
        }
    }
    
    computerMove() {
        if (!this.gameActive || !this.isCurrentPlayerComputer()) {
            return;
        }
        
        const availableMoves = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                availableMoves.push(i);
            }
        }
        
        if (availableMoves.length === 0) {
            return;
        }
        
        let bestMove;
        if (this.computerDifficulty === 'easy') {
            bestMove = this.findEasyMove();
        } else if (this.computerDifficulty === 'moderate') {
            bestMove = this.findBestMove();
        } else {
            bestMove = this.findHardMove();
        }
        
        this.makeMove(bestMove);
    }
    
    findEasyMove() {
        const availableMoves = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                availableMoves.push(i);
            }
        }
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    findBestMove() {
        const computerSymbol = this.currentPlayer;
        const opponentSymbol = computerSymbol === 'X' ? 'O' : 'X';
        
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = computerSymbol;
                if (this.checkWinner() && this.checkWinner().player === computerSymbol) {
                    this.board[i] = null;
                    return i;
                }
                this.board[i] = null;
            }
        }
        
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = opponentSymbol;
                if (this.checkWinner() && this.checkWinner().player === opponentSymbol) {
                    this.board[i] = null;
                    return i;
                }
                this.board[i] = null;
            }
        }
        
        const forkMove = this.findForkMove(computerSymbol, opponentSymbol);
        if (forkMove !== null) {
            return forkMove;
        }
        
        const blockForkMove = this.findForkMove(opponentSymbol, computerSymbol);
        if (blockForkMove !== null) {
            return blockForkMove;
        }
        
        if (this.board[4] === null) {
            return 4;
        }
        
        const corners = [0, 2, 6, 8];
        const cornerPairs = [[0, 8], [2, 6]];
        for (let pair of cornerPairs) {
            const [corner1, corner2] = pair;
            if (this.board[corner1] === opponentSymbol && this.board[corner2] === null) {
                return corner2;
            }
            if (this.board[corner2] === opponentSymbol && this.board[corner1] === null) {
                return corner1;
            }
        }
        
        const availableCorners = corners.filter(i => this.board[i] === null);
        if (availableCorners.length > 0) {
            return availableCorners[0];
        }
        
        const edges = [1, 3, 5, 7];
        const availableEdges = edges.filter(i => this.board[i] === null);
        if (availableEdges.length > 0) {
            for (let edge of availableEdges) {
                const adjacentPositions = this.getAdjacentPositions(edge);
                const hasAdjacentComputerPiece = adjacentPositions.some(pos => this.board[pos] === computerSymbol);
                if (hasAdjacentComputerPiece) {
                    return edge;
                }
            }
            return availableEdges[0];
        }
        
        const availableMoves = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                availableMoves.push(i);
            }
        }
        return availableMoves[0];
    }
    
    findForkMove(playerSymbol, opponentSymbol) {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = playerSymbol;
                const winningLines = this.countWinningLines(playerSymbol);
                this.board[i] = null;
                
                if (winningLines >= 2) {
                    return i;
                }
            }
        }
        return null;
    }
    
    countWinningLines(symbol) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        let count = 0;
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const line = [this.board[a], this.board[b], this.board[c]];
            const symbolCount = line.filter(cell => cell === symbol).length;
            const emptyCount = line.filter(cell => cell === null).length;
            
            if (symbolCount === 2 && emptyCount === 1) {
                count++;
            }
        }
        return count;
    }
    
    getAdjacentPositions(position) {
        const adjacentMap = {
            0: [1, 3, 4], 1: [0, 2, 4], 2: [1, 4, 5],
            3: [0, 4, 6], 4: [0, 1, 2, 3, 5, 6, 7, 8], 5: [2, 4, 8],
            6: [3, 4, 7], 7: [4, 6, 8], 8: [4, 5, 7]
        };
        return adjacentMap[position] || [];
    }
    
    findHardMove() {
        const computerSymbol = this.currentPlayer;
        const opponentSymbol = computerSymbol === 'X' ? 'O' : 'X';
        
        let bestScore = -Infinity;
        let bestMove = null;
        
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = computerSymbol;
                const score = this.minimax(this.board, 0, false, computerSymbol, opponentSymbol);
                this.board[i] = null;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        
        return bestMove !== null ? bestMove : this.findBestMove();
    }
    
    minimax(board, depth, isMaximizing, computerSymbol, opponentSymbol) {
        const winner = this.evaluateBoard(board, computerSymbol, opponentSymbol);
        
        if (winner === computerSymbol) {
            return 10 - depth;
        } else if (winner === opponentSymbol) {
            return depth - 10;
        } else if (this.isBoardFull(board)) {
            return 0;
        }
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = computerSymbol;
                    const score = this.minimax(board, depth + 1, false, computerSymbol, opponentSymbol);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = opponentSymbol;
                    const score = this.minimax(board, depth + 1, true, computerSymbol, opponentSymbol);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
    
    evaluateBoard(board, computerSymbol, opponentSymbol) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
    
    isBoardFull(board) {
        return board.every(cell => cell !== null);
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return { player: this.board[a], pattern: pattern };
            }
        }

        return null;
    }

    async handleWin(winner) {
        const winnerName = winner.player === 'X' ? this.player1Name : this.player2Name;
        
        this.currentWinnerName = winnerName;
        
        this.gameMessage.textContent = `${winnerName} wins!`;
        this.gameMessage.classList.add('winner', 'clickable-message');
        
        if (winner.player === 'X') {
            this.players[this.player1Id].wins++;
            this.players[this.player2Id].losses++;
        } else {
            this.players[this.player2Id].wins++;
            this.players[this.player1Id].losses++;
        }
        
        this.updatePlayerStats();
        this.drawWinLine(winner.pattern);
        
        // Save game result to database
        const gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
        await this.saveGameResult(winner.player, false, gameDuration);
        
        this.gameMessage.onclick = () => {
            if (this.currentWinnerName) {
                this.showRandomMeme(this.currentWinnerName);
            }
        };
        
        Array.from(this.gameBoard.children).forEach(cell => {
            cell.classList.add('disabled');
        });
        
        this.newGameBtn.disabled = false;
        this.newGameBtn.classList.remove('btn-disabled');
        
    }
    
    showRandomMeme(winnerName) {
        this.winnerNameSpan.textContent = winnerName;
        
        const memeTemplate = this.winningMemeTemplates[Math.floor(Math.random() * this.winningMemeTemplates.length)];
        this.createTextMeme(memeTemplate);
        
        this.memePopup.classList.remove('hidden');
    }
    
    createTextMeme(template) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 600, 500);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#FFA500');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 500);
        
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 5;
        ctx.strokeRect(5, 5, 590, 490);
        
        ctx.fillStyle = '#000';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(template.top, 300, 150);
        
        ctx.font = 'bold 48px Arial';
        ctx.fillText(template.bottom, 300, 250);
        
        ctx.font = 'bold 100px Arial';
        ctx.fillText(template.emoji, 300, 380);
        
        this.memeImage.src = canvas.toDataURL();
    }
    
    hideMeme() {
        this.memePopup.classList.add('hidden');
    }

    async handleDraw() {
        this.gameMessage.textContent = "It's a draw! (Cat's Game)";
        this.gameMessage.classList.add('draw');
        
        this.players[this.player1Id].draws++;
        this.players[this.player2Id].draws++;
        
        this.updatePlayerStats();
        
        // Save game result to database
        const gameDuration = Math.floor((Date.now() - this.gameStartTime) / 1000);
        await this.saveGameResult(null, true, gameDuration);
        
        this.newGameBtn.disabled = false;
        this.newGameBtn.classList.remove('btn-disabled');
        
    }

    drawWinLine(pattern) {
        const [a, b, c] = pattern;
        const containerRect = this.boardContainer.getBoundingClientRect();
        
        const getCellCenter = (index) => {
            const cell = this.gameBoard.children[index];
            const cellRect = cell.getBoundingClientRect();
            const relativeX = cellRect.left - containerRect.left + cellRect.width / 2;
            const relativeY = cellRect.top - containerRect.top + cellRect.height / 2;
            return { x: relativeX, y: relativeY };
        };

        const start = getCellCenter(a);
        const end = getCellCenter(c);
        
        this.winLine.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);
        this.winLine.setAttribute('width', containerRect.width);
        this.winLine.setAttribute('height', containerRect.height);
        
        this.line.setAttribute('x1', start.x);
        this.line.setAttribute('y1', start.y);
        this.line.setAttribute('x2', end.x);
        this.line.setAttribute('y2', end.y);
        
        this.winningLine = pattern;
    }

    clearWinLine() {
        this.line.setAttribute('x1', '0');
        this.line.setAttribute('y1', '0');
        this.line.setAttribute('x2', '0');
        this.line.setAttribute('y2', '0');
    }

    updateDisplay() {
        const currentName = this.currentPlayer === 'X' ? this.player1Name : this.player2Name;
        this.currentPlayerName.textContent = currentName;
        
        const currentPlayerEl = this.currentPlayerName.parentElement;
        currentPlayerEl.className = `current-player active-${this.currentPlayer.toLowerCase()}`;
    }

    updatePlayerStats() {
        if (!this.player1Id || !this.player2Id) return;
        
        const p1 = this.players[this.player1Id];
        const p2 = this.players[this.player2Id];
        
        this.player1Display.textContent = p1.name;
        this.player1Wins.textContent = p1.wins;
        this.player1Losses.textContent = p1.losses;
        this.player1Draws.textContent = p1.draws;
        
        this.player2Display.textContent = p2.name;
        this.player2Wins.textContent = p2.wins;
        this.player2Losses.textContent = p2.losses;
        this.player2Draws.textContent = p2.draws;
    }

    newGame() {
        this.initializeBoard();
    }

    newPlayers() {
        this.gameSection.classList.add('hidden');
        this.playerSetup.classList.remove('hidden');
        this.updatePlayerSelects();
    }
    
    async saveGameResult(winnerSymbol, isDraw, gameDuration) {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            console.error('No user session found');
            return;
        }
        
        try {
            // Determine player UIDs and symbols
            const p1IsComputer = this.isComputerPlayer(this.player1Id);
            const p2IsComputer = this.isComputerPlayer(this.player2Id);
            
            // Get player UIDs (null for Computer)
            const player1Uid = p1IsComputer ? null : parseInt(this.player1Id);
            const player2Uid = p2IsComputer ? null : parseInt(this.player2Id);
            
            // Use stored player symbols
            const player1Symbol = this.player1Symbol || 'X';
            const player2Symbol = this.player2Symbol || 'O';
            
            // Determine winner UID
            let winnerUid = null;
            if (!isDraw && winnerSymbol) {
                if (winnerSymbol === player1Symbol) {
                    winnerUid = p1IsComputer ? null : player1Uid;
                } else {
                    winnerUid = p2IsComputer ? null : player2Uid;
                }
            }
            
            const gameData = {
                player1_uid: player1Uid,
                player2_uid: player2Uid,
                player1_symbol: player1Symbol,
                player2_symbol: player2Symbol,
                winner_uid: winnerUid,
                is_computer_player: p1IsComputer || p2IsComputer,
                is_draw: isDraw,
                game_duration_seconds: gameDuration
            };
            
            const { error } = await supabase
                .from('TTT_Game_Results')
                .insert(gameData);
            
            if (error) {
                console.error('Error saving game result:', error);
            }
        } catch (error) {
            console.error('Error saving game result:', error);
        }
    }
    
}

// Initialize the game when DOM is loaded and authenticated
document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            new TicTacToe();
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

