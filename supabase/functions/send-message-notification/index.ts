import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

type RequestBody = {
  message_id?: number;
  recipient_uid?: number;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const body = (await req.json()) as RequestBody;
    const message_id = body.message_id;
    const recipient_uid = body.recipient_uid;

    if (!message_id || !recipient_uid) {
      return new Response(JSON.stringify({ error: "Missing message_id or recipient_uid" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing RESEND_API_KEY / SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        },
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch message + sender details
    const { data: message, error: messageError } = await supabase
      .from("messages")
      .select("id, sender_uid, subject, body_html, created_at")
      .eq("id", message_id)
      .single();

    if (messageError || !message) {
      return new Response(JSON.stringify({ error: "Message not found", details: messageError?.message }), {
        status: 404,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const { data: sender, error: senderError } = await supabase
      .from("Users")
      .select('UID, First_Name, Last_Name, Username')
      .eq("UID", message.sender_uid)
      .single();

    if (senderError || !sender) {
      return new Response(JSON.stringify({ error: "Sender not found", details: senderError?.message }), {
        status: 404,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Recipient must be admin + have email
    const { data: recipient, error: recipientError } = await supabase
      .from("Users")
      .select('UID, First_Name, Last_Name, Username, user_type, EmailAddress')
      .eq("UID", recipient_uid)
      .single();

    if (recipientError || !recipient) {
      return new Response(JSON.stringify({ error: "Recipient not found", details: recipientError?.message }), {
        status: 404,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (recipient.user_type !== "admin") {
      return new Response(JSON.stringify({ skipped: true, reason: "Recipient is not admin" }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (!recipient.EmailAddress) {
      return new Response(JSON.stringify({ skipped: true, reason: "Admin recipient has no email" }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const senderName =
      sender.First_Name && sender.Last_Name ? `${sender.First_Name} ${sender.Last_Name}` : (sender.Username || "Unknown User");
    const recipientName =
      recipient.First_Name && recipient.Last_Name
        ? `${recipient.First_Name} ${recipient.Last_Name}`
        : (recipient.Username || "Admin");

    const subject = message.subject ? `📩 Message from ${senderName}: ${message.subject}` : `📩 Message from ${senderName}`;

    const createdAt = message.created_at ? new Date(message.created_at).toLocaleString() : new Date().toLocaleString();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.5; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #DAA520 0%, #CC5500 100%); color: white; padding: 18px 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 18px 20px; border-radius: 0 0 10px 10px; }
            .meta { background: white; padding: 12px 14px; border-left: 4px solid #DAA520; margin: 12px 0; }
            .message { background: white; padding: 14px; border-radius: 8px; }
            .small { font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="font-size: 18px; font-weight: 700;">New Message</div>
              <div class="small" style="color: rgba(255,255,255,0.9);">Hello ${recipientName} — you received a new message.</div>
            </div>
            <div class="content">
              <div class="meta">
                <div><strong>From:</strong> ${senderName}</div>
                <div><strong>Sent:</strong> ${createdAt}</div>
                <div><strong>Subject:</strong> ${message.subject || "(no subject)"}</div>
              </div>
              <div class="message">
                ${message.body_html}
              </div>
              <div class="small" style="margin-top: 14px;">
                This is an automated message notification from Smith Team Six.
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Smith Team Six <notifications@email.smithfamjam.com>",
        to: [recipient.EmailAddress],
        subject,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      return new Response(JSON.stringify({ error: "Failed to send email", details: errorText }), {
        status: 502,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const result = await emailResponse.json();
    return new Response(JSON.stringify({ success: true, id: result?.id ?? null }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error?.message ?? String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});

