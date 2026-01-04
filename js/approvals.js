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
    console.log('Approvals page DOMContentLoaded');
    
    let checkCount = 0;
    const maxChecks = 50; // 5 seconds (50 * 100ms)
    
    const checkAuth = setInterval(() => {
        checkCount++;
        
        if (window.authStatus) {
            clearInterval(checkAuth);
            console.log('authStatus found, isAuthenticated:', window.authStatus.isAuthenticated);
            if (window.authStatus.isAuthenticated) {
                checkAdminAccess();
            } else {
                // Check sessionStorage as fallback
                const sessionData = sessionStorage.getItem('userSession');
                if (sessionData) {
                    try {
                        const session = JSON.parse(sessionData);
                        if (session && session.uid) {
                            console.log('Found session in sessionStorage, checking admin access');
                            checkAdminAccess();
                            return;
                        }
                    } catch (e) {
                        console.error('Error parsing sessionStorage:', e);
                    }
                }
                console.log('Not authenticated, redirecting to login');
                window.location.href = getPagePath('login.html');
            }
        } else if (checkCount >= maxChecks) {
            clearInterval(checkAuth);
            // Final fallback: check sessionStorage
            const sessionData = sessionStorage.getItem('userSession');
            if (sessionData) {
                try {
                    const session = JSON.parse(sessionData);
                    if (session && session.uid) {
                        console.log('Timeout reached, but found session in sessionStorage');
                        checkAdminAccess();
                        return;
                    }
                } catch (e) {
                    console.error('Error parsing sessionStorage:', e);
                }
            }
            console.log('Auth check timed out, redirecting to login');
            window.location.href = getPagePath('login.html');
        }
    }, 100);
});

