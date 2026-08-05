# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: HIGH

## Context
The redesign introduced several regressions. This task fixes them and simplifies the work list. No copy changes.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

## 1. NAV IS BROKEN

Current state: the nav sits inside a white box on top of the dark band, the links have wrapped onto a second line, and the PROFILE link is missing entirely.

Required:
- The nav has NO background of its own. It inherits the dark band behind it. Remove whatever white background or wrapper is being applied.
- All four links render on ONE line: Profile · Projects · Certifications · Resume. Profile must be present.
- Links are IBM Plex Mono 11px, uppercase, letter-spacing 0.05em. Active page white, inactive #8494A4.
- RG wordmark on the left, nav links on the right, vertically centered on the same row, `justify-content: space-between`.
- The nav row and the name below it use the SAME container and therefore the same left edge. Currently the RG mark and the name do not align.

## 2. CONTACT LINKS ARE CRAMPED

The Email · GitHub · Resume links are running together with no spacing, and the underline is spanning the whole row rather than the individual links.

Required:
- ~20px gap between links
- The separator dots have their own spacing and are #7A8195
- Underline applies to each link individually, 1px #B7C0C9, not to the container
- Remove the full-width rule that is currently appearing under the whole contact row

## 3. WORK SECTION HEADING IS WRONG

"Work" is currently rendering as a large Manrope heading. It should be a mono label, matching ABOUT / SEEKING / CONTACT.

Required:
- A 1px #1F2A36 rule spanning the content width
- Below it, "WORK" in IBM Plex Mono 11px uppercase letter-spacing 0.08em #7A8195
- Not a large heading, not Manrope

## 4. REMOVE LIST BULLETS

The work list items are rendering with bullet points. Remove `list-style` from the ul and reset padding and margin.

## 5. SIMPLIFY THE WORK LIST RAIL

The "01 / TRULY ENGAGING" numbered rail label wraps onto three lines and looks bad. Remove it.

New structure for each work list entry — no rail, full width:
- Eyebrow directly above the title: "TRULY ENGAGING" / "PERSONAL PROJECT" in IBM Plex Mono 11px uppercase letter-spacing 0.05em #7A8195, ~8px below
- Title: Manrope 21px weight 600, letter-spacing -0.015em, #1F2430
- Summary: 16px line-height 1.6 #4A5064, max-width 56ch
- No numbers, no rail column
- Entries separated by a 1px #E1E4EA rule, 24px top and 22px bottom padding, no rule after the last
- Whole entry is the link. Hover: title goes to #1F2A36. No background change on hover — the current hover fill is showing permanently on the second item, remove it entirely.

The ABOUT / SEEKING / CONTACT rail layout above stays as it is. Only the work list loses its rail.

## 6. RAIL LABEL ALIGNMENT

The ABOUT / SEEKING / CONTACT labels do not line up with the left edge of the name in the band above. All page content and the band content must share one container with identical left padding.

Everything else stays as it is. Check at 375px before finishing.

## Rules
- Read existing files before editing
- Do not change any page copy
- Run `npm run build` and confirm it compiles clean before finishing
- Verify in a browser that the nav renders on one line with all four links before calling this done
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Each of the six items above with confirmation it was fixed, anything that could not be reproduced, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete — see cursor_output.md
