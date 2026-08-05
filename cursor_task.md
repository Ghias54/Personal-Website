# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: MEDIUM

## Context
Two changes: remove the redundant WORK label on the projects page, and rename the route from /work to /projects so the URL matches the page name.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

## 1. REMOVE THE WORK LABEL

On the projects index page, remove the WORK mono label and the rule above it entirely. The project list starts directly below the header band.

Keep the spacing between the band and the first entry consistent with /experience and /certifications, which start their content directly after the band.

Leave the PROJECTS section header on the home page alone — that one still separates the projects from the sections above it.

## 2. RENAME /work TO /projects

Rename the route and every reference to it:

- `src/pages/work/index.astro` → `src/pages/projects/index.astro`
- `src/pages/work/die-cutter-capacity.astro` → `src/pages/projects/die-cutter-capacity.astro`
- `src/pages/work/earnings-factor-model.astro` → `src/pages/projects/earnings-factor-model.astro`

New URLs:
- /projects
- /projects/die-cutter-capacity
- /projects/earnings-factor-model

Update every internal link, including:
- The Projects nav item
- Both project entry links on the home page
- Both project entry links on the projects index
- Any back links or cross-references on the case study pages
- Any `href` in content files or data arrays

Search the whole repo for the string `/work` and confirm nothing still points at the old path. Report anything found.

The site has not been deployed to a public domain yet and is not indexed, so no redirects are needed.

Everything else stays as it is.

## Rules
- Read existing files before editing
- Do not change any page copy
- Run `npm run build` and confirm it compiles clean
- Click through every nav item and both project links in a browser and confirm nothing 404s before calling this done
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files renamed and changed, every location where a /work reference was updated, confirmation no /work references remain, confirmation all links resolve, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete
