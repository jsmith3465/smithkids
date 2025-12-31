-- Add Tetris, Pac-Man, and Block Blast to credit_manager table
-- These games should be added as debit entries (they cost credits to play)

-- Insert Tetris (5 credits)
INSERT INTO credit_manager (app_name, transaction_type, credit_amount, created_at, updated_at)
VALUES ('Tetris', 'debit', 5, NOW(), NOW())
ON CONFLICT (app_name, transaction_type) 
DO UPDATE SET 
    credit_amount = EXCLUDED.credit_amount,
    updated_at = NOW();

-- Insert Pac-Man (3 credits)
INSERT INTO credit_manager (app_name, transaction_type, credit_amount, created_at, updated_at)
VALUES ('Pac-Man', 'debit', 3, NOW(), NOW())
ON CONFLICT (app_name, transaction_type) 
DO UPDATE SET 
    credit_amount = EXCLUDED.credit_amount,
    updated_at = NOW();

-- Insert Block Blast (5 credits)
INSERT INTO credit_manager (app_name, transaction_type, credit_amount, created_at, updated_at)
VALUES ('Block Blast', 'debit', 5, NOW(), NOW())
ON CONFLICT (app_name, transaction_type) 
DO UPDATE SET 
    credit_amount = EXCLUDED.credit_amount,
    updated_at = NOW();

