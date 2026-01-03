-- Complete setup script for Pray Ground app
-- Run this file in Supabase SQL Editor to set up all required tables

-- ============================================
-- 1. Create prayer_requests table
-- ============================================
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

-- Add praise_report column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'prayer_requests' AND column_name = 'praise_report'
    ) THEN
        ALTER TABLE prayer_requests ADD COLUMN praise_report TEXT;
    END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prayer_requests_user ON prayer_requests(user_uid);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created ON prayer_requests(created_at);

-- Create index for praise_report only if the column exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'prayer_requests' AND column_name = 'praise_report'
    ) THEN
        CREATE INDEX IF NOT EXISTS idx_prayer_requests_praise_report 
        ON prayer_requests(praise_report) WHERE praise_report IS NOT NULL;
    END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent execution)
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON prayer_requests;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON prayer_requests;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON prayer_requests;

-- Create policies for prayer_requests
CREATE POLICY "Enable read access for authenticated users" ON prayer_requests
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON prayer_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON prayer_requests
    FOR UPDATE USING (true);

-- ============================================
-- 2. Create prayer_prayers table
-- ============================================
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

-- Create policies for prayer_prayers
CREATE POLICY "Enable read access for all authenticated users" ON prayer_prayers
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON prayer_prayers
    FOR INSERT WITH CHECK (true);

-- ============================================
-- Note: This script is idempotent and safe to run multiple times
-- It will create tables if they don't exist and update policies if needed
-- ============================================

