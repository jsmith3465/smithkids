# Notification Setup Guide for Approval Alerts

This guide explains how to set up email and SMS notifications for admins when new approvals are needed.

## Recommended Approach: Supabase Edge Functions + Database Trigger

### Step 1: Choose Your Notification Service

#### For Email (Recommended: Resend)
- **Free tier**: 3,000 emails/month
- **Cost**: $20/month for 50,000 emails
- **Setup**: https://resend.com
- **Why**: Simple API, great developer experience, good deliverability

#### Alternative Email Services:
- **SendGrid**: 100 emails/day free, then $19.95/month
- **Mailgun**: 5,000 emails/month free for 3 months
- **AWS SES**: Very cheap ($0.10 per 1,000 emails)

#### For SMS (Recommended: Twilio)
- **Cost**: ~$0.0075 per SMS (varies by country)
- **Setup**: https://twilio.com
- **Why**: Most reliable, good documentation

### Step 2: Create Supabase Edge Function

Create a new Edge Function in your Supabase project:

**File: `supabase/functions/send-approval-notification/index.ts`**

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

// Configuration - Add these as environment variables in Supabase
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID') || '';
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN') || '';
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || '';
const ADMIN_PHONE = Deno.env.get('ADMIN_PHONE') || ''; // Format: +1234567890

