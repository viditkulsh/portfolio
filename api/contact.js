// Uses Resend (https://resend.com) — free tier: 3,000 emails/month, 100/day
// No SMTP needed, just a REST API key. Works on all Google account types.

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL; // Your email to receive messages

  if (!resendApiKey || !toEmail) {
    console.error('RESEND_API_KEY or CONTACT_EMAIL not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        reply_to: `${name} <${email}>`,
        to: [toEmail],
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1b2a;color:#e0e0e0;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#7c3aed,#2563eb);padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:20px;">New Portfolio Message</h2>
            </div>
            <div style="padding:24px 32px;">
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                <tr>
                  <td style="padding:8px 0;color:#a78bfa;font-weight:600;width:80px;">From</td>
                  <td style="padding:8px 0;color:#e0e0e0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#a78bfa;font-weight:600;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#a78bfa;font-weight:600;">Subject</td>
                  <td style="padding:8px 0;color:#e0e0e0;">${subject}</td>
                </tr>
              </table>
              <div style="background:#1a2940;padding:16px 20px;border-radius:8px;border-left:3px solid #7c3aed;">
                <p style="margin:0;color:#cbd5e1;line-height:1.6;white-space:pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="padding:16px 32px;background:#0a1628;text-align:center;font-size:12px;color:#64748b;">
              Sent from your portfolio contact form
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Resend error:', data);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Contact API error:', error.message);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
