import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const pathname = request.nextUrl.searchParams.get("pathname");

  if (!pathname || !pathname.startsWith("portfolio/uploads/")) {
    return NextResponse.json(
      { success: false, message: "Media file not found." },
      { status: 404 },
    );
  }

  try {
    const result = await get(pathname, { access: "private", useCache: false });

    if (!result || result.statusCode !== 200) {
      return NextResponse.json(
        { success: false, message: "Media file not found." },
        { status: 404 },
      );
    }

    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type":
          result.headers?.get("content-type") || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Media file not found." },
      { status: 404 },
    );
  }
}
