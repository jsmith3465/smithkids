// Admin Badges page - View all user badges and Fruits of the Spirit progress

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    checkUserAccess();
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
});

async function checkUserAccess() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    // Only admins can access this page
    if (session.userType !== 'admin') {
        document.getElementById('authCheck').innerHTML = '<p style="color: #dc3545;">Admin access required.</p>';
        return;
    }
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    // Setup tab switching
    setupTabs();
    
    // Load data
    await loadEarnedBadges();
    await loadFruitsOfSpirit();
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${targetTab}Tab`).classList.add('active');
        });
    });
}

// Badge icons mapping
const badgeIcons = {
    'first_game': '🎮',
    'trivia_master': '📖',
    'memory_verse': '🧠',
    'workout_warrior': '💪',
    'chore_champion': '🏠',
    'early_bird': '☀️',
    'all_fruits': '🍎',
    'love': '❤️',
    'joy': '😊',
    'peace': '🕊️',
    'patience': '⏳',
    'kindness': '🤝',
    'goodness': '✨',
    'faithfulness': '🙏',
    'gentleness': '🌸',
    'self_control': '🎯'
};

// Fruits of the Spirit list
const fruitsOfSpirit = [
    { id: 'love', name: 'Love', icon: '❤️' },
    { id: 'joy', name: 'Joy', icon: '😊' },
    { id: 'peace', name: 'Peace', icon: '🕊️' },
    { id: 'patience', name: 'Patience', icon: '⏳' },
    { id: 'kindness', name: 'Kindness', icon: '🤝' },
    { id: 'goodness', name: 'Goodness', icon: '✨' },
    { id: 'faithfulness', name: 'Faithfulness', icon: '🙏' },
    { id: 'gentleness', name: 'Gentleness', icon: '🌸' },
    { id: 'self_control', name: 'Self-Control', icon: '🎯' }
];

// Achievement badges (non-Fruits of the Spirit)
const achievementBadges = [
    { id: 'first_game', name: 'First Game', icon: '🎮' },
    { id: 'trivia_master', name: 'Trivia Master', icon: '📖' },
    { id: 'memory_verse', name: 'Memory Verse Champion', icon: '🧠' },
    { id: 'workout_warrior', name: 'Workout Warrior', icon: '💪' },
    { id: 'chore_champion', name: 'Chore Champion', icon: '🏠' },
    { id: 'early_bird', name: 'Early Bird', icon: '☀️' },
    { id: 'all_fruits', name: 'All Fruits of the Spirit', icon: '🍎' }
];

async function loadEarnedBadges() {
    const earnedBadgesList = document.getElementById('earnedBadgesList');
    earnedBadgesList.innerHTML = '<div class="loading">Loading badge data...</div>';
    
    try {
        // Get all standard users
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (usersError) {
            throw usersError;
        }
        
        if (!users || users.length === 0) {
            earnedBadgesList.innerHTML = '<div class="no-badges">No standard users found.</div>';
            return;
        }
        
        // Get all badges for all users (excluding Fruits of the Spirit)
        const fruitBadgeTypes = fruitsOfSpirit.map(f => f.id);
        const { data: allBadges, error: badgesError } = await supabase
            .from('User_Badges')
            .select('user_uid, badge_type, badge_name, earned_at')
            .in('user_uid', users.map(u => u.UID));
        
        if (badgesError) {
            throw badgesError;
        }
        
        // Filter out Fruits of the Spirit badges
        const achievementBadgesOnly = allBadges ? allBadges.filter(badge => !fruitBadgeTypes.includes(badge.badge_type)) : [];
        
        // Group badges by user
        const userBadgesMap = new Map();
        users.forEach(user => {
            userBadgesMap.set(user.UID, {
                user: user,
                badges: []
            });
        });
        
        if (achievementBadgesOnly) {
            achievementBadgesOnly.forEach(badge => {
                const userData = userBadgesMap.get(badge.user_uid);
                if (userData) {
                    userData.badges.push(badge);
                }
            });
        }
        
        // Display users with their badges
        earnedBadgesList.innerHTML = '';
        
        const userArray = Array.from(userBadgesMap.values());
        userArray.sort((a, b) => {
            // Sort by number of badges (descending), then by name
            if (b.badges.length !== a.badges.length) {
                return b.badges.length - a.badges.length;
            }
            const nameA = `${a.user.First_Name} ${a.user.Last_Name}`.trim() || a.user.Username;
            const nameB = `${b.user.First_Name} ${b.user.Last_Name}`.trim() || b.user.Username;
            return nameA.localeCompare(nameB);
        });
        
        userArray.forEach(({ user, badges }) => {
            const userName = `${user.First_Name} ${user.Last_Name}`.trim() || user.Username;
            
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            userCard.innerHTML = `
                <div class="user-header">
                    <div class="user-name">${userName}</div>
                    <div class="badge-count">${badges.length} Badge${badges.length !== 1 ? 's' : ''}</div>
                </div>
                ${badges.length > 0 ? `
                    <div class="badges-grid">
                        ${badges.map(badge => {
                            const icon = badgeIcons[badge.badge_type] || '🏆';
                            const date = new Date(badge.earned_at);
                            const formattedDate = date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            });
                            return `
                                <div class="badge-item">
                                    <div class="badge-icon">${icon}</div>
                                    <div class="badge-name">${badge.badge_name}</div>
                                    <div class="badge-date">${formattedDate}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : `
                    <div class="no-badges">No badges earned yet</div>
                `}
            `;
            
            earnedBadgesList.appendChild(userCard);
        });
        
    } catch (error) {
        console.error('Error loading earned badges:', error);
        earnedBadgesList.innerHTML = '<div class="no-badges" style="color: #dc3545;">Error loading badge data. Please try again.</div>';
    }
}

async function loadFruitsOfSpirit() {
    const fruitsBadgesList = document.getElementById('fruitsBadgesList');
    fruitsBadgesList.innerHTML = '<div class="loading">Loading Fruits of the Spirit data...</div>';
    
    try {
        // Get all standard users
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (usersError) {
            throw usersError;
        }
        
        if (!users || users.length === 0) {
            fruitsBadgesList.innerHTML = '<div class="no-badges">No standard users found.</div>';
            return;
        }
        
        // Get all Fruits of the Spirit badges
        const { data: allFruitBadges, error: badgesError } = await supabase
            .from('User_Badges')
            .select('user_uid, badge_type, badge_name, earned_at')
            .in('user_uid', users.map(u => u.UID))
            .in('badge_type', fruitsOfSpirit.map(f => f.id))
            .order('earned_at', { ascending: false });
        
        if (badgesError) {
            throw badgesError;
        }
        
        // Group badges by user
        const userFruitsMap = new Map();
        users.forEach(user => {
            userFruitsMap.set(user.UID, {
                user: user,
                fruits: new Map()
            });
        });
        
        if (allFruitBadges) {
            allFruitBadges.forEach(badge => {
                const userData = userFruitsMap.get(badge.user_uid);
                if (userData) {
                    userData.fruits.set(badge.badge_type, badge);
                }
            });
        }
        
        // Display users with their Fruits of the Spirit
        fruitsBadgesList.innerHTML = '';
        
        const userArray = Array.from(userFruitsMap.values());
        userArray.sort((a, b) => {
            // Sort by number of fruits (descending), then by name
            if (b.fruits.size !== a.fruits.size) {
                return b.fruits.size - a.fruits.size;
            }
            const nameA = `${a.user.First_Name} ${a.user.Last_Name}`.trim() || a.user.Username;
            const nameB = `${b.user.First_Name} ${b.user.Last_Name}`.trim() || b.user.Username;
            return nameA.localeCompare(nameB);
        });
        
        userArray.forEach(({ user, fruits }) => {
            const userName = `${user.First_Name} ${user.Last_Name}`.trim() || user.Username;
            
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            userCard.innerHTML = `
                <div class="user-header">
                    <div class="user-name">${userName}</div>
                    <div class="badge-count">${fruits.size} / 9 Fruits</div>
                </div>
                <div class="fruits-grid">
                    ${fruitsOfSpirit.map(fruit => {
                        const badge = fruits.get(fruit.id);
                        if (badge) {
                            const date = new Date(badge.earned_at);
                            const formattedDate = date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            });
                            return `
                                <div class="fruit-item" style="border-color: #28a745; background: #d4edda;">
                                    <div class="fruit-icon">${fruit.icon}</div>
                                    <div class="fruit-name">${fruit.name}</div>
                                    <div class="fruit-date">${formattedDate}</div>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="fruit-item" style="opacity: 0.4; border-color: #ccc;">
                                    <div class="fruit-icon">${fruit.icon}</div>
                                    <div class="fruit-name">${fruit.name}</div>
                                    <div class="fruit-date">Not earned</div>
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            `;
            
            fruitsBadgesList.appendChild(userCard);
        });
        
    } catch (error) {
        console.error('Error loading Fruits of the Spirit:', error);
        fruitsBadgesList.innerHTML = '<div class="no-badges" style="color: #dc3545;">Error loading Fruits of the Spirit data. Please try again.</div>';
    }
}

