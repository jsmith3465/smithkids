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

