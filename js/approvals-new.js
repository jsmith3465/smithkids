// Rebuilt Approvals page - Clean implementation
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

// Helper to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Approvals page initializing...');
    
    // Wait for auth to be ready
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkAuth = setInterval(() => {
        attempts++;
        
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            initializePage();
        } else if (attempts >= maxAttempts) {
            clearInterval(checkAuth);
            // Fallback: check sessionStorage
            const sessionData = sessionStorage.getItem('userSession');
            if (sessionData) {
                try {
                    const session = JSON.parse(sessionData);
                    if (session && session.uid) {
                        initializePage();
                        return;
                    }
                } catch (e) {
                    console.error('Error parsing session:', e);
                }
            }
            window.location.href = getPagePath('login.html');
        }
    }, 100);
});

async function initializePage() {
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    const adminCheck = document.getElementById('adminCheck');
    const adminContent = document.getElementById('adminContent');
    
    // Get session
    let session = null;
    if (window.authStatus && window.authStatus.getSession) {
        session = window.authStatus.getSession();
    }
    
    if (!session) {
        const sessionData = sessionStorage.getItem('userSession');
        if (sessionData) {
            try {
                session = JSON.parse(sessionData);
            } catch (e) {
                console.error('Error parsing session:', e);
            }
        }
    }
    
    if (!session || !session.uid) {
        console.log('No session found, redirecting to login');
        window.location.href = getPagePath('login.html');
        return;
    }
    
    // Check if admin
    if (session.userType !== 'admin') {
        authCheck.style.display = 'none';
        mainContent.style.display = 'block';
        adminCheck.innerHTML = '<p style="color: #dc3545;">Access denied. Admin privileges required.</p>';
        adminCheck.style.display = 'block';
        adminContent.style.display = 'none';
        return;
    }
    
    // Show admin content
    authCheck.style.display = 'none';
    mainContent.style.display = 'block';
    adminCheck.style.display = 'none';
    adminContent.style.display = 'block';
    
    // Setup event listeners
    setupEventListeners();
    
    // Load approvals
    await loadPendingApprovals();
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
    
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => loadPendingApprovals());
    }
}

async function loadPendingApprovals() {
    const approvalsList = document.getElementById('approvalsList');
    if (!approvalsList) return;
    
    approvalsList.innerHTML = '<div class="loading">Loading approvals...</div>';
    
    try {
        // Get all pending approvals
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
        
        // Get additional details for specific approval types
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
                        
                        nominations.forEach(nom => {
                            nom.nominator = nominatorMap[nom.nominator_uid];
                        });
                    }
                }
            }
        }
        
        // Get marketplace purchase details
        const marketplaceIds = approvals
            .filter(a => a.approval_type === 'marketplace_purchase')
            .map(a => a.source_id);
        
        const marketplaceMap = {};
        if (marketplaceIds.length > 0) {
            const { data: purchases } = await supabase
                .from('marketplace_purchases')
                .select('purchase_id, item_id, marketplace_items(name, price)')
                .in('purchase_id', marketplaceIds);
            
            if (purchases) {
                purchases.forEach(p => {
                    marketplaceMap[p.purchase_id] = p;
                });
            }
        }
        
        // Render approvals
        approvalsList.innerHTML = '';
        
        approvals.forEach(approval => {
            const user = userMap[approval.user_uid];
            const displayName = (user && user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : (user && user.Username) || 'Unknown';
            
            const approvalDate = new Date(approval.created_at);
            const dateStr = approvalDate.toLocaleDateString() + ' ' + approvalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Determine badge and details based on type
            const typeInfo = getApprovalTypeInfo(approval.approval_type, approval, nominationMap, marketplaceMap, dateStr);
            
            const approvalItem = document.createElement('div');
            approvalItem.className = 'approval-item';
            approvalItem.id = `approval_${approval.approval_id}`;
            approvalItem.innerHTML = `
                <div class="approval-info">
                    <div class="approval-user">
                        <span class="approval-type-badge ${typeInfo.badgeClass}">${typeInfo.badgeText}</span>${escapeHtml(displayName)}
                    </div>
                    <div class="approval-details">${typeInfo.detailsHtml}</div>
                    <div class="approval-date">${dateStr}</div>
                    <div id="emailStatus_${approval.approval_id}" class="email-status" style="display: none;"></div>
                </div>
                <div class="approval-controls">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <label style="font-weight: 600; color: #666; font-size: 0.9rem;">Credits:</label>
                        <input type="number" 
                               id="credits_${approval.approval_id}" 
                               class="credits-input" 
                               value="${approval.credits_amount || typeInfo.defaultCredits}" 
                               min="1" 
                               max="100"
                               onchange="validateCreditsInput(this)">
                    </div>
                    <button class="btn btn-primary" onclick="approveItem(${approval.approval_id}, '${approval.approval_type}', ${approval.source_id})">Approve</button>
                    <button class="btn btn-secondary" style="background: #dc3545;" onclick="denyItem(${approval.approval_id}, '${approval.approval_type}', ${approval.source_id})">Deny</button>
                    <button class="resend-email-btn" onclick="resendEmail(${approval.approval_id})" id="resendBtn_${approval.approval_id}">Resend Email</button>
                </div>
            `;
            approvalsList.appendChild(approvalItem);
        });
        
    } catch (error) {
        console.error('Error loading approvals:', error);
        const errorMessage = error.message || 'Unknown error occurred';
        approvalsList.innerHTML = `<div class="no-approvals" style="color: #dc3545;">Error loading approvals: ${escapeHtml(errorMessage)}. Please try again or contact support.</div>`;
    }
}

