// Buffett-Inspired Screening Rules

import { ScreenResult } from './types.js';

/**
 * Screen Definition
 */
export class Screen {
    constructor(id, title, description, defaultParams, evaluateFn) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.defaultParams = defaultParams;
        this.evaluate = evaluateFn;
    }
}

/**
 * Format percentage for display
 */
function formatPercent(value) {
    if (value === undefined || value === null) return 'N/A';
    return `${(value * 100).toFixed(1)}%`;
}

/**
 * Check if string matches any in list (case-insensitive substring)
 */
function matchesList(value, list) {
    if (!value || !list || list.length === 0) return false;
    const lowerValue = value.toLowerCase();
    return list.some(item => lowerValue.includes(item.toLowerCase()) || item.toLowerCase().includes(lowerValue));
}

/**
 * Circle of Competence Screen
 */
function evaluateCircleOfCompetence(metrics, profile, params) {
    const { includeSectors = [], excludeSectors = [], excludeIndustries = [] } = params;
    const reasons = [];
    
    if (!profile.sector && !profile.industry && (includeSectors.length > 0 || excludeSectors.length > 0 || excludeIndustries.length > 0)) {
        return new ScreenResult('NA', ['Missing sector/industry information']);
    }
    
    if (includeSectors.length > 0) {
        if (!profile.sector || !matchesList(profile.sector, includeSectors)) {
            return new ScreenResult('FAIL', [`Sector "${profile.sector || 'Unknown'}" not in included sectors`]);
        }
    }
    
    if (excludeSectors.length > 0 && profile.sector && matchesList(profile.sector, excludeSectors)) {
        return new ScreenResult('FAIL', [`Sector "${profile.sector}" is excluded`]);
    }
    
    if (excludeIndustries.length > 0 && profile.industry && matchesList(profile.industry, excludeIndustries)) {
        return new ScreenResult('FAIL', [`Industry "${profile.industry}" is excluded`]);
    }
    
    return new ScreenResult('PASS', ['Sector/industry within circle of competence']);
}

/**
 * Simple Business Screen
 */
function evaluateSimpleBusiness(metrics, profile, params) {
    const maxRdToRevenue = params.maxRdToRevenue !== undefined ? params.maxRdToRevenue : 0.08;
    const excludeSectors = Array.isArray(params.excludeSectors) ? params.excludeSectors : ['Biotechnology', 'Semiconductors'];
    const reasons = [];
    
    if (profile.sector && matchesList(profile.sector, excludeSectors)) {
        return new ScreenResult('FAIL', [`Sector "${profile.sector}" is excluded (complex business)`]);
    }
    
    if (metrics.rdToRevenue5yAvg === undefined || metrics.rdToRevenue5yAvg === null) {
        if (profile.sector && !matchesList(profile.sector, excludeSectors)) {
            return new ScreenResult('NA', ['Missing R&D to Revenue data']);
        }
        return new ScreenResult('FAIL', ['Missing R&D to Revenue data and sector may be complex']);
    }
    
    if (metrics.rdToRevenue5yAvg > maxRdToRevenue) {
        return new ScreenResult('FAIL', [`R&D to Revenue ${formatPercent(metrics.rdToRevenue5yAvg)} > ${formatPercent(maxRdToRevenue)} threshold`]);
    }
    
    return new ScreenResult('PASS', ['Simple business model']);
}

/**
 * Consistent Earning Power Screen
 */
function evaluateConsistentEarningPower(metrics, profile, params) {
    const { minPositiveNetIncomeYears5y = 4, minPositiveOperatingIncomeYears5y = 4 } = params;
    const reasons = [];
    
    if (metrics.netIncomePositiveYears5y === undefined || metrics.operatingIncomePositiveYears5y === undefined) {
        return new ScreenResult('NA', ['Missing income data']);
    }
    
    const netIncomePass = metrics.netIncomePositiveYears5y >= minPositiveNetIncomeYears5y;
    const operatingIncomePass = metrics.operatingIncomePositiveYears5y >= minPositiveOperatingIncomeYears5y;
    
    if (!netIncomePass) {
        reasons.push(`Net Income positive years: ${metrics.netIncomePositiveYears5y} < ${minPositiveNetIncomeYears5y} required`);
    }
    
    if (!operatingIncomePass) {
        reasons.push(`Operating Income positive years: ${metrics.operatingIncomePositiveYears5y} < ${minPositiveOperatingIncomeYears5y} required`);
    }
    
    if (netIncomePass && operatingIncomePass) {
        return new ScreenResult('PASS', ['Consistent earning power demonstrated']);
    }
    
    return new ScreenResult('FAIL', reasons);
}

/**
 * High Returns with Low/No Debt Screen
 */
