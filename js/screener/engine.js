// Screening Engine

import { CompanyScreenerResult, ScreenResult } from './types.js';
import { BUFFETT_SCREENS, getScreenById } from './screens.js';
import { getDataProvider } from './dataProvider.js';

/**
 * Normalize ticker symbols
 */
export function normalizeTickers(input) {
    if (!input) return [];
    
    // Split by comma, space, or newline
    const raw = input.split(/[,\s\n]+/).map(t => t.trim()).filter(t => t.length > 0);
    
    // Normalize: uppercase, handle dots
    return raw.map(ticker => {
        let normalized = ticker.toUpperCase().trim();
        // Preserve original for display, but normalize for API calls
        return normalized;
    });
}

/**
 * Run screener for a single company
 */
async function screenCompany(ticker, enabledScreenIds, screenParams, treatNaAsFail) {
    const provider = getDataProvider();
    
    try {
        // Fetch company data
        const [profile, metrics] = await Promise.all([
            provider.getCompanyProfile(ticker),
            provider.getCompanyMetrics(ticker)
        ]);
        
        // Evaluate each enabled screen
        const screenResults = {};
        let overallPass = true;
        
        for (const screenId of enabledScreenIds) {
            const screen = getScreenById(screenId);
            if (!screen) continue;
            
            const params = screenParams[screenId] || screen.defaultParams;
            const result = screen.evaluate(metrics, profile, params);
            screenResults[screenId] = result;
            
            // Determine overall pass
            if (result.status === 'FAIL') {
                overallPass = false;
            } else if (result.status === 'NA' && treatNaAsFail) {
                overallPass = false;
            }
        }
        
        return new CompanyScreenerResult(ticker, profile, metrics, screenResults);
    } catch (error) {
        console.error(`Error screening ${ticker}:`, error);
        // Return error result
        const errorResult = new CompanyScreenerResult(ticker, null, null, {});
        errorResult.overall = 'FAIL';
        errorResult.error = error.message;
        return errorResult;
    }
}

/**
 * Run screener for multiple companies
 */
export async function runScreener(tickers, enabledScreenIds, screenParams, options = {}) {
    const { treatNaAsFail = true } = options;
    const provider = getDataProvider();
    const providerName = provider.constructor.name === 'MockProvider' ? 'mock' : 'fmp';
    const warnings = [];
    
    // Normalize tickers
    const normalizedTickers = normalizeTickers(tickers);
    
    if (normalizedTickers.length === 0) {
        return {
            provider: providerName,
            warnings: ['No valid tickers provided'],
            results: []
        };
    }
    
    // Screen each company
    const results = await Promise.all(
        normalizedTickers.map(ticker => 
            screenCompany(ticker, enabledScreenIds, screenParams, treatNaAsFail)
        )
    );
    
    // Set overall status for each result
    results.forEach(result => {
        if (result.error) {
            result.overall = 'FAIL';
        } else {
            const allPass = Object.values(result.screenResults).every(sr => {
                if (sr.status === 'FAIL') return false;
                if (sr.status === 'NA' && treatNaAsFail) return false;
                return true;
            });
            result.overall = allPass ? 'PASS' : 'FAIL';
        }
    });
    
    return {
        provider: providerName,
        warnings,
        results
    };
}

