# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: MEDIUM

## Context
Certifications page design is approved. Type is running too small across the site — the certification names in particular are smaller than body text elsewhere, which makes the page feel cramped. Bumping sizes site-wide so everything stays in proportion. No copy or layout changes.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

Increase type sizes. Apply these globally through the CSS custom properties in global.css wherever possible rather than editing each component, so the scale stays consistent.

CERTIFICATIONS PAGE
- Certification name: 15px → 17px
- Issuer / date meta line: 10px → 11px
- Group header label: 11px → 12px
- Group count on the right: 11px → 12px
- Increase row vertical padding from 15px to 18px to match the larger text
- Increase the logo slot from 34px to 38px, glyph and monogram scale with it

BODY TEXT SITE-WIDE
- Base body text: 16px → 17px
- Keep the lead paragraph on the home page one step above body, so 18px → 19px
- Line-height stays as it is

METADATA SITE-WIDE
All IBM Plex Mono metadata (section labels, case study meta lines, figure captions, nav links, the links row): 11px → 12px

CASE STUDY CARDS
- Card title: 17px → 18px
- Card summary: 15px → 16px

NAV
- Nav links: 11px → 12px
- RG wordmark: scale up proportionally

Check at 375px afterwards and confirm nothing overflows or wraps badly, particularly the nav and the certification meta lines.

Everything else stays as it is.

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Do not change any page copy
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files changed, confirmation of how it looks at 375px, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete — see cursor_output.md
