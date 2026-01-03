// Stock Screener UI Integration

import { BUFFETT_SCREENS } from './screener/screens.js';
import { runScreener } from './screener/engine.js';
import { calculateDCF, checkMarginOfSafety } from './screener/dcf.js';

let currentScreenParams = {};
let currentResults = null;
let currentDcfCompany = null;

/**
 * Initialize screener UI
 */
export function initScreener() {
    const screensList = document.getElementById('screensList');
    if (!screensList) return;
    
    // Build screen checkboxes and parameter inputs
    screensList.innerHTML = '';
    
    BUFFETT_SCREENS.forEach(screen => {
        const screenItem = document.createElement('div');
        screenItem.className = 'screen-item';
        screenItem.id = `screen-${screen.id}`;
        
        // Initialize params
        currentScreenParams[screen.id] = { ...screen.defaultParams };
        
        const header = document.createElement('div');
        header.className = 'screen-header';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'screen-checkbox';
        checkbox.id = `checkbox-${screen.id}`;
        checkbox.addEventListener('change', () => {
            screenItem.classList.toggle('enabled', checkbox.checked);
            if (!checkbox.checked) {
                currentScreenParams[screen.id] = { ...screen.defaultParams };
            }
        });
        
        const title = document.createElement('div');
        title.className = 'screen-title';
        title.textContent = screen.title;
        
        header.appendChild(checkbox);
        header.appendChild(title);
        
        const description = document.createElement('div');
        description.style.fontSize = '0.85rem';
        description.style.color = '#666';
        description.style.marginBottom = '10px';
        description.textContent = screen.description;
        
        const paramsDiv = document.createElement('div');
        paramsDiv.className = 'screen-params';
        
        // Build parameter inputs based on screen defaults
        Object.entries(screen.defaultParams).forEach(([key, defaultValue]) => {
            const paramGroup = document.createElement('div');
            paramGroup.className = 'param-group';
            
            const label = document.createElement('label');
            label.textContent = formatParamLabel(key) + ':';
            
            let input;
            if (Array.isArray(defaultValue)) {
                // String array input (comma-separated)
                input = document.createElement('textarea');
                input.rows = 2;
                input.placeholder = 'Comma-separated values';
                input.value = defaultValue.length > 0 ? defaultValue.join(', ') : '';
                input.addEventListener('change', () => {
                    const values = input.value.split(',').map(v => v.trim()).filter(v => v);
                    currentScreenParams[screen.id][key] = values.length > 0 ? values : [];
                });
            } else if (typeof defaultValue === 'number') {
                // Number input
                input = document.createElement('input');
                input.type = 'number';
                input.step = key.includes('Rate') || key.includes('Percent') ? '0.1' : '0.01';
                input.value = defaultValue;
                input.addEventListener('change', () => {
                    const numValue = parseFloat(input.value);
                    if (!isNaN(numValue)) {
                        currentScreenParams[screen.id][key] = numValue;
                    }
                });
            } else {
                // Text input
                input = document.createElement('input');
                input.type = 'text';
                input.value = defaultValue || '';
                input.addEventListener('change', () => {
                    currentScreenParams[screen.id][key] = input.value;
                });
            }
            
            paramGroup.appendChild(label);
            paramGroup.appendChild(input);
            paramsDiv.appendChild(paramGroup);
        });
        
        screenItem.appendChild(header);
        screenItem.appendChild(description);
        screenItem.appendChild(paramsDiv);
        screensList.appendChild(screenItem);
    });
    
    // Setup run button
    const runBtn = document.getElementById('runScreenerBtn');
    if (runBtn) {
        runBtn.addEventListener('click', handleRunScreener);
    }
    
    // Setup DCF panel
    setupDcfPanel();
}

/**
 * Format parameter label for display
 */
function formatParamLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

/**
 * Handle run screener button click
 */
