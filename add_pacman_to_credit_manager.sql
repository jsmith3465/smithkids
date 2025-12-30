-- Add Pac-Man to credit_manager table

INSERT INTO credit_manager (app_name, transaction_type, credit_amount, created_at, updated_at)
VALUES ('Pac-Man', 'debit', 3, NOW(), NOW())
ON CONFLICT (app_name, transaction_type) 
DO UPDATE SET credit_amount = 3, updated_at = NOW();

