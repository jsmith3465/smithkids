// Add Workout page for standard users
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
        window.location.href = 'login.html';
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
        
        const { error } = await supabase
            .from('Workouts')
            .insert({
                user_uid: session.uid,
                workout_type: fullWorkoutInfo,
                credits_amount: 5,
                is_approved: false
            });
        
        if (error) throw error;
        
        showSuccess('Workout submitted successfully! Waiting for admin approval. You will receive 5 credits once approved.');
        
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

