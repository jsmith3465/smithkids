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
        await loadHistoryUsers();
        await loadManagerOverview();
        await loadTransferUsers();
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

async function loadManagerOverview() {
    // Load total balances and credit tracking table
    await loadTotalBalances();
    await loadCreditTrackingTable();
}

// Load total available credits and savings balances across all users
async function loadTotalBalances() {
    try {
        // Get all credit balances (available and savings)
        const { data: credits, error } = await supabase
            .from('User_Credits')
            .select('balance, savings_balance');
        
        if (error) {
            console.error('Error loading total balances:', error);
            // Set to 0 if error
            document.getElementById('totalAvailableCredits').textContent = '0';
            document.getElementById('totalSavingsBalance').textContent = '0';
            return;
        }
        
        // Calculate totals
        let totalAvailable = 0;
        let totalSavings = 0;
        
        if (credits && credits.length > 0) {
            credits.forEach(credit => {
                totalAvailable += credit.balance || 0;
                totalSavings += credit.savings_balance || 0;
            });
        }
        
        // Update display
        const totalAvailableEl = document.getElementById('totalAvailableCredits');
        const totalSavingsEl = document.getElementById('totalSavingsBalance');
        
        if (totalAvailableEl) {
            totalAvailableEl.textContent = totalAvailable.toLocaleString();
        }
        if (totalSavingsEl) {
            totalSavingsEl.textContent = totalSavings.toLocaleString();
        }
    } catch (error) {
        console.error('Error loading total balances:', error);
        document.getElementById('totalAvailableCredits').textContent = '0';
        document.getElementById('totalSavingsBalance').textContent = '0';
    }
}

// Store original values for comparison
let creditTrackingData = {};
let allCreditManagerData = []; // Store all data for sorting
let currentPage = 1; // Current page for pagination
let pageSize = 20; // Default page size
let filteredData = []; // Store filtered/sorted data for pagination

async function loadCreditTrackingTable() {
    const container = document.getElementById('creditTrackingTableContainer');
    const saveBtn = document.getElementById('saveCreditTrackingBtn');
    
    try {
        // Get all credit manager data
        const { data: creditManagerData, error } = await supabase
            .from('credit_manager')
            .select('*')
            .order('app_name', { ascending: true })
            .order('transaction_type', { ascending: true });
        
        if (error) throw error;
        
        if (!creditManagerData || creditManagerData.length === 0) {
            container.innerHTML = '<div class="no-data">No credit rules found. Click "Add" to create new rules.</div>';
            saveBtn.style.display = 'none';
            return;
        }
        
        // Store original data
        creditTrackingData = {};
        creditManagerData.forEach(item => {
            creditTrackingData[item.id] = {
                app_name: item.app_name,
                transaction_type: item.transaction_type,
                credit_amount: item.credit_amount
            };
        });
        
        // Store all data for sorting
        allCreditManagerData = creditManagerData;
        
        // Reset to first page when loading new data
        currentPage = 1;
        
        // Apply current sort and render
        filteredData = sortCreditManagerData('all');
        renderCreditManagerTable(container, filteredData);
        
        // Setup sort event listener
        const sortSelect = document.getElementById('sortCategory');
        if (sortSelect) {
            // Remove existing listeners to avoid duplicates
            const newSortSelect = sortSelect.cloneNode(true);
            sortSelect.parentNode.replaceChild(newSortSelect, sortSelect);
            newSortSelect.addEventListener('change', function() {
                currentPage = 1; // Reset to first page on sort change
                filteredData = sortCreditManagerData(this.value);
                const tableContainer = document.getElementById('creditTrackingTableContainer');
                renderCreditManagerTable(tableContainer, filteredData);
            });
        }
        
        // Setup page size event listener
        const pageSizeSelect = document.getElementById('pageSizeSelect');
        if (pageSizeSelect) {
            // Remove existing listeners to avoid duplicates
            const newPageSizeSelect = pageSizeSelect.cloneNode(true);
            pageSizeSelect.parentNode.replaceChild(newPageSizeSelect, pageSizeSelect);
            newPageSizeSelect.value = pageSize.toString(); // Set current value
            newPageSizeSelect.addEventListener('change', function() {
                pageSize = parseInt(this.value);
                currentPage = 1; // Reset to first page on page size change
                const tableContainer = document.getElementById('creditTrackingTableContainer');
                renderCreditManagerTable(tableContainer, filteredData);
            });
        }
        
        // Setup pagination controls
        setupPaginationControls();
        
        // Show save button
        saveBtn.style.display = 'inline-block';
        
    } catch (error) {
        console.error('Error loading credit manager table:', error);
        container.innerHTML = '<div class="no-data">Error loading credit manager data. Please try again.</div>';
        saveBtn.style.display = 'none';
    }
}