function getApprovalTypeInfo(approvalType, approval, nominationMap, marketplaceMap, dateStr) {
    const typeMap = {
        'workout': {
            badgeClass: 'badge-workout',
            badgeText: '💪 Workout',
            defaultCredits: 10,
            detailsHtml: approval.description || 'Workout completed'
        },
        'chore': {
            badgeClass: 'badge-chore',
            badgeText: '🏠 Chore',
            defaultCredits: 10,
            detailsHtml: approval.description || 'Chore completed'
        },
        'memory_verse': {
            badgeClass: 'badge-memory-verse',
            badgeText: '📖 Memory Verse',
            defaultCredits: 50,
            detailsHtml: approval.description || 'Bible memory verse submitted'
        },
        'marketplace_purchase': {
            badgeClass: 'badge-marketplace',
            badgeText: '🛍️ Marketplace',
            defaultCredits: approval.credits_amount || 0,
            detailsHtml: (() => {
                const purchase = marketplaceMap[approval.source_id];
                if (purchase && purchase.marketplace_items) {
                    return `Purchase: ${escapeHtml(purchase.marketplace_items.name)} - ${purchase.marketplace_items.price} credits`;
                }
                return approval.description || 'Marketplace purchase request';
            })()
        },
        'fruit_nomination': {
            badgeClass: 'badge-fruit',
            badgeText: '🍎 Fruit Nomination',
            defaultCredits: 20,
            detailsHtml: (() => {
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
                    
                    return `
                        <div style="margin-bottom: 10px;">
                            <strong>Nominated by:</strong> ${escapeHtml(nominatorName)}<br>
                            <strong>Fruit:</strong> ${fruitNames[nomination.fruit_type] || nomination.fruit_type}<br>
                        </div>
                        <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-top: 10px;">
                            <strong>Reason:</strong><br>
                            ${escapeHtml(nomination.reason).replace(/\n/g, '<br>')}
                        </div>
                    `;
                }
                return approval.description || 'Fruit of the Spirit nomination';
            })()
        },
        'scholar_dollars': {
            badgeClass: 'badge-scholar',
            badgeText: '💰 Scholar Dollars',
            defaultCredits: approval.credits_amount || 0,
            detailsHtml: approval.description || 'Scholar Dollars submission'
        }
    };
    
    return typeMap[approvalType] || {
        badgeClass: '',
        badgeText: approvalType,
        defaultCredits: 10,
        detailsHtml: approval.description || 'Approval request'
    };
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

