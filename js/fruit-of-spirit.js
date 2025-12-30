// Fruit of the Spirit badge page

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
    
    // Only standard users can access this page
    if (session.userType === 'admin') {
        document.getElementById('authCheck').innerHTML = '<p style="color: #dc3545;">This page is for standard users only.</p>';
        return;
    }
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    await loadFruitsOfSpirit(session.uid);
}

async function loadFruitsOfSpirit(userUid) {
    const fruitList = document.getElementById('fruitList');
    
    // Import Supabase client
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Define the 9 Fruits of the Spirit
    const fruits = [
        {
            id: 'love',
            name: 'Love',
            icon: '❤️',
            verse: '1 Corinthians 13:4-7',
            description: 'Demonstrating unconditional love and care for others',
            earned: false
        },
        {
            id: 'joy',
            name: 'Joy',
            icon: '😊',
            verse: 'Philippians 4:4',
            description: 'Experiencing deep happiness and contentment in the Lord',
            earned: false
        },
        {
            id: 'peace',
            name: 'Peace',
            icon: '🕊️',
            verse: 'Philippians 4:7',
            description: 'Having inner calm and tranquility through faith',
            earned: false
        },
        {
            id: 'patience',
            name: 'Patience',
            icon: '⏳',
            verse: 'Romans 12:12',
            description: 'Showing endurance and tolerance in difficult situations',
            earned: false
        },
        {
            id: 'kindness',
            name: 'Kindness',
            icon: '🤝',
            verse: 'Ephesians 4:32',
            description: 'Being gentle, caring, and considerate to others',
            earned: false
        },
        {
            id: 'goodness',
            name: 'Goodness',
            icon: '✨',
            verse: 'Galatians 6:10',
            description: 'Doing what is right and beneficial for others',
            earned: false
        },
        {
            id: 'faithfulness',
            name: 'Faithfulness',
            icon: '🙏',
            verse: 'Hebrews 11:1',
            description: 'Being reliable, trustworthy, and committed',
            earned: false
        },
        {
            id: 'gentleness',
            name: 'Gentleness',
            icon: '🌸',
            verse: 'Colossians 3:12',
            description: 'Showing mildness, tenderness, and humility',
            earned: false
        },
        {
            id: 'self_control',
            name: 'Self-Control',
            icon: '🎯',
            verse: 'Titus 2:11-12',
            description: 'Exercising discipline and restraint over actions',
            earned: false
        }
    ];
    
    // Check user's earned badges from database
    let earnedCount = 0;
    const badgeMap = new Map(); // Map badge_type to badge data
    
    try {
        const { data: userBadges, error } = await supabase
            .from('User_Badges')
            .select('badge_type, badge_name, earned_at')
            .eq('user_uid', userUid)
            .in('badge_type', fruits.map(f => f.id));
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user badges:', error);
        } else if (userBadges) {
            // Create a map of earned badges
            userBadges.forEach(badge => {
                badgeMap.set(badge.badge_type, badge);
                earnedCount++;
            });
            
            // Mark earned badges
            fruits.forEach(fruit => {
                if (badgeMap.has(fruit.id)) {
                    fruit.earned = true;
                    fruit.badgeData = badgeMap.get(fruit.id);
                }
            });
        }
    } catch (error) {
        console.error('Error loading badges:', error);
    }
    
    // Display progress indicator
    const progressHtml = `
        <div style="
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
            border: 3px solid #DAA520;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        ">
            <div style="font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 10px;">
                Your Progress: ${earnedCount} of 9 Fruits Earned
            </div>
            <div style="
                background: #e0e0e0;
                border-radius: 10px;
                height: 25px;
                overflow: hidden;
                position: relative;
            ">
                <div style="
                    background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
                    height: 100%;
                    width: ${(earnedCount / 9) * 100}%;
                    transition: width 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 0.9rem;
                ">${Math.round((earnedCount / 9) * 100)}%</div>
            </div>
        </div>
    `;
    
    fruitList.innerHTML = progressHtml;
    
    fruits.forEach(fruit => {
        const fruitRow = document.createElement('div');
        fruitRow.className = `fruit-row ${fruit.earned ? 'earned' : 'fruit-locked'}`;
        
        // Create badge indicators (horizontal stack if multiple badges)
        let badgeIndicatorsHtml = '';
        if (fruit.earned && fruit.badgeData) {
            const earnedDate = new Date(fruit.badgeData.earned_at);
            const dateStr = earnedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            badgeIndicatorsHtml = `
                <div class="badge-indicators">
                    <div>
                        <div class="badge-indicator">✓</div>
                        <div class="badge-date">${dateStr}</div>
                    </div>
                </div>
            `;
        }
        
        fruitRow.innerHTML = `
            <span class="fruit-icon">${fruit.icon}</span>
            <div class="fruit-content">
                <div class="fruit-name">${fruit.name}</div>
                <div class="fruit-verse">${fruit.verse}</div>
                <div class="fruit-description">${fruit.description}</div>
            </div>
            ${badgeIndicatorsHtml}
        `;
        fruitList.appendChild(fruitRow);
    });
}

