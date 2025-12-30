# Resend + Supabase Integration Guide

This guide will help you set up email notifications using Resend when new approvals are needed.

## Step 1: Sign Up for Resend

1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address
4. Go to **API Keys** in the dashboard
5. Create a new API key (name it "Supabase Notifications")
6. **Copy the API key** - you'll need it in Step 3

## Step 2: Verify Your Domain (Optional but Recommended)

For production, you should verify a domain:
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain registrar
5. Wait for verification (usually a few minutes)

**For testing**, you can use Resend's test domain, but emails may go to spam.

## Step 3: Create Supabase Edge Function

### 3.1 Install Supabase CLI (if not already installed)

```bash
npm install -g supabase
```

### 3.2 Login and Link to Your Project

```bash
# Login to Supabase
supabase login

# Link to your project (replace with your project ref)
supabase link --project-ref frlajamhyyectdrcbrnd
```

### 3.3 Create the Edge Function

```bash
# Create the function
supabase functions new send-approval-notification
```

This creates a folder: `supabase/functions/send-approval-notification/`

### 3.4 Write the Function Code

Create/edit: `supabase/functions/send-approval-notification/index.ts`

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

Deno.serve(async (req) => {
  try {
    // Get the approval data from the request
    const { approval_id, approval_type, user_name, description, credits_amount } = await req.json();

    if (!approval_id) {
      return new Response(
        JSON.stringify({ error: 'Missing approval_id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get Supabase client with service role key for admin access
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get all admin users
    const { data: admins, error: adminError } = await supabase
      .from('Users')
      .select('UID, First_Name, Last_Name, Username, Email')
      .eq('user_type', 'admin');

    if (adminError) {
      console.error('Error fetching admins:', adminError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch admins' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!admins || admins.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No admin users found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format approval type for display
    const approvalTypeLabels: Record<string, string> = {
      workout: 'Workout',
      chore: 'Chore',
      memory_verse: 'Memory Verse',
    };

    const typeLabel = approvalTypeLabels[approval_type] || approval_type;

    // Prepare email content
    const emailSubject = `New ${typeLabel} Approval Needed - Smith Team Six`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #DAA520; }
            .button { display: inline-block; background: #DAA520; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Smith Team Six</h1>
              <p>New Approval Request</p>
            </div>
            <div class="content">
              <div class="info-box">
                <p><strong>Type:</strong> ${typeLabel}</p>
                <p><strong>User:</strong> ${user_name}</p>
                <p><strong>Description:</strong> ${description || 'N/A'}</p>
                <p><strong>Credits:</strong> ${credits_amount}</p>
              </div>
              <a href="https://yourdomain.com/pages/approvals.html" class="button">Review Approval</a>
              <div class="footer">
                <p>This is an automated notification from Smith Team Six</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to all admins
    const emailResults = [];
    for (const admin of admins) {
      if (!admin.Email) {
        console.warn(`Admin ${admin.UID} has no email address`);
        continue;
      }

      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Smith Team Six <notifications@resend.dev>', // Use your verified domain in production
            to: [admin.Email],
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error(`Failed to send email to ${admin.Email}:`, errorText);
          emailResults.push({ admin: admin.UID, email: admin.Email, success: false, error: errorText });
        } else {
          const result = await emailResponse.json();
          console.log(`Email sent successfully to ${admin.Email}`);
          emailResults.push({ admin: admin.UID, email: admin.Email, success: true, id: result.id });
        }
      } catch (error) {
        console.error(`Error sending email to ${admin.Email}:`, error);
        emailResults.push({ admin: admin.UID, email: admin.Email, success: false, error: error.message });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notifications sent to ${admins.length} admin(s)`,
        results: emailResults,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});
```

### 3.5 Deploy the Function

```bash
# Deploy the function
supabase functions deploy send-approval-notification
```

### 3.6 Set Environment Variables

In your Supabase Dashboard:
1. Go to **Project Settings** → **Edge Functions**
2. Click **Manage secrets**
3. Add these secrets:
   - `RESEND_API_KEY` = Your Resend API key from Step 1
   - `SUPABASE_URL` = Your Supabase URL (already set, but verify)
   - `SUPABASE_SERVICE_ROLE_KEY` = Your service role key (found in Project Settings → API)

## Step 4: Create Database Trigger

Run this SQL in your Supabase SQL Editor:

```sql
-- Create a function to call the Edge Function
CREATE OR REPLACE FUNCTION notify_admins_of_approval()
RETURNS TRIGGER AS $$
DECLARE
  user_name TEXT;
  user_data RECORD;
  approval_type_label TEXT;
BEGIN
  -- Get user information
  SELECT First_Name, Last_Name, Username INTO user_data
  FROM "Users"
  WHERE "UID" = NEW.user_uid;
  
  -- Format user name
  user_name := COALESCE(
    user_data.First_Name || ' ' || user_data.Last_Name,
    user_data.Username,
    'Unknown User'
  );
  
  -- Format approval type
  approval_type_label := CASE NEW.approval_type
    WHEN 'workout' THEN 'Workout'
    WHEN 'chore' THEN 'Chore'
    WHEN 'memory_verse' THEN 'Memory Verse'
    ELSE NEW.approval_type
  END;
  
  -- Call the Edge Function using pg_net extension
  -- First, enable the extension if not already enabled
  PERFORM net.http_post(
    url := 'https://frlajamhyyectdrcbrnd.supabase.co/functions/v1/send-approval-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := jsonb_build_object(
      'approval_id', NEW.approval_id,
      'approval_type', NEW.approval_type,
      'user_name', user_name,
      'description', NEW.description,
      'credits_amount', NEW.credits_amount
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enable pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the trigger
DROP TRIGGER IF EXISTS on_new_approval_created ON unified_approvals;
CREATE TRIGGER on_new_approval_created
  AFTER INSERT ON unified_approvals
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION notify_admins_of_approval();
```

**Note:** If `pg_net` extension is not available, use the alternative approach below.

## Alternative: Use HTTP Extension or Webhook

If `pg_net` doesn't work, create a notification queue table and process it with a scheduled function:

```sql
-- Create notification queue
CREATE TABLE IF NOT EXISTS approval_notification_queue (
  queue_id SERIAL PRIMARY KEY,
  approval_id INTEGER NOT NULL REFERENCES unified_approvals(approval_id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- Create trigger to add to queue
CREATE OR REPLACE FUNCTION queue_approval_notification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pending' THEN
    INSERT INTO approval_notification_queue (approval_id, status)
    VALUES (NEW.approval_id, 'pending');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_approval_queued
  AFTER INSERT ON unified_approvals
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION queue_approval_notification();
```

Then create a second Edge Function to process the queue (call it every 5 minutes via cron or external service).

## Step 5: Test the Integration

1. Submit a test chore/workout/memory verse
2. Check your admin email inbox
3. Check Supabase Edge Function logs:
   - Go to **Edge Functions** → **send-approval-notification** → **Logs**
4. Check Resend dashboard for email delivery status

## Step 6: Update Email "From" Address

Once your domain is verified in Resend:
1. Update the `from` field in the Edge Function:
   ```typescript
   from: 'Smith Team Six <notifications@yourdomain.com>',
   ```
2. Redeploy the function:
   ```bash
   supabase functions deploy send-approval-notification
   ```

## Troubleshooting

### Emails not sending?
1. Check Edge Function logs in Supabase dashboard
2. Verify `RESEND_API_KEY` is set correctly
3. Check Resend dashboard for delivery status
4. Verify admin users have email addresses in the `Users` table

### Function not being called?
1. Check if trigger is created: `SELECT * FROM pg_trigger WHERE tgname = 'on_new_approval_created';`
2. Test the function manually:
   ```sql
   SELECT net.http_post(...);
   ```

### Need help?
- Resend docs: https://resend.com/docs
- Supabase Edge Functions: https://supabase.com/docs/guides/functions

