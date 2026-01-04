-- Create blackjack_scores table for tracking Blackjack game results

CREATE TABLE IF NOT EXISTS blackjack_scores (
    game_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    result VARCHAR(10) NOT NULL CHECK (result IN ('win', 'loss', 'push')),
    player_final_hand INTEGER NOT NULL,
    dealer_final_hand INTEGER NOT NULL,
    player_blackjack BOOLEAN DEFAULT FALSE,
    dealer_blackjack BOOLEAN DEFAULT FALSE,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_blackjack_scores_user ON blackjack_scores(user_uid);
CREATE INDEX IF NOT EXISTS idx_blackjack_scores_created ON blackjack_scores(created_at);
CREATE INDEX IF NOT EXISTS idx_blackjack_scores_result ON blackjack_scores(result);

-- Enable Row Level Security
ALTER TABLE blackjack_scores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read scores
CREATE POLICY "Enable read access for all users" ON blackjack_scores
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert their own scores
CREATE POLICY "Enable insert for authenticated users" ON blackjack_scores
    FOR INSERT WITH CHECK (true);

