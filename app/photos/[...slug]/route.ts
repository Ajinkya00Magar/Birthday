import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".ico": "image/x-icon",
  ".tiff": "image/tiff",
  ".tif": "image/tiff",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m4v": "video/x-m4v",
  ".ogg": "video/ogg",
  ".ogv": "video/ogg",
  ".mkv": "video/x-matroska",
  ".avi": "video/x-msvideo",
  ".3gp": "video/3gpp",
  ".wmv": "video/x-ms-wmv",
  ".flv": "video/x-flv",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  const slug = params.slug || [];
  if (slug.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const requestedPath = slug.join("/");
  // Prevent directory traversal
  if (requestedPath.includes("..") || path.isAbsolute(requestedPath)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const photosDir = path.join(process.cwd(), "public", "photos");
  if (!fs.existsSync(photosDir)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // 1. Try exact requested file
  const exactPath = path.join(photosDir, requestedPath);
  if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
    const ext = path.extname(exactPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(exactPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // 2. Try case-insensitive or extension-agnostic match
  const requestedExt = path.extname(requestedPath).toLowerCase();
  const requestedBase = path.basename(requestedPath, requestedExt).toLowerCase();

  try {
    const dirEntries = fs.readdirSync(photosDir);

    // Look for exact base match with any supported media extension
    const matched = dirEntries.find((file) => {
      const fileExt = path.extname(file).toLowerCase();
      const fileBase = path.basename(file, fileExt).toLowerCase();
      return fileBase === requestedBase && Boolean(MIME_TYPES[fileExt]);
    });

    if (matched) {
      const matchedPath = path.join(photosDir, matched);
      if (fs.statSync(matchedPath).isFile()) {
        const ext = path.extname(matchedPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        const fileBuffer = fs.readFileSync(matchedPath);
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    }
  } catch (error) {
    console.error("Error reading photos directory:", error);
  }

  return new NextResponse("Not Found", { status: 404 });
}

