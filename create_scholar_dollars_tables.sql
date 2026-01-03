-- Scholar Dollars App Database Tables

-- Table for tracking quarters
CREATE TABLE IF NOT EXISTS scholar_dollars_quarters (
    quarter_id SERIAL PRIMARY KEY,
    quarter_name VARCHAR(10) NOT NULL, -- e.g., "Q3 2026"
    quarter_number INTEGER NOT NULL, -- 1, 2, 3, or 4
    year INTEGER NOT NULL,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(quarter_number, year)
);

-- Table for user's subjects/classes
CREATE TABLE IF NOT EXISTS scholar_dollars_subjects (
    subject_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    subject_name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for grades per subject per quarter
CREATE TABLE IF NOT EXISTS scholar_dollars_grades (
    grade_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    subject_id INTEGER NOT NULL REFERENCES scholar_dollars_subjects(subject_id) ON DELETE CASCADE,
    quarter_id INTEGER NOT NULL REFERENCES scholar_dollars_quarters(quarter_id),
    grade TEXT NOT NULL, -- "A", "B", "C", "D", "F"
    is_submitted BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_uid, subject_id, quarter_id)
);

-- Table for grade submissions (for approval tracking)
CREATE TABLE IF NOT EXISTS scholar_dollars_submissions (
    submission_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    quarter_id INTEGER NOT NULL REFERENCES scholar_dollars_quarters(quarter_id),
    credits_requested INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'denied'
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by_uid BIGINT REFERENCES "Users"("UID"),
    notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scholar_dollars_subjects_user ON scholar_dollars_subjects(user_uid);
CREATE INDEX IF NOT EXISTS idx_scholar_dollars_grades_user ON scholar_dollars_grades(user_uid);
CREATE INDEX IF NOT EXISTS idx_scholar_dollars_grades_quarter ON scholar_dollars_grades(quarter_id);
CREATE INDEX IF NOT EXISTS idx_scholar_dollars_submissions_user ON scholar_dollars_submissions(user_uid);
CREATE INDEX IF NOT EXISTS idx_scholar_dollars_submissions_quarter ON scholar_dollars_submissions(quarter_id);

-- Enable Row Level Security (RLS)
ALTER TABLE scholar_dollars_quarters ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholar_dollars_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholar_dollars_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholar_dollars_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for scholar_dollars_quarters (everyone can read)
DROP POLICY IF EXISTS "Anyone can read quarters" ON scholar_dollars_quarters;
CREATE POLICY "Anyone can read quarters" ON scholar_dollars_quarters
    FOR SELECT USING (true);

-- Policies for scholar_dollars_subjects
DROP POLICY IF EXISTS "Users can view their own subjects" ON scholar_dollars_subjects;
CREATE POLICY "Users can view their own subjects" ON scholar_dollars_subjects
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own subjects" ON scholar_dollars_subjects;
CREATE POLICY "Users can insert their own subjects" ON scholar_dollars_subjects
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own subjects" ON scholar_dollars_subjects;
CREATE POLICY "Users can update their own subjects" ON scholar_dollars_subjects
    FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Users can delete their own subjects" ON scholar_dollars_subjects;
CREATE POLICY "Users can delete their own subjects" ON scholar_dollars_subjects
    FOR DELETE USING (true);

-- Policies for scholar_dollars_grades
DROP POLICY IF EXISTS "Users can view their own grades" ON scholar_dollars_grades;
CREATE POLICY "Users can view their own grades" ON scholar_dollars_grades
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own grades" ON scholar_dollars_grades;
CREATE POLICY "Users can insert their own grades" ON scholar_dollars_grades
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own grades" ON scholar_dollars_grades;
CREATE POLICY "Users can update their own grades" ON scholar_dollars_grades
    FOR UPDATE USING (true);

-- Policies for scholar_dollars_submissions
DROP POLICY IF EXISTS "Users can view their own submissions" ON scholar_dollars_submissions;
CREATE POLICY "Users can view their own submissions" ON scholar_dollars_submissions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own submissions" ON scholar_dollars_submissions;
CREATE POLICY "Users can insert their own submissions" ON scholar_dollars_submissions
    FOR INSERT WITH CHECK (true);

-- Insert initial quarter (Q3 2026)
INSERT INTO scholar_dollars_quarters (quarter_name, quarter_number, year, is_active)
VALUES ('Q3 2026', 3, 2026, true)
ON CONFLICT (quarter_number, year) DO NOTHING;

