// Wall Street Warrior investment tracking app

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Note: You'll need to get a free API key from Alpha Vantage (https://www.alphavantage.co/support/#api-key)
// or use another stock API. For now, we'll use a placeholder that you can replace.
// To get a free API key: https://www.alphavantage.co/support/#api-key
const ALPHA_VANTAGE_API_KEY = 'demo'; // Replace with your actual API key from Alpha Vantage

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
    
    if (!adminSelector || !userSelect) return;
    
    adminSelector.style.display = 'block';
    
    try {
        const { data: users, error } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('user_type', 'standard')
            .order('First_Name', { ascending: true });
        
        if (error) throw error;
        
        userSelect.innerHTML = '<option value="">Select a user to view their account...</option>';
        
        // Add current user option
        const { data: currentUser } = await supabase
            .from('Users')
            .select('UID, First_Name, Last_Name, Username')
            .eq('UID', currentUserUid)
            .single();
        
        if (currentUser) {
            const displayName = (currentUser.First_Name && currentUser.Last_Name)
                ? `${currentUser.First_Name} ${currentUser.Last_Name} (${currentUser.Username})`
                : currentUser.Username;
            const option = document.createElement('option');
            option.value = currentUserUid;
            option.textContent = `${displayName} (You)`;
            userSelect.appendChild(option);
        }
        
        if (users && users.length > 0) {
            users.forEach(user => {
                if (user.UID === currentUserUid) return; // Already added
                
                const displayName = (user.First_Name && user.Last_Name)
                    ? `${user.First_Name} ${user.Last_Name} (${user.Username})`
                    : user.Username;
                
                const option = document.createElement('option');
                option.value = user.UID;
                option.textContent = displayName;
                userSelect.appendChild(option);
            });
        }
        
        userSelect.addEventListener('change', async (e) => {
            viewingUserUid = parseInt(e.target.value) || currentUserUid;
            await loadWatchlist();
            await loadPortfolio();
        });
        
    } catch (error) {
        console.error('Error loading users for admin selector:', error);
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
        
        if (stockData && stockData.symbol) {
            displaySearchResult(stockData);
        } else {
            searchResults.innerHTML = '<div style="color: #dc3545; padding: 10px;">Stock not found. Please check the ticker symbol or company name.</div>';
        }
    } catch (error) {
        console.error('Error searching stock:', error);
        searchResults.innerHTML = '<div style="color: #dc3545; padding: 10px;">Error searching for stock. Please try again.</div>';
    }
}

