// Account Information page for standard users
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { initializeApprovalNotifications } from './notification-system.js';

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
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            checkUserAccess();
            const session = window.authStatus.getSession();
            if (session && session.userType !== 'admin') {
                initializeApprovalNotifications();
            }
        } else if (window.authStatus && !window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            window.location.href = getPagePath('login.html');
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
    }, 5000);
});

async function checkUserAccess() {
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    try {
        const session = window.authStatus?.getSession();
        if (!session || !session.uid) {
            window.location.href = getPagePath('login.html');
            return;
        }
        
        // Only standard users can access account information
        if (session.userType === 'admin') {
            window.location.href = getPagePath('index.html');
            return;
        }
        
        authCheck.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        await loadBalances();
        setupTabs();
        setupEventListeners();
        // Load transactions when history tab is first accessed
        const historyTab = document.getElementById('historyTab');
        if (historyTab && historyTab.classList.contains('active')) {
            loadTransactions();
        }
    } catch (error) {
        console.error('Error checking access:', error);
        window.location.href = getPagePath('login.html');
    }
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}Tab`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Load transactions when history tab is opened
                if (targetTab === 'history') {
                    loadTransactions();
                }
            }
        });
    });
}

async function loadBalances() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    try {
        const { data, error } = await supabase
            .from('User_Credits')
            .select('balance, savings_balance')
            .eq('user_uid', session.uid)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error loading balances:', error);
            showError('Error loading balances. Please try again.');
            return;
        }
        
        const availableBalance = data ? (data.balance || 0) : 0;
        const savingsBalance = data ? (data.savings_balance || 0) : 0;
        
        document.getElementById('availableBalance').textContent = availableBalance;
        document.getElementById('savingsBalance').textContent = savingsBalance;
    } catch (error) {
        console.error('Error loading balances:', error);
        showError('Error loading balances. Please try again.');
    }
}

function setupEventListeners() {
    const transferToSavingsBtn = document.getElementById('transferToSavingsBtn');
    const transferFromSavingsBtn = document.getElementById('transferFromSavingsBtn');
    const transferAmount = document.getElementById('transferAmount');
    
    if (transferToSavingsBtn) {
        transferToSavingsBtn.addEventListener('click', () => transferToSavings());
    }
    if (transferFromSavingsBtn) {
        transferFromSavingsBtn.addEventListener('click', () => transferFromSavings());
    }
    
    // Allow Enter key to submit
    if (transferAmount) {
        transferAmount.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Default to transfer to savings on Enter
                transferToSavings();
            }
        });
    }
}

async function transferToSavings() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const amountInput = document.getElementById('transferAmount');
    const amount = parseInt(amountInput.value);
    
    if (!amount || amount <= 0) {
        showError('Please enter a valid amount greater than 0.');
        return;
    }
    
    hideMessages();
    
    try {
        // Get current balances
        const { data: creditData, error: fetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance, savings_balance')
            .eq('user_uid', session.uid)
            .single();
        
        if (fetchError) {
            if (fetchError.code === 'PGRST116') {
                showError('Credit account not found. Please contact an admin.');
                return;
            }
            throw fetchError;
        }
        
        const currentBalance = creditData.balance || 0;
        const currentSavings = creditData.savings_balance || 0;
        
        if (amount > currentBalance) {
            showError(`Insufficient available balance. You have ${currentBalance} credits available.`);
            return;
        }
        
        // Update balances
        const newBalance = currentBalance - amount;
        const newSavings = currentSavings + amount;
        
        const { error: updateError } = await supabase
            .from('User_Credits')
            .update({ 
                balance: newBalance,
                savings_balance: newSavings,
                updated_at: new Date().toISOString()
            })
            .eq('credit_id', creditData.credit_id);
        
        if (updateError) throw updateError;
        
        // Record transaction in Credit_Transactions
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: session.uid,
                amount: amount,
                transaction_type: 'savings_transfer',
                description: `Transferred ${amount} credits to Savings Account`
            });
        
        if (transError) {
            console.error('Error recording transaction:', transError);
            // Don't fail the transfer if transaction recording fails
        }
        
        // Update display
        await loadBalances();
        amountInput.value = '';
        showSuccess(`Successfully transferred ${amount} credits to Savings Account!`);
        
    } catch (error) {
        console.error('Error transferring to savings:', error);
        showError('Error transferring credits. Please try again.');
    }
}

async function transferFromSavings() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const amountInput = document.getElementById('transferAmount');
    const amount = parseInt(amountInput.value);
    
    if (!amount || amount <= 0) {
        showError('Please enter a valid amount greater than 0.');
        return;
    }
    
    hideMessages();
    
    try {
        // Get current balances
        const { data: creditData, error: fetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, balance, savings_balance')
            .eq('user_uid', session.uid)
            .single();
        
        if (fetchError) {
            if (fetchError.code === 'PGRST116') {
                showError('Credit account not found. Please contact an admin.');
                return;
            }
            throw fetchError;
        }
        
        const currentBalance = creditData.balance || 0;
        const currentSavings = creditData.savings_balance || 0;
        
        if (amount > currentSavings) {
            showError(`Insufficient savings balance. You have ${currentSavings} credits in savings.`);
            return;
        }
        
        // Update balances
        const newBalance = currentBalance + amount;
        const newSavings = currentSavings - amount;
        
        const { error: updateError } = await supabase
            .from('User_Credits')
            .update({ 
                balance: newBalance,
                savings_balance: newSavings,
                updated_at: new Date().toISOString()
            })
            .eq('credit_id', creditData.credit_id);
        
        if (updateError) throw updateError;
        
        // Record transaction in Credit_Transactions
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: session.uid,
                amount: amount,
                transaction_type: 'savings_withdrawal',
                description: `Transferred ${amount} credits from Savings Account to Available`
            });
        
        if (transError) {
            console.error('Error recording transaction:', transError);
            // Don't fail the transfer if transaction recording fails
        }
        
        // Update display
        await loadBalances();
        amountInput.value = '';
        showSuccess(`Successfully transferred ${amount} credits from Savings Account to Available!`);
        
    } catch (error) {
        console.error('Error transferring from savings:', error);
        showError('Error transferring credits. Please try again.');
    }
}

async function loadTransactions() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const transactionsList = document.getElementById('transactionsList');
    if (!transactionsList) return;
    
    try {
        // Get transactions for this user (both as sender and receiver)
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
            .or(`to_user_uid.eq.${session.uid},from_user_uid.eq.${session.uid}`)
            .order('created_at', { ascending: false })
            .limit(100);
        
        if (error) throw error;
        
        if (!transactions || transactions.length === 0) {
            transactionsList.innerHTML = '<div class="no-transactions">No transactions yet.</div>';
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
            <th>Available Balance</th>
            <th>Savings Balance</th>
        `;
        table.appendChild(headerRow);
        
        // Transaction rows
        transactions.forEach((trans) => {
            const row = document.createElement('tr');
            
            const date = new Date(trans.created_at);
            const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            let typeText = '';
            let description = trans.description || '';
            
            if (trans.transaction_type === 'credit_added') {
                typeText = 'Credit Added';
                const fromUser = trans.Users;
                if (fromUser) {
                    const fromName = (fromUser.First_Name && fromUser.Last_Name) 
                        ? `${fromUser.First_Name} ${fromUser.Last_Name}` 
                        : fromUser.Username;
                    description = `Added by ${fromName}`;
                }
            } else if (trans.transaction_type === 'game_payment') {
                typeText = 'Game Payment';
                const gameType = trans.game_type || 'game';
                description = `Played ${gameType.replace('_', ' ')}`;
            } else if (trans.transaction_type === 'savings_transfer') {
                typeText = 'Transfer to Savings';
                description = trans.description || 'Transferred to Savings Account';
            } else if (trans.transaction_type === 'savings_withdrawal') {
                typeText = 'Transfer from Savings';
                description = trans.description || 'Transferred from Savings Account';
            } else if (trans.transaction_type === 'marketplace_purchase') {
                typeText = 'Marketplace Purchase';
                description = trans.description || 'Marketplace purchase';
            } else if (trans.transaction_type === 'marketplace_reversal') {
                typeText = 'Marketplace Reversal';
                description = trans.description || 'Marketplace purchase reversal';
            }
            
            // Calculate changes for this transaction
            let availableDisplay = '';
            let savingsDisplay = '';
            
            if (trans.transaction_type === 'credit_added') {
                availableDisplay = `<span class="transaction-credit">+${trans.amount}</span>`;
                savingsDisplay = '<span style="color: #999;">—</span>';
            } else if (trans.transaction_type === 'game_payment') {
                availableDisplay = `<span class="transaction-debit">-${trans.amount}</span>`;
                savingsDisplay = '<span style="color: #999;">—</span>';
            } else if (trans.transaction_type === 'savings_transfer') {
                availableDisplay = `<span class="transaction-debit">-${trans.amount}</span>`;
                savingsDisplay = `<span class="transaction-credit">+${trans.amount}</span>`;
            } else if (trans.transaction_type === 'savings_withdrawal') {
                availableDisplay = `<span class="transaction-credit">+${trans.amount}</span>`;
                savingsDisplay = `<span class="transaction-debit">-${trans.amount}</span>`;
            } else if (trans.transaction_type === 'marketplace_purchase') {
                availableDisplay = '<span style="color: #999;">—</span>';
                savingsDisplay = `<span class="transaction-debit">-${trans.amount}</span>`;
            } else if (trans.transaction_type === 'marketplace_reversal') {
                availableDisplay = '<span style="color: #999;">—</span>';
                savingsDisplay = `<span class="transaction-credit">+${trans.amount}</span>`;
            }
            
            row.innerHTML = `
                <td>${dateStr}</td>
                <td>${typeText}</td>
                <td>${description}</td>
                <td>${availableDisplay}</td>
                <td>${savingsDisplay}</td>
            `;
            table.appendChild(row);
        });
        
        transactionsList.innerHTML = '';
        transactionsList.appendChild(table);
        
    } catch (error) {
        console.error('Error loading transactions:', error);
        transactionsList.innerHTML = '<div class="no-transactions">Error loading transactions.</div>';
    }
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            hideMessages();
        }, 5000);
    }
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            hideMessages();
        }, 5000);
    }
}

function hideMessages() {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
}

