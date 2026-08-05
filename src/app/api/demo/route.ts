import { NextRequest, NextResponse } from "next/server";
import {
  sendDemoRequestConfirmation,
  sendEmail,
} from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const { email, name, service, company, phone } = await request.json();

    if (!email || !name || !service) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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

    // Send confirmation to user
    await sendDemoRequestConfirmation(email, name, service);

    // Notify admin
    const adminEmails = (process.env.CONTACT_FORM_RECIPIENTS || "").split(",");
    await sendEmail({
      to: adminEmails,
      subject: `🎬 Demo Request: ${name} - ${service}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><a href="mailto:${email}">Reply to ${name}</a></p>
      `,
      replyTo: email,
    });

    console.log("✅ Demo request:", { name, email, service });

    return NextResponse.json(
      {
        success: true,
        message: "Demo request received! Check your email for confirmation.",
        demoLink: "https://calendly.com/gavior",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Demo request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to request demo" },
      { status: 500 }
    );
  }
}
