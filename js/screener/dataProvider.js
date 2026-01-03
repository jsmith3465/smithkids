// Data Provider Interface and Implementations

import { CompanyProfile, CompanyMetrics } from './types.js';

/**
 * Data Provider Interface
 */
export class DataProvider {
    async getCompanyProfile(ticker) {
        throw new Error('Not implemented');
    }
    
    async getCompanyMetrics(ticker) {
        throw new Error('Not implemented');
    }
    
    async searchTicker(query) {
        throw new Error('Not implemented');
    }
}

/**
 * Mock Data Provider (always available)
 */
export class MockProvider extends DataProvider {
    constructor() {
        super();
        // Sample data for common tickers
        this.mockData = {
            'AAPL': {
                profile: {
                    ticker: 'AAPL',
                    name: 'Apple Inc.',
                    sector: 'Technology',
                    industry: 'Consumer Electronics',
                    currency: 'USD',
                    price: 175.50,
                    marketCap: 2800000000000,
                    sharesOutstanding: 15950000000
                },
                metrics: {
                    asOf: new Date().toISOString(),
                    roe5yAvg: 0.85,
                    roic5yAvg: 0.45,
                    debtToEquity: 1.75,
                    interestCoverage: 25.5,
                    netDebtToEbitda: 0.5,
                    grossMargin5yAvg: 0.38,
                    grossMargin5yStd: 0.02,
                    operatingMargin5yAvg: 0.28,
                    operatingMargin5yStd: 0.015,
                    fcf5yPositiveYears: 5,
                    fcf5yAvg: 85000000000,
                    fcfMargin5yAvg: 0.25,
                    capexToCfo5yAvg: 0.15,
                    netIncomePositiveYears5y: 5,
                    operatingIncomePositiveYears5y: 5,
                    revenueCagr5y: 0.08,
                    rdToRevenue5yAvg: 0.06,
                    ownerEarningsProxy5yAvg: 90000000000,
                    fcfTtm: 95000000000,
                    price: 175.50,
                    sharesOutstanding: 15950000000
                }
            },
            'MSFT': {
                profile: {
                    ticker: 'MSFT',
                    name: 'Microsoft Corporation',
                    sector: 'Technology',
                    industry: 'Software',
                    currency: 'USD',
                    price: 380.25,
                    marketCap: 2800000000000,
                    sharesOutstanding: 7400000000
                },
                metrics: {
                    asOf: new Date().toISOString(),
                    roe5yAvg: 0.35,
                    roic5yAvg: 0.28,
                    debtToEquity: 0.45,
                    interestCoverage: 18.2,
                    netDebtToEbitda: -0.2,
                    grossMargin5yAvg: 0.68,
                    grossMargin5yStd: 0.01,
                    operatingMargin5yAvg: 0.38,
                    operatingMargin5yStd: 0.02,
                    fcf5yPositiveYears: 5,
                    fcf5yAvg: 55000000000,
                    fcfMargin5yAvg: 0.32,
                    capexToCfo5yAvg: 0.25,
                    netIncomePositiveYears5y: 5,
                    operatingIncomePositiveYears5y: 5,
                    revenueCagr5y: 0.12,
                    rdToRevenue5yAvg: 0.13,
                    ownerEarningsProxy5yAvg: 60000000000,
                    fcfTtm: 65000000000,
                    price: 380.25,
                    sharesOutstanding: 7400000000
                }
            },
            'KO': {
                profile: {
                    ticker: 'KO',
                    name: 'The Coca-Cola Company',
                    sector: 'Consumer Defensive',
                    industry: 'Beverages - Non-Alcoholic',
                    currency: 'USD',
                    price: 60.50,
                    marketCap: 260000000000,
                    sharesOutstanding: 4300000000
                },
                metrics: {
                    asOf: new Date().toISOString(),
                    roe5yAvg: 0.42,
                    roic5yAvg: 0.15,
                    debtToEquity: 1.25,
                    interestCoverage: 8.5,
                    netDebtToEbitda: 2.1,
                    grossMargin5yAvg: 0.60,
                    grossMargin5yStd: 0.01,
                    operatingMargin5yAvg: 0.28,
                    operatingMargin5yStd: 0.02,
                    fcf5yPositiveYears: 5,
                    fcf5yAvg: 9000000000,
                    fcfMargin5yAvg: 0.22,
                    capexToCfo5yAvg: 0.12,
                    netIncomePositiveYears5y: 5,
                    operatingIncomePositiveYears5y: 5,
                    revenueCagr5y: 0.03,
                    rdToRevenue5yAvg: 0.01,
                    ownerEarningsProxy5yAvg: 9500000000,
                    fcfTtm: 10000000000,
                    price: 60.50,
                    sharesOutstanding: 4300000000
                }
            }
        };
    }
    
    async getCompanyProfile(ticker) {
        const normalized = ticker.toUpperCase().trim();
        const data = this.mockData[normalized];
        
        if (data) {
            return new CompanyProfile(data.profile);
        }
        
        // Return minimal profile for unknown tickers
        return new CompanyProfile({
            ticker: normalized,
            name: `${normalized} Corporation`,
            sector: 'Unknown',
            industry: 'Unknown',
            currency: 'USD',
            price: 50.00,
            marketCap: 1000000000,
            sharesOutstanding: 20000000
        });
    }
    
    async getCompanyMetrics(ticker) {
        const normalized = ticker.toUpperCase().trim();
        const data = this.mockData[normalized];
        
        if (data) {
            return new CompanyMetrics(data.metrics);
        }
        
        // Return minimal metrics for unknown tickers (mostly undefined)
        return new CompanyMetrics({
            asOf: new Date().toISOString(),
            price: 50.00,
            sharesOutstanding: 20000000
        });
    }
    
