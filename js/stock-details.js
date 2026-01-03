// Stock Details Page

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ALPHA_VANTAGE_API_KEY = 'IJJQBBYU0ZUE20RQ';

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return pageName.startsWith('pages/') ? pageName : `pages/${pageName}`;
    }
    return pageName;
}

let currentUserUid = null;
let currentTicker = null;
let priceChart = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const checkAuth = setInterval(() => {
            if (window.authStatus) {
                clearInterval(checkAuth);
                if (window.authStatus.isAuthenticated) {
                    checkUserAccess();
                } else {
                    window.location.href = getPagePath('login.html');
                }
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkAuth);
            if (!window.authStatus) {
                window.location.href = getPagePath('login.html');
            }
        }, 5000);
    }, 200);
});

async function checkUserAccess() {
    const session = window.authStatus?.getSession();
    if (!session) {
        window.location.href = getPagePath('login.html');
        return;
    }
    
    currentUserUid = session.uid;
    
    // Get ticker from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const ticker = urlParams.get('ticker') || urlParams.get('symbol');
    
    if (!ticker) {
        document.getElementById('mainContent').innerHTML = '<div style="color: #dc3545; padding: 40px;">No stock symbol provided. Please go back and select a stock.</div>';
        return;
    }
    
    currentTicker = ticker.toUpperCase();
    
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    if (!authCheck || !mainContent) {
        console.error('Required DOM elements not found');
        return;
    }
    
    authCheck.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    try {
        setupEventListeners();
        await loadStockDetails(currentTicker);
        await loadPriceChart(currentTicker, '1mo'); // Load default 1 month chart
    } catch (error) {
        console.error('Error loading stock details:', error);
    }
}

function setupEventListeners() {
    const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');
    const addToPortfolioBtn = document.getElementById('addToPortfolioBtn');
    
    if (addToWatchlistBtn) {
        addToWatchlistBtn.addEventListener('click', () => addToWatchlistFromDetails());
    }
    
    if (addToPortfolioBtn) {
        addToPortfolioBtn.addEventListener('click', () => addToPortfolioFromDetails());
    }
    
    // Chart period buttons
    const periodButtons = document.querySelectorAll('.chart-period-btn');
    periodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            periodButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const period = btn.getAttribute('data-period');
            loadPriceChart(currentTicker, period);
        });
    });
}

