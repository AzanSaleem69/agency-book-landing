# Project Context — 7-Figure Agency Mindset A-Z Landing Page

Read this whole file before doing anything else. It's a handoff brief so a new
AI assistant (or a new account/session) can pick up exactly where the last
one left off, without re-deriving decisions that were already made.

## What this is

A single-page Next.js marketing/sales landing page for **"7-Figure Agency
Mindset A-Z"**, a book by **Hamid Mahmood** (founder of Software Pro
Digital) about building and scaling a digital marketing agency. The page
sells the book at **$9.99** (e-book + hardcopy), with heavy urgency/scarcity
marketing (countdown timers, "limited time offer" framing).

- Live checkout links point to `hamidthepro.com/?add-to-cart=...`
- Amazon listing: `https://www.amazon.com/dp/B0G6TKKRHP`
- Author's YouTube channel: `@7figureagencymindsetaz`

## Tech stack

- **Next.js 15** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, config lives in
  `src/app/globals.css` using `@theme`, not a `tailwind.config.js`)
- `lucide-react` for icons, `react-countup` for animated numbers,
  `react-intersection-observer` for scroll-triggered entrance animations
- No component library — every section is a self-contained `.tsx` file with
  its own scoped `<style>` block (not CSS modules, not styled-components —
  just a plain `<style>` tag per component with hand-picked class names)
- Deliberately **no `next/image`** — plain `<img>` tags throughout
  (with `eslint-disable-next-line @next/next/no-img-element`)

## Repo / deployment setup

**Two git remotes — every push goes to both, always, without asking:**
```
origin   https://github.com/AzanSaleem69/agency-book-landing.git   (user's own repo, connected to Vercel auto-deploy)
manager  https://github.com/FrankLucas224/Hamid-the-pro-landingpage.git   (manager's private repo, mirror only)
```
Workflow after any change: `git add` the specific files → commit → `git push origin main` → `git push manager main`.
Same cached GitHub credentials (Windows Credential Manager) work for both remotes.

**Vercel**: connected to `origin` via GitHub integration. Every push to
`origin main` auto-deploys within ~1-2 minutes. No Vercel token needed for
normal work.

**Windows-specific gotchas hit repeatedly in this project:**
- `git`/`curl` SSL sometimes fails with a schannel revocation-check error
  (`CRYPT_E_NO_REVOCATION_CHECK`) — this is a local network/AV issue, not a
  code problem. Fix applied: `git config --global http.sslBackend schannel`
  + `git config --global http.schannelCheckRevoke false`. For ad-hoc `curl`,
  add `--ssl-no-revoke`.
- Running `next build` and `next dev` back-to-back against the same `.next`
  folder corrupts it (dev-mode vs prod-mode manifests conflict) and causes
  every JS/CSS chunk to 404 with no visible error. Fix: `rm -rf .next`
  before switching between `build` and `dev`.
- Killed dev-server background tasks sometimes leave an orphaned node
  process holding port 3000. Next will warn `Port 3000 is in use by process
  <PID>, using available port <N> instead` — kill that PID
  (`taskkill //F //PID <pid>`) or just use the port it actually bound to.

## Page structure (src/app/page.tsx)

Rendered in this order — `StickyTimer` and `StickyAmazonBadge` are fixed-position and render outside `<main>`:

1. `BookHero` — hero, book cover, diagonal color-split panel background (no logo watermark — that idea was explicitly rejected)
2. `PainSection` — "Stop Us If This Sounds Familiar", 3 editorial cards (ghost page numeral + underline, not icon-circles)
3. `AuthorSection` — Hamid's bio, photo, stats (fixed a duplicated-decimal CountUp bug here: `5.0.0` → `5.0`)
4. `AuthorVideoSection` — YouTube video (click-to-play facade over thumbnail, not an eager iframe), background `#EFEDE7`
5. `FrameworkSection` — "Start. Sale. Scale." 3-step overview — this section **owns** the giant-gold-numeral-in-white-card motif; don't reuse it elsewhere
6. `StartSection` — dark glass cards + ghost numerals **removed per feedback** (now plain), rotated vertical "START" label, editorial pull-quote panel filling the header's empty space, "Chapters 1–9" tag inline with the phase badge
7. `SaleSection` — numbered list panel (not cards — see design notes below)
8. `ScaleSection` — vertical checklist/timeline with connecting line (not a card grid), "7" logo watermark centered, larger/more visible than Start's version was
9. `LeadSection` — horizontal icon band with a connecting line (not a card grid)
10. `BookContents` — 4 "Part I–IV" pillars, each with a themed icon (Compass/Settings2/TrendingUp/Crown) — **ghost Roman numeral watermark was added then explicitly removed per feedback**, don't re-add
11. `TestimonialsSection` — **real, verbatim customer reviews** pulled from actual Facebook/Trustpilot posts. Never edit the review text itself (dishonest to alter someone's real review), even for things like em-dashes.
12. `UrgencySection` — big price/countdown CTA block
13. `FaqSection`
14. `CtaSection` — final CTA, footer-ish copyright line (see "No footer" below)

## Design system / conventions

- **Palette**: `GOLD = #C9A84C`, `NAVY = #000025` (or `#000D30` in some
  sections — there are two navy shades used for alternation), off-whites
  around `#F8F7F4`/`#EFEDE7`. Every component redeclares these as local
  `const` — there's no shared theme file for section-level colors.
- **Fonts**: `Playfair Display` (`var(--font-playfair)`) for headlines,
  `Inter` (`var(--font-sans)`) for body — set up in `src/app/layout.tsx`.
- **Section background alternation matters.** Sections deliberately
  alternate light/dark backgrounds so each section reads as visually
  distinct. When adding or reordering sections, check the section
  immediately before AND after — two adjacent sections with the same/near-
  identical background reads as "one giant undifferentiated block" (this
  happened twice already: `AuthorSection`→`AuthorVideoSection` both navy,
  and the same navy fix was needed against `TestimonialsSection`).
- **Card-grid fatigue is a known problem the team actively fought.** The
  original build had 6 sections in a row all using the same "icon-in-a-
  circle + colored-left-border + white-card" recipe (an extremely common
  AI-template pattern). Only `PainSection` and `FrameworkSection` still use
  a card-like grid (with the *editorial ghost-numeral* variant, not the
  original icon-circle one) — `Lead`, `Scale`, `Sale`, `Start` were each
  deliberately redesigned into a **different, non-generic layout**
  (icon-band, timeline, list-panel, dark-glass-cards). **Don't introduce
  another plain white-card-with-icon-circle grid** — that pattern was
  removed everywhere on purpose.
