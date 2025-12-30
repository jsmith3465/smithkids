// Badge Notification System - Shows users when they earn badges across all pages

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get shown notification IDs from localStorage
function getShownBadgeNotifications() {
    try {
        const shown = localStorage.getItem('shownBadgeNotifications');
        return shown ? JSON.parse(shown) : [];
    } catch (error) {
        console.error('Error reading shown badge notifications:', error);
        return [];
    }
}

// Mark notification as shown
function markBadgeNotificationAsShown(notificationId) {
    try {
        const shown = getShownBadgeNotifications();
        if (!shown.includes(notificationId)) {
            shown.push(notificationId);
            localStorage.setItem('shownBadgeNotifications', JSON.stringify(shown));
        }
    } catch (error) {
        console.error('Error saving shown badge notification:', error);
    }
}

// Clean up old notifications
function cleanupOldBadgeNotifications() {
    try {
        const shown = getShownBadgeNotifications();
        // Keep only last 100 notification IDs
        if (shown.length > 100) {
            const recent = shown.slice(-100);
            localStorage.setItem('shownBadgeNotifications', JSON.stringify(recent));
        }
    } catch (error) {
        console.error('Error cleaning up badge notifications:', error);
    }
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

// Create notification element
function createBadgeNotificationElement(notification) {
    const notificationEl = document.createElement('div');
    notificationEl.className = 'badge-notification';
    notificationEl.dataset.notificationId = notification.id;
    
    const icon = badgeIcons[notification.badge_type] || '🏆';
    
    notificationEl.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <span class="notification-icon">${icon}</span>
                <span class="notification-title">Badge Earned!</span>
                <button class="notification-close" onclick="this.closest('.badge-notification').remove()">×</button>
            </div>
            <div class="notification-body">
                <p class="notification-main-text">
                    <strong>${notification.badge_name}</strong>
                </p>
                <p class="notification-encouragement">
                    🎉 Congratulations! You've earned a new badge!
                </p>
                <p class="credits-amount">
                    +${notification.credits_awarded} Credits
                </p>
            </div>
        </div>
    `;
    
    return notificationEl;
}

// Show notification
function showBadgeNotification(notification) {
    // Check if notification container exists, create if not
    let container = document.getElementById('badgeNotificationsContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'badgeNotificationsContainer';
        container.className = 'badge-notifications-container';
        document.body.appendChild(container);
    }
    
    const notificationEl = createBadgeNotificationElement(notification);
    container.appendChild(notificationEl);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (notificationEl.parentNode) {
            notificationEl.style.animation = 'slideInRight 0.5s ease-out reverse';
            setTimeout(() => {
                notificationEl.remove();
            }, 500);
        }
    }, 8000);
}

// Check for new badge notifications
export async function checkForBadgeNotifications(userUid) {
    try {
        cleanupOldBadgeNotifications();
        
        const shownIds = getShownBadgeNotifications();
        
        // Get recent badge notifications for this user
        const { data: notifications, error } = await supabase
            .from('badge_notifications')
            .select('*')
            .eq('user_uid', userUid)
            .order('created_at', { ascending: false })
            .limit(10);
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching badge notifications:', error);
            return;
        }
        
        if (!notifications || notifications.length === 0) {
            return;
        }
        
        // Show notifications that haven't been shown yet
        for (const notification of notifications) {
            if (!shownIds.includes(notification.id)) {
                showBadgeNotification(notification);
                markBadgeNotificationAsShown(notification.id);
            }
        }
    } catch (error) {
        console.error('Error checking badge notifications:', error);
    }
}

// Initialize badge notifications on page load
export async function initializeBadgeNotifications() {
    const session = window.authStatus?.getSession();
    if (!session || session.userType === 'admin') {
        return; // Only show to standard users
    }
    
    // Wait a bit for page to load
    setTimeout(async () => {
        await checkForBadgeNotifications(session.uid);
    }, 1000);
    
    // Check periodically for new notifications
    setInterval(async () => {
        await checkForBadgeNotifications(session.uid);
    }, 30000); // Check every 30 seconds
}