async function handleRunScreener() {
    const tickerInput = document.getElementById('tickerInput');
    const treatNaAsFail = document.getElementById('treatNaAsFail')?.checked ?? true;
    const resultsContainer = document.getElementById('screenerResultsContainer');
    
    if (!tickerInput || !resultsContainer) return;
    
    const tickers = tickerInput.value;
    if (!tickers || tickers.trim().length === 0) {
        alert('Please enter at least one ticker symbol');
        return;
    }
    
    // Get enabled screens
    const enabledScreens = [];
    BUFFETT_SCREENS.forEach(screen => {
        const checkbox = document.getElementById(`checkbox-${screen.id}`);
        if (checkbox && checkbox.checked) {
            enabledScreens.push(screen.id);
        }
    });
    
    if (enabledScreens.length === 0) {
        alert('Please select at least one screening criterion');
        return;
    }
    
    // Show loading
    resultsContainer.innerHTML = '<div class="loading">Running screener...</div>';
    
    try {
        const result = await runScreener(tickers, enabledScreens, currentScreenParams, { treatNaAsFail });
        currentResults = result;
        renderResults(result);
    } catch (error) {
        console.error('Error running screener:', error);
        resultsContainer.innerHTML = `<div style="color: #dc3545; padding: 20px;">Error running screener: ${error.message}</div>`;
    }
}

/**
 * Render screener results
 */
function renderResults(result) {
    const container = document.getElementById('screenerResultsContainer');
    if (!container) return;
    
    if (!result.results || result.results.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">No results found</div>';
        return;
    }
    
    let html = '';
    
    // Warnings
    if (result.warnings && result.warnings.length > 0) {
        html += '<div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 15px; margin-bottom: 20px;">';
        html += '<strong>⚠️ Warnings:</strong><ul style="margin: 10px 0 0 0; padding-left: 20px;">';
        result.warnings.forEach(warning => {
            html += `<li>${escapeHtml(warning)}</li>`;
        });
        html += '</ul></div>';
    }
    
    // Results table
    html += '<table class="screener-results-table">';
    html += '<thead><tr>';
    html += '<th>Ticker</th><th>Name</th><th>Sector</th><th>Overall</th><th>Passed</th><th>Failed</th><th>NA</th><th>Actions</th>';
    html += '</tr></thead><tbody>';
    
    result.results.forEach((companyResult, index) => {
        const profile = companyResult.profile;
        const screenResults = companyResult.screenResults || {};
        
        const passed = Object.values(screenResults).filter(sr => sr.status === 'PASS').length;
        const failed = Object.values(screenResults).filter(sr => sr.status === 'FAIL').length;
        const na = Object.values(screenResults).filter(sr => sr.status === 'NA').length;
        
        const overallClass = companyResult.overall === 'PASS' ? 'status-pass' : 
                            companyResult.overall === 'FAIL' ? 'status-fail' : 'status-na';
        
        html += `<tr data-result-index="${index}">`;
        html += `<td><strong>${escapeHtml(companyResult.ticker)}</strong></td>`;
        html += `<td>${escapeHtml(profile?.name || 'N/A')}</td>`;
        html += `<td>${escapeHtml(profile?.sector || 'N/A')}</td>`;
        html += `<td><span class="status-badge ${overallClass}">${companyResult.overall || 'FAIL'}</span></td>`;
        html += `<td>${passed}</td>`;
        html += `<td>${failed}</td>`;
        html += `<td>${na}</td>`;
        html += `<td><button class="btn btn-secondary" onclick="toggleResultDetails(${index})" style="padding: 4px 12px; font-size: 0.85rem;">Details</button>`;
        
        // DCF button if we have FCF data
        if (companyResult.metrics?.fcfTtm && companyResult.metrics?.sharesOutstanding) {
            html += ` <button class="btn btn-primary" onclick="openDcfPanel(${index})" style="padding: 4px 12px; font-size: 0.85rem; margin-left: 5px;">DCF</button>`;
        }
        
        html += `</td>`;
        html += '</tr>';
        
        // Details row
        html += `<tr id="details-row-${index}" style="display: none;"><td colspan="8">`;
        html += `<div class="result-details">`;
        html += renderResultDetails(companyResult);
        html += `</div></td></tr>`;
    });
    
    html += '</tbody></table>';
    
    container.innerHTML = html;
}

