// Fruit of the Spirit badge page

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
    
    // Only standard users can access this page
    if (session.userType === 'admin') {
        document.getElementById('authCheck').innerHTML = '<p style="color: #dc3545;">This page is for standard users only.</p>';
        return;
    }
    
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    if (!authCheck || !mainContent) {
        console.error('Required DOM elements not found');
        return;
    }
    
    authCheck.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    try {
        await loadFruitsOfSpirit(session.uid);
        await loadFamilyMembers(session.uid);
        setupNominationForm(session.uid);
    } catch (error) {
        console.error('Error loading fruits of spirit:', error);
        const fruitList = document.getElementById('fruitList');
        if (fruitList) {
            fruitList.innerHTML = '<div class="error-message" style="color: #dc3545; padding: 20px;">Error loading fruits. Please refresh the page.</div>';
        }
    }
}

// Load family members (other standard users) for nomination
async function loadFamilyMembers(currentUserUid) {
    const nomineeSelect = document.getElementById('nomineeSelect');
    if (!nomineeSelect) return;
    
    try {
        const { data: users, error } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .neq('UID', currentUserUid)
            .order('First_Name', { ascending: true });
        
        if (error) {
            console.error('Error loading family members:', error);
            return;
        }
        
        nomineeSelect.innerHTML = '<option value="">Select a family member...</option>';
        
        if (users && users.length > 0) {
            users.forEach(user => {
                const displayName = (user.First_Name && user.Last_Name)
                    ? `${user.First_Name} ${user.Last_Name} (${user.Username})`
                    : user.Username;
                
                const option = document.createElement('option');
                option.value = user.UID;
                option.textContent = displayName;
                nomineeSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading family members:', error);
    }
}

// Setup nomination form
function setupNominationForm(nominatorUid) {
    const nominationForm = document.getElementById('nominationForm');
    if (!nominationForm) return;
    
    nominationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitNomination(nominatorUid);
    });
}

// Submit nomination
async function submitNomination(nominatorUid) {
    const nomineeSelect = document.getElementById('nomineeSelect');
    const fruitSelect = document.getElementById('fruitSelect');
    const reasonTextarea = document.getElementById('nominationReason');
    const messageDiv = document.getElementById('nominationMessage');
    
    if (!nomineeSelect || !fruitSelect || !reasonTextarea || !messageDiv) return;
    
    const nomineeUid = parseInt(nomineeSelect.value);
    const fruitType = fruitSelect.value;
    const reason = reasonTextarea.value.trim();
    
    if (!nomineeUid || !fruitType || !reason) {
        showNominationMessage('Please fill in all fields.', 'error');
        return;
    }
    
    try {
        // Create nomination record
        const { data: nomination, error: nomError } = await supabase
            .from('fruit_nominations')
            .insert({
                nominator_uid: nominatorUid,
                nominee_uid: nomineeUid,
                fruit_type: fruitType,
                reason: reason,
                status: 'pending'
            })
            .select()
            .single();
        
        if (nomError) throw nomError;
        
        // Create approval entry in unified_approvals
        const fruitNames = {
            'love': 'Love',
            'joy': 'Joy',
            'peace': 'Peace',
            'patience': 'Patience',
            'kindness': 'Kindness',
            'goodness': 'Goodness',
            'faithfulness': 'Faithfulness',
            'gentleness': 'Gentleness',
            'self_control': 'Self-Control'
        };
        
        const { data: approval, error: approvalError } = await supabase
            .from('unified_approvals')
            .insert({
                approval_type: 'fruit_nomination',
                source_id: nomination.nomination_id,
                user_uid: nomineeUid,
                credits_amount: 20, // Fruit badges award 20 credits
                description: `Fruit of the Spirit nomination: ${fruitNames[fruitType]}`,
                status: 'pending'
            })
            .select()
            .single();
        
        if (approvalError) {
            console.error('Error creating approval:', approvalError);
            // Continue even if approval creation fails
        }
        
        // Get nominee and nominator names for message
        const { data: nomineeData } = await supabase
            .from('Users')
            .select('First_Name, Last_Name, Username')
            .eq('UID', nomineeUid)
            .single();
        
        const { data: nominatorData } = await supabase
            .from('Users')
            .select('First_Name, Last_Name, Username')
            .eq('UID', nominatorUid)
            .single();
        
        const nomineeName = (nomineeData?.First_Name && nomineeData?.Last_Name)
            ? `${nomineeData.First_Name} ${nomineeData.Last_Name}`
            : nomineeData?.Username || 'Unknown';
        
        const nominatorName = (nominatorData?.First_Name && nominatorData?.Last_Name)
            ? `${nominatorData.First_Name} ${nominatorData.Last_Name}`
            : nominatorData?.Username || 'Unknown';
        
        // Send message to all admins
        const { data: admins } = await supabase
            .from('Users')
            .select('UID')
            .eq('user_type', 'admin');
        
        if (admins && admins.length > 0) {
            const messageContent = `
                <div style="padding: 20px;">
                    <h3 style="color: #1976D2; margin-top: 0;">🌟 Fruit of the Spirit Nomination</h3>
                    <p><strong>Nominated:</strong> ${nomineeName}</p>
                    <p><strong>Nominated By:</strong> ${nominatorName}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Fruit of the Spirit:</strong> ${fruitNames[fruitType]} ${getFruitIcon(fruitType)}</p>
                    <p><strong>Reason:</strong></p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                        ${reason.replace(/\n/g, '<br>')}
                    </div>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
                        <a href="${getPagePath('approvals.html')}" style="
                            display: inline-block;
                            padding: 10px 20px;
                            background: #28a745;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: 600;
                            margin-right: 10px;
                        ">Review in Approvals</a>
                    </div>
                </div>
            `;
            
            for (const admin of admins) {
                await supabase
                    .from('message_boxes')
                    .insert({
                        from_user_uid: nominatorUid,
                        to_user_uid: admin.UID,
                        subject: `Fruit of the Spirit Nomination: ${nomineeName}`,
                        body: messageContent,
                        folder: 'inbox',
                        is_read: false
                    });
            }
        }
        
        // Show success message
        showNominationMessage('Nomination submitted successfully! Admins will review your nomination.', 'success');
        
        // Reset form
        nominationForm.reset();
        
    } catch (error) {
        console.error('Error submitting nomination:', error);
        showNominationMessage('Error submitting nomination. Please try again.', 'error');
    }
}

function showNominationMessage(message, type) {
    const messageDiv = document.getElementById('nominationMessage');
    if (!messageDiv) return;
    
    messageDiv.style.display = 'block';
    messageDiv.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
    messageDiv.style.border = `2px solid ${type === 'success' ? '#28a745' : '#dc3545'}`;
    messageDiv.style.color = type === 'success' ? '#155724' : '#721c24';
    messageDiv.textContent = message;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function getFruitIcon(fruitType) {
    const icons = {
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
    return icons[fruitType] || '';
}

async function loadFruitsOfSpirit(userUid) {
    const fruitList = document.getElementById('fruitList');
    
    if (!fruitList) {
        console.error('fruitList element not found');
        return;
    }
    
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
        const fruitBadgeTypes = fruits.map(f => f.id);
        console.log('Fetching badges for types:', fruitBadgeTypes);
        
        const { data: userBadges, error } = await supabase
            .from('User_Badges')
            .select('badge_type, badge_name, earned_at')
            .eq('user_uid', userUid)
            .in('badge_type', fruitBadgeTypes);
        
        if (error) {
            console.error('Error fetching user badges:', error);
        } else {
            console.log('User badges fetched:', userBadges);
            
            if (userBadges && userBadges.length > 0) {
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
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
                    height: 100%;
                    width: ${(earnedCount / 9) * 100}%;
                    transition: width 0.5s ease;
                    position: absolute;
                    left: 0;
                    top: 0;
                "></div>
                <div style="
                    position: absolute;
                    color: #333;
                    font-weight: 600;
                    font-size: 0.9rem;
                    z-index: 1;
                ">${Math.round((earnedCount / 9) * 100)}%</div>
            </div>
        </div>
    `;
    
    // Clear the loading message and set progress HTML
    fruitList.innerHTML = progressHtml;
    
    // Use for...of loop to properly handle async operations
    for (const fruit of fruits) {
        try {
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
            
            // Get credit amount from database for this fruit
            let fruitCreditAmount = 0;
            if (fruit.earned) {
                try {
                    fruitCreditAmount = await getCreditAmount(fruit.name, 'credit', 20);
                } catch (error) {
                    console.error(`Error getting credit amount for ${fruit.name}:`, error);
                    fruitCreditAmount = 20; // Fallback to default
                }
            }
            
            fruitRow.innerHTML = `
                <span class="fruit-icon">${fruit.icon}</span>
                <div class="fruit-content">
                    <div class="fruit-name">${fruit.name}</div>
                    <div class="fruit-verse">${fruit.verse}</div>
                    <div class="fruit-description">${fruit.description}</div>
                    ${fruit.earned ? `<div class="credit-box">💰 Earn ${fruitCreditAmount} Credits</div>` : ''}
                </div>
                ${badgeIndicatorsHtml}
            `;
            fruitList.appendChild(fruitRow);
        } catch (error) {
            console.error(`Error creating fruit row for ${fruit.name}:`, error);
            // Still create a basic row even if there's an error
            const fruitRow = document.createElement('div');
            fruitRow.className = `fruit-row ${fruit.earned ? 'earned' : 'fruit-locked'}`;
            fruitRow.innerHTML = `
                <span class="fruit-icon">${fruit.icon}</span>
                <div class="fruit-content">
                    <div class="fruit-name">${fruit.name}</div>
                    <div class="fruit-verse">${fruit.verse}</div>
                    <div class="fruit-description">${fruit.description}</div>
                </div>
            `;
            fruitList.appendChild(fruitRow);
        }
    }
    
    console.log(`Displayed ${fruits.length} fruits, ${earnedCount} earned`);
}

