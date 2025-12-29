// Approve Workouts page for admins

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
                    checkAdminAccess();
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

async function checkAdminAccess() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    if (session.userType !== 'admin') {
        document.getElementById('adminCheck').innerHTML = '<p style="color: #dc3545;">Access denied. Admin privileges required.</p>';
        return;
    }
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('adminCheck').classList.add('hidden');
    document.getElementById('adminContent').classList.remove('hidden');
    
    await loadUnapprovedWorkouts();
    setupEventListeners();
}

async function loadUnapprovedWorkouts() {
    const workoutsList = document.getElementById('workoutsList');
    
    try {
        // Get all unapproved workouts
        const { data: workouts, error } = await supabase
            .from('Workouts')
            .select(`
                workout_id,
                user_uid,
                workout_type,
                credits_amount,
                created_at,
                Users!Workouts_user_uid_fkey(UID, First_Name, Last_Name, Username)
            `)
            .eq('is_approved', false)
            .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        if (!workouts || workouts.length === 0) {
            workoutsList.innerHTML = '<div class="no-workouts">No pending workouts to approve. Great job!</div>';
            return;
        }
        
        workoutsList.innerHTML = '';
        
        workouts.forEach(workout => {
            const user = workout.Users;
            const displayName = (user && user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : (user && user.Username) || 'Unknown';
            
            const workoutDate = new Date(workout.created_at);
            const dateStr = workoutDate.toLocaleDateString() + ' ' + workoutDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const workoutItem = document.createElement('div');
            workoutItem.className = 'workout-item';
            workoutItem.id = `workout_${workout.workout_id}`;
            workoutItem.innerHTML = `
                <div class="workout-info">
                    <div class="workout-user">${displayName}</div>
                    <div class="workout-type">💪 ${workout.workout_type}</div>
                    <div class="workout-date">${dateStr}</div>
                </div>
                <div class="workout-controls">
                    <label style="font-weight: 600; color: #666;">Credits:</label>
                    <input type="number" 
                           id="credits_${workout.workout_id}" 
                           class="credits-input" 
                           value="${workout.credits_amount}" 
                           min="1" 
                           max="100"
                           onchange="validateCreditsInput(this)">
                    <button class="btn btn-primary" onclick="approveWorkout(${workout.workout_id})">Approve</button>
                </div>
            `;
            workoutsList.appendChild(workoutItem);
        });
        
    } catch (error) {
        console.error('Error loading workouts:', error);
        workoutsList.innerHTML = '<div class="no-workouts">Error loading workouts. Please try again.</div>';
    }
}

// Validate credits input
window.validateCreditsInput = function(input) {
    let value = parseInt(input.value);
    if (isNaN(value) || value < 1) {
        input.value = 1;
    } else if (value > 100) {
        input.value = 100;
    }
};

// Approve single workout
window.approveWorkout = async function(workoutId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const creditsInput = document.getElementById(`credits_${workoutId}`);
    const creditsAmount = parseInt(creditsInput.value);
    
    if (isNaN(creditsAmount) || creditsAmount < 1 || creditsAmount > 100) {
        showError('Please enter a valid credit amount (1-100).');
        return;
    }
    
    try {
        // Get workout details
        const { data: workout, error: fetchError } = await supabase
            .from('Workouts')
            .select('user_uid, workout_type')
            .eq('workout_id', workoutId)
            .single();
        
        if (fetchError) throw fetchError;
        
        // Update workout to approved
        const { error: updateError } = await supabase
            .from('Workouts')
            .update({
                is_approved: true,
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString(),
                credits_amount: creditsAmount
            })
            .eq('workout_id', workoutId);
        
        if (updateError) throw updateError;
        
        // Get or create credit record for user
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', workout.user_uid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            throw creditFetchError;
        }
        
        const newBalance = (existingCredit?.balance || 0) + creditsAmount;
        
        if (existingCredit) {
            // Update existing balance
            const { error: balanceUpdateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (balanceUpdateError) throw balanceUpdateError;
        } else {
            // Create new credit record
            const { error: balanceInsertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: workout.user_uid, balance: creditsAmount });
            
            if (balanceInsertError) throw balanceInsertError;
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: session.uid,
                to_user_uid: workout.user_uid,
                amount: creditsAmount,
                transaction_type: 'credit_added',
                description: `Workout approved: ${workout.workout_type}`
            });
        
        if (transError) throw transError;
        
        showSuccess(`Workout approved! User received ${creditsAmount} credits.`);
        
        // Remove workout from list
        const workoutItem = document.getElementById(`workout_${workoutId}`);
        if (workoutItem) {
            workoutItem.remove();
        }
        
        // Reload if no workouts left
        const remainingWorkouts = document.querySelectorAll('.workout-item').length;
        if (remainingWorkouts === 0) {
            await loadUnapprovedWorkouts();
        }
        
    } catch (error) {
        console.error('Error approving workout:', error);
        showError('An error occurred while approving workout. Please try again.');
    }
};

