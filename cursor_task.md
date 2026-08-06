# Cursor Task — Personal Website
Date: 2026-08-06 12:41:23
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: urgent

## Context
Final step before the site goes public at rehanghias.com (domain already registered on Cloudflare, same account).

The resume PDF blocker is resolved. The file is being placed at `public/resume.pdf` manually via scp — verify it exists before doing anything else, and STOP if it does not.

The site was built with a temporary noindex because the resume page was rendering a placeholder. That placeholder state is what this task removes.

Covers Linear SIDE-17 (remove noindex, two switches) and SIDE-15 (deploy).

STANDING CONSTRAINT: you cannot visually verify anything — your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed. Everything below is verifiable from the filesystem, build output, or curl, so verify that way and flag anything you could not.

Out of scope, do not add: blog, CMS, dark mode, analytics, client-side JS frameworks, contact form.

## Task
Do these in order. Stop and report if any verification step fails rather than continuing.

---

## 1. Verify the PDF is actually there

Before changing anything:

- Confirm `public/resume.pdf` exists and is non-zero size.
- Confirm it has a real text layer, not a flattened image. Run `pdffonts public/resume.pdf` — it must list embedded fonts. Run `pdftotext public/resume.pdf - | wc -c` — it must return roughly 2,900+ characters, not 1.
- If either check fails, **STOP** and report. Do not proceed to the noindex removal. A flattened PDF is unreadable to applicant tracking systems and shipping it is worse than not shipping.

---

## 2. Remove the noindex — BOTH switches

These are two independent switches. Flipping one and not the other leaves the site invisible to search engines. Do both.

**Switch 1** — `src/layouts/BaseLayout.astro`: set `const NOINDEX = false;`

**Switch 2** — `public/robots.txt`: replace the contents with

```
User-agent: *
Allow: /

Sitemap: https://rehanghias.com/sitemap-index.xml
```

The current file says `Disallow: /` and simultaneously advertises the sitemap, which is self-contradictory. The replacement fixes both.

---

## 3. Verify the resume page actually renders the real thing

`src/pages/resume.astro` checks for the PDF at build time and falls back to a placeholder when absent. Confirm the fallback is no longer firing:

- Build, then inspect `dist/resume/index.html`.
- The real embed (iframe/object pointing at `/resume.pdf`) must be present.
- The placeholder text "PDF not uploaded yet" must be absent.
- Confirm `resume.pdf` was copied into `dist/`.

---

## 4. Full build verification

- `npm run build` completes clean.
- `grep -ri "noindex" dist/` returns **zero** matches. Paste the real output.
- Zero client-side JS bundles emitted.
- Sitemap generated; list every URL in it and confirm all six routes appear.
- Spot-check two built pages for correct canonical URLs and OG tags pointing at the rehanghias.com origin.

---

## 5. Commit

Commit with a clear message covering the noindex removal and resume addition. Do not force-push. Do not rewrite history.

---

## 6. Deploy to Cloudflare Pages

```
npx wrangler pages deploy dist --project-name=personal-website
```

`wrangler.jsonc` is already configured with the assets directory.

If this fails because wrangler is not authenticated, **do not attempt to work around it, and do not store or request any credentials.** Report the exact error and stop — authentication is handled by Rehan directly.

---

## 7. Post-deploy verification

Only if the deploy succeeded. Against the deployment URL:

- `curl -sI` the root — confirm 200.
- `curl -s <url>/robots.txt` — confirm it shows `Allow: /`.
- `curl -s <url>/sitemap-index.xml` — confirm it returns valid XML.
- `curl -sI <url>/resume.pdf` — confirm 200 and `content-type: application/pdf`.
- `curl -s <url>/resume/ | grep -i noindex` — confirm zero matches.
- Fetch each of the six routes and confirm all return 200. Report any that do not.

---

## 8. Do NOT do the DNS

Do not attempt to configure the custom domain, DNS records, or anything in the Cloudflare dashboard. Pointing `rehanghias.com` at the Pages project is a manual step Rehan will do himself. Just report the `*.pages.dev` deployment URL.

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Astro static site, deploys to Cloudflare on push to main
- Use page copy exactly as written — do not rewrite or paraphrase
- Do not add a nav bar, analytics, animation libraries, or a CMS
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Write cursor_output.md covering:

1. `public/resume.pdf` — confirmed present, byte size, and the pdffonts/pdftotext result showing a real text layer. If absent, STOP and report only this.
2. The `NOINDEX` value now set, and confirmation the meta tag is gone from built HTML.
3. Contents of `robots.txt` after the change.
4. Result of the `grep -ri "noindex" dist/` check — must be zero matches. Paste the actual command output.
5. Confirmation `/resume` renders the real embed, evidenced by the presence of the iframe/object tag and absence of the placeholder string in `dist/resume/index.html`.
6. Build output: page count, total size, and confirmation of zero client-side JS bundles.
7. Confirmation `dist/` contains `resume.pdf`.
8. Sitemap contents — list every URL it emits.
9. Deploy status: if you deployed, the deployment URL and the curl results from step 7 of the task. If you could not authenticate, say so plainly and stop there rather than guessing.
10. An explicit "NEEDS HUMAN CHECK" section.
11. Commit hash.

## Status
[x] Complete (deploy blocked on missing CLOUDFLARE_API_TOKEN)
