-- Create tetris_scores table for tracking Tetris game scores

CREATE TABLE IF NOT EXISTS tetris_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    lines_cleared INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_tetris_scores_user ON tetris_scores(user_uid);
CREATE INDEX IF NOT EXISTS idx_tetris_scores_created ON tetris_scores(created_at);

