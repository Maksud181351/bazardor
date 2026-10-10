# 🛒 বাজার দর (BazarDor)
**Live site:** https://bazardor-murex-eight.vercel.app

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
A Bangla market-price tracker for Bangladesh. Browse today's prices for rice, lentils, oil, vegetables, fish, meat, eggs/milk and spices, see which items rose or fell, and compare prices across markets in every division.

## ✨ Key features

1. **Live price ticker** – an infinite marquee under the navbar showing emoji, name, ৳/unit and ▲/▼ change.
2. **Today's movers** – top 6 price risers (▲) and top 6 fallers (▼), plus an "all products" grid with Bengali numerals.
3. **Category pages with numeric sorting** – default / low→high / high→low, sorted by real numeric value, with skeleton loaders and a 404-style empty state.
4. **Protected product details** – min / max / average price and a market-by-market table (Dhaka, Chattogram, Rajshahi, Mymensingh, Khulna, Sylhet). Visitors who are not signed in are redirected to sign in with a toast.
5. **Authentication with Better Auth** – email + password, Google and GitHub login, toast notifications, profile page and **update-name** flow.
6. Fully responsive (mobile → desktop), friendly 404 pages, and refresh-safe dynamic routes.

## 🧰 Technologies

| Purpose | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 + DaisyUI 5, Hind Siliguri (Bangla) font |
| Auth | Better Auth (email/password, Google, GitHub) |
| Database | Postgres (production, e.g. Neon) · SQLite file (local dev) |
| UX | react-hot-toast, skeleton loaders |
| Data | https://api.api-store.workers.dev/api/bazardor |

## 🚀 Run locally

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

With `DATABASE_URL` empty, a local `bazardor.db` SQLite file is used. Auth tables are created automatically on first request – no manual migration needed.

### Environment variables

| Name | Notes |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (required on Vercel) |
| `BETTER_AUTH_SECRET` | long random string (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | your site URL, e.g. `https://bazardor.vercel.app` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth; redirect URI `<site>/api/auth/callback/google` |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth; callback `<site>/api/auth/callback/github` |

## ☁️ Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Create a free Postgres database (Neon) and add the env vars above.
3. Add the production URL to your Google / GitHub OAuth apps' redirect URIs.
4. Deploy. Dynamic routes (`/category/[slug]`, `/product/[slug]`) work on refresh.

## 🗂️ Structure

```
app/            routes (home, category/[slug], product/[slug], signin, signup, profile, profile/update, api/auth)
components/     Navbar, Ticker, ProductCard, SortableProducts, auth forms, skeletons …
lib/            api client, Bengali formatting, Better Auth server/client
```