    async searchTicker(query) {
        const normalized = query.toUpperCase().trim();
        
        // Simple mock search
        const matches = Object.keys(this.mockData).filter(ticker => 
            ticker.includes(normalized) || 
            this.mockData[ticker].profile.name.toUpperCase().includes(normalized)
        );
        
        return matches.map(ticker => ({
            symbol: ticker,
            name: this.mockData[ticker].profile.name
        }));
    }
}

/**
 * Real Data Provider (Financial Modeling Prep)
 */
export class FMPProvider extends DataProvider {
    constructor(apiKey) {
        super();
        this.apiKey = apiKey;
        this.baseUrl = 'https://financialmodelingprep.com/api/v3';
    }
    
    async fetchAPI(endpoint) {
        try {
            const url = `${this.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}apikey=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('FMP API error:', error);
            throw error;
        }
    }
    
    async getCompanyProfile(ticker) {
        try {
            const [profileData, quoteData] = await Promise.all([
                this.fetchAPI(`/profile/${ticker}`),
                this.fetchAPI(`/quote/${ticker}`)
            ]);
            
            const profile = profileData[0] || {};
            const quote = quoteData[0] || {};
            
            return new CompanyProfile({
                ticker: ticker.toUpperCase(),
                name: profile.companyName || profile.name || ticker,
                sector: profile.sector,
                industry: profile.industry,
                currency: profile.currency || 'USD',
                price: quote.price || profile.price,
                marketCap: profile.mktCap,
                sharesOutstanding: profile.sharesOutstanding
            });
        } catch (error) {
            console.error(`Error fetching profile for ${ticker}:`, error);
            // Fallback to minimal profile
            return new CompanyProfile({
                ticker: ticker.toUpperCase(),
                name: `${ticker} Corporation`,
                currency: 'USD'
            });
        }
    }
    
    async getCompanyMetrics(ticker) {
        try {
            // Fetch various metrics from FMP
            const [ratios, keyMetrics, incomeStatements, cashFlowStatements] = await Promise.all([
                this.fetchAPI(`/ratios/${ticker}`).catch(() => []),
                this.fetchAPI(`/key-metrics/${ticker}`).catch(() => []),
                this.fetchAPI(`/income-statement/${ticker}?limit=5`).catch(() => []),
                this.fetchAPI(`/cash-flow-statement/${ticker}?limit=5`).catch(() => [])
            ]);
            
            // Extract and calculate metrics
            const latestRatios = ratios[0] || {};
            const latestMetrics = keyMetrics[0] || {};
            const quote = await this.fetchAPI(`/quote/${ticker}`).catch(() => []);
            const currentPrice = quote[0]?.price;
            
            // Calculate averages and other metrics
            const metrics = new CompanyMetrics({
                asOf: new Date().toISOString(),
                price: currentPrice,
                sharesOutstanding: latestMetrics.sharesOutstanding,
                roe5yAvg: this.calculateAverage(ratios.slice(0, 5), 'returnOnEquity'),
                roic5yAvg: this.calculateAverage(ratios.slice(0, 5), 'returnOnInvestedCapital'),
                debtToEquity: latestRatios.debtEquityRatio,
                interestCoverage: latestRatios.interestCoverage,
                grossMargin5yAvg: this.calculateAverage(incomeStatements.slice(0, 5), 'grossProfitRatio'),
                operatingMargin5yAvg: this.calculateAverage(incomeStatements.slice(0, 5), 'operatingIncomeRatio'),
                fcfTtm: this.calculateFCF(cashFlowStatements.slice(0, 4)),
                rdToRevenue5yAvg: this.calculateAverage(incomeStatements.slice(0, 5), 'researchAndDevelopmentToRevenue')
            });
            
            return metrics;
        } catch (error) {
            console.error(`Error fetching metrics for ${ticker}:`, error);
            return new CompanyMetrics({
                asOf: new Date().toISOString()
            });
        }
    }
    
    calculateAverage(data, field) {
        if (!data || data.length === 0) return undefined;
        const values = data.map(d => d[field]).filter(v => v !== undefined && v !== null);
        if (values.length === 0) return undefined;
        return values.reduce((sum, v) => sum + v, 0) / values.length;
    }
    
    calculateFCF(cashFlowStatements) {
        if (!cashFlowStatements || cashFlowStatements.length === 0) return undefined;
        // Sum operating cash flow - capital expenditures for TTM
        let total = 0;
        for (const cfs of cashFlowStatements) {
            const ocf = cfs.operatingCashFlow || 0;
            const capex = Math.abs(cfs.capitalExpenditure || 0);
            total += ocf - capex;
        }
        return total > 0 ? total : undefined;
    }
    
    async searchTicker(query) {
        try {
            const results = await this.fetchAPI(`/search?query=${encodeURIComponent(query)}&limit=10`);
            return results.map(item => ({
                symbol: item.symbol,
                name: item.name
            }));
        } catch (error) {
            console.error('Error searching ticker:', error);
            return [];
        }
    }
}

/**
 * Get data provider based on environment
 */
export function getDataProvider() {
    // In browser environment, we'll use a simple approach
    // For production, this could check environment variables via an API endpoint
    const providerType = 'mock'; // Default to mock
    
    if (providerType === 'fmp') {
        // Would need API key from server/config
        // For now, return mock
        return new MockProvider();
    }
    
    return new MockProvider();
}

