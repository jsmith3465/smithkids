// Marketplace page for standard users
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
        
        // Only standard users can access marketplace
        if (session.userType === 'admin') {
            window.location.href = getPagePath('index.html');
            return;
        }
        
        authCheck.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        await loadSavingsBalance();
        await loadMarketplaceItems();
    } catch (error) {
        console.error('Error checking access:', error);
        window.location.href = getPagePath('login.html');
    }
}

async function loadSavingsBalance() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    try {
        const { data, error } = await supabase
            .from('User_Credits')
            .select('savings_balance')
            .eq('user_uid', session.uid)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error loading savings balance:', error);
            return;
        }
        
        const savingsBalance = data ? (data.savings_balance || 0) : 0;
        document.getElementById('savingsBalance').textContent = savingsBalance;
    } catch (error) {
        console.error('Error loading savings balance:', error);
    }
}

async function loadMarketplaceItems() {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    const marketplaceItems = document.getElementById('marketplaceItems');
    
    try {
        // Get active marketplace items
        const { data: items, error } = await supabase
            .from('marketplace_items')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true });
        
        if (error) throw error;
        
        // Get current savings balance
        const { data: creditData } = await supabase
            .from('User_Credits')
            .select('savings_balance')
            .eq('user_uid', session.uid)
            .single();
        
        const savingsBalance = creditData ? (creditData.savings_balance || 0) : 0;
        
        if (!items || items.length === 0) {
            marketplaceItems.innerHTML = '<div class="no-items">No marketplace items available at this time.</div>';
            return;
        }
        
        // Create grid
        const grid = document.createElement('div');
        grid.className = 'marketplace-grid';
        
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'marketplace-item';
            
            const canAfford = savingsBalance >= item.cost;
            const purchaseBtn = canAfford ? 'enabled' : 'disabled';
            
            itemCard.innerHTML = `
                <div class="item-icon">${item.icon || '🛍️'}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description || ''}</div>
                <div class="item-cost">${item.cost} Credits</div>
                <button class="purchase-btn ${purchaseBtn}" 
                        data-item-id="${item.item_id}" 
                        data-item-name="${item.name}"
                        data-item-cost="${item.cost}"
                        ${!canAfford ? 'disabled' : ''}>
                    Purchase
                </button>
            `;
            
            // Add click handler
            const btn = itemCard.querySelector('.purchase-btn');
            if (canAfford) {
                btn.addEventListener('click', () => purchaseItem(item.item_id, item.name, item.cost));
            }
            
            grid.appendChild(itemCard);
        });
        
        marketplaceItems.innerHTML = '';
        marketplaceItems.appendChild(grid);
        
    } catch (error) {
        console.error('Error loading marketplace items:', error);
        marketplaceItems.innerHTML = '<div class="no-items">Error loading marketplace items. Please try again.</div>';
    }
}

async function purchaseItem(itemId, itemName, itemCost) {
    const session = window.authStatus?.getSession();
    if (!session) return;
    
    hideMessages();
    
    // Confirm purchase
    if (!confirm(`Are you sure you want to purchase "${itemName}" for ${itemCost} credits?`)) {
        return;
    }
    
    try {
        // Get current savings balance
        const { data: creditData, error: fetchError } = await supabase
            .from('User_Credits')
            .select('credit_id, savings_balance')
            .eq('user_uid', session.uid)
            .single();
        
        if (fetchError) {
            if (fetchError.code === 'PGRST116') {
                showError('Credit account not found. Please contact an admin.');
                return;
            }
            throw fetchError;
        }
        
        const currentSavings = creditData.savings_balance || 0;
        
        if (itemCost > currentSavings) {
            showError(`Insufficient savings balance. You have ${currentSavings} credits in savings.`);
            await loadSavingsBalance();
            await loadMarketplaceItems();
            return;
        }
        
        // Deduct from savings
        const newSavings = currentSavings - itemCost;
        
        const { error: updateError } = await supabase
            .from('User_Credits')
            .update({ 
                savings_balance: newSavings,
                updated_at: new Date().toISOString()
            })
            .eq('credit_id', creditData.credit_id);
        
        if (updateError) throw updateError;
        
        // Create purchase record
        const { data: purchaseData, error: purchaseError } = await supabase
            .from('marketplace_purchases')
            .insert({
                user_uid: session.uid,
                item_id: itemId,
                cost: itemCost,
                description: `Purchased ${itemName}`,
                status: 'pending'
            })
            .select()
            .single();
        
        if (purchaseError) throw purchaseError;
        
        // Record transaction in Credit_Transactions
        const { error: transError } = await supabase
            .from('Credit_Transactions')
            .insert({
                to_user_uid: session.uid,
                amount: itemCost,
                transaction_type: 'marketplace_purchase',
                description: `Marketplace purchase: ${itemName}`
            });
        
        if (transError) {
            console.error('Error recording transaction:', transError);
            // Don't fail the purchase if transaction recording fails
        }
        
        // Send notification to admins
        await sendMarketplaceNotification(purchaseData.purchase_id, itemName, itemCost, session);
        
        // Update display
        await loadSavingsBalance();
        await loadMarketplaceItems();
        showSuccess(`Purchase successful! "${itemName}" is pending admin approval.`);
        
    } catch (error) {
        console.error('Error purchasing item:', error);
        showError('Error processing purchase. Please try again.');
    }
}

async function sendMarketplaceNotification(purchaseId, itemName, itemCost, session) {
    try {
        const { data, error } = await supabase.functions.invoke('send-approval-notification', {
            body: {
                notification_type: 'marketplace_purchase',
                purchase_id: purchaseId,
                user_name: session.firstName && session.lastName 
                    ? `${session.firstName} ${session.lastName}` 
                    : session.username,
                item_name: itemName,
                cost: itemCost,
                purchase_date: new Date().toISOString()
            }
        });
        
        if (error) {
            console.error('Error sending marketplace notification:', error);
            // Don't fail the purchase if notification fails
        }
    } catch (error) {
        console.error('Error sending marketplace notification:', error);
        // Don't fail the purchase if notification fails
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