function evaluateHighReturnsLowDebt(metrics, profile, params) {
    const { 
        minRoe5yAvg = 0.15, 
        minRoic5yAvg = 0.12, 
        maxDebtToEquity = 0.75, 
        minInterestCoverage = 5 
    } = params;
    const reasons = [];
    let hasRequiredData = false;
    
    if (metrics.roe5yAvg !== undefined && metrics.roe5yAvg !== null) {
        hasRequiredData = true;
        if (metrics.roe5yAvg < minRoe5yAvg) {
            reasons.push(`ROE 5Y Avg ${formatPercent(metrics.roe5yAvg)} < ${formatPercent(minRoe5yAvg)} threshold`);
        }
    }
    
    if (metrics.roic5yAvg !== undefined && metrics.roic5yAvg !== null) {
        hasRequiredData = true;
        if (metrics.roic5yAvg < minRoic5yAvg) {
            reasons.push(`ROIC 5Y Avg ${formatPercent(metrics.roic5yAvg)} < ${formatPercent(minRoic5yAvg)} threshold`);
        }
    }
    
    if (metrics.debtToEquity !== undefined && metrics.debtToEquity !== null) {
        hasRequiredData = true;
        if (metrics.debtToEquity > maxDebtToEquity) {
            reasons.push(`Debt to Equity ${formatPercent(metrics.debtToEquity)} > ${formatPercent(maxDebtToEquity)} threshold`);
        }
    }
    
    if (metrics.interestCoverage !== undefined && metrics.interestCoverage !== null) {
        hasRequiredData = true;
        if (metrics.interestCoverage < minInterestCoverage) {
            reasons.push(`Interest Coverage ${metrics.interestCoverage.toFixed(1)}x < ${minInterestCoverage}x threshold`);
        }
    }
    
    if (!hasRequiredData) {
        return new ScreenResult('NA', ['Missing required return and debt metrics']);
    }
    
    if (reasons.length === 0) {
        return new ScreenResult('PASS', ['High returns with low/no debt']);
    }
    
    return new ScreenResult('FAIL', reasons);
}

/**
 * Moat Proxies Screen
 */
function evaluateMoatProxies(metrics, profile, params) {
    const { 
        minRoic5yAvg = 0.12, 
        minOperatingMargin5yAvg = 0.12, 
        maxOperatingMargin5yStd = 0.05, 
        maxGrossMargin5yStd = 0.05 
    } = params;
    const reasons = [];
    
    if (metrics.operatingMargin5yStd === undefined && metrics.grossMargin5yStd === undefined) {
        return new ScreenResult('NA', ['Missing margin standard deviation data']);
    }
    
    if (metrics.roic5yAvg !== undefined && metrics.roic5yAvg !== null) {
        if (metrics.roic5yAvg < minRoic5yAvg) {
            reasons.push(`ROIC 5Y Avg ${formatPercent(metrics.roic5yAvg)} < ${formatPercent(minRoic5yAvg)} threshold`);
        }
    }
    
    if (metrics.operatingMargin5yAvg !== undefined && metrics.operatingMargin5yAvg !== null) {
        if (metrics.operatingMargin5yAvg < minOperatingMargin5yAvg) {
            reasons.push(`Operating Margin 5Y Avg ${formatPercent(metrics.operatingMargin5yAvg)} < ${formatPercent(minOperatingMargin5yAvg)} threshold`);
        }
    }
    
    if (metrics.operatingMargin5yStd !== undefined && metrics.operatingMargin5yStd !== null) {
        if (metrics.operatingMargin5yStd > maxOperatingMargin5yStd) {
            reasons.push(`Operating Margin 5Y Std ${formatPercent(metrics.operatingMargin5yStd)} > ${formatPercent(maxOperatingMargin5yStd)} threshold`);
        }
    }
    
    if (metrics.grossMargin5yStd !== undefined && metrics.grossMargin5yStd !== null) {
        if (metrics.grossMargin5yStd > maxGrossMargin5yStd) {
            reasons.push(`Gross Margin 5Y Std ${formatPercent(metrics.grossMargin5yStd)} > ${formatPercent(maxGrossMargin5yStd)} threshold`);
        }
    }
    
    if (reasons.length === 0) {
        return new ScreenResult('PASS', ['Strong moat proxies demonstrated']);
    }
    
    return new ScreenResult('FAIL', reasons);
}

/**
 * Owner Earnings / Cash Generation Screen
 */
