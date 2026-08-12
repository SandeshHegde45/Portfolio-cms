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

function isAuthenticatedRequest() {
  const sessionCookie = cookies().get(ADMIN_SESSION_COOKIE);
  return sessionCookie?.value === getExpectedSessionValue();
}

export async function GET() {
  const content = await readContent();
  return NextResponse.json({ success: true, content });
}

export async function PUT(request) {
  if (!isAuthenticatedRequest()) {
    return NextResponse.json(
      { success: false, message: "Not authenticated." },
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
      { success: false, message: "Unknown content section." },
      { status: 400 },
    );
  }

  const updatedContent = await updateContentSection(section, value);
  return NextResponse.json({ success: true, content: updatedContent });
}
