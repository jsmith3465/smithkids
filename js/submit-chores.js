// Submit Chores page for all users

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    checkUserAccess();
                } else {
                    const authCheck = document.getElementById('authCheck');
                    if (authCheck) {
                        authCheck.innerHTML = '<p>Authentication failed. Redirecting to login...</p>';
                    }
                }
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkAuth);
            if (!window.authStatus) {
                const authCheck = document.getElementById('authCheck');
                if (authCheck) {
                    authCheck.innerHTML = '<p style="color: #dc3545;">Authentication check timed out. Please refresh the page.</p>';
                }
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
    
    // All users (admin and standard) can submit chores
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('standardUserCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('standardUserContent').classList.remove('hidden');
    
    setupEventListeners();
}

function setupEventListeners() {
    const submitBtn = document.getElementById('submitChoreBtn');
    const choreTypeSelect = document.getElementById('choreType');
    const customChoreInput = document.getElementById('customChoreInput');
    const customChoreText = document.getElementById('customChoreText');
    
    // Show/hide custom input based on selection
    choreTypeSelect.addEventListener('change', () => {
        if (choreTypeSelect.value === 'Custom') {
            customChoreInput.style.display = 'block';
            customChoreText.required = true;
        } else {
            customChoreInput.style.display = 'none';
            customChoreText.required = false;
            customChoreText.value = '';
        }
    });
    
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            await submitChore();
        });
    }
}

async function submitChore() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const choreTypeSelect = document.getElementById('choreType');
    const customChoreText = document.getElementById('customChoreText');
    const submitBtn = document.getElementById('submitChoreBtn');
    
    const selectedType = choreTypeSelect.value;
    
    if (!selectedType) {
        showError('Please select a chore type.');
        return;
    }
    
    let choreType = selectedType;
    if (selectedType === 'Custom') {
        const customText = customChoreText.value.trim();
        if (!customText) {
            showError('Please enter a custom chore name.');
            return;
        }
        choreType = customText;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        const { data: choreData, error } = await supabase
            .from('Chores')
            .insert({
                user_uid: session.uid,
                chore_type: choreType,
                credits_amount: 10,
                is_approved: false
            })
            .select('chore_id')
            .single();
        
        if (error) throw error;
        
        // Create unified approval entry
        const { error: approvalError } = await supabase
            .from('unified_approvals')
            .insert({
                approval_type: 'chore',
                source_id: choreData.chore_id,
                user_uid: session.uid,
                credits_amount: 10,
                status: 'pending',
                description: choreType
            });
        
        if (approvalError) {
            console.error('Error creating unified approval:', approvalError);
            // Don't fail the chore submission if approval creation fails
        }
        
        showSuccess('Chore submitted successfully! Waiting for admin approval. You will receive 10 credits once approved.');
        
        // Clear form
        choreTypeSelect.value = '';
        customChoreText.value = '';
        customChoreInput.style.display = 'none';
        customChoreText.required = false;
        
        // Update profile menu counter if admin
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
    } catch (error) {
        console.error('Error submitting chore:', error);
        showError('Error submitting chore. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Chore';
    }
}

function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
}

function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
}

