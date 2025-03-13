import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/questionnaire/${email}`,
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
    return new NextResponse("Failed to load questionnaire content", {
      status: 500,
    });
  }
}
