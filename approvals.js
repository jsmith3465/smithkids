// Approvals page for admins (workouts and chores)
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
        window.location.href = 'login.html';
        return;
    }
    
    if (session.userType !== 'admin') {
        document.getElementById('adminCheck').innerHTML = '<p style="color: #dc3545;">Access denied. Admin privileges required.</p>';
        return;
    }
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('adminCheck').classList.add('hidden');
    document.getElementById('adminContent').classList.remove('hidden');
    
    await loadUnapprovedItems();
    setupEventListeners();
}

async function loadUnapprovedItems() {
    const approvalsList = document.getElementById('approvalsList');
    
    try {
        // Get all unapproved workouts
        const { data: workouts, error: workoutsError } = await supabase
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
        
        if (workoutsError) throw workoutsError;
        
        // Get all unapproved chores
        const { data: chores, error: choresError } = await supabase
            .from('Chores')
            .select(`
                chore_id,
                user_uid,
                chore_type,
                credits_amount,
                created_at,
                Users!Chores_user_uid_fkey(UID, First_Name, Last_Name, Username)
            `)
            .eq('is_approved', false)
            .order('created_at', { ascending: true });
        
        if (choresError) throw choresError;
        
        if ((!workouts || workouts.length === 0) && (!chores || chores.length === 0)) {
            approvalsList.innerHTML = '<div class="no-approvals">No pending approvals. Great job!</div>';
            return;
        }
        
        approvalsList.innerHTML = '';
        
        // Add workouts
        if (workouts && workouts.length > 0) {
            workouts.forEach(workout => {
                const user = workout.Users;
                const displayName = (user && user.First_Name && user.Last_Name) 
                    ? `${user.First_Name} ${user.Last_Name}` 
                    : (user && user.Username) || 'Unknown';
                
                const workoutDate = new Date(workout.created_at);
                const dateStr = workoutDate.toLocaleDateString() + ' ' + workoutDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                const approvalItem = document.createElement('div');
                approvalItem.className = 'approval-item';
                approvalItem.id = `workout_${workout.workout_id}`;
                approvalItem.innerHTML = `
                    <div class="approval-info">
                        <div class="approval-user">
                            <span class="approval-type-badge badge-workout">💪 Workout</span>${displayName}
                        </div>
                        <div class="approval-details">${workout.workout_type}</div>
                        <div class="approval-date">${dateStr}</div>
                    </div>
                    <div class="approval-controls">
                        <label style="font-weight: 600; color: #666;">Credits:</label>
                        <input type="number" 
                               id="credits_workout_${workout.workout_id}" 
                               class="credits-input" 
                               value="${workout.credits_amount || 10}" 
                               min="1" 
                               max="100"
                               onchange="validateCreditsInput(this)">
                        <button class="btn btn-primary" onclick="approveWorkout(${workout.workout_id})">Approve</button>
                    </div>
                `;
                approvalsList.appendChild(approvalItem);
            });
        }
        
        // Add chores
        if (chores && chores.length > 0) {
            chores.forEach(chore => {
                const user = chore.Users;
                const displayName = (user && user.First_Name && user.Last_Name) 
                    ? `${user.First_Name} ${user.Last_Name}` 
                    : (user && user.Username) || 'Unknown';
                
                const choreDate = new Date(chore.created_at);
                const dateStr = choreDate.toLocaleDateString() + ' ' + choreDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                const approvalItem = document.createElement('div');
                approvalItem.className = 'approval-item';
                approvalItem.id = `chore_${chore.chore_id}`;
                approvalItem.innerHTML = `
                    <div class="approval-info">
                        <div class="approval-user">
                            <span class="approval-type-badge badge-chore">🏠 Chore</span>${displayName}
                        </div>
                        <div class="approval-details">${chore.chore_type}</div>
                        <div class="approval-date">${dateStr}</div>
                    </div>
                    <div class="approval-controls">
                        <label style="font-weight: 600; color: #666;">Credits:</label>
                        <input type="number" 
                               id="credits_chore_${chore.chore_id}" 
                               class="credits-input" 
                               value="${chore.credits_amount || 10}" 
                               min="1" 
                               max="100"
                               onchange="validateCreditsInput(this)">
                        <button class="btn btn-primary" onclick="approveChore(${chore.chore_id})">Approve</button>
                    </div>
                `;
                approvalsList.appendChild(approvalItem);
            });
        }
        
    } catch (error) {
        console.error('Error loading approvals:', error);
        approvalsList.innerHTML = '<div class="no-approvals">Error loading approvals. Please try again.</div>';
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
    
    const creditsInput = document.getElementById(`credits_workout_${workoutId}`);
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
        
        // Reload if no items left
        const remainingItems = document.querySelectorAll('.approval-item').length;
        if (remainingItems === 0) {
            await loadUnapprovedItems();
        }
        
        // Update profile menu counter
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
    } catch (error) {
        console.error('Error approving workout:', error);
        showError('An error occurred while approving workout. Please try again.');
    }
};

