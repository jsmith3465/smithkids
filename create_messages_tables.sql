-- Create Messages table
CREATE TABLE IF NOT EXISTS Messages (
    message_id SERIAL PRIMARY KEY,
    from_user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    to_user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    subject TEXT,
    body_html TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    parent_message_id INTEGER REFERENCES Messages(message_id),
    forwarded_from_message_id INTEGER REFERENCES Messages(message_id)
);

-- Create Deleted_Messages table to retain copies of deleted messages
CREATE TABLE IF NOT EXISTS Deleted_Messages (
    deleted_message_id SERIAL PRIMARY KEY,
    original_message_id INTEGER NOT NULL,
    from_user_uid BIGINT NOT NULL,
    to_user_uid BIGINT NOT NULL,
    subject TEXT,
    body_html TEXT NOT NULL,
    deleted_by_user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    original_created_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_to_user ON Messages(to_user_uid);
CREATE INDEX IF NOT EXISTS idx_messages_from_user ON Messages(from_user_uid);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON Messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_deleted_at ON Messages(deleted_at);
CREATE INDEX IF NOT EXISTS idx_deleted_messages_user ON Deleted_Messages(deleted_by_user_uid);
CREATE INDEX IF NOT EXISTS idx_deleted_messages_original ON Deleted_Messages(original_message_id);

