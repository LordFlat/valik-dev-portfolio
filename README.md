# Valentyn Studio

A **light, premium web-studio portfolio + lightweight CMS** for a UK-based web designer & automation developer (Valentyn Varych). Public brand: **Valentyn Studio** (domain: valentyn.studio).

The public site positions the brand around helping small businesses look better online — clean websites, landing pages, and simple digital tools. It has an editorial hero, selected-work case studies, services, a simple process, an About page and a conversion-focused Contact page. A protected `/admin` panel lets you manage everything — projects, site content, social links and contact messages — **without touching code**.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL**.

---

## ✨ Features

- **Light, editorial studio design** — warm ivory background, charcoal type, Fraunces display headings, large whitespace, smooth hover/motion. Mobile-first.
- Homepage: editorial hero, **Selected work** case-study cards, **Services**, **Simple process**, and a contact CTA.
- `/projects` premium case-study index (large alternating cards) with optional category filters.
- `/projects/[slug]` case studies: Overview · The challenge · The approach · What changed · Key screens · What was built · Built with.
- `/about` (positioning + values) and `/contact` (conversion-focused form with a **Project type** field, saved to DB, validation + honeypot anti-spam, quick-message social links).
- **Social/contact links** — Instagram, Facebook, WhatsApp, Telegram, GitHub, LinkedIn, Email — editable in admin and shown in the footer & contact page (empty links are hidden; WhatsApp/Telegram are normalized to `wa.me` / `t.me`).
- **Admin CMS** (`/admin`): dashboard stats, project CRUD, publish/feature toggles, sort order, site-content editor (incl. socials), contact messages (with project type).
- Cookie-based admin auth (bcrypt password hash + signed JWT), middleware-protected routes (admin is `noindex`).
- **SEO**: per-page metadata + title template, canonical URLs, OpenGraph & Twitter cards, dynamic `/opengraph-image`, sitemap, robots, and JSON-LD (Person/WebSite/CreativeWork/ContactPage).
- Cover-image placeholder generator (no image needed to look good).

> The admin panel keeps its original dark UI; the redesign is scoped to the public-facing site.

---

## 🧱 Tech stack

| Layer    | Choice                                  |
| -------- | --------------------------------------- |
| Framework| Next.js 14 (App Router, Server Actions) |
| Language | TypeScript                              |
| Styling  | Tailwind CSS                            |
| ORM      | Prisma                                  |
| Database | PostgreSQL (Neon / Supabase / local)    |
| Auth     | bcrypt hash + `jose` JWT in httpOnly cookie |
| Images   | URL fields (Cloudinary optional)        |
| Deploy   | Vercel                                  |

---

## 🚀 Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
# Windows
copy .env.example .env
# macOS / Linux
cp .env.example .env
```

Then fill in `.env`:

- **`DATABASE_URL`** — your PostgreSQL connection string (see "Database" below).
- **`AUTH_SECRET`** — any long random string. Generate one:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **`NEXTAUTH_URL`** — legacy URL kept for backwards compatibility (`http://localhost:3000` locally).
- **`NEXT_PUBLIC_SITE_URL`** — the public site URL used for canonical links, sitemap, robots, OpenGraph and JSON-LD. `http://localhost:3000` locally; `https://valentyn.studio` (your custom domain, or the `*.vercel.app` URL until connected) in production.
- **`ADMIN_EMAIL`** — the email you'll log in with.
- **`ADMIN_PASSWORD_HASH`** — a bcrypt hash of your admin password (see next step).

### 3. Create the admin password hash

```bash
npm run hash-password "your-strong-password"
```

Copy the printed `ADMIN_PASSWORD_HASH="..."` line into your `.env`.

### 4. Set up the database

```bash
npx prisma migrate dev --name init   # create tables
npm run db:seed                       # load site content + 5 sample projects
```

> Migrations are committed under `prisma/migrations/`. On an existing database run
> `npx prisma migrate deploy` to apply them. Prefer not to use migrations? Run
> `npm run db:push` instead (it safely adds the new nullable columns), then `npm run db:seed`.

### 5. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>. Admin panel: <http://localhost:3000/admin> (you'll be redirected to `/admin/login`).

### 6. Production build

```bash
npm run build
npm start
```

---

## 🗄️ Database options

You need a PostgreSQL database. Easiest free options:

**Neon** (recommended)
1. Create a project at <https://neon.tech>.
2. Copy the connection string (include `?sslmode=require`).
3. Paste it as `DATABASE_URL`.

**Supabase**
1. Create a project at <https://supabase.com>.
2. Settings → Database → Connection string (URI). Use the pooled connection for serverless.
3. Paste it as `DATABASE_URL`.

