import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: parseInt(process.env.MAILER_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const sender = formData.get("sender") as string;
    const subject = formData.get("subject") as string;
    const messageBody = formData.get("messageBody") as string;
    const recipients = formData.get("recipients") as string;
    const images = formData.getAll("image") as File[];

    // Validate required fields
    if (!sender || !subject || !messageBody || !recipients) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert Files to Buffers
    const attachments = await Promise.all(
      images.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        };
      })
    );

    // Configure email options
    const mailOptions = {
      from: sender,
      to: recipients,
      subject: subject,
      text: messageBody,
      attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