// Approve all workouts
async function approveAllWorkouts() {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const creditsAmount = parseInt(document.getElementById('approveAllCredits').value);
    
    if (isNaN(creditsAmount) || creditsAmount < 1 || creditsAmount > 100) {
        showError('Please enter a valid credit amount (1-100).');
        return;
    }
    
    const approveAllBtn = document.getElementById('approveAllBtn');
    approveAllBtn.disabled = true;
    approveAllBtn.textContent = 'Approving...';
    
    try {
        // Get all unapproved workouts
        const { data: workouts, error: fetchError } = await supabase
            .from('Workouts')
            .select('workout_id, user_uid, workout_type')
            .eq('is_approved', false);
        
        if (fetchError) throw fetchError;
        
        if (!workouts || workouts.length === 0) {
            showError('No workouts to approve.');
            return;
        }
        
        // Group by user for efficient credit updates
        const userCredits = {};
        workouts.forEach(workout => {
            if (!userCredits[workout.user_uid]) {
                userCredits[workout.user_uid] = 0;
            }
            userCredits[workout.user_uid] += creditsAmount;
        });
        
        // Update all workouts to approved
        const workoutIds = workouts.map(w => w.workout_id);
        const { error: updateError } = await supabase
            .from('Workouts')
            .update({
                is_approved: true,
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString(),
                credits_amount: creditsAmount
            })
            .in('workout_id', workoutIds);
        
        if (updateError) throw updateError;
        
        // Update credits for all users
        for (const [userId, totalCredits] of Object.entries(userCredits)) {
            // Get or create credit record
            const { data: existingCredit, error: creditFetchError } = await supabase
                .from('User_Credits')
                .select('credit_id, balance')
                .eq('user_uid', parseInt(userId))
                .single();
            
            if (creditFetchError && creditFetchError.code !== 'PGRST116') {
                throw creditFetchError;
            }
            
            const newBalance = (existingCredit?.balance || 0) + totalCredits;
            
            if (existingCredit) {
                const { error: balanceUpdateError } = await supabase
                    .from('User_Credits')
                    .update({ balance: newBalance, updated_at: new Date().toISOString() })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (balanceUpdateError) throw balanceUpdateError;
            } else {
                const { error: balanceInsertError } = await supabase
                    .from('User_Credits')
                    .insert({ user_uid: parseInt(userId), balance: totalCredits });
                
                if (balanceInsertError) throw balanceInsertError;
            }
            
            // Record transactions
            const userWorkouts = workouts.filter(w => w.user_uid === parseInt(userId));
            for (const workout of userWorkouts) {
                const { error: transError } = await supabase
                    .from('Credit_Transactions')
                    .insert({
                        from_user_uid: session.uid,
                        to_user_uid: parseInt(userId),
                        amount: creditsAmount,
                        transaction_type: 'credit_added',
                        description: `Workout approved: ${workout.workout_type}`
                    });
                
                if (transError) throw transError;
            }
        }
        
        showSuccess(`Successfully approved ${workouts.length} workout(s) with ${creditsAmount} credits each!`);
        
        // Reload workouts list
        await loadUnapprovedWorkouts();
        
    } catch (error) {
        console.error('Error approving all workouts:', error);
        showError('An error occurred while approving workouts. Please try again.');
    } finally {
        approveAllBtn.disabled = false;
        approveAllBtn.textContent = 'Approve All';
    }
}

function setupEventListeners() {
    const approveAllBtn = document.getElementById('approveAllBtn');
    if (approveAllBtn) {
        approveAllBtn.addEventListener('click', approveAllWorkouts);
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

