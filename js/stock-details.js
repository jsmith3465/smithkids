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

// Load price chart
async function loadPriceChart(ticker, period = '1mo') {
    const chartLoading = document.getElementById('chartLoading');
    const chartCanvas = document.getElementById('priceChart');
    
    if (!chartCanvas) return;
    
    try {
        if (chartLoading) chartLoading.style.display = 'block';
        
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
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${periodConfig.interval}&range=${periodConfig.range}`;
        
        console.log('Fetching chart data from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.chart || !data.chart.result || !data.chart.result[0]) {
            throw new Error('No chart data available');
        }
        
        const result = data.chart.result[0];
        const timestamps = result.timestamp || [];
        const quotes = result.indicators?.quote?.[0];
        
        if (!quotes || !quotes.close) {
            throw new Error('No price data available');
        }
        
        // Prepare chart data
        const labels = timestamps.map(ts => {
            const date = new Date(ts * 1000);
            if (period === '1d' || period === '5d') {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else if (period === '1mo' || period === '3mo') {
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            } else {
                return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
            }
        });
        
        const prices = quotes.close;
        const volumes = quotes.volume || [];
        
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
        
    } catch (error) {
        console.error('Error loading price chart:', error);
        if (chartLoading) {
            chartLoading.style.display = 'block';
            chartLoading.textContent = 'Chart data unavailable. Please try a different time period.';
            chartLoading.style.color = '#dc3545';
        }
        
        const chartCanvas = document.getElementById('priceChart');
        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
        }
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

