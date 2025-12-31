// Handle marketplace purchase approval/deny actions via email token links

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

// Get token and purchase_id from URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const purchaseId = urlParams.get('purchase_id');
const actionParam = urlParams.get('action'); // 'deny' if present, otherwise 'approve'

if (!token || !purchaseId) {
    showError('Invalid link. Missing required parameters.');
} else {
    processToken(token, purchaseId, actionParam === 'deny');
}

async function processToken(token, purchaseId, isDeny) {
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    
    try {
        // Look up the token
        const { data: tokenData, error: tokenError } = await supabase
            .from('approval_tokens')
            .select('*')
            .eq('token', token)
            .eq('action', isDeny ? 'deny' : 'approve')
            .eq('purchase_id', purchaseId)
            .single();
        
        if (tokenError || !tokenData) {
            showError('Invalid or expired token. This link may have already been used or expired.');
            return;
        }
        
        // Check if token is already used
        if (tokenData.used) {
            showError('This link has already been used. The purchase has already been processed.');
            return;
        }
        
        // Check if token is expired
        const expiresAt = new Date(tokenData.expires_at);
        if (expiresAt < new Date()) {
            showError('This link has expired. Please use the approvals page to process this purchase.');
            return;
        }
        
        // Get purchase details
        const { data: purchase, error: purchaseError } = await supabase
            .from('marketplace_purchases')
            .select(`
                *,
                Users!marketplace_purchases_user_uid_fkey (First_Name, Last_Name, Username),
                marketplace_items (name, description, icon)
            `)
            .eq('purchase_id', purchaseId)
            .single();
        
        if (purchaseError || !purchase) {
            showError('Purchase not found. This purchase may have already been processed.');
            return;
        }
        
        // Check if purchase is already processed
        if (purchase.status !== 'pending') {
            showError(`This purchase has already been ${purchase.status}.`);
            return;
        }
        
        // Process the action
        if (isDeny) {
            await denyPurchase(purchaseId, purchase, tokenData.token_id);
        } else {
            await approvePurchase(purchaseId, purchase, tokenData.token_id);
        }
        
    } catch (error) {
        console.error('Error processing token:', error);
        showError('An error occurred while processing your request. Please try again or use the approvals page.');
    }
}

async function approvePurchase(purchaseId, purchase, tokenId) {
    try {
        const session = window.authStatus?.getSession();
        const adminUid = session ? session.uid : null;
        
        // Update purchase status
        const { error: updateError } = await supabase
            .from('marketplace_purchases')
            .update({
                status: 'approved',
                approved_at: new Date().toISOString(),
                approved_by_uid: adminUid
            })
            .eq('purchase_id', purchaseId);
        
        if (updateError) throw updateError;
        
        // Mark token as used
        await supabase
            .from('approval_tokens')
            .update({ used: true, used_at: new Date().toISOString() })
            .eq('token_id', tokenId);
        
        showSuccess('Purchase approved successfully! The user has been notified.');
        
    } catch (error) {
        console.error('Error approving purchase:', error);
        showError('Error approving purchase. Please try again.');
    }
}

async function denyPurchase(purchaseId, purchase, tokenId) {
    try {
        const session = window.authStatus?.getSession();
        const adminUid = session ? session.uid : null;
        
        // Update purchase status
        const { error: updateError } = await supabase
            .from('marketplace_purchases')
            .update({
                status: 'denied',
                denied_at: new Date().toISOString(),
                denied_by_uid: adminUid
            })
            .eq('purchase_id', purchaseId);
        
        if (updateError) throw updateError;
        
        // Return credits to user's savings account
        const { data: creditData, error: creditError } = await supabase
            .from('User_Credits')
            .select('credit_id, savings_balance')
            .eq('user_uid', purchase.user_uid)
            .single();
        
        if (!creditError && creditData) {
            const newSavings = (creditData.savings_balance || 0) + purchase.cost;
            
            await supabase
                .from('User_Credits')
                .update({
                    savings_balance: newSavings,
                    updated_at: new Date().toISOString()
                })
                .eq('credit_id', creditData.credit_id);
            
            // Record reversal transaction
            await supabase
                .from('Credit_Transactions')
                .insert({
                    to_user_uid: purchase.user_uid,
                    amount: purchase.cost,
                    transaction_type: 'marketplace_reversal',
                    description: `Marketplace purchase reversal: ${purchase.description || 'Purchase denied'}`
                });
        }
        
        // Mark token as used
        await supabase
            .from('approval_tokens')
            .update({ used: true, used_at: new Date().toISOString() })
            .eq('token_id', tokenId);
        
        showSuccess('Purchase denied. Credits have been returned to the user\'s savings account.');
        
    } catch (error) {
        console.error('Error denying purchase:', error);
        showError('Error denying purchase. Please try again.');
    }
}

function showError(message) {
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    
    loadingDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<div class="error-message">${message}</div>`;
}

function showSuccess(message) {
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    
    loadingDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<div class="success-message">${message}</div>`;
}

