-- Create block_blast_scores table for tracking Block Blast game scores

CREATE TABLE IF NOT EXISTS block_blast_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    blocks_cleared INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_block_blast_scores_user ON block_blast_scores(user_uid);
CREATE INDEX IF NOT EXISTS idx_block_blast_scores_created ON block_blast_scores(created_at);

