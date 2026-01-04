-- Add credit_transfer_in and credit_transfer_out to Credit_Transactions transaction_type constraint
-- This allows the Transfer Credits feature to record transfers between users

ALTER TABLE "Credit_Transactions" 
DROP CONSTRAINT IF EXISTS "Credit_Transactions_transaction_type_check";

ALTER TABLE "Credit_Transactions"
ADD CONSTRAINT "Credit_Transactions_transaction_type_check" 
CHECK (transaction_type = ANY (ARRAY[
    'credit_added'::text, 
    'game_payment'::text, 
    'savings_transfer'::text, 
    'savings_withdrawal'::text, 
    'marketplace_purchase'::text, 
    'marketplace_reversal'::text,
    'credit_transfer_in'::text,
    'credit_transfer_out'::text
]));

