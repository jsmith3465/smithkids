// Badges page for standard users

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { getCreditAmount } from './credit-display-utils.js';

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
    
    // Define available badges with their requirements
    const availableBadges = [
        {
            id: 'trivia_master',
            name: 'Trivia Master',
            icon: '📖',
            description: 'Get 10 correct answers in Bible Trivia',
            requirement: 10,
            earned: false
        },
        {
            id: 'memory_verse',
            name: 'Memory Verse Champion',
            icon: '🧠',
            description: 'Complete memory verse 3 months in a row',
            requirement: 3,
            earned: false
        },
        {
            id: 'workout_warrior',
            name: 'Workout Warrior',
            icon: '💪',
            description: 'Complete 10 workouts',
            requirement: 10,
            earned: false
        },
        {
            id: 'chore_champion',
            name: 'Chore Champion',
            icon: '🏠',
            description: 'Complete 20 chores',
            requirement: 20,
            earned: false
        },
        {
            id: 'early_bird',
            name: 'Early Bird',
            icon: '☀️',
            description: 'Complete morning checklist 7 days in a row',
            requirement: 7,
            earned: false
        },
        {
            id: 'all_fruits',
            name: 'All Fruits of the Spirit',
            icon: '🍎',
            description: 'Collect all 9 Fruits of the Spirit',
            requirement: 9,
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
        
        // Mark badges as earned and get progress
        for (const badge of availableBadges) {
            if (badge.id === 'all_fruits') {
                badge.earned = hasAllFruits;
                if (!hasAllFruits) {
                    badge.current = allFruits.filter(fruit => earnedBadgeTypes.has(fruit)).length;
                }
            } else {
                badge.earned = earnedBadgeTypes.has(badge.id);
                if (!badge.earned) {
                    // Get current progress for unearned badges
                    badge.current = await getBadgeProgress(userUid, badge.id);
                }
            }
        }
        
    } catch (error) {
        console.error('Error checking badge progress:', error);
    }
    
    badgesList.innerHTML = '';
    
    // Load credit amounts for all badges
    for (const badge of availableBadges) {
        const badgeCard = document.createElement('div');
        badgeCard.className = `badge-card ${badge.earned ? 'earned' : ''}`;
        
        // Get credit amount from database
        const creditAmount = await getCreditAmount(badge.name, 'credit', badge.id === 'all_fruits' ? 100 : 20);
        
        // Build progress text
        let progressText = '';
        if (!badge.earned && badge.current !== undefined) {
            if (badge.id === 'memory_verse') {
                progressText = `<div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem; color: #856404;">
                    ${badge.current} of ${badge.requirement} consecutive months completed
                </div>`;
            } else if (badge.id === 'early_bird') {
                progressText = `<div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem; color: #856404;">
                    ${badge.current} of ${badge.requirement} consecutive days completed
                </div>`;
            } else if (badge.id === 'all_fruits') {
                progressText = `<div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem; color: #856404;">
                    ${badge.current} of ${badge.requirement} fruits collected
                </div>`;
            } else if (badge.id === 'trivia_master') {
                progressText = `<div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem; color: #856404;">
                    ${badge.current} of ${badge.requirement} correct answers
                </div>`;
            } else if (badge.id === 'workout_warrior') {
                progressText = `<div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem; color: #856404;">
                    ${badge.current} of ${badge.requirement} workouts completed
                </div>`;
            } else if (badge.id === 'chore_champion') {
                progressText = `<div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-radius: 5px; font-size: 0.9rem; color: #856404;">
                    ${badge.current} of ${badge.requirement} chores completed
                </div>`;
            }
        }
        
        badgeCard.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
            ${progressText}
            <div class="credit-box">💰 Earn ${creditAmount} Credits</div>
        `;
        badgesList.appendChild(badgeCard);
    }
}

// Get current progress for a specific badge
async function getBadgeProgress(userUid, badgeId) {
    try {
        switch(badgeId) {
            case 'trivia_master': {
                const { data: stats } = await supabase
                    .from('bible_trivia_user_stats')
                    .select('total_correct')
                    .eq('user_uid', userUid)
                    .single();
                return stats?.total_correct || 0;
            }
            
            case 'memory_verse': {
                // Get consecutive months count
                const { data: submissions } = await supabase
                    .from('Memory_Verse_Submissions')
                    .select('month_year, approved_at')
                    .eq('user_uid', userUid)
                    .eq('status', 'approved')
                    .order('month_year', { ascending: false });
                
                if (!submissions || submissions.length === 0) return 0;
                
                // Get unique months and sort them
                const uniqueMonths = [...new Set(submissions.map(s => s.month_year))];
                const monthDates = uniqueMonths.map(monthYear => {
                    const [year, month] = monthYear.split('-').map(Number);
                    return new Date(year, month - 1, 1);
                });
                
                // Sort by date descending (most recent first)
                monthDates.sort((a, b) => b - a);
                
                // Count consecutive months from the most recent
                let consecutiveCount = 1;
                for (let i = 1; i < monthDates.length; i++) {
                    const prevMonth = new Date(monthDates[i - 1]);
                    const expectedNextMonth = new Date(prevMonth);
                    expectedNextMonth.setMonth(expectedNextMonth.getMonth() - 1);
                    
                    if (monthDates[i].getTime() === expectedNextMonth.getTime()) {
                        consecutiveCount++;
                    } else {
                        break; // Stop counting when we hit a gap
                    }
                }
                
                return consecutiveCount;
            }
            
            case 'workout_warrior': {
                const { count } = await supabase
                    .from('Workouts')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_uid', userUid)
                    .eq('is_approved', true);
                return count || 0;
            }
            
            case 'chore_champion': {
                const { count } = await supabase
                    .from('Chores')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_uid', userUid)
                    .eq('is_approved', true);
                return count || 0;
            }
            
            case 'early_bird': {
                // Get checklist data for the last 7 days
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                
                const { data: checklists } = await supabase
                    .from('Morning_Checklist')
                    .select('checklist_date, task_1, task_2, task_3, task_4, task_5, task_6')
                    .eq('user_uid', userUid)
                    .gte('checklist_date', sevenDaysAgo.toISOString().split('T')[0])
                    .order('checklist_date', { ascending: false });
                
                if (!checklists || checklists.length === 0) return 0;
                
                // Count consecutive days with all tasks completed
                let consecutiveDays = 0;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                for (let i = 0; i < 7; i++) {
                    const checkDate = new Date(today);
                    checkDate.setDate(checkDate.getDate() - i);
                    const dateStr = checkDate.toISOString().split('T')[0];
                    
                    const dayChecklist = checklists.find(c => c.checklist_date === dateStr);
                    if (dayChecklist && dayChecklist.task_1 && dayChecklist.task_2 && 
                        dayChecklist.task_3 && dayChecklist.task_4 && 
                        dayChecklist.task_5 && dayChecklist.task_6) {
                        consecutiveDays++;
                    } else {
                        break; // Stop counting if we hit an incomplete day
                    }
                }
                
                return consecutiveDays;
            }
            
            case 'all_fruits': {
                const { data: userBadges } = await supabase
                    .from('User_Badges')
                    .select('badge_type')
                    .eq('user_uid', userUid);
                
                if (!userBadges) return 0;
                
                const allFruits = ['love', 'joy', 'peace', 'patience', 'kindness', 'goodness', 'faithfulness', 'gentleness', 'self_control'];
                const earnedFruits = userBadges.filter(b => allFruits.includes(b.badge_type));
                return earnedFruits.length;
            }
            
            default:
                return 0;
        }
    } catch (error) {
        console.error(`Error getting progress for ${badgeId}:`, error);
        return 0;
    }
}

