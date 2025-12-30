# Database Tables Setup

## Monthly_Memory_Verses Table

Create this table in your Supabase database with the following structure:

```sql
CREATE TABLE Monthly_Memory_Verses (
    id SERIAL PRIMARY KEY,
    month_year TEXT NOT NULL UNIQUE,
    start_book TEXT NOT NULL,
    start_chapter INTEGER NOT NULL,
    start_verse INTEGER NOT NULL,
    end_book TEXT NOT NULL,
    end_chapter INTEGER NOT NULL,
    end_verse INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Memory_Verse_Submissions Table

Create this table for tracking user submissions:

```sql
CREATE TABLE Memory_Verse_Submissions (
    id SERIAL PRIMARY KEY,
    user_uid TEXT NOT NULL REFERENCES Users(UID),
    month_year TEXT NOT NULL,
    verse_id INTEGER REFERENCES Monthly_Memory_Verses(id),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (user_uid) REFERENCES Users(UID),
    FOREIGN KEY (verse_id) REFERENCES Monthly_Memory_Verses(id)
);
```

## hangman_scores Table

Create this table for tracking Hangman game scores:

```sql
CREATE TABLE hangman_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    word TEXT NOT NULL,
    won BOOLEAN NOT NULL DEFAULT FALSE,
    wrong_guesses INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## galaga_scores Table

Create this table for tracking Galaga game scores:

```sql
CREATE TABLE galaga_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    enemies_destroyed INTEGER DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## breakout_scores Table

Create this table for tracking Breakout game scores:

```sql
CREATE TABLE breakout_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    lives_remaining INTEGER NOT NULL DEFAULT 0,
    bricks_destroyed INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## tetris_scores Table

Create this table for tracking Tetris game scores:

```sql
CREATE TABLE tetris_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    lines_cleared INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tetris_scores_user ON tetris_scores(user_uid);
CREATE INDEX idx_tetris_scores_created ON tetris_scores(created_at);
```

## pacman_scores Table

Create this table for tracking Pac-Man game scores:

```sql
CREATE TABLE pacman_scores (
    score_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    dots_eaten INTEGER NOT NULL DEFAULT 0,
    game_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_pacman_scores_user ON pacman_scores(user_uid);
CREATE INDEX idx_pacman_scores_created ON pacman_scores(created_at);
```

## Unified_Approvals Table

Create this table for unified approval tracking of workouts, chores, and memory verses:

```sql
CREATE TABLE Unified_Approvals (
    approval_id SERIAL PRIMARY KEY,
    approval_type TEXT NOT NULL CHECK (approval_type IN ('workout', 'chore', 'memory_verse')),
    source_id INTEGER NOT NULL,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    credits_amount INTEGER NOT NULL DEFAULT 10,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by_uid BIGINT REFERENCES "Users"("UID")
);

CREATE INDEX idx_unified_approvals_status ON Unified_Approvals(status);
CREATE INDEX idx_unified_approvals_user ON Unified_Approvals(user_uid);
CREATE INDEX idx_unified_approvals_type_source ON Unified_Approvals(approval_type, source_id);
```

## User_Badges Table

Create this table for tracking user badges, including the 9 Fruits of the Spirit. This table tracks which badge was earned, which user earned it, and when it was received.

