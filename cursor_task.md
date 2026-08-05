# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: HIGH

## Context
The Experience section makes the home page too long. Moving it to its own page. The home page ends after the two project entries.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

## 1. CREATE /experience

New page at `/experience` using the standard dark header band:
- Band title: Experience
- Band meta line below the rule: WORK HISTORY

Move the entire Experience section — the data array and the entry markup — off the home page and onto this page. Keep the entry layout, spacing, bullets and rules exactly as they are now. Nothing about how an entry looks should change.

The page does not need a SectionHeader above the list, since the band already names the page. Start the list directly.

Extract the entry markup into `ExperienceItem.astro` if it is not already a component.

## 2. REMOVE EXPERIENCE FROM THE HOME PAGE

The home page now ends after the second project entry. Delete the EXPERIENCE section header, the data array, and the entries from the home page.

Home page order becomes: ABOUT → SEEKING → CONTACT → PROJECTS → end.

Make sure there is no leftover trailing rule or empty section wrapper after the last project entry.

## 3. NAV

Add Experience to the nav. New order:

Profile · Projects · Experience · Certifications · Resume

Check that five items still fit on one line at desktop width and wrap acceptably at 375px. If five items are too tight at smaller widths, reduce the gap between nav links rather than shrinking the font size.

Everything else stays as it is.

## Rules
- Read existing files before editing
- Do not change any page copy or any entry content
- Run `npm run build` and confirm it compiles clean
- Open the home page and /experience in a browser and confirm visually before calling this done
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files created and changed, confirmation the home page ends cleanly after the projects with no stray rule, how the five nav items behave at 375px, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete
