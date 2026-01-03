-- Add praise_report column to prayer_requests table

ALTER TABLE prayer_requests 
ADD COLUMN IF NOT EXISTS praise_report TEXT;

-- Add index for better query performance if needed
CREATE INDEX IF NOT EXISTS idx_prayer_requests_praise_report ON prayer_requests(praise_report) WHERE praise_report IS NOT NULL;

