// Credit Display Utilities - Fetch credit/debit amounts from credit_manager table

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cache for credit amounts to avoid repeated queries
let creditCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get credit amount for a specific app/game/badge
 * @param {string} appName - The name of the app/game/badge
 * @param {string} transactionType - 'credit' or 'debit'
 * @param {number} defaultValue - Default value if not found
 * @returns {Promise<number>} - The credit amount
 */
export async function getCreditAmount(appName, transactionType, defaultValue = 0) {
    try {
        // Load cache if needed
        await loadCreditCache();
        
        const key = `${appName}_${transactionType}`;
        return creditCache[key] || defaultValue;
    } catch (error) {
        console.error('Error getting credit amount:', error);
        return defaultValue;
    }
}

/**
 * Load all credit amounts from credit_manager table into cache
 */
async function loadCreditCache() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (creditCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
        return;
    }
    
    try {
        const { data, error } = await supabase
            .from('credit_manager')
            .select('app_name, transaction_type, credit_amount');
        
        if (error) {
            console.error('Error loading credit cache:', error);
            return;
        }
        
        // Build cache object
        creditCache = {};
        if (data) {
            data.forEach(item => {
                const key = `${item.app_name}_${item.transaction_type}`;
                creditCache[key] = item.credit_amount;
            });
        }
        
        cacheTimestamp = now;
    } catch (error) {
        console.error('Error in loadCreditCache:', error);
    }
}

/**
 * Get all credit amounts for display (returns object with app names as keys)
 * @returns {Promise<Object>} - Object with credit amounts keyed by app_name and transaction_type
 */
export async function getAllCreditAmounts() {
    await loadCreditCache();
    return creditCache || {};
}

/**
 * Clear the cache (useful when credit_manager is updated)
 */
export function clearCreditCache() {
    creditCache = null;
    cacheTimestamp = null;
}

/**
 * Get credit display text for a game/app
 * @param {string} appName - The name of the app/game
 * @param {string} transactionType - 'credit' or 'debit'
 * @param {string} defaultValue - Default text if not found
 * @returns {Promise<string>} - Formatted display text
 */
export async function getCreditDisplayText(appName, transactionType, defaultValue = '') {
    const amount = await getCreditAmount(appName, transactionType);
    
    if (amount === 0 && !defaultValue) {
        return '';
    }
    
    if (transactionType === 'debit') {
        return `💰 Costs ${amount} credit${amount !== 1 ? 's' : ''} to play`;
    } else {
        return `💎 Earn ${amount} credit${amount !== 1 ? 's' : ''}`;
    }
}

/**
 * Get credit range display for Bible Trivia (earns 1-20 credits)
 * @returns {Promise<string>} - Formatted display text
 */
export async function getBibleTriviaCreditDisplay() {
    const maxCredits = await getCreditAmount('Bible Trivia', 'credit', 20);
    return `💎 Earn 1-${maxCredits} credits (Free to play!)`;
}

