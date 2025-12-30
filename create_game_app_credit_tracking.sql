-- Game_Application_Credit_Tracking Table
-- This table tracks total credits earned and spent per game/application

CREATE TABLE IF NOT EXISTS Game_Application_Credit_Tracking (
    tracking_id SERIAL PRIMARY KEY,
    game_app_type TEXT NOT NULL UNIQUE,
    game_app_name TEXT NOT NULL,
    total_credits_earned INTEGER NOT NULL DEFAULT 0,
    total_credits_spent INTEGER NOT NULL DEFAULT 0,
    total_transactions INTEGER NOT NULL DEFAULT 0,
    last_transaction_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_game_app_tracking_type ON Game_Application_Credit_Tracking(game_app_type);
CREATE INDEX IF NOT EXISTS idx_game_app_tracking_updated ON Game_Application_Credit_Tracking(updated_at);

-- Function to update game/application credit tracking
CREATE OR REPLACE FUNCTION update_game_app_credit_tracking()
RETURNS TRIGGER AS $$
DECLARE
    app_type TEXT;
    app_name TEXT;
    credit_amount INTEGER;
    is_credit BOOLEAN;
BEGIN
    -- Determine game/app type and name
    app_type := COALESCE(NEW.game_type, NEW.transaction_type);
    
    -- Map transaction types to application names
    CASE app_type
        WHEN 'bible_trivia' THEN app_name := 'Bible Trivia';
        WHEN 'hangman' THEN app_name := 'Hangman';
        WHEN 'galaga' THEN app_name := 'Galaga';
        WHEN 'breakout' THEN app_name := 'Breakout';
        WHEN 'snake' THEN app_name := 'Snake';
        WHEN 'tic_tac_toe' THEN app_name := 'Tic Tac Toe';
        WHEN 'workout' THEN app_name := 'Workout';
        WHEN 'chore' THEN app_name := 'Chore';
        WHEN 'memory_verse' THEN app_name := 'Memory Verse';
        WHEN 'badge' THEN app_name := 'Badge';
        WHEN 'bible_verse_bonus' THEN app_name := 'Bible Verse Bonus';
        ELSE app_name := INITCAP(REPLACE(app_type, '_', ' '));
    END CASE;
    
    -- Determine if this is a credit (earned) or debit (spent)
    is_credit := (NEW.transaction_type = 'credit_added');
    credit_amount := NEW.amount;
    
    -- Insert or update the tracking record
    INSERT INTO Game_Application_Credit_Tracking (
        game_app_type,
        game_app_name,
        total_credits_earned,
        total_credits_spent,
        total_transactions,
        last_transaction_at,
        updated_at
    )
    VALUES (
        app_type,
        app_name,
        CASE WHEN is_credit THEN credit_amount ELSE 0 END,
        CASE WHEN NOT is_credit THEN credit_amount ELSE 0 END,
        1,
        NEW.created_at,
        NOW()
    )
    ON CONFLICT (game_app_type) DO UPDATE SET
        total_credits_earned = Game_Application_Credit_Tracking.total_credits_earned + 
            CASE WHEN is_credit THEN credit_amount ELSE 0 END,
        total_credits_spent = Game_Application_Credit_Tracking.total_credits_spent + 
            CASE WHEN NOT is_credit THEN credit_amount ELSE 0 END,
        total_transactions = Game_Application_Credit_Tracking.total_transactions + 1,
        last_transaction_at = NEW.created_at,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on Credit_Transactions table
DROP TRIGGER IF EXISTS trigger_update_game_app_credit_tracking ON Credit_Transactions;
CREATE TRIGGER trigger_update_game_app_credit_tracking
AFTER INSERT ON Credit_Transactions
FOR EACH ROW
EXECUTE FUNCTION update_game_app_credit_tracking();

-- Insert initial entries for workouts, chores, memory verses, and bible verse bonus
-- Credit amounts per application:
--   - Workout: 10 credits (earned when approved)
--   - Chore: 10 credits (earned when approved)
--   - Memory Verse: 50 credits (earned when approved)
--   - Bible Verse Bonus: 1 credit (earned when clicking Bible verse link on homepage)
-- Note: Initial values are 0. Totals will be updated automatically by the trigger as transactions occur.
-- To backfill existing transaction data, uncomment and run the backfill query below.
INSERT INTO Game_Application_Credit_Tracking (
    game_app_type,
    game_app_name,
    total_credits_earned,
    total_credits_spent,
    total_transactions,
    last_transaction_at
)
VALUES
    ('workout', 'Workout', 0, 0, 0, NULL),
    ('chore', 'Chore', 0, 0, 0, NULL),
    ('memory_verse', 'Memory Verse', 0, 0, 0, NULL),
    ('bible_verse_bonus', 'Bible Verse Bonus', 0, 0, 0, NULL)
ON CONFLICT (game_app_type) DO NOTHING;

-- Optional: Backfill existing transactions (run this once to populate the table with historical data)
-- Uncomment and run this if you want to populate the table with existing Credit_Transactions data
/*
INSERT INTO Game_Application_Credit_Tracking (
    game_app_type,
    game_app_name,
    total_credits_earned,
    total_credits_spent,
    total_transactions,
    last_transaction_at
)
SELECT 
    COALESCE(game_type, transaction_type) as game_app_type,
    CASE COALESCE(game_type, transaction_type)
        WHEN 'bible_trivia' THEN 'Bible Trivia'
        WHEN 'hangman' THEN 'Hangman'
        WHEN 'galaga' THEN 'Galaga'
        WHEN 'breakout' THEN 'Breakout'
        WHEN 'snake' THEN 'Snake'
        WHEN 'tic_tac_toe' THEN 'Tic Tac Toe'
        WHEN 'workout' THEN 'Workout'
        WHEN 'chore' THEN 'Chore'
        WHEN 'memory_verse' THEN 'Memory Verse'
        WHEN 'badge' THEN 'Badge'
        WHEN 'bible_verse_bonus' THEN 'Bible Verse Bonus'
        ELSE INITCAP(REPLACE(COALESCE(game_type, transaction_type), '_', ' '))
    END as game_app_name,
    SUM(CASE WHEN transaction_type = 'credit_added' THEN amount ELSE 0 END) as total_credits_earned,
    SUM(CASE WHEN transaction_type != 'credit_added' THEN amount ELSE 0 END) as total_credits_spent,
    COUNT(*) as total_transactions,
    MAX(created_at) as last_transaction_at
FROM Credit_Transactions
WHERE game_type IS NOT NULL OR transaction_type IN ('workout', 'chore', 'memory_verse', 'badge', 'bible_verse_bonus')
GROUP BY COALESCE(game_type, transaction_type)
ON CONFLICT (game_app_type) DO UPDATE SET
    total_credits_earned = EXCLUDED.total_credits_earned,
    total_credits_spent = EXCLUDED.total_credits_spent,
    total_transactions = EXCLUDED.total_transactions,
    last_transaction_at = EXCLUDED.last_transaction_at,
    updated_at = NOW();
*/

