import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'svkdiamonds@gmail.com';
const OWNER_PHONE = process.env.OWNER_PHONE || '+917718880577';

// 1. Initialize Nodemailer Transporter
let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: (Number(process.env.SMTP_PORT) || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

// 2. Initialize Twilio Client
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

// Save inquiry locally so no inquiries are lost
function saveLocalInquiry(record) {
  try {
    const file = path.join(__dirname, 'enquiries.json');
    let list = [];
    if (fs.existsSync(file)) {
      list = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
    }
    list.push(record);
    fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('[Storage Error] Could not save inquiry to file:', err.message);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    emailConfigured: !!transporter,
    twilioConfigured: !!twilioClient,
    ownerEmail: OWNER_EMAIL,
    ownerPhone: OWNER_PHONE
  });
});

// Inquiry Submission Endpoint
app.post('/api/enquire', async (req, res) => {
  const { name, email, phone, requirement, method, message, type } = req.body;

  if (!name || !email || !requirement) {
    return res.status(400).json({ error: 'Name, email and requirement are required.' });
  }

  const record = {
    name,
    email,
    phone: phone || '',
    requirement,
    method: method || 'Email',
    message: message || '',
    type: type || 'enquiry',
    receivedAt: new Date().toISOString()
  };

  saveLocalInquiry(record);
  console.log('[Inquiry Received]', record);

  let emailSent = false;
  let whatsappSent = false;
  const errors = [];

  // Send Email Notification
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"SVK Website Inquiry" <${process.env.SMTP_USER}>`,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `💎 New SVK Inquiry from ${name} (${requirement})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dccd; border-radius: 8px; background-color: #fdfbf7; color: #16140f;">
            <div style="text-align: center; border-bottom: 1px solid #e4dccd; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="font-size: 24px; letter-spacing: 2px; margin: 0; color: #7d6641;">SVK MAISON DE DIAMANTS</h2>
              <p style="margin: 4px 0 0; color: #69635a; font-size: 13px;">New Customer Inquiry Notification</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #69635a;">Customer Name:</td>
                <td style="padding: 10px 0; font-size: 15px; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #69635a;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #7d6641;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #69635a;">Phone:</td>
                <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #16140f;">${phone || 'Not provided'}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #69635a;">Requirement:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #16140f;">${requirement}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #69635a;">Preferred Contact:</td>
                <td style="padding: 10px 0;">${method || 'Email'}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 16px; background: #efe9df; border-radius: 6px;">
              <strong style="color: #69635a; font-size: 13px; display: block; margin-bottom: 6px;">Client Message:</strong>
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${message || 'No additional message.'}</p>
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #9a9388; text-align: center;">
              You can hit Reply directly to respond to ${name} at ${email}.
            </p>
          </div>
        `
      });
      emailSent = true;
      console.log(`[Email Sent] Successfully delivered to ${OWNER_EMAIL}`);
    } catch (err) {
      console.error('[Email Error]', err.message);
      errors.push(`Email error: ${err.message}`);
    }
  } else {
    // Automatic fallback: forward to FormSubmit so email is delivered to svkdiamonds@gmail.com without needing SMTP password
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:3000',
          'Referer': 'http://localhost:3000/'
        },
        body: JSON.stringify({
          _subject: `💎 New SVK Inquiry from ${name} (${requirement})`,
          _replyto: email,
          _template: 'table',
          'Customer Name': name,
          'Customer Email': email,
          'Customer Phone': phone || 'Not provided',
          'Requirement': requirement,
          'Preferred Contact Method': method || 'Email',
          'Client Message': message || 'No additional message'
        })
      });
      const fsData = await fsRes.json();
      if (fsData.success === 'true' || fsData.success === true) {
        emailSent = true;
        console.log(`[Email Sent via FormSubmit] Successfully forwarded to ${OWNER_EMAIL}`);
      } else {
        console.log('[FormSubmit Notice]', fsData.message);
      }
    } catch (err) {
      console.error('[FormSubmit Fallback Error]', err.message);
    }
  }

  // Send WhatsApp Notification via Twilio
  if (twilioClient && process.env.TWILIO_WHATSAPP_NUMBER) {
    try {
      const waFrom = process.env.TWILIO_WHATSAPP_NUMBER.startsWith('whatsapp:')
        ? process.env.TWILIO_WHATSAPP_NUMBER
        : `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;
      const waTo = OWNER_PHONE.startsWith('whatsapp:') ? OWNER_PHONE : `whatsapp:${OWNER_PHONE}`;

      const waBody = `💎 *SVK New Client Inquiry*\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Requirement:* ${requirement}\n*Contact Method:* ${method || 'Email'}\n*Message:* ${message || 'N/A'}`;

      await twilioClient.messages.create({
        body: waBody,
        from: waFrom,
        to: waTo
      });
      whatsappSent = true;
      console.log(`[WhatsApp Sent] Successfully sent to ${waTo}`);
    } catch (err) {
      console.error('[WhatsApp Error]', err.message);
      errors.push(`WhatsApp error: ${err.message}`);
    }
  }

  return res.json({
    success: true,
    message: 'Inquiry received successfully',
    emailSent,
    whatsappSent,
    errors: errors.length ? errors : undefined
  });
});

app.listen(PORT, () => {
  console.log(`
==================================================
💎 SVK Inquiry Server running on http://localhost:${PORT}
- Target Email: ${OWNER_EMAIL}
- Target Phone: ${OWNER_PHONE}
- Email Service: ${transporter ? 'Configured ✅' : 'Needs SMTP in .env ⚠️'}
- Twilio WhatsApp: ${twilioClient ? 'Configured ✅' : 'Needs Twilio in .env ⚠️'}
==================================================
  `);
});
