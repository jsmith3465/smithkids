-- Update unified_approvals table to allow fruit_nomination and marketplace_purchase approval types

-- Drop the existing constraint
ALTER TABLE unified_approvals 
DROP CONSTRAINT IF EXISTS unified_approvals_approval_type_check;

-- Add new constraint that includes fruit_nomination and marketplace_purchase
ALTER TABLE unified_approvals 
ADD CONSTRAINT unified_approvals_approval_type_check 
CHECK (approval_type IN ('workout', 'chore', 'memory_verse', 'marketplace_purchase', 'fruit_nomination'));

