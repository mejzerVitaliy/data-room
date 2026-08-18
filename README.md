# Data Room — Frontend

A virtual data room: a Google Drive/Dropbox-style document repository built for M&A due
diligence workflows — nested folders, drag-and-drop uploads, inline file preview, and
read-only sharing via public links or permissioned invites.

This is the **Next.js frontend**. It talks to a separate Fastify + PostgreSQL API
([`data-room-api`](https://github.com/mejzerVitaliy/data-room-api)) over REST; nothing here
talks to a database directly.

## Features

**Data rooms & folders**
- Create data rooms; nest folders inside folders with breadcrumb navigation.
- Rename, move, and delete, with a delete confirmation that previews exactly how many
  folders/files and how many bytes will be removed before you commit.

**Files**
- Drag-and-drop or multi-select upload, direct-to-storage (presigned URL — the file never
  passes through this app's own server), with a per-file progress bar and a persistent
  upload queue panel.
- Name conflicts on upload/rename surface inline with a one-click "keep both" rename, not a
  generic error toast.
- Inline preview (PDF and images render in the browser; everything else downloads).

**Search, filter, sort**
- Debounced name search across the current folder's files and folders.
- Filter files by type (PDF / images / documents / spreadsheets / other).
- Sort by name or upload date, in either direction.

**Sharing**
- Share a data room, a folder, or a single file — recipients get read-only access,
  including everything nested underneath.
- Two modes: a public link (anyone with the URL) or a permissioned list of grantee emails.
  Either can be revoked at any time, and revocation takes effect immediately.
- A "Shared with me" view for permissioned recipients, and an unauthenticated `/share/[token]`
  browsing experience for public links.

**Auth & polish**
- Email/password auth. Dark and light themes, both first-class (not a dark theme with a
  light one bolted on). Toasts on every mutation, skeleton loading states, empty states that
  distinguish "genuinely empty" from "no results for this search," and a graceful
  "no longer available" state everywhere a shared resource can vanish out from under a
  viewer (revoked, deleted, moved).

## Tech stack

- **Next.js 15** (App Router) + **React 19** + TypeScript
- **Tailwind CSS** — the only styling mechanism; no component-level CSS files
- **Radix UI primitives + shadcn/ui** (`new-york` style) for every interactive component
- **TanStack Query** for server state; **Zustand** for the one piece of pure client state
  (the upload queue)
- **React Hook Form + Zod** for every form
- **Axios**, with an interceptor that transparently refreshes an expired access token and
  retries the original request (see [Auth](#auth-httponly-cookies-not-localstorage) below)
- **next-themes** for the dark/light toggle

## Design system

Colors, radii and spacing live as CSS custom properties in `src/app/styles/global.css`
(colors stored as raw OKLCH components, e.g. `--background: 0.1 0 0`, so Tailwind's opacity
modifiers like `bg-foreground/50` keep working) and are wired into `tailwind.config.ts`. Both
themes are defined side by side — `:root` for light, `.dark` for dark — so neither is an
afterthought. The visual target is understated and near-monochrome, closer to resend.com than
a stock shadcn demo: thin low-opacity borders, generous whitespace, Geist Sans/Mono, a single
restrained accent color.

Every interactive control is a Radix primitive under `shared/ui/`, styled with Tailwind —
never a hand-rolled `<div onClick>` standing in for a real button/dialog/select.

## Architecture

The `src/` folder follows **Feature-Sliced Design** (`app → widgets → features → entities →
shared`), enforced at lint time by `eslint-plugin-boundaries` — an illegal cross-layer import
fails `npm run lint`, not just code review. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the
full layer-by-layer breakdown, code examples, and the "why" behind the harder rules (no barrel
files, generator-only `entities`/`features`, `env.ts`-only `process.env` access, and so on).
[`CLAUDE.md`](./CLAUDE.md) holds the condensed, authoritative rule list.

```
src/
├── app/        # Routing, layouts, pages — Server Components only, no business logic
├── widgets/    # Page-level compositions (e.g. the folder browser: breadcrumbs + toolbar +
│               #   file/folder list + every dialog it can open)
├── features/   # A user-facing capability: upload, share, rename, delete, auth forms…
├── entities/   # API access only — one folder per REST resource (api/hooks/types), no UI
└── shared/     # Design tokens, shadcn/Radix primitives, axios client, Zustand stores,
                #   framework-agnostic hooks — feature-agnostic, importable from anywhere
```

### Auth: httpOnly cookies, not localStorage

The access and refresh tokens are **httpOnly cookies set by the backend** — this app never
reads, writes, or stores the token itself (no `localStorage`, no client-readable cookie), so
there's nothing for an XSS payload to steal. `shared/lib/axios.ts` just sets
`withCredentials: true` and lets the browser attach the cookie automatically.

The access token is short-lived (15 min); the refresh token is long-lived (30 days) and
scoped to the refresh endpoint's own path, so it never rides along on ordinary API calls. When
a request comes back `401`, the axios response interceptor transparently calls
`/auth/refresh`, retries the original request once, and only surfaces the error if the refresh
itself fails — a user's session survives an expired access token without them noticing.

One consequence worth calling out: because the frontend and backend are (and in production
will be) different origins, a cookie the backend sets is **not visible to this app's own
Next.js server** — middleware can't read it. Route protection therefore happens client-side,
via `widgets/auth-guard`, which gates both directions (`require-auth` on the app layout,
`require-guest` on the login/register layout) off a live `/auth/me` call rather than off
cookie presence. This is deliberate, not an oversight — it's the one approach that behaves
identically in local dev and in a real cross-domain deployment.

### Data fetching

Every list endpoint (data rooms, folders, files, shares) is paginated, and the frontend never
requests an unbounded list. Search/filter/sort state lives in the page component and is
threaded straight into the TanStack Query params object, which is also the query key — so
changing a filter is just a normal cache-keyed refetch, with no separate client-side filtering
pass. Search input is debounced (300ms) before it hits the network. Pagination, filtering and
sorting are enforced server-side for exactly this reason: they need to stay correct however
large a single data room's contents get, not just while there are a handful of test files in
it.

## Getting started

```bash
npm install
cp .env.example .env.local   # then point NEXT_PUBLIC_API_URL at your running backend
npm run dev
```

The app runs at **http://localhost:3000**. It expects `data-room-api` to already be running
(see that repo's own README) — this app has no backend of its own.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | yes | Base URL of the backend API, including its `/api` prefix (e.g. `http://localhost:3001/api`). Validated at build time via `src/env.ts` — a missing/invalid value fails the build loudly instead of at runtime. |

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm run start` | Production build / serve it |
| `npm run lint:fix` | ESLint, including the FSD boundary and naming rules — run this and `typescript` before considering any change done |
| `npm run typescript` | `tsc --noEmit` |
| `npm run generate:entity <name>` / `generate:feature <name>` | Scaffold a new entity/feature — the only sanctioned way to create one, see `CLAUDE.md` |

## Security notes

- **httpOnly cookie auth** with a short-lived access token + silent refresh (see above) — no
  token ever touches `localStorage` or JS-readable storage.
- **Security headers** (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`) are set on every response via
  `next.config.mjs`.
- **`next/image` is unused and disabled** (`images.unoptimized: true`). The app never renders
  a remote or user-supplied image through Next's optimizer, so the sharp-backed optimization
  pipeline — including its own CVEs — has no reachable entry point.
- File type safety (rejecting anything that isn't a PDF/image/office-document type, and
  forcing a download instead of an inline render for anything not explicitly known-safe) is
  enforced **server-side** in `data-room-api`, since that's the only place it can't be
  bypassed by a modified client.
- Known accepted risk: `npm audit` still flags a handful of high-severity advisories that
  trace back to `next`'s own transitive `postcss`/`sharp` dependencies; a full fix requires
  Next 16, a second major upgrade beyond the Next 15 migration already done here. Practical
  exposure is low — `sharp`'s attack surface is the disabled image optimizer above, and
  `postcss` only ever processes this project's own trusted CSS at build time, never
  user-supplied input — but it's a deliberate, documented trade-off rather than a gap nobody
  noticed.

## A note on AI usage

This project was built with [Claude Code](https://claude.com/claude-code) writing the
implementation, under my direction throughout. I set the scope from the take-home brief,
reviewed and approved the phased build plan before any code was written, and made the call on
every consequential decision along the way: the auth model (email/password, later reworked to
short-lived access + refresh tokens in httpOnly cookies after I flagged the original token
storage as insufficient), file storage (Cloudflare R2), hosting targets, the design direction
(centralized token system, dark/light themes as first-class, Tailwind + Radix + shadcn, a
Resend-inspired look), the switch to UUID primary keys, and the search/filter/sort feature. I
also asked for a dedicated security and code-quality pass partway through specifically because
I wanted a second look at the codebase before treating it as submission-ready — that pass
surfaced and fixed several real issues (an unrestricted file-upload MIME type that could have
let stored HTML execute via the preview iframe, no rate limiting on the auth endpoints, a
Next.js version with unpatched CVEs, a Docker image running as root and shipping
`devDependencies`, among others).

AI wrote the code against that direction — components, API routes, schema, tests. Feature
verification was automated throughout: every flow (golden path, edge cases like same-name
uploads and deleting something a share recipient is currently viewing, sharing, the
refresh-token behavior, responsive layout) was driven through a real Chromium browser via
Playwright before being called done, rather than trusting `lint`/`typescript` alone.
