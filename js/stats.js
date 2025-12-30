// Statistics page functionality
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let loadedTabs = new Set();

// Initialize statistics page
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for auth.js to initialize
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    initializeTabs();
                    loadStatistics('snake'); // Load default tab
                } else {
                    const authCheck = document.getElementById('authCheck');
                    if (authCheck) {
                        authCheck.innerHTML = '<p>Authentication failed. Redirecting to login...</p>';
                    }
                }
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkAuth);
            if (!window.authStatus) {
                const authCheck = document.getElementById('authCheck');
                if (authCheck) {
                    authCheck.innerHTML = '<p style="color: #dc3545;">Authentication check timed out. Please refresh the page.</p>';
                }
            }
        }, 5000);
    }, 200);
});

function initializeTabs() {
    const tabs = document.querySelectorAll('.stats-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.stats-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}TabBtn`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // Load stats for this tab if not already loaded
    if (!loadedTabs.has(tabName)) {
        loadStatistics(tabName);
    }
}

async function loadStatistics(tabName) {
    loadedTabs.add(tabName);
    
    switch(tabName) {
        case 'snake':
            await loadSnakeStatistics();
            break;
        case 'tictactoe':
            await loadTTTStatistics();
            break;
        case 'bibletrivia':
            await loadBibleTriviaStatistics();
            break;
        case 'hangman':
            await loadHangmanStatistics();
            break;
        case 'galaga':
            await loadGalagaStatistics();
            break;
        case 'breakout':
            await loadBreakoutStatistics();
            break;
        case 'tetris':
            await loadTetrisStatistics();
            break;
    }
}

async function loadSnakeStatistics() {
    const snakeStatsDiv = document.getElementById('snakeStats');
    
    try {
        const { data: scores, error: scoresError } = await supabase
            .from('Snake_Scores')
            .select('user_uid, score, level, snake_length, game_duration_seconds, created_at')
            .order('score', { ascending: false });
        
        if (scoresError) throw scoresError;
        
        if (!scores || scores.length === 0) {
            snakeStatsDiv.innerHTML = '<div class="no-data">No Snake game data available yet. Play the game to see statistics!</div>';
            return;
        }
        
        // Get user information
        const userIds = [...new Set(scores.map(s => s.user_uid))];
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        // Calculate statistics per user
        const userStats = {};
        scores.forEach(score => {
            if (!userStats[score.user_uid]) {
                userStats[score.user_uid] = {
                    gamesPlayed: 0,
                    totalScore: 0,
                    highestScore: 0,
                    highestLevel: 0,
                    longestSnake: 0,
                    totalTime: 0
                };
            }
            userStats[score.user_uid].gamesPlayed++;
            userStats[score.user_uid].totalScore += score.score;
            if (score.score > userStats[score.user_uid].highestScore) {
                userStats[score.user_uid].highestScore = score.score;
            }
            if (score.level > userStats[score.user_uid].highestLevel) {
                userStats[score.user_uid].highestLevel = score.level;
            }
            if (score.snake_length > userStats[score.user_uid].longestSnake) {
                userStats[score.user_uid].longestSnake = score.snake_length;
            }
            userStats[score.user_uid].totalTime += score.game_duration_seconds || 0;
        });
        
        // Build table
        const table = document.createElement('table');
        table.className = 'stats-table';
        
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Player</th>
            <th>Games Played</th>
            <th>Highest Score</th>
            <th>Highest Level</th>
            <th>Longest Snake</th>
            <th>Average Score</th>
            <th>Total Time (s)</th>
        `;
        table.appendChild(headerRow);
        
        const sortedUsers = Object.entries(userStats).sort((a, b) => b[1].highestScore - a[1].highestScore);
        
        sortedUsers.forEach(([uid, stats]) => {
            const user = userMap[uid];
            if (!user) return;
            
            const avgScore = (stats.totalScore / stats.gamesPlayed).toFixed(1);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${getUserDisplayName(user)}</td>
                <td>${stats.gamesPlayed}</td>
                <td><strong>${stats.highestScore}</strong></td>
                <td>${stats.highestLevel}</td>
                <td>${stats.longestSnake}</td>
                <td>${avgScore}</td>
                <td>${stats.totalTime}</td>
            `;
            table.appendChild(row);
        });
        
        snakeStatsDiv.innerHTML = '';
        snakeStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading Snake statistics:', error);
        snakeStatsDiv.innerHTML = '<div class="no-data">Error loading Snake statistics</div>';
    }
}

