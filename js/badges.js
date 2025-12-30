// Badges page for standard users

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
            id: 'early_bird',
            name: 'Early Bird',
            icon: '☀️',
            description: 'Complete morning checklist 7 days in a row',
            earned: false
        },
        {
            id: 'all_fruits',
            name: 'All Fruits of the Spirit',
            icon: '🍎',
            description: 'Collect all 9 Fruits of the Spirit',
            earned: false
        }
    ];
    
    // Check user's actual badge progress from database
    try {
        // Get all user badges
        const { data: userBadges, error } = await supabase
            .from('User_Badges')
            .select('badge_type')
            .eq('user_uid', userUid);
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user badges:', error);
        }
        
        const earnedBadgeTypes = new Set();
        if (userBadges) {
            userBadges.forEach(badge => {
                earnedBadgeTypes.add(badge.badge_type);
            });
        }
        
        // Check if user has all 9 Fruits of the Spirit
        const allFruits = ['love', 'joy', 'peace', 'patience', 'kindness', 'goodness', 'faithfulness', 'gentleness', 'self_control'];
        const hasAllFruits = allFruits.every(fruit => earnedBadgeTypes.has(fruit));
        
        // Mark badges as earned
        availableBadges.forEach(badge => {
            if (badge.id === 'all_fruits') {
                badge.earned = hasAllFruits;
            } else {
                // For other badges, check if they have the corresponding badge_type
                badge.earned = earnedBadgeTypes.has(badge.id);
            }
        });
        
    } catch (error) {
        console.error('Error checking badge progress:', error);
    }
    
    badgesList.innerHTML = '';
    
    availableBadges.forEach(badge => {
        const badgeCard = document.createElement('div');
        badgeCard.className = `badge-card ${badge.earned ? 'earned' : 'badge-locked'}`;
        
        // Show different credit amount for "All Fruits" badge
        const creditAmount = badge.id === 'all_fruits' ? 100 : 20;
        
        badgeCard.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
            <div class="credit-box">💰 Earn ${creditAmount} Credits</div>
        `;
        badgesList.appendChild(badgeCard);
    });
}

