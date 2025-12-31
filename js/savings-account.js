// Savings Account page for standard users
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
        
        // Only standard users can access savings account
        if (session.userType === 'admin') {
            window.location.href = getPagePath('index.html');
            return;
        }
        
        authCheck.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        await loadBalances();
        setupEventListeners();
    } catch (error) {
        console.error('Error checking access:', error);
        window.location.href = getPagePath('login.html');
    }
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
    
    transferToSavingsBtn.addEventListener('click', () => transferToSavings());
    transferFromSavingsBtn.addEventListener('click', () => transferFromSavings());
    
    // Allow Enter key to submit
    transferAmount.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Default to transfer to savings on Enter
            transferToSavings();
        }
    });
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

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        hideMessages();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        hideMessages();
    }, 5000);
}

function hideMessages() {
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

