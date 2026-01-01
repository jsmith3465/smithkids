-- Messaging System Tables + RPC (Supabase)
-- Designed to match the existing app pattern (custom Users table + anon client).
-- NOTE: This script does NOT enable RLS by default (to avoid breaking existing anon-key usage).

-- 1) Core message content (one row per composed message)
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  sender_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
  recipient_uids BIGINT[] NOT NULL,
  subject TEXT,
  body_html TEXT NOT NULL,
  parent_message_id BIGINT REFERENCES messages(id),
  forwarded_from_message_id BIGINT REFERENCES messages(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_sender_uid ON messages(sender_uid);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_uids_gin ON messages USING GIN (recipient_uids);

-- 2) Per-user mailbox state (inbox/sent/trash + read/deleted retention)
CREATE TABLE IF NOT EXISTS message_boxes (
  id BIGSERIAL PRIMARY KEY,
  user_uid BIGINT NOT NULL REFERENCES "Users"("UID"),
  message_id BIGINT NOT NULL REFERENCES messages(id),
  folder TEXT NOT NULL CHECK (folder IN ('inbox', 'sent', 'trash')),
  original_folder TEXT NOT NULL CHECK (original_folder IN ('inbox', 'sent')),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  trashed_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,      -- user clicked "delete" (moves to trash)
  purged_at TIMESTAMP WITH TIME ZONE,       -- user clicked "delete forever" (still retained)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_uid, message_id)
);

CREATE INDEX IF NOT EXISTS idx_message_boxes_user_folder ON message_boxes(user_uid, folder);
CREATE INDEX IF NOT EXISTS idx_message_boxes_user_unread ON message_boxes(user_uid, is_read) WHERE folder = 'inbox';
CREATE INDEX IF NOT EXISTS idx_message_boxes_message_id ON message_boxes(message_id);

-- Updated timestamp helper
CREATE OR REPLACE FUNCTION set_message_boxes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_message_boxes_set_updated_at ON message_boxes;
CREATE TRIGGER trg_message_boxes_set_updated_at
BEFORE UPDATE ON message_boxes
FOR EACH ROW
EXECUTE FUNCTION set_message_boxes_updated_at();

-- 3) RPC: Send message (creates one message row + mailbox rows for sender/recipients)
CREATE OR REPLACE FUNCTION send_message(
  p_sender_uid BIGINT,
  p_recipient_uids BIGINT[],
  p_subject TEXT,
  p_body_html TEXT,
  p_parent_message_id BIGINT DEFAULT NULL,
  p_forwarded_from_message_id BIGINT DEFAULT NULL
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  v_message_id BIGINT;
  v_recipient_uid BIGINT;
BEGIN
  IF p_sender_uid IS NULL THEN
    RAISE EXCEPTION 'sender_uid is required';
  END IF;

  IF p_recipient_uids IS NULL OR array_length(p_recipient_uids, 1) IS NULL OR array_length(p_recipient_uids, 1) < 1 THEN
    RAISE EXCEPTION 'recipient_uids is required';
  END IF;

  -- Prevent sending to self-only with no recipients
  IF array_length(p_recipient_uids, 1) = 1 AND p_recipient_uids[1] = p_sender_uid THEN
    RAISE EXCEPTION 'cannot send a message to yourself only';
  END IF;

  INSERT INTO messages (
    sender_uid,
    recipient_uids,
    subject,
    body_html,
    parent_message_id,
    forwarded_from_message_id
  )
  VALUES (
    p_sender_uid,
    p_recipient_uids,
    NULLIF(TRIM(p_subject), ''),
    p_body_html,
    p_parent_message_id,
    p_forwarded_from_message_id
  )
  RETURNING id INTO v_message_id;

  -- Sender "Sent" copy
  INSERT INTO message_boxes (user_uid, message_id, folder, original_folder, is_read, read_at)
  VALUES (p_sender_uid, v_message_id, 'sent', 'sent', TRUE, NOW())
  ON CONFLICT (user_uid, message_id) DO NOTHING;

  -- Recipients "Inbox" copies
  FOREACH v_recipient_uid IN ARRAY p_recipient_uids
  LOOP
    -- Skip sender if included in the array
    IF v_recipient_uid = p_sender_uid THEN
      CONTINUE;
    END IF;

    INSERT INTO message_boxes (user_uid, message_id, folder, original_folder, is_read)
    VALUES (v_recipient_uid, v_message_id, 'inbox', 'inbox', FALSE)
    ON CONFLICT (user_uid, message_id) DO NOTHING;
  END LOOP;

  RETURN v_message_id;
END;
$$;

-- 4) RPC: Mark read/unread
CREATE OR REPLACE FUNCTION set_message_read_state(
  p_user_uid BIGINT,
  p_message_id BIGINT,
  p_is_read BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE message_boxes
  SET
    is_read = p_is_read,
    read_at = CASE WHEN p_is_read THEN NOW() ELSE NULL END
  WHERE user_uid = p_user_uid AND message_id = p_message_id;
END;
$$;

-- 5) RPC: Move to trash (retained)
CREATE OR REPLACE FUNCTION trash_message(
  p_user_uid BIGINT,
  p_message_id BIGINT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE message_boxes
  SET
    folder = 'trash',
    trashed_at = NOW(),
    deleted_at = NOW()
  WHERE user_uid = p_user_uid AND message_id = p_message_id;
END;
$$;

-- 6) RPC: Restore from trash
CREATE OR REPLACE FUNCTION restore_message(
  p_user_uid BIGINT,
  p_message_id BIGINT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE message_boxes
  SET
    folder = original_folder,
    trashed_at = NULL
  WHERE user_uid = p_user_uid AND message_id = p_message_id;
END;
$$;

-- 7) RPC: "Delete forever" (still retained in DB)
CREATE OR REPLACE FUNCTION purge_message(
  p_user_uid BIGINT,
  p_message_id BIGINT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE message_boxes
  SET
    folder = 'trash',
    purged_at = NOW()
  WHERE user_uid = p_user_uid AND message_id = p_message_id;
END;
$$;

