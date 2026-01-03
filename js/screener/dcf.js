// DCF (Discounted Cash Flow) Calculator

/**
 * Calculate intrinsic value using DCF
 * @param {Object} params - DCF parameters
 * @param {number} params.fcf0 - Free cash flow for year 0 (TTM)
 * @param {number} params.sharesOutstanding - Number of shares outstanding
 * @param {number} params.discountRate - Discount rate (e.g., 0.10 for 10%)
 * @param {number} params.growthRateYears1to5 - Growth rate for years 1-5
 * @param {number} params.growthRateYears6to10 - Growth rate for years 6-10
 * @param {number} params.terminalGrowthRate - Terminal growth rate
 * @returns {Object} DCF result
 */
export function calculateDCF(params) {
    const {
        fcf0,
        sharesOutstanding,
        discountRate = 0.10,
        growthRateYears1to5 = 0.06,
        growthRateYears6to10 = 0.03,
        terminalGrowthRate = 0.02
    } = params;
    
    if (!fcf0 || !sharesOutstanding || fcf0 <= 0 || sharesOutstanding <= 0) {
        return {
            error: 'Insufficient data for DCF calculation',
            intrinsicValue: null,
            intrinsicValuePerShare: null,
            presentValues: [],
            terminalValue: null
        };
    }
    
    const presentValues = [];
    let fcf = fcf0;
    
    // Years 1-5
    for (let year = 1; year <= 5; year++) {
        fcf = fcf * (1 + growthRateYears1to5);
        const pv = fcf / Math.pow(1 + discountRate, year);
        presentValues.push({
            year,
            fcf,
            presentValue: pv
        });
    }
    
    // Years 6-10
    for (let year = 6; year <= 10; year++) {
        fcf = fcf * (1 + growthRateYears6to10);
        const pv = fcf / Math.pow(1 + discountRate, year);
        presentValues.push({
            year,
            fcf,
            presentValue: pv
        });
    }
    
    // Terminal value (using year 10 FCF)
    const fcf10 = presentValues[presentValues.length - 1].fcf;
    const terminalValue = (fcf10 * (1 + terminalGrowthRate)) / (discountRate - terminalGrowthRate);
    const terminalValuePV = terminalValue / Math.pow(1 + discountRate, 10);
    
    // Total equity value
    const totalPV = presentValues.reduce((sum, pv) => sum + pv.presentValue, 0) + terminalValuePV;
    const intrinsicValuePerShare = totalPV / sharesOutstanding;
    
    return {
        error: null,
        intrinsicValue: totalPV,
        intrinsicValuePerShare,
        presentValues,
        terminalValue,
        terminalValuePV,
        fcf0,
        fcf10
    };
}

/**
 * Check margin of safety
 * @param {number} price - Current stock price
 * @param {number} intrinsicValuePerShare - Intrinsic value per share
 * @param {number} marginOfSafety - Margin of safety (e.g., 0.25 for 25%)
 * @returns {Object} Margin of safety result
 */
export function checkMarginOfSafety(price, intrinsicValuePerShare, marginOfSafety = 0.25) {
    if (!price || !intrinsicValuePerShare || price <= 0 || intrinsicValuePerShare <= 0) {
        return {
            pass: false,
            reason: 'Missing price or intrinsic value data'
        };
    }
    
    const targetPrice = intrinsicValuePerShare * (1 - marginOfSafety);
    const pass = price <= targetPrice;
    const discount = ((intrinsicValuePerShare - price) / intrinsicValuePerShare) * 100;
    
    return {
        pass,
        targetPrice,
        discount,
        marginOfSafety,
        reason: pass 
            ? `Price is below target (${discount.toFixed(1)}% discount)`
            : `Price exceeds target by ${((price - targetPrice) / targetPrice * 100).toFixed(1)}%`
    };
}