// Load comprehensive stock details
async function loadStockDetails(ticker) {
    try {
        console.log('Loading stock details for:', ticker);
        
        // Get quote data first (most important)
        let quoteData = await getStockQuote(ticker);
        console.log('Quote data received:', quoteData);
        
        // If quote data is null or missing price, show error
        if (!quoteData || (!quoteData.price && quoteData.price !== 0)) {
            throw new Error('Unable to fetch stock price data. Please check the ticker symbol and try again.');
        }
        
        // Get overview data (can be empty, that's okay)
        let overviewData = {};
        try {
            overviewData = await getStockOverview(ticker);
            console.log('Overview data received:', overviewData);
        } catch (overviewError) {
            console.warn('Overview data not available, continuing with quote data only:', overviewError);
        }
        
        // Combine data (quote data takes precedence)
        const stockData = {
            ...overviewData,
            ...quoteData  // Quote data overrides overview data for price info
        };
        
        console.log('Combined stock data:', stockData);
        
        // Update header
        updateStockHeader(stockData);
        
        // Update metrics
        updateStockMetrics(stockData);
        
        // Update info section
        updateStockInfo(stockData);
        
        // Show action buttons and check watchlist status
        const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');
        const addToPortfolioBtn = document.getElementById('addToPortfolioBtn');
        if (addToWatchlistBtn) {
            addToWatchlistBtn.style.display = 'inline-block';
            await checkWatchlistStatus();
        }
        if (addToPortfolioBtn) addToPortfolioBtn.style.display = 'inline-block';
        
    } catch (error) {
        console.error('Error loading stock details:', error);
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="color: #dc3545; padding: 40px; text-align: center;">
                    <h3>Error loading stock details</h3>
                    <p>${error.message || 'Please try again.'}</p>
                    <a href="wall-street-warrior.html" class="back-button" style="margin-top: 20px; display: inline-block;">Go Back</a>
                </div>
            `;
        }
    }
}

// Get stock overview (company information)
async function getStockOverview(ticker) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();
        
        console.log('Alpha Vantage OVERVIEW response:', data);
        
        // Check for API errors
        if (data['Error Message']) {
            console.error('Alpha Vantage error:', data['Error Message']);
            return {};
        }
        
        if (data['Note']) {
            console.warn('Alpha Vantage rate limit:', data['Note']);
            return {};
        }
        
        // Return all available fields from the API (even if Symbol is missing, some data might be available)
        const overview = {
            name: data.Name || null,
            description: data.Description || null,
            sector: data.Sector || null,
            industry: data.Industry || null,
            marketCap: data.MarketCapitalization || null,
            peRatio: data.PERatio || null,
            forwardPE: data.ForwardPE || null,
            pegRatio: data.PEGRatio || null,
            eps: data.EPS || null,
            epsForward: data.EPSForward || null,
            dividendYield: data.DividendYield || null,
            dividendPerShare: data.DividendPerShare || null,
            dividendDate: data.DividendDate || null,
            exDividendDate: data.ExDividendDate || null,
            payoutRatio: data.PayoutRatio || null,
            beta: data.Beta || null,
            fiftyTwoWeekHigh: data['52WeekHigh'] || null,
            fiftyTwoWeekLow: data['52WeekLow'] || null,
            revenue: data.RevenueTTM || null,
            revenuePerShare: data.RevenuePerShareTTM || null,
            quarterlyRevenueGrowth: data.QuarterlyRevenueGrowthYOY || null,
            grossProfit: data.GrossProfitTTM || null,
            profitMargin: data.ProfitMargin || null,
            operatingMargin: data.OperatingMarginTTM || null,
            ebitda: data.EBITDA || null,
            ebitdaPerShare: data.EBITDA || null,
            bookValue: data.BookValue || null,
            priceToBook: data.PriceToBookRatio || null,
            priceToSales: data.PriceToSalesRatioTTM || null,
            evToRevenue: data.EVToRevenue || null,
            evToEBITDA: data.EVToEBITDA || null,
            returnOnAssets: data.ReturnOnAssetsTTM || null,
            returnOnEquity: data.ReturnOnEquityTTM || null,
            returnOnInvestment: data.ReturnOnInvestmentTTM || null,
            quarterlyEarningsGrowth: data.QuarterlyEarningsGrowthYOY || null,
            sharesOutstanding: data.SharesOutstanding || null,
            floatShares: data.SharesFloat || null,
            sharesShort: data.SharesShort || null,
            sharesShortPriorMonth: data.SharesShortPriorMonth || null,
            shortRatio: data.ShortRatio || null,
            shortPercentOutstanding: data.ShortPercentOutstanding || null,
            shortPercentFloat: data.ShortPercentFloat || null,
            percentInsiders: data.PercentInsiders || null,
            percentInstitutions: data.PercentInstitutions || null,
            forwardAnnualDividendRate: data.ForwardAnnualDividendRate || null,
            forwardAnnualDividendYield: data.ForwardAnnualDividendYield || null,
            trailingAnnualDividendRate: data.TrailingAnnualDividendRate || null,
            trailingAnnualDividendYield: data.TrailingAnnualDividendYield || null,
            fiveYearAverageDividendYield: data.FiveYearAverageDividendYield || null,
            analystTargetPrice: data.AnalystTargetPrice || null,
            analystRatingStrongBuy: data.AnalystRatingStrongBuy || null,
            analystRatingBuy: data.AnalystRatingBuy || null,
            analystRatingHold: data.AnalystRatingHold || null,
            analystRatingSell: data.AnalystRatingSell || null,
            analystRatingStrongSell: data.AnalystRatingStrongSell || null,
            currency: data.Currency || null,
            exchange: data.Exchange || null,
            fiscalYearEnd: data.FiscalYearEnd || null,
            latestQuarter: data.LatestQuarter || null,
            assetType: data.AssetType || null
        };
        
        console.log('Processed overview data:', overview);
        return overview;
        
    } catch (error) {
        console.error('Error fetching stock overview:', error);
        return {};
    }
}

// Get stock quote (current price data)
async function getStockQuote(ticker) {
    try {
        // Try Yahoo Finance first (more reliable)
        const yahooData = await getYahooFinanceQuote(ticker);
        if (yahooData && yahooData.price) {
            console.log('Using Yahoo Finance quote data for', ticker);
            return yahooData;
        }
        
        // Fallback to Alpha Vantage
        console.log('Trying Alpha Vantage for', ticker);
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();
        
        console.log('Alpha Vantage response:', data);
        
        if (data['Global Quote'] && data['Global Quote']['01. symbol']) {
            const quote = data['Global Quote'];
            const result = {
                symbol: quote['01. symbol'],
                price: parseFloat(quote['05. price']),
                change: parseFloat(quote['09. change']),
                changePercent: quote['10. change percent'],
                volume: quote['06. volume'],
                previousClose: parseFloat(quote['08. previous close']),
                open: parseFloat(quote['02. open']),
                high: parseFloat(quote['03. high']),
                low: parseFloat(quote['04. low'])
            };
            console.log('Alpha Vantage quote result:', result);
            return result;
        }
        
        // If Alpha Vantage fails, try Yahoo Finance again
        console.log('Alpha Vantage failed, trying Yahoo Finance again');
        return await getYahooFinanceQuote(ticker);
        
    } catch (error) {
        console.error('Error fetching stock quote:', error);
        // Final fallback to Yahoo Finance
        return await getYahooFinanceQuote(ticker);
    }
}

// Get quote from Yahoo Finance
async function getYahooFinanceQuote(ticker) {
    try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
        console.log('Fetching Yahoo Finance quote from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Yahoo Finance response not OK:', response.status, response.statusText);
            return null;
        }
        
        const data = await response.json();
        console.log('Yahoo Finance response:', data);
        
        if (data.chart && data.chart.result && data.chart.result[0]) {
            const result = data.chart.result[0];
            const meta = result.meta;
            
            if (meta && meta.regularMarketPrice !== undefined) {
                const currentPrice = meta.regularMarketPrice;
                const previousClose = meta.previousClose || currentPrice;
                const change = currentPrice - previousClose;
                const changePercent = previousClose > 0 ? ((change / previousClose) * 100).toFixed(2) : '0.00';
                
                const quoteData = {
                    symbol: meta.symbol || ticker,
                    name: meta.longName || meta.shortName || meta.displayName || ticker,
                    price: currentPrice,
                    change: change,
                    changePercent: `${changePercent}%`,
                    volume: meta.regularMarketVolume || meta.volume || 0,
                    previousClose: previousClose,
                    open: meta.regularMarketOpen || meta.previousClose || currentPrice,
                    high: meta.regularMarketDayHigh || meta.regularMarketPrice || currentPrice,
                    low: meta.regularMarketDayLow || meta.regularMarketPrice || currentPrice
                };
                
                console.log('Yahoo Finance quote data:', quoteData);
                return quoteData;
            } else {
                console.warn('Yahoo Finance meta missing regularMarketPrice');
            }
        } else {
            console.warn('Yahoo Finance chart result missing or empty');
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching Yahoo Finance quote:', error);
        return null;
    }
}

// Update stock header
function updateStockHeader(stockData) {
    const symbolEl = document.getElementById('stockSymbol');
    const nameEl = document.getElementById('stockName');
    const priceEl = document.getElementById('stockPrice');
    const changeEl = document.getElementById('stockChange');
    
    console.log('Updating stock header with data:', stockData);
    
    if (symbolEl) symbolEl.textContent = stockData.symbol || currentTicker;
    if (nameEl) nameEl.textContent = stockData.name || currentTicker;
    
    if (priceEl) {
        if (stockData.price && !isNaN(stockData.price)) {
            priceEl.textContent = `$${stockData.price.toFixed(2)}`;
            priceEl.className = `stock-price-large ${stockData.change >= 0 ? 'positive' : 'negative'}`;
        } else {
            priceEl.textContent = 'Loading...';
            priceEl.className = 'stock-price-large';
        }
    }
    
    if (changeEl) {
        if (stockData.change !== undefined && !isNaN(stockData.change)) {
            const isPositive = stockData.change >= 0;
            changeEl.textContent = `${isPositive ? '+' : ''}$${stockData.change.toFixed(2)} (${stockData.changePercent || '0.00%'})`;
            changeEl.className = `stock-change ${isPositive ? 'positive' : 'negative'}`;
        } else {
            changeEl.textContent = 'Loading...';
            changeEl.className = 'stock-change';
        }
    }
}

// Update stock metrics
function updateStockMetrics(stockData) {
    const metricsEl = document.getElementById('stockMetrics');
    if (!metricsEl) return;
    
    const metrics = [
        { label: 'Previous Close', value: stockData.previousClose ? `$${stockData.previousClose.toFixed(2)}` : 'N/A' },
        { label: 'Open', value: stockData.open ? `$${stockData.open.toFixed(2)}` : 'N/A' },
        { label: 'Day High', value: stockData.high ? `$${stockData.high.toFixed(2)}` : 'N/A' },
        { label: 'Day Low', value: stockData.low ? `$${stockData.low.toFixed(2)}` : 'N/A' },
        { label: 'Volume', value: stockData.volume ? formatNumber(stockData.volume) : 'N/A' },
        { label: 'Market Cap', value: stockData.marketCap ? formatNumber(stockData.marketCap) : 'N/A' }
    ];
    
    metricsEl.innerHTML = '';
    metrics.forEach(metric => {
        const metricCard = document.createElement('div');
        metricCard.className = 'metric-card';
        metricCard.innerHTML = `
            <div class="metric-label">${escapeHtml(metric.label)}</div>
            <div class="metric-value">${escapeHtml(metric.value)}</div>
        `;
        metricsEl.appendChild(metricCard);
    });
}

// Update stock info section
function updateStockInfo(stockData) {
    const infoEl = document.getElementById('stockInfo');
    if (!infoEl) return;
    
    const infoItems = [];
    
    // Helper function to format values
    const formatValue = (value, type = 'text') => {
        if (value === null || value === undefined || value === 'None' || value === '' || value === 'N/A') return null;
        try {
            switch(type) {
                case 'currency':
                    const currencyVal = parseFloat(value);
                    if (isNaN(currencyVal)) return null;
                    return `$${currencyVal.toFixed(2)}`;
                case 'percent':
                    const percentVal = parseFloat(value);
                    if (isNaN(percentVal)) return null;
                    return `${(percentVal * 100).toFixed(2)}%`;
                case 'number':
                    const numVal = parseFloat(value);
                    if (isNaN(numVal)) return null;
                    return formatNumber(value);
                case 'date':
                    return value;
                default:
                    return String(value);
            }
        } catch (e) {
            console.warn('Error formatting value:', value, e);
            return null;
        }
    };
    
    console.log('Updating stock info with data:', stockData);
    
    // Basic Information
    if (stockData.sector) {
        infoItems.push({ label: 'Sector', value: stockData.sector, category: 'basic' });
    }
    if (stockData.industry) {
        infoItems.push({ label: 'Industry', value: stockData.industry, category: 'basic' });
    }
    if (stockData.exchange) {
        infoItems.push({ label: 'Exchange', value: stockData.exchange, category: 'basic' });
    }
    if (stockData.currency) {
        infoItems.push({ label: 'Currency', value: stockData.currency, category: 'basic' });
    }
    
    // Valuation Metrics
    if (stockData.peRatio) {
        infoItems.push({ label: 'P/E Ratio (Trailing)', value: stockData.peRatio, category: 'valuation' });
    }
    if (stockData.forwardPE) {
        infoItems.push({ label: 'P/E Ratio (Forward)', value: stockData.forwardPE, category: 'valuation' });
    }
    if (stockData.pegRatio) {
        infoItems.push({ label: 'PEG Ratio', value: stockData.pegRatio, category: 'valuation' });
    }
    if (stockData.priceToBook) {
        infoItems.push({ label: 'Price to Book', value: stockData.priceToBook, category: 'valuation' });
    }
    if (stockData.priceToSales) {
        infoItems.push({ label: 'Price to Sales', value: stockData.priceToSales, category: 'valuation' });
    }
    if (stockData.evToRevenue) {
        infoItems.push({ label: 'EV to Revenue', value: stockData.evToRevenue, category: 'valuation' });
    }
    if (stockData.evToEBITDA) {
        infoItems.push({ label: 'EV to EBITDA', value: stockData.evToEBITDA, category: 'valuation' });
    }
    
    // Earnings & EPS
    if (stockData.eps) {
        infoItems.push({ label: 'EPS (Trailing)', value: formatValue(stockData.eps, 'currency'), category: 'earnings' });
    }
    if (stockData.epsForward) {
        infoItems.push({ label: 'EPS (Forward)', value: formatValue(stockData.epsForward, 'currency'), category: 'earnings' });
    }
    if (stockData.quarterlyEarningsGrowth) {
        infoItems.push({ label: 'Quarterly Earnings Growth (YoY)', value: formatValue(stockData.quarterlyEarningsGrowth, 'percent'), category: 'earnings' });
    }
    
    // Dividends
    if (stockData.dividendYield) {
        infoItems.push({ label: 'Dividend Yield', value: formatValue(stockData.dividendYield, 'percent'), category: 'dividend' });
    }
    if (stockData.dividendPerShare) {
        infoItems.push({ label: 'Dividend Per Share', value: formatValue(stockData.dividendPerShare, 'currency'), category: 'dividend' });
    }
    if (stockData.forwardAnnualDividendRate) {
        infoItems.push({ label: 'Forward Annual Dividend Rate', value: formatValue(stockData.forwardAnnualDividendRate, 'currency'), category: 'dividend' });
    }
    if (stockData.forwardAnnualDividendYield) {
        infoItems.push({ label: 'Forward Annual Dividend Yield', value: formatValue(stockData.forwardAnnualDividendYield, 'percent'), category: 'dividend' });
    }
    if (stockData.trailingAnnualDividendRate) {
        infoItems.push({ label: 'Trailing Annual Dividend Rate', value: formatValue(stockData.trailingAnnualDividendRate, 'currency'), category: 'dividend' });
    }
    if (stockData.trailingAnnualDividendYield) {
        infoItems.push({ label: 'Trailing Annual Dividend Yield', value: formatValue(stockData.trailingAnnualDividendYield, 'percent'), category: 'dividend' });
    }
    if (stockData.fiveYearAverageDividendYield) {
        infoItems.push({ label: '5-Year Average Dividend Yield', value: formatValue(stockData.fiveYearAverageDividendYield, 'percent'), category: 'dividend' });
    }
    if (stockData.payoutRatio) {
        infoItems.push({ label: 'Payout Ratio', value: formatValue(stockData.payoutRatio, 'percent'), category: 'dividend' });
    }
    if (stockData.exDividendDate) {
        infoItems.push({ label: 'Ex-Dividend Date', value: stockData.exDividendDate, category: 'dividend' });
    }
    if (stockData.dividendDate) {
        infoItems.push({ label: 'Dividend Date', value: stockData.dividendDate, category: 'dividend' });
    }
    
    // Financial Metrics
    if (stockData.revenue) {
        infoItems.push({ label: 'Revenue (TTM)', value: formatValue(stockData.revenue, 'number'), category: 'financial' });
    }
    if (stockData.revenuePerShare) {
        infoItems.push({ label: 'Revenue Per Share (TTM)', value: formatValue(stockData.revenuePerShare, 'currency'), category: 'financial' });
    }
    if (stockData.quarterlyRevenueGrowth) {
        infoItems.push({ label: 'Quarterly Revenue Growth (YoY)', value: formatValue(stockData.quarterlyRevenueGrowth, 'percent'), category: 'financial' });
    }
    if (stockData.grossProfit) {
        infoItems.push({ label: 'Gross Profit (TTM)', value: formatValue(stockData.grossProfit, 'number'), category: 'financial' });
    }
    if (stockData.ebitda) {
        infoItems.push({ label: 'EBITDA (TTM)', value: formatValue(stockData.ebitda, 'number'), category: 'financial' });
    }
    if (stockData.profitMargin) {
        infoItems.push({ label: 'Profit Margin', value: formatValue(stockData.profitMargin, 'percent'), category: 'financial' });
    }
    if (stockData.operatingMargin) {
        infoItems.push({ label: 'Operating Margin (TTM)', value: formatValue(stockData.operatingMargin, 'percent'), category: 'financial' });
    }
    if (stockData.bookValue) {
        infoItems.push({ label: 'Book Value', value: formatValue(stockData.bookValue, 'currency'), category: 'financial' });
    }
    
    // Returns
    if (stockData.returnOnAssets) {
        infoItems.push({ label: 'Return on Assets (TTM)', value: formatValue(stockData.returnOnAssets, 'percent'), category: 'returns' });
    }
    if (stockData.returnOnEquity) {
        infoItems.push({ label: 'Return on Equity (TTM)', value: formatValue(stockData.returnOnEquity, 'percent'), category: 'returns' });
    }
    if (stockData.returnOnInvestment) {
        infoItems.push({ label: 'Return on Investment (TTM)', value: formatValue(stockData.returnOnInvestment, 'percent'), category: 'returns' });
    }
    
    // Price Ranges
    if (stockData.fiftyTwoWeekHigh) {
        infoItems.push({ label: '52 Week High', value: formatValue(stockData.fiftyTwoWeekHigh, 'currency'), category: 'price' });
    }
    if (stockData.fiftyTwoWeekLow) {
        infoItems.push({ label: '52 Week Low', value: formatValue(stockData.fiftyTwoWeekLow, 'currency'), category: 'price' });
    }
    if (stockData.analystTargetPrice) {
        infoItems.push({ label: 'Analyst Target Price', value: formatValue(stockData.analystTargetPrice, 'currency'), category: 'price' });
    }
    
    // Risk Metrics
    if (stockData.beta) {
        infoItems.push({ label: 'Beta', value: stockData.beta, category: 'risk' });
    }
    
    // Shares Information
    if (stockData.sharesOutstanding) {
        infoItems.push({ label: 'Shares Outstanding', value: formatValue(stockData.sharesOutstanding, 'number'), category: 'shares' });
    }
    if (stockData.floatShares) {
        infoItems.push({ label: 'Float Shares', value: formatValue(stockData.floatShares, 'number'), category: 'shares' });
    }
    if (stockData.sharesShort) {
        infoItems.push({ label: 'Shares Short', value: formatValue(stockData.sharesShort, 'number'), category: 'shares' });
    }
    if (stockData.shortRatio) {
        infoItems.push({ label: 'Short Ratio', value: stockData.shortRatio, category: 'shares' });
    }
    if (stockData.shortPercentOutstanding) {
        infoItems.push({ label: 'Short % of Outstanding', value: formatValue(stockData.shortPercentOutstanding, 'percent'), category: 'shares' });
    }
    if (stockData.shortPercentFloat) {
        infoItems.push({ label: 'Short % of Float', value: formatValue(stockData.shortPercentFloat, 'percent'), category: 'shares' });
    }
    if (stockData.percentInsiders) {
        infoItems.push({ label: '% Held by Insiders', value: formatValue(stockData.percentInsiders, 'percent'), category: 'shares' });
    }
    if (stockData.percentInstitutions) {
        infoItems.push({ label: '% Held by Institutions', value: formatValue(stockData.percentInstitutions, 'percent'), category: 'shares' });
    }
    
    // If no overview data, show at least basic quote information
    if (infoItems.length === 0) {
        // Try to show at least some basic info from quote data
        const basicInfo = [];
        
        if (stockData.price) {
            basicInfo.push({ label: 'Current Price', value: formatValue(stockData.price, 'currency'), category: 'price' });
        }
        if (stockData.change !== undefined) {
            basicInfo.push({ label: 'Change', value: `${stockData.change >= 0 ? '+' : ''}$${stockData.change.toFixed(2)}`, category: 'price' });
        }
        if (stockData.changePercent) {
            basicInfo.push({ label: 'Change %', value: stockData.changePercent, category: 'price' });
        }
        if (stockData.volume) {
            basicInfo.push({ label: 'Volume', value: formatValue(stockData.volume, 'number'), category: 'price' });
        }
        if (stockData.previousClose) {
            basicInfo.push({ label: 'Previous Close', value: formatValue(stockData.previousClose, 'currency'), category: 'price' });
        }
        if (stockData.high) {
            basicInfo.push({ label: 'Day High', value: formatValue(stockData.high, 'currency'), category: 'price' });
        }
        if (stockData.low) {
            basicInfo.push({ label: 'Day Low', value: formatValue(stockData.low, 'currency'), category: 'price' });
        }
        
        if (basicInfo.length > 0) {
            infoItems.push(...basicInfo);
        } else {
            infoEl.innerHTML = `
                <div style="color: #666; padding: 20px; text-align: center;">
                    <div style="margin-bottom: 10px;">Additional information not available for this stock.</div>
                    <div style="font-size: 0.9rem; color: #999;">
                        The Alpha Vantage API may be rate-limited or the stock symbol may not be supported.
                        <br>Try refreshing the page in a few moments.
                    </div>
                </div>
            `;
            return;
        }
    }
    
    // Group items by category
    const categories = {
        'basic': 'Basic Information',
        'valuation': 'Valuation Metrics',
        'earnings': 'Earnings & EPS',
        'dividend': 'Dividend Information',
        'financial': 'Financial Metrics',
        'returns': 'Returns',
        'price': 'Price Information',
        'risk': 'Risk Metrics',
        'shares': 'Shares Information'
    };
    
    infoEl.innerHTML = '';
    
    // Display items grouped by category
    Object.keys(categories).forEach(category => {
        const categoryItems = infoItems.filter(item => item.category === category);
        if (categoryItems.length > 0) {
            const categorySection = document.createElement('div');
            categorySection.style.cssText = 'margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e0e0e0;';
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.style.cssText = 'margin: 0 0 15px 0; color: #1976D2; font-size: 1.2rem;';
            categoryTitle.textContent = categories[category];
            categorySection.appendChild(categoryTitle);
            
            categoryItems.forEach(item => {
                if (item.value) {
                    const infoItem = document.createElement('div');
                    infoItem.className = 'info-item';
                    infoItem.innerHTML = `
                        <span class="info-label">${escapeHtml(item.label)}:</span>
                        <span class="info-value">${escapeHtml(item.value)}</span>
                    `;
                    categorySection.appendChild(infoItem);
                }
            });
            
            infoEl.appendChild(categorySection);
        }
    });
    
    // Add description if available
    if (stockData.description) {
        const descSection = document.createElement('div');
        descSection.style.cssText = 'margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0;';
        descSection.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #333;">About</h4>
            <p style="color: #666; line-height: 1.6; margin: 0;">${escapeHtml(stockData.description)}</p>
        `;
        infoEl.appendChild(descSection);
    }
}

