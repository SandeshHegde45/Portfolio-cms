import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getExpectedPassword,
  getExpectedSessionValue,
} from "@/lib/auth/session";

export async function POST(request) {
  const body = await request.json();
  const password = body?.password ?? "";

  if (password !== getExpectedPassword()) {
    return NextResponse.json(
      { success: false, message: "Incorrect password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, getExpectedSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
