import { NextRequest, NextResponse } from "next/server";
import {
  sendBlogSubscriptionConfirmation,
  sendEmail,
} from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

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
    await sendBlogSubscriptionConfirmation(email);

    // Notify admin
    const adminEmails = (process.env.CONTACT_FORM_RECIPIENTS || "").split(",");
    await sendEmail({
      to: adminEmails,
      subject: `📚 New Blog Subscriber: ${email}`,
      html: `
        <p>New blog subscriber:</p>
        <p><a href="mailto:${email}">${email}</a></p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
    });

    console.log("✅ Blog subscription:", email);

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed to blog! Check your email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Blog subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
