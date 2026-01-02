-- Create prayer_requests table for Pray Ground app

CREATE TABLE IF NOT EXISTS prayer_requests (
    request_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    title TEXT NOT NULL,
    details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'answered')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    answered_at TIMESTAMP WITH TIME ZONE,
    answered_by_uid BIGINT REFERENCES "Users"("UID")
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prayer_requests_user ON prayer_requests(user_uid);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created ON prayer_requests(created_at);

-- Enable Row Level Security
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read prayer requests
CREATE POLICY "Enable read access for authenticated users" ON prayer_requests
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert prayer requests
CREATE POLICY "Enable insert for authenticated users" ON prayer_requests
    FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own prayer requests
CREATE POLICY "Enable update for request owner" ON prayer_requests
    FOR UPDATE USING (auth.uid() = user_uid);

