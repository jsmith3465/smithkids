// Badge utility functions for awarding badges to users

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Badge name mapping for Fruits of the Spirit
const badgeNames = {
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

/**
 * Award a badge to a user
 * @param {number} userUid - The user's UID
 * @param {string} badgeType - The badge type (e.g., 'love', 'joy', 'peace', etc.)
 * @param {string} badgeName - Optional badge name (will use default if not provided)
 * @returns {Promise<boolean>} - Returns true if badge was awarded, false if already earned
 */
export async function awardBadge(userUid, badgeType, badgeName = null) {
    try {
        // Check if badge already exists
        const { data: existing, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', badgeType)
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking existing badge:', checkError);
            return false;
        }
        
        // If badge already exists, return false
        if (existing) {
            return false;
        }
        
        // Award the badge
        const badgeNameToUse = badgeName || badgeNames[badgeType] || badgeType;
        const { error: insertError } = await supabase
            .from('User_Badges')
            .insert({
                user_uid: userUid,
                badge_type: badgeType,
                badge_name: badgeNameToUse
            });
        
        if (insertError) {
            console.error('Error awarding badge:', insertError);
            return false;
        }
        
        // Get credit amount from credit_manager table
        let CREDITS_PER_BADGE = 20; // Default fallback
        try {
            const { data: creditData, error: creditError } = await supabase
                .from('credit_manager')
                .select('credit_amount')
                .eq('app_name', badgeNameToUse)
                .eq('transaction_type', 'credit')
                .maybeSingle();
            
            if (!creditError && creditData) {
                CREDITS_PER_BADGE = creditData.credit_amount;
            } else {
                // Try alternative badge name mappings
                const badgeCreditMap = {
                    'First Game': 'First Game',
                    'Trivia Master': 'Trivia Master',
                    'Memory Verse Champion': 'Memory Verse',
                    'Workout Warrior': 'Workout',
                    'Chore Champion': 'Chore',
                    'Early Bird': 'Early Bird',
                    'All Fruits of the Spirit': 'All Fruits of the Spirit'
                };
                
                const appName = badgeCreditMap[badgeNameToUse] || badgeNameToUse;
                const { data: altCreditData, error: altCreditError } = await supabase
                    .from('credit_manager')
                    .select('credit_amount')
                    .eq('app_name', appName)
                    .eq('transaction_type', 'credit')
                    .maybeSingle();
                
                if (!altCreditError && altCreditData) {
                    CREDITS_PER_BADGE = altCreditData.credit_amount;
                }
            }
        } catch (error) {
            console.warn('Could not fetch badge credit amount from credit_manager, using default:', error);
        }
        
        // For Fruits of the Spirit badges, always use 20 credits
        const fruitBadges = ['love', 'joy', 'peace', 'patience', 'kindness', 'goodness', 'faithfulness', 'gentleness', 'self_control'];
        if (fruitBadges.includes(badgeType)) {
            CREDITS_PER_BADGE = 20;
        }
        
        // For "All Fruits" badge, use 100 credits
        if (badgeType === 'all_fruits') {
            CREDITS_PER_BADGE = 100;
        }
        try {
            // Get or create credit record
            const { data: existingCredit, error: creditFetchError } = await supabase
                .from('User_Credits')
                .select('credit_id, balance')
                .eq('user_uid', userUid)
                .single();
            
            if (creditFetchError && creditFetchError.code !== 'PGRST116') {
                console.error('Error fetching credits:', creditFetchError);
                // Don't fail badge award if credit fetch fails
            } else {
                const newBalance = (existingCredit?.balance || 0) + CREDITS_PER_BADGE;
                
                if (existingCredit) {
                    // Update existing balance
                    const { error: balanceUpdateError } = await supabase
                        .from('User_Credits')
                        .update({ balance: newBalance, updated_at: new Date().toISOString() })
                        .eq('credit_id', existingCredit.credit_id);
                    
                    if (balanceUpdateError) {
                        console.error('Error updating credits:', balanceUpdateError);
                    }
                } else {
                    // Create new credit record
                    const { error: balanceInsertError } = await supabase
                        .from('User_Credits')
                        .insert({ user_uid: userUid, balance: CREDITS_PER_BADGE });
                    
                    if (balanceInsertError) {
                        console.error('Error creating credit record:', balanceInsertError);
                    }
                }
                
                // Record transaction
                // Determine game_type based on badge type
                let gameType = 'badge';
                if (fruitBadges.includes(badgeType)) {
                    gameType = 'fruit_of_spirit_badge';
                } else if (badgeType === 'all_fruits') {
                    gameType = 'all_fruits_badge';
                } else {
                    gameType = `${badgeType}_badge`;
                }
                
                const { error: transactionError } = await supabase
                    .from('Credit_Transactions')
                    .insert({
                        to_user_uid: userUid,
                        amount: CREDITS_PER_BADGE,
                        transaction_type: 'credit_added',
                        game_type: gameType,
                        description: `Badge: ${badgeNameToUse} - ${CREDITS_PER_BADGE} credits`
                    });
                
                if (transactionError) {
                    console.error('Error recording badge credit transaction:', transactionError);
                }
            }
        } catch (error) {
            console.error('Error awarding credits for badge:', error);
            // Don't fail badge award if credit award fails
        }
        
        // Get user info for admin notification
        const { data: userData, error: userError } = await supabase
            .from('Users')
            .select('First_Name, Last_Name, Username')
            .eq('UID', userUid)
            .single();
        
        const userName = userData ? `${userData.First_Name} ${userData.Last_Name}`.trim() || userData.Username : 'Unknown User';
        const earnedAt = new Date().toISOString();
        
        // Send admin notification
        await sendAdminBadgeNotification(userName, badgeNameToUse, earnedAt);
        
        // Store badge notification for cross-page display
        await storeBadgeNotification(userUid, badgeType, badgeNameToUse, CREDITS_PER_BADGE);
        
        // Show notification to user
        showBadgeNotification(badgeType, badgeNameToUse, CREDITS_PER_BADGE);
        
        // Check if user now has all 9 Fruits of the Spirit badges
        await checkAndAwardAllFruitsBonus(userUid);
        
        return true;
    } catch (error) {
        console.error('Error in awardBadge:', error);
        return false;
    }
}

/**
 * Check if user has all 9 Fruits of the Spirit and award 100 credit bonus
 * @param {number} userUid - The user's UID
 */
async function checkAndAwardAllFruitsBonus(userUid) {
    try {
        // Define all 9 Fruits of the Spirit
        const allFruits = ['love', 'joy', 'peace', 'patience', 'kindness', 'goodness', 'faithfulness', 'gentleness', 'self_control'];
        
        // Get all Fruit of the Spirit badges for this user
        const { data: userBadges, error } = await supabase
            .from('User_Badges')
            .select('badge_type')
            .eq('user_uid', userUid)
            .in('badge_type', allFruits);
        
        if (error) {
            console.error('Error fetching user badges for all fruits check:', error);
            return;
        }
        
        // Check if user has all 9 badges
        const earnedBadgeTypes = new Set();
        if (userBadges) {
            userBadges.forEach(badge => {
                earnedBadgeTypes.add(badge.badge_type);
            });
        }
        
        const hasAllFruits = allFruits.every(fruit => earnedBadgeTypes.has(fruit));
        
        if (!hasAllFruits) {
            return; // User doesn't have all 9 yet
        }
        
        // Check if user already has the "all_fruits" badge
        const { data: existingAllFruitsBadge, error: checkError } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', 'all_fruits')
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking all fruits badge:', checkError);
            return;
        }
        
        // If badge already exists, don't award again
        if (existingAllFruitsBadge) {
            return;
        }
        
        // Award the "All Fruits of the Spirit" badge
        const { error: insertError } = await supabase
            .from('User_Badges')
            .insert({
                user_uid: userUid,
                badge_type: 'all_fruits',
                badge_name: 'All Fruits of the Spirit'
            });
        
        if (insertError) {
            console.error('Error awarding all fruits badge:', insertError);
            return;
        }
        
        // Award 100 credit bonus
        const BONUS_AMOUNT = 100;
        
        // Get current balance
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userUid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            console.error('Error fetching credit balance for bonus:', creditFetchError);
            return;
        }
        
        const oldBalance = existingCredit?.balance || 0;
        const newBalance = oldBalance + BONUS_AMOUNT;
        
        // Update balance
        if (existingCredit) {
            const { error: balanceUpdateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (balanceUpdateError) {
                console.error('Error updating balance for all fruits bonus:', balanceUpdateError);
                return;
            }
        } else {
            const { error: balanceInsertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: userUid, balance: BONUS_AMOUNT });
            
            if (balanceInsertError) {
                console.error('Error inserting balance for all fruits bonus:', balanceInsertError);
                return;
            }
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: null, // System bonus
                to_user_uid: userUid,
                amount: BONUS_AMOUNT,
                transaction_type: 'credit_added',
                game_type: 'all_fruits_badge',
                description: `All Fruits of the Spirit Badge Bonus - ${BONUS_AMOUNT} credits`
            });
        
        if (transError) {
            console.error('Error recording all fruits bonus transaction:', transError);
            // Don't fail if transaction recording fails, balance was already updated
        }
        
        // Show notification to user
        showBadgeNotification('all_fruits', 'All Fruits of the Spirit', BONUS_AMOUNT);
        
        console.log(`Awarded ${BONUS_AMOUNT} credit bonus to user ${userUid} for collecting all 9 Fruits of the Spirit`);
        
    } catch (error) {
        console.error('Error checking all fruits bonus:', error);
        // Don't throw - this is a bonus feature, shouldn't break the badge award process
    }
}

