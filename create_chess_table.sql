-- Chess game scores table

CREATE TABLE IF NOT EXISTS chess_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    opponent_uid BIGINT REFERENCES "Users"("UID"), -- NULL if opponent is Computer
    is_computer_opponent BOOLEAN DEFAULT FALSE,
    result TEXT NOT NULL CHECK (result IN ('win', 'loss', 'draw')),
    moves_count INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chess_scores_user ON chess_scores(user_uid);
CREATE INDEX IF NOT EXISTS idx_chess_scores_opponent ON chess_scores(opponent_uid);
CREATE INDEX IF NOT EXISTS idx_chess_scores_created ON chess_scores(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE chess_scores ENABLE ROW LEVEL SECURITY;

-- Policies for chess_scores
DROP POLICY IF EXISTS "Users can view their own chess scores" ON chess_scores;
CREATE POLICY "Users can view their own chess scores" ON chess_scores
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own chess scores" ON chess_scores;
CREATE POLICY "Users can insert their own chess scores" ON chess_scores
    FOR INSERT WITH CHECK (true);

