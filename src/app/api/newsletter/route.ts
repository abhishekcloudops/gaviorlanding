import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterConfirmation, sendEmail } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send confirmation
    await sendNewsletterConfirmation(email, name);

    // Notify admin
    await sendEmail({
      to: (process.env.CONTACT_FORM_RECIPIENTS || "").split(","),
      subject: `📬 New Newsletter Subscriber: ${email}`,
      html: `<p>New subscriber: <strong>${name || "Unknown"}</strong></p><p>Email: <a href="mailto:${email}">${email}</a></p><p>Timestamp: ${new Date().toISOString()}</p>`,
    });

    console.log("✅ Newsletter subscription:", email);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for subscribing! Check your email for confirmation.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