**Local Postgres**
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/workflow_dev?schema=public"
```

---

## 🔐 Using the admin panel

1. Go to `/admin` → redirected to `/admin/login`.
2. Sign in with `ADMIN_EMAIL` and the password you hashed.
3. From the dashboard you can:
   - **Add / edit / delete** projects (`/admin/projects`).
   - Toggle **Published** and **Featured**, set **sort order** (inline in the table).
   - Edit **site content** — hero text, about, socials, SEO (`/admin/site-content`).
   - Read / mark / delete **contact messages** (`/admin/messages`).

### How to add a project
`/admin/projects` → **+ Add project** → fill the form:
- Slug auto-generates from the title (editable, must be unique).
- Tags / Tech stack / Features are chip inputs — type and press **Enter**.
- Cover image is a URL (optional — a cyberpunk placeholder is used if empty).
- Gallery accepts multiple image URLs with thumbnail previews.
- Toggle **Published** (visible on site) and **Featured** (homepage carousel).

Featured **and** published projects appear in the homepage carousel, ordered by **sort order**.

---

## ☁️ Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On <https://vercel.com> → **New Project** → import the repo.
3. Add **Environment Variables** (same as `.env`):
   - `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, **`NEXT_PUBLIC_SITE_URL`** (your `https://your-app.vercel.app`),
     `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (and Cloudinary vars if used).
4. The build runs `prisma generate && next build` automatically.
5. **Run migrations against your production DB** once. Either:
   - Locally with the production `DATABASE_URL`:
     ```bash
     npx prisma migrate deploy
     npm run db:seed   # optional: seed content
     ```
   - Or `npx prisma db push` if you skipped migrations.
6. Redeploy if needed. Visit your URL and log in at `/your-app.vercel.app/admin`.

> Tip: Neon/Supabase need `sslmode=require`. For serverless, prefer the **pooled** connection string.

---

## 🖼️ Image uploads (Cloudinary)

Images work as plain URLs by default — paste any link. **Cloudinary upload is built in** and turns on
automatically when these three env vars are set:

```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Get them from your Cloudinary **Dashboard** (Account Details). No upload preset needed — uploads are
**signed** server-side.

When configured, the project form shows an **Upload** button next to the cover field and the gallery
(multi-file). Otherwise those fields stay as URL inputs. How it works:

1. The browser asks `POST /api/admin/upload-signature` (admin-only) for a short-lived signature.
2. The file is uploaded **directly** to Cloudinary from the browser (it never passes through the server,
   so Vercel payload limits don't apply). Files go into a `workflow-dev/` folder.
3. The returned `secure_url` is saved as the project's `coverImage` / `galleryImages`.

The API secret is used only on the server to sign requests — it is never exposed to the client.
Max upload size is 10 MB; only image files are accepted.

---

## 📁 Project structure

```
prisma/
  schema.prisma        # Project, SiteContent, ContactMessage
  seed.ts              # site content + 5 sample projects
scripts/
  hash-password.ts     # npm run hash-password "pw"
src/
  app/
    (site)/            # public pages (navbar + footer layout)
      page.tsx         # home (hero + carousel + directions)
      projects/        # list + [slug] case study
      about/ contact/
    admin/
      login/           # public login
      (protected)/     # guarded: dashboard, projects, site-content, messages
    layout.tsx globals.css sitemap.ts robots.ts not-found.tsx
  components/          # Navbar, Footer, carousel, cards, admin UI, ui/*
  lib/
    actions/           # server actions (auth, projects, content, messages, contact)
    prisma.ts auth.ts session.ts queries.ts validation.ts utils.ts
  middleware.ts        # protects /admin/*
```

---

## 🛠️ Useful scripts

| Command                      | What it does                          |
| ---------------------------- | ------------------------------------- |
| `npm run dev`                | Start dev server                      |
| `npm run build` / `npm start`| Production build / run                |
| `npm run db:migrate`         | `prisma migrate dev`                  |
| `npm run db:push`            | Push schema without migrations        |
| `npm run db:seed`            | Seed site content + sample projects   |
| `npm run db:studio`          | Open Prisma Studio                    |
| `npm run hash-password "pw"` | Generate `ADMIN_PASSWORD_HASH`        |

---

## 🔭 Ideas for later

- Cloudinary / UploadThing image uploads.
- Gallery image captions (model field + UI).
- Email notification on new contact message (Resend / Nodemailer).
- Rate limiting on the contact form (Upstash).
- Multiple admin users via a `User` table.
- Drag-and-drop reordering for `sortOrder`.
- Light theme toggle.
```
