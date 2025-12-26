// Tic Tac Toe Game with Player Management

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
        this.players = this.loadPlayers();
        this.computerDifficulty = this.loadDifficulty(); // Load saved difficulty
        
        // Ensure Computer player exists
        this.ensureComputerPlayer();
        
        this.init();
    }

    init() {
        this.playerSetup = document.getElementById('playerSetup');
        this.gameSection = document.getElementById('gameSection');
        this.playerManagement = document.getElementById('playerManagement');
        this.gameSetup = document.querySelector('.game-setup');
        this.launchPlayerManagementLink = document.getElementById('launchPlayerManagementLink');
        this.closePlayerManagementBtn = document.getElementById('closePlayerManagementBtn');
        this.showStatisticsLink = document.getElementById('showStatisticsLink');
        this.statisticsPasswordModal = document.getElementById('statisticsPasswordModal');
        this.statisticsPasswordInput = document.getElementById('statisticsPasswordInput');
        this.submitPasswordBtn = document.getElementById('submitPasswordBtn');
        this.cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
        this.passwordError = document.getElementById('passwordError');
        this.playerStatistics = document.getElementById('playerStatistics');
        this.closeStatisticsBtn = document.getElementById('closeStatisticsBtn');
        this.statisticsContent = document.getElementById('statisticsContent');
        this.STATISTICS_PASSCODE = '9690'; // Master passcode for statistics
        this.newPlayerInput = document.getElementById('newPlayerName');
        this.addPlayerBtn = document.getElementById('addPlayerBtn');
        this.playersList = document.getElementById('playersList');
        this.player1Select = document.getElementById('player1Select');
        this.player2Select = document.getElementById('player2Select');
        this.computerDifficultyGroup = document.getElementById('computerDifficultyGroup');
        this.computerDifficultySelect = document.getElementById('computerDifficulty');
        this.gameDifficultyGroup = document.getElementById('gameDifficultyGroup');
        this.gameComputerDifficultySelect = document.getElementById('gameComputerDifficulty');
        this.startGameBtn = document.getElementById('startGameBtn');
        
        // Set difficulty selector to saved value
        this.computerDifficultySelect.value = this.computerDifficulty;
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
        this.currentWinnerName = null; // Store winner name for meme
        this.newGameBtn = document.getElementById('newGameBtn');
        this.newPlayersBtn = document.getElementById('newPlayersBtn');
        this.winLine = document.getElementById('winLine');
        this.line = document.getElementById('line');
        this.boardContainer = document.querySelector('.board-container');

        // Event listeners
        this.launchPlayerManagementLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPlayerManagement();
        });
        this.closePlayerManagementBtn.addEventListener('click', () => this.hidePlayerManagement());
        this.showStatisticsLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPasswordModal();
        });
        this.submitPasswordBtn.addEventListener('click', () => this.checkPassword());
        this.cancelPasswordBtn.addEventListener('click', () => this.hidePasswordModal());
        this.statisticsPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
            }
        });
        this.closeStatisticsBtn.addEventListener('click', () => this.hideStatistics());
        this.addPlayerBtn.addEventListener('click', () => this.addPlayer());
        this.newPlayerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addPlayer();
            }
        });
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.player1Select.addEventListener('change', () => this.updateDifficultyVisibility());
        this.player2Select.addEventListener('change', () => this.updateDifficultyVisibility());
        this.computerDifficultySelect.addEventListener('change', (e) => {
            this.computerDifficulty = e.target.value;
            this.saveDifficulty();
            // Sync with game difficulty selector
            if (this.gameComputerDifficultySelect) {
                this.gameComputerDifficultySelect.value = this.computerDifficulty;
            }
        });
        this.gameComputerDifficultySelect.addEventListener('change', (e) => {
            this.computerDifficulty = e.target.value;
            this.saveDifficulty();
            // Sync with setup difficulty selector
            this.computerDifficultySelect.value = this.computerDifficulty;
        });
        this.closeMemeBtn.addEventListener('click', () => this.hideMeme());
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.newPlayersBtn.addEventListener('click', () => this.newPlayers());
        
        // Winning memes - we'll create text-based memes with winning messages
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
        this.renderPlayersList();
        this.updatePlayerSelects();
        this.updateDifficultyVisibility();
    }
    
    updateDifficultyVisibility() {
        const p1Id = this.player1Select.value;
        const p2Id = this.player2Select.value;
        const hasComputer = this.isComputerPlayer(p1Id) || this.isComputerPlayer(p2Id);
        
        // Show/hide difficulty selector in setup
        if (hasComputer) {
            this.computerDifficultyGroup.classList.remove('hidden');
        } else {
            this.computerDifficultyGroup.classList.add('hidden');
        }
    }

    // LocalStorage methods
    loadPlayers() {
        const stored = localStorage.getItem('ticTacToePlayers');
        return stored ? JSON.parse(stored) : {};
    }

    savePlayers() {
        localStorage.setItem('ticTacToePlayers', JSON.stringify(this.players));
    }
    
    loadDifficulty() {
        const stored = localStorage.getItem('ticTacToeDifficulty');
        return stored || 'moderate'; // Default to moderate
    }
    
    saveDifficulty() {
        localStorage.setItem('ticTacToeDifficulty', this.computerDifficulty);
    }
    
    ensureComputerPlayer() {
        // Always ensure Computer player exists
        if (!this.players[this.COMPUTER_ID]) {
            this.players[this.COMPUTER_ID] = {
                name: 'Computer',
                wins: 0,
                losses: 0,
                draws: 0
            };
            this.savePlayers();
        }
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

    // Player management
    addPlayer() {
        const name = this.newPlayerInput.value.trim();
        
        if (!name) {
            alert('Please enter a player name!');
            return;
        }

        // Prevent creating a player named "Computer" (reserved name)
        if (name.toLowerCase() === 'computer') {
            alert('"Computer" is a reserved name for the system player!');
            this.newPlayerInput.value = '';
            return;
        }

        // Check if player already exists
        const existingPlayer = Object.values(this.players).find(p => p.name.toLowerCase() === name.toLowerCase());
        if (existingPlayer) {
            alert('A player with this name already exists!');
            this.newPlayerInput.value = '';
            return;
        }

        // Create new player
        const id = Date.now().toString();
        this.players[id] = {
            name: name,
            wins: 0,
            losses: 0,
            draws: 0
        };

        this.savePlayers();
        this.newPlayerInput.value = '';
        this.renderPlayersList();
        this.updatePlayerSelects();
    }

    deletePlayer(id) {
        // Prevent deleting Computer player
        if (id === this.COMPUTER_ID) {
            alert('Computer player cannot be deleted!');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${this.players[id].name}?`)) {
            delete this.players[id];
            this.savePlayers();
            this.renderPlayersList();
            this.updatePlayerSelects();
            
            // Clear selections if deleted player was selected
            if (this.player1Select.value === id) {
                this.player1Select.value = '';
            }
            if (this.player2Select.value === id) {
                this.player2Select.value = '';
            }
        }
    }

    renderPlayersList() {
        this.playersList.innerHTML = '';
        
        const playerArray = Object.entries(this.players).sort((a, b) => {
            // Put Computer first, then sort others alphabetically
            if (a[0] === this.COMPUTER_ID) return -1;
            if (b[0] === this.COMPUTER_ID) return 1;
            return a[1].name.localeCompare(b[1].name);
        });

        if (playerArray.length === 0) {
            this.playersList.innerHTML = '<p class="no-players">No players yet. Add one above!</p>';
            return;
        }

        playerArray.forEach(([id, player]) => {
            const playerItem = document.createElement('div');
            playerItem.className = 'player-item';
            const isComputer = id === this.COMPUTER_ID;
            playerItem.innerHTML = `
                <div class="player-info">
                    <span class="player-name">${player.name}${isComputer ? ' 🤖' : ''}</span>
                    <span class="player-stats-small">W: ${player.wins} | L: ${player.losses} | D: ${player.draws}</span>
                </div>
                ${isComputer ? '<span class="computer-badge">System Player</span>' : '<button class="btn-delete" data-id="' + id + '">Delete</button>'}
            `;
            
            if (!isComputer) {
                const deleteBtn = playerItem.querySelector('.btn-delete');
                deleteBtn.addEventListener('click', () => this.deletePlayer(id));
            }
            
            this.playersList.appendChild(playerItem);
        });
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
        
        // Update difficulty visibility after restoring selections
        this.updateDifficultyVisibility();
    }

    startGame() {
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

        this.player1Id = p1Id;
        this.player2Id = p2Id;
        this.player1Name = this.players[p1Id].name;
        this.player2Name = this.players[p2Id].name;

        this.playerSetup.classList.add('hidden');
        this.gameSection.classList.remove('hidden');
        
        // Show/hide difficulty selector on game board
        const hasComputer = this.isComputerPlayer(p1Id) || this.isComputerPlayer(p2Id);
        if (hasComputer) {
            this.gameDifficultyGroup.classList.remove('hidden');
            this.gameComputerDifficultySelect.value = this.computerDifficulty;
        } else {
            this.gameDifficultyGroup.classList.add('hidden');
        }
        
        this.initializeBoard();
        this.updatePlayerStats();
    }

    initializeBoard() {
        this.board = Array(9).fill(null);
        // Randomly select which player goes first
        this.currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
        this.gameActive = true;
        this.winningLine = null;
        this.clearWinLine();
        this.gameMessage.textContent = '';
        this.gameMessage.className = 'game-message';
        this.gameMessage.onclick = null; // Remove click handler
        this.currentWinnerName = null; // Reset winner name
        this.hideMeme();
        
        // Disable New Game button until game is finished
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
        
        // If Computer goes first, make a move
        if (this.isCurrentPlayerComputer() && this.gameActive) {
            setTimeout(() => {
                this.computerMove();
            }, 500);
        }
    }

    handleCellClick(index) {
        // Don't allow clicks if it's Computer's turn
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
            
            // If it's now Computer's turn, make a move
            if (this.isCurrentPlayerComputer() && this.gameActive) {
                setTimeout(() => {
                    this.computerMove();
                }, 500); // Small delay for better UX
            }
        }
    }
    
    computerMove() {
        if (!this.gameActive || !this.isCurrentPlayerComputer()) {
            return;
        }
        
        // Get all available moves
        const availableMoves = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                availableMoves.push(i);
            }
        }
        
        if (availableMoves.length === 0) {
            return;
        }
        
        // Use different AI based on difficulty
        let bestMove;
        if (this.computerDifficulty === 'easy') {
            bestMove = this.findEasyMove();
        } else if (this.computerDifficulty === 'moderate') {
            bestMove = this.findBestMove();
        } else { // hard
            bestMove = this.findHardMove();
        }
        
        this.makeMove(bestMove);
    }
    
    findEasyMove() {
        // Easy: Random moves
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
        
        // 1. Check if Computer can win in one move
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = computerSymbol;
                if (this.checkWinner() && this.checkWinner().player === computerSymbol) {
                    this.board[i] = null; // Reset
                    return i;
                }
                this.board[i] = null; // Reset
            }
        }
        
        // 2. Check if opponent can win in one move - block it
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = opponentSymbol;
                if (this.checkWinner() && this.checkWinner().player === opponentSymbol) {
                    this.board[i] = null; // Reset
                    return i; // Block opponent's winning move
                }
                this.board[i] = null; // Reset
            }
        }
        
        // 3. Try to create a fork (two winning opportunities)
        const forkMove = this.findForkMove(computerSymbol, opponentSymbol);
        if (forkMove !== null) {
            return forkMove;
        }
        
        // 4. Block opponent's fork
        const blockForkMove = this.findForkMove(opponentSymbol, computerSymbol);
        if (blockForkMove !== null) {
            return blockForkMove;
        }
        
        // 5. Take center if available (best strategic position)
        if (this.board[4] === null) {
            return 4;
        }
        
        // 6. Take opposite corner if opponent has a corner
        const corners = [0, 2, 6, 8];
        const cornerPairs = [[0, 8], [2, 6]]; // Opposite corners
        for (let pair of cornerPairs) {
            const [corner1, corner2] = pair;
            if (this.board[corner1] === opponentSymbol && this.board[corner2] === null) {
                return corner2;
            }
            if (this.board[corner2] === opponentSymbol && this.board[corner1] === null) {
                return corner1;
            }
        }
        
        // 7. Take an empty corner
        const availableCorners = corners.filter(i => this.board[i] === null);
        if (availableCorners.length > 0) {
            // Prefer corners that create better opportunities
            return availableCorners[0];
        }
        
        // 8. Take an edge that creates opportunities
        const edges = [1, 3, 5, 7];
        const availableEdges = edges.filter(i => this.board[i] === null);
        if (availableEdges.length > 0) {
            // Prefer edges that are adjacent to computer's pieces
            for (let edge of availableEdges) {
                const adjacentPositions = this.getAdjacentPositions(edge);
                const hasAdjacentComputerPiece = adjacentPositions.some(pos => this.board[pos] === computerSymbol);
                if (hasAdjacentComputerPiece) {
                    return edge;
                }
            }
            return availableEdges[0];
        }
        
        // Fallback (shouldn't reach here)
        const availableMoves = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                availableMoves.push(i);
            }
        }
        return availableMoves[0];
    }
    
    findForkMove(playerSymbol, opponentSymbol) {
        // Check if placing a piece creates two winning opportunities (fork)
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                this.board[i] = playerSymbol;
                const winningLines = this.countWinningLines(playerSymbol);
                this.board[i] = null; // Reset
                
                if (winningLines >= 2) {
                    return i; // This creates a fork
                }
            }
        }
        return null;
    }
    
    countWinningLines(symbol) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];
        
        let count = 0;
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const line = [this.board[a], this.board[b], this.board[c]];
            const symbolCount = line.filter(cell => cell === symbol).length;
            const emptyCount = line.filter(cell => cell === null).length;
            
            // If this line has 2 of our symbols and 1 empty, it's a winning opportunity
            if (symbolCount === 2 && emptyCount === 1) {
                count++;
            }
        }
        return count;
    }
    
    getAdjacentPositions(position) {
        // Returns positions adjacent to the given position
        const adjacentMap = {
            0: [1, 3, 4],
            1: [0, 2, 4],
            2: [1, 4, 5],
            3: [0, 4, 6],
            4: [0, 1, 2, 3, 5, 6, 7, 8],
            5: [2, 4, 8],
            6: [3, 4, 7],
            7: [4, 6, 8],
            8: [4, 5, 7]
        };
        return adjacentMap[position] || [];
    }
    
    findHardMove() {
        // Hard: Use minimax algorithm for optimal play
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
        
        return bestMove !== null ? bestMove : this.findBestMove(); // Fallback to moderate if needed
    }
    
    minimax(board, depth, isMaximizing, computerSymbol, opponentSymbol) {
        // Check for terminal states
        const winner = this.evaluateBoard(board, computerSymbol, opponentSymbol);
        
        if (winner === computerSymbol) {
            return 10 - depth; // Prefer faster wins
        } else if (winner === opponentSymbol) {
            return depth - 10; // Prefer slower losses
        } else if (this.isBoardFull(board)) {
            return 0; // Draw
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
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
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
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6]  // Diagonal top-right to bottom-left
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

    handleWin(winner) {
        const winnerName = winner.player === 'X' ? this.player1Name : this.player2Name;
        const loserName = winner.player === 'X' ? this.player2Name : this.player1Name;
        
        // Store winner name for meme
        this.currentWinnerName = winnerName;
        
        this.gameMessage.textContent = `${winnerName} wins!`;
        this.gameMessage.classList.add('winner', 'clickable-message');
        
        // Update stats
        if (winner.player === 'X') {
            this.players[this.player1Id].wins++;
            this.players[this.player2Id].losses++;
        } else {
            this.players[this.player2Id].wins++;
            this.players[this.player1Id].losses++;
        }
        
        this.savePlayers();
        this.updatePlayerStats();
        this.drawWinLine(winner.pattern);
        
        // Make message clickable to show meme
        this.gameMessage.onclick = () => {
            if (this.currentWinnerName) {
                this.showRandomMeme(this.currentWinnerName);
            }
        };
        
        // Disable all cells
        Array.from(this.gameBoard.children).forEach(cell => {
            cell.classList.add('disabled');
        });
        
        // Enable New Game button now that game is finished
        this.newGameBtn.disabled = false;
        this.newGameBtn.classList.remove('btn-disabled');
    }
    
    showPlayerManagement() {
        this.playerManagement.classList.remove('hidden');
        this.gameSetup.classList.add('hidden');
        this.hideStatistics(); // Hide statistics if open
    }
    
    hidePlayerManagement() {
        // Hide statistics if it's open
        this.playerStatistics.classList.add('hidden');
        // Hide player management
        this.playerManagement.classList.add('hidden');
        // Show game setup
        this.gameSetup.classList.remove('hidden');
    }
    
    showPasswordModal() {
        this.statisticsPasswordInput.value = '';
        this.passwordError.classList.add('hidden');
        this.statisticsPasswordModal.classList.remove('hidden');
        // Focus on input
        setTimeout(() => {
            this.statisticsPasswordInput.focus();
        }, 100);
    }
    
    hidePasswordModal() {
        this.statisticsPasswordModal.classList.add('hidden');
        this.statisticsPasswordInput.value = '';
        this.passwordError.classList.add('hidden');
    }
    
    checkPassword() {
        const enteredPassword = this.statisticsPasswordInput.value.trim();
        
        if (enteredPassword === this.STATISTICS_PASSCODE) {
            this.hidePasswordModal();
            this.showStatistics();
        } else {
            this.passwordError.classList.remove('hidden');
            this.statisticsPasswordInput.value = '';
            this.statisticsPasswordInput.focus();
        }
    }
    
    showStatistics() {
        this.renderStatistics();
        this.playerManagement.classList.add('hidden');
        this.playerStatistics.classList.remove('hidden');
    }
    
    hideStatistics() {
        this.playerStatistics.classList.add('hidden');
        // Show player management again (since we're in the setup screen)
        if (this.playerSetup && !this.playerSetup.classList.contains('hidden')) {
            this.playerManagement.classList.remove('hidden');
        }
    }
    
    renderStatistics() {
        this.statisticsContent.innerHTML = '';
        
        // Calculate statistics for each player
        const playerStats = Object.entries(this.players).map(([id, player]) => {
            const totalGames = player.wins + player.losses + player.draws;
            const winPercentage = totalGames > 0 
                ? ((player.wins / totalGames) * 100).toFixed(1) 
                : '0.0';
            
            return {
                id,
                name: player.name,
                wins: player.wins,
                losses: player.losses,
                draws: player.draws,
                totalGames,
                winPercentage: parseFloat(winPercentage),
                isComputer: id === this.COMPUTER_ID
            };
        });
        
        // Sort by winning percentage (descending), then by total games
        playerStats.sort((a, b) => {
            if (b.winPercentage !== a.winPercentage) {
                return b.winPercentage - a.winPercentage;
            }
            return b.totalGames - a.totalGames;
        });
        
        if (playerStats.length === 0) {
            this.statisticsContent.innerHTML = '<p class="no-stats">No player statistics available yet.</p>';
            return;
        }
        
        // Create statistics table
        const statsTable = document.createElement('table');
        statsTable.className = 'stats-table';
        
        // Header
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Rank</th>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Total Games</th>
            <th>Win %</th>
        `;
        statsTable.appendChild(headerRow);
        
        // Data rows
        playerStats.forEach((stat, index) => {
            const row = document.createElement('tr');
            row.className = stat.isComputer ? 'computer-row' : '';
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${stat.name}${stat.isComputer ? ' 🤖' : ''}</td>
                <td>${stat.wins}</td>
                <td>${stat.losses}</td>
                <td>${stat.draws}</td>
                <td>${stat.totalGames}</td>
                <td><strong>${stat.winPercentage}%</strong></td>
            `;
            statsTable.appendChild(row);
        });
        
        this.statisticsContent.appendChild(statsTable);
    }
    
    showRandomMeme(winnerName) {
        // Set winner name in the message
        this.winnerNameSpan.textContent = winnerName;
        
        // Create a random winning meme
        const memeTemplate = this.winningMemeTemplates[Math.floor(Math.random() * this.winningMemeTemplates.length)];
        this.createTextMeme(memeTemplate);
        
        this.memePopup.classList.remove('hidden');
    }
    
    createTextMeme(template) {
        // Create a text-based winning meme
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 600, 500);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#FFA500');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 500);
        
        // Border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 5;
        ctx.strokeRect(5, 5, 590, 490);
        
        // Top text
        ctx.fillStyle = '#000';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(template.top, 300, 150);
        
        // Bottom text
        ctx.font = 'bold 48px Arial';
        ctx.fillText(template.bottom, 300, 250);
        
        // Emoji
        ctx.font = 'bold 100px Arial';
        ctx.fillText(template.emoji, 300, 380);
        
        this.memeImage.src = canvas.toDataURL();
    }
    
    hideMeme() {
        this.memePopup.classList.add('hidden');
    }

    handleDraw() {
        this.gameMessage.textContent = "It's a draw! (Cat's Game)";
        this.gameMessage.classList.add('draw');
        
        // Update stats
        this.players[this.player1Id].draws++;
        this.players[this.player2Id].draws++;
        
        this.savePlayers();
        this.updatePlayerStats();
        
        // Enable New Game button now that game is finished
        this.newGameBtn.disabled = false;
        this.newGameBtn.classList.remove('btn-disabled');
    }

    drawWinLine(pattern) {
        const [a, b, c] = pattern;
        const boardRect = this.gameBoard.getBoundingClientRect();
        const containerRect = this.boardContainer.getBoundingClientRect();
        
        // Get cell positions
        const getCellCenter = (index) => {
            const cell = this.gameBoard.children[index];
            const cellRect = cell.getBoundingClientRect();
            const relativeX = cellRect.left - containerRect.left + cellRect.width / 2;
            const relativeY = cellRect.top - containerRect.top + cellRect.height / 2;
            return { x: relativeX, y: relativeY };
        };

        const start = getCellCenter(a);
        const end = getCellCenter(c);
        
        // Set SVG dimensions to match container
        this.winLine.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);
        this.winLine.setAttribute('width', containerRect.width);
        this.winLine.setAttribute('height', containerRect.height);
        
        // Draw the line
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
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
