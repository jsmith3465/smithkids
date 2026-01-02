// Credit Balance page for standard users
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { initializeApprovalNotifications } from './notification-system.js';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = setInterval(() => {
        if (window.authStatus && window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
            loadCreditBalance();
            loadTransactions();
            const session = window.authStatus.getSession();
            if (session && session.userType !== 'admin') {
                initializeApprovalNotifications();
            }
        } else if (window.authStatus && !window.authStatus.isAuthenticated) {
            clearInterval(checkAuth);
        }
    }, 100);
    
    setTimeout(() => {
        clearInterval(checkAuth);
    }, 5000);
});

async function loadCreditBalance() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    try {
        const { data, error } = await supabase
            .from('User_Credits')
            .select('balance, savings_balance')
            .eq('user_uid', session.uid)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error loading balance:', error);
            return;
        }
        
        const availableBalance = data ? (data.balance || 0) : 0;
        const savingsBalance = data ? (data.savings_balance || 0) : 0;
        
        document.getElementById('currentBalance').textContent = availableBalance.toLocaleString();
        document.getElementById('savingsBalance').textContent = savingsBalance.toLocaleString();
    } catch (error) {
        console.error('Error loading balance:', error);
    }
}

async function loadTransactions() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const transactionsList = document.getElementById('transactionsList');
    
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
            }
            
            // Calculate changes for this transaction
            let availableChange = 0;
            let savingsChange = 0;
            let availableDisplay = '';
            let savingsDisplay = '';
            
            if (trans.transaction_type === 'credit_added') {
                availableChange = trans.amount;
                savingsChange = 0;
                availableDisplay = `<span class="transaction-credit">+${trans.amount}</span>`;
                savingsDisplay = '<span style="color: #999;">—</span>';
            } else if (trans.transaction_type === 'game_payment') {
                availableChange = -trans.amount;
                savingsChange = 0;
                availableDisplay = `<span class="transaction-debit">-${trans.amount}</span>`;
                savingsDisplay = '<span style="color: #999;">—</span>';
            } else if (trans.transaction_type === 'savings_transfer') {
                availableChange = -trans.amount;
                savingsChange = trans.amount;
                availableDisplay = `<span class="transaction-debit">-${trans.amount}</span>`;
                savingsDisplay = `<span class="transaction-credit">+${trans.amount}</span>`;
            } else if (trans.transaction_type === 'savings_withdrawal') {
                availableChange = trans.amount;
                savingsChange = -trans.amount;
                availableDisplay = `<span class="transaction-credit">+${trans.amount}</span>`;
                savingsDisplay = `<span class="transaction-debit">-${trans.amount}</span>`;
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

