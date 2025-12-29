// Statistics page functionality
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize statistics page
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for auth.js to initialize
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    loadStatistics();
                } else {
                    // Auth check will handle redirect, but show message if still checking
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

async function loadStatistics() {
    await Promise.all([
        loadSnakeStatistics(),
        loadSnakeHighScores(),
        loadTTTStatistics(),
        loadTTTGameHistory(),
        loadBibleTriviaStatistics()
    ]);
}

async function loadSnakeStatistics() {
    const snakeStatsDiv = document.getElementById('snakeStats');
    
    try {
        // Get all snake scores
        const { data: allScores, error: allError } = await supabase
            .from('Snake_Scores')
            .select('user_uid, score')
            .order('score', { ascending: false })
            .limit(1);
        
        if (allError) throw allError;
        
        // Get logged in user's highest score
        const session = window.authStatus?.getSession();
        let userHighScore = null;
        let userHighScoreData = null;
        
        if (session && session.uid) {
            const { data: userScores, error: userError } = await supabase
                .from('Snake_Scores')
                .select('score, level, snake_length')
                .eq('user_uid', session.uid)
                .order('score', { ascending: false })
                .limit(1);
            
            if (!userError && userScores && userScores.length > 0) {
                userHighScore = userScores[0].score;
                userHighScoreData = userScores[0];
            }
        }
        
        // Get user info for highest score
        let highestScorePlayer = 'No scores yet';
        if (allScores && allScores.length > 0) {
            const { data: users, error: usersError } = await supabase
                .from('Users')
                .select('UID, First_Name, Last_Name, Username')
                .eq('UID', allScores[0].user_uid)
                .single();
            
            if (!usersError && users) {
                highestScorePlayer = getUserDisplayName(users);
            }
        }
        
        // Display statistics
        snakeStatsDiv.innerHTML = '';
        
        // Highest score overall
        const highestCard = document.createElement('div');
        highestCard.className = 'stat-card';
        highestCard.innerHTML = `
            <div class="stat-card-label">Highest Score (Any User)</div>
            <div class="stat-card-value">${allScores && allScores.length > 0 ? allScores[0].score : 0}</div>
            <div class="stat-card-player">${highestScorePlayer}</div>
        `;
        snakeStatsDiv.appendChild(highestCard);
        
        // Logged in user's highest score
        const userCard = document.createElement('div');
        userCard.className = 'stat-card';
        if (userHighScore !== null) {
            userCard.innerHTML = `
                <div class="stat-card-label">Your Highest Score</div>
                <div class="stat-card-value">${userHighScore}</div>
                <div class="stat-card-player">Level ${userHighScoreData.level} • Length ${userHighScoreData.snake_length}</div>
            `;
        } else {
            userCard.innerHTML = `
                <div class="stat-card-label">Your Highest Score</div>
                <div class="stat-card-value">0</div>
                <div class="stat-card-player">No games played yet</div>
            `;
        }
        snakeStatsDiv.appendChild(userCard);
        
    } catch (error) {
        console.error('Error loading snake statistics:', error);
        snakeStatsDiv.innerHTML = '<div class="no-data">Error loading Snake statistics</div>';
    }
}

async function loadSnakeHighScores() {
    const highScoresList = document.getElementById('snakeHighScoresList');
    if (!highScoresList) return;
    
    try {
        // Get top 10 scores
        const { data: scores, error: scoresError } = await supabase
            .from('Snake_Scores')
            .select('score_id, user_uid, score, level, snake_length, game_duration_seconds, created_at')
            .order('score', { ascending: false })
            .limit(10);
        
        if (scoresError) throw scoresError;
        
        if (!scores || scores.length === 0) {
            highScoresList.innerHTML = '<div class="no-data">No scores yet. Be the first!</div>';
            return;
        }
        
        // Get user UIDs
        const userIds = [...new Set(scores.map(s => s.user_uid))];
        
        // Fetch user information
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        // Create user map
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        // Build list
        const listContainer = document.createElement('div');
        listContainer.className = 'high-scores-list';
        
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
                    <div class="score-item-meta">Level ${scoreData.level} • Length ${scoreData.snake_length} • ${scoreData.game_duration_seconds}s</div>
                </div>
                <div class="score-item-score">${scoreData.score}</div>
            `;
            listContainer.appendChild(scoreItem);
        });
        
        highScoresList.innerHTML = '';
        highScoresList.appendChild(listContainer);
        
    } catch (error) {
        console.error('Error loading snake high scores:', error);
        highScoresList.innerHTML = '<div class="no-data">Error loading high scores</div>';
    }
}

async function loadTTTStatistics() {
    const tttStatsDiv = document.getElementById('tttStats');
    
    try {
        // Get all game results
        const { data: games, error: gamesError } = await supabase
            .from('TTT_Game_Results')
            .select('player1_uid, player2_uid, winner_uid, is_draw, is_computer_player');
        
        if (gamesError) throw gamesError;
        
        if (!games || games.length === 0) {
            tttStatsDiv.innerHTML = '<div class="no-data">No Tic Tac Toe games played yet</div>';
            return;
        }
        
        // Calculate statistics for each player
        const playerStats = {};
        
        games.forEach(game => {
            // Process player1 (only if not computer)
            if (game.player1_uid) {
                if (!playerStats[game.player1_uid]) {
                    playerStats[game.player1_uid] = { wins: 0, losses: 0, draws: 0 };
                }
                if (game.is_draw) {
                    playerStats[game.player1_uid].draws++;
                } else if (game.winner_uid === game.player1_uid) {
                    playerStats[game.player1_uid].wins++;
                } else if (game.winner_uid !== null) {
                    // Only count as loss if there was a winner (not a draw)
                    playerStats[game.player1_uid].losses++;
                }
            }
            
            // Process player2 (only if not computer)
            if (game.player2_uid) {
                if (!playerStats[game.player2_uid]) {
                    playerStats[game.player2_uid] = { wins: 0, losses: 0, draws: 0 };
                }
                if (game.is_draw) {
                    playerStats[game.player2_uid].draws++;
                } else if (game.winner_uid === game.player2_uid) {
                    playerStats[game.player2_uid].wins++;
                } else if (game.winner_uid !== null) {
                    // Only count as loss if there was a winner (not a draw)
                    playerStats[game.player2_uid].losses++;
                }
            }
        });
        
        // Get user information
        const userIds = Object.keys(playerStats).map(uid => parseInt(uid));
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        // Create user map
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        // Calculate "Most" row
        let mostWins = 0, mostLosses = 0, mostDraws = 0;
        let mostWinsPlayer = null, mostLossesPlayer = null, mostDrawsPlayer = null;
        
        Object.entries(playerStats).forEach(([uid, stats]) => {
            if (stats.wins > mostWins) {
                mostWins = stats.wins;
                mostWinsPlayer = userMap[uid];
            }
            if (stats.losses > mostLosses) {
                mostLosses = stats.losses;
                mostLossesPlayer = userMap[uid];
            }
            if (stats.draws > mostDraws) {
                mostDraws = stats.draws;
                mostDrawsPlayer = userMap[uid];
            }
        });
        
        // Build table
        const table = document.createElement('table');
        table.className = 'ttt-stats-table';
        
        // Header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Win % of Total</th>
        `;
        table.appendChild(headerRow);
        
        // "Most" row
        const mostRow = document.createElement('tr');
        mostRow.className = 'most-row';
        const mostWinsName = mostWinsPlayer ? getUserDisplayName(mostWinsPlayer) : 'N/A';
        const mostLossesName = mostLossesPlayer ? getUserDisplayName(mostLossesPlayer) : 'N/A';
        const mostDrawsName = mostDrawsPlayer ? getUserDisplayName(mostDrawsPlayer) : 'N/A';
        mostRow.innerHTML = `
            <td><strong>Most</strong></td>
            <td>${mostWins} (${mostWinsName})</td>
            <td>${mostLosses} (${mostLossesName})</td>
            <td>${mostDraws} (${mostDrawsName})</td>
            <td>-</td>
        `;
        table.appendChild(mostRow);
        
        // Player rows
        const sortedPlayers = Object.entries(playerStats).sort((a, b) => {
            const aTotal = a[1].wins + a[1].losses + a[1].draws;
            const bTotal = b[1].wins + b[1].losses + b[1].draws;
            return bTotal - aTotal; // Sort by total games
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
                <td><strong>${winPercentage}%</strong></td>
            `;
            table.appendChild(row);
        });
        
        tttStatsDiv.innerHTML = '';
        tttStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading TTT statistics:', error);
        tttStatsDiv.innerHTML = '<div class="no-data">Error loading Tic Tac Toe statistics</div>';
    }
}

async function loadTTTGameHistory() {
    const gameHistoryList = document.getElementById('tttGameHistoryList');
    if (!gameHistoryList) return;
    
    try {
        // Get recent game results
        const { data: games, error: gamesError } = await supabase
            .from('TTT_Game_Results')
            .select('game_id, player1_uid, player2_uid, player1_symbol, player2_symbol, winner_uid, is_computer_player, is_draw, game_duration_seconds, created_at')
            .order('created_at', { ascending: false })
            .limit(50);
        
        if (gamesError) throw gamesError;
        
        if (!games || games.length === 0) {
            gameHistoryList.innerHTML = '<div class="no-data">No games played yet. Start a game to see history!</div>';
            return;
        }
        
        // Get unique user UIDs
        const userIds = new Set();
        games.forEach(game => {
            if (game.player1_uid) userIds.add(game.player1_uid);
            if (game.player2_uid) userIds.add(game.player2_uid);
        });
        
        // Fetch user information
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', Array.from(userIds));
        
        if (usersError) throw usersError;
        
        // Create user map
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        // Build history list
        const listContainer = document.createElement('div');
        listContainer.className = 'game-history-list';
        
        games.forEach(game => {
            // Get player names
            const p1Name = game.player1_uid 
                ? getUserDisplayName(userMap[game.player1_uid])
                : 'Computer 🤖';
            const p2Name = game.player2_uid 
                ? getUserDisplayName(userMap[game.player2_uid])
                : 'Computer 🤖';
            
            // Determine result
            let resultText = '';
            let resultColor = '#666';
            if (game.is_draw) {
                resultText = 'Draw';
                resultColor = '#856404';
            } else if (game.winner_uid === null && game.is_computer_player) {
                resultText = 'Computer Won';
                resultColor = '#CC5500';
            } else if (game.winner_uid) {
                const winnerName = getUserDisplayName(userMap[game.winner_uid]);
                resultText = `${winnerName} Won`;
                resultColor = '#28a745';
            } else {
                resultText = 'Unknown';
            }
            
            // Format date
            const gameDate = new Date(game.created_at);
            const dateStr = gameDate.toLocaleDateString() + ' ' + gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-header">
                    <div class="history-item-players">
                        ${p1Name} (${game.player1_symbol}) vs ${p2Name} (${game.player2_symbol})
                    </div>
                    <div class="history-item-result" style="color: ${resultColor};">
                        ${resultText}
                    </div>
                </div>
                <div class="history-item-meta">
                    ${dateStr} • ${game.game_duration_seconds}s
                </div>
            `;
            
            listContainer.appendChild(historyItem);
        });
        
        gameHistoryList.innerHTML = '';
        gameHistoryList.appendChild(listContainer);
        
    } catch (error) {
        console.error('Error loading TTT game history:', error);
        gameHistoryList.innerHTML = '<div class="no-data">Error loading game history</div>';
    }
}

async function loadBibleTriviaStatistics() {
    const bibleTriviaStatsDiv = document.getElementById('bibleTriviaStats');
    if (!bibleTriviaStatsDiv) return;
    
    try {
        // Get all question answers
        const { data: answers, error: answersError } = await supabase
            .from('Bible_Trivia_Answers')
            .select('user_uid, is_correct, answered_at');
        
        if (answersError) {
            // Table might not exist yet
            console.log('Bible_Trivia_Answers table may not exist:', answersError);
            bibleTriviaStatsDiv.innerHTML = '<div class="no-data">No Bible Trivia data available yet. Play the game to see statistics!</div>';
            return;
        }
        
        // Get all Bible link clicks
        const { data: linkClicks, error: clicksError } = await supabase
            .from('Bible_Trivia_Link_Clicks')
            .select('user_uid, clicked_at');
        
        if (clicksError) {
            console.log('Bible_Trivia_Link_Clicks table may not exist:', clicksError);
        }
        
        if ((!answers || answers.length === 0) && (!linkClicks || linkClicks.length === 0)) {
            bibleTriviaStatsDiv.innerHTML = '<div class="no-data">No Bible Trivia data available yet. Play the game to see statistics!</div>';
            return;
        }
        
        // Calculate statistics per user
        const userStats = {};
        
        // Process answers
        if (answers) {
            answers.forEach(answer => {
                if (!userStats[answer.user_uid]) {
                    userStats[answer.user_uid] = {
                        questionsAsked: 0,
                        questionsCorrect: 0,
                        bibleLinkClicks: 0
                    };
                }
                userStats[answer.user_uid].questionsAsked++;
                if (answer.is_correct) {
                    userStats[answer.user_uid].questionsCorrect++;
                }
            });
        }
        
        // Process Bible link clicks
        if (linkClicks) {
            linkClicks.forEach(click => {
                if (!userStats[click.user_uid]) {
                    userStats[click.user_uid] = {
                        questionsAsked: 0,
                        questionsCorrect: 0,
                        bibleLinkClicks: 0
                    };
                }
                userStats[click.user_uid].bibleLinkClicks++;
            });
        }
        
        // Get user information
        const userIds = Object.keys(userStats).map(uid => parseInt(uid));
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) throw usersError;
        
        // Create user map
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        // Build table
        const table = document.createElement('table');
        table.className = 'ttt-stats-table';
        
        // Header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>User</th>
            <th>Questions Asked</th>
            <th>Questions Correct</th>
            <th>Correct %</th>
            <th>Bible Link Clicks</th>
        `;
        table.appendChild(headerRow);
        
        // Sort by questions asked (descending)
        const sortedUsers = Object.entries(userStats).sort((a, b) => {
            return b[1].questionsAsked - a[1].questionsAsked;
        });
        
        // User rows
        sortedUsers.forEach(([uid, stats]) => {
            const user = userMap[uid];
            if (!user) return;
            
            const correctPercentage = stats.questionsAsked > 0
                ? ((stats.questionsCorrect / stats.questionsAsked) * 100).toFixed(1)
                : '0.0';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${getUserDisplayName(user)}</td>
                <td>${stats.questionsAsked}</td>
                <td>${stats.questionsCorrect}</td>
                <td><strong>${correctPercentage}%</strong></td>
                <td>${stats.bibleLinkClicks}</td>
            `;
            table.appendChild(row);
        });
        
        bibleTriviaStatsDiv.innerHTML = '';
        bibleTriviaStatsDiv.appendChild(table);
        
    } catch (error) {
        console.error('Error loading Bible Trivia statistics:', error);
        bibleTriviaStatsDiv.innerHTML = '<div class="no-data">Error loading Bible Trivia statistics</div>';
    }
}

function getUserDisplayName(user) {
    if (!user) return 'Unknown';
    if (user.First_Name && user.Last_Name) {
        return `${user.First_Name} ${user.Last_Name}`;
    }
    return user.Username || 'Unknown';
}

