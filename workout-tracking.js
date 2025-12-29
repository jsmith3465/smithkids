// Workout tracking functionality for index page
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize workout tracking
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            setupWorkoutTracking();
        }
    }, 500);
});

function setupWorkoutTracking() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    // Only show for standard users (admins don't need to record workouts)
    if (session.userType === 'admin') {
        return;
    }
    
    // Show workout section
    const workoutSection = document.getElementById('workoutSection');
    if (workoutSection) {
        workoutSection.classList.remove('hidden');
    }
    
    // Setup event listener
    const recordBtn = document.getElementById('recordWorkoutBtn');
    const workoutTypeInput = document.getElementById('workoutType');
    
    if (recordBtn) {
        recordBtn.addEventListener('click', async () => {
            await recordWorkout();
        });
    }
    
    if (workoutTypeInput) {
        workoutTypeInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                await recordWorkout();
            }
        });
    }
}

async function recordWorkout() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const workoutTypeInput = document.getElementById('workoutType');
    const workoutMessage = document.getElementById('workoutMessage');
    const recordBtn = document.getElementById('recordWorkoutBtn');
    
    const workoutType = workoutTypeInput.value.trim();
    
    if (!workoutType) {
        showMessage('Please enter a workout type.', 'error');
        return;
    }
    
    recordBtn.disabled = true;
    recordBtn.textContent = 'Recording...';
    
    try {
        const { error } = await supabase
            .from('Workouts')
            .insert({
                user_uid: session.uid,
                workout_type: workoutType,
                credits_amount: 5,
                is_approved: false
            });
        
        if (error) throw error;
        
        showMessage('Workout recorded successfully! Waiting for admin approval. You will receive 5 credits once approved.', 'success');
        workoutTypeInput.value = '';
        
    } catch (error) {
        console.error('Error recording workout:', error);
        showMessage('Error recording workout. Please try again.', 'error');
    } finally {
        recordBtn.disabled = false;
        recordBtn.textContent = 'Record Workout';
    }
}

function showMessage(message, type) {
    const workoutMessage = document.getElementById('workoutMessage');
    if (!workoutMessage) return;
    
    workoutMessage.textContent = message;
    workoutMessage.style.display = 'block';
    workoutMessage.style.padding = '12px';
    workoutMessage.style.borderRadius = '8px';
    
    if (type === 'success') {
        workoutMessage.style.background = '#d4edda';
        workoutMessage.style.color = '#155724';
    } else {
        workoutMessage.style.background = '#f8d7da';
        workoutMessage.style.color = '#721c24';
    }
    
    setTimeout(() => {
        workoutMessage.style.display = 'none';
    }, 5000);
}

