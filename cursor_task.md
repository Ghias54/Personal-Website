# Cursor Task — Personal Website
Date: 2026-08-09 18:30:42
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: medium

## Context
An updated resume PDF was copied over the existing `public/resume.pdf` by scp. It is a Chrome export (Skia/PDF m151 producer), one page, letter size, roughly 80,458 bytes, with three embedded subsetted TrueType fonts and a real extractable text layer.

The only change in this task is committing and deploying that file. No source file changes. The filename is unchanged, so nothing that links to it needs updating.

Why the file matters: an earlier version of this resume had been exported through Microsoft Print to PDF, which rasterizes the page and leaves no text layer, meaning applicant tracking systems parse a blank document. The file now on disk is a correct export. Do not regenerate, convert, compress, linearize, or optimize it at any point. Commit the bytes as received.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed.

Out of scope: every source file, every page, every stylesheet, the resume page markup. Do not add a version string, date, or cache-busting query parameter to the resume link.

## Task
## 1. Verify the file

Confirm `public/resume.pdf` exists, is approximately 80,458 bytes, and has a recent modification time.

If it is zero bytes, a few hundred bytes, or unchanged from the previous commit, **STOP** and report. That indicates a failed or stubbed transfer, not a real file.

Confirm it has an extractable text layer. If `pdftotext` is available, run it and confirm non-trivial output containing the string `linkedin.com/in/rehanghias`. If `pdftotext` is not installed, do not install it — check the file begins with `%PDF` and state plainly that deeper verification was not possible.

## 2. Do not modify the file

No PDF optimizer, compressor, linearizer, or converter. No re-encoding. The bytes on disk are the bytes to commit.

## 3. Do not modify anything else

Run `git status` and confirm `public/resume.pdf` is the only modified path. If anything else is dirty, report what and why before proceeding.

## 4. Build verification

- `npm run build` completes clean
- `dist/resume.pdf` exists and is byte-identical to `public/resume.pdf`
- Page count is still 7
- Zero client-side JS bundles
- The seven images in `dist/images/` are still present at full size

## 5. Commit and push

Commit the resume update. Push to `main`. Do not force-push, do not rewrite history.

Pushing triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy`. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 6. Post-deploy verification

- `curl -sI https://rehanghias.com/resume.pdf` — expect 200 and `content-type: application/pdf`
- Confirm `content-length` matches the local byte size
- `curl -sI https://rehanghias.com/` — expect 200

If the build has not finished, say so plainly rather than reporting stale results.

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

1. `public/resume.pdf` byte size and modification time
2. How you verified the text layer, and the result
3. The producer string if you could read it without installing anything
4. `git status` output before committing, confirming `public/resume.pdf` is the only modified path
5. Build result, page count, zero JS bundles
6. Confirmation `dist/resume.pdf` is byte-identical to `public/resume.pdf`
7. Confirmation the seven images in `dist/images/` are still present at full size
8. Commit hash and confirmation of push to `main`
9. Post-deploy curl output including status, content-type, and content-length
10. A "NEEDS HUMAN CHECK" section noting the live PDF should be opened once in a browser to confirm it is the intended version, since byte size alone does not confirm content.

## Status
[x] Complete
