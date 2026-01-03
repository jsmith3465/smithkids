-- Create table for tracking feature announcements

CREATE TABLE IF NOT EXISTS feature_announcements (
    announcement_id SERIAL PRIMARY KEY,
    feature_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    link_url TEXT,
    link_text TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table to track which users have seen which announcements
CREATE TABLE IF NOT EXISTS user_announcement_views (
    view_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    announcement_id INTEGER NOT NULL REFERENCES feature_announcements(announcement_id),
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_uid, announcement_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_announcements_active ON feature_announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_key ON feature_announcements(feature_key);
CREATE INDEX IF NOT EXISTS idx_user_views_user ON user_announcement_views(user_uid);
CREATE INDEX IF NOT EXISTS idx_user_views_announcement ON user_announcement_views(announcement_id);

-- Enable Row Level Security
ALTER TABLE feature_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_announcement_views ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent execution)
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON feature_announcements;
DROP POLICY IF EXISTS "Enable read access for users" ON user_announcement_views;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON user_announcement_views;

-- Policies for feature_announcements
CREATE POLICY "Enable read access for all authenticated users" ON feature_announcements
    FOR SELECT USING (true);

-- Policies for user_announcement_views
CREATE POLICY "Enable read access for users" ON user_announcement_views
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON user_announcement_views
    FOR INSERT WITH CHECK (true);

-- Insert the first announcement for Pray Ground
INSERT INTO feature_announcements (feature_key, title, description, icon, link_url, link_text, is_active)
VALUES (
    'pray_ground',
    '🙏 New Feature: Pray Ground',
    'Share prayer requests with your family and celebrate answered prayers together! Submit prayer requests, track them, and mark them as answered when God answers your prayers. All family members will be notified when prayers are submitted and answered.',
    '🙏',
    'pages/pray-ground.html',
    'Visit Pray Ground',
    true
) ON CONFLICT (feature_key) DO NOTHING;

