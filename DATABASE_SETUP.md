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

## Notes

- The `month_year` field should be in format 'YYYY-MM' (e.g., '2025-01' for January 2025)
- Make sure Row Level Security (RLS) policies are set appropriately for your use case
- The `status` field in Memory_Verse_Submissions can be 'pending', 'approved', or 'rejected'

