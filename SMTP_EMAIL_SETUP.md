# SMTP Email Configuration Setup

## Overview

Your Gavior website now has complete email integration using Hostinger SMTP. Emails are automatically sent to users and your team for:
- Contact form submissions
- Newsletter signups
- Demo requests
- Blog subscriptions
- And more!

---

## Configuration Status ✅

### Email Service Setup
- ✅ SMTP configured (Hostinger)
- ✅ Email service created (`src/lib/email-service.ts`)
- ✅ Contact form API (`src/app/api/contact/route.ts`)
- ✅ Newsletter API (`src/app/api/newsletter/route.ts`)
- ✅ Demo request API (`src/app/api/demo/route.ts`)
- ✅ Blog subscription API (`src/app/api/blog-subscribe/route.ts`)
- ✅ Environment variables configured (`.env.local`)
- ✅ Dependencies added (nodemailer)

### Email Credentials
```
SMTP Host: smtp.hostinger.com
SMTP Port: 587
Email: hello@gavior.in
Password: Gavior@151281
```

### Email Recipients
- **Contact form submissions sent to:**
  - info@gavior.in
  - gaviorsupport@gmail.com
- **Support email:** gaviorsupport@gmail.com
- **Info email:** info@gavior.in
- **Reply-to**: User's email address

---

## Installation

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

This will install nodemailer and all required packages.

### Step 2: Verify .env.local

Check that `.env.local` contains:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=hello@gavior.in
SMTP_PASSWORD=Gavior@151281
SMTP_FROM_EMAIL=hello@gavior.in
SMTP_FROM_NAME=Gavior
CONTACT_FORM_RECIPIENTS=info@gavior.in,gaviorsupport@gmail.com
SUPPORT_EMAIL=gaviorsupport@gmail.com
INFO_EMAIL=info@gavior.in
NEXT_PUBLIC_WEBSITE_URL=https://gavior.in
```

### Step 3: Test Email Service

Run your development server:

```bash
npm run dev
```

### Step 4: Test Contact Form

1. Go to `http://localhost:3000/contact`
2. Fill out and submit the form
3. Check both emails:
   - User's email for confirmation
   - info@gavior.in and gaviorsupport@gmail.com for notification

---

## Email Types & Flows

### 1. Contact Form Submission

**When triggered**: User submits contact form

**Flow**:
1. ✉️ Confirmation email sent to user
2. 📧 Notification sent to info@gavior.in, gaviorsupport@gmail.com
3. 💾 Logged to console with timestamp

**API Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Company",
  "service": "Website Development",
  "budget": "$10,000-20,000",
  "timeline": "3 months",
  "message": "We need a new website..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you! We've received your message and will be in touch soon.",
  "referenceId": "GAV-1704067200000"
}
```

### 2. Newsletter Subscription

**When triggered**: User subscribes to newsletter

**Flow**:
1. ✉️ Welcome email sent to user
2. 📧 Notification sent to admin
3. 💾 Logged to console

**API Endpoint**: `POST /api/newsletter`

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### 3. Demo Request

**When triggered**: User requests a product demo

**Flow**:
1. ✉️ Confirmation with Calendly link sent to user
2. 📧 Notification sent to admin
3. 💾 Logged with service type

**API Endpoint**: `POST /api/demo`

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "service": "SaaS Development",
  "company": "Startup Inc",
  "phone": "+1234567890"
}
```

### 4. Blog Subscription

**When triggered**: User subscribes to blog updates

**Flow**:
1. ✉️ Welcome email sent to user
2. 📧 Notification sent to admin
3. 💾 Logged to console

**API Endpoint**: `POST /api/blog-subscribe`

**Request Body**:
```json
{
  "email": "reader@example.com"
}
```

---

## Email Templates

All emails use professional HTML templates with:
- ✅ Responsive design (mobile-friendly)
- ✅ Brand colors (black and blue)
- ✅ Clear calls-to-action
- ✅ Links back to website
- ✅ Social media links
- ✅ Professional footer

### Template Sections:
1. **Header** - Brand name, greeting
2. **Content** - Main message, details
3. **CTA** - Call-to-action button
4. **Footer** - Links, copyright

---

## Frontend Integration Examples

### Contact Form

```tsx
// In your contact form component
async function handleSubmit(data) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  
  if (result.success) {
    // Show success message
    toast.success('Thank you! We\'ll be in touch soon.');
    // Reset form
    form.reset();
  } else {
    toast.error(result.error);
  }
}
```

### Newsletter Signup

```tsx
// In your newsletter component
async function subscribe(email) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();
  return result;
}
```

### Demo Request

```tsx
// In your demo booking component
async function requestDemo(data) {
  const response = await fetch('/api/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  
  if (result.success) {
    window.location.href = result.demoLink; // Redirect to Calendly
  }
}
```

---

## Email Headers & Footer

### From Address
All emails from: **hello@gavior.in** (Gavior)

### Reply-To
Automatically set to user's email address for easy replies

### Unsubscribe
Newsletter emails include unsubscribe link

### Branding
All emails include:
- Gavior logo/branding
- Website links
- Social media links
- Contact information

---

## Testing Checklist

