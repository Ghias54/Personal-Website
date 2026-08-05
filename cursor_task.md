# Cursor Task — Personal Website
Date: 2026-08-05 11:37:42
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: HIGH

## Context
Certifications page is done and committed (4e16b84). This task is the nav and alignment work that was written but never executed. Copy is final — do not change any existing wording.

## Task
STANDING RULE FOR EVERY TASK IN THIS REPO
When finished: run `npm run build`, then `git add -A`, commit with a short descriptive message, and `git push`. Every time, without being asked. Record the commit hash in cursor_output.md.

1. FIX ALIGNMENT
Define ONE container width used by the nav, all page content, and the footer — same max-width, same horizontal padding, same centering. Currently the nav is wider than the content column, so the nav links hang past the right edge of the text. The right edge of the nav links must line up exactly with the right edge of the content column. Implement as a single CSS class or custom property so it cannot drift.

2. REMOVE THE DUPLICATE NAME
On the home page the name appears in the nav and again as the h1. Change the nav wordmark from "Rehan Ghias" to "RG" in IBM Plex Mono, uppercase, letter-spacing 0.08em, linking to /. Keep it on every page. The full name stays as the h1 on the home page only.

3. MAKE PROJECTS A REAL PAGE
Create `/work` as an index page and point the Projects nav link at `/work`. It must be a real page, not an anchor.

The /work page contains:
- h1: Projects
- A mono label: SELECTED WORK
- The same two case study cards currently on the home page

Extract the card markup into `src/components/CaseStudyCard.astro` and use that component on BOTH /work and the home page. Do not duplicate the markup.

Keep the cards on the home page as well.

4. NAV ORDER
Profile · Projects · Certifications · Resume

Everything else stays as it is.

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Astro static site, deploys to Cloudflare on push to main
- Use page copy exactly as written — do not rewrite or paraphrase
- Do not add a nav bar, analytics, animation libraries, or a CMS
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files created and changed, confirmation npm run build compiles clean, confirmation of commit and push, and the commit hash.

## Status
[x] Complete — see cursor_output.md