// Categorize and sort credit manager data
function sortCreditManagerData(sortBy) {
    if (!allCreditManagerData || allCreditManagerData.length === 0) {
        return [];
    }
    
    // Define categories
    const fruitNames = [
        'Love', 'Joy', 'Peace', 'Patience', 'Kindness', 
        'Goodness', 'Faithfulness', 'Gentleness', 'Self-Control'
    ];
    
    const badgeNames = [
        'Trivia Master',
        'Memory Verse Champion',
        'Workout Warrior',
        'Chore Champion',
        'Early Bird',
        'All Fruits of the Spirit'
    ];
    
    const gameNames = [
        'Tic Tac Toe',
        'Snake Game',
        'Hangman',
        'Galaga',
        'Breakout',
        'Bible Trivia'
    ];
    
    if (sortBy === 'all') {
        return [...allCreditManagerData].sort((a, b) => {
            // Sort by category first, then by name
            const aCategory = getCategory(a.app_name, fruitNames, badgeNames, gameNames);
            const bCategory = getCategory(b.app_name, fruitNames, badgeNames, gameNames);
            if (aCategory !== bCategory) {
                return aCategory.localeCompare(bCategory);
            }
            return a.app_name.localeCompare(b.app_name);
        });
    }
    
    const filtered = allCreditManagerData.filter(item => {
        if (sortBy === 'fruit') {
            return fruitNames.includes(item.app_name);
        } else if (sortBy === 'badge') {
            return badgeNames.includes(item.app_name);
        } else if (sortBy === 'game') {
            return gameNames.includes(item.app_name);
        } else if (sortBy === 'app') {
            return !fruitNames.includes(item.app_name) && 
                   !badgeNames.includes(item.app_name) && 
                   !gameNames.includes(item.app_name);
        }
        return true;
    });
    
    return filtered.sort((a, b) => a.app_name.localeCompare(b.app_name));
}

// Get category for an app name
function getCategory(appName, fruitNames, badgeNames, gameNames) {
    if (fruitNames.includes(appName)) return '1_fruit';
    if (badgeNames.includes(appName)) return '2_badge';
    if (gameNames.includes(appName)) return '3_game';
    return '4_app';
}

// Render the credit manager table with pagination
function renderCreditManagerTable(container, data) {
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="no-data">No items found for this category.</div>';
        document.getElementById('paginationControls').style.display = 'none';
        document.getElementById('resultsCount').textContent = '';
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);
    const paginatedData = data.slice(startIndex, endIndex);
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${startIndex + 1}-${endIndex} of ${data.length}`;
    }
    
    // Create table
    const table = document.createElement('table');
    table.className = 'credits-table';
    table.style.marginTop = '0';
    
    // Header
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th style="text-align: left;">App Name</th>
        <th>Transaction Type</th>
        <th>Credit Amount</th>
        <th>Actions</th>
    `;
    table.appendChild(headerRow);
    
    // Data rows (only for current page)
    paginatedData.forEach(item => {
        const row = createCreditManagerRow(item);
        table.appendChild(row);
    });
    
    container.innerHTML = '';
    container.appendChild(table);
    
    // Update pagination controls
    updatePaginationControls(totalPages);
}

// Setup pagination controls
function setupPaginationControls() {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    
    if (prevBtn) {
        // Remove existing listeners to avoid duplicates
        const newPrevBtn = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        newPrevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCreditManagerTable(document.getElementById('creditTrackingTableContainer'), filteredData);
            }
        });
    }
    
    if (nextBtn) {
        // Remove existing listeners to avoid duplicates
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        newNextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredData.length / pageSize);
            if (currentPage < totalPages) {
                currentPage++;
                renderCreditManagerTable(document.getElementById('creditTrackingTableContainer'), filteredData);
            }
        });
    }
}

