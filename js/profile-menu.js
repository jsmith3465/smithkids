// Profile menu component

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

async function createProfileMenu() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const displayName = session.firstName && session.lastName 
        ? `${session.firstName} ${session.lastName}` 
        : session.username;
    
    const userType = session.userType || 'standard';
    const isAdmin = userType === 'admin';
    
    // Get credit balance and savings balance for standard users
    let creditBalance = null;
    let savingsBalance = null;
    if (!isAdmin) {
        const balances = await getCreditBalances(session.uid);
        creditBalance = balances.available;
        savingsBalance = balances.savings;
    }
    
    // Get pending approvals count
    let pendingApprovalsCount = 0;
    if (isAdmin) {
        pendingApprovalsCount = await getPendingApprovalsCount();
    } else {
        // For standard users, get their own pending approvals
        pendingApprovalsCount = await getUserPendingApprovalsCount(session.uid);
    }
    
    // Find the header area where we'll add the profile menu (different pages use different header layouts)
    const headerRight =
        document.getElementById('profileMenuContainer') ||
        document.querySelector('header > div > div:last-child') ||
        document.querySelector('header');
    if (!headerRight) return;
    
    // Remove old userInfo and logoutBtn if they exist
    const oldUserInfo = document.getElementById('userInfo');
    const oldLogoutBtn = document.getElementById('logoutBtn');
    if (oldUserInfo) oldUserInfo.remove();
    if (oldLogoutBtn) oldLogoutBtn.remove();
    
    // Build menu items based on user type
    let menuItems = '';
    
    if (isAdmin) {
        menuItems = `
            <a href="${getPagePath('add-credits.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                💰 Credit Management
            </a>
            <a href="${getPagePath('approvals.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                position: relative;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                ✅ Approvals
                ${pendingApprovalsCount > 0 ? `<span style="
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: #dc3545;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                ">${pendingApprovalsCount}</span>` : ''}
            </a>
            <a href="${getPagePath('morning-checklist.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                ☀️ Morning Checklist
            </a>
            <a href="${getPagePath('admin-badges.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                🏆 Badges
            </a>
            <a href="${getPagePath('admin-marketplace.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                🛍️ Marketplace
            </a>
        `;
    } else {
        menuItems = `
            <div style="display: flex; border-bottom: 1px solid #e0e0e0;">
                <div style="flex: 1; padding: 12px 15px; background: #fff3cd; text-align: center; border-right: 1px solid #e0e0e0;">
                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 5px;">Available Balance</div>
                    <div style="font-size: 1.2rem; font-weight: 700; color: #CC5500;">${creditBalance !== null ? creditBalance : 0}</div>
                </div>
                <div style="flex: 1; padding: 12px 15px; background: #d4edda; text-align: center;">
                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 5px;">Savings Balance</div>
                    <div style="font-size: 1.2rem; font-weight: 700; color: #155724;">${savingsBalance !== null ? savingsBalance : 0}</div>
                </div>
            </div>
            <a href="${getPagePath('account-information.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                📊 Account Information
            </a>
            <a href="${getPagePath('marketplace.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                position: relative;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                🛍️ Marketplace
                ${pendingApprovalsCount > 0 ? `<span style="
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: #ffc107;
                    color: #333;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                ">${pendingApprovalsCount}</span>` : ''}
            </a>
            <a href="${getPagePath('badges.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                🏆 Badges
            </a>
            <a href="${getPagePath('fruit-of-spirit.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                🍎 Fruits of the Spirit
            </a>
        `;
    }
    
    // Create profile menu container
    const profileContainer = document.createElement('div');
    profileContainer.style.cssText = 'position: relative; display: flex; align-items: center; gap: 10px;';
    profileContainer.innerHTML = `
        <a href="${window.location.pathname.includes('pages/') ? '../index.html' : 'index.html'}" style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #DAA520;
            background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            text-decoration: none;
        " onmouseenter="this.style.transform='scale(1.1)'; this.style.boxShadow='0 3px 10px rgba(218, 165, 32, 0.4)'" onmouseleave="this.style.transform='scale(1)'; this.style.boxShadow='none'">🏠</a>
        <a id="messagesBtn" href="${getPagePath('messages.html')}" style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #DAA520;
            background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
            color: white;
            font-size: 1.35rem;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            text-decoration: none;
            position: relative;
        " onmouseenter="this.style.transform='scale(1.1)'; this.style.boxShadow='0 3px 10px rgba(218, 165, 32, 0.4)'" onmouseleave="this.style.transform='scale(1)'; this.style.boxShadow='none'" aria-label="Messages">
            💬
            <span id="messagesUnreadBadge" style="
                position: absolute;
                top: -6px;
                right: -6px;
                background: #dc3545;
                color: white;
                border-radius: 999px;
                min-width: 18px;
                height: 18px;
                padding: 0 5px;
                display: none;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: 800;
                border: 2px solid white;
                line-height: 1;
            ">0</span>
        </a>
        <div style="position: relative;">
            <button id="profileBtn" style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid #DAA520;
                background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%);
                color: white;
                font-size: 1.2rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            ">${displayName.charAt(0).toUpperCase()}</button>
            <div id="profileDropdown" style="
                position: absolute;
                top: 50px;
                right: 0;
                background: white;
                border: 2px solid #DAA520;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                min-width: 250px;
                max-width: calc(100vw - 20px);
                width: auto;
                white-space: nowrap;
                display: none;
                z-index: 1000;
                overflow: hidden;
            ">
                <div style="padding: 15px; border-bottom: 1px solid #e0e0e0; background: #f8f9fa; text-align: center;">
                    <div style="font-weight: 600; color: #333;">${displayName}</div>
                    <div style="font-size: 0.85rem; color: #666; margin-top: 3px;">${session.username} ${isAdmin ? '(Admin)' : ''}</div>
                </div>
                ${menuItems}
                <a href="${getPagePath('stats.html')}" style="
                    display: block;
                    padding: 12px 15px;
                    color: #333;
                    text-decoration: none;
                    transition: background 0.2s ease;
                    text-align: left;
                    white-space: nowrap;
                " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                    📊 Game Statistics
                </a>
                ${isAdmin ? `
                <a href="${getPagePath('settings.html')}" style="
                    display: block;
                    padding: 12px 15px;
                    color: #333;
                    text-decoration: none;
                    transition: background 0.2s ease;
                    text-align: left;
                    white-space: nowrap;
                " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                    ⚙️ Settings
                </a>
                ` : ''}
                <button id="profileLogoutBtn" style="
                    width: 100%;
                    padding: 12px 15px;
                    border: none;
                    background: white;
                    color: #dc3545;
                    text-align: left;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background 0.2s ease;
                " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                    🚪 Logout
                </button>
            </div>
        </div>
    `;
    
    headerRight.appendChild(profileContainer);

    // Unread message badge (polling-based; safe if table doesn't exist yet)
    async function updateUnreadMessagesBadge() {
        try {
            const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
            const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
            const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

            const { count, error } = await supabase
                .from('message_boxes')
                .select('*', { count: 'exact', head: true })
                .eq('user_uid', session.uid)
                .eq('folder', 'inbox')
                .eq('is_read', false)
                .is('purged_at', null);

            if (error) {
                // If table/permissions not ready, just hide badge quietly
                const badge = document.getElementById('messagesUnreadBadge');
                if (badge) badge.style.display = 'none';
                return;
            }

            const unread = count || 0;
            const badge = document.getElementById('messagesUnreadBadge');
            if (!badge) return;
            if (unread > 0) {
                badge.textContent = unread > 99 ? '99+' : String(unread);
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        } catch (error) {
            // no-op
        }
    }

    updateUnreadMessagesBadge();
    setInterval(updateUnreadMessagesBadge, 20000);
    
    // Toggle dropdown
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    
    // Function to adjust dropdown position for mobile
    function adjustDropdownPosition() {
        if (!profileDropdown || profileDropdown.style.display !== 'block') {
            return;
        }
        
        const viewportWidth = window.innerWidth;
        const isMobile = viewportWidth < 768;
        const buttonRect = profileBtn.getBoundingClientRect();
        const dropdownTop = buttonRect.bottom + 5; // 5px gap below button
        
        // Use fixed positioning to position relative to viewport
        profileDropdown.style.position = 'fixed';
        profileDropdown.style.top = `${dropdownTop}px`;
        profileDropdown.style.maxWidth = `${viewportWidth - 20}px`;
        
        if (isMobile) {
            // On mobile, always align to right edge of viewport with padding
            profileDropdown.style.right = '10px';
            profileDropdown.style.left = 'auto';
        } else {
            // On desktop, try to align with button, but adjust if needed
            const dropdownWidth = profileDropdown.offsetWidth || 250;
            const buttonRight = buttonRect.right;
            
            // Try to align dropdown right edge with button right edge
            const rightOffset = viewportWidth - buttonRight;
            const dropdownLeft = viewportWidth - rightOffset - dropdownWidth;
            
            if (dropdownLeft < 10) {
                // If it would go off left edge, align to left with padding
                profileDropdown.style.left = '10px';
                profileDropdown.style.right = 'auto';
            } else if (buttonRight + dropdownWidth > viewportWidth - 10) {
                // If it would go off right edge, align to right with padding
                profileDropdown.style.right = '10px';
                profileDropdown.style.left = 'auto';
            } else {
                // Position relative to button
                profileDropdown.style.right = `${rightOffset}px`;
                profileDropdown.style.left = 'auto';
            }
        }
    }
    
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = profileDropdown.style.display === 'block';
        profileDropdown.style.display = isVisible ? 'none' : 'block';
        
        // Adjust position after showing
        if (!isVisible) {
            // Use requestAnimationFrame for better timing
            requestAnimationFrame(() => {
                adjustDropdownPosition();
            });
        }
    });
    
    // Adjust on window resize
    window.addEventListener('resize', () => {
        if (profileDropdown.style.display === 'block') {
            adjustDropdownPosition();
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileContainer.contains(e.target)) {
            profileDropdown.style.display = 'none';
        }
    });
    
    // Handle logout
    profileLogoutBtn.addEventListener('click', () => {
        if (window.handleLogout) {
            window.handleLogout();
        }
    });
    
    // Hover effect
    profileBtn.addEventListener('mouseenter', () => {
        profileBtn.style.transform = 'scale(1.1)';
        profileBtn.style.boxShadow = '0 3px 10px rgba(218, 165, 32, 0.4)';
    });
    
    profileBtn.addEventListener('mouseleave', () => {
        profileBtn.style.transform = 'scale(1)';
        profileBtn.style.boxShadow = 'none';
    });
}

// Get credit balances (available and savings) for a user
async function getCreditBalances(userUid) {
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        const { data, error } = await supabase
            .from('User_Credits')
            .select('balance, savings_balance')
            .eq('user_uid', userUid)
            .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error fetching credit balances:', error);
            return { available: 0, savings: 0 };
        }
        
        return {
            available: data ? (data.balance || 0) : 0,
            savings: data ? (data.savings_balance || 0) : 0
        };
    } catch (error) {
        console.error('Error fetching credit balances:', error);
        return { available: 0, savings: 0 };
    }
}

// Get pending approvals count from unified table (for admins)
async function getPendingApprovalsCount() {
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Count all pending approvals from unified table
        const { count, error } = await supabase
            .from('unified_approvals')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');
        
        if (error) {
            console.error('Error fetching pending approvals count:', error);
            return 0;
        }
        
        return count || 0;
    } catch (error) {
        console.error('Error fetching pending approvals count:', error);
        return 0;
    }
}

// Get pending approvals count for a specific user (for standard users)
async function getUserPendingApprovalsCount(userUid) {
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Count pending approvals for this user (especially marketplace purchases)
        const { count, error } = await supabase
            .from('unified_approvals')
            .select('*', { count: 'exact', head: true })
            .eq('user_uid', userUid)
            .eq('status', 'pending');
        
        if (error) {
            console.error('Error fetching user pending approvals count:', error);
            return 0;
        }
        
        return count || 0;
    } catch (error) {
        console.error('Error fetching user pending approvals count:', error);
        return 0;
    }
}

// Make createProfileMenu available globally
window.createProfileMenu = createProfileMenu;

// Initialize profile menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for auth to be ready
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            createProfileMenu();
        }
    }, 100);
    
    setTimeout(() => clearInterval(checkAuth), 5000);
});

