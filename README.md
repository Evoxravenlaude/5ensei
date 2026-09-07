# 5ENSEI

A Nigerian fragrance house — presence before introduction.

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Admin panel

Visit `/admin` to manage the collection (add/edit/delete products, upload
images). Every change is committed straight to this GitHub repo's
`data/products.json` (and `public/products/` for images) via the GitHub API,
which triggers a normal Vercel redeploy — changes go live within about a
minute of saving.

**Before the admin panel will work**, see `ADMIN-SETUP.md` for the one-time
environment variable setup (a GitHub token, an admin username/password, and a
session secret) in your Vercel project.

## Structure

- `app/` — pages (App Router)
- `components/` — shared UI (header, footer, cart, product cards, loader)
- `lib/products.ts` — typed product helpers, reads from `data/products.json`
- `data/products.json` — the actual product data (single source of truth)
- `app/api/*` — admin auth + GitHub-commit endpoints
- `public/` — real brand assets (logo, product photography)
