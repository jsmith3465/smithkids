import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Get pending notifications
    const { data: notifications, error } = await supabase
      .from('approval_notification_queue')
      .select(`
        queue_id,
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
      console.error('Error fetching notifications:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!notifications || notifications.length === 0) {
      return new Response(JSON.stringify({ processed: 0, message: 'No pending notifications' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Process each notification
    let successCount = 0;
    let failCount = 0;

    for (const notification of notifications) {
      // Mark as processing
      await supabase
        .from('approval_notification_queue')
        .update({ status: 'processing' })
        .eq('queue_id', notification.queue_id);

      const approval = notification.unified_approvals;
      if (!approval) {
        await supabase
          .from('approval_notification_queue')
          .update({ status: 'failed', error_message: 'Approval not found' })
          .eq('queue_id', notification.queue_id);
        failCount++;
        continue;
      }

      const user = approval.Users;
      if (!user) {
        await supabase
          .from('approval_notification_queue')
          .update({ status: 'failed', error_message: 'User not found' })
          .eq('queue_id', notification.queue_id);
        failCount++;
        continue;
      }

      const user_name = user.First_Name && user.Last_Name
        ? `${user.First_Name} ${user.Last_Name}`
        : user.Username || 'Unknown User';

      // Call the send notification function
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/send-approval-notification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
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
          .from('approval_notification_queue')
          .update({ 
            status: 'sent', 
            processed_at: new Date().toISOString() 
          })
          .eq('queue_id', notification.queue_id);
        successCount++;
      } else {
        const errorText = await response.text();
        // Mark as failed
        await supabase
          .from('approval_notification_queue')
          .update({ 
            status: 'failed',
            error_message: errorText.substring(0, 500) // Limit error message length
          })
          .eq('queue_id', notification.queue_id);
        failCount++;
      }
    }

    return new Response(
      JSON.stringify({ 
        processed: notifications.length,
        success: successCount,
        failed: failCount
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing notifications:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

