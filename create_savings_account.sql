-- Add savings_balance column to User_Credits table
-- This allows users to store credits in a savings account separate from their available balance

-- Add savings_balance column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'User_Credits' 
        AND column_name = 'savings_balance'
    ) THEN
        ALTER TABLE "User_Credits" 
        ADD COLUMN savings_balance INTEGER NOT NULL DEFAULT 0;
    END IF;
END $$;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_credits_savings_balance ON "User_Credits"(savings_balance);

-- Update all existing records to have savings_balance = 0
-- All historical credits are considered "Available" (in the balance column)
UPDATE "User_Credits" 
SET savings_balance = 0 
WHERE savings_balance IS NULL;

-- Add comment to column
COMMENT ON COLUMN "User_Credits".savings_balance IS 'Credits stored in savings account, separate from available balance';

