import { NextRequest, NextResponse } from "next/server";
import { sign, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let body: { username?: string; password?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const { username, password } = body;

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return NextResponse.json(
      { error: "Admin credentials are not configured on the server yet." },
      { status: 500 }
    );
  }

  if (username !== validUser || password !== validPass) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  let token: string;
  try {
    token = sign({ u: username, exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
