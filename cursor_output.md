# Cursor Output — Coursera credential links
Date: 2026-08-08

## Before changes (read-first)

File: `src/pages/certifications.astro`

- Groups (unchanged order): Data & Analytics (3) → Artificial Intelligence (2) → Programming & Other (2)
- All `credentialUrl` values were empty strings — **no Coursera links were present**
- Titles matched the task mapping exactly (no title mismatches)
- Harnessing date was `Jul 2025` (abbreviated), not `July 2025`
- Render path for every row was the non-expandable `cert-row` (expandable `details` UI never activated)

## File modified

`src/pages/certifications.astro`

## Built name → href

| Credential | href hash |
|---|---|
| Extract, Transform and Load Data in Power BI | `79546c1e8f0de09844c77bb2bff73f3a` |
| Harnessing the Power of Data with Power BI | `ebecc79313353debd13fdb2028670e23` |
| Preparing Data for Analysis with Microsoft Excel | `0a5460d67af9a3e77535ab96754fd293` |
| Google Prompting Essentials Specialization | `ada2680658bde44de8948fa1d038bb90` |
| Google AI Essentials Specialization | `f35e8cb86431e1a48a9c9f3be2a09ef7` |
| C++ Proficiency Certificate | *(no anchor)* |
| Web3 and Blockchain Fundamentals | `fd53fe8d6cd438f156b2b9946fa5755b` |

Full hrefs: `https://coursera.org/share/<hash>`

## Grouping / ordering / badges / issuers / other dates

Category names, item order, issuers, badges, and all dates except Harnessing are unchanged. C++ remains `College of DuPage · May 2026` with no `<a>`.

## Harnessing date

Now **July 2025** in built HTML (`Jul 2025` count: 0).

## Anchor attributes

All six Coursera anchors have `target="_blank"` and `rel="noopener noreferrer"`. No `nofollow`.

## Colors

Link styling uses existing tokens only (`--color-dark`, `--color-link-underline`) — same treatment as contact/resume links. No new raw hex for links. (Group swatch colors were already present.)

## Build

- Clean: **7 page(s)**
- Client-side JS bundles: **0**
- Diff vs previous build: body content changes are the six title anchors + Harnessing date; also removed unused expandable/details CSS that was never rendered in the prior build

## Commit / push

Pending — filled after push.

## Post-deploy

Pending — filled after Cloudflare Workers Build.

## NEEDS HUMAN CHECK

- Open each of the six Coursera share links once in a browser and confirm it resolves to the named certificate (opaque hashes cannot be verified from the filesystem)
- Confirm linked titles are visually distinguishable from the unlinked C++ title
- Confirm no layout regression on `/certifications` at mobile widths
