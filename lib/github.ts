const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || "main";
const BASE_PATH = process.env.GITHUB_BASE_PATH || ""; // this project lives at the repo root
const TOKEN = process.env.GITHUB_TOKEN;

function assertConfigured() {
  if (!OWNER || !REPO || !TOKEN) {
    throw new Error(
      "GitHub is not configured. Set GITHUB_OWNER, GITHUB_REPO and GITHUB_TOKEN in your Vercel project environment variables."
    );
  }
}

function fullPath(relPath: string): string {
  const base = BASE_PATH.replace(/^\/|\/$/g, "");
  const rel = relPath.replace(/^\//, "");
  return base ? `${base}/${rel}` : rel;
}

async function ghRequest(path: string, options: RequestInit = {}): Promise<Response> {
  assertConfigured();
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
}

export async function getFile(relPath: string): Promise<{ sha: string; content: string } | null> {
  const path = fullPath(relPath);
  const res = await ghRequest(`${path}?ref=${BRANCH}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
  const json = await res.json();
  return { sha: json.sha, content: Buffer.from(json.content, "base64").toString("utf8") };
}

export async function putFile(
  relPath: string,
  contentStr: string,
  message: string,
  sha?: string
): Promise<any> {
  const path = fullPath(relPath);
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(contentStr, "utf8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;
  const res = await ghRequest(path, { method: "PUT", body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  return res.json();
}

export async function putBinaryFile(
  relPath: string,
  base64Content: string,
  message: string,
  sha?: string
): Promise<any> {
  const path = fullPath(relPath);
  const body: Record<string, unknown> = { message, content: base64Content, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await ghRequest(path, { method: "PUT", body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  return res.json();
}
