// Add Workout page for standard users

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
    
    // All users (admin and standard) can submit workouts
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('standardUserCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('standardUserContent').classList.remove('hidden');
    
    setupEventListeners();
}

function setupEventListeners() {
    const submitBtn = document.getElementById('submitWorkoutBtn');
    const workoutTypeInput = document.getElementById('workoutType');
    const workoutDescriptionInput = document.getElementById('workoutDescription');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            await submitWorkout();
        });
    }
    
    // Allow Enter key to submit (but not in textarea)
    if (workoutTypeInput) {
        workoutTypeInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                await submitWorkout();
            }
        });
    }
}

async function submitWorkout() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const workoutType = document.getElementById('workoutType').value.trim();
    const workoutDescription = document.getElementById('workoutDescription').value.trim();
    const submitBtn = document.getElementById('submitWorkoutBtn');
    
    if (!workoutType) {
        showError('Please enter a workout type.');
        return;
    }
    
    if (!workoutDescription) {
        showError('Please describe what you did during your workout.');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        // Combine workout type and description for the workout_type field
        const fullWorkoutInfo = `${workoutType} - ${workoutDescription}`;
        
        const { data: workoutData, error } = await supabase
            .from('Workouts')
            .insert({
                user_uid: session.uid,
                workout_type: fullWorkoutInfo,
                credits_amount: 10,
                is_approved: false
            })
            .select('workout_id')
            .single();
        
        if (error) throw error;
        
        // Create unified approval entry
        const { data: approvalData, error: approvalError } = await supabase
            .from('unified_approvals')
            .insert({
                approval_type: 'workout',
                source_id: workoutData.workout_id,
                user_uid: session.uid,
                credits_amount: 10,
                status: 'pending',
                description: fullWorkoutInfo
            })
            .select('approval_id')
            .single();
        
        if (approvalError) {
            console.error('Error creating unified approval:', approvalError);
            // Don't fail the workout submission if approval creation fails
        } else if (approvalData) {
            // Send email notification to admins
            await sendApprovalNotification(approvalData.approval_id, 'workout', fullWorkoutInfo, 10, session.uid);
        }
        
        showSuccess('Workout submitted successfully! Waiting for admin approval. You will receive 10 credits once approved.');
        
        // Update profile menu counter if admin
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
        // Clear form
        document.getElementById('workoutType').value = '';
        document.getElementById('workoutDescription').value = '';
        
    } catch (error) {
        console.error('Error submitting workout:', error);
        showError('Error submitting workout. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Workout';
    }
}

// Function to send approval notification email
async function sendApprovalNotification(approvalId, approvalType, description, creditsAmount, userUid) {
    try {
        // Get user information for the notification
        const { data: userData, error: userError } = await supabase
            .from('Users')
            .select('First_Name, Last_Name, Username')
            .eq('UID', userUid)
            .single();
        
        if (userError) {
            console.error('Error fetching user data for notification:', userError);
            return;
        }
        
        const userName = userData.First_Name && userData.Last_Name
            ? `${userData.First_Name} ${userData.Last_Name}`
            : userData.Username || 'Unknown User';
        
        // Call the Edge Function to send notification
        const response = await fetch(`${SUPABASE_URL}/functions/v1/send-approval-notification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                approval_id: approvalId,
                approval_type: approvalType,
                user_name: userName,
                description: description,
                credits_amount: creditsAmount,
            }),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error sending approval notification:', errorText);
        } else {
            console.log('Approval notification sent successfully');
        }
    } catch (error) {
        console.error('Error in sendApprovalNotification:', error);
        // Don't fail the submission if notification fails
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

