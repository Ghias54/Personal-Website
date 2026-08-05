# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: MEDIUM

## Context
The tagline under the name on the home page is too light to read comfortably and is being changed to the degree. Also making sure "Information Science and Economics" is the wording used everywhere — LinkedIn currently says "Data Science and Economics" and that is being corrected separately by Rehan.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

1. TAGLINE TEXT
Change the home page tagline from "DATA & OPERATIONS ANALYSIS" to:

INFORMATION SCIENCE & ECONOMICS

2. TAGLINE STYLING
The tagline currently uses the faint metadata color (#7A8195), which is too low-contrast for a line this prominent.

- Change its color to the accent, #375570
- Bump it one step larger than standard metadata: 13px
- Keep IBM Plex Mono, uppercase, letter-spacing 0.05em
- Weight 500 so it holds against the large name above it

This applies to the home page tagline only. Do NOT change other metadata across the site — section labels, case study meta lines, figure captions, nav links and the links row all keep the existing faint color.

3. CONTRAST CHECK
Confirm the faint metadata color #7A8195 on the #F7F8FA background meets at least 4.5:1 contrast for any text 12px or smaller. If it does not, darken the faint token to #6B7285 site-wide rather than leaving small text under-contrast.

4. CONSISTENCY CHECK
Search the repo for "Data Science" and report any occurrences. The degree should read "Information Science and Economics" everywhere. Do not change the wording of the hero paragraph itself — just report anything inconsistent.

Everything else stays as it is.

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Do not change any page copy other than the tagline specified above
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files changed, the measured contrast ratio for the faint metadata color and whether it was darkened, any "Data Science" occurrences found, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete — see cursor_output.md
