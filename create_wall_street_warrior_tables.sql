-- Create tables for Wall Street Warrior investment tracking app

-- Stock Watchlist table
CREATE TABLE IF NOT EXISTS stock_watchlist (
    watchlist_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    ticker_symbol TEXT NOT NULL,
    company_name TEXT,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_uid, ticker_symbol)
);

-- Stock Portfolio table (user holdings)
CREATE TABLE IF NOT EXISTS stock_portfolio (
    holding_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    ticker_symbol TEXT NOT NULL,
    company_name TEXT,
    shares INTEGER NOT NULL DEFAULT 0 CHECK (shares >= 0),
    basis_per_share DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (basis_per_share >= 0),
    purchase_date DATE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stock Price Cache table (to cache current prices and avoid too many API calls)
CREATE TABLE IF NOT EXISTS stock_price_cache (
    cache_id SERIAL PRIMARY KEY,
    ticker_symbol TEXT NOT NULL UNIQUE,
    current_price DECIMAL(10, 2),
    previous_close DECIMAL(10, 2),
    change_amount DECIMAL(10, 2),
    change_percent DECIMAL(5, 2),
    volume BIGINT,
    market_cap BIGINT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_watchlist_user ON stock_watchlist(user_uid);
CREATE INDEX IF NOT EXISTS idx_watchlist_ticker ON stock_watchlist(ticker_symbol);
CREATE INDEX IF NOT EXISTS idx_portfolio_user ON stock_portfolio(user_uid);
CREATE INDEX IF NOT EXISTS idx_portfolio_ticker ON stock_portfolio(ticker_symbol);
CREATE INDEX IF NOT EXISTS idx_price_cache_ticker ON stock_price_cache(ticker_symbol);
CREATE INDEX IF NOT EXISTS idx_price_cache_updated ON stock_price_cache(last_updated);

-- Enable Row Level Security
ALTER TABLE stock_watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_price_cache ENABLE ROW LEVEL SECURITY;

-- Watchlist policies
CREATE POLICY "Enable read access for authenticated users" ON stock_watchlist
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON stock_watchlist
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete for request owner" ON stock_watchlist
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM "Users"
            WHERE "Users"."UID" = stock_watchlist.user_uid
        )
    );

-- Portfolio policies
CREATE POLICY "Enable read access for authenticated users" ON stock_portfolio
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON stock_portfolio
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON stock_portfolio
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users" ON stock_portfolio
    FOR DELETE USING (true);

-- Price cache policies (read-only for all, but we'll update via service)
CREATE POLICY "Enable read access for all users" ON stock_price_cache
    FOR SELECT USING (true);

CREATE POLICY "Enable insert/update for authenticated users" ON stock_price_cache
    FOR ALL USING (true);

