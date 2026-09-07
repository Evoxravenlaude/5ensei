import { NextRequest, NextResponse } from "next/server";
import { verify, SESSION_COOKIE } from "@/lib/auth";
import { putBinaryFile } from "@/lib/github";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!verify(token)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: { filename?: string; dataBase64?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const { filename, dataBase64 } = body;
  if (!filename || !dataBase64) {
    return NextResponse.json({ error: "filename and dataBase64 are required." }, { status: 400 });
  }

  const safeName = filename.replace(/[^a-zA-Z0-9_.-]/g, "-").toLowerCase();
  // Stored under public/ so Next.js serves it directly from the site root.
  const repoPath = `public/products/${Date.now()}-${safeName}`;
  const publicUrl = `/products/${repoPath.split("/").pop()}`;

  try {
    const result = await putBinaryFile(repoPath, dataBase64, `Upload product image ${safeName}`);
    return NextResponse.json({ ok: true, path: publicUrl, commitUrl: result.commit?.html_url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
