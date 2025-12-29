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
    
    // Get credit balance for standard users
    let creditBalance = null;
    if (!isAdmin) {
        creditBalance = await getCreditBalance(session.uid);
    }
    
    // Get pending approvals count for admins
    let pendingApprovalsCount = 0;
    if (isAdmin) {
        pendingApprovalsCount = await getPendingApprovalsCount();
    }
    
    // Find the header area where we'll add the profile menu
    const headerRight = document.querySelector('header > div > div:last-child');
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
        `;
    } else {
        menuItems = `
            <div style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0; background: #fff3cd; text-align: center;">
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 5px;">Credit Balance</div>
                <div style="font-size: 1.2rem; font-weight: 700; color: #CC5500;">${creditBalance !== null ? creditBalance : 0}</div>
            </div>
            <a href="${getPagePath('credit-balance.html')}" style="
                display: block;
                padding: 12px 15px;
                color: #333;
                text-decoration: none;
                transition: background 0.2s ease;
                text-align: left;
                white-space: nowrap;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                💳 View Credit Balance
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
                    📊 View Statistics
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
    
    // Toggle dropdown
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = profileDropdown.style.display === 'block';
        profileDropdown.style.display = isVisible ? 'none' : 'block';
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

// Get credit balance for a user
async function getCreditBalance(userUid) {
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        const { data, error } = await supabase
            .from('User_Credits')
            .select('balance')
            .eq('user_uid', userUid)
            .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error fetching credit balance:', error);
            return 0;
        }
        
        return data ? data.balance : 0;
    } catch (error) {
        console.error('Error fetching credit balance:', error);
        return 0;
    }
}

// Get pending approvals count (workouts + chores)
async function getPendingApprovalsCount() {
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Count unapproved workouts
        const { count: workoutsCount, error: workoutsError } = await supabase
            .from('Workouts')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', false);
        
        if (workoutsError) {
            console.error('Error fetching workouts count:', workoutsError);
        }
        
        // Count unapproved chores
        const { count: choresCount, error: choresError } = await supabase
            .from('Chores')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', false);
        
        if (choresError) {
            console.error('Error fetching chores count:', choresError);
        }
        
        return (workoutsCount || 0) + (choresCount || 0);
    } catch (error) {
        console.error('Error fetching pending approvals count:', error);
        return 0;
    }
}

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

