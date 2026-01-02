-- Create fruit_nominations table for Fruit of the Spirit badge nominations

CREATE TABLE IF NOT EXISTS fruit_nominations (
    nomination_id SERIAL PRIMARY KEY,
    nominator_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    nominee_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    fruit_type TEXT NOT NULL CHECK (fruit_type IN ('love', 'joy', 'peace', 'patience', 'kindness', 'goodness', 'faithfulness', 'gentleness', 'self_control')),
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by_uid BIGINT REFERENCES "Users"("UID"),
    denied_at TIMESTAMP WITH TIME ZONE,
    denied_by_uid BIGINT REFERENCES "Users"("UID")
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_fruit_nominations_nominator ON fruit_nominations(nominator_uid);
CREATE INDEX IF NOT EXISTS idx_fruit_nominations_nominee ON fruit_nominations(nominee_uid);
CREATE INDEX IF NOT EXISTS idx_fruit_nominations_status ON fruit_nominations(status);
CREATE INDEX IF NOT EXISTS idx_fruit_nominations_created ON fruit_nominations(created_at);

-- Enable Row Level Security
ALTER TABLE fruit_nominations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read nominations
CREATE POLICY "Enable read access for authenticated users" ON fruit_nominations
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert nominations
CREATE POLICY "Enable insert for authenticated users" ON fruit_nominations
    FOR INSERT WITH CHECK (true);

-- Create policy to allow admins to update nominations
CREATE POLICY "Enable update for admins" ON fruit_nominations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM "Users"
            WHERE "Users"."UID" = auth.uid()
            AND "Users"."user_type" = 'admin'
        )
    );