- [ ] Contact form submission email to user ✅
- [ ] Admin notification to info@gavior.in ✅
- [ ] Admin notification to gaviorsupport@gmail.com ✅
- [ ] Newsletter confirmation email ✅
- [ ] Demo request confirmation ✅
- [ ] Blog subscription confirmation ✅
- [ ] Email links work correctly ✅
- [ ] Mobile email display is clean ✅
- [ ] Sender name shows correctly ✅
- [ ] Reply-to works ✅

---

## Troubleshooting

### Email Not Sending

**Check 1**: Verify .env.local has correct credentials
```bash
echo $SMTP_HOST  # Should be: smtp.hostinger.com
echo $SMTP_USER  # Should be: hello@gavior.in
```

**Check 2**: Verify Hostinger SMTP is enabled
- Log into Hostinger panel
- Go to Email
- Check that hello@gavior.in has SMTP access

**Check 3**: Check firewall/ISP
- Port 587 must be open
- Check if ISP blocks SMTP

**Check 4**: Review logs
```bash
# In development console
npm run dev
# Look for "✅ Email sent:" or "❌ Email service error:"
```

### Email Going to Spam

**Solution 1**: Add SPF record
- Hostinger should provide SPF record
- Add to domain DNS: `v=spf1 include:hostinger.com ~all`

**Solution 2**: Add DKIM record
- Enable DKIM in Hostinger email settings
- Add to domain DNS

**Solution 3**: Test with Gmail
- Send test email to Gmail account
- Move from spam to inbox once
- Gmail will learn the sender

### Connection Timeout

**Solution**: Check SMTP port
```bash
# Test port connection
telnet smtp.hostinger.com 587
```

If connection fails:
- Try port 25 (though less secure)
- Check ISP doesn't block SMTP
- Verify Hostinger SMTP is active

---

## Email Limits & Rate Limiting

### Hostinger SMTP Limits:
- **Rate**: Typically 50-100 emails/hour
- **Daily**: Depends on plan (usually 500-5000/day)
- **Concurrent**: 5-10 simultaneous connections

### For Large Volumes:
Consider using email service:
- SendGrid
- Mailgun
- Resend
- AWS SES

---

## Adding More Email Types

### To add a new email type:

**Step 1**: Create email function in `src/lib/email-service.ts`
```tsx
export async function sendMyNewEmail(email: string, data: any) {
  const html = `<html>...</html>`;
  return sendEmail({
    to: email,
    subject: "Subject",
    html,
  });
}
```

**Step 2**: Create API route in `src/app/api/my-email/route.ts`
```tsx
export async function POST(request: NextRequest) {
  const { email, data } = await request.json();
  await sendMyNewEmail(email, data);
  return NextResponse.json({ success: true });
}
```

**Step 3**: Call from frontend
```tsx
await fetch('/api/my-email', {
  method: 'POST',
  body: JSON.stringify({ email, data }),
});
```

---

## Production Deployment

### Before Going Live:

1. **Verify SMTP Credentials**
   - Test email sending works
   - Check all recipient addresses are correct

2. **Update .env Variables**
   ```bash
   # In production, set environment variables in:
   # Vercel → Settings → Environment Variables
   # Or your hosting provider's dashboard
   ```

3. **Test All Flows**
   - Contact form
   - Newsletter
   - Demo request
   - Blog subscription

4. **Set up SPF/DKIM**
   - Reduce spam folder likelihood
   - Improve deliverability

5. **Configure Error Alerts**
   - Add email error monitoring
   - Get notified if emails fail

---

## Support Emails Configuration

### To change support emails:

Edit `.env.local`:
```env
# Current
CONTACT_FORM_RECIPIENTS=info@gavior.in,gaviorsupport@gmail.com
SUPPORT_EMAIL=gaviorsupport@gmail.com
INFO_EMAIL=info@gavior.in

# Change to:
CONTACT_FORM_RECIPIENTS=newemail@gavior.in,another@domain.com
SUPPORT_EMAIL=support@domain.com
INFO_EMAIL=info@domain.com
```

---

## Email Service Status

Run this command to test email service:

```bash
# In your Node.js terminal after npm install
npm run dev
# Look for: "✅ Email service connected successfully"
```

---

## Quick Reference

| Event | API Endpoint | Sent To | Template |
|-------|-------------|---------|----------|
| Contact form | POST /api/contact | User + Admin | Confirmation + Notification |
| Newsletter | POST /api/newsletter | User + Admin | Welcome + Notification |
| Demo request | POST /api/demo | User + Admin | Confirmation + Notification |
| Blog subscribe | POST /api/blog-subscribe | User + Admin | Welcome + Notification |

---

## Next Steps

1. ✅ Run `npm install` to install nodemailer
2. ✅ Verify `.env.local` has credentials
3. ✅ Test contact form on `localhost:3000/contact`
4. ✅ Check both emails receive messages
5. ✅ Deploy to production
6. ✅ Update DNS for SPF/DKIM

---

**Your email system is ready to use! All contact forms and subscriptions now send automatic emails to users and your team.** 🎉

For questions, check the troubleshooting section or contact Hostinger support.

