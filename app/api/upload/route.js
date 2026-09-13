import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getExpectedSessionValue,
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const contentTypesByExtension = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function POST(request) {
  const sessionCookie = cookies().get(ADMIN_SESSION_COOKIE);
  if (sessionCookie?.value !== getExpectedSessionValue()) {
    return NextResponse.json(
      { success: false, message: "Not authenticated." },
      { status: 401 },
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "The upload must be sent as multipart form data.",
      },
      { status: 400 },
    );
  }

  const file = formData.get("file");

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json(
      { success: false, message: "Choose a file to upload." },
      { status: 400 },
    );
  }

  const extension = file.name?.split(".").pop()?.toLowerCase();
  const contentType =
    contentTypesByExtension[extension] ||
    file.type ||
    "application/octet-stream";
  const isDocument = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ].includes(contentType);

  if (!contentType.startsWith("image/") && !isDocument) {
    return NextResponse.json(
      { success: false, message: "Only images and PDF files are supported." },
      { status: 400 },
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { success: false, message: "Files must be 10 MB or smaller." },
      { status: 400 },
    );
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(
      `portfolio/uploads/${Date.now()}-${safeName}`,
      file,
      {
        access: "private",
        addRandomSuffix: true,
        contentType,
      },
    );
    const pathname = new URL(blob.url).pathname.slice(1);
    return NextResponse.json({
      success: true,
      url: `/api/media?pathname=${encodeURIComponent(pathname)}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Upload failed." },
      { status: 500 },
    );
  }
}
