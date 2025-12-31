-- Marketplace Items Table
-- This table stores items that users can purchase with their savings credits

CREATE TABLE IF NOT EXISTS marketplace_items (
    item_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cost INTEGER NOT NULL CHECK (cost > 0),
    icon TEXT NOT NULL DEFAULT '🛍️',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_marketplace_items_active ON marketplace_items(is_active);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_cost ON marketplace_items(cost);

-- Marketplace Purchases Table
-- This table tracks all marketplace purchases and their approval status

CREATE TABLE IF NOT EXISTS marketplace_purchases (
    purchase_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    item_id INTEGER NOT NULL REFERENCES marketplace_items(item_id),
    cost INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by_uid BIGINT REFERENCES "Users"("UID"),
    denied_at TIMESTAMP WITH TIME ZONE,
    denied_by_uid BIGINT REFERENCES "Users"("UID")
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_marketplace_purchases_user ON marketplace_purchases(user_uid);
CREATE INDEX IF NOT EXISTS idx_marketplace_purchases_status ON marketplace_purchases(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_purchases_item ON marketplace_purchases(item_id);

-- Add comment to tables
COMMENT ON TABLE marketplace_items IS 'Items available for purchase in the marketplace';
COMMENT ON TABLE marketplace_purchases IS 'Tracks all marketplace purchases and their approval status';

