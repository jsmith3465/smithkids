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
}

// Load comprehensive stock details
async function loadStockDetails(ticker) {
    try {
        // Get overview and quote data
        const [overviewData, quoteData] = await Promise.all([
            getStockOverview(ticker),
            getStockQuote(ticker)
        ]);
        
        // Combine data
        const stockData = {
            ...quoteData,
            ...overviewData
        };
        
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
        document.getElementById('mainContent').innerHTML = `
            <div style="color: #dc3545; padding: 40px;">
                Error loading stock details. Please try again.<br>
                <a href="wall-street-warrior.html" class="back-button" style="margin-top: 20px;">Go Back</a>
            </div>
        `;
    }
}

// Get stock overview (company information)
async function getStockOverview(ticker) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();
        
        if (data.Symbol) {
            return {
                name: data.Name || ticker,
                description: data.Description,
                sector: data.Sector,
                industry: data.Industry,
                marketCap: data.MarketCapitalization,
                peRatio: data.PERatio,
                eps: data.EPS,
                dividendYield: data.DividendYield,
                beta: data.Beta,
                fiftyTwoWeekHigh: data['52WeekHigh'],
                fiftyTwoWeekLow: data['52WeekLow'],
                revenue: data.RevenueTTM,
                profitMargin: data.ProfitMargin,
                bookValue: data.BookValue,
                analystTargetPrice: data.AnalystTargetPrice
            };
        }
        
        return {};
    } catch (error) {
        console.error('Error fetching stock overview:', error);
        return {};
    }
}

// Get stock quote (current price data)
async function getStockQuote(ticker) {
    try {
        // Try Alpha Vantage first
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();
        
        if (data['Global Quote'] && data['Global Quote']['01. symbol']) {
            const quote = data['Global Quote'];
            return {
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
        }
        
        // Fallback to Yahoo Finance
        return await getYahooFinanceQuote(ticker);
        
    } catch (error) {
        console.error('Error fetching stock quote:', error);
        // Fallback to Yahoo Finance
        return await getYahooFinanceQuote(ticker);
    }
}

// Get quote from Yahoo Finance
async function getYahooFinanceQuote(ticker) {
    try {
        const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`);
        const data = await response.json();
        
        if (data.chart && data.chart.result && data.chart.result[0]) {
            const result = data.chart.result[0];
            const meta = result.meta;
            
            if (meta && meta.regularMarketPrice !== undefined) {
                const currentPrice = meta.regularMarketPrice;
                const previousClose = meta.previousClose || currentPrice;
                const change = currentPrice - previousClose;
                const changePercent = previousClose > 0 ? ((change / previousClose) * 100).toFixed(2) : '0.00';
                
                return {
                    symbol: meta.symbol || ticker,
                    name: meta.longName || meta.shortName || ticker,
                    price: currentPrice,
                    change: change,
                    changePercent: `${changePercent}%`,
                    volume: meta.regularMarketVolume || 0,
                    previousClose: previousClose,
                    open: meta.regularMarketOpen || currentPrice,
                    high: meta.regularMarketDayHigh || currentPrice,
                    low: meta.regularMarketDayLow || currentPrice
                };
            }
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
    
    if (symbolEl) symbolEl.textContent = stockData.symbol || currentTicker;
    if (nameEl) nameEl.textContent = stockData.name || currentTicker;
    
    if (priceEl && stockData.price) {
        priceEl.textContent = `$${stockData.price.toFixed(2)}`;
        priceEl.className = `stock-price-large ${stockData.change >= 0 ? 'positive' : 'negative'}`;
    }
    
    if (changeEl && stockData.change !== undefined) {
        const isPositive = stockData.change >= 0;
        changeEl.textContent = `${isPositive ? '+' : ''}$${stockData.change.toFixed(2)} (${stockData.changePercent || '0.00%'})`;
        changeEl.className = `stock-change ${isPositive ? 'positive' : 'negative'}`;
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
    
    if (stockData.sector) {
        infoItems.push({ label: 'Sector', value: stockData.sector });
    }
    if (stockData.industry) {
        infoItems.push({ label: 'Industry', value: stockData.industry });
    }
    if (stockData.peRatio) {
        infoItems.push({ label: 'P/E Ratio', value: stockData.peRatio });
    }
    if (stockData.eps) {
        infoItems.push({ label: 'EPS', value: `$${parseFloat(stockData.eps).toFixed(2)}` });
    }
    if (stockData.dividendYield) {
        infoItems.push({ label: 'Dividend Yield', value: `${(parseFloat(stockData.dividendYield) * 100).toFixed(2)}%` });
    }
    if (stockData.beta) {
        infoItems.push({ label: 'Beta', value: stockData.beta });
    }
    if (stockData.fiftyTwoWeekHigh) {
        infoItems.push({ label: '52 Week High', value: `$${parseFloat(stockData.fiftyTwoWeekHigh).toFixed(2)}` });
    }
    if (stockData.fiftyTwoWeekLow) {
        infoItems.push({ label: '52 Week Low', value: `$${parseFloat(stockData.fiftyTwoWeekLow).toFixed(2)}` });
    }
    if (stockData.revenue) {
        infoItems.push({ label: 'Revenue (TTM)', value: formatNumber(stockData.revenue) });
    }
    if (stockData.profitMargin) {
        infoItems.push({ label: 'Profit Margin', value: `${(parseFloat(stockData.profitMargin) * 100).toFixed(2)}%` });
    }
    if (stockData.bookValue) {
        infoItems.push({ label: 'Book Value', value: `$${parseFloat(stockData.bookValue).toFixed(2)}` });
    }
    if (stockData.analystTargetPrice) {
        infoItems.push({ label: 'Analyst Target Price', value: `$${parseFloat(stockData.analystTargetPrice).toFixed(2)}` });
    }
    
    if (infoItems.length === 0) {
        infoEl.innerHTML = '<div style="color: #666; padding: 20px; text-align: center;">Additional information not available for this stock.</div>';
        return;
    }
    
    infoEl.innerHTML = '';
    infoItems.forEach(item => {
        const infoItem = document.createElement('div');
        infoItem.className = 'info-item';
        infoItem.innerHTML = `
            <span class="info-label">${escapeHtml(item.label)}:</span>
            <span class="info-value">${escapeHtml(item.value)}</span>
        `;
        infoEl.appendChild(infoItem);
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

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

