// Unified Approvals page for admins

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
    
    await loadPendingApprovals();
    setupEventListeners();
}

async function loadPendingApprovals() {
    const approvalsList = document.getElementById('approvalsList');
    
    try {
        // Get all pending approvals from unified table
        const { data: approvals, error: approvalsError } = await supabase
            .from('unified_approvals')
            .select('approval_id, approval_type, source_id, user_uid, credits_amount, description, created_at')
            .eq('status', 'pending')
            .order('created_at', { ascending: true });
        
        if (approvalsError) {
            console.error('Error fetching approvals:', approvalsError);
            throw approvalsError;
        }
        
        if (!approvals || approvals.length === 0) {
            approvalsList.innerHTML = '<div class="no-approvals">No pending approvals. Great job!</div>';
            return;
        }
        
        // Get user information
        const userIds = [...new Set(approvals.map(a => a.user_uid))];
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', userIds);
        
        if (usersError) {
            console.error('Error fetching users:', usersError);
            throw usersError;
        }
        
        const userMap = {};
        if (users) {
            users.forEach(user => {
                userMap[user.UID] = user;
            });
        }
        
        approvalsList.innerHTML = '';
        
        approvals.forEach(approval => {
            const user = userMap[approval.user_uid];
            const displayName = (user && user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : (user && user.Username) || 'Unknown';
            
            const approvalDate = new Date(approval.created_at);
            const dateStr = approvalDate.toLocaleDateString() + ' ' + approvalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Determine badge and icon based on type
            let badgeClass = '';
            let badgeText = '';
            let icon = '';
            
            if (approval.approval_type === 'workout') {
                badgeClass = 'badge-workout';
                badgeText = '💪 Workout';
                icon = '💪';
            } else if (approval.approval_type === 'chore') {
                badgeClass = 'badge-chore';
                badgeText = '🏠 Chore';
                icon = '🏠';
            } else if (approval.approval_type === 'memory_verse') {
                badgeClass = 'badge-memory-verse';
                badgeText = '📖 Memory Verse';
                icon = '📖';
            }
            
            const approvalItem = document.createElement('div');
            approvalItem.className = 'approval-item';
            approvalItem.id = `approval_${approval.approval_id}`;
            approvalItem.innerHTML = `
                <div class="approval-info">
                    <div class="approval-user">
                        <span class="approval-type-badge ${badgeClass}">${badgeText}</span>${displayName}
                    </div>
                    <div class="approval-details">${approval.description || 'No description'}</div>
                    <div class="approval-date">${dateStr}</div>
                </div>
                <div class="approval-controls">
                    <label style="font-weight: 600; color: #666;">Credits:</label>
                    <input type="number" 
                           id="credits_${approval.approval_id}" 
                           class="credits-input" 
                           value="${approval.credits_amount || (approval.approval_type === 'memory_verse' ? 50 : 10)}" 
                           min="1" 
                           max="100"
                           onchange="validateCreditsInput(this)">
                    <button class="btn btn-primary" onclick="approveItem(${approval.approval_id}, '${approval.approval_type}', ${approval.source_id})">Approve</button>
                </div>
            `;
            approvalsList.appendChild(approvalItem);
        });
        
    } catch (error) {
        console.error('Error loading approvals:', error);
        const errorMessage = error.message || 'Unknown error occurred';
        approvalsList.innerHTML = `<div class="no-approvals" style="color: #dc3545;">Error loading approvals: ${errorMessage}. Please try again or contact support.</div>`;
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

// Approve a single item
window.approveItem = async function(approvalId, approvalType, sourceId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const creditsInput = document.getElementById(`credits_${approvalId}`);
    const creditsAmount = parseInt(creditsInput.value);
    
    if (isNaN(creditsAmount) || creditsAmount < 1 || creditsAmount > 100) {
        showError('Please enter a valid credit amount (1-100).');
        return;
    }
    
    try {
        // Get approval details
        const { data: approval, error: fetchError } = await supabase
            .from('unified_approvals')
            .select('user_uid, credits_amount')
            .eq('approval_id', approvalId)
            .single();
        
        if (fetchError) throw fetchError;
        
        // Update unified approval status
        const { error: updateError } = await supabase
            .from('unified_approvals')
            .update({
                status: 'approved',
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString(),
                credits_amount: creditsAmount
            })
            .eq('approval_id', approvalId);
        
        if (updateError) throw updateError;
        
        // Update the source table based on type
        if (approvalType === 'workout') {
            const { error: workoutError } = await supabase
                .from('Workouts')
                .update({
                    is_approved: true,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString(),
                    credits_amount: creditsAmount
                })
                .eq('workout_id', sourceId);
            
            if (workoutError) throw workoutError;
        } else if (approvalType === 'chore') {
            const { error: choreError } = await supabase
                .from('Chores')
                .update({
                    is_approved: true,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString(),
                    credits_amount: creditsAmount
                })
                .eq('chore_id', sourceId);
            
            if (choreError) throw choreError;
        } else if (approvalType === 'memory_verse') {
            const { error: verseError } = await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString()
                })
                .eq('id', sourceId);
            
            if (verseError) throw verseError;
        }
        
        // Award credits to user
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', approval.user_uid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            throw creditFetchError;
        }
        
        const newBalance = (existingCredit?.balance || 0) + creditsAmount;
        
        if (existingCredit) {
            const { error: balanceUpdateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (balanceUpdateError) throw balanceUpdateError;
        } else {
            const { error: balanceInsertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: approval.user_uid, balance: creditsAmount });
            
            if (balanceInsertError) throw balanceInsertError;
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: session.uid,
                to_user_uid: approval.user_uid,
                amount: creditsAmount,
                transaction_type: 'credit_added',
                game_type: approvalType,
                description: `Approved ${approvalType}: ${creditsAmount} credits`
            });
        
        if (transError) {
            console.error('Error recording transaction:', transError);
            // Don't fail if transaction recording fails
        }
        
        showSuccess(`${approvalType === 'workout' ? 'Workout' : approvalType === 'chore' ? 'Chore' : 'Memory Verse'} approved! User received ${creditsAmount} credits.`);
        
        // Remove item from list
        const approvalItem = document.getElementById(`approval_${approvalId}`);
        if (approvalItem) {
            approvalItem.remove();
        }
        
        // Reload if no items left
        const remainingItems = document.querySelectorAll('.approval-item').length;
        if (remainingItems === 0) {
            await loadPendingApprovals();
        }
        
        // Update profile menu counter
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
    } catch (error) {
        console.error('Error approving item:', error);
        showError('An error occurred while approving item. Please try again.');
    }
};

