# Testing Email Notifications - Step by Step Guide

This guide will help you verify that the Edge Function is working and test email notifications.

## Step 1: Verify Edge Function is Deployed

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/frlajamhyyectdrcbrnd
2. Navigate to **Edge Functions** in the left sidebar
3. Look for `send-approval-notification` in the list
4. Click on it to view details
5. Verify it shows as "Active" or "Deployed"

## Step 2: Check Environment Variables

1. In the Supabase Dashboard, go to **Project Settings** → **Edge Functions**
2. Click on **Manage secrets** or **Environment Variables**
3. Verify these are set:
   - `RESEND_API_KEY` - Your Resend API key
   - `SUPABASE_URL` - `https://frlajamhyyectdrcbrnd.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` - Your service role key
   - `SITE_URL` - Your website URL (e.g., `https://yourdomain.com` or `http://localhost:8080`)

## Step 3: Verify Admin Users Have Email Addresses

1. Go to **Table Editor** → **Users**
2. Find all users with `user_type = 'admin'`
3. Verify they have `EmailAddress` filled in (not null)
4. If missing, add email addresses for admin users

## Step 4: Test the Edge Function Manually

### Option A: Test via Supabase Dashboard

1. Go to **Edge Functions** → `send-approval-notification`
2. Click **Invoke** or **Test**
3. Use this test payload:
```json
{
  "approval_id": 1,
  "approval_type": "workout",
  "user_name": "Test User",
  "description": "Test workout submission",
  "credits_amount": 10
}
```
4. Click **Invoke** and check the response
5. Check your email inbox (and spam folder)

### Option B: Test via Browser Console

1. Open your website in a browser
2. Open Developer Console (F12)
3. Run this test code:
```javascript
const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';

// Get your session token
const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test the function
const { data, error } = await supabase.functions.invoke('send-approval-notification', {
  body: {
    approval_id: 999,
    approval_type: 'workout',
    user_name: 'Test User',
    description: 'Test workout',
    credits_amount: 10
  }
});

console.log('Result:', data);
console.log('Error:', error);
```

## Step 5: Check Edge Function Logs

1. Go to **Edge Functions** → `send-approval-notification` → **Logs**
2. Look for recent invocations
3. Check for:
   - `=== send-approval-notification function called ===`
   - `Found X admin users with email addresses`
   - `Admin emails: [...]`
   - `Sending email to...`
   - Any error messages

## Step 6: Test the Full Flow

1. **Submit a Test Approval:**
   - Log in as a standard user
   - Submit a workout, chore, or memory verse
   - Check browser console for logs:
     - "Attempting to send approval notification"
     - "Approval notification sent successfully" or error messages

2. **Check Supabase Logs:**
   - Go to Edge Functions → Logs
   - Look for the function call
   - Check for any errors

3. **Check Email:**
   - Check admin email inbox
   - Check spam/junk folder
   - Look for email with subject: "New [Type] Approval Needed - Smith Team Six"
   - Verify email contains:
     - Approval details
     - Green "Approve" button
     - Red "Deny" button
     - "View All Approvals" link

4. **Test Email Links:**
   - Click the "Approve" button in the email
   - Should redirect to approval page
   - Should show success message
   - Check that credits were awarded
   - Check that approval status changed

## Step 7: Check Resend Dashboard

1. Go to https://resend.com/dashboard
2. Navigate to **Emails** or **Logs**
3. Look for recent email sends
4. Check delivery status:
   - ✅ Delivered
   - ⚠️ Pending
   - ❌ Failed (with error details)

## Troubleshooting

### No emails received?

1. **Check Edge Function Logs:**
   - Look for error messages
   - Check if function was called
   - Verify admin users were found

2. **Check Environment Variables:**
   - Verify `RESEND_API_KEY` is correct
   - Check `SITE_URL` is set correctly

3. **Check Admin Emails:**
   - Verify admin users have `EmailAddress` filled in
   - Check email addresses are valid

4. **Check Resend Dashboard:**
   - Look for failed sends
   - Check error messages
   - Verify API key is active

5. **Check Browser Console:**
   - Look for error messages when submitting
   - Check if function invoke succeeded
   - Look for fallback method attempts

### Function not being called?

1. **Check Browser Console:**
   - Look for "Attempting to send approval notification"
   - Check for error messages
   - Verify `approval_id` was created

2. **Check Database:**
   - Verify `unified_approvals` entry was created
   - Check `approval_id` exists

3. **Check Authentication:**
   - Verify user is logged in
   - Check session is valid

### Emails going to spam?

1. **Verify Domain in Resend:**
   - Go to Resend Dashboard → Domains
   - Verify your domain is verified
   - Update Edge Function to use verified domain

2. **Update From Address:**
   - In `supabase/functions/send-approval-notification/index.ts`
   - Change `from: 'Smith Team Six <notifications@resend.dev>'`
   - To: `from: 'Smith Team Six <notifications@yourdomain.com>'`
   - Redeploy: `npx supabase functions deploy send-approval-notification`

## Quick Test Checklist

- [ ] Edge Function is deployed and active
- [ ] Environment variables are set correctly
- [ ] Admin users have email addresses
- [ ] Function can be invoked manually
- [ ] Logs show function is being called
- [ ] Emails appear in Resend dashboard
- [ ] Emails arrive in inbox (check spam)
- [ ] Email links work correctly
- [ ] Approve/Deny buttons function properly

## Next Steps

Once everything is working:
1. Test with real submissions (workout, chore, memory verse)
2. Verify all admin users receive emails
3. Test approve/deny links from emails
4. Monitor logs for any issues
5. Check Resend dashboard for delivery rates

