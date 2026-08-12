# Developer Portfolio CMS

A personal developer portfolio built with Next.js, Tailwind CSS, and GSAP,
with a built-in content dashboard so every section can be updated without
touching code.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin`
for the content dashboard.

Set your own admin password before deploying by editing `.env.local`:

```bash
ADMIN_PASSWORD=your-password
ADMIN_SESSION_SECRET=a-long-random-string
```

If `.env.local` is not present, the dashboard falls back to the password
`admin123` for local development only.

## Editing content

All portfolio content — profile, contact and social links, skills, projects,
experience, education, and achievements — lives in `data/content.json` and is
edited through `/admin`. Saving a section in the dashboard writes straight to
that file, and the public site always renders whatever is currently in it.

Every field currently holds placeholder values. Replace them from the
dashboard, or edit `data/content.json` directly.

To use your own resume, replace `public/resume-placeholder.txt` with your
resume file and update the resume URL in the Contact & Social section of the
dashboard.

> `data/content.json` is written to disk by the API route, which works for
> local development and any host with a persistent, writable filesystem. On
> serverless hosts with a read-only filesystem (e.g. Vercel's default
> runtime), swap `lib/data/contentRepository.js` for a database or a
> hosted storage provider before deploying content edits to production.

## GSAP usage

Animation logic lives in `lib/hooks/` and is kept out of the components that
consume it:

- `useHeroIntroTimeline` — a `gsap.timeline()` sequencing `from`, `fromTo`,
  easing, and staggered word reveals on page load.
- `useNavEntrance` — a staggered `gsap.from()` for the navbar links.
- `useRevealOnScroll` — a reusable `gsap.fromTo()` + `ScrollTrigger` reveal
  used by the About, Skills, Projects, and Achievements sections.
- `useTimelineDraw` — `ScrollTrigger`-scrubbed line draw and staggered node
  reveal for the Experience and Education timelines.
- `useScrollProgress` — a `gsap.to()` tied to `ScrollTrigger` scrub, driving
  the top progress bar.
- `SkillMeter` and `ProjectCard` — component-level `gsap.to()` interactions
  for proficiency bars and hover states.

## Project structure

```
app/                   Routes (App Router)
  admin/                Content dashboard and login
  api/                  Auth and content API routes
  layout.js, page.js    Public site shell and homepage
components/
  admin/                Dashboard chrome and per-section forms
  layout/                Navbar, footer, scroll progress bar
  sections/              Public-facing page sections
  ui/                    Shared presentational components
lib/
  auth/                  Session cookie helpers
  constants/              Nav items and site config
  data/                   Content repository (read/write JSON)
  gsap/                   GSAP + ScrollTrigger setup
  hooks/                  Reusable GSAP animation hooks
  utils/                  Formatting and small helpers
data/content.json        Editable content store
public/                   Static assets
```

## Tech stack

Next.js (App Router), Tailwind CSS, react-hook-form, GSAP with ScrollTrigger
and `@gsap/react`.
