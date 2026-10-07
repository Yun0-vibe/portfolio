/**
 * Vercel Serverless Function — contact form.
 * POST /api/contact  { name, email, message }
 */
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

    console.log(`[contact] ${name} <${email}>: ${message.slice(0, 300)}`);

    // Optional: forward to a webhook if configured (Discord / Slack / Formspree).
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**New portfolio contact**\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message.slice(0, 1500)}`,
        }),
      }).catch(() => {});
    }

    return res.status(200).json({ ok: true, message: `Thanks ${name}! Your message was received.` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please email contact@vibeyuno.me directly.' });
  }
}