/**
 * Check if a user has earned a specific badge
 * @param {number} userUid - The user's UID
 * @param {string} badgeType - The badge type to check
 * @returns {Promise<boolean>} - Returns true if badge is earned
 */
export async function hasBadge(userUid, badgeType) {
    try {
        const { data, error } = await supabase
            .from('User_Badges')
            .select('badge_id')
            .eq('user_uid', userUid)
            .eq('badge_type', badgeType)
            .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error checking badge:', error);
            return false;
        }
        
        return !!data;
    } catch (error) {
        console.error('Error in hasBadge:', error);
        return false;
    }
}

/**
 * Get all badges for a user
 * @param {number} userUid - The user's UID
 * @returns {Promise<Array>} - Returns array of badge objects
 */
export async function getUserBadges(userUid) {
    try {
        const { data, error } = await supabase
            .from('User_Badges')
            .select('badge_type, badge_name, earned_at')
            .eq('user_uid', userUid)
            .order('earned_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching user badges:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('Error in getUserBadges:', error);
        return [];
    }
}

/**
 * Show a notification when a badge is earned
 * @param {string} badgeType - The badge type
 * @param {string} badgeName - The badge name
 * @param {number} credits - The number of credits awarded
 */
function showBadgeNotification(badgeType, badgeName, credits = 20) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
        border: 3px solid #DAA520;
        border-radius: 15px;
        padding: 20px 30px;
        box-shadow: 0 5px 20px rgba(218, 165, 32, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 300px;
    `;
    
    // Badge icons mapping
    const badgeIcons = {
        'love': '❤️',
        'joy': '😊',
        'peace': '🕊️',
        'patience': '⏳',
        'kindness': '🤝',
        'goodness': '✨',
        'faithfulness': '🙏',
        'gentleness': '🌸',
        'self_control': '🎯',
        'all_fruits': '🍎'
    };
    
    const icon = badgeIcons[badgeType] || '🏆';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 2.5rem;">${icon}</div>
            <div>
                <div style="font-weight: 700; color: #CC5500; font-size: 1.1rem; margin-bottom: 5px;">Badge Earned!</div>
                <div style="color: #333; font-size: 0.95rem; margin-bottom: 3px;">${badgeName}</div>
                <div style="color: #28a745; font-size: 0.9rem; font-weight: 600;">+${credits} Credits</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation CSS if not already present
    if (!document.getElementById('badgeNotificationStyle')) {
        const style = document.createElement('style');
        style.id = 'badgeNotificationStyle';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

/**
 * Send admin notification when a badge is unlocked
 * @param {string} userName - The user's name
 * @param {string} badgeName - The badge name
 * @param {string} earnedAt - When the badge was earned (ISO string)
 */
async function sendAdminBadgeNotification(userName, badgeName, earnedAt) {
    try {
        // Format the earned date
        const earnedDate = new Date(earnedAt);
        const formattedDate = earnedDate.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        // Call the Edge Function to send email notifications
        const { data, error } = await supabase.functions.invoke('send-approval-notification', {
            body: {
                notification_type: 'badge_unlocked',
                user_name: userName,
                badge_name: badgeName,
                earned_at: formattedDate,
                timestamp: earnedAt
            }
        });
        
        if (error) {
            console.error('Error sending admin badge notification:', error);
            // Don't fail badge award if notification fails
        } else {
            console.log('Admin badge notification sent successfully');
        }
    } catch (error) {
        console.error('Error in sendAdminBadgeNotification:', error);
        // Don't fail badge award if notification fails
    }
}

/**
 * Store badge notification for cross-page display
 * @param {number} userUid - The user's UID
 * @param {string} badgeType - The badge type
 * @param {string} badgeName - The badge name
 * @param {number} credits - The credits awarded
 */
async function storeBadgeNotification(userUid, badgeType, badgeName, credits) {
    try {
        // Store in a simple table for badge notifications
        // We'll use a table similar to approval_notification_queue
        const { error } = await supabase
            .from('badge_notifications')
            .insert({
                user_uid: userUid,
                badge_type: badgeType,
                badge_name: badgeName,
                credits_awarded: credits,
                created_at: new Date().toISOString()
            });
        
        if (error) {
            console.error('Error storing badge notification:', error);
            // Don't fail if storage fails - notification was already shown
        }
    } catch (error) {
        console.error('Error in storeBadgeNotification:', error);
        // Don't fail badge award if storage fails
    }
}

