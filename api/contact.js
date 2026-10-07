/**
 * Vercel Serverless Function — contact form.
 * POST /api/contact  { name, email, message }
 *
 * Delivery chain:
 *  1. Gmail SMTP (needs GMAIL_USER + GMAIL_APP_PASSWORD env) → both inboxes
 *  2. CONTACT_WEBHOOK_URL (Discord/Slack) if configured
 */

const INBOXES = ['mrgoblinsir@gmail.com', 'rznsenseii@gmail.com'];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const name = String(body.name || '').trim().slice(0, 80);
    const email = String(body.email || '').trim().slice(0, 160);
    const message = String(body.message || '').trim().slice(0, 4000);

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email.' });
    }

    // 1. Gmail SMTP — the real inbox delivery
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const nodemailer = (await import('nodemailer')).default;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });
      await transporter.sendMail({
        from: `"${name} via portfolio" <${process.env.GMAIL_USER}>`,
        to: INBOXES.join(', '),
        replyTo: `"${name}" <${email}>`,
        subject: `New portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><hr /><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
      });
      console.log(`[contact] emailed to inboxes from ${name} <${email}>`);
      return res.status(200).json({ ok: true, message: `Thanks ${name}! Your message reached my inbox.` });
    }

    // 2. Webhook fallback
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**New portfolio contact**\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message.slice(0, 1500)}`,
        }),
      }).catch(() => {});
      return res.status(200).json({ ok: true, message: `Thanks ${name}! Your message was received.` });
    }

    // 3. Nothing configured — honest error, not fake success
    console.log(`[contact] NOT DELIVERED (no email configured) from ${name} <${email}>: ${message.slice(0, 200)}`);
    return res.status(503).json({ ok: false, error: 'Email delivery is not set up yet — please DM me on Discord instead.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Could not send. Please email contact@vibeyuno.me directly.' });
  }
}
