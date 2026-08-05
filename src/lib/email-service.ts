import nodemailer from "nodemailer";

// Email configuration
const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

// Create transporter
const transporter = nodemailer.createTransport(smtpConfig);

// Verify connection
transporter
  .verify()
  .then(() => {
    console.log("✅ Email service connected successfully");
  })
  .catch((error) => {
    console.error("❌ Email service error:", error);
  });

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
  timeline?: string;
}

/**
 * Send generic email
 */
export async function sendEmail(payload: EmailPayload) {
  try {
    const result = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: Array.isArray(payload.to) ? payload.to.join(", ") : payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      replyTo: payload.replyTo,
    });

    console.log("✅ Email sent:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}

/**
 * Send contact form confirmation email to user
 */
export async function sendContactFormConfirmation(
  email: string,
  name: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #000; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
          h1 { margin: 0; font-size: 24px; }
          h2 { color: #000; font-size: 18px; margin-top: 20px; }
          .info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out!</h1>
          </div>

          <div class="content">
            <p>Hi ${name},</p>

            <p>We've received your inquiry and appreciate you contacting Gavior. Our team is reviewing your message and will get back to you as soon as possible.</p>

            <h2>What to Expect Next:</h2>
            <ul>
              <li>✅ We'll review your project details within 24 hours</li>
              <li>✅ Our team will assess your requirements and timeline</li>
              <li>✅ We'll send you a personalized proposal or schedule a consultation call</li>
              <li>✅ Typical response time: 1-2 business days</li>
            </ul>

            <h2>In the Meantime:</h2>
            <p>Feel free to explore our services and case studies at <a href="https://gavior.in">gavior.in</a></p>

            <div class="info">
              <h3 style="margin-top: 0;">Need Immediate Assistance?</h3>
              <p>
                📧 Email: <a href="mailto:hello@gavior.in">hello@gavior.in</a><br>
                💬 WhatsApp: <a href="https://wa.me/919999999999">Chat with us</a><br>
                🤝 Book a Call: <a href="https://calendly.com/gavior">Schedule Now</a>
              </p>
            </div>

            <p style="color: #666; font-size: 14px;">
              <strong>Reference ID:</strong> ${Date.now()}<br>
              We'll use this ID to track your inquiry.
            </p>
          </div>

          <div class="footer">
            <p>© 2026 Gavior. All rights reserved.</p>
            <p>
              <a href="https://gavior.in" style="color: #0066ff; text-decoration: none;">Website</a> |
              <a href="https://linkedin.com/company/gavior" style="color: #0066ff; text-decoration: none;">LinkedIn</a> |
              <a href="https://twitter.com/gavior" style="color: #0066ff; text-decoration: none;">Twitter</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "✅ We've Received Your Inquiry - Gavior",
    html,
    text: `Thank you for contacting Gavior. We've received your message and will get back to you within 1-2 business days. Reference ID: ${Date.now()}`,
  });
}

/**
 * Send contact form to admin (info@gavior.in and gaviorsupport@gmail.com)
 */
export async function sendContactFormToAdmin(data: ContactFormData) {
  const adminEmails = (process.env.CONTACT_FORM_RECIPIENTS || "").split(",");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; padding: 10px; background-color: #f5f5f5; border-radius: 6px; }
          .label { font-weight: bold; color: #000; font-size: 12px; text-transform: uppercase; }
          .value { margin-top: 5px; font-size: 14px; }
          .actions { margin-top: 20px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #0066ff; color: white; text-decoration: none; border-radius: 6px; margin-right: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Received on ${new Date().toLocaleString()}</p>
          </div>

          <div class="field">
            <div class="label">📝 Name</div>
            <div class="value">${data.name}</div>
          </div>

          <div class="field">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>

          ${data.phone ? `
          <div class="field">
            <div class="label">📞 Phone</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          ` : ""}

          ${data.company ? `
          <div class="field">
            <div class="label">🏢 Company</div>
            <div class="value">${data.company}</div>
          </div>
          ` : ""}

          <div class="field">
            <div class="label">💼 Service Interested In</div>
            <div class="value">${data.service}</div>
          </div>

          ${data.budget ? `
          <div class="field">
            <div class="label">💰 Budget</div>
            <div class="value">${data.budget}</div>
          </div>
          ` : ""}

          ${data.timeline ? `
          <div class="field">
            <div class="label">⏰ Timeline</div>
            <div class="value">${data.timeline}</div>
          </div>
          ` : ""}

          <div class="field">
            <div class="label">💬 Message</div>
            <div class="value" style="white-space: pre-wrap;">${data.message}</div>
          </div>

          <div class="actions">
            <a href="mailto:${data.email}" class="button">Reply to Inquiry</a>
            <a href="https://gavior.in" class="button" style="background-color: #666;">View Website</a>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: adminEmails,
    subject: `🎯 New Contact: ${data.name} - ${data.service}`,
    html,
    replyTo: data.email,
    text: `New contact form submission from ${data.name} (${data.email}) interested in ${data.service}.`,
  });
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(email: string, name?: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          h1 { margin: 0; }
          p { margin: 15px 0; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to Gavior Updates!</h1>
          </div>

          <div class="content">
            <p>Hi ${name || "there"},</p>

            <p>Thank you for subscribing to our newsletter! You're now part of our growing community of innovators and tech leaders.</p>

            <p>You'll receive:</p>
            <ul>
              <li>🚀 Latest product updates and features</li>
              <li>💡 Industry insights and best practices</li>
              <li>📚 Free resources and guides</li>
              <li>🎁 Exclusive offers and early access</li>
            </ul>

            <p>Look out for our first email coming your way soon!</p>

            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              Not interested? <a href="#" style="color: #0066ff;">Unsubscribe here</a> (we'd hate to see you go though!)
            </p>
          </div>

          <div class="footer">
            <p>© 2026 Gavior. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Gavior Newsletter! 🚀",
    html,
    text: "Thank you for subscribing to Gavior updates!",
  });
}

/**
 * Send demo request confirmation
 */
export async function sendDemoRequestConfirmation(
  email: string,
  name: string,
  service: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0066ff; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .cta { background-color: #0066ff; color: white; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0; }
          .cta a { color: white; text-decoration: none; font-weight: bold; }
          h1 { margin: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Demo Scheduled! ✨</h1>
          </div>

          <div class="content">
            <p>Hi ${name},</p>

            <p>We're excited to show you how Gavior can help with your ${service} project!</p>

            <div class="cta">
              <a href="https://calendly.com/gavior">View & Confirm Your Demo Slot →</a>
            </div>

            <p>Our team will walk you through:</p>
            <ul>
              <li>How we approach ${service}</li>
              <li>Your specific requirements and goals</li>
              <li>Our process and timeline</li>
              <li>Investment and ROI</li>
            </ul>

            <p>If you have any questions before the call, feel free to reply to this email.</p>

            <p>Looking forward to chatting with you!</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Your ${service} Demo is Ready! ✨`,
    html,
    text: `Your demo for ${service} has been scheduled. Click here to confirm: https://calendly.com/gavior`,
  });
}

/**
 * Send blog subscription confirmation
 */
export async function sendBlogSubscriptionConfirmation(email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .content { background: #f5f5f5; padding: 20px; margin-top: 10px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Gavior Blog! 📚</h1>
          </div>

          <div class="content">
            <p>You're now subscribed to our latest blog posts on web development, SaaS, AI, DevOps, and more!</p>
            <p>New posts every week. Unsubscribe anytime.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Gavior Blog 📚",
    html,
  });
}

export default transporter;