```sql
CREATE TABLE User_Badges (
    badge_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    badge_type TEXT NOT NULL,
    badge_name TEXT NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_uid, badge_type)
);

-- Indexes for better query performance
CREATE INDEX idx_user_badges_user ON User_Badges(user_uid);
CREATE INDEX idx_user_badges_type ON User_Badges(badge_type);

## badge_notifications Table

Create this table for tracking badge notifications that can be displayed across all pages:

```sql
CREATE TABLE badge_notifications (
    id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    badge_type TEXT NOT NULL,
    badge_name TEXT NOT NULL,
    credits_awarded INTEGER NOT NULL DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_badge_notifications_user ON badge_notifications(user_uid);
CREATE INDEX idx_badge_notifications_created ON badge_notifications(created_at);
```
CREATE INDEX idx_user_badges_earned_at ON User_Badges(earned_at);
CREATE INDEX idx_user_badges_user_type ON User_Badges(user_uid, badge_type);
```

### Table Structure Details:

- **badge_id**: Primary key, auto-incrementing unique identifier
- **user_uid**: Foreign key referencing the Users table, identifies who earned the badge
- **badge_type**: The type of badge (e.g., 'love', 'joy', 'peace', etc.)
- **badge_name**: Human-readable name of the badge (e.g., 'Love', 'Joy', 'Peace')
- **earned_at**: Timestamp of when the badge was earned (automatically set to current time)

### The 9 Fruits of the Spirit Badge Types:

The following badge_type values are used for Fruits of the Spirit:
- `'love'` - Love
- `'joy'` - Joy
- `'peace'` - Peace
- `'patience'` - Patience
- `'kindness'` - Kindness
- `'goodness'` - Goodness
- `'faithfulness'` - Faithfulness
- `'gentleness'` - Gentleness
- `'self_control'` - Self-Control

### Example Queries:

**Get all badges for a specific user:**
```sql
SELECT badge_type, badge_name, earned_at 
FROM User_Badges 
WHERE user_uid = [user_id]
ORDER BY earned_at DESC;
```

**Get all users who earned a specific badge:**
```sql
SELECT u.UID, u.First_Name, u.Last_Name, ub.earned_at
FROM User_Badges ub
JOIN Users u ON ub.user_uid = u.UID
WHERE ub.badge_type = 'love'
ORDER BY ub.earned_at DESC;
```

**Get count of badges earned by each user:**
```sql
SELECT u.UID, u.First_Name, u.Last_Name, COUNT(ub.badge_id) as badge_count
FROM Users u
LEFT JOIN User_Badges ub ON u.UID = ub.user_uid
GROUP BY u.UID, u.First_Name, u.Last_Name
ORDER BY badge_count DESC;
```

**Get all Fruit of the Spirit badges for a user:**
```sql
SELECT badge_type, badge_name, earned_at
FROM User_Badges
WHERE user_uid = [user_id]
  AND badge_type IN ('love', 'joy', 'peace', 'patience', 'kindness', 'goodness', 'faithfulness', 'gentleness', 'self_control')
ORDER BY earned_at DESC;
```

## Bible_Trivia_Results Table

Create this table for tracking detailed Bible Trivia game statistics:

```sql
CREATE TABLE Bible_Trivia_Results (
    result_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL DEFAULT 10,
    credits_earned INTEGER NOT NULL DEFAULT 0,
    percentage_correct DECIMAL(5,2) NOT NULL,
    easy_questions INTEGER NOT NULL DEFAULT 0,
    easy_correct INTEGER NOT NULL DEFAULT 0,
    moderate_questions INTEGER NOT NULL DEFAULT 0,
    moderate_correct INTEGER NOT NULL DEFAULT 0,
    hard_questions INTEGER NOT NULL DEFAULT 0,
    hard_correct INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_bible_trivia_user ON Bible_Trivia_Results(user_uid);
CREATE INDEX idx_bible_trivia_created_at ON Bible_Trivia_Results(created_at);
CREATE INDEX idx_bible_trivia_score ON Bible_Trivia_Results(score);
```

### Table Structure Details:

- **result_id**: Primary key, auto-incrementing unique identifier
- **user_uid**: Foreign key referencing the Users table, identifies who played
- **score**: Total number of correct answers (out of 10)
- **total_questions**: Total questions in the game (always 10)
- **credits_earned**: Number of credits earned based on score
- **percentage_correct**: Percentage of questions answered correctly
- **easy_questions**: Number of easy questions in the game (should be 5)
- **easy_correct**: Number of easy questions answered correctly
- **moderate_questions**: Number of moderate questions in the game (should be 3)
- **moderate_correct**: Number of moderate questions answered correctly
- **hard_questions**: Number of hard questions in the game (should be 2)
- **hard_correct**: Number of hard questions answered correctly
- **created_at**: Timestamp of when the game was completed

## Bible_Trivia_User_Stats Table

Create this table for tracking aggregated Bible Trivia statistics per user:

```sql
CREATE TABLE IF NOT EXISTS bible_trivia_user_stats (
    stats_id SERIAL PRIMARY KEY,
    user_uid BIGINT NOT NULL REFERENCES "Users"("UID") UNIQUE,
    total_games_played INTEGER NOT NULL DEFAULT 0,
    total_easy_questions INTEGER NOT NULL DEFAULT 0,
    total_easy_correct INTEGER NOT NULL DEFAULT 0,
    total_moderate_questions INTEGER NOT NULL DEFAULT 0,
    total_moderate_correct INTEGER NOT NULL DEFAULT 0,
    total_hard_questions INTEGER NOT NULL DEFAULT 0,
    total_hard_correct INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bible_trivia_user_stats_user ON bible_trivia_user_stats(user_uid);
```

### Table Structure Details:

- **stats_id**: Primary key, auto-incrementing unique identifier
- **user_uid**: Foreign key referencing the Users table, unique per user (one stats record per user)
- **total_games_played**: Total number of games completed by the user
- **total_easy_questions**: Total number of easy questions asked across all games
- **total_easy_correct**: Total number of easy questions answered correctly
- **total_moderate_questions**: Total number of moderate questions asked across all games
- **total_moderate_correct**: Total number of moderate questions answered correctly
- **total_hard_questions**: Total number of hard questions asked across all games
- **total_hard_correct**: Total number of hard questions answered correctly
- **last_updated**: Timestamp of when the stats were last updated

### Notes:

- This table is automatically updated each time a user completes a Bible Trivia game
- The stats are aggregated from individual game results in the `bible_trivia_results` table
- This provides fast access to user statistics without needing to aggregate from all game results each time

## TTT_Player_Results Table

Create this table for tracking individual player results in Tic Tac Toe games:

```sql
CREATE TABLE IF NOT EXISTS ttt_player_results (
    result_id SERIAL PRIMARY KEY,
    game_id BIGINT NOT NULL REFERENCES "TTT_Game_Results"("game_id") ON DELETE CASCADE,
    user_uid BIGINT REFERENCES "Users"("UID"),
    result TEXT NOT NULL CHECK (result IN ('win', 'loss', 'draw')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ttt_player_results_game ON ttt_player_results(game_id);
CREATE INDEX IF NOT EXISTS idx_ttt_player_results_user ON ttt_player_results(user_uid);
CREATE INDEX IF NOT EXISTS idx_ttt_player_results_result ON ttt_player_results(result);
```

### Table Structure Details:

- **result_id**: Primary key, auto-incrementing unique identifier
- **game_id**: Foreign key referencing the TTT_Game_Results table, links to the specific game
- **user_uid**: Foreign key referencing the Users table, identifies which user played (null for computer players)
- **result**: The result for this player - 'win', 'loss', or 'draw'
- **created_at**: Timestamp of when the result was recorded

### Notes:

- This table records each user's individual result for each Tic Tac Toe game
- Computer players are not recorded (user_uid will be null)
- Each game will have 1-2 records (one for each human player)
- The result is automatically determined based on the game outcome
- This provides a user-centric view of game results for easy statistics tracking

### Example Queries:

**Get all wins for a specific user:**
```sql
SELECT COUNT(*) as wins
FROM ttt_player_results
WHERE user_uid = [user_id] AND result = 'win';
```

**Get all games played by a user:**
```sql
SELECT result, COUNT(*) as count
FROM ttt_player_results
WHERE user_uid = [user_id]
GROUP BY result;
```

**Get win/loss/draw statistics for all users:**
```sql
SELECT 
    u.UID,
    u.First_Name,
    u.Last_Name,
    COUNT(CASE WHEN tpr.result = 'win' THEN 1 END) as wins,
    COUNT(CASE WHEN tpr.result = 'loss' THEN 1 END) as losses,
    COUNT(CASE WHEN tpr.result = 'draw' THEN 1 END) as draws
FROM Users u
LEFT JOIN ttt_player_results tpr ON u.UID = tpr.user_uid
GROUP BY u.UID, u.First_Name, u.Last_Name
ORDER BY wins DESC;
```

## Credit_Manager Table

Create this table for managing credit earning and spending rules for games and applications:

```sql
CREATE TABLE IF NOT EXISTS Credit_Manager (
    id SERIAL PRIMARY KEY,
    app_name TEXT NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('debit', 'credit')),
    credit_amount INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_credit_manager_app_name ON Credit_Manager(app_name);
CREATE INDEX IF NOT EXISTS idx_credit_manager_type ON Credit_Manager(transaction_type);
```

### Table Structure Details:

- **id**: Primary key, auto-incrementing unique identifier
- **app_name**: Name of the game/application/link (e.g., 'Bible Trivia', 'Workout', 'Tic Tac Toe')
- **transaction_type**: Whether this is a 'debit' (costs credits) or 'credit' (earns credits)
- **credit_amount**: The number of credits for this transaction type
- **created_at**: Timestamp of when the record was created
- **updated_at**: Timestamp of when the record was last updated

### Notes:

- This table defines the credit rules for each game/application
- Each app can have multiple entries (one for debit, one for credit, or both)
- The `transaction_type` field determines if the app costs credits (debit) or earns credits (credit)
- Admins can add, edit, and delete entries through the Credit Manager interface

### Example Queries:

**Get all credit-earning apps:**
```sql
SELECT app_name, credit_amount
FROM Credit_Manager
WHERE transaction_type = 'credit'
ORDER BY app_name;
```

**Get all apps that cost credits:**
```sql
SELECT app_name, credit_amount
FROM Credit_Manager
WHERE transaction_type = 'debit'
ORDER BY app_name;
```

**Get all rules for a specific app:**
```sql
SELECT transaction_type, credit_amount
FROM Credit_Manager
WHERE app_name = 'Bible Trivia'
ORDER BY transaction_type;
```

## Game_Application_Credit_Tracking Table

Create this table for tracking total credits earned and spent per game/application:

```sql
CREATE TABLE IF NOT EXISTS Game_Application_Credit_Tracking (
    tracking_id SERIAL PRIMARY KEY,
    game_app_type TEXT NOT NULL UNIQUE,
    game_app_name TEXT NOT NULL,
    total_credits_earned INTEGER NOT NULL DEFAULT 0,
    total_credits_spent INTEGER NOT NULL DEFAULT 0,
    total_transactions INTEGER NOT NULL DEFAULT 0,
    last_transaction_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_game_app_tracking_type ON Game_Application_Credit_Tracking(game_app_type);
CREATE INDEX IF NOT EXISTS idx_game_app_tracking_updated ON Game_Application_Credit_Tracking(updated_at);
```

### Table Structure Details:

- **tracking_id**: Primary key, auto-incrementing unique identifier
- **game_app_type**: Unique identifier for the game/application (e.g., 'bible_trivia', 'hangman', 'galaga', 'breakout', 'snake', 'tic_tac_toe', 'workout', 'chore', 'memory_verse', 'badge', etc.)
- **game_app_name**: Human-readable name of the game/application (e.g., 'Bible Trivia', 'Hangman', 'Galaga', etc.)
- **total_credits_earned**: Total number of credits earned by users from this game/application (sum of all credit_added transactions)
- **total_credits_spent**: Total number of credits spent by users on this game/application (sum of all game_payment transactions)
- **total_transactions**: Total number of credit transactions (both earned and spent) for this game/application
- **last_transaction_at**: Timestamp of the most recent transaction for this game/application
- **created_at**: Timestamp of when the tracking record was first created
- **updated_at**: Timestamp of when the tracking record was last updated

### Notes:

- This table provides aggregated credit statistics per game/application
- The table should be updated whenever a credit transaction occurs in the `Credit_Transactions` table
- Use a database trigger or application logic to automatically update this table when transactions are recorded
- The `game_app_type` should match the `game_type` field used in the `Credit_Transactions` table
- For applications that don't have a game_type (like workouts, chores), use a consistent naming convention

### Example Queries:

**Get all games/applications with their credit totals:**
```sql
SELECT 
    game_app_name,
    total_credits_earned,
    total_credits_spent,
    (total_credits_earned - total_credits_spent) as net_credits,
    total_transactions,
    last_transaction_at
FROM Game_Application_Credit_Tracking
ORDER BY total_transactions DESC;
```

**Get games/applications that generate the most credits:**
```sql
SELECT game_app_name, total_credits_earned
FROM Game_Application_Credit_Tracking
WHERE total_credits_earned > 0
ORDER BY total_credits_earned DESC;
```

**Get games/applications that cost the most credits:**
```sql
SELECT game_app_name, total_credits_spent
FROM Game_Application_Credit_Tracking
WHERE total_credits_spent > 0
ORDER BY total_credits_spent DESC;
```

**Get net credits (earned - spent) per game/application:**
```sql
SELECT 
    game_app_name,
    total_credits_earned,
    total_credits_spent,
    (total_credits_earned - total_credits_spent) as net_credits
FROM Game_Application_Credit_Tracking
ORDER BY net_credits DESC;
```

### Database Trigger (Optional):

To automatically update this table when transactions occur, you can create a trigger:

```sql
-- Function to update game/application credit tracking
CREATE OR REPLACE FUNCTION update_game_app_credit_tracking()
RETURNS TRIGGER AS $$
DECLARE
    app_type TEXT;
    app_name TEXT;
    credit_amount INTEGER;
    is_credit BOOLEAN;
BEGIN
    -- Determine game/app type and name
    app_type := COALESCE(NEW.game_type, NEW.transaction_type);
    
    -- Map transaction types to application names
    CASE app_type
        WHEN 'bible_trivia' THEN app_name := 'Bible Trivia';
        WHEN 'hangman' THEN app_name := 'Hangman';
        WHEN 'galaga' THEN app_name := 'Galaga';
        WHEN 'breakout' THEN app_name := 'Breakout';
        WHEN 'snake' THEN app_name := 'Snake';
        WHEN 'tic_tac_toe' THEN app_name := 'Tic Tac Toe';
        WHEN 'workout' THEN app_name := 'Workout';
        WHEN 'chore' THEN app_name := 'Chore';
        WHEN 'memory_verse' THEN app_name := 'Memory Verse';
        WHEN 'badge' THEN app_name := 'Badge';
        ELSE app_name := INITCAP(REPLACE(app_type, '_', ' '));
    END CASE;
    
    -- Determine if this is a credit (earned) or debit (spent)
    is_credit := (NEW.transaction_type = 'credit_added');
    credit_amount := NEW.amount;
    
    -- Insert or update the tracking record
    INSERT INTO Game_Application_Credit_Tracking (
        game_app_type,
        game_app_name,
        total_credits_earned,
        total_credits_spent,
        total_transactions,
        last_transaction_at,
        updated_at
    )
    VALUES (
        app_type,
        app_name,
        CASE WHEN is_credit THEN credit_amount ELSE 0 END,
        CASE WHEN NOT is_credit THEN credit_amount ELSE 0 END,
        1,
        NEW.created_at,
        NOW()
    )
    ON CONFLICT (game_app_type) DO UPDATE SET
        total_credits_earned = Game_Application_Credit_Tracking.total_credits_earned + 
            CASE WHEN is_credit THEN credit_amount ELSE 0 END,
        total_credits_spent = Game_Application_Credit_Tracking.total_credits_spent + 
            CASE WHEN NOT is_credit THEN credit_amount ELSE 0 END,
        total_transactions = Game_Application_Credit_Tracking.total_transactions + 1,
        last_transaction_at = NEW.created_at,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on Credit_Transactions table
CREATE TRIGGER trigger_update_game_app_credit_tracking
AFTER INSERT ON Credit_Transactions
FOR EACH ROW
EXECUTE FUNCTION update_game_app_credit_tracking();
```

## Notes

- The `month_year` field should be in format 'YYYY-MM' (e.g., '2025-01' for January 2025)
- Make sure Row Level Security (RLS) policies are set appropriately for your use case
- The `status` field in Memory_Verse_Submissions can be 'pending', 'approved', or 'rejected'
- All game score tables track who played, when they played, and their score
- The Unified_Approvals table consolidates all pending approvals (workouts, chores, memory verses) into one table for easier management
- When a workout, chore, or memory verse is created, an entry is automatically created in Unified_Approvals
- The `source_id` field references the original table's ID (workout_id, chore_id, or memory_verse_submission id)
- The User_Badges table tracks all badges earned by users, including the 9 Fruits of the Spirit badges
- The Bible_Trivia_Results table tracks detailed statistics for each game, including breakdown by difficulty level
- The Bible_Trivia_User_Stats table tracks aggregated statistics per user for fast access to total games played and question totals by difficulty
- The ttt_player_results table tracks individual player results (win/loss/draw) for each Tic Tac Toe game played
- The Game_Application_Credit_Tracking table provides aggregated credit statistics per game/application, tracking both credits earned and credits spent

