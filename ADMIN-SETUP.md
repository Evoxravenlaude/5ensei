# Setting up the admin panel

The admin panel (`/admin`) needs a few settings added to your Vercel project
before it will work. None of this touches the code — it's all done in the
Vercel dashboard.

## 1. Create a GitHub token

1. Go to https://github.com/settings/tokens?type=beta (GitHub → Settings →
   Developer settings → Personal access tokens → Fine-grained tokens).
2. Click **Generate new token**.
3. Resource owner: your account. Repository access: **Only select
   repositories** → choose this repo (`5ensei`).
4. Under **Repository permissions**, set **Contents** to **Read and write**.
   Leave everything else as No access.
5. Generate the token and copy it immediately (GitHub only shows it once).
6. Pick the longest available expiration — fine-grained tokens can't be set
   to never expire, so note the date somewhere; when it expires, admin saves
   will start failing with an auth error until you generate a new one.

## 2. Add environment variables in Vercel

Project → **Settings → Environment Variables**:

| Name | Value |
|---|---|
| `GITHUB_TOKEN` | the token you just generated |
| `GITHUB_OWNER` | your GitHub username |
| `GITHUB_REPO` | the repo name (e.g. `5ensei`) |
| `GITHUB_BRANCH` | `main` |
| `ADMIN_USERNAME` | whatever username you want to log in with |
| `ADMIN_PASSWORD` | a strong password — this guards your whole site's content |
| `SESSION_SECRET` | any long random string |

Do **not** set `GITHUB_BASE_PATH` — this project lives at the repo root (no
`files/` subfolder), and the code defaults to that. Only add it if you later
move this project into a subdirectory of the repo.

Apply all of them to **Production** (and Preview, if you want the admin
panel to work on preview deployments too).

## 3. Redeploy

Trigger a redeploy (Deployments → "..." on the latest one → Redeploy) so the
serverless functions pick up the new environment variables.

## 4. Sign in

Visit `yoursite.vercel.app/admin` and log in.

## How it actually works

- Product data lives in `data/products.json`. Every page that shows products
  imports from `lib/products.ts`, which reads that same file — so it's a
  single source of truth for both the site and the admin panel.
- Saving in the admin panel commits the updated JSON (and any uploaded
  images, into `public/products/`) straight to GitHub via the API routes
  under `app/api/`.
- Vercel is already watching this repo, so it rebuilds automatically on that
  commit — this is a real Next.js build, so it takes a bit longer than a
  static site would (typically 1–2 minutes, not instant).
- Every change is a normal Git commit, so you can see (or revert) the full
  history at any time on GitHub.

## Things worth knowing

- Keep uploaded images under ~3MB.
- The admin login is a single hardcoded account, appropriate for one owner.
- `/admin` isn't linked from the public site and won't be indexed, but it
  isn't hidden by anything beyond the login itself — don't share the URL
  casually.