// Check if stock is already in watchlist
async function checkWatchlistStatus() {
    if (!currentTicker || !currentUserUid) return;
    
    try {
        const { data, error } = await supabase
            .from('stock_watchlist')
            .select('watchlist_id')
            .eq('user_uid', currentUserUid)
            .eq('ticker_symbol', currentTicker)
            .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error checking watchlist:', error);
            return;
        }
        
        const btn = document.getElementById('addToWatchlistBtn');
        if (btn && data) {
            btn.textContent = '⭐ Already in Watchlist';
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'not-allowed';
        }
    } catch (error) {
        console.error('Error checking watchlist status:', error);
    }
}

// Add to watchlist from details page
async function addToWatchlistFromDetails() {
    if (!currentTicker || !currentUserUid) return;
    
    try {
        // Get company name from current data
        const nameEl = document.getElementById('stockName');
        const companyName = nameEl ? nameEl.textContent : currentTicker;
        
        const { error } = await supabase
            .from('stock_watchlist')
            .insert({
                user_uid: currentUserUid,
                ticker_symbol: currentTicker,
                company_name: companyName
            });
        
        if (error) {
            if (error.code === '23505') { // Unique constraint violation
                alert('This stock is already in your watchlist!');
                await checkWatchlistStatus();
            } else {
                throw error;
            }
        } else {
            alert(`${currentTicker} added to watchlist!`);
            // Update button to show it's already added
            await checkWatchlistStatus();
        }
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        alert('Error adding to watchlist. Please try again.');
    }
}

