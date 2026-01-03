// Stock Screener Type Definitions

/**
 * Company Profile
 */
export class CompanyProfile {
    constructor(data = {}) {
        this.ticker = data.ticker || '';
        this.name = data.name || '';
        this.sector = data.sector;
        this.industry = data.industry;
        this.currency = data.currency || 'USD';
        this.price = data.price;
        this.marketCap = data.marketCap;
        this.sharesOutstanding = data.sharesOutstanding;
    }
}

/**
 * Company Metrics (all numbers as raw decimals, e.g. 0.15 for 15%)
 */
export class CompanyMetrics {
    constructor(data = {}) {
        this.asOf = data.asOf || new Date().toISOString();
        this.roe5yAvg = data.roe5yAvg;
        this.roic5yAvg = data.roic5yAvg;
        this.debtToEquity = data.debtToEquity;
        this.interestCoverage = data.interestCoverage;
        this.netDebtToEbitda = data.netDebtToEbitda;
        this.grossMargin5yAvg = data.grossMargin5yAvg;
        this.grossMargin5yStd = data.grossMargin5yStd;
        this.operatingMargin5yAvg = data.operatingMargin5yAvg;
        this.operatingMargin5yStd = data.operatingMargin5yStd;
        this.fcf5yPositiveYears = data.fcf5yPositiveYears;
        this.fcf5yAvg = data.fcf5yAvg;
        this.fcfMargin5yAvg = data.fcfMargin5yAvg;
        this.capexToCfo5yAvg = data.capexToCfo5yAvg;
        this.netIncomePositiveYears5y = data.netIncomePositiveYears5y;
        this.operatingIncomePositiveYears5y = data.operatingIncomePositiveYears5y;
        this.revenueCagr5y = data.revenueCagr5y;
        this.rdToRevenue5yAvg = data.rdToRevenue5yAvg;
        this.ownerEarningsProxy5yAvg = data.ownerEarningsProxy5yAvg;
        this.fcfTtm = data.fcfTtm;
        this.price = data.price;
        this.sharesOutstanding = data.sharesOutstanding;
    }
}

/**
 * Screen Result
 */
export class ScreenResult {
    constructor(status, reasons = []) {
        this.status = status; // 'PASS' | 'FAIL' | 'NA'
        this.reasons = reasons; // string[]
    }
}

/**
 * Company Screener Result
 */
export class CompanyScreenerResult {
    constructor(ticker, profile, metrics, screenResults = {}) {
        this.ticker = ticker;
        this.profile = profile;
        this.metrics = metrics;
        this.screenResults = screenResults; // Record<screenId, ScreenResult>
        this.overall = 'FAIL'; // Will be calculated
    }
}

