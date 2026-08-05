# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: HIGH

## Context
Combined task. Two earlier tasks were written but never executed (nav pages and alignment), plus the newly approved certifications redesign and site-wide palette change. Page copy is final — do not rewrite or paraphrase any existing wording.

## Task

STANDING RULE FOR EVERY TASK IN THIS REPO
When finished: run `npm run build`, then `git add -A`, commit with a short descriptive message, and `git push`. Every time, without being asked. Record the commit hash in cursor_output.md.

---

## PART 1 — ALIGNMENT

Define ONE container width used by the nav, all page content, and the footer — same max-width, same horizontal padding, same centering. Currently the nav is wider than the content column, so the nav links hang past the right edge of the text. The right edge of the nav links must line up exactly with the right edge of the content column. Implement as a single CSS class or custom property so it cannot drift.

## PART 2 — REMOVE THE DUPLICATE NAME

On the home page the name appears in the nav and again as the h1. Change the nav wordmark from "Rehan Ghias" to "RG" in IBM Plex Mono, uppercase, letter-spacing 0.08em, linking to /. Keep it on every page. The full name stays as the h1 on the home page only.

## PART 3 — PROJECTS AS A REAL PAGE

Create `/work` as a real page and point the Projects nav link at it. Not an anchor.

The /work page contains:
- h1: Projects
- A mono label: SELECTED WORK
- The same two case study cards currently on the home page

Extract the card markup into `src/components/CaseStudyCard.astro` and use that component on BOTH /work and the home page. Do not duplicate markup.

Keep the cards on the home page as well.

Nav order: Profile · Projects · Certifications · Resume

## PART 4 — SITE-WIDE PALETTE

Replace the current color tokens everywhere with the Slate palette (ported from the Pulse project). Update the CSS custom properties in global.css so every page picks this up:

- Page background: #F7F8FA
- Card / elevated surface: #FFFFFF
- Secondary surface: #EDEFF3
- Border: #E1E4EA
- Soft border / inner divider: #EDEFF3
- Primary text: #1F2430
- Dimmed text: #4A5064
- Faint text and metadata: #7A8195
- Accent (links, active nav, interactive): #375570
- Accent deep (hover): #2C4359
- Secondary accent: #1E7F6B

Cards get border-radius 14px and a 1px #E1E4EA border. Links and the active nav item use the accent color.

## PART 5 — REBUILD /certifications

Replace the chronological year-grouped list with grouping by skill area. Remove the "SEVEN CREDENTIALS · 2025–2026" subtitle line entirely.

Three groups, in this order. Each group header is a row containing: a small 8px rounded square in the group color, the group name in IBM Plex Mono 11px uppercase letter-spacing 0.06em in the group color, a hairline rule filling the remaining width, and the entry count in mono on the right.

GROUP 1 — DATA & ANALYTICS — color #1E7F6B, header text #166B59
- Extract, Transform and Load Data in Power BI — Microsoft — Feb 2026
- Harnessing the Power of Data with Power BI — Microsoft — Jul 2025
- Preparing Data for Analysis with Microsoft Excel — Microsoft — May 2025

GROUP 2 — ARTIFICIAL INTELLIGENCE — color #375570, header text #2C4359
- Google Prompting Essentials Specialization — Google — Aug 2025
- Google AI Essentials Specialization — Google — Jun 2025

GROUP 3 — PROGRAMMING & OTHER — color #7A8195, header text #4A5064
- C++ Proficiency Certificate — College of DuPage — May 2026
- Web3 and Blockchain Fundamentals — INSEAD — Dec 2025

Each group is a white card, 14px radius, 1px #E1E4EA border, entries separated by 1px #EDEFF3 dividers with no divider after the last entry.

## PART 6 — ENTRY ROWS

Each row: logo on the left, then name and meta stacked, then a chevron on the right.

- Logo slot: 34px square, 8px radius. See Part 8.
- Name: Manrope 15px weight 600, #1F2430, line-height 1.35
- Meta below name: IBM Plex Mono 10px uppercase letter-spacing 0.03em #7A8195, format "ISSUER · MON YYYY"
- Chevron: mono "›" in #7A8195, rotates 90 degrees when open
- Hover: the name turns #375570

## PART 7 — EXPANDING ROWS

Clicking a row expands a panel beneath it revealing a credential link. Use a CSS max-height transition, roughly 0.2s ease. Multiple rows may be open at once.

Panel contains one link, indented to align with the name (48px left padding): "VIEW CREDENTIAL ↗" in IBM Plex Mono 11px, color #375570, underlined with 3px underline offset, opening in a new tab.

Add a `credentialUrl` field to each entry in the data array. Leave all seven as empty strings for now. If the URL is empty, the row must NOT be expandable — no chevron, no click handler, no hover cursor. Rows become interactive only once a URL is filled in.

Accessibility: rows with a URL should be keyboard operable (button element or tabindex plus Enter/Space, aria-expanded).

## PART 8 — LOGOS

Install the `simple-icons` npm package and pull the brand SVGs from it at build time. It contains Microsoft and Google.

- Import the icon SVG path data from simple-icons and render it inline as an SVG inside the 34px slot, sized ~18px, centered.
- Render the glyph in #4A5064 rather than the brand's own color, so the marks stay consistent with the Slate palette.
- simple-icons does NOT contain College of DuPage or INSEAD. For those two, render a monogram fallback: the issuer's initials in IBM Plex Mono 11px #7A8195 on a #EDEFF3 background with a 1px #E1E4EA border. "CD" for College of DuPage, "IN" for INSEAD.
- Build a single `IssuerLogo.astro` component that takes an issuer name and decides between the simple-icons glyph and the monogram fallback. Adding an issuer later should mean editing one file.
- If simple-icons cannot be installed or an icon slug is missing, fall back to the monogram for that issuer rather than failing the build.

---

Everything not mentioned above stays as it is.

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Astro static site, deploys to Cloudflare on push to main
- Use page copy exactly as written — do not rewrite or paraphrase
- Do not add analytics, animation libraries, or a CMS
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files created and changed, whether simple-icons installed successfully, which issuers fell back to monograms, confirmation the /work page exists and the nav points at it, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete — see cursor_output.md