// Approve all items
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
        // Get all pending approvals
        const { data: approvals, error: approvalsError } = await supabase
            .from('unified_approvals')
            .select('approval_id, approval_type, source_id, user_uid')
            .eq('status', 'pending');
        
        if (approvalsError) throw approvalsError;
        
        if (!approvals || approvals.length === 0) {
            showError('No items to approve.');
            approveAllBtn.disabled = false;
            approveAllBtn.textContent = 'Approve All';
            return;
        }
        
        // Group by user for efficient credit updates
        const userCredits = {};
        approvals.forEach(approval => {
            if (!userCredits[approval.user_uid]) {
                userCredits[approval.user_uid] = 0;
            }
            userCredits[approval.user_uid] += creditsAmount;
        });
        
        // Update all approvals to approved
        const approvalIds = approvals.map(a => a.approval_id);
        const { error: updateError } = await supabase
            .from('unified_approvals')
            .update({
                status: 'approved',
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString(),
                credits_amount: creditsAmount
            })
            .in('approval_id', approvalIds);
        
        if (updateError) throw updateError;
        
        // Update source tables
        const workouts = approvals.filter(a => a.approval_type === 'workout');
        const chores = approvals.filter(a => a.approval_type === 'chore');
        const memoryVerses = approvals.filter(a => a.approval_type === 'memory_verse');
        
        if (workouts.length > 0) {
            const workoutIds = workouts.map(w => w.source_id);
            const { error: workoutError } = await supabase
                .from('Workouts')
                .update({
                    is_approved: true,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString(),
                    credits_amount: creditsAmount
                })
                .in('workout_id', workoutIds);
            
            if (workoutError) throw workoutError;
        }
        
        if (chores.length > 0) {
            const choreIds = chores.map(c => c.source_id);
            const { error: choreError } = await supabase
                .from('Chores')
                .update({
                    is_approved: true,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString(),
                    credits_amount: creditsAmount
                })
                .in('chore_id', choreIds);
            
            if (choreError) throw choreError;
        }
        
        if (memoryVerses.length > 0) {
            const verseIds = memoryVerses.map(v => v.source_id);
            const { error: verseError } = await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString()
                })
                .in('id', verseIds);
            
            if (verseError) throw verseError;
        }
        
        // Update credits for all users
        for (const [userId, totalCredits] of Object.entries(userCredits)) {
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
            
            // Record transactions for this user's approvals
            const userApprovals = approvals.filter(a => a.user_uid === parseInt(userId));
            for (const approval of userApprovals) {
                const { error: transError } = await supabase
                    .from('Credit_Transactions')
                    .insert({
                        from_user_uid: session.uid,
                        to_user_uid: parseInt(userId),
                        amount: creditsAmount,
                        transaction_type: 'credit_added',
                        game_type: approval.approval_type,
                        description: `Approved ${approval.approval_type}: ${creditsAmount} credits`
                    });
                
                if (transError) {
                    console.error('Error recording transaction:', transError);
                    // Continue even if transaction fails
                }
            }
        }
        
        showSuccess(`Successfully approved ${approvals.length} item(s) with ${creditsAmount} credits each!`);
        
        // Reload approvals list
        await loadPendingApprovals();
        
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
