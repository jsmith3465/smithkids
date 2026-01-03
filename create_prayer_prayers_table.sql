-- Create table to track who has prayed for which prayer requests

CREATE TABLE IF NOT EXISTS prayer_prayers (
    prayer_id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES prayer_requests(request_id) ON DELETE CASCADE,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    prayed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(request_id, user_uid)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prayer_prayers_request ON prayer_prayers(request_id);
CREATE INDEX IF NOT EXISTS idx_prayer_prayers_user ON prayer_prayers(user_uid);
CREATE INDEX IF NOT EXISTS idx_prayer_prayers_prayed_at ON prayer_prayers(prayed_at);

-- Enable Row Level Security
ALTER TABLE prayer_prayers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent execution)
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON prayer_prayers;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON prayer_prayers;

-- Policies for prayer_prayers
CREATE POLICY "Enable read access for all authenticated users" ON prayer_prayers
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON prayer_prayers
    FOR INSERT WITH CHECK (true);