// Search for stock using Alpha Vantage API
async function searchStock(query) {
    try {
        // Use Alpha Vantage Global Quote API
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();
        
        if (data['Global Quote'] && data['Global Quote']['01. symbol']) {
            const quote = data['Global Quote'];
            return {
                symbol: quote['01. symbol'],
                name: quote['01. symbol'], // Alpha Vantage doesn't return company name in quote
                price: parseFloat(quote['05. price']),
                change: parseFloat(quote['09. change']),
                changePercent: quote['10. change percent'],
                volume: quote['06. volume'],
                previousClose: parseFloat(quote['08. previous close'])
            };
        }
        
        // If quote doesn't work, try symbol search
        const searchResponse = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const searchData = await searchResponse.json();
        
        if (searchData.bestMatches && searchData.bestMatches.length > 0) {
            const match = searchData.bestMatches[0];
            // Get quote for the best match
            return await searchStock(match['1. symbol']);
        }
        
        return null;
    } catch (error) {
        console.error('Error in stock search:', error);
        // Fallback: return mock data for demo
        return {
            symbol: query,
            name: query,
            price: 100.00,
            change: 2.50,
            changePercent: '2.50%',
            volume: '1000000',
            previousClose: 97.50
        };
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

// View stock details (opens external link)
function viewStockDetails(ticker) {
    // Open Google Finance or Yahoo Finance
    window.open(`https://www.google.com/finance/quote/${ticker}`, '_blank');
}

// Load watchlist
async function loadWatchlist() {
    const watchlistGrid = document.getElementById('watchlistGrid');
    if (!watchlistGrid) return;
    
    try {
        const { data: watchlist, error } = await supabase
            .from('stock_watchlist')
            .select('*')
            .eq('user_uid', viewingUserUid)
            .order('added_at', { ascending: false });
        
        if (error) throw error;
        
        watchlistGrid.innerHTML = '';
        
        if (!watchlist || watchlist.length === 0) {
            watchlistGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; font-style: italic; grid-column: 1 / -1;">Your watchlist is empty. Search for stocks to add them!</div>';
            return;
        }
        
        // Get current prices for all watchlist items
        const tickers = watchlist.map(w => w.ticker_symbol);
        const prices = await getStockPrices(tickers);
        
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
                <div class="stock-price ${isPositive ? '' : 'negative'}" style="color: ${changeColor};">
                    $${price.toFixed(2)}
                </div>
                <div style="color: ${changeColor}; font-size: 0.9rem;">
                    ${isPositive ? '+' : ''}${change.toFixed(2)} (${changePercent})
                </div>
            `;
            watchlistGrid.appendChild(watchlistItem);
        });
        
    } catch (error) {
        console.error('Error loading watchlist:', error);
        watchlistGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc3545;">Error loading watchlist. Please refresh the page.</div>';
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
    
    if (!portfolioGrid) return;
    
    try {
        const { data: portfolio, error } = await supabase
            .from('stock_portfolio')
            .select('*')
            .eq('user_uid', viewingUserUid)
            .order('added_at', { ascending: false });
        
        if (error) throw error;
        
        portfolioGrid.innerHTML = '';
        
        if (!portfolio || portfolio.length === 0) {
            portfolioGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666; font-style: italic; grid-column: 1 / -1;">Your portfolio is empty. Add stocks to track your investments!</div>';
            if (totalValueDiv) totalValueDiv.textContent = '$0.00';
            return;
        }
        
        // Get current prices for all portfolio items
        const tickers = portfolio.map(p => p.ticker_symbol);
        const prices = await getStockPrices(tickers);
        
        let totalValue = 0;
        
        portfolio.forEach(holding => {
            const priceData = prices[holding.ticker_symbol] || {};
            const currentPrice = priceData.current_price || holding.basis_per_share;
            const shares = parseFloat(holding.shares) || 0;
            const basis = parseFloat(holding.basis_per_share) || 0;
            const currentValue = currentPrice * shares;
            const totalBasis = basis * shares;
            const gainLoss = currentValue - totalBasis;
            const gainLossPercent = basis > 0 ? ((gainLoss / totalBasis) * 100) : 0;
            
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
                    <div style="font-size: 0.9rem; color: #666;">Current: $${currentPrice.toFixed(2)}/share</div>
                </div>
                <div class="portfolio-value" style="color: ${gainLossColor};">
                    Value: $${currentValue.toFixed(2)}
                </div>
                <div style="color: ${gainLossColor}; font-size: 0.9rem; margin-top: 5px;">
                    ${isPositive ? '+' : ''}$${gainLoss.toFixed(2)} (${isPositive ? '+' : ''}${gainLossPercent.toFixed(2)}%)
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
        
        if (totalValueDiv) {
            totalValueDiv.textContent = `$${totalValue.toFixed(2)}`;
        }
        
    } catch (error) {
        console.error('Error loading portfolio:', error);
        portfolioGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc3545;">Error loading portfolio. Please refresh the page.</div>';
    }
}

// Get stock prices (with caching)
async function getStockPrices(tickers) {
    const prices = {};
    
    // Check cache first
    const { data: cachedPrices } = await supabase
        .from('stock_price_cache')
        .select('*')
        .in('ticker_symbol', tickers)
        .gte('last_updated', new Date(Date.now() - 5 * 60 * 1000).toISOString()); // 5 minute cache
    
    const cachedMap = {};
    if (cachedPrices) {
        cachedPrices.forEach(cache => {
            cachedMap[cache.ticker_symbol] = cache;
            prices[cache.ticker_symbol] = {
                current_price: parseFloat(cache.current_price),
                change_amount: parseFloat(cache.change_amount || 0),
                change_percent: cache.change_percent || '0.00%'
            };
        });
    }
    
    // Fetch missing or stale prices
    const missingTickers = tickers.filter(t => !cachedMap[t]);
    
    for (const ticker of missingTickers) {
        try {
            const stockData = await searchStock(ticker);
            if (stockData && stockData.price) {
                const change = stockData.change || 0;
                const changePercent = stockData.changePercent || '0.00%';
                
                prices[ticker] = {
                    current_price: stockData.price,
                    change_amount: change,
                    change_percent: changePercent
                };
                
                // Update cache
                await supabase
                    .from('stock_price_cache')
                    .upsert({
                        ticker_symbol: ticker,
                        current_price: stockData.price,
                        previous_close: stockData.previousClose,
                        change_amount: change,
                        change_percent: changePercent.replace('%', ''),
                        volume: stockData.volume,
                        last_updated: new Date().toISOString()
                    });
            }
        } catch (error) {
            console.error(`Error fetching price for ${ticker}:`, error);
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

