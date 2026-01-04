// Wall Street Warrior investment tracking app

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Alpha Vantage API Key
const ALPHA_VANTAGE_API_KEY = 'IJJQBBYU0ZUE20RQ';

// Helper function to get correct path for pages
function getPagePath(pageName) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('index.html')) {
        return `pages/${pageName}`;
    }
    return pageName;
}

let currentUserUid = null;
let isAdmin = false;
let viewingUserUid = null; // For admin viewing other users
let allQuotes = []; // Store all quotes
let currentQuoteIndex = 0; // Current quote index

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
    isAdmin = session.userType === 'admin';
    viewingUserUid = currentUserUid; // Start with own account
    
    const authCheck = document.getElementById('authCheck');
    const mainContent = document.getElementById('mainContent');
    
    if (!authCheck || !mainContent) {
        console.error('Required DOM elements not found');
        return;
    }
    
    authCheck.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    try {
        setupTabs();
        setupEventListeners();
        await loadQuotes();
        setupQuoteNavigation();
        
        if (isAdmin) {
            await setupAdminUserSelector();
        }
        
        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        const tickerParam = urlParams.get('ticker');
        
        // Switch to specified tab if provided
        if (tabParam) {
            const tabButton = document.querySelector(`[data-tab="${tabParam}"]`);
            if (tabButton) {
                tabButton.click();
            }
        }
        
        // Pre-fill portfolio form with ticker if provided
        if (tickerParam && tabParam === 'portfolio') {
            // Wait a bit for the tab to switch, then open modal
            setTimeout(() => {
                openPortfolioModal();
                const tickerInput = document.getElementById('portfolioTicker');
                if (tickerInput) {
                    tickerInput.value = tickerParam.toUpperCase();
                }
            }, 300);
        }
        
        await loadWatchlist();
        await loadPortfolio();
        await loadRecommendedSearches();
    } catch (error) {
        console.error('Error initializing Wall Street Warrior:', error);
    }
}

// Setup tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected tab and content
            tab.classList.add('active');
            document.getElementById(`${targetTab}Tab`).classList.add('active');
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    const searchBtn = document.getElementById('searchStockBtn');
    const searchInput = document.getElementById('stockSearchInput');
    const addPortfolioBtn = document.getElementById('addPortfolioBtn');
    const portfolioForm = document.getElementById('portfolioForm');
    const cancelPortfolioBtn = document.getElementById('cancelPortfolioBtn');
    const screenerSelect = document.getElementById('screenerSelect');
    const closeWarrenModal = document.getElementById('closeWarrenModal');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleStockSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleStockSearch();
            }
        });
    }
    
    if (addPortfolioBtn) {
        addPortfolioBtn.addEventListener('click', () => {
            openPortfolioModal();
        });
    }
    
    if (portfolioForm) {
        portfolioForm.addEventListener('submit', handlePortfolioSubmit);
    }
    
    if (cancelPortfolioBtn) {
        cancelPortfolioBtn.addEventListener('click', closePortfolioModal);
    }
    
    if (screenerSelect) {
        screenerSelect.addEventListener('change', handleScreenerSelect);
    }
    
    if (closeWarrenModal) {
        closeWarrenModal.addEventListener('click', () => window.closeWarrenModal());
    }
    
    // Close Warren modal when clicking outside
    const warrenModal = document.getElementById('warrenModal');
    if (warrenModal) {
        warrenModal.addEventListener('click', (e) => {
            if (e.target === warrenModal) {
                window.closeWarrenModal();
            }
        });
    }
}

