// Login functionality with Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get client IP address (using a free service)
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'unknown';
    }
}

// Get user agent
function getUserAgent() {
    return navigator.userAgent || 'unknown';
}

// Generate a session ID
function generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Track login in database
async function trackLogin(userUid, ipAddress, userAgent, sessionId) {
    try {
        const { error } = await supabase
            .from('User_Login_Log')
            .insert({
                user_uid: userUid,
                ip_address: ipAddress,
                user_agent: userAgent,
                session_id: sessionId,
                login_date_time: new Date().toISOString()
            });

        if (error) {
            console.error('Error tracking login:', error);
            // Don't fail login if tracking fails
        }
    } catch (error) {
        console.error('Error tracking login:', error);
    }
}

    // Authenticate user
async function authenticateUser(username, password) {
    try {
        // Query the Users table to find the user
        const { data, error } = await supabase
            .from('Users')
            .select('UID, Username, Password, First_Name, Last_Name, user_type, is_suspended')
            .eq('Username', username)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No user found
                return { success: false, message: 'Invalid username or password' };
            }
            throw error;
        }

        if (!data) {
            return { success: false, message: 'Invalid username or password' };
        }

        // Note: In production, passwords should be hashed. For now, we'll do a simple comparison
        // TODO: Implement proper password hashing (bcrypt, etc.)
        // For now, assuming passwords are stored as plaintext (NOT RECOMMENDED FOR PRODUCTION)
        if (data.Password !== password) {
            return { success: false, message: 'Invalid username or password' };
        }
        
        // Check if account is suspended
        if (data.is_suspended) {
            return { 
                success: false, 
                message: 'Your account has been suspended. Please speak to your Superior to have access reinstated.',
                isSuspended: true
            };
        }

        return {
            success: true,
            user: {
                uid: data.UID,
                username: data.Username,
                firstName: data.First_Name,
                lastName: data.Last_Name,
                userType: data.user_type || 'standard',
                isSuspended: false
            }
        };
    } catch (error) {
        console.error('Authentication error:', error);
        return { success: false, message: 'An error occurred during authentication' };
    }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const loginLoading = document.getElementById('loginLoading');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Check if user is already logged in
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
        // User is already logged in, redirect to main page
        window.location.href = '../index.html';
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }

        // Show loading state
        loginError.classList.remove('show');
        loginLoading.classList.add('show');
        loginForm.style.opacity = '0.5';
        loginForm.style.pointerEvents = 'none';

        try {
            // Authenticate user
            const authResult = await authenticateUser(username, password);

            if (!authResult.success) {
                showError(authResult.message);
                loginLoading.classList.remove('show');
                loginForm.style.opacity = '1';
                loginForm.style.pointerEvents = 'auto';
                passwordInput.value = '';
                passwordInput.focus();
                return;
            }
            
            // Check if account is suspended
            if (authResult.user.isSuspended) {
                showError('Your account has been suspended. Please speak to your Superior to have access reinstated.');
                loginLoading.classList.remove('show');
                loginForm.style.opacity = '1';
                loginForm.style.pointerEvents = 'auto';
                passwordInput.value = '';
                passwordInput.focus();
                return;
            }

            // Get client information
            const ipAddress = await getClientIP();
            const userAgent = getUserAgent();
            const sessionId = generateSessionId();

            // Track login
            await trackLogin(authResult.user.uid, ipAddress, userAgent, sessionId);

            // Store session data with current timestamp
            const sessionData = {
                uid: authResult.user.uid,
                username: authResult.user.username,
                firstName: authResult.user.firstName,
                lastName: authResult.user.lastName,
                userType: authResult.user.userType || 'standard',
                sessionId: sessionId,
                loginTime: new Date().toISOString()
            };
            sessionStorage.setItem('userSession', JSON.stringify(sessionData));

            // Redirect to main page
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Login error:', error);
            showError('An unexpected error occurred. Please try again.');
            loginLoading.classList.remove('show');
            loginForm.style.opacity = '1';
            loginForm.style.pointerEvents = 'auto';
        }
    });

    function showError(message) {
        loginError.textContent = message;
        loginError.classList.add('show');
    }

    // Focus on username input on load
    usernameInput.focus();
});

