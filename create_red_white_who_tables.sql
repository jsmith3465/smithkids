-- Red, White & Who App Database Tables

-- Main table for individuals (patriotic heroes and founding fathers)
CREATE TABLE IF NOT EXISTS red_white_who_individuals (
    individual_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_year INTEGER,
    death_year INTEGER,
    birth_date DATE,
    death_date DATE,
    key_events TEXT[], -- Array of key events (e.g., "Signing of Declaration of Independence")
    key_facts JSONB, -- JSON object with key facts
    biographical_summary TEXT NOT NULL, -- 500-1000 word summary
    main_photo_url TEXT, -- URL or path to main photo
    photo_gallery JSONB, -- Array of photo objects with url and caption
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions for each individual (10 questions per individual)
CREATE TABLE IF NOT EXISTS red_white_who_questions (
    question_id SERIAL PRIMARY KEY,
    individual_id INTEGER NOT NULL REFERENCES red_white_who_individuals(individual_id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    wrong_answer_1 TEXT NOT NULL,
    wrong_answer_2 TEXT NOT NULL,
    wrong_answer_3 TEXT NOT NULL,
    question_order INTEGER DEFAULT 0, -- For ordering questions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(individual_id, question_text)
);

-- Track quiz attempts per user (max 3 attempts per individual)
CREATE TABLE IF NOT EXISTS red_white_who_quiz_attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    individual_id INTEGER NOT NULL REFERENCES red_white_who_individuals(individual_id) ON DELETE CASCADE,
    score INTEGER NOT NULL, -- Number of correct answers (0-5)
    total_questions INTEGER NOT NULL DEFAULT 5,
    questions_asked JSONB, -- Store which questions were asked
    answers_given JSONB, -- Store user's answers
    credits_awarded INTEGER DEFAULT 0, -- Credits awarded (10 if perfect, 0 otherwise)
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_uid, individual_id, attempted_at)
);

-- Track which biographies users have read (for 5 credit reward)
CREATE TABLE IF NOT EXISTS red_white_who_reads (
    read_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    individual_id INTEGER NOT NULL REFERENCES red_white_who_individuals(individual_id) ON DELETE CASCADE,
    credits_awarded INTEGER DEFAULT 5, -- 5 credits for reading
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_uid, individual_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_red_white_who_individuals_name ON red_white_who_individuals(name);
CREATE INDEX IF NOT EXISTS idx_red_white_who_individuals_birth_year ON red_white_who_individuals(birth_year);
CREATE INDEX IF NOT EXISTS idx_red_white_who_individuals_death_year ON red_white_who_individuals(death_year);
CREATE INDEX IF NOT EXISTS idx_red_white_who_questions_individual_id ON red_white_who_questions(individual_id);
CREATE INDEX IF NOT EXISTS idx_red_white_who_quiz_attempts_user_uid ON red_white_who_quiz_attempts(user_uid);
CREATE INDEX IF NOT EXISTS idx_red_white_who_quiz_attempts_individual_id ON red_white_who_quiz_attempts(individual_id);
CREATE INDEX IF NOT EXISTS idx_red_white_who_reads_user_uid ON red_white_who_reads(user_uid);
CREATE INDEX IF NOT EXISTS idx_red_white_who_reads_individual_id ON red_white_who_reads(individual_id);

-- Row Level Security (RLS) Policies
ALTER TABLE red_white_who_individuals ENABLE ROW LEVEL SECURITY;
ALTER TABLE red_white_who_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE red_white_who_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE red_white_who_reads ENABLE ROW LEVEL SECURITY;

-- Policies for red_white_who_individuals (everyone can read)
DROP POLICY IF EXISTS "Anyone can read individuals" ON red_white_who_individuals;
CREATE POLICY "Anyone can read individuals" ON red_white_who_individuals
    FOR SELECT USING (true);

-- Policies for red_white_who_questions (everyone can read)
DROP POLICY IF EXISTS "Anyone can read questions" ON red_white_who_questions;
CREATE POLICY "Anyone can read questions" ON red_white_who_questions
    FOR SELECT USING (true);

-- Policies for red_white_who_quiz_attempts (users can only see their own attempts)
-- Note: Since we're using anon key, RLS is permissive - app-level checks handle security
DROP POLICY IF EXISTS "Users can view their own quiz attempts" ON red_white_who_quiz_attempts;
CREATE POLICY "Users can view their own quiz attempts" ON red_white_who_quiz_attempts
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own quiz attempts" ON red_white_who_quiz_attempts;
CREATE POLICY "Users can insert their own quiz attempts" ON red_white_who_quiz_attempts
    FOR INSERT WITH CHECK (true);

-- Policies for red_white_who_reads (users can only see their own reads)
-- Note: Since we're using anon key, RLS is permissive - app-level checks handle security
DROP POLICY IF EXISTS "Users can view their own reads" ON red_white_who_reads;
CREATE POLICY "Users can view their own reads" ON red_white_who_reads
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own reads" ON red_white_who_reads;
CREATE POLICY "Users can insert their own reads" ON red_white_who_reads
    FOR INSERT WITH CHECK (true);

