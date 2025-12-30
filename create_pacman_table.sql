-- Create pacman_scores table for tracking Pac-Man game scores

CREATE TABLE IF NOT EXISTS pacman_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    dots_eaten INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_pacman_scores_user ON pacman_scores(user_uid);
CREATE INDEX IF NOT EXISTS idx_pacman_scores_created ON pacman_scores(created_at);

