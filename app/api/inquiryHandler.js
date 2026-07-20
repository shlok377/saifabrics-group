import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

/**
 * Handles processing of B2B inquiry form submissions and sending emails
 * @param {Object} formData - Form input fields
 * @param {Object} file - Uploaded design file attachment (if any)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendInquiryEmail(formData, file) {
  const emailJsonPath = path.resolve(process.cwd(), 'email.json');

  if (!fs.existsSync(emailJsonPath)) {
    return { success: false, message: 'email.json configuration file not found.' };
  }

  let emailConfig;
  try {
    const rawData = fs.readFileSync(emailJsonPath, 'utf8');
    emailConfig = JSON.parse(rawData);
  } catch (err) {
    return { success: false, message: 'Failed to parse email.json configuration.' };
  }

  const { name, company, email, phone, message } = formData;
  const recipient = emailConfig.recipientEmail || 'dalsaniashlok2007@gmail.com';
  const smtpConfig = emailConfig.smtp || {};

  // Build clean HTML email content
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f8f9fa; color: #333; margin: 0; padding: 20px; }
      .container { max-width: 600px; background: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; padding: 25px; margin: 0 auto; }
      .header { border-bottom: 2px solid #C85C43; padding-bottom: 15px; margin-bottom: 20px; }
      .header h2 { color: #1a1a1a; margin: 0 0 5px; font-size: 20px; }
      .header p { color: #666; margin: 0; font-size: 13px; }
      .table-details { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      .table-details td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
      .table-details td.label { font-weight: bold; color: #555; width: 35%; background-color: #fafafa; }
      .message-box { background: #fdfbf7; border-left: 4px solid #C85C43; padding: 15px; font-size: 14px; line-height: 1.5; white-space: pre-wrap; margin-bottom: 20px; }
      .footer { font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>✨ New B2B Business Inquiry Received</h2>
        <p>Sai Fabrics Group — Web Inquiry System</p>
      </div>
      
      <table class="table-details">
        <tr><td class="label">Full Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td class="label">Company Name</td><td>${escapeHtml(company)}</td></tr>
        <tr><td class="label">Email Address</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td class="label">Phone Number</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
        <tr><td class="label">Submission Date</td><td>${new Date().toLocaleString()}</td></tr>
      </table>

      <h4 style="margin-bottom: 8px; color: #333;">Customer Message & Specifications:</h4>
      <div class="message-box">${escapeHtml(message)}</div>

      ${file ? `<p style="font-size: 13px; color: #2e7d32;">📎 <strong>Design File Attached:</strong> ${escapeHtml(file.originalname)} (${(file.size / 1024).toFixed(1)} KB)</p>` : ''}

      <div class="footer">
        <p>Sent automatically to <strong>${escapeHtml(recipient)}</strong> via Sai Fabrics Group Website Inquiry Handler.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  // Prepare email options
  const mailOptions = {
    from: `"Sai Fabrics Web Form" <${emailConfig.senderEmail || smtpConfig.auth?.user || recipient}>`,
    to: recipient,
    replyTo: `"${name}" <${email}>`,
    subject: `[New Inquiry] ${company} - ${name}`,
    html: htmlContent,
    attachments: file ? [{
      filename: file.originalname,
      content: file.buffer
    }] : []
  };

  // Check if real SMTP App Password is set
  const appPassword = smtpConfig.auth?.pass;
  if (!appPassword || appPassword === 'YOUR_GMAIL_APP_PASSWORD') {
    console.log('\n------------------- [SIMULATED EMAIL DISPATCH] -------------------');
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Company: ${company}`);
    console.log(`Message:\n${message}`);
    if (file) console.log(`Attachment: ${file.originalname} (${file.size} bytes)`);
    console.log('------------------------------------------------------------------\n');
    
    return {
      success: true,
      simulated: true,
      message: `Inquiry logged! To deliver real inbox emails to ${recipient}, please add your 16-character Gmail App Password to email.json.`
    };
  }

  // Real Nodemailer Dispatch
  try {
    const transporter = nodemailer.createTransport({
      service: smtpConfig.service || 'gmail',
      host: smtpConfig.host || 'smtp.gmail.com',
      port: smtpConfig.port || 465,
      secure: smtpConfig.secure !== false,
      auth: {
        user: smtpConfig.auth?.user,
        pass: appPassword
      }
    });

    await transporter.sendMail(mailOptions);
    return { success: true, message: `Inquiry email successfully sent to ${recipient}!` };
  } catch (error) {
    console.error('Nodemailer SMTP Error:', error);
    return { success: false, message: `SMTP error: ${error.message}` };
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
