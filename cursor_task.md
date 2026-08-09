# Cursor Task — Personal Website
Date: 2026-08-08 22:16:45
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: high

## Context
The certifications page already exists with a working structure: credentials grouped into categories (Data & Analytics, Artificial Intelligence, Programming & Other), each with an issuer badge, issuer name, and completion date.

**This task adds hyperlinks and nothing else.** Do not restructure, do not reorder, do not recategorize, do not restyle. The page is in a good state. The only thing missing is that the six Coursera credential titles are not clickable.

The URL-to-credential mapping below is confirmed correct by the site owner. An earlier draft of this task had every pairing wrong, so treat the mapping as the thing most worth getting right.

The C++ Proficiency Certificate (College of DuPage, May 2026) is not a Coursera credential and has no verification URL. Leave it completely untouched.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed.

Out of scope: reordering, recategorizing, badge changes, certificate thumbnails, client-side JS, filtering UI, moving to a content collection.

If a previous run of this task already added links, do not redo the work. Verify the existing hrefs against the mapping below, correct only what is wrong, and report what you found.

## Task
## 1. Read before writing

Locate and read the certifications page. Report its current contents in `cursor_output.md` before making changes. Match its existing markup and class conventions exactly.

## 2. Make the six Coursera credential titles into links

Leave every credential's position, category, badge, issuer, and date exactly as it is. The only change is wrapping the title text in an anchor.

| Credential title (already on page) | href |
|---|---|
| Extract, Transform and Load Data in Power BI | `https://coursera.org/share/79546c1e8f0de09844c77bb2bff73f3a` |
| Harnessing the Power of Data with Power BI | `https://coursera.org/share/ebecc79313353debd13fdb2028670e23` |
| Preparing Data for Analysis with Microsoft Excel | `https://coursera.org/share/0a5460d67af9a3e77535ab96754fd293` |
| Google Prompting Essentials Specialization | `https://coursera.org/share/ada2680658bde44de8948fa1d038bb90` |
| Google AI Essentials Specialization | `https://coursera.org/share/f35e8cb86431e1a48a9c9f3be2a09ef7` |
| Web3 and Blockchain Fundamentals | `https://coursera.org/share/fd53fe8d6cd438f156b2b9946fa5755b` |

Match each row by title text. If a title on the page does not match one of these exactly, stop and report the difference rather than guessing which credential it is.

## 3. One date correction

The Harnessing the Power of Data with Power BI entry should read **July 2025**. If it currently reads anything else, including a bare year, correct it. Change no other date.

## 4. Link requirements

- `target="_blank"`
- `rel="noopener noreferrer"`
- Link text is the full credential title, unchanged
- No `nofollow`
- The C++ Proficiency Certificate gets no link

## 5. Styling

Use existing design tokens from `src/styles/global.css`. No raw hex values.

The link should be visually distinguishable from unlinked titles, since one entry on the page is deliberately unlinked and a reader should be able to tell which titles are clickable. Use whatever link treatment the site already uses elsewhere. Do not invent a new one, and do not add underlines or colors that appear nowhere else on the site.

## 6. Build verification

- `npm run build` completes clean
- Paste a table of credential name against href from `dist/certifications/index.html`
- Confirm the C++ entry contains no anchor
- Confirm zero client-side JS bundles
- Confirm page count is still 7
- Diff the built certifications page against the previous build and confirm the only changes are the six anchors and the one date

## 7. Commit and push

Commit with a message covering the six credential links and the Harnessing date fix. Push to `main`.

Pushing triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy`. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 8. Post-deploy verification

- `curl -s https://rehanghias.com/certifications/ | grep -o 'href="https://coursera.org/share/[^"]*"'` — expect all six
- `curl -sI https://rehanghias.com/certifications/` — expect 200

Do NOT curl the coursera.org URLs. Coursera blocks automated requests and a failure there would tell you nothing about whether the link is correct.

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

1. Whether Coursera links were already present before this run, and if so whether their mapping was correct
2. Which file you modified and its path
3. A table of credential name against href hash as it appears in the built HTML, so the mapping can be checked by eye
4. Confirmation the category grouping, ordering, badges, issuers, and all dates other than Harnessing are byte-identical to before
5. Confirmation the C++ Proficiency Certificate entry is unchanged and unlinked
6. Confirmation the Harnessing date now reads July 2025
7. Confirmation every anchor carries `rel="noopener noreferrer"` and `target="_blank"`
8. Confirmation no raw hex colors were introduced
9. Build result, page count, zero JS bundles
10. Commit hash and confirmation of push to `main`
11. Post-deploy curl output showing the six hrefs live, or a plain statement that the build had not finished
12. An explicit "NEEDS HUMAN CHECK" section, including that each of the six live links must be opened once to confirm it resolves to the named certificate, since opaque share hashes cannot be verified from the filesystem.

## Status
[x] Complete
