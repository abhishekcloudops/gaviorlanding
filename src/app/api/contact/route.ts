import { NextRequest, NextResponse } from "next/server";
import {
  sendContactFormConfirmation,
  sendContactFormToAdmin,
  ContactFormData,
} from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: name, email, service, message",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData: ContactFormData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      service: service.trim(),
      message: message.trim(),
      phone: body.phone?.trim(),
      company: body.company?.trim(),
      budget: body.budget?.trim(),
      timeline: body.timeline?.trim(),
    };

    // Send confirmation email to user
    await sendContactFormConfirmation(contactData.email, contactData.name);

    // Send notification to admin
    await sendContactFormToAdmin(contactData);

    // Log submission (optional - add to database)
    console.log("✅ Contact form submitted:", {
      name: contactData.name,
      email: contactData.email,
      service: contactData.service,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We've received your message and will be in touch soon.",
        referenceId: `GAV-${Date.now()}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit contact form",
      },
      { status: 500 }
    );
  }
}

// Allow preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
