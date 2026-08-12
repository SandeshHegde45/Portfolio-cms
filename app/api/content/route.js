import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  readContent,
  updateContentSection,
} from "@/lib/data/contentRepository";

import {
  ADMIN_SESSION_COOKIE,
  getExpectedSessionValue,
} from "@/lib/auth/session";

async function isAuthenticatedRequest() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);

  return sessionCookie?.value === getExpectedSessionValue();
}

export async function GET() {
  try {
    const content = await readContent();

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("GET /api/content failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load content.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const authenticated = await isAuthenticatedRequest();

    if (!authenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { section, value } = body ?? {};

    const validSections = [
      "profile",
      "contact",
      "skills",
      "projects",
      "experience",
      "education",
      "achievements",
    ];

    if (!validSections.includes(section)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unknown content section.",
        },
        { status: 400 },
      );
    }

    const updatedContent = await updateContentSection(section, value);

    return NextResponse.json({
      success: true,
      content: updatedContent,
    });
  } catch (error) {
    console.error("PUT /api/content failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update content.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