Deno.serve(async (req) => {
  try {
    const { approval_id, approval_type, user_name, description, credits_amount } = await req.json();

    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all admin users
    const { data: admins, error: adminError } = await supabase
      .from('Users')
      .select('UID, First_Name, Last_Name, Username, Email, Phone')
      .eq('user_type', 'admin');

    if (adminError) {
      console.error('Error fetching admins:', adminError);
      return new Response(JSON.stringify({ error: 'Failed to fetch admins' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const results = [];

    // Send email to all admins
    for (const admin of admins) {
      if (admin.Email) {
        const emailResult = await sendEmail(admin.Email, {
          approval_id,
          approval_type,
          user_name,
          description,
          credits_amount,
        });
        results.push({ admin: admin.UID, email: emailResult });
      }

      // Send SMS if phone number exists
      if (admin.Phone) {
        const smsResult = await sendSMS(admin.Phone, {
          approval_type,
          user_name,
          credits_amount,
        });
        results.push({ admin: admin.UID, sms: smsResult });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in notification function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

async function sendEmail(to: string, data: any) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { skipped: true };
  }

  const approvalTypeLabels = {
    workout: 'Workout',
    chore: 'Chore',
    memory_verse: 'Memory Verse',
  };

  const typeLabel = approvalTypeLabels[data.approval_type as keyof typeof approvalTypeLabels] || data.approval_type;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Smith Team Six <notifications@yourdomain.com>', // Update with your domain
      to: [to],
      subject: `New ${typeLabel} Approval Needed`,
      html: `
        <h2>New Approval Request</h2>
        <p><strong>Type:</strong> ${typeLabel}</p>
        <p><strong>User:</strong> ${data.user_name}</p>
        <p><strong>Description:</strong> ${data.description || 'N/A'}</p>
        <p><strong>Credits:</strong> ${data.credits_amount}</p>
        <p><a href="https://yourdomain.com/pages/approvals.html">Review Approval</a></p>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Email send failed:', error);
    return { error: error };
  }

  return { success: true };
}

async function sendSMS(to: string, data: any) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.warn('Twilio credentials not configured, skipping SMS');
    return { skipped: true };
  }

  const approvalTypeLabels = {
    workout: 'Workout',
    chore: 'Chore',
    memory_verse: 'Memory Verse',
  };

  const typeLabel = approvalTypeLabels[data.approval_type as keyof typeof approvalTypeLabels] || data.approval_type;

  const message = `New ${typeLabel} approval needed from ${data.user_name} (${data.credits_amount} credits). Review at: https://yourdomain.com/pages/approvals.html`;

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
      },
      body: new URLSearchParams({
        From: '+1234567890', // Your Twilio phone number
        To: to,
        Body: message,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('SMS send failed:', error);
    return { error: error };
  }

  return { success: true };
}
```

### Step 3: Deploy the Edge Function

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref frlajamhyyectdrcbrnd

# Deploy the function
supabase functions deploy send-approval-notification

# Set environment variables in Supabase Dashboard:
# - Go to Project Settings > Edge Functions > Environment Variables
# - Add: RESEND_API_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, ADMIN_EMAIL, ADMIN_PHONE
```

### Step 4: Create Database Trigger

Run this SQL in your Supabase SQL Editor:

```sql
-- Create a function that calls the Edge Function
CREATE OR REPLACE FUNCTION notify_admin_approval()
RETURNS TRIGGER AS $$
DECLARE
  user_name TEXT;
  user_data RECORD;
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
  
  -- Call the Edge Function (this will be done via HTTP request)
  -- Note: Supabase doesn't support direct HTTP calls from triggers
  -- We'll use pg_net extension or webhook approach
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Alternative: Use Supabase's built-in webhook or pg_net extension
-- For now, we'll create a simpler approach using a notification table

-- Create notification queue table
CREATE TABLE IF NOT EXISTS approval_notifications (
  notification_id SERIAL PRIMARY KEY,
  approval_id INTEGER NOT NULL REFERENCES unified_approvals(approval_id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Create trigger to add to notification queue
CREATE OR REPLACE FUNCTION queue_approval_notification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pending' THEN
    INSERT INTO approval_notifications (approval_id, status)
    VALUES (NEW.approval_id, 'pending');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_approval
  AFTER INSERT ON unified_approvals
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION queue_approval_notification();
```

### Step 5: Create a Cron Job or Scheduled Function

Since Supabase triggers can't directly call HTTP endpoints, create a scheduled function that processes the notification queue:

**File: `supabase/functions/process-notifications/index.ts`**

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Get pending notifications
  const { data: notifications, error } = await supabase
    .from('approval_notifications')
    .select(`
      notification_id,
      approval_id,
      unified_approvals (
        approval_type,
        user_uid,
        description,
        credits_amount,
        Users!unified_approvals_user_uid_fkey (First_Name, Last_Name, Username)
      )
    `)
    .eq('status', 'pending')
    .limit(10);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Process each notification
  for (const notification of notifications || []) {
    const approval = notification.unified_approvals;
    const user = approval.Users;
    
    const user_name = user.First_Name && user.Last_Name
      ? `${user.First_Name} ${user.Last_Name}`
      : user.Username || 'Unknown User';

    // Call the send notification function
    const response = await fetch(
      `${supabaseUrl}/functions/v1/send-approval-notification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          approval_id: notification.approval_id,
          approval_type: approval.approval_type,
          user_name: user_name,
          description: approval.description,
          credits_amount: approval.credits_amount,
        }),
      }
    );

    if (response.ok) {
      // Mark as sent
      await supabase
        .from('approval_notifications')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('notification_id', notification.notification_id);
    } else {
      // Mark as failed
      await supabase
        .from('approval_notifications')
        .update({ status: 'failed' })
        .eq('notification_id', notification.notification_id);
    }
  }

  return new Response(JSON.stringify({ processed: notifications?.length || 0 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
```

### Step 6: Set Up Cron Job

Use Supabase's pg_cron extension or an external service like cron-job.org to call the process-notifications function every 5 minutes:

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the function to run every 5 minutes
SELECT cron.schedule(
  'process-approval-notifications',
  '*/5 * * * *', -- Every 5 minutes
  $$
  SELECT net.http_post(
    url := 'https://frlajamhyyectdrcbrnd.supabase.co/functions/v1/process-notifications',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
    )
  );
  $$
);
```

## Alternative: Simpler Client-Side Approach

If you don't want to set up Edge Functions, you can add email/SMS sending directly in your JavaScript when approvals are created:

**File: `js/submit-chores.js` (add after successful submission)**

```javascript
async function sendApprovalNotification(choreType, userName) {
  // Call a webhook service like Zapier, Make.com, or n8n
  // Or use a service like EmailJS for simple email sending
  
  try {
    await fetch('https://your-webhook-url.com/approval-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chore',
        description: choreType,
        user: userName,
      }),
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
    // Don't fail the submission if notification fails
  }
}
```

## Cost Estimates

### Email Only (Resend)
- Free tier: 3,000 emails/month
- If you have 10 approvals/day = 300/month = **FREE**

### SMS Only (Twilio)
- ~$0.0075 per SMS
- 10 approvals/day = 300/month = **~$2.25/month**

### Combined
- Email: FREE
- SMS: ~$2.25/month
- **Total: ~$2.25/month**

## Recommendation

Start with **email only** using Resend (free tier should be sufficient). Add SMS later if needed for urgent approvals.