// Resend email for approval
window.resendEmail = async function(approvalId) {
    const resendBtn = document.getElementById(`resendBtn_${approvalId}`);
    const emailStatus = document.getElementById(`emailStatus_${approvalId}`);
    
    if (!resendBtn || !emailStatus) return;
    
    resendBtn.disabled = true;
    resendBtn.textContent = 'Sending...';
    emailStatus.style.display = 'none';
    
    try {
        // Get approval details
        const { data: approval, error: fetchError } = await supabase
            .from('unified_approvals')
            .select('approval_id, approval_type, source_id, user_uid, description, credits_amount, Users!unified_approvals_user_uid_fkey(First_Name, Last_Name, Username)')
            .eq('approval_id', approvalId)
            .single();
        
        if (fetchError) throw fetchError;
        
        const user = approval.Users;
        const userName = (user.First_Name && user.Last_Name)
            ? `${user.First_Name} ${user.Last_Name}`
            : user.Username || 'Unknown';
        
        // Call Supabase Edge Function to resend email
        const { data, error } = await supabase.functions.invoke('send-approval-notification', {
            body: {
                approval_id: approvalId,
                approval_type: approval.approval_type,
                user_name: userName,
                description: approval.description || '',
                credits_amount: approval.credits_amount || 10
            }
        });
        
        if (error) throw error;
        
        emailStatus.textContent = '✓ Email sent successfully!';
        emailStatus.style.color = '#28a745';
        emailStatus.style.display = 'block';
        
        setTimeout(() => {
            emailStatus.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('Error resending email:', error);
        emailStatus.textContent = '✗ Failed to send email';
        emailStatus.style.color = '#dc3545';
        emailStatus.style.display = 'block';
    } finally {
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend Email';
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
        
        // Update source table based on type
        await updateSourceTable(approvalType, sourceId, session.uid, creditsAmount);
        
        // Handle credits based on approval type
        await handleCredits(approvalType, approval.user_uid, creditsAmount, session.uid, sourceId);
        
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
        
        // Update profile menu
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
        showSuccess(`${getApprovalTypeLabel(approvalType)} approved! User received ${creditsAmount} credits.`);
        
    } catch (error) {
        console.error('Error approving item:', error);
        showError('An error occurred while approving item. Please try again.');
    }
};

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
        // Update unified approval status
        const { error: updateError } = await supabase
            .from('unified_approvals')
            .update({
                status: 'rejected',
                approved_by_uid: session.uid,
                approved_at: new Date().toISOString()
            })
            .eq('approval_id', approvalId);
        
        if (updateError) throw updateError;
        
        // Update source table
        await updateSourceTableForDenial(approvalType, sourceId, session.uid);
        
        showSuccess(`${getApprovalTypeLabel(approvalType)} denied.`);
        
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
        
        // Update profile menu
        if (window.createProfileMenu) {
            setTimeout(() => window.createProfileMenu(), 500);
        }
        
    } catch (error) {
        console.error('Error denying item:', error);
        showError('An error occurred while denying item. Please try again.');
    }
};

async function updateSourceTable(approvalType, sourceId, adminUid, creditsAmount) {
    const now = new Date().toISOString();
    
    switch (approvalType) {
        case 'workout':
            await supabase
                .from('Workouts')
                .update({
                    is_approved: true,
                    approved_by_uid: adminUid,
                    approved_at: now,
                    credits_amount: creditsAmount
                })
                .eq('workout_id', sourceId);
            break;
            
        case 'chore':
            await supabase
                .from('Chores')
                .update({
                    is_approved: true,
                    approved_by_uid: adminUid,
                    approved_at: now,
                    credits_amount: creditsAmount
                })
                .eq('chore_id', sourceId);
            break;
            
        case 'memory_verse':
            await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'approved',
                    approved_at: now
                })
                .eq('id', sourceId);
            break;
            
        case 'marketplace_purchase':
            await supabase
                .from('marketplace_purchases')
                .update({
                    status: 'approved',
                    approved_at: now,
                    approved_by_uid: adminUid
                })
                .eq('purchase_id', sourceId);
            break;
            
        case 'fruit_nomination':
            await supabase
                .from('fruit_nominations')
                .update({
                    status: 'approved',
                    approved_at: now,
                    approved_by_uid: adminUid
                })
                .eq('nomination_id', sourceId);
            break;
            
        case 'scholar_dollars':
            await supabase
                .from('scholar_dollars_submissions')
                .update({
                    status: 'approved',
                    approved_at: now,
                    approved_by_uid: adminUid
                })
                .eq('submission_id', sourceId);
            break;
    }
}

async function updateSourceTableForDenial(approvalType, sourceId, adminUid) {
    const now = new Date().toISOString();
    
    switch (approvalType) {
        case 'workout':
            await supabase
                .from('Workouts')
                .update({
                    is_approved: false,
                    approved_by_uid: adminUid,
                    approved_at: now
                })
                .eq('workout_id', sourceId);
            break;
            
        case 'chore':
            await supabase
                .from('Chores')
                .update({
                    is_approved: false,
                    approved_by_uid: adminUid,
                    approved_at: now
                })
                .eq('chore_id', sourceId);
            break;
            
        case 'memory_verse':
            await supabase
                .from('Memory_Verse_Submissions')
                .update({
                    status: 'rejected',
                    approved_at: now
                })
                .eq('id', sourceId);
            break;
            
        case 'marketplace_purchase':
            await supabase
                .from('marketplace_purchases')
                .update({
                    status: 'denied',
                    denied_at: now,
                    denied_by_uid: adminUid
                })
                .eq('purchase_id', sourceId);
            break;
            
        case 'fruit_nomination':
            await supabase
                .from('fruit_nominations')
                .update({
                    status: 'denied',
                    denied_at: now,
                    denied_by_uid: adminUid
                })
                .eq('nomination_id', sourceId);
            break;
            
        case 'scholar_dollars':
            await supabase
                .from('scholar_dollars_submissions')
                .update({
                    status: 'denied',
                    denied_at: now,
                    denied_by_uid: adminUid
                })
                .eq('submission_id', sourceId);
            break;
    }
}

