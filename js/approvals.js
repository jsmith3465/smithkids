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
                    <button class="btn btn-secondary" style="background: #dc3545;" onclick="denyItem(${approval.approval_id}, '${approval.approval_type}', ${approval.source_id})">Deny</button>
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
            
            // Check for 3 consecutive months bonus
            await checkAndAwardConsecutiveMonthsBonus(approval.user_uid, sourceId);
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
        
        // Check for badge eligibility
        try {
            const { checkAllBadges } = await import('./badge-checker.js');
            let badgeContext = 'general';
            if (approvalType === 'workout') {
                badgeContext = 'workout_approved';
            } else if (approvalType === 'chore') {
                badgeContext = 'chore_approved';
            } else if (approvalType === 'memory_verse') {
                badgeContext = 'memory_verse_approved';
            }
            await checkAllBadges(approval.user_uid, badgeContext);
        } catch (error) {
            console.error('Error checking badges:', error);
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
            
            // Check for 3 consecutive months bonus for each user who had memory verses approved
            const uniqueUserIds = [...new Set(memoryVerses.map(v => v.user_uid))];
            for (const userId of uniqueUserIds) {
                const userVerses = memoryVerses.filter(v => v.user_uid === userId);
                // Check bonus for each verse submission (in case multiple were approved)
                for (const verse of userVerses) {
                    await checkAndAwardConsecutiveMonthsBonus(userId, verse.source_id);
                }
            }
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

// Deny a single item
window.denyItem = async function(approvalId, approvalType, sourceId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    if (!confirm('Are you sure you want to deny this request? This action cannot be undone.')) {
        return;
    }
    
    try {
        // Update unified approval status to rejected
        const { error: updateError } = await supabase
            .from('unified_approvals')
            .update({
                status: 'rejected',
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString()
            })
            .eq('approval_id', approvalId);
        
        if (updateError) throw updateError;
        
        // Update the source table based on type
        if (approvalType === 'workout') {
            const { error: workoutError } = await supabase
                .from('Workouts')
                .update({
                    is_approved: false,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString()
                })
                .eq('workout_id', sourceId);
            
            if (workoutError) throw workoutError;
        } else if (approvalType === 'chore') {
            const { error: choreError } = await supabase
                .from('Chores')
                .update({
                    is_approved: false,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString()
                })
                .eq('chore_id', sourceId);
            
            if (choreError) throw choreError;
        } else if (approvalType === 'memory_verse') {
            const { error: verseError } = await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'rejected',
                    approved_at: new Date().toISOString()
                })
                .eq('id', sourceId);
            
            if (verseError) throw verseError;
        }
        
        showSuccess(`${approvalType === 'workout' ? 'Workout' : approvalType === 'chore' ? 'Chore' : 'Memory Verse'} denied.`);
        
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
        console.error('Error denying item:', error);
        showError('An error occurred while denying item. Please try again.');
    }
};

// Deny all items
async function denyAllItems() {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    if (!confirm('Are you sure you want to deny ALL pending requests? This action cannot be undone.')) {
        return;
    }
    
    const denyAllBtn = document.getElementById('denyAllBtn');
    denyAllBtn.disabled = true;
    denyAllBtn.textContent = 'Denying...';
    
    try {
        // Get all pending approvals
        const { data: approvals, error: approvalsError } = await supabase
            .from('unified_approvals')
            .select('approval_id, approval_type, source_id')
            .eq('status', 'pending');
        
        if (approvalsError) throw approvalsError;
        
        if (!approvals || approvals.length === 0) {
            showError('No items to deny.');
            denyAllBtn.disabled = false;
            denyAllBtn.textContent = 'Deny All';
            return;
        }
        
        // Update all approvals to rejected
        const approvalIds = approvals.map(a => a.approval_id);
        const { error: updateError } = await supabase
            .from('unified_approvals')
            .update({
                status: 'rejected',
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString()
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
                    is_approved: false,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString()
                })
                .in('workout_id', workoutIds);
            
            if (workoutError) throw workoutError;
        }
        
        if (chores.length > 0) {
            const choreIds = chores.map(c => c.source_id);
            const { error: choreError } = await supabase
                .from('Chores')
                .update({
                    is_approved: false,
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString()
                })
                .in('chore_id', choreIds);
            
            if (choreError) throw choreError;
        }
        
        if (memoryVerses.length > 0) {
            const verseIds = memoryVerses.map(v => v.source_id);
            const { error: verseError } = await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'rejected',
                    approved_at: new Date().toISOString()
                })
                .in('id', verseIds);
            
            if (verseError) throw verseError;
        }
        
        showSuccess(`Successfully denied ${approvals.length} item(s).`);
        
        // Reload approvals list
        await loadPendingApprovals();
        
        // Update profile menu counter
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
    } catch (error) {
        console.error('Error denying all items:', error);
        showError('An error occurred while denying items. Please try again.');
    } finally {
        denyAllBtn.disabled = false;
        denyAllBtn.textContent = 'Deny All';
    }
}