- **Decorative watermarks are hit-or-miss with the client — check before
  adding more.** History: a "7" logo watermark was added to Framework
  (removed), Start (removed, replaced with pull-quote), kept on Scale only.
  A ghost "90" numeral was tried on Start (removed). A ghost Roman numeral
  was tried on BookContents pillars (removed). **General lesson: prefer
  filling empty space with real, relevant content (a pull-quote, a stat
  that's actually true, an inline tag) over arbitrary decoration.** When
  something is genuinely just decorative, get it visually verified (screen-
  shot) before pushing — several rounds of blind guessing on the same
  section wasted the client's patience.
- **No em dashes in visible copy.** Client explicitly asked for this
  (reads as an AI-writing tell). CTAs like "Get the Book — $9.99" were
  rewritten to "Get the Book for $9.99" throughout. Exception: don't touch
  code comments, `aria-label` strings, or the verbatim testimonial text.
- **Countdown timers share one persisted deadline.** `src/lib/useCountdown.ts`
  stores a deadline in `localStorage` so refreshing the page doesn't reset
  the countdown to 15:00:00 — it only rolls over once 15 real hours have
  passed. Both `StickyTimer` and `UrgencySection` use this same hook/key,
  so they always show identical times. If you add another countdown
  anywhere, use this hook, not a fresh `useState(TOTAL)` + `setInterval`.
- **Section-crossing responsive alignment**: when a two-column
  image+text layout (`BookHero`, `AuthorSection`) collapses to one column
  on tablet, make sure BOTH the image and the text switch from
  centered→left-aligned at the **same** breakpoint. They were mismatched
  before (`sm:` for text, `lg:` for image) causing a centered image next to
  left-aligned text at ~768px. Both now switch at `lg:`.

## Known open items / things the client has asked about but not resolved

- **No footer.** The original scaffold had `Footer.tsx` but it was never
  wired into `page.tsx`, and it's now been deleted along with other dead
  code (see below). The page currently just ends after `CtaSection`'s
  copyright line. Client has been asked twice whether they want a real
  footer built and hasn't given a final answer — ask again if relevant.
- **CTA/urgency density** — there are 10+ buy buttons plus a permanently
  visible floating Amazon badge and sticky top timer bar, all at once, on
  every scroll position. Flagged as a possible "too hard-sell for a
  premium positioning" issue; client hasn't asked to reduce it, but it's an
  open suggestion if asked for more design feedback.
- **Video section frame** still uses the same rounded-rectangle photo-frame
  treatment as the author photo directly above it. A phone/laptop-style
  mockup was suggested to visually differentiate "watch this" from "here's
  a photo" but not built.

## Dead code that WAS removed (don't re-add without reason)

Deleted: `Navbar`, `Footer`, `AnnouncementBar`, `StickyNav` (layout/);
`CTA`, `FAQ`, `Features`, `FormatSection`, `Hero`, `HowItWorks`, `Pricing`,
`Stats`, `Testimonials` (sections/); the `ui/` folder (`Badge`, `Button`,
`Card`); `src/lib/utils.ts` (the `cn()` helper). Also pruned from
`package.json`: `@radix-ui/*`, `class-variance-authority`, `clsx`,
`tailwind-merge`, `framer-motion`, `@tailwindcss/typography`. All of this
was leftover from an early generic template scaffold, never wired into the
actual page, confirmed unused via grep before deletion. `globals.css` was
also trimmed of the unused indigo/purple "brand"/"accent" theme colors —
if you see references to `brand-*`/`accent-*` Tailwind classes anywhere,
that's a sign of regression, not an existing convention.

Also: images live in `public/assets/` (not `public/` directly, and
definitely not the project root — root-level image duplicates were dead
weight since Next.js only serves from `/public`).

## Client workflow preferences (important — this shaped a lot of back-and-forth)

- **Push to both `origin` and `manager` after every change, without asking
  each time.** This was explicitly pre-authorized as a standing instruction.
- **Skip the dev-server + screenshot verification loop for most changes.**
  Client explicitly asked for this multiple times ("don't take time every
  time you check the server, take screenshots"). Default to just running
  `npx tsc --noEmit` or `npm run build`, then push.
- **Exception**: for a purely visual/layout fix where a previous *unverified*
  guess already failed once, verify visually before pushing again rather
  than guessing a third time blind — this actually happened (Start section
  empty-space fix took 3 attempts; the first two were unverified guesses
  that didn't land, the third was screenshot-verified and worked). Use
  judgment: cheap, unambiguous edits → skip verification; a repeat failure
  on the same spot → verify once, then get back to skipping verification.
- Client writes in a mix of English and Roman Urdu/Hindi phrasing
  sometimes — read requests for intent, not literal grammar.

## Memory files (persist across sessions, outside this repo)

There's a Claude Code memory system with entries for: pushing to both
remotes (durable instruction), skipping dev-server verification (feedback).
Check those if you're an assistant with access to this project's memory
directory — this CONTEXT.md is the portable version for handoff to a
different account/tool that won't have that memory.