// Update pagination controls visibility and state
function updatePaginationControls(totalPages) {
    const paginationControls = document.getElementById('paginationControls');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageInfo = document.getElementById('pageInfo');
    
    if (!paginationControls || !prevBtn || !nextBtn || !pageInfo) return;
    
    // Show pagination if more than one page
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
    } else {
        paginationControls.style.display = 'none';
    }
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Update page info
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function createCreditManagerRow(item) {
    const row = document.createElement('tr');
    row.dataset.id = item.id;
    
    const typeClass = item.transaction_type === 'credit' ? 'transaction-credit' : 'transaction-debit';
    
    // Define badge names
    const badgeNames = [
        'Trivia Master',
        'Memory Verse Champion',
        'Workout Warrior',
        'Chore Champion',
        'Early Bird',
        'All Fruits of the Spirit'
    ];
    
    // Define Fruits of the Spirit names
    const fruitNames = [
        'Love',
        'Joy',
        'Peace',
        'Patience',
        'Kindness',
        'Goodness',
        'Faithfulness',
        'Gentleness',
        'Self-Control'
    ];
    
    // Add prefix based on type
    let displayName = item.app_name;
    if (badgeNames.includes(item.app_name)) {
        displayName = `Badge: ${item.app_name}`;
    } else if (fruitNames.includes(item.app_name)) {
        displayName = `Fruit of the Spirit: ${item.app_name}`;
    }
    
    row.innerHTML = `
        <td style="text-align: left;"><strong>${displayName}</strong></td>
        <td>
            <select class="credit-type-select" 
                    data-field="type" 
                    data-id="${item.id}"
                    style="padding: 5px 10px; border: 2px solid #e0e0e0; border-radius: 5px; font-weight: 600; cursor: pointer;">
                <option value="credit" ${item.transaction_type === 'credit' ? 'selected' : ''} style="color: #28a745;">Credit (Earns)</option>
                <option value="debit" ${item.transaction_type === 'debit' ? 'selected' : ''} style="color: #dc3545;">Debit (Costs)</option>
            </select>
        </td>
        <td>
            <input type="number" 
                   class="credit-edit-input" 
                   data-field="amount" 
                   data-id="${item.id}"
                   value="${item.credit_amount}" 
                   min="0" 
                   style="width: 100px; padding: 5px; border: 2px solid #e0e0e0; border-radius: 5px; text-align: center;">
        </td>
        <td>
            <button class="btn btn-small btn-secondary" onclick="resetCreditManagerRow(${item.id})" style="padding: 5px 10px; font-size: 0.85rem;">Reset</button>
        </td>
    `;
    
    // Update select styling based on value
    const select = row.querySelector('.credit-type-select');
    select.addEventListener('change', function() {
        if (this.value === 'credit') {
            this.style.color = '#28a745';
            this.style.borderColor = '#28a745';
        } else {
            this.style.color = '#dc3545';
            this.style.borderColor = '#dc3545';
        }
    });
    
    // Set initial styling
    if (item.transaction_type === 'credit') {
        select.style.color = '#28a745';
        select.style.borderColor = '#28a745';
    } else {
        select.style.color = '#dc3545';
        select.style.borderColor = '#dc3545';
    }
    
    return row;
}

// Make resetCreditManagerRow available globally
window.resetCreditManagerRow = function(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (!row) return;
    
    const original = creditTrackingData[id];
    if (!original) return;
    
    const amountInput = row.querySelector('input[data-field="amount"]');
    const typeSelect = row.querySelector('select[data-field="type"]');
    
    if (amountInput) {
        amountInput.value = original.credit_amount;
    }
    
    if (typeSelect) {
        typeSelect.value = original.transaction_type;
        // Update styling
        if (original.transaction_type === 'credit') {
            typeSelect.style.color = '#28a745';
            typeSelect.style.borderColor = '#28a745';
        } else {
            typeSelect.style.color = '#dc3545';
            typeSelect.style.borderColor = '#dc3545';
        }
    }
};


async function saveCreditTrackingChanges() {
    const saveBtn = document.getElementById('saveCreditTrackingBtn');
    const session = window.authStatus?.getSession();
    
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    
    try {
        const rows = document.querySelectorAll('#creditTrackingTableContainer tr[data-id]');
        const updates = [];
        
        for (const row of rows) {
            const id = parseInt(row.dataset.id);
            const amountInput = row.querySelector('input[data-field="amount"]');
            const typeSelect = row.querySelector('select[data-field="type"]');
            
            if (!amountInput || !typeSelect) continue;
            
            const creditAmount = parseInt(amountInput.value) || 0;
            const transactionType = typeSelect.value;
            
            // Check if values changed
            const original = creditTrackingData[id];
            if (original && 
                original.credit_amount === creditAmount && 
                original.transaction_type === transactionType) {
                continue; // No changes
            }
            
            updates.push({
                id: id,
                credit_amount: creditAmount,
                transaction_type: transactionType,
                updated_at: new Date().toISOString()
            });
        }
        
        if (updates.length === 0) {
            showSuccess('No changes to save.');
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save Changes';
            return;
        }
        
        // Update each record
        for (const update of updates) {
            const { error } = await supabase
                .from('credit_manager')
                .update({
                    credit_amount: update.credit_amount,
                    transaction_type: update.transaction_type,
                    updated_at: update.updated_at
                })
                .eq('id', update.id);
            
            if (error) throw error;
        }
        
        // Reload data to refresh
        await loadCreditTrackingTable();
        
        showSuccess(`Successfully updated ${updates.length} record(s).`);
        
    } catch (error) {
        console.error('Error saving credit manager changes:', error);
        showError('Error saving changes. Please try again.');
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Changes';
    }
}

