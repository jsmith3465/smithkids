// Notification System for Approval Notifications
// Shows users when their requests (workouts, chores, memory verses) are approved

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get shown notification IDs from localStorage
function getShownNotifications() {
    try {
        const shown = localStorage.getItem('shownApprovalNotifications');
        return shown ? JSON.parse(shown) : [];
    } catch (error) {
        console.error('Error reading shown notifications:', error);
        return [];
    }
}

// Mark notification as shown
function markNotificationAsShown(approvalId) {
    try {
        const shown = getShownNotifications();
        if (!shown.includes(approvalId)) {
            shown.push(approvalId);
            localStorage.setItem('shownApprovalNotifications', JSON.stringify(shown));
        }
    } catch (error) {
        console.error('Error saving shown notification:', error);
    }
}

// Clean up old notifications (older than 7 days)
function cleanupOldNotifications() {
    try {
        const shown = getShownNotifications();
        // Keep only last 100 notification IDs to prevent localStorage from growing too large
        if (shown.length > 100) {
            const recent = shown.slice(-100);
            localStorage.setItem('shownApprovalNotifications', JSON.stringify(recent));
        }
    } catch (error) {
        console.error('Error cleaning up notifications:', error);
    }
}

// Format approval type for display
function formatApprovalType(type) {
    const types = {
        'workout': 'Workout',
        'chore': 'Chore',
        'memory_verse': 'Memory Verse'
    };
    return types[type] || type;
}

// Get encouraging message based on approval type
function getEncouragementMessage(type, credits) {
    const messages = [
        `🎉 Awesome work! Keep up the great effort!`,
        `🌟 You're doing amazing! Keep it up!`,
        `💪 Great job! Your hard work is paying off!`,
        `⭐ Excellent! You're on a roll!`,
        `🏆 Outstanding! Keep pushing forward!`,
        `✨ Fantastic! You're making great progress!`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    if (type === 'memory_verse') {
        return `📖 Well done memorizing God's Word! ${randomMessage}`;
    } else if (type === 'workout') {
        return `💪 Great workout! ${randomMessage}`;
    } else {
        return `🏠 Nice work on your chores! ${randomMessage}`;
    }
}

// Create notification element
function createNotificationElement(approval, approverName) {
    const notification = document.createElement('div');
    notification.className = 'approval-notification';
    notification.dataset.approvalId = approval.approval_id;
    
    const typeLabel = formatApprovalType(approval.approval_type);
    const encouragement = getEncouragementMessage(approval.approval_type, approval.credits_amount);
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <span class="notification-icon">✅</span>
                <span class="notification-title">Request Approved!</span>
                <button class="notification-close" onclick="this.closest('.approval-notification').remove()">×</button>
            </div>
            <div class="notification-body">
                <p class="notification-main-text">
                    Your <strong>${typeLabel}</strong> request has been approved!
                </p>
                <p class="notification-details">
                    Approved by: <strong>${approverName}</strong><br>
                    Credits received: <strong class="credits-amount">+${approval.credits_amount} credits</strong>
                </p>
                <p class="notification-encouragement">
                    ${encouragement}
                </p>
            </div>
        </div>
    `;
    
    return notification;
}

// Show notification
function showNotification(approval, approverName) {
    // Check if notification container exists, if not create it
    let container = document.getElementById('approvalNotificationsContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'approvalNotificationsContainer';
        container.className = 'approval-notifications-container';
        
        // Insert at the top of the body or main content
        const mainContent = document.querySelector('main') || document.querySelector('.container') || document.querySelector('.landing-container') || document.body;
        if (mainContent) {
            mainContent.insertBefore(container, mainContent.firstChild);
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }
    }
    
    const notification = createNotificationElement(approval, approverName);
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 10000);
    
    // Mark as shown
    markNotificationAsShown(approval.approval_id);
}

// Check for new approvals
async function checkForApprovedRequests() {
    const session = window.authStatus?.getSession();
    if (!session || !session.uid) {
        return;
    }
    
    // Only show notifications for standard users
    if (session.userType === 'admin') {
        return;
    }
    
    try {
        cleanupOldNotifications();
        const shownIds = getShownNotifications();
        
        // Get recently approved requests for this user (last 24 hours)
        const yesterday = new Date();
        yesterday.setHours(yesterday.getHours() - 24);
        
        const { data: approvals, error } = await supabase
            .from('unified_approvals')
            .select('approval_id, approval_type, credits_amount, description, approved_at, approved_by_uid')
            .eq('user_uid', session.uid)
            .eq('status', 'approved')
            .not('approved_at', 'is', null)
            .gte('approved_at', yesterday.toISOString())
            .order('approved_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching approved requests:', error);
            return;
        }
        
        if (!approvals || approvals.length === 0) {
            return;
        }
        
        // Filter out already shown notifications
        const newApprovals = approvals.filter(a => !shownIds.includes(a.approval_id));
        
        if (newApprovals.length === 0) {
            return;
        }
        
        // Get approver names
        const approverIds = [...new Set(newApprovals.map(a => a.approved_by_uid).filter(Boolean))];
        let approverMap = {};
        
        if (approverIds.length > 0) {
            const { data: approvers, error: approverError } = await supabase
                .from('Users')
                .select('UID, First_Name, Last_Name, Username')
                .in('UID', approverIds);
            
            if (!approverError && approvers) {
                approvers.forEach(approver => {
                    const name = approver.First_Name && approver.Last_Name
                        ? `${approver.First_Name} ${approver.Last_Name}`
                        : approver.Username || 'Admin';
                    approverMap[approver.UID] = name;
                });
            }
        }
        
        // Show notifications (with slight delay between each)
        newApprovals.forEach((approval, index) => {
            const approverName = approval.approved_by_uid && approverMap[approval.approved_by_uid]
                ? approverMap[approval.approved_by_uid]
                : 'Admin';
            
            setTimeout(() => {
                showNotification(approval, approverName);
            }, index * 500); // Stagger notifications by 500ms
        });
        
    } catch (error) {
        console.error('Error checking for approved requests:', error);
    }
}

// Initialize notification system
export async function initializeApprovalNotifications() {
    // Wait for auth to be ready
    if (!window.authStatus) {
        // Try again after a short delay
        setTimeout(initializeApprovalNotifications, 500);
        return;
    }
    
    const session = window.authStatus?.getSession();
    if (!session || !session.uid) {
        return;
    }
    
    // Only check for standard users
    if (session.userType === 'admin') {
        return;
    }
    
    // Check for approvals after a short delay to ensure page is loaded
    setTimeout(() => {
        checkForApprovedRequests();
    }, 1000);
    
    // Also check periodically (every 30 seconds) for new approvals
    setInterval(() => {
        checkForApprovedRequests();
    }, 30000);
}

// Make function available globally for inline onclick handlers
window.removeApprovalNotification = function(approvalId) {
    const notification = document.querySelector(`.approval-notification[data-approval-id="${approvalId}"]`);
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    markNotificationAsShown(approvalId);
};

