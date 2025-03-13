import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter`,
      {
        headers: {
          Accept: "text/html",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/html",
        // Allow iframe embedding from your domain
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Failed to load newsletter content", {
      status: 500,
    });
  }
}