async function checkAdminAccess() {
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    const adminCheck = document.getElementById('adminCheck');
    const adminContent = document.getElementById('adminContent');
    
    if (!authCheck || !mainContent || !adminCheck || !adminContent) {
        console.error('Required DOM elements not found');
        return;
    }
    
    try {
        // Try to get session from authStatus first
        let session = null;
        if (window.authStatus && window.authStatus.getSession) {
            session = window.authStatus.getSession();
        }
        
        // Fallback to sessionStorage if authStatus not available
        if (!session || !session.uid) {
            const sessionData = sessionStorage.getItem('userSession');
            if (sessionData) {
                try {
                    session = JSON.parse(sessionData);
                } catch (e) {
                    console.error('Error parsing sessionStorage:', e);
                }
            }
        }
        
        if (!session || !session.uid) {
            console.log('No session found, redirecting to login');
            window.location.href = getPagePath('login.html');
            return;
        }
        
        console.log('Session found:', { uid: session.uid, userType: session.userType });
        
        // Only admins can access this page
        if (session.userType !== 'admin') {
            console.log('User is not an admin');
            authCheck.style.display = 'none';
            mainContent.style.display = 'block';
            adminCheck.innerHTML = '<p style="color: #dc3545;">Access denied. Admin privileges required.</p>';
            adminCheck.style.display = 'block';
            adminContent.style.display = 'none';
            return;
        }
        
        console.log('Admin access confirmed, showing content');
        
        // Hide auth check
        authCheck.style.display = 'none';
        
        // Show main content
        mainContent.style.display = 'block';
        
        // Hide admin check and show admin content
        adminCheck.style.display = 'none';
        adminContent.style.display = 'block';
        
        // Setup event listeners first
        setupEventListeners();
        
        // Load approvals asynchronously (don't block UI)
        loadPendingApprovals().catch((error) => {
            console.error('Error loading approvals:', error);
            const approvalsList = document.getElementById('approvalsList');
            if (approvalsList) {
                approvalsList.innerHTML = `<div class="no-approvals" style="color: #dc3545;">Error loading approvals: ${error.message || 'Unknown error'}. Please refresh the page.</div>`;
            }
        });
        
        console.log('Approvals page loaded successfully');
    } catch (error) {
        console.error('Error checking admin access:', error);
        console.error('Error stack:', error.stack);
        if (authCheck) {
            authCheck.innerHTML = `<p style="color: #dc3545;">Error: ${error.message || 'Unknown error'}. Please refresh the page.</p>`;
            authCheck.style.display = 'block';
        }
        if (mainContent) {
            mainContent.style.display = 'none';
        }
    }
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
        
        // Get fruit nomination details for fruit_nomination approvals
        const fruitNominationIds = approvals
            .filter(a => a.approval_type === 'fruit_nomination')
            .map(a => a.source_id);
        
        const nominationMap = {};
        if (fruitNominationIds.length > 0) {
            const { data: nominations } = await supabase
                .from('fruit_nominations')
                .select('nomination_id, nominator_uid, fruit_type, reason')
                .in('nomination_id', fruitNominationIds);
            
            if (nominations) {
                nominations.forEach(nom => {
                    nominationMap[nom.nomination_id] = nom;
                });
            }
            
            // Get nominator names
            const nominatorIds = [...new Set(nominations.map(n => n.nominator_uid))];
            if (nominatorIds.length > 0) {
                const { data: nominators } = await supabase
                    .from('Users')
                    .select('UID, First_Name, Last_Name, Username')
                    .in('UID', nominatorIds);
                
                if (nominators) {
                    const nominatorMap = {};
                    nominators.forEach(n => {
                        nominatorMap[n.UID] = n;
                    });
                    
                    // Add nominator info to nominations
                    nominations.forEach(nom => {
                        nom.nominator = nominatorMap[nom.nominator_uid];
                    });
                }
            }
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
            let detailsHtml = approval.description || 'No description';
            
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
            } else if (approval.approval_type === 'marketplace_purchase') {
                badgeClass = 'badge-marketplace';
                badgeText = '🛍️ Marketplace';
                icon = '🛍️';
            } else if (approval.approval_type === 'fruit_nomination') {
                badgeClass = 'badge-fruit';
                badgeText = '🍎 Fruit Nomination';
                icon = '🍎';
                
                // Get nomination details
                const nomination = nominationMap[approval.source_id];
                if (nomination) {
                    const fruitNames = {
                        'love': 'Love ❤️',
                        'joy': 'Joy 😊',
                        'peace': 'Peace 🕊️',
                        'patience': 'Patience ⏳',
                        'kindness': 'Kindness 🤝',
                        'goodness': 'Goodness ✨',
                        'faithfulness': 'Faithfulness 🙏',
                        'gentleness': 'Gentleness 🌸',
                        'self_control': 'Self-Control 🎯'
                    };
                    
                    const nominator = nomination.nominator;
                    const nominatorName = (nominator && nominator.First_Name && nominator.Last_Name)
                        ? `${nominator.First_Name} ${nominator.Last_Name}`
                        : (nominator && nominator.Username) || 'Unknown';
                    
                    detailsHtml = `
                        <div style="margin-bottom: 10px;">
                            <strong>Nominated by:</strong> ${nominatorName}<br>
                            <strong>Fruit:</strong> ${fruitNames[nomination.fruit_type] || nomination.fruit_type}<br>
                            <strong>Date:</strong> ${dateStr}
                        </div>
                        <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-top: 10px;">
                            <strong>Reason:</strong><br>
                            ${nomination.reason.replace(/\n/g, '<br>')}
                        </div>
                    `;
                }
            } else if (approval.approval_type === 'scholar_dollars') {
                badgeClass = 'badge-scholar';
                badgeText = '💰 Scholar Dollars';
                icon = '💰';
                
                // Get submission details
                try {
                    const { data: submission } = await supabase
                        .from('scholar_dollars_submissions')
                        .select('quarter_id, scholar_dollars_quarters!inner(quarter_name)')
                        .eq('submission_id', approval.source_id)
                        .single();
                    
                    if (submission) {
                        detailsHtml = `
                            <strong>Quarter:</strong> ${escapeHtml(submission.scholar_dollars_quarters.quarter_name || 'Unknown')}<br>
                            <strong>Credits Requested:</strong> ${approval.credits_amount.toLocaleString()}
                        `;
                    }
                } catch (error) {
                    console.error('Error fetching scholar dollars submission:', error);
                }
            }
            
            const approvalItem = document.createElement('div');
            approvalItem.className = 'approval-item';
            approvalItem.id = `approval_${approval.approval_id}`;
            approvalItem.innerHTML = `
                <div class="approval-info">
                    <div class="approval-user">
                        <span class="approval-type-badge ${badgeClass}">${badgeText}</span>${displayName}
                    </div>
                    <div class="approval-details">${detailsHtml}</div>
                    <div class="approval-date">${dateStr}</div>
                </div>
                <div class="approval-controls">
                    <label style="font-weight: 600; color: #666;">Credits:</label>
                    <input type="number" 
                           id="credits_${approval.approval_id}" 
                           class="credits-input" 
                           value="${approval.credits_amount || (approval.approval_type === 'memory_verse' ? 50 : approval.approval_type === 'fruit_nomination' ? 20 : 10)}" 
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
            
            // Badge check will handle 3 consecutive months (awards 100 credits via badge)
        } else if (approvalType === 'marketplace_purchase') {
            // Update marketplace purchase status
            const { error: purchaseError } = await supabase
                .from('marketplace_purchases')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString(),
                    approved_by_uid: session.uid
                })
                .eq('purchase_id', sourceId);
            
            if (purchaseError) throw purchaseError;
        } else if (approvalType === 'fruit_nomination') {
            // Update fruit nomination status
            const { error: nominationError } = await supabase
                .from('fruit_nominations')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString(),
                    approved_by_uid: session.uid
                })
                .eq('nomination_id', sourceId);
            
            if (nominationError) throw nominationError;
        } else if (approvalType === 'scholar_dollars') {
            // Update scholar dollars submission status
            const { error: submissionError } = await supabase
                .from('scholar_dollars_submissions')
                .update({
                    status: 'approved',
                    approved_at: new Date().toISOString(),
                    approved_by_uid: session.uid
                })
                .eq('submission_id', sourceId);
            
            if (submissionError) throw submissionError;
        }
        
        // Handle credits based on approval type
        const { data: existingCredit, error: creditFetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance, savings_balance')
            .eq('user_uid', approval.user_uid)
            .single();
        
        if (creditFetchError && creditFetchError.code !== 'PGRST116') {
            throw creditFetchError;
        }
        
        if (approvalType === 'marketplace_purchase') {
            // For marketplace purchases, DEDUCT from savings_balance
            const currentSavings = existingCredit?.savings_balance || 0;
            
            if (currentSavings < creditsAmount) {
                throw new Error(`Insufficient savings balance. User has ${currentSavings} credits but needs ${creditsAmount}.`);
            }
            
            const newSavings = currentSavings - creditsAmount;
            
            if (existingCredit) {
                const { error: balanceUpdateError } = await supabase
                    .from('User_Credits')
                    .update({ 
                        savings_balance: newSavings, 
                        updated_at: new Date().toISOString() 
                    })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (balanceUpdateError) throw balanceUpdateError;
            } else {
                throw new Error('User credit account not found.');
            }
            
            // Record transaction for marketplace purchase
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: session.uid,
                    to_user_uid: approval.user_uid,
                    amount: creditsAmount,
                    transaction_type: 'marketplace_purchase',
                    description: `Marketplace purchase approved: ${creditsAmount} credits`
                });
            
            if (transError) {
                console.error('Error recording transaction:', transError);
                // Don't fail if transaction recording fails
            }
            
            showSuccess(`Marketplace purchase approved! ${creditsAmount} credits deducted from user's savings.`);
        } else if (approvalType === 'scholar_dollars') {
            // For scholar dollars, ADD to balance
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
                    to_user_uid: approval.user_uid,
                    amount: creditsAmount,
                    transaction_type: 'credit_added',
                    game_type: 'scholar_dollars',
                    description: `Scholar Dollars: ${creditsAmount} credits for academic excellence`
                });
            
            if (transError) {
                console.error('Error recording transaction:', transError);
            }
            
            showSuccess(`Scholar Dollars approved! ${creditsAmount} credits added to user's account.`);
        } else if (approvalType === 'fruit_nomination') {
            // For fruit nominations, ADD to balance and award badge
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
            
            // Get nomination details to award badge
            const { data: nomination } = await supabase
                .from('fruit_nominations')
                .select('fruit_type, nominator_uid, reason')
                .eq('nomination_id', sourceId)
                .single();
            
            // Define fruit names for use in badge awarding and transaction recording
            const fruitNames = {
                'love': 'Love',
                'joy': 'Joy',
                'peace': 'Peace',
                'patience': 'Patience',
                'kindness': 'Kindness',
                'goodness': 'Goodness',
                'faithfulness': 'Faithfulness',
                'gentleness': 'Gentleness',
                'self_control': 'Self-Control'
            };
            
            if (nomination) {
                // Award the Fruit of the Spirit badge
                
                const fruitIcons = {
                    'love': '❤️',
                    'joy': '😊',
                    'peace': '🕊️',
                    'patience': '⏳',
                    'kindness': '🤝',
                    'goodness': '✨',
                    'faithfulness': '🙏',
                    'gentleness': '🌸',
                    'self_control': '🎯'
                };
                
                // Check if user already has this badge
                const { data: existingBadge } = await supabase
                    .from('User_Badges')
                    .select('badge_id')
                    .eq('user_uid', approval.user_uid)
                    .eq('badge_type', nomination.fruit_type)
                    .maybeSingle();
                
                if (!existingBadge) {
                    // Award the badge
                    await supabase
                        .from('User_Badges')
                        .insert({
                            user_uid: approval.user_uid,
                            badge_type: nomination.fruit_type,
                            badge_name: fruitNames[nomination.fruit_type]
                        });
                }
                
                // Get nominator and nominee names
                const { data: nominatorData } = await supabase
                    .from('Users')
                    .select('First_Name, Last_Name, Username')
                    .eq('UID', nomination.nominator_uid)
                    .single();
                
                const { data: nomineeData } = await supabase
                    .from('Users')
                    .select('First_Name, Last_Name, Username')
                    .eq('UID', approval.user_uid)
                    .single();
                
                const nominatorName = (nominatorData?.First_Name && nominatorData?.Last_Name)
                    ? `${nominatorData.First_Name} ${nominatorData.Last_Name}`
                    : nominatorData?.Username || 'A family member';
                
                // Send message to nominee
                const messageContent = `
                    <div style="padding: 20px;">
                        <h3 style="color: #28a745; margin-top: 0;">🌟 Fruit of the Spirit Badge Awarded!</h3>
                        <p><strong>Congratulations!</strong> You have been awarded the <strong>${fruitNames[nomination.fruit_type]} ${fruitIcons[nomination.fruit_type]}</strong> Fruit of the Spirit badge!</p>
                        <p><strong>Nominated by:</strong> ${nominatorName}</p>
                        <p><strong>Reason:</strong></p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                            ${nomination.reason.replace(/\n/g, '<br>')}
                        </div>
                        <div style="margin-top: 20px; padding: 15px; background: #d4edda; border-radius: 8px; border: 2px solid #28a745;">
                            <p style="margin: 0; font-weight: 600; color: #155724;">
                                💰 You received <strong>${creditsAmount} credits</strong> added to your account!
                            </p>
                        </div>
                    </div>
                `;
                
                await supabase
                    .from('message_boxes')
                    .insert({
                        from_user_uid: session.uid, // Admin who approved
                        to_user_uid: approval.user_uid,
                        subject: `Fruit of the Spirit Badge: ${fruitNames[nomination.fruit_type]}`,
                        body: messageContent,
                        folder: 'inbox',
                        is_read: false
                    });
            }
            
            // Record transaction
            const fruitName = nomination ? fruitNames[nomination.fruit_type] : 'Fruit of the Spirit';
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: session.uid,
                    to_user_uid: approval.user_uid,
                    amount: creditsAmount,
                    transaction_type: 'credit_added',
                    game_type: 'fruit_nomination',
                    description: `Fruit of the Spirit nomination approved: ${fruitName} badge - ${creditsAmount} credits`
                });
            
            if (transError) {
                console.error('Error recording transaction:', transError);
            }
            
            showSuccess(`Fruit nomination approved! Badge awarded and ${creditsAmount} credits added to user's account.`);
        } else {
            // For other approvals (workout, chore, memory_verse), ADD to balance
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
        }
        
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
            const { checkAllBadges, checkEarlyBirdBadge } = await import('./badge-checker.js');
            let badgeContext = 'general';
            if (approvalType === 'workout') {
                badgeContext = 'workout_approved';
            } else if (approvalType === 'chore') {
                badgeContext = 'chore_approved';
                // Check if this is a Morning Checklist chore
                const { data: chore } = await supabase
                    .from('Chores')
                    .select('description')
                    .eq('chore_id', sourceId)
                    .single();
                
                if (chore && chore.description && chore.description.toLowerCase().includes('morning checklist')) {
                    // Also check Early Bird badge for Morning Checklist chores
                    await checkEarlyBirdBadge(approval.user_uid);
                }
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
        } else if (approvalType === 'marketplace_purchase') {
            // Update marketplace purchase status to denied
            const { error: purchaseError } = await supabase
                .from('marketplace_purchases')
                .update({
                    status: 'denied',
                    denied_at: new Date().toISOString(),
                    denied_by_uid: session.uid
                })
                .eq('purchase_id', sourceId);
            
            if (purchaseError) throw purchaseError;
            // Note: No need to return credits since they were never deducted
        } else if (approvalType === 'fruit_nomination') {
            // Update fruit nomination status to denied
            const { error: nominationError } = await supabase
                .from('fruit_nominations')
                .update({
                    status: 'denied',
                    denied_at: new Date().toISOString(),
                    denied_by_uid: session.uid
                })
                .eq('nomination_id', sourceId);
            
            if (nominationError) throw nominationError;
        }
        
        const typeLabel = approvalType === 'workout' ? 'Workout' 
            : approvalType === 'chore' ? 'Chore' 
            : approvalType === 'memory_verse' ? 'Memory Verse'
            : approvalType === 'marketplace_purchase' ? 'Marketplace purchase'
            : approvalType;
        
        showSuccess(`${typeLabel} denied.`);
        
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