/**
 * Render detailed result for a company
 */
function renderResultDetails(companyResult) {
    const profile = companyResult.profile;
    const metrics = companyResult.metrics;
    const screenResults = companyResult.screenResults || {};
    
    let html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';
    
    // Left: Screen results
    html += '<div>';
    html += '<h4 style="margin-top: 0;">Screen Results</h4>';
    
    Object.entries(screenResults).forEach(([screenId, result]) => {
        const screen = BUFFETT_SCREENS.find(s => s.id === screenId);
        const screenName = screen ? screen.title : screenId;
        const statusClass = result.status.toLowerCase();
        
        html += `<div class="screen-result-item ${statusClass}">`;
        html += `<strong>${escapeHtml(screenName)}:</strong> <span class="status-badge status-${statusClass}">${result.status}</span>`;
        html += '<ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.9rem;">';
        result.reasons.forEach(reason => {
            html += `<li>${escapeHtml(reason)}</li>`;
        });
        html += '</ul></div>';
    });
    
    html += '</div>';
    
    // Right: Key metrics
    html += '<div>';
    html += '<h4 style="margin-top: 0;">Key Metrics</h4>';
    html += '<div style="background: white; padding: 15px; border-radius: 8px;">';
    
    if (metrics) {
        const metricLabels = {
            roe5yAvg: 'ROE 5Y Avg',
            roic5yAvg: 'ROIC 5Y Avg',
            debtToEquity: 'Debt to Equity',
            interestCoverage: 'Interest Coverage',
            fcfTtm: 'FCF TTM',
            price: 'Price',
            sharesOutstanding: 'Shares Outstanding'
        };
        
        Object.entries(metricLabels).forEach(([key, label]) => {
            const value = metrics[key];
            if (value !== undefined && value !== null) {
                let displayValue = value;
                if (key.includes('Avg') || key.includes('Margin') || key.includes('Equity')) {
                    displayValue = (value * 100).toFixed(1) + '%';
                } else if (key === 'fcfTtm' || key === 'sharesOutstanding') {
                    displayValue = formatNumber(value);
                } else if (key === 'price') {
                    displayValue = '$' + value.toFixed(2);
                } else {
                    displayValue = value.toFixed(2);
                }
                html += `<div style="margin-bottom: 8px;"><strong>${label}:</strong> ${displayValue}</div>`;
            }
        });
    } else {
        html += '<div style="color: #999;">No metrics available</div>';
    }
    
    html += '</div></div></div>';
    
    return html;
}

/**
 * Toggle result details (called from onclick)
 */
window.toggleResultDetails = function(index) {
    const detailsRow = document.getElementById(`details-row-${index}`);
    if (detailsRow) {
        detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
    }
};

/**
 * Open DCF panel (called from onclick)
 */
window.openDcfPanel = function(index) {
    if (!currentResults || !currentResults.results[index]) return;
    
    const companyResult = currentResults.results[index];
    currentDcfCompany = companyResult;
    
    const overlay = document.getElementById('dcfPanelOverlay');
    const panel = document.getElementById('dcfPanel');
    const companyInfo = document.getElementById('dcfCompanyInfo');
    
    if (overlay && panel && companyInfo) {
        const profile = companyResult.profile;
        const metrics = companyResult.metrics;
        
        companyInfo.innerHTML = `
            <strong>${escapeHtml(profile?.name || companyResult.ticker)}</strong> (${escapeHtml(companyResult.ticker)})<br>
            <small>FCF TTM: ${metrics?.fcfTtm ? formatNumber(metrics.fcfTtm) : 'N/A'} | 
            Shares: ${metrics?.sharesOutstanding ? formatNumber(metrics.sharesOutstanding) : 'N/A'} | 
            Price: ${metrics?.price ? '$' + metrics.price.toFixed(2) : 'N/A'}</small>
        `;
        
        overlay.classList.add('active');
        panel.classList.add('active');
    }
};

