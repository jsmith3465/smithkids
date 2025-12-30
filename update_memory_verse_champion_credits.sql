-- Update Memory Verse Champion badge to award 100 credits instead of 20
-- This badge is now awarded for completing memory verses 3 months in a row

UPDATE credit_manager
SET credit_amount = 100,
    updated_at = NOW()
WHERE app_name = 'Memory Verse Champion'
  AND transaction_type = 'credit';

-- Verify the update
SELECT app_name, transaction_type, credit_amount, updated_at
FROM credit_manager
WHERE app_name = 'Memory Verse Champion';

