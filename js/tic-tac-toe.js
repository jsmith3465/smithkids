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
        this.isAdmin = false; // Will be set after auth check
        
        // Remote game properties
        this.isRemoteGame = false;
        this.isHost = false;
        this.isGuest = false;
        this.roomId = null;
        this.roomCode = null;
        this.roomExpiresAt = null;
        this.remoteSessionId = null;
        this.realtimeSubscription = null;
        this.guestFirstName = null;
        this.guestLastName = null;
        this.guestIP = null;
        this.expirationCheckInterval = null;
        
        this.init();
    }

    async init() {
        // Check if this is a guest session first
        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('room');
        const guestSession = sessionStorage.getItem('guestSession');
        const isGuest = roomCode && guestSession;
        
        // Only fetch users from database if not a guest
        if (!isGuest) {
            await this.loadUsersFromDatabase();
            // Check if current user is admin
            const session = window.authStatus?.getSession();
            this.isAdmin = session && session.userType === 'admin';
        }
        
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

        // Remote game elements
        this.guestEntrySection = document.getElementById('guestEntrySection');
        this.playRemoteBtn = document.getElementById('playRemoteBtn');
        this.remoteLinkSection = document.getElementById('remoteLinkSection');
        this.roomLinkInput = document.getElementById('roomLinkInput');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        this.waitingForPlayer = document.getElementById('waitingForPlayer');
        this.guestFirstNameInput = document.getElementById('guestFirstName');
        this.guestLastNameInput = document.getElementById('guestLastName');
        this.joinRoomBtn = document.getElementById('joinRoomBtn');
        this.cancelGuestBtn = document.getElementById('cancelGuestBtn');

        // Check if joining as guest (room code in URL)
        this.checkForRoomCode();

        // Event listeners
        this.startGameBtn.addEventListener('click', () => this.startGame());
        if (this.playRemoteBtn) {
            this.playRemoteBtn.addEventListener('click', () => this.createRemoteRoom());
        }
        if (this.copyLinkBtn) {
            this.copyLinkBtn.addEventListener('click', () => this.copyRoomLink());
        }
        if (this.joinRoomBtn) {
            this.joinRoomBtn.addEventListener('click', () => this.joinRemoteRoom());
        }
        if (this.cancelGuestBtn) {
            this.cancelGuestBtn.addEventListener('click', () => this.cancelGuestEntry());
        }
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
                .select('UID, First_Name, Last_Name, Username, user_type')
                .order('First_Name', { ascending: true });
            
            if (error) {
                console.error('Error loading users:', error);
                return;
            }
            
            this.users = data || [];
            
            // Load credit balances for all users
            const { data: credits, error: creditsError } = await supabase
                .from('User_Credits')
                .select('user_uid, balance');
            
            const creditMap = {};
            if (credits && !creditsError) {
                credits.forEach(credit => {
                    creditMap[credit.user_uid] = credit.balance || 0;
                });
            }
            
            // Build players object with Computer player
            this.players[this.COMPUTER_ID] = {
                name: 'Computer',
                wins: 0,
                losses: 0,
                draws: 0,
                credits: Infinity // Computer doesn't need credits
            };
            
            // Add users to players object with credit info
            this.users.forEach(user => {
                const displayName = this.getDisplayName(user);
                // Admins have unlimited credits
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
            let p1Text = player.name + (id === this.COMPUTER_ID ? ' 🤖' : '');
            // Only show credit warning if not admin and player has no credits
            if (!this.isAdmin && id !== this.COMPUTER_ID && player.credits !== undefined && player.credits < 1) {
                p1Text += ' (No remaining credits - go workout)';
            }
            option1.textContent = p1Text;
            this.player1Select.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = id;
            let p2Text = player.name + (id === this.COMPUTER_ID ? ' 🤖' : '');
            // Only show credit warning if not admin and player has no credits
            if (!this.isAdmin && id !== this.COMPUTER_ID && player.credits !== undefined && player.credits < 1) {
                p2Text += ' (No remaining credits - go workout)';
            }
            option2.textContent = p2Text;
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
        
        const session = window.authStatus?.getSession();
        const isAdmin = session && session.userType === 'admin';
        
        // Check credits for both players (skip for admins and computer)
        const p1IsComputer = this.isComputerPlayer(p1Id);
        const p2IsComputer = this.isComputerPlayer(p2Id);
        
        if (!isAdmin && !this.isAdmin) {
            // Check Player 1 credits
            if (!p1IsComputer) {
                const p1Player = this.players[p1Id];
                if (!p1Player || p1Player.credits === undefined || p1Player.credits < 1) {
                    const playerName = p1Player ? p1Player.name : 'Player 1';
                    alert(`${playerName} does not have enough credits to play. Please select a different player or have them earn more credits.`);
                    return;
                }
            }
            
            // Check Player 2 credits
            if (!p2IsComputer) {
                const p2Player = this.players[p2Id];
                if (!p2Player || p2Player.credits === undefined || p2Player.credits < 1) {
                    const playerName = p2Player ? p2Player.name : 'Player 2';
                    alert(`${playerName} does not have enough credits to play. Please select a different player or have them earn more credits.`);
                    return;
                }
            }
            
            // Deduct credits from both players
            if (!p1IsComputer) {
                const p1Player = this.players[p1Id];
                const deductResult1 = await deductCredits(parseInt(p1Id), 'tic_tac_toe');
                if (!deductResult1.success) {
                    alert(`Unable to deduct credits from ${p1Player.name}. Please try again.`);
                    return;
                }
                
                // Update local credit balance
                p1Player.credits = deductResult1.newBalance;
                
                // Show message if this was their last credit
                if (deductResult1.newBalance === 0) {
                    const firstName = p1Player.firstName || '';
                    const lastName = p1Player.lastName || '';
                    const fullName = `${firstName} ${lastName}`.trim() || p1Player.name;
                    alert(`${fullName} has no more available credits. Please workout or be helpful in order to earn more credits!`);
                }
            }
            
            if (!p2IsComputer) {
                const p2Player = this.players[p2Id];
                const deductResult2 = await deductCredits(parseInt(p2Id), 'tic_tac_toe');
                if (!deductResult2.success) {
                    alert(`Unable to deduct credits from ${p2Player.name}. Please try again.`);
                    return;
                }
                
                // Update local credit balance
                p2Player.credits = deductResult2.newBalance;
                
                // Show message if this was their last credit
                if (deductResult2.newBalance === 0) {
                    const firstName = p2Player.firstName || '';
                    const lastName = p2Player.lastName || '';
                    const fullName = `${firstName} ${lastName}`.trim() || p2Player.name;
                    alert(`${fullName} has no more available credits. Please workout or be helpful in order to earn more credits!`);
                }
            }
            
            // Refresh player selects to update credit status
            this.updatePlayerSelects();
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
        this.updatePlayerDisplays();
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
    
    async makeMove(index) {
        if (!this.gameActive || this.board[index] !== null) return;
        
        // For remote games, check if it's the current player's turn
        if (this.isRemoteGame) {
            const session = window.authStatus?.getSession();
            const isPlayer1 = this.isHost && this.currentPlayer === 'X';
            const isPlayer2 = this.isGuest && this.currentPlayer === 'O';
            
            if (!isPlayer1 && !isPlayer2) {
                return; // Not your turn
            }
        }
        
        this.board[index] = this.currentPlayer;
        const cell = this.gameBoard.children[index];
        cell.textContent = this.currentPlayer;
        cell.offsetHeight;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.classList.add('disabled');

        // Update game state in database if remote
        if (this.isRemoteGame) {
            await this.updateRemoteGameState();
        }

        const winner = this.checkWinner();
        
        if (winner) {
            this.gameActive = false;
            if (this.isRemoteGame) {
                await this.updateRemoteGameState();
            }
            this.handleWin(winner);
        } else if (this.board.every(cell => cell !== null)) {
            this.gameActive = false;
            if (this.isRemoteGame) {
                await this.updateRemoteGameState();
            }
            this.handleDraw();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
            
            // Update remote game state after turn change
            if (this.isRemoteGame) {
                await this.updateRemoteGameState();
            }
            
            if (this.isCurrentPlayerComputer() && this.gameActive && !this.isRemoteGame) {
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

    updateBoardDisplay() {
        if (!this.gameBoard) return;
        
        for (let i = 0; i < 9; i++) {
            const cell = this.gameBoard.children[i];
            if (!cell) continue;
            
            cell.textContent = this.board[i] || '';
            cell.classList.remove('x', 'o', 'disabled');
            
            if (this.board[i]) {
                cell.classList.add(this.board[i].toLowerCase());
                cell.classList.add('disabled');
            } else {
                cell.classList.remove('disabled');
            }
        }
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
        
        // Update Player 1 display with credit status (skip for admins)
        let p1Text = p1.name;
        if (!this.isAdmin && this.player1Id !== this.COMPUTER_ID && p1.credits !== undefined && p1.credits < 1) {
            p1Text += ' (No remaining credits - go workout)';
        }
        this.player1Display.textContent = p1Text;
        this.player1Wins.textContent = p1.wins;
        this.player1Losses.textContent = p1.losses;
        this.player1Draws.textContent = p1.draws;
        
        // Update Player 2 display with credit status (skip for admins)
        let p2Text = p2.name;
        if (!this.isAdmin && this.player2Id !== this.COMPUTER_ID && p2.credits !== undefined && p2.credits < 1) {
            p2Text += ' (No remaining credits - go workout)';
        }
        this.player2Display.textContent = p2Text;
        this.player2Wins.textContent = p2.wins;
        this.player2Losses.textContent = p2.losses;
        this.player2Draws.textContent = p2.draws;
    }
    
    updatePlayerDisplays() {
        // This is a helper function that updates player displays with credit status
        // It's called from updatePlayerStats, so we don't need a separate implementation
        this.updatePlayerStats();
    }

    newGame() {
        this.initializeBoard();
    }

    async newPlayers() {
        // Reload credit balances before showing player selection
        await this.refreshCreditBalances();
        this.gameSection.classList.add('hidden');
        this.playerSetup.classList.remove('hidden');
        this.updatePlayerSelects();
    }
    
    async refreshCreditBalances() {
        try {
            // Load credit balances for all users
            const { data: credits, error: creditsError } = await supabase
                .from('User_Credits')
                .select('user_uid, balance');
            
            if (creditsError) {
                console.error('Error refreshing credits:', creditsError);
                return;
            }
            
            const creditMap = {};
            if (credits) {
                credits.forEach(credit => {
                    creditMap[credit.user_uid] = credit.balance || 0;
                });
            }
            
            // Load user types to check for admins
            const { data: users, error: usersError } = await supabase
                .from('Users')
                .select('UID, user_type');
            
            const userTypeMap = {};
            if (users && !usersError) {
                users.forEach(user => {
                    userTypeMap[user.UID] = user.user_type;
                });
            }
            
            // Update credit balances in players object
            Object.keys(this.players).forEach(playerId => {
                if (playerId !== this.COMPUTER_ID && this.players[playerId].uid) {
                    const uid = this.players[playerId].uid;
                    // Admins have unlimited credits
                    if (userTypeMap[uid] === 'admin') {
                        this.players[playerId].credits = Infinity;
                    } else if (creditMap[uid] !== undefined) {
                        this.players[playerId].credits = creditMap[uid];
                    } else {
                        this.players[playerId].credits = 0;
                    }
                }
            });
        } catch (error) {
            console.error('Error refreshing credit balances:', error);
        }
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
            
            const { data: gameResult, error } = await supabase
                .from('TTT_Game_Results')
                .insert(gameData)
                .select('game_id')
                .single();
            
            if (error) {
                console.error('Error saving game result:', error);
                return null;
            }
            
            // If this is a remote game, update the remote session with game_id
            if (this.isRemoteGame && this.remoteSessionId && gameResult) {
                await supabase
                    .from('Remote_Game_Sessions')
                    .update({ game_id: gameResult.game_id })
                    .eq('session_id', this.remoteSessionId);
            }
            
            return gameResult ? gameResult.game_id : null;
        } catch (error) {
            console.error('Error saving game result:', error);
            return null;
        }
    }
    
    // Remote Game Methods
    checkForRoomCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('room');
        if (roomCode) {
            // Check if guest session exists (from guest-login.html)
            const guestSession = sessionStorage.getItem('guestSession');
            if (guestSession) {
                try {
                    const guestInfo = JSON.parse(guestSession);
                    // Verify room code matches
                    if (guestInfo.roomCode === roomCode && guestInfo.firstName && guestInfo.lastName) {
                        // Auto-join with guest info
                        this.guestFirstName = guestInfo.firstName;
                        this.guestLastName = guestInfo.lastName;
                        console.log('Guest session found, joining room as guest...');
                        this.joinRemoteRoomAsGuest(roomCode);
                        return;
                    } else {
                        console.log('Guest session found but room code mismatch or missing name');
                    }
                } catch (e) {
                    console.error('Error parsing guest session:', e);
                }
            } else {
                console.log('No guest session found, showing guest entry form');
            }
            // No guest session or mismatch, show guest entry form
            this.showGuestEntry();
        }
    }
    
    async joinRemoteRoomAsGuest(roomCode) {
        try {
            // Get room by code
            const { data: room, error: roomError } = await supabase
                .from('Game_Rooms')
                .select('room_id, host_user_uid, expires_at, game_started')
                .eq('room_code', roomCode)
                .eq('is_active', true)
                .single();
            
            if (roomError || !room) {
                alert('Room not found or is no longer active.');
                sessionStorage.removeItem('guestSession');
                window.location.href = 'guest-login.html?room=' + roomCode;
                return;
            }
            
            // Check if room has expired
            const now = new Date();
            const expiresAt = new Date(room.expires_at);
            
            if (now > expiresAt && !room.game_started) {
                alert('This room link has expired. Room links are valid for 15 minutes.');
                sessionStorage.removeItem('guestSession');
                window.location.href = 'guest-login.html?room=' + roomCode;
                return;
            }
            
            this.roomExpiresAt = room.expires_at;
            
            // Get IP address
            const ip = await this.getClientIP();
            
            // Create remote session
            const { data: session, error: sessionError } = await supabase
                .from('Remote_Game_Sessions')
                .insert({
                    room_id: room.room_id,
                    host_user_uid: room.host_user_uid,
                    guest_first_name: this.guestFirstName,
                    guest_last_name: this.guestLastName,
                    guest_ip_address: ip
                })
                .select('session_id')
                .single();
            
            if (sessionError) throw sessionError;
            
            this.remoteSessionId = session.session_id;
            this.roomId = room.room_id;
            this.roomCode = roomCode;
            this.isGuest = true;
            this.isRemoteGame = true;
            this.guestIP = ip;
            
            // Hide player setup and guest entry, show game section
            if (this.playerSetup) this.playerSetup.classList.add('hidden');
            if (this.guestEntrySection) this.guestEntrySection.classList.add('hidden');
            if (this.gameSection) {
                this.gameSection.classList.remove('hidden');
            }
            
            // Set up guest player
            this.player2Name = `${this.guestFirstName} ${this.guestLastName}`;
            this.player2Id = 'GUEST';
            
            // Start expiration check for guest
            this.startExpirationCheck();
            
            // Subscribe to game state
            this.subscribeToGameState();
            
            // Check current game state
            const { data: currentState } = await supabase
                .from('Game_State')
                .select('*')
                .eq('room_id', this.roomId)
                .single();
            
            if (currentState && currentState.game_active) {
                // Game already started
                this.handleRemoteGameStart(currentState);
            } else {
                // Wait for host to start game
                if (this.waitingForPlayer) {
                    this.waitingForPlayer.classList.remove('hidden');
                    const waitingText = this.waitingForPlayer.querySelector('p');
                    if (waitingText) {
                        waitingText.textContent = 'Waiting for host to start the game...';
                    }
                }
            }
            
            // Initialize board display
            this.initializeBoard();
            this.updateDisplay();
            
            // Make sure main content is visible
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.classList.remove('hidden');
            }
            
        } catch (error) {
            console.error('Error joining room as guest:', error);
            alert('Error joining room. Please try again.');
            sessionStorage.removeItem('guestSession');
            window.location.href = 'guest-login.html?room=' + roomCode;
        }
    }
    
    async createRemoteRoom() {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            alert('Please log in to create a remote game room.');
            return;
        }
        
        // Check credits before creating room (skip for admins)
        if (session.userType !== 'admin' && !this.isAdmin) {
            const creditCheck = await checkCredits(session.uid);
            if (!creditCheck.hasCredits) {
                alert(showCreditWarning(creditCheck.balance));
                return;
            }
        }
        
        try {
            // Generate unique room code
            const roomCode = this.generateRoomCode();
            
            // Create room in database (expires_at will be set automatically by trigger)
            const { data: room, error } = await supabase
                .from('Game_Rooms')
                .insert({
                    room_code: roomCode,
                    host_user_uid: session.uid,
                    game_type: 'tic_tac_toe'
                })
                .select('room_id, room_code, expires_at')
                .single();
            
            if (error) {
                console.error('Error creating room:', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                alert(`Failed to create room: ${error.message || 'Unknown error'}. Please check the console for details.`);
                return;
            }
            
            this.roomId = room.room_id;
            this.roomCode = room.room_code;
            this.isHost = true;
            this.isRemoteGame = true;
            this.roomExpiresAt = room.expires_at;
            
            // Set up host player
            if (session) {
                this.player1Id = session.uid.toString();
                this.player1Name = `${session.firstName || 'Host'} ${session.lastName || ''}`.trim();
            }
            
            // Show room link (point to guest login page)
            // Generate room link (use relative path to work in any directory structure)
            const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            const roomLink = `${window.location.origin}${basePath}/guest-login.html?room=${this.roomCode}`;
            this.roomLinkInput.value = roomLink;
            this.remoteLinkSection.classList.remove('hidden');
            
            // Initialize game board
            this.board = Array(9).fill(null);
            this.gameActive = false; // Not active until guest joins
            
            // Hide player setup, show game section
            this.playerSetup.classList.add('hidden');
            this.gameSection.classList.remove('hidden');
            this.waitingForPlayer.classList.remove('hidden');
            
            // Initialize board display
            this.initializeBoard();
            this.updateDisplay();
            
            // Start expiration check timer
            this.startExpirationCheck();
            
            // Subscribe to guest joins
            this.subscribeToGuestJoins();
            
            // Subscribe to game state changes
            this.subscribeToGameState();
            
        } catch (error) {
            console.error('Error creating room:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            alert(`Failed to create room: ${error.message || 'Unknown error'}. Please check the console for details.`);
        }
    }
    
    generateRoomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    subscribeToGuestJoins() {
        if (!this.roomId) return;
        
        // Subscribe to Remote_Game_Sessions for this room
        this.realtimeSubscription = supabase
            .channel(`room-${this.roomId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'Remote_Game_Sessions',
                filter: `room_id=eq.${this.roomId}`
            }, (payload) => {
                this.handleGuestJoin(payload.new);
            })
            .subscribe();
    }
    
    async handleGuestJoin(sessionData) {
        this.remoteSessionId = sessionData.session_id;
        this.guestFirstName = sessionData.guest_first_name;
        this.guestLastName = sessionData.guest_last_name;
        
        // Set up guest player
        this.player2Name = `${this.guestFirstName} ${this.guestLastName}`;
        this.player2Id = 'GUEST';
        
        // Hide waiting message
        this.waitingForPlayer.classList.add('hidden');
        
        // Start the game automatically with random first player
        await this.startRemoteGame();
    }
    
    async startRemoteGame() {
        const session = window.authStatus?.getSession();
        if (!session) return;
        
        // Check credits before starting (skip for admins)
        if (session.userType !== 'admin' && !this.isAdmin) {
            const creditCheck = await checkCredits(session.uid);
            if (!creditCheck.hasCredits) {
                // Show message to both players
                const message = `Insufficient credits. Host has ${creditCheck.balance} credit(s) remaining. Room link has expired.`;
                alert(message);
                if (this.waitingForPlayer) {
                    this.waitingForPlayer.classList.remove('hidden');
                    const waitingText = this.waitingForPlayer.querySelector('p');
                    if (waitingText) {
                        waitingText.textContent = message;
                    }
                }
                // Mark room as expired
                await this.expireRoom();
                return;
            }
            
            // Deduct credit when game begins
            const deductResult = await deductCredits(session.uid, 'tic_tac_toe');
            if (!deductResult.success) {
                const message = 'Unable to process payment. Room link has expired.';
                alert(message);
                if (this.waitingForPlayer) {
                    this.waitingForPlayer.classList.remove('hidden');
                    const waitingText = this.waitingForPlayer.querySelector('p');
                    if (waitingText) {
                        waitingText.textContent = message;
                    }
                }
                await this.expireRoom();
                return;
            }
        }
        
        // Mark game as started in database (prevents expiration)
        await supabase
            .from('Game_Rooms')
            .update({ game_started: true })
            .eq('room_id', this.roomId);
        
        // Randomly choose who goes first
        const firstPlayerIsHost = Math.random() < 0.5;
        
        if (firstPlayerIsHost) {
            // Host goes first (X)
            this.player1Symbol = 'X';
            this.player2Symbol = 'O';
            this.currentPlayer = 'X';
        } else {
            // Guest goes first (X), so swap
            this.player1Symbol = 'O';
            this.player2Symbol = 'X';
            this.currentPlayer = 'X';
            // Swap player names for display
            const tempName = this.player1Name;
            const tempId = this.player1Id;
            this.player1Name = this.player2Name;
            this.player1Id = this.player2Id;
            this.player2Name = tempName;
            this.player2Id = tempId;
        }
        
        // Reset board
        this.board = Array(9).fill(null);
        this.gameActive = true;
        this.gameStartTime = Date.now();
        
        // Update remote session with game start time
        if (this.remoteSessionId) {
            await supabase
                .from('Remote_Game_Sessions')
                .update({ game_started_at: new Date().toISOString() })
                .eq('session_id', this.remoteSessionId);
        }
        
        // Stop expiration check since game has started
        this.stopExpirationCheck();
        
        // Initialize game state in database
        await this.initializeRemoteGameState();
        
        // Update board display
        this.updateBoardDisplay();
        this.updateDisplay();
    }
    
    async initializeRemoteGameState() {
        if (!this.roomId) return;
        
        const gameState = {
            room_id: this.roomId,
            board_state: this.board,
            current_player: this.currentPlayer,
            player1_symbol: this.player1Symbol,
            player2_symbol: this.player2Symbol,
            player1_name: this.player1Name,
            player2_name: this.player2Name,
            game_active: this.gameActive
        };
        
        const { error } = await supabase
            .from('Game_State')
            .upsert(gameState, { onConflict: 'room_id' });
        
        if (error) {
            console.error('Error initializing game state:', error);
        }
    }
    
    subscribeToGameState() {
        if (!this.roomId) return;
        
        // Unsubscribe from previous subscription if exists
        if (this.realtimeSubscription) {
            supabase.removeChannel(this.realtimeSubscription);
        }
        
        // Subscribe to game state changes
        this.realtimeSubscription = supabase
            .channel(`game-state-${this.roomId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'Game_State',
                filter: `room_id=eq.${this.roomId}`
            }, (payload) => {
                this.handleGameStateUpdate(payload.new);
            })
            .subscribe();
    }
    
    async handleGameStateUpdate(state) {
        // Don't update if this is our own move (we already updated locally)
        // Compare board states to detect if it's our move
        const boardChanged = JSON.stringify(state.board_state) !== JSON.stringify(this.board);
        if (!boardChanged) {
            return; // No change, ignore
        }
        
        // Update board and game state
        this.board = state.board_state;
        this.currentPlayer = state.current_player;
        this.gameActive = state.game_active;
        
        // Update board display
        this.updateBoardDisplay();
        
        // Check for win or draw locally
        const winner = this.checkWinner();
        if (winner) {
            this.gameActive = false;
            await this.updateRemoteGameState();
            this.handleWin(winner);
        } else if (this.board.every(cell => cell !== null)) {
            this.gameActive = false;
            await this.updateRemoteGameState();
            this.handleDraw();
        }
        
        this.updateDisplay();
    }
    
    async updateRemoteGameState() {
        if (!this.roomId) return;
        
        // Check for winner
        const winner = this.checkWinner();
        const isDraw = !winner && this.board.every(cell => cell !== null);
        
        const gameState = {
            room_id: this.roomId,
            board_state: this.board,
            current_player: this.currentPlayer,
            game_active: this.gameActive,
            winner: winner ? winner.player : null,
            is_draw: isDraw
        };
        
        const { error } = await supabase
            .from('Game_State')
            .update(gameState)
            .eq('room_id', this.roomId);
        
        if (error) {
            console.error('Error updating game state:', error);
        }
    }
    
    async joinRemoteRoom() {
        const firstName = this.guestFirstNameInput.value.trim();
        const lastName = this.guestLastNameInput.value.trim();
        
        if (!firstName || !lastName) {
            alert('Please enter both first and last name.');
            return;
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('room');
        
        if (!roomCode) {
            alert('Invalid room code.');
            return;
        }
        
        try {
            // Get room by code
            const { data: room, error: roomError } = await supabase
                .from('Game_Rooms')
                .select('room_id, host_user_uid, expires_at, game_started')
                .eq('room_code', roomCode)
                .eq('is_active', true)
                .single();
            
            if (roomError || !room) {
                alert('Room not found or is no longer active.');
                return;
            }
            
            // Check if room has expired
            const now = new Date();
            const expiresAt = new Date(room.expires_at);
            
            if (now > expiresAt && !room.game_started) {
                alert('This room link has expired. Room links are valid for 15 minutes.');
                window.location.href = window.location.pathname;
                return;
            }
            
            this.roomExpiresAt = room.expires_at;
            
            // Get IP address
            const ip = await this.getClientIP();
            
            // Create remote session
            const { data: session, error: sessionError } = await supabase
                .from('Remote_Game_Sessions')
                .insert({
                    room_id: room.room_id,
                    host_user_uid: room.host_user_uid,
                    guest_first_name: firstName,
                    guest_last_name: lastName,
                    guest_ip_address: ip
                })
                .select('session_id')
                .single();
            
            if (sessionError) throw sessionError;
            
            this.remoteSessionId = session.session_id;
            this.roomId = room.room_id;
            this.roomCode = roomCode;
            this.isGuest = true;
            this.isRemoteGame = true;
            this.guestFirstName = firstName;
            this.guestLastName = lastName;
            this.guestIP = ip;
            
            // Hide guest entry, show game section
            this.guestEntrySection.classList.add('hidden');
            this.gameSection.classList.remove('hidden');
            
            // Set up guest player
            this.player2Name = `${this.guestFirstName} ${this.guestLastName}`;
            this.player2Id = 'GUEST';
            
            // Start expiration check for guest too
            this.startExpirationCheck();
            
            // Subscribe to game state
            this.subscribeToGameState();
            
            // Check current game state
            const { data: currentState } = await supabase
                .from('Game_State')
                .select('*')
                .eq('room_id', this.roomId)
                .single();
            
            if (currentState && currentState.game_active) {
                // Game already started
                this.handleRemoteGameStart(currentState);
            } else {
                // Wait for host to start game
                if (this.waitingForPlayer) {
                    this.waitingForPlayer.classList.remove('hidden');
                    const waitingText = this.waitingForPlayer.querySelector('p');
                    if (waitingText) {
                        waitingText.textContent = 'Waiting for host to start the game...';
                    }
                }
            }
            
        } catch (error) {
            console.error('Error joining room:', error);
            alert('Failed to join room. Please try again.');
        }
    }
    
    handleRemoteGameStart(state) {
        this.player1Name = state.player1_name;
        this.player2Name = state.player2_name;
        this.player1Symbol = state.player1_symbol;
        this.player2Symbol = state.player2_symbol;
        this.board = state.board_state || Array(9).fill(null);
        this.currentPlayer = state.current_player || 'X';
        this.gameActive = state.game_active;
        this.gameStartTime = Date.now();
        
        // Set player IDs
        const session = window.authStatus?.getSession();
        if (this.isGuest) {
            // Guest is player 2
            this.player2Id = 'GUEST';
            if (session) {
                // If guest is logged in, use their UID, otherwise keep as GUEST
                // For now, keep as GUEST since they're not logged in
            }
        } else {
            // Host is player 1
            if (session) {
                this.player1Id = session.uid.toString();
            }
            this.player2Id = 'GUEST';
        }
        
        // Hide waiting message
        this.waitingForPlayer.classList.add('hidden');
        this.gameMessage.style.display = 'none';
        this.initializeBoard();
        this.updateBoardDisplay();
        this.updateDisplay();
    }
    
    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP:', error);
            return 'unknown';
        }
    }
    
    showGuestEntry() {
        this.playerSetup.classList.add('hidden');
        this.guestEntrySection.classList.remove('hidden');
    }
    
    
    cancelGuestEntry() {
        window.location.href = window.location.pathname;
    }
    
    startExpirationCheck() {
        if (!this.roomExpiresAt) return;
        
        // Check expiration every 30 seconds
        this.expirationCheckInterval = setInterval(async () => {
            await this.checkRoomExpiration();
        }, 30000);
        
        // Also check immediately
        this.checkRoomExpiration();
    }
    
    stopExpirationCheck() {
        if (this.expirationCheckInterval) {
            clearInterval(this.expirationCheckInterval);
            this.expirationCheckInterval = null;
        }
    }
    
    async checkRoomExpiration() {
        if (!this.roomId || !this.roomExpiresAt) return;
        
        // Check if room has expired
        const now = new Date();
        const expiresAt = new Date(this.roomExpiresAt);
        
        // Get current room state
        const { data: room } = await supabase
            .from('Game_Rooms')
            .select('game_started, is_active')
            .eq('room_id', this.roomId)
            .single();
        
        // If game has started, stop checking expiration
        if (room && room.game_started) {
            this.stopExpirationCheck();
            return;
        }
        
        // If expired and game hasn't started
        if (now > expiresAt) {
            await this.expireRoom();
        }
    }
    
    async expireRoom() {
        if (!this.roomId) return;
        
        // Mark room as inactive
        await supabase
            .from('Game_Rooms')
            .update({ is_active: false })
            .eq('room_id', this.roomId);
        
        // Stop expiration check
        this.stopExpirationCheck();
        
        // Show expiration message
        const message = 'Room link has expired. Room links are valid for 15 minutes.';
        alert(message);
        
        if (this.waitingForPlayer) {
            this.waitingForPlayer.classList.remove('hidden');
            const waitingText = this.waitingForPlayer.querySelector('p');
            if (waitingText) {
                waitingText.textContent = message;
            }
        }
        
        // Disable game board
        this.gameActive = false;
        if (this.gameBoard) {
            Array.from(this.gameBoard.children).forEach(cell => {
                cell.classList.add('disabled');
            });
        }
    }
    
    resetRemoteGame() {
        this.stopExpirationCheck();
        this.isRemoteGame = false;
        this.isHost = false;
        this.isGuest = false;
        this.roomId = null;
        this.roomCode = null;
        this.roomExpiresAt = null;
        this.remoteSessionId = null;
        this.guestFirstName = null;
        this.guestLastName = null;
        this.guestIP = null;
    }
    
    copyRoomLink() {
        this.roomLinkInput.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    }
    
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is a guest access (room code in URL)
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('room');
    const guestSession = sessionStorage.getItem('guestSession');
    
    if (roomCode && guestSession) {
        // Guest access - bypass authentication
        try {
            const guestInfo = JSON.parse(guestSession);
            if (guestInfo.roomCode === roomCode) {
                // Hide auth check, show main content
                const authCheck = document.getElementById('authCheck');
                const mainContent = document.getElementById('mainContent');
                if (authCheck) authCheck.classList.add('hidden');
                if (mainContent) mainContent.classList.remove('hidden');
                
                // Initialize game for guest
                new TicTacToe();
                return;
            }
        } catch (e) {
            console.error('Error parsing guest session:', e);
        }
    }
    
    // Regular authenticated access
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            new TicTacToe();
        } else if (window.authStatus && !window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            // If room code exists but no guest session, redirect to guest login
            if (roomCode) {
                window.location.href = `guest-login.html?room=${roomCode}`;
            }
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
        if (!window.authStatus || !window.authStatus.isAuthenticated) {
            // If room code exists but no guest session, redirect to guest login
            if (roomCode) {
                window.location.href = `guest-login.html?room=${roomCode}`;
            } else {
                console.error('Authentication check timed out');
            }
        }
    }, 5000);
});