// Hide add credit scheme form
window.hideAddCreditSchemeForm = function() {
    const form = document.getElementById('addCreditSchemeForm');
    if (form) {
        form.style.display = 'none';
        const formElement = document.getElementById('newCreditSchemeForm');
        if (formElement) {
            formElement.reset();
        }
    }
};

// Add new credit scheme
async function addNewCreditScheme() {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const appName = document.getElementById('newAppName').value.trim();
    const transactionType = document.getElementById('newTransactionType').value;
    const creditAmount = parseInt(document.getElementById('newCreditAmount').value) || 0;
    
    if (!appName) {
        showError('Please enter an app/game name.');
        return;
    }
    
    if (!transactionType) {
        showError('Please select a transaction type (credit or debit).');
        return;
    }
    
    if (creditAmount < 0) {
        showError('Credit amount must be 0 or greater.');
        return;
    }
    
    try {
        // Check if entry already exists (same app name and transaction type)
        const { data: existing, error: checkError } = await supabase
            .from('credit_manager')
            .select('id')
            .eq('app_name', appName)
            .eq('transaction_type', transactionType)
            .maybeSingle();
        
        if (existing) {
            showError(`A ${transactionType} rule for "${appName}" already exists.`);
            return;
        }
        
        // Insert new entry
        const { error: insertError } = await supabase
            .from('credit_manager')
            .insert({
                app_name: appName,
                transaction_type: transactionType,
                credit_amount: creditAmount
            });
        
        if (insertError) {
            if (insertError.code === '23505') { // Unique constraint violation
                showError(`A ${transactionType} rule for "${appName}" already exists.`);
            } else {
                throw insertError;
            }
            return;
        }
        
        showSuccess(`Successfully added ${transactionType} rule for "${appName}".`);
        
        // Hide the form
        hideAddCreditSchemeForm();
        
        // Reload the table
        await loadCreditTrackingTable();
        
    } catch (error) {
        console.error('Error adding credit scheme:', error);
        showError('Error adding scheme. Please try again.');
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
        
        // Get all credit balances (available and savings)
        const { data: credits, error: creditsError } = await supabase
            .from('User_Credits')
            .select('user_uid, balance, savings_balance');
        
        if (creditsError) throw creditsError;
        
        // Create credit maps
        const creditMap = {};
        const savingsMap = {};
        if (credits) {
            credits.forEach(credit => {
                creditMap[credit.user_uid] = credit.balance || 0;
                savingsMap[credit.user_uid] = credit.savings_balance || 0;
            });
        }
        
        // Build table
        const table = document.createElement('table');
        table.className = 'credits-table';
        
        // Header
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>User</th>
            <th>Available Balance</th>
            <th>Savings Balance</th>
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
            
            const availableBalance = creditMap[user.UID] || 0;
            const savingsBalance = savingsMap[user.UID] || 0;
            
            const row = document.createElement('tr');
            row.id = `creditRow_${user.UID}`;
            row.innerHTML = `
                <td>${displayName} (${user.Username})</td>
                <td><strong style="font-size: 1.2rem; color: #CC5500;">${availableBalance.toLocaleString()}</strong></td>
                <td><strong style="font-size: 1.2rem; color: #28a745;">${savingsBalance.toLocaleString()}</strong></td>
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
                        <input type="number" id="setBalance_${user.UID}" value="${availableBalance}" min="0" style="width: 70px; padding: 5px; border: 1px solid #e0e0e0; border-radius: 5px;">
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
        // Refresh total balances if manager tab is active
        const managerTab = document.getElementById('managerTab');
        if (managerTab && managerTab.classList.contains('active')) {
            await loadTotalBalances();
        }
        
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
        // Refresh total balances if manager tab is active
        const managerTab = document.getElementById('managerTab');
        if (managerTab && managerTab.classList.contains('active')) {
            await loadTotalBalances();
        }
        
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
            } else if (trans.transaction_type === 'credit_transfer_out') {
                typeText = 'Credit Transferred Out';
            } else if (trans.transaction_type === 'credit_transfer_in') {
                typeText = 'Credit Transferred In';
            }
            
            const amountClass = (trans.transaction_type === 'credit_added' || trans.transaction_type === 'credit_transfer_in') ? 'transaction-credit' : 'transaction-debit';
            const amountSign = (trans.transaction_type === 'credit_added' || trans.transaction_type === 'credit_transfer_in') ? '+' : '-';
            
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
    // Tab switching
    const tabs = document.querySelectorAll('.credits-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    const selectAllBtn = document.getElementById('selectAllBtn');
    const deselectAllBtn = document.getElementById('deselectAllBtn');
    const addCreditsBtn = document.getElementById('addCreditsBtn');
    const historyUserSelect = document.getElementById('historyUserSelect');
    const saveCreditTrackingBtn = document.getElementById('saveCreditTrackingBtn');
    
    // Credit tracking save button
    if (saveCreditTrackingBtn) {
        saveCreditTrackingBtn.addEventListener('click', saveCreditTrackingChanges);
    }
    
    
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
    
    // History user selection
    if (historyUserSelect) {
        historyUserSelect.addEventListener('change', async (e) => {
            const selectedUserId = e.target.value;
            if (selectedUserId) {
                await loadUserCreditHistory(parseInt(selectedUserId));
            } else {
                document.getElementById('userHistorySection').style.display = 'none';
            }
        });
    }
    
    // Add credit scheme button
    const addCreditSchemeBtn = document.getElementById('addCreditSchemeBtn');
    if (addCreditSchemeBtn) {
        addCreditSchemeBtn.addEventListener('click', () => {
            const form = document.getElementById('addCreditSchemeForm');
            if (form) {
                form.style.display = 'block';
            }
        });
    }
    
    // Add credit scheme form submission
    const newCreditSchemeForm = document.getElementById('newCreditSchemeForm');
    if (newCreditSchemeForm) {
        newCreditSchemeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await addNewCreditScheme();
        });
    }
    
    // Transfer credits form submission
    const transferCreditsForm = document.getElementById('transferCreditsForm');
    if (transferCreditsForm) {
        transferCreditsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await transferCredits();
        });
    }
    
    // Transfer from user selection - show balance
    const transferFromUser = document.getElementById('transferFromUser');
    if (transferFromUser) {
        transferFromUser.addEventListener('change', async (e) => {
            const userId = parseInt(e.target.value);
            if (userId) {
                await loadUserBalanceForTransfer(userId, 'from');
                // Hide transfer complete message when user changes
                const completeMsg = document.getElementById('transferCompleteMessage');
                if (completeMsg) completeMsg.style.display = 'none';
            } else {
                document.getElementById('transferFromBalance').style.display = 'none';
            }
        });
    }

    // Transfer to user selection - show balance
    const transferToUser = document.getElementById('transferToUser');
    if (transferToUser) {
        transferToUser.addEventListener('change', async (e) => {
            const userId = parseInt(e.target.value);
            if (userId) {
                await loadUserBalanceForTransfer(userId, 'to');
                // Hide transfer complete message when user changes
                const completeMsg = document.getElementById('transferCompleteMessage');
                if (completeMsg) completeMsg.style.display = 'none';
            } else {
                document.getElementById('transferToBalance').style.display = 'none';
            }
        });
    }
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.credits-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}Tab`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
    
    // Load data for the selected tab if needed
    if (tabName === 'manager') {
        loadManagerOverview();
    } else if (tabName === 'balances') {
        loadAllCredits();
    } else if (tabName === 'history') {
        // Reset history view when switching to tab
        document.getElementById('historyUserSelect').value = '';
        document.getElementById('userHistorySection').style.display = 'none';
    } else if (tabName === 'transfer') {
        // Reset transfer form when switching to tab
        document.getElementById('transferFromUser').value = '';
        document.getElementById('transferToUser').value = '';
        document.getElementById('transferAmount').value = '10';
        document.getElementById('transferFromBalance').style.display = 'none';
    }
}

// Make switchTab available globally for onclick handlers
window.switchTab = switchTab;

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
        
        // Refresh total balances if manager tab is active
        const managerTab = document.getElementById('managerTab');
        if (managerTab && managerTab.classList.contains('active')) {
            await loadTotalBalances();
        }
        
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

async function loadHistoryUsers() {
    const historyUserSelect = document.getElementById('historyUserSelect');
    if (!historyUserSelect) return;
    
    try {
        const { data: users, error } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (error) throw error;
        
        // Clear existing options except the first one
        historyUserSelect.innerHTML = '<option value="">Select a user...</option>';
        
        if (!users || users.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No standard users found';
            historyUserSelect.appendChild(option);
            return;
        }
        
        users.forEach(user => {
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name} (${user.Username})`
                : user.Username;
            
            const option = document.createElement('option');
            option.value = user.UID;
            option.textContent = displayName;
            historyUserSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading history users:', error);
        historyUserSelect.innerHTML = '<option value="">Error loading users</option>';
    }
}

async function loadUserCreditHistory(userId) {
    const userHistorySection = document.getElementById('userHistorySection');
    const historyUserBalance = document.getElementById('historyUserBalance');
    const historyTransactionsList = document.getElementById('historyTransactionsList');
    
    if (!userHistorySection || !historyUserBalance || !historyTransactionsList) return;
    
    try {
        // Show the section
        userHistorySection.style.display = 'block';
        
        // Load user balance
        const { data: creditData, error: creditError } = await supabase
            .from('User_Credits')
            .select('balance')
            .eq('user_uid', userId)
            .single();
        
        if (creditError && creditError.code !== 'PGRST116') {
            console.error('Error loading balance:', creditError);
        }
        
        const balance = creditData ? creditData.balance : 0;
        historyUserBalance.textContent = balance;
        
        // Load transactions
        historyTransactionsList.innerHTML = '<div class="loading">Loading transactions...</div>';
        
        const { data: transactions, error: transError } = await supabase
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
            .eq('to_user_uid', userId)
            .order('created_at', { ascending: false })
            .limit(500); // Show more transactions for admin view
        
        if (transError) throw transError;
        
        if (!transactions || transactions.length === 0) {
            historyTransactionsList.innerHTML = '<div class="no-data">No transactions found for this user.</div>';
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
                    description = description || `Added by ${fromName}`;
                }
            } else if (trans.transaction_type === 'game_payment') {
                typeText = 'Credit Spent';
                const gameType = trans.game_type || 'game';
                description = description || `Played ${gameType.replace('_', ' ')}`;
            } else if (trans.transaction_type === 'credit_adjusted') {
                typeText = 'Balance Adjusted';
            } else if (trans.transaction_type === 'credit_transfer_out') {
                typeText = 'Credit Transferred Out';
            } else if (trans.transaction_type === 'credit_transfer_in') {
                typeText = 'Credit Transferred In';
            }
            
            const amountClass = (trans.transaction_type === 'credit_added' || trans.transaction_type === 'credit_transfer_in') ? 'transaction-credit' : 'transaction-debit';
            const amountSign = (trans.transaction_type === 'credit_added' || trans.transaction_type === 'credit_transfer_in') ? '+' : '-';
            
            row.innerHTML = `
                <td>${dateStr}</td>
                <td>${typeText}</td>
                <td>${description}</td>
                <td class="${amountClass}">${amountSign}${trans.amount}</td>
            `;
            table.appendChild(row);
        });
        
        historyTransactionsList.innerHTML = '';
        historyTransactionsList.appendChild(table);
        
    } catch (error) {
        console.error('Error loading user credit history:', error);
        historyTransactionsList.innerHTML = '<div class="no-data">Error loading transaction history.</div>';
    }
}

// Load users for transfer dropdowns
async function loadTransferUsers() {
    const transferFromUser = document.getElementById('transferFromUser');
    const transferToUser = document.getElementById('transferToUser');
    
    if (!transferFromUser || !transferToUser) return;
    
    try {
        const { data: users, error } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (error) throw error;
        
        // Clear existing options except the first one
        transferFromUser.innerHTML = '<option value="">Select a user...</option>';
        transferToUser.innerHTML = '<option value="">Select a user...</option>';
        
        if (!users || users.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No standard users found';
            transferFromUser.appendChild(option.cloneNode(true));
            transferToUser.appendChild(option);
            return;
        }
        
        users.forEach(user => {
            const displayName = (user.First_Name && user.Last_Name) 
                ? `${user.First_Name} ${user.Last_Name} (${user.Username})`
                : user.Username;
            
            const optionFrom = document.createElement('option');
            optionFrom.value = user.UID;
            optionFrom.textContent = displayName;
            transferFromUser.appendChild(optionFrom);
            
            const optionTo = document.createElement('option');
            optionTo.value = user.UID;
            optionTo.textContent = displayName;
            transferToUser.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error loading transfer users:', error);
        transferFromUser.innerHTML = '<option value="">Error loading users</option>';
        transferToUser.innerHTML = '<option value="">Error loading users</option>';
    }
}

// Load user balance for transfer display
async function loadUserBalanceForTransfer(userId, type) {
    try {
        const { data: creditData, error } = await supabase
            .from('User_Credits')
            .select('balance, savings_balance')
            .eq('user_uid', userId)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error loading balance:', error);
            return;
        }
        
        const availableBalance = creditData ? (creditData.balance || 0) : 0;
        const savingsBalance = creditData ? (creditData.savings_balance || 0) : 0;
        const totalBalance = availableBalance + savingsBalance;
        
        if (type === 'from') {
            const balanceDiv = document.getElementById('transferFromBalance');
            const availableAmount = document.getElementById('transferFromAvailableAmount');
            const savingsAmount = document.getElementById('transferFromSavingsAmount');
            const totalAmount = document.getElementById('transferFromTotalAmount');
            
            if (balanceDiv && availableAmount && savingsAmount && totalAmount) {
                availableAmount.textContent = availableBalance.toLocaleString();
                savingsAmount.textContent = savingsBalance.toLocaleString();
                totalAmount.textContent = totalBalance.toLocaleString();
                balanceDiv.style.display = 'block';
            }
        } else if (type === 'to') {
            const balanceDiv = document.getElementById('transferToBalance');
            const availableAmount = document.getElementById('transferToAvailableAmount');
            const savingsAmount = document.getElementById('transferToSavingsAmount');
            const totalAmount = document.getElementById('transferToTotalAmount');
            
            if (balanceDiv && availableAmount && savingsAmount && totalAmount) {
                availableAmount.textContent = availableBalance.toLocaleString();
                savingsAmount.textContent = savingsBalance.toLocaleString();
                totalAmount.textContent = totalBalance.toLocaleString();
                balanceDiv.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error loading user balance for transfer:', error);
    }
}

// Transfer credits between users
async function transferCredits() {
    const session = window.authStatus?.getSession();
    if (!session || session.userType !== 'admin') {
        showError('Admin access required.');
        return;
    }
    
    const fromUserId = parseInt(document.getElementById('transferFromUser').value);
    const toUserId = parseInt(document.getElementById('transferToUser').value);
    const amount = parseInt(document.getElementById('transferAmount').value);
    
    if (!fromUserId || !toUserId) {
        showError('Please select both users.');
        return;
    }
    
    if (fromUserId === toUserId) {
        showError('Cannot transfer credits to the same user.');
        return;
    }
    
    if (isNaN(amount) || amount < 1) {
        showError('Please enter a valid amount (minimum 1).');
        return;
    }
    
    // Get admin name for transaction description
    const adminName = (session.firstName && session.lastName) 
        ? `${session.firstName} ${session.lastName}` 
        : session.username || 'Admin';
    
    // Get user names for transaction descriptions
    let fromUserName = '';
    let toUserName = '';
    
    try {
        // Get user names
        const { data: users, error: usersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .in('UID', [fromUserId, toUserId]);
        
        if (usersError) {
            console.error('Error fetching user names:', usersError);
            throw usersError;
        }
        
        if (!users || users.length === 0) {
            throw new Error('Could not find user information for the selected users.');
        }
        
        users.forEach(user => {
            if (user.UID === fromUserId) {
                fromUserName = (user.First_Name && user.Last_Name) 
                    ? `${user.First_Name} ${user.Last_Name}` 
                    : user.Username;
            }
            if (user.UID === toUserId) {
                toUserName = (user.First_Name && user.Last_Name) 
                    ? `${user.First_Name} ${user.Last_Name}` 
                    : user.Username;
            }
        });
        
        if (!fromUserName || !toUserName) {
            throw new Error('Could not determine user names for the transfer.');
        }
        
        // Check if FROM user has enough total credits (available + savings)
        const { data: fromCredit, error: fromError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance, savings_balance')
            .eq('user_uid', fromUserId)
            .single();
        
        if (fromError && fromError.code !== 'PGRST116') {
            throw fromError;
        }
        
        const fromAvailableBalance = fromCredit?.balance || 0;
        const fromSavingsBalance = fromCredit?.savings_balance || 0;
        const fromTotalBalance = fromAvailableBalance + fromSavingsBalance;
        
        console.log('Transfer check:', {
            fromUserId,
            toUserId,
            amount,
            fromAvailableBalance,
            fromSavingsBalance,
            fromTotalBalance,
            fromCredit
        });
        
        if (fromTotalBalance < amount) {
            showError(`Insufficient credits. User has ${fromTotalBalance.toLocaleString()} total credits (${fromAvailableBalance.toLocaleString()} available + ${fromSavingsBalance.toLocaleString()} savings).`);
            return;
        }
        
        // Ensure we have a credit record for FROM user
        if (!fromCredit) {
            // Create a credit record if it doesn't exist (shouldn't happen if balance check passed)
            const { data: newFromCredit, error: createFromError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: fromUserId, balance: 0, savings_balance: 0 })
                .select()
                .single();
            
            if (createFromError) {
                console.error('Error creating FROM user credit record:', createFromError);
                throw createFromError;
            }
            
            // Use the newly created record
            fromCredit = newFromCredit;
        }
        
        const transferBtn = document.getElementById('transferCreditsBtn');
        transferBtn.disabled = true;
        transferBtn.textContent = 'Transferring...';
        
        // Calculate how much to deduct from available vs savings
        let newFromAvailableBalance = fromAvailableBalance;
        let newFromSavingsBalance = fromSavingsBalance;
        let amountFromAvailable = 0;
        let amountFromSavings = 0;
        
        if (fromAvailableBalance >= amount) {
            // All from available
            amountFromAvailable = amount;
            newFromAvailableBalance = fromAvailableBalance - amount;
        } else {
            // Some from available, rest from savings
            amountFromAvailable = fromAvailableBalance;
            amountFromSavings = amount - fromAvailableBalance;
            newFromAvailableBalance = 0;
            newFromSavingsBalance = fromSavingsBalance - amountFromSavings;
        }
        
        // Update FROM user balances
        if (fromCredit) {
            const { error: updateFromError } = await supabase
                .from('User_Credits')
                .update({ 
                    balance: newFromAvailableBalance,
                    savings_balance: newFromSavingsBalance,
                    updated_at: new Date().toISOString() 
                })
                .eq('credit_id', fromCredit.credit_id);
            
            if (updateFromError) {
                console.error('Error updating FROM user balance:', updateFromError);
                throw updateFromError;
            }
        } else {
            // This shouldn't happen if balance check passed, but handle it
            showError('Source user credit record not found.');
            transferBtn.disabled = false;
            transferBtn.textContent = 'Transfer Credits';
            return;
        }
        
        // Add to TO user
        const { data: toCredit, error: toError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance')
            .eq('user_uid', toUserId)
            .single();
        
        if (toError && toError.code !== 'PGRST116') {
            throw toError;
        }
        
        const toBalance = toCredit?.balance || 0;
        const newToBalance = toBalance + amount;
        
        if (toCredit) {
            const { error: updateToError } = await supabase
                .from('User_Credits')
                .update({ balance: newToBalance, updated_at: new Date().toISOString() })
                .eq('credit_id', toCredit.credit_id);
            
            if (updateToError) {
                console.error('Error updating TO user balance:', updateToError);
                throw updateToError;
            }
        } else {
            // Create new credit record for TO user
            const { error: insertToError } = await supabase
                .from('User_Credits')
                .insert({ user_uid: toUserId, balance: amount });
            
            if (insertToError) {
                console.error('Error creating TO user credit record:', insertToError);
                throw insertToError;
            }
        }
        
        // Create transaction(s) for FROM user (debit)
        // Record available credits deduction if any
        if (amountFromAvailable > 0) {
            const { error: transFromAvailableError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: fromUserId,
                    to_user_uid: toUserId,
                    amount: amountFromAvailable,
                    transaction_type: 'credit_transfer_out',
                    description: `Transferred ${amountFromAvailable.toLocaleString()} credits from Available Balance to ${toUserName} (authorized by ${adminName})`
                });
            
            if (transFromAvailableError) {
                console.error('Error creating FROM user available transaction:', transFromAvailableError);
                throw transFromAvailableError;
            }
        }
        
        // Record savings credits deduction if any
        if (amountFromSavings > 0) {
            const { error: transFromSavingsError } = await supabase
                .from('Credit_Transactions')
                .insert({
                    from_user_uid: fromUserId,
                    to_user_uid: toUserId,
                    amount: amountFromSavings,
                    transaction_type: 'credit_transfer_out',
                    description: `Transferred ${amountFromSavings.toLocaleString()} credits from Savings Account to ${toUserName} (authorized by ${adminName})`
                });
            
            if (transFromSavingsError) {
                console.error('Error creating FROM user savings transaction:', transFromSavingsError);
                throw transFromSavingsError;
            }
        }
        
        // Create transaction for TO user (credit)
        const { error: transToError } = await supabase
            .from('Credit_Transactions')
            .insert({
                from_user_uid: fromUserId,
                to_user_uid: toUserId,
                amount: amount,
                transaction_type: 'credit_transfer_in',
                description: `Received ${amount.toLocaleString()} credits from ${fromUserName} (authorized by ${adminName})`
            });
        
        if (transToError) {
            console.error('Error creating TO user transaction:', transToError);
            throw transToError;
        }
        
        // Show transfer complete message
        const completeMsg = document.getElementById('transferCompleteMessage');
        if (completeMsg) {
            completeMsg.style.display = 'block';
        }
        
        // Refresh balance displays for both users (keep them selected)
        await loadUserBalanceForTransfer(fromUserId, 'from');
        await loadUserBalanceForTransfer(toUserId, 'to');
        
        // Refresh balances if needed
        await loadAllCredits();
        const managerTab = document.getElementById('managerTab');
        if (managerTab && managerTab.classList.contains('active')) {
            await loadTotalBalances();
        }
        
    } catch (error) {
        console.error('Error transferring credits:', error);
        // Show more detailed error message
        const errorMessage = error.message || error.toString() || 'Unknown error';
        showError(`Error transferring credits: ${errorMessage}. Please check the browser console for more details.`);
    } finally {
        const transferBtn = document.getElementById('transferCreditsBtn');
        if (transferBtn) {
            transferBtn.disabled = false;
            transferBtn.textContent = 'Transfer Credits';
        }
    }
}


