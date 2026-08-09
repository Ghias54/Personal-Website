# Cursor Task — Personal Website
Date: 2026-08-08 23:12:11
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: medium

## Context
The experience page has four roles. Two of them have thinner bullets than the others and need expanding. This task changes those two and nothing else.

I have not been able to read the experience page source, so **step 1 is to read it and report what is there before changing anything.** Match its existing markup and conventions exactly.

Explicitly unchanged: the Truly Engaging analyst entry, the Machine Operator entry, all titles, all employers, all locations, all date ranges, the page heading, and every other page on the site. Do not reorder the entries.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed.

Out of scope: new CSS, new components, restructuring the page, logos, links, icons, client-side JS.

## Task
## 1. Read before writing

Locate and read the experience page. Report its current contents in `cursor_output.md` before making changes. Match its existing markup, classes, and bullet conventions.

## 2. Glitz Decor LLC — replace the three bullets with these five

- Started as a crew member and was promoted to supervisor
- Lead crews of 3 to 5 on event setups and takedowns
- Serve as the point of contact between the owner and the crew on site
- Manage project timelines to hit delivery dates on fixed, non-negotiable event days
- Coordinate with clients, vendors and venues for South Asian weddings and large-scale events

Keep the title, employer, location, and date range exactly as they are.

## 3. Kumon North America — replace the four bullets with these five

- Promoted to operations lead within three months of starting as a tutor
- Managed daily center operations and coordinated a team of 12+ tutors
- Owned progress tracking and parent communication for roughly 100 of the center's 130 students
- Analyzed student progress data to adjust instructional approach
- Assisted the owner with monthly reporting and inventory tracking

Keep the title, employer, location, and date range exactly as they are.

## 4. Do not touch the other two entries

The Truly Engaging analyst entry and the Machine Operator entry are out of scope for this task. Leave their bullets, titles, and dates exactly as they are. Confirm explicitly in the output that both are unchanged.

## 5. Use the copy as written

Do not reword, shorten, expand, or reorder the bullets above. Do not add trailing periods if the existing bullets have none, and do not remove them if they do. Match the existing punctuation convention and report which one you found.

## 6. Verification

- `npm run build` completes clean
- Confirm the Glitz Decor entry now has exactly five bullets and the Kumon entry has exactly five
- Confirm the Truly Engaging analyst and Machine Operator entries are byte-identical to the previous build
- Confirm no new CSS rules were added
- Diff the built experience page against the previous build. The only changes should be the two bullet lists. Paste the diff.
- Confirm no other file in `dist/` changed
- Confirm zero client-side JS bundles and page count still 7

## 7. Commit and push

Commit covering the Glitz Decor and Kumon bullet expansions. Push to `main`.

Pushing triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy`. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 8. Post-deploy

- `curl -sI https://rehanghias.com/experience/` — expect 200
- `curl -s https://rehanghias.com/experience/ | grep -c "130 students"` — expect 1
- `curl -s https://rehanghias.com/experience/ | grep -c "promoted to supervisor"` — expect 1

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Astro static site, deploys to Cloudflare on push to main
- Use page copy exactly as written — do not rewrite or paraphrase
- Do not add a nav bar, analytics, animation libraries, or a CMS
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Write results to `cursor_output.md` covering:

1. The experience page contents before the change, verbatim
2. Which file you modified and its path
3. The Glitz Decor bullets before and after
4. The Kumon bullets before and after
5. Confirmation the Truly Engaging analyst entry and the Machine Operator entry are byte-identical to before
6. Confirmation all four titles, employers, locations, and date ranges are unchanged
7. Confirmation the entry order is unchanged
8. Confirmation no new CSS rules were added
9. Diff of the built experience page against the previous build, confirming only the two bullet lists changed
10. Confirmation no other page in `dist/` changed
11. Build result, page count, zero JS bundles
12. Commit hash and confirmation of push to `main`
13. Post-deploy curl output
14. A "NEEDS HUMAN CHECK" section covering bullet wrapping at mobile width and vertical rhythm now that two entries have five bullets.

## Status
[x] Complete
