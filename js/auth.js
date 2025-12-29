// Authentication check and session management
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Session timeout: 20 minutes in milliseconds
const SESSION_TIMEOUT = 20 * 60 * 1000; // 20 minutes
let sessionTimeoutId = null;

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    // If we're at root (index.html), use pages/ prefix
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    // If we're already in pages/, use relative path
    return pageName;
}

// Check authentication status
async function checkAuthentication() {
    const sessionData = sessionStorage.getItem('userSession');
    
    if (!sessionData) {
        // No session, check if this is a guest access attempt (room code in URL on tic-tac-toe page)
        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('room');
        const isTicTacToePage = window.location.pathname.includes('tic-tac-toe.html');
        
        if (isTicTacToePage && roomCode) {
            // Redirect to guest login instead of regular login
            console.log('No session data found, redirecting to guest login');
            setTimeout(() => {
                window.location.href = `${getPagePath('guest-login.html')}?room=${roomCode}`;
            }, 100);
            return false;
        }
        
        // No session, redirect to login
        console.log('No session data found');
        setTimeout(() => {
            window.location.href = getPagePath('login.html');
        }, 100);
        return false;
    }

    try {
        const session = JSON.parse(sessionData);
        
        // Verify session is valid
        if (!session.uid || !session.username) {
            console.log('Invalid session data - missing uid or username');
            sessionStorage.removeItem('userSession');
            
            // Check if this is a guest access attempt (room code in URL on tic-tac-toe page)
            const urlParams = new URLSearchParams(window.location.search);
            const roomCode = urlParams.get('room');
            const isTicTacToePage = window.location.pathname.includes('tic-tac-toe.html');
            
            if (isTicTacToePage && roomCode) {
                // Redirect to guest login instead of regular login
                setTimeout(() => {
                    window.location.href = `${getPagePath('guest-login.html')}?room=${roomCode}`;
                }, 100);
            } else {
                setTimeout(() => {
                    window.location.href = getPagePath('login.html');
                }, 100);
            }
            return false;
        }
        
        // Check if account is suspended (verify with database)
        try {
            const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
            const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
            const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            
            const { data: userData, error: userError } = await supabase
                .from('Users')
                .select('is_suspended')
                .eq('UID', session.uid)
                .single();
            
            if (!userError && userData && userData.is_suspended) {
                sessionStorage.removeItem('userSession');
                alert('Your account has been suspended. Please speak to your Superior to have access reinstated.');
                setTimeout(() => {
                    window.location.href = getPagePath('login.html');
                }, 100);
                return false;
            }
        } catch (error) {
            console.error('Error checking suspension status:', error);
            // Continue if check fails (don't block user)
        }
        
        // Check if session has expired (20 minutes)
        const now = Date.now();
        let loginTime;
        try {
            if (session.loginTime) {
                loginTime = new Date(session.loginTime).getTime();
                // Check if date is valid
                if (isNaN(loginTime)) {
                    // If loginTime is invalid, use current time (give benefit of doubt)
                    console.warn('Invalid loginTime, using current time');
                    loginTime = now;
                }
            } else {
                // No loginTime, use current time (for backward compatibility)
                console.warn('No loginTime in session, using current time');
                loginTime = now;
            }
        } catch (e) {
            // If parsing fails, use current time (give benefit of doubt)
            console.warn('Error parsing loginTime:', e);
            loginTime = now;
        }
        const elapsed = now - loginTime;
        
        if (elapsed > SESSION_TIMEOUT) {
            // Session expired
            console.log('Session expired');
            sessionStorage.removeItem('userSession');
            alert('Your session has expired. Please log in again.');
            setTimeout(() => {
                window.location.href = getPagePath('login.html');
            }, 100);
            return false;
        }
        
        // Reset session timeout
        resetSessionTimeout();

        // Display user info
        displayUserInfo(session);
        
        // Show main content (if element exists - for pages that use it)
        const authCheck = document.getElementById('authCheck');
        const mainContent = document.getElementById('mainContent');
        if (authCheck) authCheck.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
        
        console.log('Authentication successful');
        return true;
    } catch (error) {
        console.error('Error parsing session:', error);
        sessionStorage.removeItem('userSession');
        setTimeout(() => {
            window.location.href = getPagePath('login.html');
        }, 100);
        return false;
    }
}

// Reset session timeout
function resetSessionTimeout() {
    // Clear existing timeout
    if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
    }
    
    // Set new timeout
    sessionTimeoutId = setTimeout(() => {
        sessionStorage.removeItem('userSession');
        alert('Your session has expired due to inactivity. Please log in again.');
        window.location.href = getPagePath('login.html');
    }, SESSION_TIMEOUT);
    
    // Also reset on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
        document.addEventListener(event, resetSessionTimeout, { once: true });
    });
}

// Display user information
function displayUserInfo(session) {
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        const displayName = session.firstName && session.lastName 
            ? `${session.firstName} ${session.lastName}` 
            : session.username;
        userInfo.textContent = `Welcome, ${displayName}`;
    }
    // Note: userInfo might not exist if profile menu replaces it
}

// Handle logout
function handleLogout() {
    if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
    }
    sessionStorage.removeItem('userSession');
    window.location.href = getPagePath('login.html');
}

// Export handleLogout for use in other scripts
window.handleLogout = handleLogout;

// Initialize authentication check when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Set up logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Check authentication
    const isAuthenticated = await checkAuthentication();
    
    // Export authentication status for use in other scripts
    window.authStatus = {
        isAuthenticated: isAuthenticated,
        getSession: () => {
            const sessionData = sessionStorage.getItem('userSession');
            return sessionData ? JSON.parse(sessionData) : null;
        }
    };
});

