---
date: 2026-08-05
type: task
tags: [website, cursor, astro]
status: active
repo: https://github.com/Ghias54/Personal-Website
---

## For future Claude
Build spec handed to Cursor for [[People/Rehan Ghias]]'s personal website. Copy lives in [[Resume/Website/Home Page Copy]], [[Resume/Website/MOLL Case Study Copy]], [[Resume/Website/Earnings Factor Model Case Study Copy]]. Deadline is UIUC move-in, August 17 2026.

---

# Cursor Build Task — Personal Website

## Context

Astro static site, minimal template already scaffolded and pushed to `main`. Deploys to Cloudflare Pages (`npm run build`, output `dist`). Building over Cursor Remote SSH on `tradinghost` at `~/personal-website`. Custom domain not purchased yet — do not hardcode a domain anywhere.

## Scope — four pages, nothing more

1. `/` — home
2. `/work/die-cutter-capacity` — MOLL case study
3. `/work/earnings-factor-model` — earnings model case study
4. `/resume` — embedded PDF

Explicitly out of scope: blog, CMS, dark mode toggle, animation libraries, analytics, contact form. Do not add them.

## Content

Copy is final. Paste it as written; do not rewrite, shorten, or "improve" the wording. Store each page's prose in `src/content/` as markdown and render through a layout, so text can be edited without touching components.

## Design

- Fonts: Manrope for headings and body, IBM Plex Mono for metadata lines, code, and figures. Carried over from the Slate project.
- Single column, generous measure, roughly 65–75 characters per line for body text.
- Both case studies share one layout component. Two layouts total: home and case study.
- Light background only.
- Bold lead-ins at the start of paragraphs are load-bearing in the case studies — they are how the pages scan. Preserve them.

## Page details

**Home.** Name, five hero paragraphs, then two case study cards linking to the case study pages. Cards should be equal height. Email, GitHub and Resume links in the hero and repeated in the footer.

**Case studies.** Title, a metadata line (company / type of work / tools) in IBM Plex Mono, then the body. Image placeholders are marked `[IMAGE: ...]` in the copy — build a figure component with an optional caption and leave the slots visibly empty for now. Images are not ready yet. Include a back link to home.

**Resume.** Embed the PDF from `public/resume.pdf` in an iframe sized to fill most of the viewport. Mobile browsers frequently fail to render inline PDFs, so always render a clearly visible "Download resume (PDF)" link above the embed, not only as a fallback. Do not rely on the embed alone.

## Requirements

- Responsive down to 375px width.
- Semantic HTML: one `h1` per page, real heading hierarchy.
- Per-page `<title>` and meta description.
- No client-side JavaScript unless something genuinely needs it. This site probably needs none.
- Rename the package in `package.json` from `peaceful-phase` to `personal-website`.
- Fix the merge conflict markers left in `README.md`, replace with a one-paragraph description of the project.

## Definition of done

Four pages build clean with `npm run build`, render correctly at 375px and desktop widths, all internal links work, and the site deploys to Cloudflare Pages without configuration changes.


---

## Visual direction (approved 2026-08-05)

Approved from mockups. Build to this.

**Palette.** Page background `#FDFCFA` (warm off-white, not pure white). Cards `#FFFFFF`. Body text `#3A3835`. Headings and emphasis `#1C1B19`. Muted metadata `#7A7873`. Borders `rgba(0,0,0,0.12)` hairlines. No dark mode.

**Type.** Manrope for headings and body. IBM Plex Mono for all metadata. Body 16px on desktop, line-height 1.75–1.8, max width 56 characters. Name/page title around 26px, weight 600, letter-spacing -0.02em.

**Metadata treatment.** Every metadata line is IBM Plex Mono, 11px, uppercase, letter-spacing 0.04em, muted. This covers: the tagline under the name, section headers, the case study meta line, figure captions, the back link, and the nav-style links row.

**No navigation bar.** Home page is the index. Case studies get a back link reading `← Rehan Ghias` in mono at the top. Resume page same.

**Home page.** Name, mono tagline "DATA & OPERATIONS ANALYSIS", five hero paragraphs, then a row of mono links (Email / GitHub / Resume) with a thin underline, then a horizontal rule, then a `SELECTED WORK` mono header, then two cards side by side in a 2-column grid. Cards are equal height with the "Read the case study →" link pinned to the bottom. Stack to one column below ~700px.

**Case study pages.** Back link, title, mono meta line (company · type of work · tools) above a hairline rule, then body. Section headers are mono uppercase, not large bold headings — the bold paragraph lead-ins carry the visual emphasis instead.

**Figures.** Dashed 0.5px border, `#F7F5F0` fill, ~150px tall placeholder with the image description centered in mono, and a mono caption line below reading `Fig N — caption`. Build this as a reusable component that swaps to a real `<img>` once images exist. Leave the placeholders visible for now.
