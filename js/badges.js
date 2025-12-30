// Badges page for standard users

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
    
    // Only standard users can access badges page
    if (session.userType === 'admin') {
        document.getElementById('authCheck').innerHTML = '<p style="color: #dc3545;">This page is for standard users only.</p>';
        return;
    }
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    await loadBadges(session.uid);
}

async function loadBadges(userUid) {
    const badgesList = document.getElementById('badgesList');
    
    // Define available badges
    const availableBadges = [
        {
            id: 'first_game',
            name: 'First Game',
            icon: '🎮',
            description: 'Play your first game',
            earned: false
        },
        {
            id: 'trivia_master',
            name: 'Trivia Master',
            icon: '📖',
            description: 'Get 10 correct answers in Bible Trivia',
            earned: false
        },
        {
            id: 'perfect_score',
            name: 'Perfect Score',
            icon: '⭐',
            description: 'Get a perfect score in any game',
            earned: false
        },
        {
            id: 'memory_verse',
            name: 'Memory Verse Champion',
            icon: '🧠',
            description: 'Memorize a monthly memory verse',
            earned: false
        },
        {
            id: 'workout_warrior',
            name: 'Workout Warrior',
            icon: '💪',
            description: 'Complete 10 workouts',
            earned: false
        },
        {
            id: 'chore_champion',
            name: 'Chore Champion',
            icon: '🏠',
            description: 'Complete 20 chores',
            earned: false
        },
        {
            id: 'credit_collector',
            name: 'Credit Collector',
            icon: '💰',
            description: 'Earn 100 credits',
            earned: false
        },
        {
            id: 'early_bird',
            name: 'Early Bird',
            icon: '☀️',
            description: 'Complete morning checklist 7 days in a row',
            earned: false
        }
    ];
    
    // TODO: Check user's actual badge progress from database
    // For now, display all badges as locked
    
    badgesList.innerHTML = '';
    
    availableBadges.forEach(badge => {
        const badgeCard = document.createElement('div');
        badgeCard.className = `badge-card ${badge.earned ? 'earned' : 'badge-locked'}`;
        badgeCard.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
            ${badge.earned ? '<div class="credit-box">💰 Earn 20 Credits</div>' : ''}
        `;
        badgesList.appendChild(badgeCard);
    });
}

