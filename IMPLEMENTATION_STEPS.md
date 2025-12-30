# Resend Email Notification Implementation Steps

Follow these steps to complete the setup:

## Step 1: Install Supabase CLI (if not already installed)

```bash
npm install -g supabase
```

## Step 2: Login and Link to Your Project

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref frlajamhyyectdrcbrnd
```

## Step 3: Deploy the Edge Function

```bash
# Deploy the function
supabase functions deploy send-approval-notification
```

## Step 4: Set Environment Variables in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/frlajamhyyectdrcbrnd
2. Navigate to **Project Settings** → **Edge Functions**
3. Click **Manage secrets** (or **Environment Variables**)
4. Add these secrets:

   - **RESEND_API_KEY**: Your Resend API key (from your Resend dashboard)
   - **SUPABASE_URL**: `https://frlajamhyyectdrcbrnd.supabase.co` (should already be set)
   - **SUPABASE_SERVICE_ROLE_KEY**: Your service role key (found in Project Settings → API → Service Role Key)
   - **SITE_URL**: Your website URL (e.g., `https://yourdomain.com` or `http://localhost:8080` for testing)

## Step 5: Create Database Tables and Triggers

Run this SQL in your Supabase SQL Editor:

```sql
-- Create notification queue table
CREATE TABLE IF NOT EXISTS approval_notification_queue (
  queue_id SERIAL PRIMARY KEY,
  approval_id INTEGER NOT NULL REFERENCES unified_approvals(approval_id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_approval_notification_queue_status 
ON approval_notification_queue(status) 
WHERE status = 'pending';

-- Create trigger function to add to queue
CREATE OR REPLACE FUNCTION queue_approval_notification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pending' THEN
    INSERT INTO approval_notification_queue (approval_id, status)
    VALUES (NEW.approval_id, 'pending')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS on_new_approval_queued ON unified_approvals;
CREATE TRIGGER on_new_approval_queued
  AFTER INSERT ON unified_approvals
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION queue_approval_notification();
```

## Step 6: Create Process Notifications Function

Create another Edge Function to process the queue:

**File: `supabase/functions/process-notifications/index.ts`** (I'll create this next)

## Step 7: Test the System

1. Submit a test chore, workout, or memory verse as a standard user
2. Check the `approval_notification_queue` table - you should see a new entry
3. Manually call the process-notifications function or wait for it to run
4. Check admin email inboxes for the notification

## Step 8: Set Up Scheduled Processing (Optional)

You can set up a cron job or use Supabase's pg_cron extension to automatically process notifications every few minutes.

## Troubleshooting

- **No emails sent**: Check Edge Function logs in Supabase dashboard
- **Emails in spam**: Verify your domain in Resend (or use a verified domain)
- **Function errors**: Check the logs in Supabase Dashboard → Edge Functions → Logs

