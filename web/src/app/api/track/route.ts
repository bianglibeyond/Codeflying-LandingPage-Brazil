import { type NextRequest } from "next/server";

export const runtime = "nodejs";

const DATA_SPIRIT_URL =
  process.env.DATA_SPIRIT_URL ?? "http://60.204.232.209:5000/api/event";
const SECRET = process.env.DATA_SPIRIT_SECRET ?? "";

/**
 * Server-side proxy for Data Spirit event ingestion.
 * Browser → /api/track → Data Spirit. Keeps the (eventual) HMAC SECRET
 * server-side and avoids HTTP-from-HTTPS mixed-content blocks against the
 * test endpoint. Always returns 204 — tracking must never affect UX.
 */
export async function POST(request: NextRequest) {
  let body = "";
  try {
    body = await request.text();
  } catch {
    return new Response(null, { status: 204 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (SECRET) {
    const { createHmac } = await import("node:crypto");
    headers["X-Event-Signature"] = createHmac("sha256", SECRET)
      .update(body)
      .digest("hex");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    await fetch(DATA_SPIRIT_URL, {
      method: "POST",
      headers,
      body,
      signal: controller.signal,
    });
  } catch {
    // Data Spirit explicitly does not guarantee stability — swallow.
  } finally {
    clearTimeout(timer);
  }

  return new Response(null, { status: 204 });
}