async function loadTTTStatistics() {
    const tttStatsDiv = document.getElementById('tttStats');
    
    try {
        // Try to use the new ttt_player_results table first (more efficient)
        const { data: playerResults, error: playerResultsError } = await supabase
            .from('ttt_player_results')
            .select('user_uid, result')
            .not('user_uid', 'is', null);
        
        if (!playerResultsError && playerResults && playerResults.length > 0) {
            // Use the new player results table
            const playerStats = {};
            
            playerResults.forEach(result => {
                const uid = result.user_uid;
                if (!playerStats[uid]) {
                    playerStats[uid] = { wins: 0, losses: 0, draws: 0 };
                }
                
                if (result.result === 'win') {
                    playerStats[uid].wins++;
                } else if (result.result === 'loss') {
                    playerStats[uid].losses++;
                } else if (result.result === 'draw') {
                    playerStats[uid].draws++;
                }
            });
            
            const userIds = Object.keys(playerStats).map(uid => parseInt(uid));
            const { data: users, error: usersError } = await supabase
                .from('Users')
                .select('UID, First_Name, Last_Name, Username')
                .in('UID', userIds);
            
            if (usersError) throw usersError;
            
            const userMap = {};
            if (users) {
                users.forEach(user => {
                    userMap[user.UID] = user;
                });
            }
            
            const table = document.createElement('table');
            table.className = 'stats-table';
            
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th>Player</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
                <th>Total Games</th>
                <th>Win %</th>
            `;
            table.appendChild(headerRow);
            
            const sortedPlayers = Object.entries(playerStats).sort((a, b) => {
                const aTotal = a[1].wins + a[1].losses + a[1].draws;
                const bTotal = b[1].wins + b[1].losses + b[1].draws;
                return bTotal - aTotal;
            });
            
            sortedPlayers.forEach(([uid, stats]) => {
                const user = userMap[uid];
                if (!user) return;
                
                const totalGames = stats.wins + stats.losses + stats.draws;
                const winPercentage = totalGames > 0 
                    ? ((stats.wins / totalGames) * 100).toFixed(1) 
                    : '0.0';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${getUserDisplayName(user)}</td>
                    <td>${stats.wins}</td>
                    <td>${stats.losses}</td>
                    <td>${stats.draws}</td>
                    <td>${totalGames}</td>
                    <td><strong>${winPercentage}%</strong></td>
                `;
                table.appendChild(row);
            });
            
            tttStatsDiv.innerHTML = '';
            tttStatsDiv.appendChild(table);
            return;
        }
        
        // Fallback to TTT_Game_Results table if ttt_player_results is empty
        const { data: games, error: gamesError } = await supabase
            .from('TTT_Game_Results')
            .select('player1_uid, player2_uid, winner_uid, is_draw, is_computer_player');
        
        if (gamesError) {
            console.error('Error loading TTT games:', gamesError);
            tttStatsDiv.innerHTML = `<div class="no-data">Error loading Tic Tac Toe statistics: ${gamesError.message}</div>`;
            return;
        }
        
        if (!games || games.length === 0) {
            tttStatsDiv.innerHTML = '<div class="no-data">No Tic Tac Toe games played yet. Play a game to see statistics!</div>';
            return;
        }
        
        const playerStats = {};
        
        games.forEach(game => {
            if (game.player1_uid) {
                if (!playerStats[game.player1_uid]) {
                    playerStats[game.player1_uid] = { wins: 0, losses: 0, draws: 0 };
                }
                if (game.is_draw) {
                    playerStats[game.player1_uid].draws++;
                } else if (game.winner_uid === game.player1_uid) {
                    playerStats[game.player1_uid].wins++;
                } else if (game.winner_uid !== null) {
                    playerStats[game.player1_uid].losses++;
                }
            }
            
            if (game.player2_uid) {
                if (!playerStats[game.player2_uid]) {
                    playerStats[game.player2_uid] = { wins: 0, losses: 0, draws: 0 };
                }
                if (game.is_draw) {
                    playerStats[game.player2_uid].draws++;
                } else if (game.winner_uid === game.player2_uid) {
                    playerStats[game.player2_uid].wins++;
                } else if (game.winner_uid !== null) {
                    playerStats[game.player2_uid].losses++;
                }
            }
        });
        
        const userIds = Object.keys(playerStats).map(uid => parseInt(uid));
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        const table = document.createElement('table');
        table.className = 'stats-table';
        
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Total Games</th>
            <th>Win %</th>
        `;
        table.appendChild(headerRow);
        
        const sortedPlayers = Object.entries(playerStats).sort((a, b) => {
            const aTotal = a[1].wins + a[1].losses + a[1].draws;
            const bTotal = b[1].wins + b[1].losses + b[1].draws;
            return bTotal - aTotal;
        });
        
        sortedPlayers.forEach(([uid, stats]) => {
            const user = userMap[uid];
            if (!user) return;
            
            const totalGames = stats.wins + stats.losses + stats.draws;
            const winPercentage = totalGames > 0 
                ? ((stats.wins / totalGames) * 100).toFixed(1) 
                : '0.0';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${getUserDisplayName(user)}</td>
                <td>${stats.wins}</td>
                <td>${stats.losses}</td>
                <td>${stats.draws}</td>
                <td>${totalGames}</td>
                <td><strong>${winPercentage}%</strong></td>
            `;
            table.appendChild(row);
        });
        
        tttStatsDiv.innerHTML = '';
        tttStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading TTT statistics:', error);
        tttStatsDiv.innerHTML = `<div class="no-data">Error loading Tic Tac Toe statistics: ${error.message}</div>`;
    }
}

async function loadBibleTriviaStatistics() {
    const bibleTriviaStatsDiv = document.getElementById('bibleTriviaStats');
    
    if (!bibleTriviaStatsDiv) {
        console.error('bibleTriviaStats div not found');
        return;
    }
    
    try {
        console.log('Loading Bible Trivia statistics...');
        
        // Fetch game results with detailed difficulty tracking
        const { data: results, error: resultsError } = await supabase
            .from('bible_trivia_results')
            .select('user_uid, score, total_questions, percentage_correct, easy_questions, easy_correct, moderate_questions, moderate_correct, hard_questions, hard_correct, created_at')
            .order('created_at', { ascending: false });
        
        if (resultsError) {
            console.error('Error loading Bible Trivia results:', resultsError);
            bibleTriviaStatsDiv.innerHTML = `<div class="no-data">Error loading Bible Trivia statistics: ${resultsError.message}</div>`;
            return;
        }
        
        console.log('Bible Trivia results fetched:', results?.length || 0, 'games');
        
        if (!results || results.length === 0) {
            bibleTriviaStatsDiv.innerHTML = '<div class="no-data">No Bible Trivia data available yet. Play the game to see statistics!<br><small>If you have played games, check the browser console (F12) for errors when finishing a game.</small></div>';
            return;
        }
        
        // Aggregate stats by user
        const userStats = {};
        
        results.forEach(result => {
            const uid = result.user_uid;
            if (!userStats[uid]) {
                userStats[uid] = {
                    gamesPlayed: 0,
                    totalQuestions: 0,
                    totalCorrect: 0,
                    totalEasy: 0,
                    easyCorrect: 0,
                    totalModerate: 0,
                    moderateCorrect: 0,
                    totalHard: 0,
                    hardCorrect: 0,
                    totalPercentage: 0
                };
            }
            
            userStats[uid].gamesPlayed++;
            userStats[uid].totalQuestions += result.total_questions || 10;
            userStats[uid].totalCorrect += result.score || 0;
            userStats[uid].totalEasy += result.easy_questions || 0;
            userStats[uid].easyCorrect += result.easy_correct || 0;
            userStats[uid].totalModerate += result.moderate_questions || 0;
            userStats[uid].moderateCorrect += result.moderate_correct || 0;
            userStats[uid].totalHard += result.hard_questions || 0;
            userStats[uid].hardCorrect += result.hard_correct || 0;
            userStats[uid].totalPercentage += parseFloat(result.percentage_correct) || 0;
        });
        
        // Get user information
        const userIds = Object.keys(userStats).map(uid => parseInt(uid));
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        const table = document.createElement('table');
        table.className = 'stats-table';
        
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>User</th>
            <th>Games Played</th>
            <th>Overall %</th>
            <th>Easy (Correct/Total)</th>
            <th>Moderate (Correct/Total)</th>
            <th>Hard (Correct/Total)</th>
        `;
        table.appendChild(headerRow);
        
        const sortedUsers = Object.entries(userStats).sort((a, b) => {
            return b[1].gamesPlayed - a[1].gamesPlayed;
        });
        
        sortedUsers.forEach(([uid, stats]) => {
            const user = userMap[uid];
            if (!user) return;
            
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : user.Username || 'Unknown';
            
            const avgPercentage = stats.gamesPlayed > 0
                ? (stats.totalPercentage / stats.gamesPlayed).toFixed(1)
                : '0.0';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${displayName}</td>
                <td>${stats.gamesPlayed}</td>
                <td><strong>${avgPercentage}%</strong></td>
                <td>${stats.easyCorrect} / ${stats.totalEasy}</td>
                <td>${stats.moderateCorrect} / ${stats.totalModerate}</td>
                <td>${stats.hardCorrect} / ${stats.totalHard}</td>
            `;
            table.appendChild(row);
        });
        
        bibleTriviaStatsDiv.innerHTML = '';
        bibleTriviaStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading Bible Trivia statistics:', error);
        bibleTriviaStatsDiv.innerHTML = `<div class="no-data">Error loading Bible Trivia statistics: ${error.message}<br><small>Check the browser console (F12) for more details.</small></div>`;
    }
}

async function loadHangmanStatistics() {
    const hangmanStatsDiv = document.getElementById('hangmanStats');
    
    try {
        const { data: scores, error: scoresError } = await supabase
            .from('hangman_scores')
            .select('user_uid, score, word, won, wrong_guesses, game_duration_seconds, created_at')
            .order('score', { ascending: false });
        
        if (scoresError) throw scoresError;
        
        if (!scores || scores.length === 0) {
            hangmanStatsDiv.innerHTML = '<div class="no-data">No Hangman game data available yet. Play the game to see statistics!</div>';
            return;
        }
        
        const userIds = [...new Set(scores.map(s => s.user_uid))];
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        const userStats = {};
        scores.forEach(score => {
            if (!userStats[score.user_uid]) {
                userStats[score.user_uid] = {
                    gamesPlayed: 0,
                    gamesWon: 0,
                    totalScore: 0,
                    highestScore: 0,
                    totalWrongGuesses: 0,
                    totalTime: 0
                };
            }
            userStats[score.user_uid].gamesPlayed++;
            if (score.won) {
                userStats[score.user_uid].gamesWon++;
            }
            userStats[score.user_uid].totalScore += score.score;
            if (score.score > userStats[score.user_uid].highestScore) {
                userStats[score.user_uid].highestScore = score.score;
            }
            userStats[score.user_uid].totalWrongGuesses += score.wrong_guesses || 0;
            userStats[score.user_uid].totalTime += score.game_duration_seconds || 0;
        });
        
        const table = document.createElement('table');
        table.className = 'stats-table';
        
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Player</th>
            <th>Games Played</th>
            <th>Games Won</th>
            <th>Win %</th>
            <th>Highest Score</th>
            <th>Average Score</th>
            <th>Avg Wrong Guesses</th>
        `;
        table.appendChild(headerRow);
        
        const sortedUsers = Object.entries(userStats).sort((a, b) => b[1].highestScore - a[1].highestScore);
        
        sortedUsers.forEach(([uid, stats]) => {
            const user = userMap[uid];
            if (!user) return;
            
            const winPercentage = ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(1);
            const avgScore = (stats.totalScore / stats.gamesPlayed).toFixed(1);
            const avgWrongGuesses = (stats.totalWrongGuesses / stats.gamesPlayed).toFixed(1);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${getUserDisplayName(user)}</td>
                <td>${stats.gamesPlayed}</td>
                <td>${stats.gamesWon}</td>
                <td><strong>${winPercentage}%</strong></td>
                <td><strong>${stats.highestScore}</strong></td>
                <td>${avgScore}</td>
                <td>${avgWrongGuesses}</td>
            `;
            table.appendChild(row);
        });
        
        hangmanStatsDiv.innerHTML = '';
        hangmanStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading Hangman statistics:', error);
        hangmanStatsDiv.innerHTML = '<div class="no-data">Error loading Hangman statistics</div>';
    }
}

async function loadGalagaStatistics() {
    const galagaStatsDiv = document.getElementById('galagaStats');
    
    try {
        const { data: scores, error: scoresError } = await supabase
            .from('galaga_scores')
            .select('user_uid, score, level, enemies_destroyed, game_duration_seconds, created_at')
            .order('score', { ascending: false });
        
        if (scoresError) throw scoresError;
        
        if (!scores || scores.length === 0) {
            galagaStatsDiv.innerHTML = '<div class="no-data">No Galaga game data available yet. Play the game to see statistics!</div>';
            return;
        }
        
        const userIds = [...new Set(scores.map(s => s.user_uid))];
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        const userStats = {};
        scores.forEach(score => {
            if (!userStats[score.user_uid]) {
                userStats[score.user_uid] = {
                    gamesPlayed: 0,
                    totalScore: 0,
                    highestScore: 0,
                    highestLevel: 0,
                    totalEnemiesDestroyed: 0,
                    totalTime: 0
                };
            }
            userStats[score.user_uid].gamesPlayed++;
            userStats[score.user_uid].totalScore += score.score;
            if (score.score > userStats[score.user_uid].highestScore) {
                userStats[score.user_uid].highestScore = score.score;
            }
            if (score.level > userStats[score.user_uid].highestLevel) {
                userStats[score.user_uid].highestLevel = score.level;
            }
            userStats[score.user_uid].totalEnemiesDestroyed += score.enemies_destroyed || 0;
            userStats[score.user_uid].totalTime += score.game_duration_seconds || 0;
        });
        
        const table = document.createElement('table');
        table.className = 'stats-table';
        
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Player</th>
            <th>Games Played</th>
            <th>Highest Score</th>
            <th>Highest Level</th>
            <th>Total Enemies Destroyed</th>
            <th>Average Score</th>
            <th>Total Time (s)</th>
        `;
        table.appendChild(headerRow);
        
        const sortedUsers = Object.entries(userStats).sort((a, b) => b[1].highestScore - a[1].highestScore);
        
        sortedUsers.forEach(([uid, stats]) => {
            const user = userMap[uid];
            if (!user) return;
            
            const avgScore = (stats.totalScore / stats.gamesPlayed).toFixed(1);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${getUserDisplayName(user)}</td>
                <td>${stats.gamesPlayed}</td>
                <td><strong>${stats.highestScore}</strong></td>
                <td>${stats.highestLevel}</td>
                <td>${stats.totalEnemiesDestroyed}</td>
                <td>${avgScore}</td>
                <td>${stats.totalTime}</td>
            `;
            table.appendChild(row);
        });
        
        galagaStatsDiv.innerHTML = '';
        galagaStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading Galaga statistics:', error);
        galagaStatsDiv.innerHTML = '<div class="no-data">Error loading Galaga statistics</div>';
    }
}

async function loadBreakoutStatistics() {
    const breakoutStatsDiv = document.getElementById('breakoutStats');
    
    try {
        const { data: scores, error: scoresError } = await supabase
            .from('breakout_scores')
            .select('user_uid, score, level, lives_remaining, bricks_destroyed, game_duration_seconds, created_at')
            .order('score', { ascending: false });
        
        if (scoresError) throw scoresError;
        
        if (!scores || scores.length === 0) {
            breakoutStatsDiv.innerHTML = '<div class="no-data">No Breakout game data available yet. Play the game to see statistics!</div>';
            return;
        }
        
        const userIds = [...new Set(scores.map(s => s.user_uid))];
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        const userStats = {};
        scores.forEach(score => {
            if (!userStats[score.user_uid]) {
                userStats[score.user_uid] = {
                    gamesPlayed: 0,
                    totalScore: 0,
                    highestScore: 0,
                    highestLevel: 0,
                    totalBricksDestroyed: 0,
                    totalTime: 0
                };
            }
            userStats[score.user_uid].gamesPlayed++;
            userStats[score.user_uid].totalScore += score.score;
            if (score.score > userStats[score.user_uid].highestScore) {
                userStats[score.user_uid].highestScore = score.score;
            }
            if (score.level > userStats[score.user_uid].highestLevel) {
                userStats[score.user_uid].highestLevel = score.level;
            }
            userStats[score.user_uid].totalBricksDestroyed += score.bricks_destroyed || 0;
            userStats[score.user_uid].totalTime += score.game_duration_seconds || 0;
        });
        
        const table = document.createElement('table');
        table.className = 'stats-table';
        
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Player</th>
            <th>Games Played</th>
            <th>Highest Score</th>
            <th>Highest Level</th>
            <th>Total Bricks Destroyed</th>
            <th>Average Score</th>
            <th>Total Time (s)</th>
        `;
        table.appendChild(headerRow);
        
        const sortedUsers = Object.entries(userStats).sort((a, b) => b[1].highestScore - a[1].highestScore);
        
        sortedUsers.forEach(([uid, stats]) => {
            const user = userMap[uid];
            if (!user) return;
            
            const avgScore = (stats.totalScore / stats.gamesPlayed).toFixed(1);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${getUserDisplayName(user)}</td>
                <td>${stats.gamesPlayed}</td>
                <td><strong>${stats.highestScore}</strong></td>
                <td>${stats.highestLevel}</td>
                <td>${stats.totalBricksDestroyed}</td>
                <td>${avgScore}</td>
                <td>${stats.totalTime}</td>
            `;
            table.appendChild(row);
        });
        
        breakoutStatsDiv.innerHTML = '';
        breakoutStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading Breakout statistics:', error);
        breakoutStatsDiv.innerHTML = '<div class="no-data">Error loading Breakout statistics</div>';
    }
}

async function loadTetrisStatistics() {
    const tetrisStatsDiv = document.getElementById('tetrisStats');
    
    try {
        const { data: scores, error: scoresError } = await supabase
            .from('tetris_scores')
            .select('user_uid, score, level, lines_cleared, game_duration_seconds, created_at')
            .order('score', { ascending: false });
        
        if (scoresError) throw scoresError;
        
        if (!scores || scores.length === 0) {
            tetrisStatsDiv.innerHTML = '<div class="no-data">No Tetris game data available yet. Play the game to see statistics!</div>';
            return;
        }
        
        const userIds = [...new Set(scores.map(s => s.user_uid))];
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        const userStats = {};
        scores.forEach(score => {
            if (!userStats[score.user_uid]) {
                userStats[score.user_uid] = {
                    gamesPlayed: 0,
                    totalScore: 0,
                    highestScore: 0,
                    highestLevel: 0,
                    totalLinesCleared: 0,
                    totalTime: 0
                };
            }
            userStats[score.user_uid].gamesPlayed++;
            userStats[score.user_uid].totalScore += score.score;
            if (score.score > userStats[score.user_uid].highestScore) {
                userStats[score.user_uid].highestScore = score.score;
            }
            if (score.level > userStats[score.user_uid].highestLevel) {
                userStats[score.user_uid].highestLevel = score.level;
            }
            userStats[score.user_uid].totalLinesCleared += score.lines_cleared || 0;
            userStats[score.user_uid].totalTime += score.game_duration_seconds || 0;
        });
        
        let html = '<table class="stats-table">';
        html += '<thead><tr><th>Player</th><th>Games Played</th><th>Highest Score</th><th>Highest Level</th><th>Total Lines</th><th>Avg Score</th><th>Total Time</th></tr></thead>';
        html += '<tbody>';
        
        const sortedUsers = Object.keys(userStats).sort((a, b) => 
            userStats[b].highestScore - userStats[a].highestScore
        );
        
        sortedUsers.forEach(uid => {
            const stats = userStats[uid];
            const user = userMap[uid];
            const avgScore = Math.round(stats.totalScore / stats.gamesPlayed);
            const totalMinutes = Math.floor(stats.totalTime / 60);
            const totalSeconds = stats.totalTime % 60;
            const timeStr = totalMinutes > 0 ? `${totalMinutes}m ${totalSeconds}s` : `${totalSeconds}s`;
            
            const userName = getUserDisplayName(user);
            
            html += `<tr>
                <td>${userName}</td>
                <td>${stats.gamesPlayed}</td>
                <td>${stats.highestScore.toLocaleString()}</td>
                <td>${stats.highestLevel}</td>
                <td>${stats.totalLinesCleared}</td>
                <td>${avgScore.toLocaleString()}</td>
                <td>${timeStr}</td>
            </tr>`;
        });
        
        html += '</tbody></table>';
        tetrisStatsDiv.innerHTML = html;
    } catch (error) {
        console.error('Error loading Tetris statistics:', error);
        tetrisStatsDiv.innerHTML = '<div class="error">Error loading statistics. Please try again.</div>';
    }
}

function getUserDisplayName(user) {
    if (!user) return 'Unknown';
    if (user.First_Name && user.Last_Name) {
        return `${user.First_Name} ${user.Last_Name}`;
    }
    return user.Username || 'Unknown';
}
