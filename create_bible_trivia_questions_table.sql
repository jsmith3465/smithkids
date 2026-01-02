-- Create Bible Trivia Questions table
CREATE TABLE IF NOT EXISTS bible_trivia_questions (
    question_id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    option_1 TEXT NOT NULL,
    option_2 TEXT NOT NULL,
    option_3 TEXT NOT NULL,
    option_4 TEXT NOT NULL,
    correct_answer_index INTEGER NOT NULL CHECK (correct_answer_index >= 0 AND correct_answer_index <= 3),
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'moderate', 'hard')),
    bible_book VARCHAR(100),
    bible_chapter INTEGER,
    bible_verse INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on difficulty for faster filtering
CREATE INDEX IF NOT EXISTS idx_bible_trivia_questions_difficulty ON bible_trivia_questions(difficulty);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_bible_trivia_questions_created_at ON bible_trivia_questions(created_at);

-- Add comment to table
COMMENT ON TABLE bible_trivia_questions IS 'Stores all Bible trivia questions with their difficulty levels and Bible references';

-- Enable Row Level Security (RLS)
ALTER TABLE bible_trivia_questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read questions
CREATE POLICY "Allow authenticated users to read questions"
    ON bible_trivia_questions
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow admins to insert/update/delete questions
CREATE POLICY "Allow admins to manage questions"
    ON bible_trivia_questions
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM Users
            WHERE Users.UID = auth.uid()
            AND Users.user_type = 'admin'
        )
    );

