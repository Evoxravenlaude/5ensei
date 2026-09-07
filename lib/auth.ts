import crypto from "crypto";

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set in the environment.");
  return secret;
}

export function sign(payloadObj: Record<string, unknown>): string {
  const payload = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const hmac = crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
  return `${payload}.${hmac}`;
}

export function verify(token: string | undefined | null): Record<string, any> | null {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  let expected: string;
  try {
    expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
  } catch {
    return null;
  }
  const a = Buffer.from(sig || "");
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.exp && Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "5ensei_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours
