import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category_id");
  const typeId = searchParams.get("type_id");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payrates?category_id=${categoryId}&type_id=${typeId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pay rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch pay rates" },
      { status: 500 }
    );
  }
}
