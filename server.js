const express = require('express');
const cors    = require('cors');
const { Resend } = require('resend');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;
const PASSWORD = 'st77w123';

app.use(cors());
app.use(express.json());

// Basic認証
app.use((req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) {
    res.setHeader('WWW-Authenticate', 'Basic realm="MAIL_DAEMON"');
    return res.status(401).send('認証が必要です');
  }
  const [,b64] = auth.split(' ');
  const [,pass] = Buffer.from(b64,'base64').toString().split(':');
  if (pass !== PASSWORD) {
    res.setHeader('WWW-Authenticate', 'Basic realm="MAIL_DAEMON"');
    return res.status(401).send('パスワードが違います');
  }
  next();
});

app.use(express.static(path.join(__dirname)));

app.post('/api/send', async (req, res) => {
  const { apiKey, from, fromName, subject, body, recipients, delayMs } = req.body;
  if (!apiKey)             return res.status(400).json({ error: 'API Key required.' });
  if (!from)               return res.status(400).json({ error: 'From email required.' });
  if (!recipients?.length) return res.status(400).json({ error: 'No recipients.' });
  if (!subject || !body)   return res.status(400).json({ error: 'Subject and body required.' });

  const resend    = new Resend(apiKey);
  const delay     = ms => new Promise(r => setTimeout(r, ms));
  const fromField = fromName ? `${fromName} <${from}>` : from;
  let sent = 0, failed = 0;
  const results = [];

  for (let i = 0; i < recipients.length; i++) {
    const r        = recipients[i];
    const name     = r.name || r.email.split('@')[0];
    const pSubject = subject.replace(/\{\{name\}\}/gi, name);
    const pBody    = body.replace(/\{\{name\}\}/gi, name);
    try {
      await resend.emails.send({
        from: fromField, to: [r.email],
        subject: pSubject, text: pBody,
        html: pBody.replace(/\n/g, '<br>')
      });
      sent++;
      results.push({ idx: i+1, email: r.email, status: 'sent' });
    } catch (err) {
      failed++;
      results.push({ idx: i+1, email: r.email, status: 'failed', error: err.message });
    }
    if (i < recipients.length - 1) await delay(parseInt(delayMs) || 1000);
  }
  res.json({ sent, failed, total: recipients.length, results });
});

app.listen(PORT, () => console.log(`[MAIL_DAEMON] Running → http://localhost:${PORT}`));