// Approve single chore
window.approveChore = async function(choreId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const creditsInput = document.getElementById(`credits_chore_${choreId}`);
    const creditsAmount = parseInt(creditsInput.value);
    
    if (isNaN(creditsAmount) || creditsAmount < 1 || creditsAmount > 100) {
        showError('Please enter a valid credit amount (1-100).');
        return;
    }
    
    try {
        // Get chore details
        const { data: chore, error: fetchError } = await supabase
            .from('Chores')
            .select('user_uid, chore_type')
            .eq('chore_id', choreId)
            .single();
        
        if (fetchError) throw fetchError;
        
        // Update chore to approved
        const { error: updateError } = await supabase
            .from('Chores')
            .update({
                is_approved: true,
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString(),
                credits_amount: creditsAmount
            })
            .eq('chore_id', choreId);
        
        if (updateError) throw updateError;
        
        // Get or create credit record for user
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', chore.user_uid)
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
                .insert({ user_uid: chore.user_uid, balance: creditsAmount });
            
            if (balanceInsertError) throw balanceInsertError;
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: session.uid,
                to_user_uid: chore.user_uid,
                amount: creditsAmount,
                transaction_type: 'credit_added',
                description: `Chore approved: ${chore.chore_type}`
            });
        
        if (transError) throw transError;
        
        showSuccess(`Chore approved! User received ${creditsAmount} credits.`);
        
        // Remove chore from list
        const choreItem = document.getElementById(`chore_${choreId}`);
        if (choreItem) {
            choreItem.remove();
        }
        
        // Reload if no items left
        const remainingItems = document.querySelectorAll('.approval-item').length;
        if (remainingItems === 0) {
            await loadUnapprovedItems();
        }
        
        // Update profile menu counter
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
    } catch (error) {
        console.error('Error approving chore:', error);
        showError('An error occurred while approving chore. Please try again.');
    }
};

// Approve all items (workouts and chores)
async function approveAllItems() {
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
        const { data: workouts, error: workoutsError } = await supabase
            .from('Workouts')
            .select('workout_id, user_uid, workout_type')
            .eq('is_approved', false);
        
        if (workoutsError) throw workoutsError;
        
        // Get all unapproved chores
        const { data: chores, error: choresError } = await supabase
            .from('Chores')
            .select('chore_id, user_uid, chore_type')
            .eq('is_approved', false);
        
        if (choresError) throw choresError;
        
        const allItems = [];
        if (workouts) allItems.push(...workouts.map(w => ({ ...w, type: 'workout' })));
        if (chores) allItems.push(...chores.map(c => ({ ...c, type: 'chore' })));
        
        if (allItems.length === 0) {
            showError('No items to approve.');
            return;
        }
        
        // Group by user for efficient credit updates
        const userCredits = {};
        allItems.forEach(item => {
            if (!userCredits[item.user_uid]) {
                userCredits[item.user_uid] = 0;
            }
            userCredits[item.user_uid] += creditsAmount;
        });
        
        // Update all workouts to approved
        if (workouts && workouts.length > 0) {
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
        }
        
        // Update all chores to approved
        if (chores && chores.length > 0) {
            const choreIds = chores.map(c => c.chore_id);
            const { error: updateError } = await supabase
                .from('Chores')
                .update({
                    is_approved: true,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString(),
                    credits_amount: creditsAmount
                })
                .in('chore_id', choreIds);
            
            if (updateError) throw updateError;
        }
        
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
            const userWorkouts = workouts ? workouts.filter(w => w.user_uid === parseInt(userId)) : [];
            const userChores = chores ? chores.filter(c => c.user_uid === parseInt(userId)) : [];
            
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
            
            for (const chore of userChores) {
                const { error: transError } = await supabase
                    .from('Credit_Transactions')
                    .insert({
                        from_user_uid: session.uid,
                        to_user_uid: parseInt(userId),
                        amount: creditsAmount,
                        transaction_type: 'credit_added',
                        description: `Chore approved: ${chore.chore_type}`
                    });
                
                if (transError) throw transError;
            }
        }
        
        showSuccess(`Successfully approved ${allItems.length} item(s) with ${creditsAmount} credits each!`);
        
        // Reload approvals list
        await loadUnapprovedItems();
        
        // Update profile menu counter
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
    } catch (error) {
        console.error('Error approving all items:', error);
        showError('An error occurred while approving items. Please try again.');
    } finally {
        approveAllBtn.disabled = false;
        approveAllBtn.textContent = 'Approve All';
    }
}

function setupEventListeners() {
    const approveAllBtn = document.getElementById('approveAllBtn');
    if (approveAllBtn) {
        approveAllBtn.addEventListener('click', approveAllItems);
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

