import { NextResponse } from "next/server";
import { Resend } from "resend";

const ALLOWED_SERVICES = [
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "REST API Development",
] as const;

type AllowedService = (typeof ALLOWED_SERVICES)[number];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body || {};

    // Validate presence and type of fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof service !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid request payload. All fields are required." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedService = service.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!ALLOWED_SERVICES.includes(trimmedService as AllowedService)) {
      return NextResponse.json(
        {
          error:
            "Invalid service selection. Please select a valid service from the list.",
        },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      return NextResponse.json(
        { error: "Please provide a message (at least 5 characters)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "your_resend_api_key_here") {
      console.error("RESEND_API_KEY is missing or invalid in environment.");
      return NextResponse.json(
        {
          error:
            "Email service is currently unconfigured. Please contact directly via email.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error: sendError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["ghuleaditya76@gmail.com"],
      replyTo: trimmedEmail,
      subject: `Portfolio Inquiry — ${trimmedService}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0284c7; border-bottom: 2px solid #e0f2fe; padding-bottom: 8px;">
            New Portfolio Inquiry
          </h2>
          <p><strong>Visitor Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Visitor Email:</strong> <a href="mailto:${escapeHtml(trimmedEmail)}">${escapeHtml(trimmedEmail)}</a></p>
          <p><strong>Requested Service:</strong> ${escapeHtml(trimmedService)}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; rounded: 8px; border: 1px solid #e2e8f0;">${escapeHtml(trimmedMessage)}</p>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend delivery error:", sendError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unhandled error in contact API route:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