/**
 * Setup DCF panel event listeners
 */
function setupDcfPanel() {
    const overlay = document.getElementById('dcfPanelOverlay');
    const panel = document.getElementById('dcfPanel');
    const closeBtn = document.getElementById('closeDcfPanel');
    const calculateBtn = document.getElementById('calculateDcfBtn');
    
    if (overlay) {
        overlay.addEventListener('click', closeDcfPanel);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDcfPanel);
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateDcfValue);
    }
}

/**
 * Close DCF panel
 */
function closeDcfPanel() {
    const overlay = document.getElementById('dcfPanelOverlay');
    const panel = document.getElementById('dcfPanel');
    
    if (overlay) overlay.classList.remove('active');
    if (panel) panel.classList.remove('active');
    
    currentDcfCompany = null;
}

/**
 * Calculate DCF value
 */
function calculateDcfValue() {
    if (!currentDcfCompany || !currentDcfCompany.metrics) {
        alert('No company data available');
        return;
    }
    
    const metrics = currentDcfCompany.metrics;
    const fcf0 = metrics.fcfTtm;
    const sharesOutstanding = metrics.sharesOutstanding;
    const currentPrice = metrics.price;
    
    if (!fcf0 || !sharesOutstanding) {
        alert('Insufficient data for DCF calculation');
        return;
    }
    
    // Get DCF parameters
    const discountRate = parseFloat(document.getElementById('dcfDiscountRate')?.value || 10) / 100;
    const growth1to5 = parseFloat(document.getElementById('dcfGrowth1to5')?.value || 6) / 100;
    const growth6to10 = parseFloat(document.getElementById('dcfGrowth6to10')?.value || 3) / 100;
    const terminalGrowth = parseFloat(document.getElementById('dcfTerminalGrowth')?.value || 2) / 100;
    const marginOfSafety = parseFloat(document.getElementById('dcfMarginOfSafety')?.value || 25) / 100;
    
    // Calculate DCF
    const dcfResult = calculateDCF({
        fcf0,
        sharesOutstanding,
        discountRate,
        growthRateYears1to5: growth1to5,
        growthRateYears6to10: growth6to10,
        terminalGrowthRate: terminalGrowth
    });
    
    if (dcfResult.error) {
        alert(dcfResult.error);
        return;
    }
    
    // Check margin of safety
    const mosResult = checkMarginOfSafety(currentPrice, dcfResult.intrinsicValuePerShare, marginOfSafety);
    
    // Display results
    const resultsDiv = document.getElementById('dcfResults');
    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <h4 style="margin-top: 0;">DCF Results</h4>
            <div style="margin-bottom: 15px;">
                <strong>Intrinsic Value per Share:</strong> $${dcfResult.intrinsicValuePerShare.toFixed(2)}<br>
                <strong>Current Price:</strong> $${currentPrice ? currentPrice.toFixed(2) : 'N/A'}<br>
                <strong>Target Price (with ${(marginOfSafety * 100).toFixed(0)}% margin of safety):</strong> $${mosResult.targetPrice.toFixed(2)}<br>
                <strong>Discount:</strong> ${mosResult.discount.toFixed(1)}%<br>
                <strong>Margin of Safety Check:</strong> <span class="status-badge ${mosResult.pass ? 'status-pass' : 'status-fail'}">${mosResult.pass ? 'PASS' : 'FAIL'}</span>
            </div>
            <div style="font-size: 0.9rem; color: #666;">
                ${mosResult.reason}
            </div>
        `;
    }
}

/**
 * Helper functions
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
}

