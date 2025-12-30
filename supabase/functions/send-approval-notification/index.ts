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

    // Get all admin users with email addresses
    const { data: admins, error: adminError } = await supabase
      .from('Users')
      .select('UID, First_Name, Last_Name, Username, EmailAddress')
      .eq('user_type', 'admin')
      .not('EmailAddress', 'is', null);

    if (adminError) {
      console.error('Error fetching admins:', adminError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch admins' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!admins || admins.length === 0) {
      console.warn('No admin users with email addresses found');
      return new Response(
        JSON.stringify({ error: 'No admin users with email addresses found' }),
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
    
    // Get the site URL from the request or use a default
    const siteUrl = Deno.env.get('SITE_URL') || 'https://yourdomain.com';
    
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
              <a href="${siteUrl}/pages/approvals.html" class="button">Review Approval</a>
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
      if (!admin.EmailAddress) {
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
            to: [admin.EmailAddress],
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error(`Failed to send email to ${admin.EmailAddress}:`, errorText);
          emailResults.push({ admin: admin.UID, email: admin.EmailAddress, success: false, error: errorText });
        } else {
          const result = await emailResponse.json();
          console.log(`Email sent successfully to ${admin.EmailAddress}`);
          emailResults.push({ admin: admin.UID, email: admin.EmailAddress, success: true, id: result.id });
        }
      } catch (error) {
        console.error(`Error sending email to ${admin.EmailAddress}:`, error);
        emailResults.push({ admin: admin.UID, email: admin.EmailAddress, success: false, error: error.message });
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

