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
        
        // Award 50 credits for earning a Fruit of the Spirit badge
        const CREDITS_PER_BADGE = 50;
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
                const { error: transactionError } = await supabase
                    .from('Credit_Transactions')
                    .insert({
                        to_user_uid: userUid,
                        amount: CREDITS_PER_BADGE,
                        transaction_type: 'credit_added',
                        game_type: 'fruit_of_spirit_badge',
                        description: `Fruit of the Spirit Badge: ${badgeNameToUse} - ${CREDITS_PER_BADGE} credits`
                    });
                
                if (transactionError) {
                    console.error('Error recording badge credit transaction:', transactionError);
                }
            }
        } catch (error) {
            console.error('Error awarding credits for badge:', error);
            // Don't fail badge award if credit award fails
        }
        
        // Show notification to user
        showBadgeNotification(badgeType, badgeNameToUse, CREDITS_PER_BADGE);
        
        return true;
    } catch (error) {
        console.error('Error in awardBadge:', error);
        return false;
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
function showBadgeNotification(badgeType, badgeName, credits = 50) {
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
        'self_control': '🎯'
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