async function handleCredits(approvalType, userUid, creditsAmount, adminUid, sourceId) {
    // Get current credit balance
    const { data: existingCredit, error: creditFetchError } = await supabase
        .from('User_Credits')
        .select('credit_id, balance, savings_balance')
        .eq('user_uid', userUid)
        .single();
    
    if (creditFetchError && creditFetchError.code !== 'PGRST116') {
        throw creditFetchError;
    }
    
    if (approvalType === 'marketplace_purchase') {
        // Deduct from savings
        const currentSavings = existingCredit?.savings_balance || 0;
        if (currentSavings < creditsAmount) {
            throw new Error(`Insufficient savings balance. User has ${currentSavings} credits but needs ${creditsAmount}.`);
        }
        
        const newSavings = currentSavings - creditsAmount;
        
        if (existingCredit) {
            await supabase
                .from('User_Credits')
                .update({ 
                    savings_balance: newSavings, 
                    updated_at: new Date().toISOString() 
                })
                .eq('credit_id', existingCredit.credit_id);
        } else {
            throw new Error('User credit account not found.');
        }
        
        // Record transaction
        await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: adminUid,
                to_user_uid: userUid,
                amount: creditsAmount,
                transaction_type: 'marketplace_purchase',
                description: `Marketplace purchase approved: ${creditsAmount} credits`
            });
    } else {
        // Add to balance for all other types
        const newBalance = (existingCredit?.balance || 0) + creditsAmount;
        
        if (existingCredit) {
            await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
        } else {
            await supabase
                .from('User_Credits')
                .insert({ user_uid: userUid, balance: creditsAmount });
        }
        
        // Record transaction
        const gameType = approvalType === 'fruit_nomination' ? 'fruit_nomination' 
            : approvalType === 'scholar_dollars' ? 'scholar_dollars'
            : approvalType;
        
        await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: adminUid,
                to_user_uid: userUid,
                amount: creditsAmount,
                transaction_type: 'credit_added',
                game_type: gameType,
                description: `Approved ${approvalType}: ${creditsAmount} credits`
            });
    }
}

function getApprovalTypeLabel(approvalType) {
    const labels = {
        'workout': 'Workout',
        'chore': 'Chore',
        'memory_verse': 'Memory Verse',
        'marketplace_purchase': 'Marketplace purchase',
        'fruit_nomination': 'Fruit nomination',
        'scholar_dollars': 'Scholar Dollars'
    };
    return labels[approvalType] || approvalType;
}

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
        
        // Process each approval
        for (const approval of approvals) {
            // Update unified approval
            await supabase
                .from('unified_approvals')
                .update({
                    status: 'approved',
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString(),
                    credits_amount: creditsAmount
                })
                .eq('approval_id', approval.approval_id);
            
            // Update source table
            await updateSourceTable(approval.approval_type, approval.source_id, session.uid, creditsAmount);
            
            // Handle credits
            await handleCredits(approval.approval_type, approval.user_uid, creditsAmount, session.uid, approval.source_id);
        }
        
        showSuccess(`Successfully approved ${approvals.length} item(s) with ${creditsAmount} credits each!`);
        
        // Reload approvals
        await loadPendingApprovals();
        
        // Update profile menu
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
        
        // Process each denial
        for (const approval of approvals) {
            // Update unified approval
            await supabase
                .from('unified_approvals')
                .update({
                    status: 'rejected',
                    approved_by_uid: session.uid,
                    approved_at: new Date().toISOString()
                })
                .eq('approval_id', approval.approval_id);
            
            // Update source table
            await updateSourceTableForDenial(approval.approval_type, approval.source_id, session.uid);
        }
        
        showSuccess(`Successfully denied ${approvals.length} item(s).`);
        
        // Reload approvals
        await loadPendingApprovals();
        
        // Update profile menu
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

