-- Credit_Manager Table
-- This table manages credit earning and spending rules for games and applications

CREATE TABLE IF NOT EXISTS credit_manager (
    id SERIAL PRIMARY KEY,
    app_name TEXT NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('debit', 'credit')),
    credit_amount INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(app_name, transaction_type)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_credit_manager_app_name ON credit_manager(app_name);
CREATE INDEX IF NOT EXISTS idx_credit_manager_type ON credit_manager(transaction_type);

-- Insert initial entries for existing games/applications
-- These represent the credit rules currently in the application

-- Games (Debits - cost credits to play)
INSERT INTO credit_manager (app_name, transaction_type, credit_amount) VALUES
    ('Tic Tac Toe', 'debit', 1),
    ('Snake Game', 'debit', 1),
    ('Hangman', 'debit', 1),
    ('Galaga', 'debit', 3),
    ('Breakout', 'debit', 3)
ON CONFLICT (app_name, transaction_type) DO NOTHING;

-- Games (Credits - earn credits)
-- Note: Bible Trivia has variable credits based on percentage of maximum (20 credits)
-- Credits are calculated as: (score / 10) * max_credits, rounded to nearest whole number
-- Minimum 3 correct answers required to earn credits
INSERT INTO credit_manager (app_name, transaction_type, credit_amount) VALUES
    ('Bible Trivia', 'credit', 20)
ON CONFLICT (app_name, transaction_type) DO NOTHING;

-- Applications (Credits - earn credits when approved)
INSERT INTO credit_manager (app_name, transaction_type, credit_amount) VALUES
    ('Workout', 'credit', 10),
    ('Chore', 'credit', 10),
    ('Memory Verse', 'credit', 50),
    ('Bible Verse Bonus', 'credit', 1),
    ('Bonus for Biblical Curiosity', 'credit', 1)
ON CONFLICT (app_name, transaction_type) DO NOTHING;

-- Fruit of the Spirit Badges (Credits - earn credits when badge is awarded)
-- Each badge awards 20 credits
INSERT INTO credit_manager (app_name, transaction_type, credit_amount) VALUES
    ('Love', 'credit', 20),
    ('Joy', 'credit', 20),
    ('Peace', 'credit', 20),
    ('Patience', 'credit', 20),
    ('Kindness', 'credit', 20),
    ('Goodness', 'credit', 20),
    ('Faithfulness', 'credit', 20),
    ('Gentleness', 'credit', 20),
    ('Self-Control', 'credit', 20)
ON CONFLICT (app_name, transaction_type) DO NOTHING;

-- Achievement Badges (Credits - earn credits when badge is awarded)
-- Most badges award 20 credits, except "All Fruits of the Spirit" which awards 100 credits
INSERT INTO credit_manager (app_name, transaction_type, credit_amount) VALUES
    ('First Game', 'credit', 20),
    ('Trivia Master', 'credit', 20),
    ('Memory Verse Champion', 'credit', 20),
    ('Workout Warrior', 'credit', 20),
    ('Chore Champion', 'credit', 20),
    ('Early Bird', 'credit', 20),
    ('All Fruits of the Spirit', 'credit', 100)
ON CONFLICT (app_name, transaction_type) DO NOTHING;

