-- Add all badge entries to Credit_Manager table
-- This script adds all badges and their credit amounts to the credit_manager table

-- Fruit of the Spirit Badges (Credits - earn credits when badge is awarded)
-- Each badge awards 20 credits
-- Note: Love was missing from the original insert, adding it here
INSERT INTO credit_manager (app_name, transaction_type, credit_amount) VALUES
    ('Love', 'credit', 20)
ON CONFLICT (app_name, transaction_type) DO UPDATE
    SET credit_amount = EXCLUDED.credit_amount,
        updated_at = NOW();

-- Achievement Badges (Credits - earn credits when badge is awarded)
-- Most badges award 20 credits, except "All Fruits of the Spirit" which awards 100 credits
INSERT INTO credit_manager (app_name, transaction_type, credit_amount) VALUES
    ('First Game', 'credit', 20),
    ('Trivia Master', 'credit', 20),
    ('Memory Verse Champion', 'credit', 100),
    ('Workout Warrior', 'credit', 20),
    ('Chore Champion', 'credit', 20),
    ('Early Bird', 'credit', 20),
    ('All Fruits of the Spirit', 'credit', 100)
ON CONFLICT (app_name, transaction_type) DO UPDATE
    SET credit_amount = EXCLUDED.credit_amount,
        updated_at = NOW();

-- Verify all badges are present
-- Run this query to see all badge entries:
-- SELECT * FROM credit_manager WHERE app_name IN (
--     'Love', 'Joy', 'Peace', 'Patience', 'Kindness', 'Goodness', 
--     'Faithfulness', 'Gentleness', 'Self-Control',
--     'First Game', 'Trivia Master', 'Memory Verse Champion', 
--     'Workout Warrior', 'Chore Champion', 'Early Bird', 
--     'All Fruits of the Spirit'
-- ) ORDER BY app_name;

