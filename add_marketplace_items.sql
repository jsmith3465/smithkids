-- Add marketplace items
-- Private Dinner with Mom & Dad
INSERT INTO marketplace_items (name, description, cost, icon, is_active)
VALUES (
    'Private Dinner with Mom & Dad',
    'This experience offers unparalleled access to a one-on-one dinner with mom and dad.',
    1000,
    '🍽️',
    true
)
ON CONFLICT (name) DO UPDATE
SET 
    description = EXCLUDED.description,
    cost = EXCLUDED.cost,
    icon = EXCLUDED.icon,
    updated_at = NOW();

-- $50 Dollars
INSERT INTO marketplace_items (name, description, cost, icon, is_active)
VALUES (
    '$50 Dollars',
    '$50 Dollars cash or put into your stock account',
    500,
    '💵',
    true
)
ON CONFLICT (name) DO UPDATE
SET 
    description = EXCLUDED.description,
    cost = EXCLUDED.cost,
    icon = EXCLUDED.icon,
    updated_at = NOW();

