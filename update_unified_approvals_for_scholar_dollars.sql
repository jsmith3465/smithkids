-- Update unified_approvals table to allow scholar_dollars approval type

-- Drop the existing constraint
ALTER TABLE unified_approvals 
DROP CONSTRAINT IF EXISTS unified_approvals_approval_type_check;

-- Add new constraint that includes scholar_dollars
ALTER TABLE unified_approvals 
ADD CONSTRAINT unified_approvals_approval_type_check 
CHECK (approval_type IN ('workout', 'chore', 'memory_verse', 'marketplace_purchase', 'fruit_nomination', 'scholar_dollars'));

