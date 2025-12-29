// Credit Manager page for admins
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for auth.js to initialize
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    checkUserAccess();
                } else {
                    // Auth check will handle redirect
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
    
    document.getElementById('authCheck').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    if (session.userType === 'admin') {
        // Show admin content
        document.getElementById('adminContent').classList.remove('hidden');
        document.getElementById('standardContent').classList.add('hidden');
        
        await loadQuickAccessLink();
        await loadAllUsers();
        await loadAllCredits();
        setupAdminEventListeners();
    } else {
        // Show standard user content
        document.getElementById('adminContent').classList.add('hidden');
        document.getElementById('standardContent').classList.remove('hidden');
        
        await loadUserBalance();
        await loadUserTransactions();
    }
}

async function loadAllUsers() {
    const userCheckboxList = document.getElementById('userCheckboxList');
    
    try {
        const { data: users, error } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (error) throw error;
        
        if (!users || users.length === 0) {
            userCheckboxList.innerHTML = '<p style="text-align: center; color: #999;">No standard users found.</p>';
            return;
        }
        
        userCheckboxList.innerHTML = '';
        
        users.forEach(user => {
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : user.Username;
            
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'user-checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="user_${user.UID}" value="${user.UID}" data-name="${displayName}">
                <label for="user_${user.UID}" style="cursor: pointer; flex: 1;">${displayName} (${user.Username})</label>
            `;
            userCheckboxList.appendChild(checkboxItem);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        userCheckboxList.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading users.</p>';
    }
}

async function loadAllCredits() {
    const allCreditsList = document.getElementById('allCreditsList');
    
    try {
        // Get only standard users
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (usersError) throw usersError;
        
        if (!users || users.length === 0) {
            allCreditsList.innerHTML = '<div class="no-data">No standard users found.</div>';
            return;
        }
        
        // Get all credit balances
        const { data: credits, error: creditsError } = await supabase
            .from('User_Credits')
            .select('user_uid, balance');
        
        if (creditsError) throw creditsError;
        
        // Create credit map
        const creditMap = {};
        if (credits) {
            credits.forEach(credit => {
                creditMap[credit.user_uid] = credit.balance;
            });
        }
        
        // Build table
        const table = document.createElement('table');
        table.className = 'credits-table';
        
        // Header
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>User</th>
            <th>Current Balance</th>
            <th>Add Credits</th>
            <th>Remove Credits</th>
            <th>Set Balance</th>
        `;
        table.appendChild(headerRow);
        
        // User rows
        users.forEach(user => {
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name}` 
                : user.Username;
            
            const currentBalance = creditMap[user.UID] || 0;
            
            const row = document.createElement('tr');
            row.id = `creditRow_${user.UID}`;
            row.innerHTML = `
                <td>${displayName} (${user.Username})</td>
                <td><strong style="font-size: 1.2rem; color: #CC5500;">${currentBalance}</strong></td>
                <td>
                    <div style="display: flex; gap: 5px; align-items: center;">
                        <input type="number" id="addAmount_${user.UID}" value="10" min="1" max="1000" style="width: 70px; padding: 5px; border: 1px solid #e0e0e0; border-radius: 5px;">
                        <button class="btn btn-primary btn-small" onclick="addCreditsToUser(${user.UID})">Add</button>
                    </div>
                </td>
                <td>
                    <div style="display: flex; gap: 5px; align-items: center;">
                        <input type="number" id="removeAmount_${user.UID}" value="10" min="1" max="1000" style="width: 70px; padding: 5px; border: 1px solid #e0e0e0; border-radius: 5px;">
                        <button class="btn btn-secondary btn-small" onclick="removeCreditsFromUser(${user.UID})">Remove</button>
                    </div>
                </td>
                <td>
                    <div style="display: flex; gap: 5px; align-items: center;">
                        <input type="number" id="setBalance_${user.UID}" value="${currentBalance}" min="0" style="width: 70px; padding: 5px; border: 1px solid #e0e0e0; border-radius: 5px;">
                        <button class="btn btn-primary btn-small" onclick="setUserBalance(${user.UID})">Set</button>
                    </div>
                </td>
            `;
            table.appendChild(row);
        });
        
        allCreditsList.innerHTML = '';
        allCreditsList.appendChild(table);
        
    } catch (error) {
        console.error('Error loading all credits:', error);
        allCreditsList.innerHTML = '<div class="no-data">Error loading credit balances.</div>';
    }
}

// Add credits to a user
window.addCreditsToUser = async function(userId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const addAmountInput = document.getElementById(`addAmount_${userId}`);
    const amount = parseInt(addAmountInput.value);
    
    if (isNaN(amount) || amount < 1 || amount > 1000) {
        showError('Please enter a valid amount (1-1000).');
        return;
    }
    
    try {
        // Get current balance
        const { data: existingCredit, error: fetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userId)
            .single();
        
        const oldBalance = existingCredit?.balance || 0;
        const newBalance = oldBalance + amount;
        
        if (existingCredit) {
            // Update existing balance
            const { error: updateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (updateError) throw updateError;
        } else {
            // Create new credit record
            const { error: insertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: userId, balance: amount });
            
            if (insertError) throw insertError;
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: session.uid,
                to_user_uid: userId,
                amount: amount,
                transaction_type: 'credit_added',
                description: `Admin added ${amount} credits`
            });
        
        if (transError) throw transError;
        
        showSuccess(`Successfully added ${amount} credits. New balance: ${newBalance}`);
        await loadAllCredits();
        
    } catch (error) {
        console.error('Error adding credits:', error);
        showError('An error occurred while adding credits. Please try again.');
    }
};

// Remove credits from a user
window.removeCreditsFromUser = async function(userId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const removeAmountInput = document.getElementById(`removeAmount_${userId}`);
    const amount = parseInt(removeAmountInput.value);
    
    if (isNaN(amount) || amount < 1 || amount > 1000) {
        showError('Please enter a valid amount (1-1000).');
        return;
    }
    
    try {
        // Get current balance
        const { data: existingCredit, error: fetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userId)
            .single();
        
        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
        }
        
        const oldBalance = existingCredit?.balance || 0;
        const newBalance = Math.max(0, oldBalance - amount);
        
        if (existingCredit) {
            // Update existing balance
            const { error: updateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (updateError) throw updateError;
        } else {
            // No credits to remove
            showError('User has no credits to remove.');
            return;
        }
        
        // Record transaction
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: session.uid,
                to_user_uid: userId,
                amount: amount,
                transaction_type: 'credit_added',
                description: `Admin removed ${amount} credits (balance adjusted)`
            });
        
        if (transError) throw transError;
        
        showSuccess(`Successfully removed ${amount} credits. New balance: ${newBalance}`);
        await loadAllCredits();
        
    } catch (error) {
        console.error('Error removing credits:', error);
        showError('An error occurred while removing credits. Please try again.');
    }
};

// Set user balance to a specific amount
window.setUserBalance = async function(userId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const setBalanceInput = document.getElementById(`setBalance_${userId}`);
    const newBalance = parseInt(setBalanceInput.value);
    
    if (isNaN(newBalance) || newBalance < 0) {
        showError('Please enter a valid balance (0 or greater).');
        return;
    }
    
    try {
        // Get current balance
        const { data: existingCredit, error: fetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', userId)
            .single();
        
        const oldBalance = existingCredit?.balance || 0;
        const difference = newBalance - oldBalance;
        
        if (existingCredit) {
            // Update existing balance
            const { error: updateError } = await supabase
                .from('User_Credits')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', existingCredit.credit_id);
            
            if (updateError) throw updateError;
        } else {
            // Create new credit record
            const { error: insertError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: userId, balance: newBalance });
            
            if (insertError) throw insertError;
        }
        
        // Record transaction if balance changed
        if (difference !== 0) {
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: session.uid,
                    to_user_uid: userId,
                    amount: Math.abs(difference),
                    transaction_type: 'credit_added',
                    description: difference > 0 
                        ? `Admin set balance: added ${difference} credits`
                        : `Admin set balance: removed ${Math.abs(difference)} credits`
                });
            
            if (transError) throw transError;
        }
        
        showSuccess(`Successfully set balance to ${newBalance} credits.`);
        await loadAllCredits();
        
    } catch (error) {
        console.error('Error setting balance:', error);
        showError('An error occurred while setting balance. Please try again.');
    }
};

async function loadUserBalance() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    try {
        const { data, error } = await supabase
            .from('User_Credits')
            .select('balance')
            .eq('user_uid', session.uid)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error loading balance:', error);
            return;
        }
        
        const balance = data ? data.balance : 0;
        document.getElementById('currentBalance').textContent = balance;
    } catch (error) {
        console.error('Error loading balance:', error);
    }
}

async function loadUserTransactions() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const transactionsList = document.getElementById('transactionsList');
    
    try {
        // Get transactions for this user
        const { data: transactions, error } = await supabase
            .from('Credit_Transactions')
            .select(`
                transaction_id,
                from_user_uid,
                to_user_uid,
                amount,
                transaction_type,
                game_type,
                description,
                created_at,
                Users!Credit_Transactions_from_user_uid_fkey(First_Name, Last_Name, Username)
            `)
            .eq('to_user_uid', session.uid)
            .order('created_at', { ascending: false })
            .limit(100);
        
        if (error) throw error;
        
        if (!transactions || transactions.length === 0) {
            transactionsList.innerHTML = '<div class="no-data">No transactions yet.</div>';
            return;
        }
        
        // Build table
        const table = document.createElement('table');
        table.className = 'transactions-table';
        
        // Header
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Date/Time</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
        `;
        table.appendChild(headerRow);
        
        // Transaction rows
        transactions.forEach(trans => {
            const row = document.createElement('tr');
            
            const date = new Date(trans.created_at);
            const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            let typeText = '';
            let description = trans.description || '';
            
            if (trans.transaction_type === 'credit_added') {
                typeText = 'Credit Earned';
                const fromUser = trans.Users;
                if (fromUser) {
                    const fromName = (fromUser.First_Name && fromUser.Last_Name) 
                        ? `${fromUser.First_Name} ${fromUser.Last_Name}` 
                        : fromUser.Username;
                    description = `Added by ${fromName}`;
                }
            } else if (trans.transaction_type === 'game_payment') {
                typeText = 'Credit Spent';
                const gameType = trans.game_type || 'game';
                description = `Played ${gameType.replace('_', ' ')}`;
            } else if (trans.transaction_type === 'credit_adjusted') {
                typeText = 'Balance Adjusted';
            }
            
            const amountClass = trans.transaction_type === 'credit_added' ? 'transaction-credit' : 'transaction-debit';
            const amountSign = trans.transaction_type === 'credit_added' ? '+' : '-';
            
            row.innerHTML = `
                <td>${dateStr}</td>
                <td>${typeText}</td>
                <td>${description}</td>
                <td class="${amountClass}">${amountSign}${trans.amount}</td>
            `;
            table.appendChild(row);
        });
        
        transactionsList.innerHTML = '';
        transactionsList.appendChild(table);
        
    } catch (error) {
        console.error('Error loading transactions:', error);
        transactionsList.innerHTML = '<div class="no-data">Error loading transactions.</div>';
    }
}

function setupAdminEventListeners() {
    const selectAllBtn = document.getElementById('selectAllBtn');
    const deselectAllBtn = document.getElementById('deselectAllBtn');
    const addCreditsBtn = document.getElementById('addCreditsBtn');
    
    selectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('#userCheckboxList input[type="checkbox"]').forEach(cb => {
            cb.checked = true;
        });
    });
    
    deselectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('#userCheckboxList input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    });
    
    addCreditsBtn.addEventListener('click', async () => {
        await addCredits();
    });
}

async function addCredits() {
    const creditAmount = parseInt(document.getElementById('creditAmount').value);
    const selectedUsers = Array.from(document.querySelectorAll('#userCheckboxList input[type="checkbox"]:checked'));
    
    if (!creditAmount || creditAmount < 1) {
        showError('Please enter a valid credit amount (minimum 1).');
        return;
    }
    
    if (selectedUsers.length === 0) {
        showError('Please select at least one user.');
        return;
    }
    
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const addCreditsBtn = document.getElementById('addCreditsBtn');
    addCreditsBtn.disabled = true;
    addCreditsBtn.textContent = 'Adding Credits...';
    
    try {
        const userIds = selectedUsers.map(cb => parseInt(cb.value));
        const userNames = selectedUsers.map(cb => cb.dataset.name);
        
        // Process each user
        for (let i = 0; i < userIds.length; i++) {
            const userId = userIds[i];
            
            // Get or create credit record
            const { data: existingCredit, error: fetchError } = await supabase
                .from('User_Credits')
                .select('credit_id, balance')
                .eq('user_uid', userId)
                .single();
            
            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }
            
            const newBalance = (existingCredit?.balance || 0) + creditAmount;
            
            if (existingCredit) {
                // Update existing balance
                const { error: updateError } = await supabase
                    .from('User_Credits')
                    .update({ balance: newBalance, updated_at: new Date().toISOString() })
                    .eq('credit_id', existingCredit.credit_id);
                
                if (updateError) throw updateError;
            } else {
                // Create new credit record
                const { error: insertError } = await supabase
                    .from('User_Credits')
                    .insert({ user_uid: userId, balance: creditAmount });
                
                if (insertError) throw insertError;
            }
            
            // Record transaction
            const { error: transError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: session.uid,
                    to_user_uid: userId,
                    amount: creditAmount,
                    transaction_type: 'credit_added',
                    description: `Admin added ${creditAmount} credits`
                });
            
            if (transError) throw transError;
        }
        
        showSuccess(`Successfully added ${creditAmount} credits to ${userNames.length} user(s): ${userNames.join(', ')}`);
        
        // Reset form
        document.getElementById('creditAmount').value = 10;
        document.querySelectorAll('#userCheckboxList input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Reload all credits table
        await loadAllCredits();
        
    } catch (error) {
        console.error('Error adding credits:', error);
        showError('An error occurred while adding credits. Please try again.');
    } finally {
        addCreditsBtn.disabled = false;
        addCreditsBtn.textContent = 'Add Credits';
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

async function loadQuickAccessLink() {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') return;
    
    const quickLinkSection = document.getElementById('quickLinkSection');
    
    try {
        // Check if link exists
        const { data: existingLink, error: fetchError } = await supabase
            .from('Admin_Links')
            .select('link_id, access_token, created_at, last_used_at, usage_count')
            .eq('admin_uid', session.uid)
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
        
        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
        }
        
        let token = null;
        let linkId = null;
        
        if (existingLink) {
            token = existingLink.access_token;
            linkId = existingLink.link_id;
        } else {
            // Generate new token
            token = generateToken();
            
            // Create new link
            const { data: newLink, error: insertError } = await supabase
                .from('Admin_Links')
                .insert({
                    admin_uid: session.uid,
                    access_token: token
                })
                .select('link_id')
                .single();
            
            if (insertError) throw insertError;
            linkId = newLink.link_id;
        }
        
        // Build the full URL
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        const quickLinkUrl = `${window.location.origin}${basePath}quick-add-credits.html?token=${token}`;
        
        // Display link
        quickLinkSection.innerHTML = `
            <div style="background: #f8f9fa; border: 2px solid #DAA520; border-radius: 10px; padding: 20px;">
                <div style="margin-bottom: 15px;">
                    <label style="font-weight: 600; color: #333; display: block; margin-bottom: 5px;">Your Quick Access Link:</label>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <input type="text" id="quickLinkInput" readonly value="${quickLinkUrl}" style="
                            flex: 1;
                            padding: 10px;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            background: white;
                            font-size: 0.9rem;
                        ">
                        <button id="copyLinkBtn" class="btn btn-secondary" style="padding: 10px 20px; white-space: nowrap;">Copy Link</button>
                    </div>
                </div>
                ${existingLink ? `
                    <div style="font-size: 0.85rem; color: #666; margin-top: 10px;">
                        <p>Created: ${new Date(existingLink.created_at).toLocaleDateString()}</p>
                        ${existingLink.last_used_at ? `<p>Last used: ${new Date(existingLink.last_used_at).toLocaleDateString()}</p>` : '<p>Never used</p>'}
                        <p>Usage count: ${existingLink.usage_count}</p>
                    </div>
                ` : ''}
                <button id="regenerateLinkBtn" class="btn btn-secondary" style="margin-top: 15px; width: 100%;">Regenerate Link</button>
            </div>
        `;
        
        // Setup copy button
        document.getElementById('copyLinkBtn').addEventListener('click', () => {
            const input = document.getElementById('quickLinkInput');
            input.select();
            document.execCommand('copy');
            const btn = document.getElementById('copyLinkBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
        
        // Setup regenerate button
        document.getElementById('regenerateLinkBtn').addEventListener('click', async () => {
            if (confirm('Are you sure you want to regenerate your link? The old link will no longer work.')) {
                await regenerateLink(linkId);
            }
        });
        
    } catch (error) {
        console.error('Error loading quick access link:', error);
        quickLinkSection.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading quick access link.</p>';
    }
}

async function regenerateLink(oldLinkId) {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') return;
    
    try {
        // Deactivate old link
        if (oldLinkId) {
            await supabase
                .from('Admin_Links')
                .update({ is_active: false })
                .eq('link_id', oldLinkId);
        }
        
        // Generate new token
        const newToken = generateToken();
        
        // Create new link
        const { data: newLink, error: insertError } = await supabase
            .from('Admin_Links')
            .insert({
                admin_uid: session.uid,
                access_token: newToken
            })
            .select('link_id')
            .single();
        
        if (insertError) throw insertError;
        
        // Reload the link section
        await loadQuickAccessLink();
        showSuccess('Quick access link regenerated successfully!');
        
    } catch (error) {
        console.error('Error regenerating link:', error);
        showError('Error regenerating link. Please try again.');
    }
}

function generateToken() {
    // Generate a secure random token
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    const array = new Uint8Array(64);
    
    if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(array);
        for (let i = 0; i < array.length; i++) {
            token += chars[array[i] % chars.length];
        }
    } else {
        // Fallback for older browsers
        for (let i = 0; i < 64; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    
    return token;
}