// Setup admin user selector
async function setupAdminUserSelector() {
    const adminSelector = document.getElementById('adminUserSelector');
    const userSelect = document.getElementById('adminUserSelect');
    
    if (!adminSelector || !userSelect) {
        console.error('Admin selector elements not found');
        return;
    }
    
    adminSelector.style.display = 'block';
    
    try {
        console.log('Loading standard users for admin selector...');
        
        // First, try to get all users to see what we have
        const { data: allUsers, error: allUsersError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username, user_type')
            .order('First_Name', { ascending: true });
        
        if (allUsersError) {
            console.error('Error fetching all users:', allUsersError);
            throw allUsersError;
        }
        
        console.log('All users fetched:', allUsers);
        
        // Filter for standard users
        const standardUsers = allUsers ? allUsers.filter(user => user.user_type === 'standard' || !user.user_type) : [];
        console.log('Standard users filtered:', standardUsers);
        
        userSelect.innerHTML = '<option value="">Select a user to view their account...</option>';
        
        // Add current user option
        const { data: currentUser, error: currentUserError } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('UID', currentUserUid)
            .single();
        
        if (currentUserError && currentUserError.code !== 'PGRST116') {
            console.error('Error fetching current user:', currentUserError);
        }
        
        if (currentUser) {
            const displayName = (currentUser.First_Name && currentUser.Last_Name)
                ? `${currentUser.First_Name} ${currentUser.Last_Name} (${currentUser.Username})`
                : currentUser.Username;
            const option = document.createElement('option');
            option.value = currentUserUid;
            option.textContent = `${displayName} (You)`;
            userSelect.appendChild(option);
        }
        
        if (standardUsers && standardUsers.length > 0) {
            standardUsers.forEach(user => {
                if (user.UID === currentUserUid) return; // Already added
                
                const displayName = (user.First_Name && user.Last_Name)
                    ? `${user.First_Name} ${user.Last_Name} (${user.Username})`
                    : user.Username;
                
                const option = document.createElement('option');
                option.value = user.UID;
                option.textContent = displayName;
                userSelect.appendChild(option);
            });
            console.log(`Added ${standardUsers.length} standard users to dropdown`);
        } else {
            console.warn('No standard users found');
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No standard users found';
            option.disabled = true;
            userSelect.appendChild(option);
        }
        
        // Remove existing event listener if any, then add new one
        const newUserSelect = userSelect.cloneNode(true);
        userSelect.parentNode.replaceChild(newUserSelect, userSelect);
        
        newUserSelect.addEventListener('change', async (e) => {
            viewingUserUid = parseInt(e.target.value) || currentUserUid;
            await loadWatchlist();
            await loadPortfolio();
        });
        
    } catch (error) {
        console.error('Error loading users for admin selector:', error);
        userSelect.innerHTML = '<option value="">Error loading users</option>';
    }
}

// Handle stock search
async function handleStockSearch() {
    const searchInput = document.getElementById('stockSearchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    const query = searchInput.value.trim().toUpperCase();
    
    if (!query) {
        searchResults.innerHTML = '<div style="color: #dc3545; padding: 10px;">Please enter a ticker symbol or company name.</div>';
        return;
    }
    
    searchResults.innerHTML = '<div class="loading">Searching...</div>';
    
    try {
        // First, try to get stock quote
        const stockData = await searchStock(query);
        
        if (stockData && stockData.symbol && stockData.price && !isNaN(stockData.price)) {
            displaySearchResult(stockData);
        } else {
            searchResults.innerHTML = `
                <div style="color: #dc3545; padding: 10px;">
                    Stock not found. Please check the ticker symbol or company name.<br>
                    <small style="color: #666; margin-top: 5px; display: block;">
                        Note: Make sure you're using a valid ticker symbol (e.g., AAPL for Apple, MSFT for Microsoft).
                        The app uses Yahoo Finance API which should work without an API key.
                    </small>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error searching stock:', error);
        searchResults.innerHTML = '<div style="color: #dc3545; padding: 10px;">Error searching for stock. Please try again.</div>';
    }
}

// Search for stock using Alpha Vantage API with fallback to Yahoo Finance
async function searchStock(query) {
    try {
        // First, try Alpha Vantage Global Quote API
        if (ALPHA_VANTAGE_API_KEY && ALPHA_VANTAGE_API_KEY !== 'demo') {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`);
                const data = await response.json();
                
                if (data['Global Quote'] && data['Global Quote']['01. symbol']) {
                    const quote = data['Global Quote'];
                    const price = parseFloat(quote['05. price']);
                    const change = parseFloat(quote['09. change']);
                    
                    if (!isNaN(price) && price > 0) {
                        return {
                            symbol: quote['01. symbol'],
                            name: quote['01. symbol'],
                            price: price,
                            change: change,
                            changePercent: quote['10. change percent'] || `${((change / (price - change)) * 100).toFixed(2)}%`,
                            volume: quote['06. volume'],
                            previousClose: parseFloat(quote['08. previous close']) || (price - change)
                        };
                    }
                }
                
                // If quote doesn't work, try symbol search
                const searchResponse = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`);
                const searchData = await searchResponse.json();
                
                if (searchData.bestMatches && searchData.bestMatches.length > 0) {
                    const match = searchData.bestMatches[0];
                    // Get quote for the best match
                    return await searchStock(match['1. symbol']);
                }
            } catch (avError) {
                console.log('Alpha Vantage API error, trying fallback:', avError);
            }
        }
        
        // Fallback: Use Yahoo Finance API (free, no key required)
        // Try direct API first, then with CORS proxy if needed
        const yahooUrls = [
            `https://query1.finance.yahoo.com/v8/finance/chart/${query}?interval=1d&range=1d`,
            `https://query2.finance.yahoo.com/v8/finance/chart/${query}?interval=1d&range=1d`
        ];
        
        for (const url of yahooUrls) {
            try {
                const yahooResponse = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    mode: 'cors'
                });
                
                if (!yahooResponse.ok) {
                    console.log(`Yahoo Finance API returned ${yahooResponse.status} for ${url}`);
                    continue; // Try next URL
                }
                
                const yahooData = await yahooResponse.json();
                console.log('Yahoo Finance response for', query, ':', yahooData);
                
                if (yahooData.chart && yahooData.chart.result && yahooData.chart.result.length > 0) {
                    const result = yahooData.chart.result[0];
                    
                    // Check for errors in the result
                    if (result.error) {
                        console.error('Yahoo Finance error:', result.error);
                        continue; // Try next URL
                    }
                    
                    const meta = result.meta;
                    
                    if (meta && (meta.regularMarketPrice !== undefined || meta.currentPrice !== undefined)) {
                        const currentPrice = meta.regularMarketPrice || meta.currentPrice;
                        const previousClose = meta.previousClose || currentPrice;
                        const change = currentPrice - previousClose;
                        const changePercent = previousClose > 0 ? ((change / previousClose) * 100).toFixed(2) : '0.00';
                        
                        return {
                            symbol: meta.symbol || query,
                            name: meta.longName || meta.shortName || meta.symbol || query,
                            price: currentPrice,
                            change: change,
                            changePercent: `${changePercent}%`,
                            volume: meta.regularMarketVolume || meta.volume || 0,
                            previousClose: previousClose
                        };
                    }
                } else if (yahooData.chart && yahooData.chart.error) {
                    console.error('Yahoo Finance chart error:', yahooData.chart.error);
                    continue; // Try next URL
                }
                
                // If we got here, the API call worked but no data
                break;
            } catch (yahooError) {
                console.error('Yahoo Finance API error for', url, ':', yahooError);
                // Continue to next URL
                continue;
            }
        }
        
        // If all Yahoo Finance URLs failed, try one more approach with a simpler endpoint
        try {
            const simpleResponse = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${query}`);
            if (simpleResponse.ok) {
                const simpleData = await simpleResponse.json();
                if (simpleData.quotes && simpleData.quotes.length > 0) {
                    const quote = simpleData.quotes[0];
                    // Use the symbol from search to get quote
                    if (quote.symbol) {
                        return await searchStock(quote.symbol);
                    }
                }
            }
        } catch (simpleError) {
            console.error('Simple Yahoo Finance search error:', simpleError);
        }
        
        // If all APIs fail, return null
        console.error('All stock API attempts failed for:', query);
        return null;
        
    } catch (error) {
        console.error('Error in stock search:', error);
        return null;
    }
}

// Load recommended searches (trending stocks)
async function loadRecommendedSearches() {
    const recommendedList = document.getElementById('recommendedStocksList');
    if (!recommendedList) return;
    
    try {
        // List of popular stocks that are often in the news
        // These are major companies that frequently make headlines
        const defaultStocks = [
            { symbol: 'AAPL', name: 'Apple Inc.' },
            { symbol: 'MSFT', name: 'Microsoft Corporation' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.' },
            { symbol: 'TSLA', name: 'Tesla Inc.' }
        ];
        
        let stocksToShow = defaultStocks;
        
        // Try to fetch real-time trending data from Alpha Vantage NEWS_SENTIMENT
        if (ALPHA_VANTAGE_API_KEY && ALPHA_VANTAGE_API_KEY !== 'demo') {
            try {
                // Use a timeout to avoid hanging if API is slow
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
                
                const newsResponse = await fetch(
                    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology&apikey=${ALPHA_VANTAGE_API_KEY}&limit=10`,
                    { signal: controller.signal }
                );
                clearTimeout(timeoutId);
                
                const newsData = await newsResponse.json();
                
                // Check for API errors
                if (newsData['Error Message'] || (newsData.Note && newsData.Note.includes('Thank you for using Alpha Vantage!'))) {
                    throw new Error('API rate limit or error');
                }
                
                if (newsData.feed && newsData.feed.length > 0) {
                    // Extract unique tickers from news articles
                    const tickerCounts = {};
                    newsData.feed.forEach(article => {
                        if (article.ticker_sentiment && article.ticker_sentiment.length > 0) {
                            article.ticker_sentiment.forEach(tickerData => {
                                const ticker = tickerData.ticker;
                                if (ticker && ticker.length <= 5 && !ticker.includes('.')) {
                                    tickerCounts[ticker] = (tickerCounts[ticker] || 0) + 1;
                                }
                            });
                        }
                    });
                    
                    // Get top 5 most mentioned tickers
                    const topTickers = Object.entries(tickerCounts)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([ticker]) => ticker);
                    
                    if (topTickers.length >= 3) {
                        // Use the top tickers from news
                        stocksToShow = topTickers.map(ticker => ({
                            symbol: ticker,
                            name: ticker // Will be updated if we can fetch company name
                        }));
                        
                        // Try to get company names (but don't wait too long)
                        const namePromises = topTickers.slice(0, 3).map(async (ticker, index) => {
                            try {
                                const quoteResponse = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`);
                                const quoteData = await quoteResponse.json();
                                if (quoteData['Global Quote'] && quoteData['Global Quote']['01. symbol']) {
                                    stocksToShow[index].name = quoteData['Global Quote']['01. symbol'];
                                }
                            } catch (e) {
                                // Keep default name
                            }
                        });
                        
                        // Don't wait for all - just start them
                        Promise.allSettled(namePromises);
                    }
                }
            } catch (newsError) {
                // Silently fall back to default stocks
                console.log('Using default recommended stocks:', newsError.message);
            }
        }
        
        // Display the recommended stocks
        recommendedList.innerHTML = stocksToShow.map(stock => `
            <button class="btn btn-secondary" onclick="searchRecommendedStock('${escapeHtml(stock.symbol)}')" style="
                padding: 10px 20px;
                font-size: 0.95rem;
                font-weight: 600;
                white-space: nowrap;
                transition: all 0.2s ease;
            " onmouseover="this.style.transform='scale(1.05)'; this.style.background='#1976D2'; this.style.color='white';" onmouseout="this.style.transform='scale(1)'; this.style.background=''; this.style.color='';">
                ${escapeHtml(stock.symbol)} - ${escapeHtml(stock.name)}
            </button>
        `).join('');
        
    } catch (error) {
        console.error('Error loading recommended searches:', error);
        // Show default stocks even on error
        const defaultStocks = [
            { symbol: 'AAPL', name: 'Apple Inc.' },
            { symbol: 'MSFT', name: 'Microsoft Corporation' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.' },
            { symbol: 'TSLA', name: 'Tesla Inc.' }
        ];
        const recommendedList = document.getElementById('recommendedStocksList');
        if (recommendedList) {
            recommendedList.innerHTML = defaultStocks.map(stock => `
                <button class="btn btn-secondary" onclick="searchRecommendedStock('${escapeHtml(stock.symbol)}')" style="
                    padding: 10px 20px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    white-space: nowrap;
                ">
                    ${escapeHtml(stock.symbol)} - ${escapeHtml(stock.name)}
                </button>
            `).join('');
        }
    }
}

// Search for a recommended stock
function searchRecommendedStock(symbol) {
    const searchInput = document.getElementById('stockSearchInput');
    if (searchInput) {
        searchInput.value = symbol;
        handleStockSearch();
        // Scroll to search results
        setTimeout(() => {
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }
}

// Make function available globally
window.searchRecommendedStock = searchRecommendedStock;

// Display search result
function displaySearchResult(stockData) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    const isPositive = stockData.change >= 0;
    const changeColor = isPositive ? '#28a745' : '#dc3545';
    
    searchResults.innerHTML = `
        <div class="stock-card">
            <div class="stock-info">
                <div class="stock-symbol">${escapeHtml(stockData.symbol)}</div>
                <div class="stock-name">${escapeHtml(stockData.name)}</div>
                <div style="margin-top: 10px;">
                    <span style="font-size: 1.2rem; font-weight: 600; color: ${changeColor};">
                        $${stockData.price.toFixed(2)}
                    </span>
                    <span style="color: ${changeColor}; margin-left: 10px;">
                        ${isPositive ? '+' : ''}${stockData.change.toFixed(2)} (${stockData.changePercent})
                    </span>
                </div>
            </div>
            <div class="stock-actions">
                <button class="btn btn-primary" onclick="addToWatchlist('${escapeHtml(stockData.symbol)}', '${escapeHtml(stockData.name)}')">⭐ Add to Watchlist</button>
                <button class="btn btn-secondary" onclick="viewStockDetails('${escapeHtml(stockData.symbol)}')">📊 View Details</button>
            </div>
        </div>
    `;
}

// Add to watchlist
async function addToWatchlist(ticker, companyName) {
    try {
        const { error } = await supabase
            .from('stock_watchlist')
            .insert({
                user_uid: viewingUserUid,
                ticker_symbol: ticker,
                company_name: companyName || ticker
            });
        
        if (error) {
            if (error.code === '23505') { // Unique constraint violation
                alert('This stock is already in your watchlist!');
            } else {
                throw error;
            }
        } else {
            alert(`${ticker} added to watchlist!`);
            await loadWatchlist();
            // Switch to watchlist tab
            document.querySelector('[data-tab="watchlist"]').click();
        }
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        alert('Error adding to watchlist. Please try again.');
    }
}

// View stock details (opens internal page)
function viewStockDetails(ticker) {
    // Navigate to internal stock details page
    window.location.href = getPagePath(`stock-details.html?ticker=${encodeURIComponent(ticker)}`);
}

// Load watchlist
async function loadWatchlist() {
    const watchlistGrid = document.getElementById('watchlistGrid');
    if (!watchlistGrid) {
        console.error('watchlistGrid element not found');
        return;
    }
    
    // Ensure viewingUserUid is set
    if (!viewingUserUid) {
        viewingUserUid = currentUserUid;
    }
    
    try {
        console.log('Loading watchlist for user:', viewingUserUid);
        
        const { data: watchlist, error } = await supabase
            .from('stock_watchlist')
            .select('*')
            .eq('user_uid', viewingUserUid)
            .order('added_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching watchlist from database:', error);
            throw error;
        }
        
        console.log('Watchlist data received:', watchlist);
        
        watchlistGrid.innerHTML = '';
        
        if (!watchlist || watchlist.length === 0) {
            watchlistGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; font-style: italic; grid-column: 1 / -1;">Your watchlist is empty. Search for stocks to add them!</div>';
            return;
        }
        
        // Get current prices for all watchlist items
        const tickers = watchlist.map(w => w.ticker_symbol);
        console.log('Fetching prices for tickers:', tickers);
        
        let prices = {};
        try {
            prices = await getStockPrices(tickers);
            console.log('Prices received:', prices);
        } catch (priceError) {
            console.error('Error fetching stock prices (continuing with cached/default values):', priceError);
            // Continue without prices - show watchlist items anyway
        }
        
        watchlist.forEach(item => {
            const priceData = prices[item.ticker_symbol] || {};
            const price = priceData.current_price || 0;
            const change = priceData.change_amount || 0;
            const changePercent = priceData.change_percent || '0.00%';
            const isPositive = change >= 0;
            const changeColor = isPositive ? '#28a745' : '#dc3545';
            
            const watchlistItem = document.createElement('div');
            watchlistItem.className = 'watchlist-item';
            watchlistItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div>
                        <div class="stock-symbol" style="cursor: pointer;" onclick="viewStockDetails('${escapeHtml(item.ticker_symbol)}')">${escapeHtml(item.ticker_symbol)}</div>
                        <div class="stock-name">${escapeHtml(item.company_name || item.ticker_symbol)}</div>
                    </div>
                    ${isAdmin || viewingUserUid === currentUserUid ? `
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.85rem;" onclick="removeFromWatchlist(${item.watchlist_id})">Remove</button>
                    ` : ''}
                </div>
                ${price > 0 ? `
                    <div class="stock-price ${isPositive ? '' : 'negative'}" style="color: ${changeColor};">
                        $${price.toFixed(2)}
                    </div>
                    <div style="color: ${changeColor}; font-size: 0.9rem;">
                        ${isPositive ? '+' : ''}${change.toFixed(2)} (${changePercent})
                    </div>
                ` : `
                    <div style="color: #666; font-size: 0.9rem; font-style: italic;">Price loading...</div>
                `}
            `;
            watchlistGrid.appendChild(watchlistItem);
        });
        
    } catch (error) {
        console.error('Error loading watchlist:', error);
        const errorMsg = error?.message || 'Unknown error';
        watchlistGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #dc3545; grid-column: 1 / -1;">
                <div style="margin-bottom: 10px;">Error loading watchlist.</div>
                <div style="font-size: 0.9rem; color: #666;">${escapeHtml(errorMsg)}</div>
                <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 15px;">Refresh Page</button>
            </div>
        `;
    }
}

// Remove from watchlist
async function removeFromWatchlist(watchlistId) {
    if (!confirm('Remove this stock from your watchlist?')) return;
    
    try {
        const { error } = await supabase
            .from('stock_watchlist')
            .delete()
            .eq('watchlist_id', watchlistId)
            .eq('user_uid', viewingUserUid);
        
        if (error) throw error;
        
        await loadWatchlist();
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        alert('Error removing from watchlist. Please try again.');
    }
}

// Load portfolio
async function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const totalValueDiv = document.getElementById('totalPortfolioValue');
    
    if (!portfolioGrid) {
        console.error('portfolioGrid element not found');
        return;
    }
    
    // Ensure viewingUserUid is set
    if (!viewingUserUid) {
        viewingUserUid = currentUserUid;
    }
    
    try {
        console.log('Loading portfolio for user:', viewingUserUid);
        
        const { data: portfolio, error } = await supabase
            .from('stock_portfolio')
            .select('*')
            .eq('user_uid', viewingUserUid)
            .order('added_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching portfolio from database:', error);
            throw error;
        }
        
        console.log('Portfolio data received:', portfolio);
        
        portfolioGrid.innerHTML = '';
        
        if (!portfolio || portfolio.length === 0) {
            portfolioGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; font-style: italic; grid-column: 1 / -1;">Your portfolio is empty. Add stocks to track your investments!</div>';
            if (totalValueDiv) totalValueDiv.textContent = '$0.00';
            return;
        }
        
        // Get current prices for all portfolio items
        const tickers = portfolio.map(p => p.ticker_symbol);
        console.log('Fetching prices for portfolio tickers:', tickers);
        
        let prices = {};
        try {
            prices = await getStockPrices(tickers);
            console.log('Portfolio prices received:', prices);
        } catch (priceError) {
            console.error('Error fetching stock prices (continuing with basis prices):', priceError);
            // Continue without prices - use basis prices
        }
        
        let totalValue = 0;
        
        portfolio.forEach(holding => {
            const priceData = prices[holding.ticker_symbol] || {};
            const currentPrice = priceData.current_price || parseFloat(holding.basis_per_share) || 0;
            const shares = parseFloat(holding.shares) || 0;
            const basis = parseFloat(holding.basis_per_share) || 0;
            const currentValue = currentPrice * shares;
            const totalBasis = basis * shares;
            const gainLoss = currentValue - totalBasis;
            const gainLossPercent = totalBasis > 0 ? ((gainLoss / totalBasis) * 100) : 0;
            
            totalValue += currentValue;
            
            const isPositive = gainLoss >= 0;
            const gainLossColor = isPositive ? '#28a745' : '#dc3545';
            
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.onclick = () => {
                if (isAdmin || viewingUserUid === currentUserUid) {
                    editPortfolioHolding(holding);
                }
            };
            portfolioItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div>
                        <div class="stock-symbol" style="cursor: pointer;" onclick="event.stopPropagation(); viewStockDetails('${escapeHtml(holding.ticker_symbol)}')">${escapeHtml(holding.ticker_symbol)}</div>
                        <div class="stock-name">${escapeHtml(holding.company_name || holding.ticker_symbol)}</div>
                    </div>
                    ${isAdmin || viewingUserUid === currentUserUid ? `
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.85rem;" onclick="event.stopPropagation(); deletePortfolioHolding(${holding.holding_id})">Delete</button>
                    ` : ''}
                </div>
                <div style="margin: 10px 0;">
                    <div style="font-size: 0.9rem; color: #666;">Shares: ${shares.toFixed(2)}</div>
                    <div style="font-size: 0.9rem; color: #666;">Basis: $${basis.toFixed(2)}/share</div>
                    <div style="font-size: 0.9rem; color: #666;">Current: ${priceData.current_price ? `$${currentPrice.toFixed(2)}/share` : '<span style="font-style: italic; color: #999;">Loading...</span>'}</div>
                </div>
                <div class="portfolio-value" style="color: ${gainLossColor};">
                    Value: $${currentValue.toFixed(2)}
                </div>
                ${priceData.current_price ? `
                    <div style="color: ${gainLossColor}; font-size: 0.9rem; margin-top: 5px;">
                        ${isPositive ? '+' : ''}$${gainLoss.toFixed(2)} (${isPositive ? '+' : ''}${gainLossPercent.toFixed(2)}%)
                    </div>
                ` : ''}
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
        
        if (totalValueDiv) {
            totalValueDiv.textContent = `$${totalValue.toFixed(2)}`;
        }
        
    } catch (error) {
        console.error('Error loading portfolio:', error);
        const errorMsg = error?.message || 'Unknown error';
        portfolioGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #dc3545; grid-column: 1 / -1;">
                <div style="margin-bottom: 10px;">Error loading portfolio.</div>
                <div style="font-size: 0.9rem; color: #666;">${escapeHtml(errorMsg)}</div>
                <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 15px;">Refresh Page</button>
            </div>
        `;
        if (totalValueDiv) {
            totalValueDiv.textContent = 'Error';
        }
    }
}

// Get stock prices (with caching)
async function getStockPrices(tickers) {
    const prices = {};
    
    if (!tickers || tickers.length === 0) {
        return prices;
    }
    
    // Check cache first (if table exists)
    try {
        const { data: cachedPrices, error: cacheError } = await supabase
            .from('stock_price_cache')
            .select('*')
            .in('ticker_symbol', tickers)
            .gte('last_updated', new Date(Date.now() - 5 * 60 * 1000).toISOString()); // 5 minute cache
        
        if (cacheError) {
            // Table might not exist or RLS issue - continue without cache
            console.warn('Error accessing price cache (continuing without cache):', cacheError);
        } else if (cachedPrices) {
            const cachedMap = {};
            cachedPrices.forEach(cache => {
                cachedMap[cache.ticker_symbol] = cache;
                prices[cache.ticker_symbol] = {
                    current_price: parseFloat(cache.current_price) || 0,
                    change_amount: parseFloat(cache.change_amount || 0),
                    change_percent: cache.change_percent || '0.00%'
                };
            });
        }
    } catch (cacheError) {
        console.warn('Error checking price cache (continuing without cache):', cacheError);
    }
    
    // Fetch missing or stale prices
    const cachedTickers = Object.keys(prices);
    const missingTickers = tickers.filter(t => !cachedTickers.includes(t));
    
    for (const ticker of missingTickers) {
        try {
            const stockData = await searchStock(ticker);
            if (stockData && stockData.price && !isNaN(stockData.price)) {
                const change = stockData.change || 0;
                const changePercent = stockData.changePercent || '0.00%';
                
                prices[ticker] = {
                    current_price: stockData.price,
                    change_amount: change,
                    change_percent: changePercent
                };
                
                // Try to update cache (ignore errors if table doesn't exist)
                try {
                    await supabase
                        .from('stock_price_cache')
                        .upsert({
                            ticker_symbol: ticker,
                            current_price: stockData.price,
                            previous_close: stockData.previousClose || stockData.price,
                            change_amount: change,
                            change_percent: changePercent.replace('%', ''),
                            volume: stockData.volume || 0,
                            last_updated: new Date().toISOString()
                        });
                } catch (cacheUpdateError) {
                    // Ignore cache update errors
                    console.warn(`Could not update cache for ${ticker}:`, cacheUpdateError);
                }
            }
        } catch (error) {
            console.error(`Error fetching price for ${ticker}:`, error);
            // Continue with other tickers
        }
    }
    
    return prices;
}

// Open portfolio modal
function openPortfolioModal(holding = null) {
    const modal = document.getElementById('portfolioModal');
    const form = document.getElementById('portfolioForm');
    const title = document.getElementById('portfolioModalTitle');
    const holdingId = document.getElementById('portfolioHoldingId');
    const ticker = document.getElementById('portfolioTicker');
    const companyName = document.getElementById('portfolioCompanyName');
    const shares = document.getElementById('portfolioShares');
    const basis = document.getElementById('portfolioBasis');
    const purchaseDate = document.getElementById('portfolioPurchaseDate');
    
    if (!modal || !form) return;
    
    if (holding) {
        title.textContent = 'Edit Portfolio Holding';
        holdingId.value = holding.holding_id;
        ticker.value = holding.ticker_symbol;
        companyName.value = holding.company_name || '';
        shares.value = holding.shares;
        basis.value = holding.basis_per_share;
        purchaseDate.value = holding.purchase_date || '';
        ticker.disabled = true; // Don't allow changing ticker
    } else {
        title.textContent = 'Add Stock to Portfolio';
        form.reset();
        holdingId.value = '';
        ticker.disabled = false;
    }
    
    modal.style.display = 'flex';
}

// Close portfolio modal
function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Handle portfolio form submit
async function handlePortfolioSubmit(e) {
    e.preventDefault();
    
    const holdingId = document.getElementById('portfolioHoldingId').value;
    const ticker = document.getElementById('portfolioTicker').value.trim().toUpperCase();
    const companyName = document.getElementById('portfolioCompanyName').value.trim();
    const shares = parseFloat(document.getElementById('portfolioShares').value);
    const basis = parseFloat(document.getElementById('portfolioBasis').value);
    const purchaseDate = document.getElementById('portfolioPurchaseDate').value;
    
    try {
        if (holdingId) {
            // Update existing holding
            const { error } = await supabase
                .from('stock_portfolio')
                .update({
                    shares: shares,
                    basis_per_share: basis,
                    purchase_date: purchaseDate || null,
                    company_name: companyName || ticker,
                    updated_at: new Date().toISOString()
                })
                .eq('holding_id', holdingId)
                .eq('user_uid', viewingUserUid);
            
            if (error) throw error;
        } else {
            // Insert new holding
            const { error } = await supabase
                .from('stock_portfolio')
                .insert({
                    user_uid: viewingUserUid,
                    ticker_symbol: ticker,
                    company_name: companyName || ticker,
                    shares: shares,
                    basis_per_share: basis,
                    purchase_date: purchaseDate || null
                });
            
            if (error) throw error;
        }
        
        closePortfolioModal();
        await loadPortfolio();
        
    } catch (error) {
        console.error('Error saving portfolio holding:', error);
        alert('Error saving portfolio holding. Please try again.');
    }
}

// Edit portfolio holding
function editPortfolioHolding(holding) {
    openPortfolioModal(holding);
}

// Delete portfolio holding
async function deletePortfolioHolding(holdingId) {
    if (!confirm('Delete this portfolio holding?')) return;
    
    try {
        const { error } = await supabase
            .from('stock_portfolio')
            .delete()
            .eq('holding_id', holdingId)
            .eq('user_uid', viewingUserUid);
        
        if (error) throw error;
        
        await loadPortfolio();
    } catch (error) {
        console.error('Error deleting portfolio holding:', error);
        alert('Error deleting portfolio holding. Please try again.');
    }
}

// Screener data
const screenerData = {
    'circle-of-competence': {
        title: 'Circle of Competence',
        whatItScreens: 'Businesses that operate in areas you actually understand.',
        plainMeaning: 'Only look at companies whose business model, economics, and risks you can reasonably explain. If you don\'t understand how the company makes money or what could hurt it, you skip it—no matter how attractive it looks.',
        whyBuffett: 'You don\'t need to understand every business—just the ones you can evaluate correctly. Avoiding mistakes is more important than finding every opportunity.',
        companies: [
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
            { symbol: 'WMT', name: 'Walmart Inc.' },
            { symbol: 'MCD', name: 'McDonald\'s Corporation' },
            { symbol: 'PG', name: 'Procter & Gamble Co.' },
            { symbol: 'JNJ', name: 'Johnson & Johnson' },
            { symbol: 'PEP', name: 'PepsiCo, Inc.' },
            { symbol: 'DIS', name: 'The Walt Disney Company' }
        ]
    },
    'simple-business': {
        title: 'Simple Business',
        whatItScreens: 'Companies with straightforward, stable business models.',
        plainMeaning: 'The company does something easy to explain and doesn\'t depend on constant innovation, cutting-edge technology, or complex financial engineering to survive.',
        whyBuffett: 'Simple businesses are easier to evaluate, easier to predict, and less likely to surprise you in bad ways.',
        companies: [
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'MCD', name: 'McDonald\'s Corporation' },
            { symbol: 'WMT', name: 'Walmart Inc.' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
            { symbol: 'AXP', name: 'American Express Company' },
            { symbol: 'BK', name: 'The Bank of New York Mellon' },
            { symbol: 'USB', name: 'U.S. Bancorp' },
            { symbol: 'GS', name: 'The Goldman Sachs Group, Inc.' }
        ]
    },
    'consistent-earnings': {
        title: 'Consistent Earning Power',
        whatItScreens: 'Businesses that have reliably made money over time.',
        plainMeaning: 'The company has a long track record of being profitable. It\'s not a turnaround, a "this year was bad but next year will be great" story, or a business that only works in perfect conditions.',
        whyBuffett: 'A proven history of earnings is far more reliable than forecasts. Buffett prefers businesses that have already shown they can earn money through good times and bad.',
        companies: [
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'JNJ', name: 'Johnson & Johnson' },
            { symbol: 'PG', name: 'Procter & Gamble Co.' },
            { symbol: 'WMT', name: 'Walmart Inc.' },
            { symbol: 'MCD', name: 'McDonald\'s Corporation' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
            { symbol: 'AXP', name: 'American Express Company' },
            { symbol: 'AAPL', name: 'Apple Inc.' }
        ]
    },
    'high-returns-low-debt': {
        title: 'High Returns with Low or Moderate Debt',
        whatItScreens: 'Companies that generate strong profits without relying heavily on borrowing.',
        plainMeaning: 'The business earns attractive returns on the money invested in it and doesn\'t need a lot of debt to do so. If interest rates rise or revenue dips, the company isn\'t at risk of financial stress.',
        whyBuffett: 'Debt magnifies risk. A truly great business doesn\'t need leverage to look good.',
        companies: [
            { symbol: 'AAPL', name: 'Apple Inc.' },
            { symbol: 'MSFT', name: 'Microsoft Corporation' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
            { symbol: 'JNJ', name: 'Johnson & Johnson' },
            { symbol: 'PG', name: 'Procter & Gamble Co.' },
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'V', name: 'Visa Inc.' }
        ]
    },
    'durable-moat': {
        title: 'Durable Competitive Advantage (Moat Proxies)',
        whatItScreens: 'Evidence that the company has a "moat" protecting it from competitors.',
        plainMeaning: 'The company appears able to maintain strong profitability over time because it has something competitors struggle to copy—brand, cost advantage, customer loyalty, regulation, or scale. Since moats are qualitative, this screener looks for signs of a moat, like stable margins and strong returns that persist over many years.',
        whyBuffett: 'Without a moat, competitors eventually drive profits down. With a moat, profits can compound for decades.',
        companies: [
            { symbol: 'AAPL', name: 'Apple Inc.' },
            { symbol: 'MSFT', name: 'Microsoft Corporation' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.' },
            { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
            { symbol: 'V', name: 'Visa Inc.' },
            { symbol: 'MA', name: 'Mastercard Incorporated' },
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'MCD', name: 'McDonald\'s Corporation' }
        ]
    },
    'cash-generation': {
        title: 'Owner Earnings / Cash Generation',
        whatItScreens: 'How much real, usable cash the business produces for owners.',
        plainMeaning: 'Instead of focusing on accounting earnings, this looks at whether the business actually generates cash after spending what it needs to stay competitive. A business that reports profits but constantly consumes cash is not attractive.',
        whyBuffett: 'Cash is what owners can reinvest, distribute, or use to grow value. Accounting profits alone can be misleading.',
        companies: [
            { symbol: 'AAPL', name: 'Apple Inc.' },
            { symbol: 'MSFT', name: 'Microsoft Corporation' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
            { symbol: 'JNJ', name: 'Johnson & Johnson' },
            { symbol: 'PG', name: 'Procter & Gamble Co.' },
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'V', name: 'Visa Inc.' }
        ]
    },
    'intrinsic-value': {
        title: 'Intrinsic Value vs. Market Price',
        whatItScreens: 'Whether the stock price is reasonable compared to the business\'s underlying value.',
        plainMeaning: 'Estimate how much cash the business is likely to produce over its lifetime and compare that value to today\'s stock price. Buy only if there\'s a margin of safety—meaning the price is clearly below a conservative estimate of value.',
        whyBuffett: 'Even a great business can be a bad investment if you overpay.',
        companies: [
            { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'WMT', name: 'Walmart Inc.' },
            { symbol: 'JNJ', name: 'Johnson & Johnson' },
            { symbol: 'PG', name: 'Procter & Gamble Co.' },
            { symbol: 'MCD', name: 'McDonald\'s Corporation' },
            { symbol: 'AXP', name: 'American Express Company' },
            { symbol: 'USB', name: 'U.S. Bancorp' }
        ]
    },
    'long-term-mindset': {
        title: 'Long-Term Ownership Mindset',
        whatItScreens: 'Your willingness to hold the business for many years.',
        plainMeaning: 'If you wouldn\'t be comfortable owning the business for at least 10 years, you shouldn\'t own it at all. Short-term price movements are ignored; the focus is on long-term business performance.',
        whyBuffett: 'Time is the friend of a great business and the enemy of a mediocre one. Compounding only works if you let it.',
        companies: [
            { symbol: 'KO', name: 'The Coca-Cola Company' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
            { symbol: 'JNJ', name: 'Johnson & Johnson' },
            { symbol: 'PG', name: 'Procter & Gamble Co.' },
            { symbol: 'WMT', name: 'Walmart Inc.' },
            { symbol: 'MCD', name: 'McDonald\'s Corporation' },
            { symbol: 'AXP', name: 'American Express Company' },
            { symbol: 'AAPL', name: 'Apple Inc.' }
        ]
    }
};

// Find companies that meet all 8 criteria
function findCompaniesMeetingAllCriteria() {
    const allScreenerKeys = Object.keys(screenerData);
    const companyCounts = {};
    
    // Count how many screeners each company appears in
    allScreenerKeys.forEach(key => {
        screenerData[key].companies.forEach(company => {
            const symbol = company.symbol;
            if (!companyCounts[symbol]) {
                companyCounts[symbol] = {
                    symbol: company.symbol,
                    name: company.name,
                    count: 0
                };
            }
            companyCounts[symbol].count++;
        });
    });
    
    // Find companies that appear in all 8 screeners
    const allCriteriaCompanies = Object.values(companyCounts)
        .filter(company => company.count === 8)
        .map(company => ({
            symbol: company.symbol,
            name: company.name
        }));
    
    return allCriteriaCompanies;
}

// Handle screener selection
async function handleScreenerSelect() {
    const select = document.getElementById('screenerSelect');
    const descriptionDiv = document.getElementById('screenerDescription');
    const screenerContent = document.getElementById('screenerContent');
    const resultsDiv = document.getElementById('screenerResults');
    const companiesList = document.getElementById('screenerCompaniesList');
    
    if (!select || !descriptionDiv || !screenerContent || !resultsDiv || !companiesList) return;
    
    const selectedValue = select.value;
    
    if (!selectedValue) {
        descriptionDiv.style.display = 'none';
        resultsDiv.style.display = 'none';
        return;
    }
    
    let companies = [];
    let screener = null;
    
    if (selectedValue === 'all-8-criteria') {
        // Special handling for "All 8 Criteria"
        companies = findCompaniesMeetingAllCriteria();
        screener = {
            title: 'All 8 Buffett-Inspired Criteria',
            whatItScreens: 'Companies that meet all 8 screening criteria simultaneously.',
            plainMeaning: 'These companies have been identified as meeting every single one of Uncle Warren\'s key investment principles: Circle of Competence, Simple Business, Consistent Earnings, High Returns with Low Debt, Durable Competitive Advantage, Strong Cash Generation, Reasonable Intrinsic Value, and Long-Term Ownership Mindset.',
            whyBuffett: 'Meeting all criteria simultaneously is rare and indicates exceptional quality. These are the types of businesses Buffett would consider "wonderful companies" worthy of long-term investment.'
        };
    } else {
        screener = screenerData[selectedValue];
        if (!screener) return;
        companies = screener.companies;
    }
    
    // Build description HTML with clickable "Uncle Warren" link
    const warrenLink = '<span class="warren-link" onclick="openWarrenModal()">Uncle Warren (Buffett)</span>';
    screenerContent.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #DAA520; font-size: 1.5rem;">${screener.title}</h3>
        <div style="margin-bottom: 20px;">
            <strong style="color: #333; font-size: 1.1rem;">What it screens for:</strong>
            <p style="margin: 5px 0 15px 0; color: #555; line-height: 1.6;">${screener.whatItScreens}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <strong style="color: #333; font-size: 1.1rem;">Plain meaning:</strong>
            <p style="margin: 5px 0 15px 0; color: #555; line-height: 1.6;">${screener.plainMeaning}</p>
        </div>
        <div>
            <strong style="color: #333; font-size: 1.1rem;">Why ${warrenLink} uses it:</strong>
            <p style="margin: 5px 0 0 0; color: #555; line-height: 1.6;">${screener.whyBuffett}</p>
        </div>
    `;
    
    descriptionDiv.style.display = 'block';
    
    // Display companies with loading state for prices
    companiesList.innerHTML = companies.map(company => `
        <div class="screener-company-card" onclick="window.location.href='${getPagePath('stock-details.html')}?ticker=${company.symbol}'">
            <div class="screener-company-symbol">${company.symbol}</div>
            <div class="screener-company-name">${company.name}</div>
            <div class="screener-company-price" data-symbol="${company.symbol}">Loading price...</div>
        </div>
    `).join('');
    
    resultsDiv.style.display = 'block';
    
    // Fetch and display stock prices for all companies
    await loadScreenerStockPrices(companies.map(c => c.symbol));
}

// Load stock prices for screener companies
async function loadScreenerStockPrices(tickers) {
    if (!tickers || tickers.length === 0) return;
    
    try {
        const prices = await getStockPrices(tickers);
        
        // Update each company card with price
        tickers.forEach(ticker => {
            const priceElement = document.querySelector(`.screener-company-price[data-symbol="${ticker}"]`);
            if (priceElement) {
                const priceData = prices[ticker];
                if (priceData && priceData.current_price) {
                    const change = priceData.change_amount || 0;
                    const changePercent = priceData.change_percent || '0.00%';
                    const isPositive = change >= 0;
                    const changeColor = isPositive ? '#28a745' : '#dc3545';
                    
                    priceElement.innerHTML = `
                        <div style="font-size: 1.1rem; font-weight: 700; color: #333; margin-top: 8px;">
                            $${priceData.current_price.toFixed(2)}
                        </div>
                        <div style="font-size: 0.85rem; color: ${changeColor}; margin-top: 4px;">
                            ${isPositive ? '+' : ''}${change.toFixed(2)} (${changePercent})
                        </div>
                    `;
                } else {
                    priceElement.innerHTML = '<div style="font-size: 0.9rem; color: #999; margin-top: 8px;">Price unavailable</div>';
                }
            }
        });
    } catch (error) {
        console.error('Error loading screener stock prices:', error);
        // Update all price elements to show error
        tickers.forEach(ticker => {
            const priceElement = document.querySelector(`.screener-company-price[data-symbol="${ticker}"]`);
            if (priceElement) {
                priceElement.innerHTML = '<div style="font-size: 0.9rem; color: #999; margin-top: 8px;">Price unavailable</div>';
            }
        });
    }
}

// Open Warren Buffett modal
function openWarrenModal() {
    const modal = document.getElementById('warrenModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close Warren Buffett modal
function closeWarrenModal() {
    const modal = document.getElementById('warrenModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Make functions globally available for onclick handlers
window.openWarrenModal = openWarrenModal;
window.closeWarrenModal = closeWarrenModal;

// Make functions available globally
window.addToWatchlist = addToWatchlist;
window.viewStockDetails = viewStockDetails;
window.removeFromWatchlist = removeFromWatchlist;
window.editPortfolioHolding = editPortfolioHolding;
window.deletePortfolioHolding = deletePortfolioHolding;
window.closePortfolioModal = closePortfolioModal;

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load quotes from database
async function loadQuotes() {
    try {
        const { data: quotes, error } = await supabase
            .from('wall_street_warrior_quotes')
            .select('*')
            .order('quote_id', { ascending: true });
        
        if (error) {
            console.error('Error loading quotes:', error);
            // Fallback to showing a default message
            displayQuote({
                quote_text: 'Track your investments, build your watchlist, and manage your portfolio!',
                quote_type: 'buffett',
                author: 'Wall Street Warrior'
            });
            return;
        }
        
        if (quotes && quotes.length > 0) {
            // Shuffle the quotes array for true randomization
            allQuotes = shuffleArray([...quotes]);
            // Start with the first quote (array is already shuffled randomly)
            currentQuoteIndex = 0;
            displayQuote(allQuotes[currentQuoteIndex]);
        } else {
            // No quotes in database, show default message
            displayQuote({
                quote_text: 'Track your investments, build your watchlist, and manage your portfolio!',
                quote_type: 'buffett',
                author: 'Wall Street Warrior'
            });
        }
    } catch (error) {
        console.error('Error loading quotes:', error);
        displayQuote({
            quote_text: 'Track your investments, build your watchlist, and manage your portfolio!',
            quote_type: 'buffett',
            author: 'Wall Street Warrior'
        });
    }
}

// Display a quote
function displayQuote(quote) {
    const quoteTextEl = document.getElementById('quoteText');
    const quoteAuthorEl = document.getElementById('quoteAuthor');
    
    if (!quoteTextEl || !quoteAuthorEl) return;
    
    quoteTextEl.textContent = `"${quote.quote_text}"`;
    quoteAuthorEl.innerHTML = '';
    
    if (quote.quote_type === 'bible') {
        // For Bible verses, make the reference a clickable link
        const reference = `${quote.book} ${quote.chapter}:${quote.verse}`;
        const referenceLink = document.createElement('a');
        referenceLink.href = `${getPagePath('bible.html')}?book=${encodeURIComponent(quote.book)}&chapter=${quote.chapter}&verse=${quote.verse}`;
        referenceLink.textContent = reference;
        referenceLink.style.color = '#CC5500';
        referenceLink.style.textDecoration = 'none';
        referenceLink.style.fontWeight = '600';
        referenceLink.onmouseover = function() { this.style.textDecoration = 'underline'; };
        referenceLink.onmouseout = function() { this.style.textDecoration = 'none'; };
        
        quoteAuthorEl.appendChild(document.createTextNode('— '));
        quoteAuthorEl.appendChild(referenceLink);
        quoteAuthorEl.appendChild(document.createTextNode(' (NIV)'));
    } else {
        // For Buffett quotes
        quoteAuthorEl.textContent = `— ${quote.author || 'Warren Buffett'}`;
    }
}

// Shuffle array function for randomizing quotes
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Setup quote navigation
function setupQuoteNavigation() {
    const prevBtn = document.getElementById('quotePrevBtn');
    const nextBtn = document.getElementById('quoteNextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (allQuotes.length === 0) return;
            currentQuoteIndex = (currentQuoteIndex - 1 + allQuotes.length) % allQuotes.length;
            displayQuote(allQuotes[currentQuoteIndex]);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (allQuotes.length === 0) return;
            currentQuoteIndex = (currentQuoteIndex + 1) % allQuotes.length;
            displayQuote(allQuotes[currentQuoteIndex]);
        });
    }
}

