import { NextRequest, NextResponse } from "next/server";
import { verify, SESSION_COOKIE } from "@/lib/auth";
import { getFile, putFile } from "@/lib/github";

const DATA_PATH = "data/products.json";

export async function GET() {
  try {
    const file = await getFile(DATA_PATH);
    return NextResponse.json({ products: file ? JSON.parse(file.content) : [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!verify(token)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: { products?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const { products } = body;
  if (!Array.isArray(products)) {
    return NextResponse.json({ error: 'Expected a "products" array.' }, { status: 400 });
  }

  try {
    const existing = await getFile(DATA_PATH);
    await putFile(
      DATA_PATH,
      JSON.stringify(products, null, 2),
      "Update products via admin panel",
      existing ? existing.sha : undefined
    );
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
