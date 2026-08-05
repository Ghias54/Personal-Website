# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: HIGH

## Context
Visual redesign, approved from a mockup. The site currently reads as flat and templated. Moving to a dark navy header band with an editorial left-rail layout below it. No copy changes — all wording stays exactly as it is.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

## 1. PALETTE ADJUSTMENT

Update tokens in global.css:

- Dark surface (header band): #1F2A36
- On-dark primary text: #FFFFFF
- On-dark muted text: #8494A4
- On-dark rule: #5C7186
- Page background: #FFFFFF (changed from #F7F8FA)
- Primary text: #1F2430
- Secondary text: #4A5064
- Faint / metadata text: #7A8195
- Border: #E1E4EA
- Strong rule: #1F2A36
- Link underline on light: #B7C0C9

REMOVE the mint/teal accent (#1E7F6B) from the site entirely. Navy, greys and white only. The one exception is the certifications page group markers — see section 6.

Reduce border-radius globally. Nothing above 4px except where specified. No rounded pills, no rounded eyebrows, no 14px cards.

## 2. HEADER BAND — all pages

The nav and the page title sit inside a full-bleed #1F2A36 band spanning the full viewport width. The content inside the band uses the same container width as the rest of the site.

Nav row: ~14px vertical padding. RG wordmark on the left in IBM Plex Mono 12px, letter-spacing 0.14em, white. Nav links right, IBM Plex Mono 11px, letter-spacing 0.05em. Active page white, inactive #8494A4. Hover goes to white.

Below the nav row, inside the same band, ~46px top and 48px bottom padding.

HOME PAGE band contains:
- "Rehan Ghias" in Manrope 52px weight 700, letter-spacing -0.04em, line-height 1, broken onto TWO lines ("Rehan" / "Ghias") via a line break, white
- A 44px by 2px rule in #5C7186 below it, ~18px margin above and below
- "INFORMATION SCIENCE & ECONOMICS · UIUC" in IBM Plex Mono 12px, letter-spacing 0.1em, #8494A4

OTHER PAGES band contains the page title (Projects, Certifications, Resume, or the case study title) in Manrope 38px weight 700, letter-spacing -0.03em, white, on one line. Below it the 44px rule, then the page's mono meta line in #8494A4. Case study pages put their existing meta line (company · type of work · tools) here.

The band replaces the current in-page h1 on every page. Do not render the title twice.

## 3. LEFT-RAIL LAYOUT

Below the band, content uses a two-column layout: a fixed 96px left rail and a flexible content column, with a 34px gap.

The rail holds a short mono label in IBM Plex Mono 11px, letter-spacing 0.08em, #7A8195, top-aligned with the content beside it (~4px top padding to sit on the first line's baseline).

Build this as a reusable `RailSection.astro` component taking a label and a slot.

HOME PAGE sections, in order:
- ABOUT — the first four hero paragraphs. First paragraph 17px #1F2430; remaining paragraphs 16px #4A5064.
- SEEKING — the "I'm currently seeking internships…" paragraph, 17px #1F2430. Remove the left-border callout treatment it currently has.
- CONTACT — the Email / GitHub / Resume links, IBM Plex Mono 12px, #1F2A36, 1px #B7C0C9 underline

RESPONSIVE: below 700px the rail collapses. The label stacks above its content, full width, with ~8px below it. Do not shrink the rail or let it squeeze the text column.

## 4. WORK LIST — replaces the card grid

Delete the two-column card grid on the home page and on /work. Replace with full-width ruled list entries.

Above the list: a 1px #1F2A36 rule spanning the content width, then the mono label WORK directly beneath it.

Each entry uses the rail layout:
- Rail: entry number and eyebrow, e.g. "01 / TRULY ENGAGING" and "02 / PERSONAL PROJECT", mono 11px letter-spacing 0.05em #7A8195, wrapping onto two lines
- Content: title in Manrope 21px weight 600, letter-spacing -0.015em, line-height 1.3, then the existing summary text at 16px line-height 1.6 in #4A5064, max-width 56ch
- Entries separated by a 1px #E1E4EA rule, ~24px top and 22px bottom padding, no rule after the last entry
- The whole entry is the link. On hover the title goes to #1F2A36 and the entry background lightens very slightly (#FAFBFC). No shadow, no lift.
- Remove the "READ THE CASE STUDY →" line — the entry itself is the link now

`CaseStudyCard.astro` becomes `WorkListItem.astro`. Used on both the home page and /work.

## 5. CASE STUDY PAGES

Title and meta move into the header band per section 2. Body content sits in the content column of the rail layout, with section headers in the rail rather than inline: each mono section header (THE QUESTION, WHAT I FOUND, etc.) goes in the 96px rail beside its section's first paragraph.

If a section is too long for its label to remain visually attached, that is fine — the label stays top-aligned with the section's start.

Keep the bold paragraph lead-ins exactly as they are.

## 6. CERTIFICATIONS PAGE

Keep the skill-area grouping and the expanding rows. Adjust to match the new system:

- Title moves into the header band
- Group cards lose their 14px radius — use 4px, or drop the card entirely and use a top and bottom hairline rule instead. Prefer the rules.
- Group markers keep their color coding, but replace the current colors with: Data & Analytics #1F2A36, Artificial Intelligence #5C7186, Programming & Other #8494A4. This keeps grouping legible without reintroducing teal.
- Logo slots lose their radius, use 2px

## 7. RESUME PAGE

Title in the band. Download link and embed in the content column, no rail label needed.

Everything not mentioned stays as it is. Check every page at 375px and confirm the rail collapses cleanly and the 52px name does not overflow.

## Rules
- Read existing files before editing
- Do not change any page copy
- Do not add analytics, animation libraries, or a CMS
- No client-side JavaScript beyond what the certifications rows already need
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files created and changed, how the rail behaves at 375px, anything in the spec that conflicted with existing structure and how it was resolved, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete — see cursor_output.md