function evaluateOwnerEarnings(metrics, profile, params) {
    const { 
        minFcfPositiveYears5y = 4, 
        minFcfMargin5yAvg = 0.05, 
        maxCapexToCfo5yAvg = 0.6 
    } = params;
    const reasons = [];
    
    if (metrics.fcf5yPositiveYears === undefined && metrics.fcfMargin5yAvg === undefined && metrics.capexToCfo5yAvg === undefined) {
        return new ScreenResult('NA', ['Missing free cash flow data']);
    }
    
    if (metrics.fcf5yPositiveYears !== undefined && metrics.fcf5yPositiveYears !== null) {
        if (metrics.fcf5yPositiveYears < minFcfPositiveYears5y) {
            reasons.push(`FCF Positive Years: ${metrics.fcf5yPositiveYears} < ${minFcfPositiveYears5y} required`);
        }
    }
    
    if (metrics.fcfMargin5yAvg !== undefined && metrics.fcfMargin5yAvg !== null) {
        if (metrics.fcfMargin5yAvg < minFcfMargin5yAvg) {
            reasons.push(`FCF Margin 5Y Avg ${formatPercent(metrics.fcfMargin5yAvg)} < ${formatPercent(minFcfMargin5yAvg)} threshold`);
        }
    }
    
    if (metrics.capexToCfo5yAvg !== undefined && metrics.capexToCfo5yAvg !== null) {
        if (metrics.capexToCfo5yAvg > maxCapexToCfo5yAvg) {
            reasons.push(`CapEx to CFO 5Y Avg ${formatPercent(metrics.capexToCfo5yAvg)} > ${formatPercent(maxCapexToCfo5yAvg)} threshold`);
        }
    }
    
    if (reasons.length === 0) {
        return new ScreenResult('PASS', ['Strong cash generation']);
    }
    
    return new ScreenResult('FAIL', reasons);
}

/**
 * Intrinsic Value vs Price Screen (Quick Check)
 */
function evaluateIntrinsicValueQuick(metrics, profile, params) {
    // This is a simplified check - full DCF is done client-side
    if (!metrics.fcfTtm || !metrics.sharesOutstanding || !metrics.price) {
        return new ScreenResult('NA', ['Missing FCF, shares, or price data for intrinsic value calculation']);
    }
    
    // Simple check: if FCF yield is reasonable
    const fcfPerShare = metrics.fcfTtm / metrics.sharesOutstanding;
    const fcfYield = fcfPerShare / metrics.price;
    
    if (fcfYield > 0.05) { // 5% FCF yield
        return new ScreenResult('PASS', [`FCF Yield ${formatPercent(fcfYield)} suggests reasonable valuation`]);
    }
    
    return new ScreenResult('FAIL', [`FCF Yield ${formatPercent(fcfYield)} may indicate overvaluation`]);
}

/**
 * All Buffett-Inspired Screens
 */
export const BUFFETT_SCREENS = [
    new Screen(
        'circleOfCompetence',
        'Circle of Competence',
        'Focus on businesses you understand. Filter by sector/industry.',
        { includeSectors: [], excludeSectors: [], excludeIndustries: [] },
        evaluateCircleOfCompetence
    ),
    new Screen(
        'simpleBusiness',
        'Simple Business',
        'Avoid complex businesses with high R&D requirements.',
        { maxRdToRevenue: 0.08, excludeSectors: ['Biotechnology', 'Semiconductors'] },
        evaluateSimpleBusiness
    ),
    new Screen(
        'consistentEarningPower',
        'Consistent Earning Power',
        'Look for companies with consistent profitability.',
        { minPositiveNetIncomeYears5y: 4, minPositiveOperatingIncomeYears5y: 4 },
        evaluateConsistentEarningPower
    ),
    new Screen(
        'highReturnsLowDebt',
        'High Returns with Low/No Debt',
        'Strong returns on equity and capital with minimal debt.',
        { minRoe5yAvg: 0.15, minRoic5yAvg: 0.12, maxDebtToEquity: 0.75, minInterestCoverage: 5 },
        evaluateHighReturnsLowDebt
    ),
    new Screen(
        'moatProxies',
        'Moat Proxies',
        'Sustainable competitive advantages reflected in consistent margins.',
        { minRoic5yAvg: 0.12, minOperatingMargin5yAvg: 0.12, maxOperatingMargin5yStd: 0.05, maxGrossMargin5yStd: 0.05 },
        evaluateMoatProxies
    ),
    new Screen(
        'ownerEarnings',
        'Owner Earnings / Cash Generation',
        'Strong free cash flow generation with reasonable capital requirements.',
        { minFcfPositiveYears5y: 4, minFcfMargin5yAvg: 0.05, maxCapexToCfo5yAvg: 0.6 },
        evaluateOwnerEarnings
    ),
    new Screen(
        'intrinsicValue',
        'Intrinsic Value vs Price (Quick Check)',
        'Basic valuation check. Use DCF panel for detailed analysis.',
        {},
        evaluateIntrinsicValueQuick
    )
];

/**
 * Get screen by ID
 */
export function getScreenById(screenId) {
    return BUFFETT_SCREENS.find(s => s.id === screenId);
}

