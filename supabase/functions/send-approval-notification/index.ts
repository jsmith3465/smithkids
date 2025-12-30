import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  console.log('=== send-approval-notification function called ===');
  console.log('Method:', req.method);
  console.log('Headers:', Object.fromEntries(req.headers.entries()));

  try {
    // Get the approval data from the request
    const requestBody = await req.json();
    console.log('Request body:', requestBody);
    const { approval_id, approval_type, user_name, description, credits_amount } = requestBody;

    if (!approval_id) {
      console.error('Missing approval_id in request');
      return new Response(
        JSON.stringify({ error: 'Missing approval_id' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    console.log('Processing approval:', { approval_id, approval_type, user_name, credits_amount });

    // Check environment variables
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set!');
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase credentials not set!');
      return new Response(
        JSON.stringify({ error: 'Supabase credentials not configured' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Get Supabase client with service role key for admin access
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    console.log('Supabase client created');

    // Get all admin users with email addresses
    console.log('Fetching admin users...');
    const { data: admins, error: adminError } = await supabase
      .from('Users')
      .select('UID, First_Name, Last_Name, Username, EmailAddress')
      .eq('user_type', 'admin')
      .not('EmailAddress', 'is', null);

    if (adminError) {
      console.error('Error fetching admins:', adminError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch admins', details: adminError.message }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    console.log(`Found ${admins?.length || 0} admin users with email addresses`);
    if (admins && admins.length > 0) {
      console.log('Admin emails:', admins.map(a => a.EmailAddress));
    }

    if (!admins || admins.length === 0) {
      console.warn('No admin users with email addresses found');
      return new Response(
        JSON.stringify({ error: 'No admin users with email addresses found' }),
        { 
          status: 404, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Format approval type for display
    const approvalTypeLabels: Record<string, string> = {
      workout: 'Workout',
      chore: 'Chore',
      memory_verse: 'Memory Verse',
    };

    const typeLabel = approvalTypeLabels[approval_type] || approval_type;

    // Generate secure tokens for approve and deny actions
    const generateToken = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      const array = new Uint8Array(64);
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(array);
      } else {
        // Fallback for environments without crypto
        for (let i = 0; i < 64; i++) {
          array[i] = Math.floor(Math.random() * 256);
        }
      }
      for (let i = 0; i < array.length; i++) {
        token += chars[array[i] % chars.length];
      }
      return token;
    };

    const approveToken = generateToken();
    const denyToken = generateToken();

    // Store tokens in database
    const { error: tokenError } = await supabase
      .from('approval_tokens')
      .insert([
        {
          approval_id: approval_id,
          token: approveToken,
          action: 'approve'
        },
        {
          approval_id: approval_id,
          token: denyToken,
          action: 'deny'
        }
      ]);

    if (tokenError) {
      console.error('Error creating approval tokens:', tokenError);
      // Continue anyway - tokens are nice to have but not critical
      // If tokens fail, we'll just show the review link
    }

    // Prepare email content
    const emailSubject = `New ${typeLabel} Approval Needed - Smith Team Six`;
    
    // Get the site URL from the request or use a default
    const siteUrl = Deno.env.get('SITE_URL') || 'https://yourdomain.com';
    
    const approveUrl = `${siteUrl}/pages/approve-action.html?token=${approveToken}`;
    const denyUrl = `${siteUrl}/pages/approve-action.html?token=${denyToken}`;
    
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
            .button { display: inline-block; background: #DAA520; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            .button-approve { background: #28a745; }
            .button-deny { background: #dc3545; }
            .button-review { background: #DAA520; }
            .button-container { text-align: center; margin: 20px 0; }
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
              <div class="button-container">
                <a href="${approveUrl}" class="button button-approve">✓ Approve (${credits_amount} credits)</a>
                <a href="${denyUrl}" class="button button-deny">✗ Deny</a>
              </div>
              <div style="text-align: center; margin-top: 15px;">
                <a href="${siteUrl}/pages/approvals.html" class="button button-review">View All Approvals</a>
              </div>
              <div class="footer">
                <p>This is an automated notification from Smith Team Six</p>
                <p style="font-size: 11px; color: #999;">Click the buttons above to approve or deny this request directly from your email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to all admins
    console.log(`Sending emails to ${admins.length} admin(s)...`);
    const emailResults = [];
    for (const admin of admins) {
      if (!admin.EmailAddress) {
        console.warn(`Admin ${admin.UID} has no email address`);
        continue;
      }

      console.log(`Sending email to ${admin.EmailAddress}...`);
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Smith Team Six <notifications@email.smithfamjam.com>',
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error in notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});