// Add to portfolio from details page
async function addToPortfolioFromDetails() {
    if (!currentTicker || !currentUserUid) return;
    
    // Redirect to Wall Street Warrior with portfolio tab and ticker pre-filled
    window.location.href = `wall-street-warrior.html?tab=portfolio&ticker=${currentTicker}`;
}

// Format large numbers
function formatNumber(num) {
    if (!num) return 'N/A';
    const n = parseFloat(num);
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
}

// Load price chart
async function loadPriceChart(ticker, period = '1mo') {
    const chartLoading = document.getElementById('chartLoading');
    const chartCanvas = document.getElementById('priceChart');
    
    if (!chartCanvas) return;
    
    try {
        if (chartLoading) {
            chartLoading.style.display = 'block';
            chartLoading.textContent = 'Loading chart data...';
            chartLoading.style.color = '#666';
        }
        
        // Map period to Yahoo Finance range
        const periodMap = {
            '1d': { interval: '5m', range: '1d' },
            '5d': { interval: '15m', range: '5d' },
            '1mo': { interval: '1d', range: '1mo' },
            '3mo': { interval: '1d', range: '3mo' },
            '6mo': { interval: '1d', range: '6mo' },
            '1y': { interval: '1d', range: '1y' },
            '2y': { interval: '1wk', range: '2y' },
            '5y': { interval: '1mo', range: '5y' }
        };
        
        const periodConfig = periodMap[period] || periodMap['1mo'];
        
        // Try Alpha Vantage first (no CORS issues)
        let data = null;
        let lastError = null;
        
        try {
            console.log('Trying Alpha Vantage for historical data...');
            data = await getAlphaVantageHistoricalData(ticker, period);
            if (data && data.prices && data.prices.length > 0) {
                console.log('Successfully fetched data from Alpha Vantage');
            } else {
                data = null;
            }
        } catch (avError) {
            console.warn('Alpha Vantage failed, trying Yahoo Finance:', avError);
            lastError = avError;
        }
        
        // If Alpha Vantage fails, try Yahoo Finance with CORS proxy
        if (!data) {
            const yahooUrls = [
                `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${periodConfig.interval}&range=${periodConfig.range}`,
                `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${periodConfig.interval}&range=${periodConfig.range}`
            ];
            
            // Try with CORS proxy
            const corsProxies = [
                'https://api.allorigins.win/raw?url=',
                'https://corsproxy.io/?',
                '' // Direct (may fail due to CORS)
            ];
            
            for (const proxy of corsProxies) {
                for (const url of yahooUrls) {
                    try {
                        const proxiedUrl = proxy ? `${proxy}${encodeURIComponent(url)}` : url;
                        console.log('Trying chart URL:', proxiedUrl);
                        
                        const response = await fetch(proxiedUrl, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                            },
                            mode: 'cors'
                        });
                        
                        if (!response.ok) {
                            console.warn(`Response not OK: ${response.status}`);
                            continue;
                        }
                        
                        const responseData = await response.json();
                        console.log('Chart data response:', responseData);
                        
                        if (responseData.chart && responseData.chart.result && responseData.chart.result[0]) {
                            data = responseData;
                            break;
                        }
                    } catch (fetchError) {
                        console.warn(`Error fetching:`, fetchError);
                        lastError = fetchError;
                        continue;
                    }
                }
                if (data) break;
            }
        }
        
        // Handle Alpha Vantage data format
        if (data && data.prices && data.prices.length > 0) {
            const prices = data.prices;
            const labels = data.labels;
            
            // Determine color based on price trend
            const firstPrice = prices[0];
            const lastPrice = prices[prices.length - 1];
            const chartColor = lastPrice >= firstPrice ? '#28a745' : '#dc3545';
            
            // Destroy existing chart if it exists
            if (priceChart) {
                priceChart.destroy();
            }
            
            // Create new chart
            const ctx = chartCanvas.getContext('2d');
            priceChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Price',
                        data: prices,
                        borderColor: chartColor,
                        backgroundColor: chartColor + '20',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.1,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return `$${context.parsed.y.toFixed(2)}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toFixed(2);
                                }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
            
            if (chartLoading) chartLoading.style.display = 'none';
            return;
        }
        
        // Handle Yahoo Finance data format
        if (!data || !data.chart || !data.chart.result || !data.chart.result[0]) {
            throw new Error(lastError?.message || 'No chart data available from any source');
        }
        
        const result = data.chart.result[0];
        
        // Check for errors in the result
        if (result.error) {
            throw new Error(result.error.description || 'Chart data error');
        }
        
        const timestamps = result.timestamp || [];
        const quotes = result.indicators?.quote?.[0];
        
        if (!quotes || !quotes.close || quotes.close.length === 0) {
            // Try alternative data structure
            const meta = result.meta;
            if (meta && meta.regularMarketPrice) {
                // Create a simple chart with current price
                const currentPrice = meta.regularMarketPrice;
                const prices = [currentPrice, currentPrice];
                const labels = ['Current', 'Current'];
                
                if (priceChart) priceChart.destroy();
                
                const ctx = chartCanvas.getContext('2d');
                priceChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Price',
                            data: prices,
                            borderColor: '#1976D2',
                            backgroundColor: '#1976D220',
                            borderWidth: 2,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });
                
                if (chartLoading) {
                    chartLoading.style.display = 'block';
                    chartLoading.textContent = 'Limited chart data available. Historical data may not be accessible.';
                    chartLoading.style.color = '#ff9800';
                }
                return;
            }
            throw new Error('No price data available in chart response');
        }
        
        // Filter out null/undefined prices
        const validIndices = [];
        const validPrices = [];
        const validTimestamps = [];
        
        for (let i = 0; i < quotes.close.length; i++) {
            if (quotes.close[i] !== null && quotes.close[i] !== undefined && !isNaN(quotes.close[i])) {
                validIndices.push(i);
                validPrices.push(quotes.close[i]);
                validTimestamps.push(timestamps[i]);
            }
        }
        
        if (validPrices.length === 0) {
            throw new Error('No valid price data points found');
        }
        
        // Prepare chart data
        const labels = validTimestamps.map(ts => {
            const date = new Date(ts * 1000);
            if (period === '1d' || period === '5d') {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else if (period === '1mo' || period === '3mo') {
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            } else {
                return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
            }
        });
        
        // Determine color based on price trend
        const firstPrice = validPrices[0];
        const lastPrice = validPrices[validPrices.length - 1];
        const chartColor = lastPrice >= firstPrice ? '#28a745' : '#dc3545';
        
        // Destroy existing chart if it exists
        if (priceChart) {
            priceChart.destroy();
        }
        
        // Create new chart
        const ctx = chartCanvas.getContext('2d');
        priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price',
                    data: validPrices,
                    borderColor: chartColor,
                    backgroundColor: chartColor + '20',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
        
        if (chartLoading) chartLoading.style.display = 'none';
        
    } catch (error) {
        console.error('Error loading price chart:', error);
        if (chartLoading) {
            chartLoading.style.display = 'block';
            const errorMsg = error?.message || 'Unknown error';
            chartLoading.innerHTML = `
                <div style="color: #dc3545; margin-bottom: 10px;">
                    Chart data unavailable: ${escapeHtml(errorMsg)}
                </div>
                <div style="font-size: 0.9rem; color: #666;">
                    This may be due to:<br>
                    • CORS restrictions<br>
                    • API rate limiting<br>
                    • Invalid ticker symbol<br>
                    • Network issues<br><br>
                    Try selecting a different time period or check back later.
                </div>
            `;
        }
        
        const chartCanvas = document.getElementById('priceChart');
        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
        }
    }
}

// Get historical data from Alpha Vantage
async function getAlphaVantageHistoricalData(ticker, period) {
    try {
        // Map period to Alpha Vantage output size
        const outputSizeMap = {
            '1d': 'compact', // Last 100 data points
            '5d': 'compact',
            '1mo': 'compact',
            '3mo': 'full', // Up to 20 years
            '6mo': 'full',
            '1y': 'full',
            '2y': 'full',
            '5y': 'full'
        };
        
        const outputSize = outputSizeMap[period] || 'compact';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=${outputSize}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        
        console.log('Fetching Alpha Vantage historical data:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Alpha Vantage response:', data);
        
        // Check for API errors
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }
        
        if (data['Note']) {
            throw new Error('API rate limit exceeded. Please try again later.');
        }
        
        const timeSeries = data['Time Series (Daily)'];
        if (!timeSeries) {
            throw new Error('No time series data available');
        }
        
        // Convert to arrays sorted by date
        const dates = Object.keys(timeSeries).sort();
        
        // Filter dates based on period
        const now = new Date();
        let cutoffDate = new Date();
        
        switch(period) {
            case '1d':
            case '5d':
                // For intraday, we can't use daily data, return null to try Yahoo
                return null;
            case '1mo':
                cutoffDate.setMonth(now.getMonth() - 1);
                break;
            case '3mo':
                cutoffDate.setMonth(now.getMonth() - 3);
                break;
            case '6mo':
                cutoffDate.setMonth(now.getMonth() - 6);
                break;
            case '1y':
                cutoffDate.setFullYear(now.getFullYear() - 1);
                break;
            case '2y':
                cutoffDate.setFullYear(now.getFullYear() - 2);
                break;
            case '5y':
                cutoffDate.setFullYear(now.getFullYear() - 5);
                break;
            default:
                cutoffDate.setMonth(now.getMonth() - 1);
        }
        
        const filteredDates = dates.filter(dateStr => {
            const date = new Date(dateStr);
            return date >= cutoffDate;
        });
        
        // If filtering removed all dates, use all available
        const datesToUse = filteredDates.length > 0 ? filteredDates : dates.slice(-30); // Last 30 days minimum
        
        const prices = datesToUse.map(date => parseFloat(timeSeries[date]['4. close']));
        const labels = datesToUse.map(dateStr => {
            const date = new Date(dateStr);
            if (period === '1mo' || period === '3mo') {
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            } else {
                return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
            }
        });
        
        return { prices, labels };
        
    } catch (error) {
        console.error('Error fetching Alpha Vantage historical data:', error);
        throw error;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

