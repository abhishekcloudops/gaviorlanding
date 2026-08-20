import nodemailer from "nodemailer";
import { formatMoney } from "./money";

export function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "hello@gavior.in";
  const pass = process.env.SMTP_PASSWORD || "";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendQuotationEmail({
  to,
  clientName,
  quotationNumber,
  title,
  totalPaise,
  validUntil,
  portalUrl,
  customMessage,
}: {
  to: string;
  clientName: string;
  quotationNumber: string;
  title: string;
  totalPaise: number;
  validUntil?: string | null;
  portalUrl: string;
  customMessage?: string;
}) {
  const transporter = getTransporter();
  const fromName = process.env.SMTP_FROM_NAME || "Gavior Invoicing";
  const fromEmail = process.env.SMTP_FROM_EMAIL || "hello@gavior.in";
  const totalFormatted = formatMoney(totalPaise);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f8; margin: 0; padding: 20px; color: #17211c; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dde4e0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #1e6a47; padding: 32px 40px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.05em; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 8px; }
    .content { padding: 40px; line-height: 1.6; font-size: 15px; }
    .summary-card { background: #f3f7f5; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e0eae4; }
    .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
    .summary-row.total { border-top: 2px solid #1e6a47; margin-top: 10px; padding-top: 12px; font-weight: 800; font-size: 18px; color: #1e6a47; }
    .btn { display: inline-block; background: #1e6a47; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 800; font-size: 15px; text-align: center; margin: 20px 0; }
    .footer { background: #f2f5f3; padding: 20px 40px; font-size: 12px; color: #6b7971; border-top: 1px solid #e5ebe7; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 800; opacity: 0.85;">Gavior Proposal</div>
      <h1>${title}</h1>
      <span class="badge">Quotation: ${quotationNumber}</span>
    </div>
    <div class="content">
      <p>Dear <strong>${clientName}</strong>,</p>
      <p>${customMessage || "We are pleased to submit our formal commercial proposal and quotation for your review."}</p>
      
      <div class="summary-card">
        <div class="summary-row"><span>Document No:</span><strong>${quotationNumber}</strong></div>
        <div class="summary-row"><span>Project Title:</span><strong>${title}</strong></div>
        ${validUntil ? `<div class="summary-row"><span>Valid Until:</span><strong>${validUntil}</strong></div>` : ""}
        <div class="summary-row total"><span>Total Investment (inc. GST):</span><span>${totalFormatted}</span></div>
      </div>

      <div style="text-align: center;">
        <a href="${portalUrl}" class="btn">View & Accept Quotation Online</a>
      </div>

      <p style="font-size: 13px; color: #6b7971;">You can review the detailed scope breakdown, deliverables, milestones, and accept the proposal directly using the link above.</p>
    </div>
    <div class="footer">
      <p>Gavior Technologies Private Limited • Bengaluru, India • hello@gavior.in</p>
      <p>This message contains confidential commercial terms intended solely for ${clientName}.</p>
    </div>
  </div>
</body>
</html>
`;

  return await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject: `Quotation: ${title} (${quotationNumber}) - Gavior`,
    html,
  });
}

export async function sendInvoiceEmail({
  to,
  clientName,
  invoiceNumber,
  title,
  totalPaise,
  balanceDuePaise,
  dueDate,
  portalUrl,
  customMessage,
}: {
  to: string;
  clientName: string;
  invoiceNumber: string;
  title: string;
  totalPaise: number;
  balanceDuePaise: number;
  dueDate?: string | null;
  portalUrl: string;
  customMessage?: string;
}) {
  const transporter = getTransporter();
  const fromName = process.env.SMTP_FROM_NAME || "Gavior Invoicing";
  const fromEmail = process.env.SMTP_FROM_EMAIL || "hello@gavior.in";
  const totalFormatted = formatMoney(totalPaise);
  const balanceFormatted = formatMoney(balanceDuePaise);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f8; margin: 0; padding: 20px; color: #17211c; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dde4e0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #1a3d5c; padding: 32px 40px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 8px; }
    .content { padding: 40px; line-height: 1.6; font-size: 15px; }
    .summary-card { background: #f3f6f9; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #dce4eb; }
    .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
    .summary-row.total { border-top: 2px solid #1a3d5c; margin-top: 10px; padding-top: 12px; font-weight: 800; font-size: 18px; color: #1a3d5c; }
    .summary-row.balance { color: #b45309; font-weight: 800; font-size: 16px; }
    .btn { display: inline-block; background: #1a3d5c; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 800; font-size: 15px; text-align: center; margin: 20px 0; }
    .footer { background: #f2f5f3; padding: 20px 40px; font-size: 12px; color: #6b7971; border-top: 1px solid #e5ebe7; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 800; opacity: 0.85;">Gavior Tax Invoice</div>
      <h1>${invoiceNumber}</h1>
      <span class="badge">${title}</span>
    </div>
    <div class="content">
      <p>Dear <strong>${clientName}</strong>,</p>
      <p>${customMessage || "Please find attached your digital tax invoice from Gavior."}</p>
      
      <div class="summary-card">
        <div class="summary-row"><span>Invoice Number:</span><strong>${invoiceNumber}</strong></div>
        <div class="summary-row"><span>Total Amount:</span><span>${totalFormatted}</span></div>
        ${dueDate ? `<div class="summary-row"><span>Due Date:</span><strong>${dueDate}</strong></div>` : ""}
        <div class="summary-row balance"><span>Balance Due:</span><span>${balanceFormatted}</span></div>
      </div>

      <div style="text-align: center;">
        <a href="${portalUrl}" class="btn">View Invoice & Scan UPI QR to Pay</a>
      </div>

      <p style="font-size: 13px; color: #6b7971;">You can download your formal tax PDF, view bank transfer details, or scan the dynamic UPI QR code on the portal.</p>
    </div>
    <div class="footer">
      <p>Gavior Technologies Private Limited • Bengaluru, India • hello@gavior.in</p>
      <p>Thank you for your business!</p>
    </div>
  </div>
</body>
</html>
`;

  return await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject: `Tax Invoice: ${invoiceNumber} (${title}) - Gavior`,
    html,
  });
}
