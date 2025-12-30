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

## Notes

- The `month_year` field should be in format 'YYYY-MM' (e.g., '2025-01' for January 2025)
- Make sure Row Level Security (RLS) policies are set appropriately for your use case
- The `status` field in Memory_Verse_Submissions can be 'pending', 'approved', or 'rejected'
- All game score tables track who played, when they played, and their score