function setupEventListeners() {
    const approveAllBtn = document.getElementById('approveAllBtn');
    if (approveAllBtn) {
        approveAllBtn.addEventListener('click', approveAllItems);
    }
    
    const denyAllBtn = document.getElementById('denyAllBtn');
    if (denyAllBtn) {
        denyAllBtn.addEventListener('click', denyAllItems);
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

// Check if user has 3 consecutive months of approved memory verses and award bonus
async function checkAndAwardConsecutiveMonthsBonus(userUid, currentSubmissionId) {
    try {
        // Get the current submission's month_year
        const { data: currentSubmission, error: currentError } = await supabase
            .from('Memory_Verse_Submissions')
            .select('month_year')
            .eq('id', currentSubmissionId)
            .single();
        
        if (currentError || !currentSubmission) {
            console.error('Error fetching current submission:', currentError);
            return;
        }
        
        // Get all approved memory verse submissions for this user, ordered by month_year descending
        const { data: approvedSubmissions, error: submissionsError } = await supabase
            .from('Memory_Verse_Submissions')
            .select('month_year, approved_at')
            .eq('user_uid', userUid)
            .eq('status', 'approved')
            .order('month_year', { ascending: false })
            .limit(3);
        
        if (submissionsError) {
            console.error('Error fetching approved submissions:', submissionsError);
            return;
        }
        
        // Need at least 3 approved submissions
        if (!approvedSubmissions || approvedSubmissions.length < 3) {
            return;
        }
        
        // Check if the last 3 submissions are consecutive months
        const months = approvedSubmissions.map(s => s.month_year).sort(); // Sort ascending for easier checking
        
        // Parse dates and check if they're consecutive
        const monthDates = months.map(monthYear => {
            const [year, month] = monthYear.split('-').map(Number);
            return new Date(year, month - 1, 1); // Create date for first day of month
        });
        
        // Check if dates are consecutive (each month is exactly 1 month after the previous)
        let isConsecutive = true;
        for (let i = 1; i < monthDates.length; i++) {
            const prevMonth = monthDates[i - 1];
            const currentMonth = monthDates[i];
            
            // Calculate expected next month
            const expectedNextMonth = new Date(prevMonth);
            expectedNextMonth.setMonth(expectedNextMonth.getMonth() + 1);
            
            // Check if current month matches expected next month
            if (currentMonth.getTime() !== expectedNextMonth.getTime()) {
                isConsecutive = false;
                break;
            }
        }
        
        if (!isConsecutive) {
            return; // Not consecutive, no bonus
        }
        
        // Check if we've already awarded this bonus for this 3-month streak
        // We'll check if there's already a transaction for "3 consecutive months bonus" 
        // for this user with a recent date (within last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { data: existingBonus, error: bonusCheckError } = await supabase
            .from('Credit_Transactions')
            .select('transaction_id')
            .eq('to_user_uid', userUid)
            .eq('game_type', 'memory_verse_consecutive_bonus')
            .gte('created_at', thirtyDaysAgo.toISOString())
            .maybeSingle();
        
        if (bonusCheckError && bonusCheckError.code !== 'PGRST116') {
            console.error('Error checking existing bonus:', bonusCheckError);
            return;
        }
        
        // If bonus already awarded recently, don't award again
        if (existingBonus) {
            return;
        }
        
        // Award 50 credit bonus
        const BONUS_AMOUNT = 50;
        
        // Get current balance
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userUid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            console.error('Error fetching credit balance:', creditFetchError);
            return;
        }
        
        const oldBalance = existingCredit?.balance || 0;
        const newBalance = oldBalance + BONUS_AMOUNT;
        
        // Update balance
        if (existingCredit) {
            const { error: balanceUpdateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (balanceUpdateError) {
                console.error('Error updating balance for bonus:', balanceUpdateError);
                return;
            }
        } else {
            const { error: balanceInsertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: userUid, balance: BONUS_AMOUNT });
            
            if (balanceInsertError) {
                console.error('Error inserting balance for bonus:', balanceInsertError);
                return;
            }
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: null, // System bonus
                to_user_uid: userUid,
                amount: BONUS_AMOUNT,
                transaction_type: 'credit_added',
                game_type: 'memory_verse_consecutive_bonus',
                description: `Memory Verse Champion Bonus: 3 consecutive months - ${BONUS_AMOUNT} credits`
            });
        
        if (transError) {
            console.error('Error recording bonus transaction:', transError);
            // Don't fail if transaction recording fails, balance was already updated
        }
        
        console.log(`Awarded ${BONUS_AMOUNT} credit bonus to user ${userUid} for 3 consecutive months of memory verses`);
        
    } catch (error) {
        console.error('Error checking consecutive months bonus:', error);
        // Don't throw - this is a bonus feature, shouldn't break the approval process
    }
}
