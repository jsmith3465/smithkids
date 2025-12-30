# Quick Start: Resend Email Notifications

## What You Need

1. ✅ Resend account (you have this)
2. ✅ Resend API key (you have this)
3. Supabase CLI installed
4. Admin email addresses in the Users table

## Step-by-Step Setup

### Step 1: Install Supabase CLI

```bash
npm install supabase --save-dev
```

✅ **Already done!** The CLI is now installed locally in your project.

### Step 2: Login to Supabase

```bash
npx supabase login
```

This will open your browser to authenticate.

### Step 3: Link to Your Project

```bash
cd /Users/ryansmith/Documents/Cursor/SmithKids/smithkids
npx supabase link --project-ref frlajamhyyectdrcbrnd
```

### Step 4: Deploy the Edge Functions

```bash
# Deploy the send notification function
npx supabase functions deploy send-approval-notification

# Deploy the process notifications function
npx supabase functions deploy process-notifications
```

### Step 5: Set Environment Variables

1. Go to: https://supabase.com/dashboard/project/frlajamhyyectdrcbrnd/settings/functions
2. Click **"Manage secrets"** or **"Environment Variables"**
3. Add these 4 secrets:

   | Name | Value |
   |------|-------|
   | `RESEND_API_KEY` | Your Resend API key (starts with `re_`) |
   | `SUPABASE_URL` | `https://frlajamhyyectdrcbrnd.supabase.co` |
   | `SUPABASE_SERVICE_ROLE_KEY` | Found in Project Settings → API → Service Role Key |
   | `SITE_URL` | Your website URL (e.g., `https://yourdomain.com`) |

**To find your Service Role Key:**
1. Go to Project Settings → API
2. Look for "service_role" key (keep this secret!)
3. Copy the entire key

### Step 6: Add Email Addresses to Admin Users

Run this SQL in Supabase SQL Editor to add email addresses:

```sql
-- Update admin users with their email addresses
-- Replace with actual email addresses
UPDATE "Users" 
SET "EmailAddress" = 'admin@yourdomain.com' 
WHERE "UID" = [YOUR_ADMIN_UID] AND user_type = 'admin';
```

Or update via the Supabase dashboard:
1. Go to Table Editor → Users
2. Find admin users
3. Add their email addresses in the EmailAddress column

### Step 7: Create Database Tables and Triggers

Run this SQL in Supabase SQL Editor:

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

### Step 8: Test the System

**Option A: Manual Test (Recommended First)**

1. Submit a test chore/workout/memory verse as a standard user
2. Check the `approval_notification_queue` table - you should see a new entry with status 'pending'
3. Manually call the process function:
   - Go to Supabase Dashboard → Edge Functions → process-notifications
   - Click "Invoke" or use the API endpoint
4. Check admin email inboxes

**Option B: Automatic Processing**

Set up a cron job or use pg_cron to call `process-notifications` every 5 minutes.

### Step 9: Verify Email Domain (Optional but Recommended)

For production, verify your domain in Resend:
1. Go to Resend Dashboard → Domains
2. Add your domain
3. Add the DNS records they provide
4. Update the Edge Function to use your domain instead of `notifications@resend.dev`

## Troubleshooting

**No emails sent?**
- Check Edge Function logs: Dashboard → Edge Functions → Logs
- Verify RESEND_API_KEY is set correctly
- Check that admin users have EmailAddress values
- Check Resend dashboard for delivery status

**Function deployment failed?**
- Make sure you're logged in: `supabase login`
- Check you're in the right directory
- Verify project ref is correct

**Emails going to spam?**
- Verify your domain in Resend
- Update the "from" address in the Edge Function to use your verified domain

## Next Steps

Once working, you can:
1. Set up automatic processing (cron job)
2. Add SMS notifications (Twilio)
3. Customize email templates
4. Add email preferences per admin

