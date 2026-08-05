# Cursor Output — Type scale & mono labels
Date: 2026-08-05

## Done

1. **Name** — “Rehan A Ghias” on one line; `clamp(32px, 6vw, 46px)`; Manrope 700; `white-space: nowrap`. Confirmed at 375px: 32px, single line, no overflow.
2. **Type scale** — six tokens in `global.css`; all component/page font sizes use them (except home name clamp, intentional).
3. **Mono labels** — 13px / `#4A5064` / 500 / 0.06em / uppercase; dark band uses `#A9B6C2`. Cert group counts keep `#7A8195`.
4. **Rules removed** — band rule under name; strong rule above WORK; trailing list borders. Kept between-item rules and cert group header hairlines.
5. **Rail spacing** — 38px between ABOUT / SEEKING / CONTACT.

## Font-size mapping

| Previous / location | Mapped to |
|---|---|
| Body default ~17px | `--fs-body` (17px) |
| Page titles in band (30–38px) | `--fs-page-title` (38px) |
| Home name (52px / wrap) | `clamp(32px, 6vw, 46px)` *(exception)* |
| Lead about paragraph | `--fs-lead` (18px) |
| Work titles / cert names (~17–21px) | `--fs-heading` (21px) |
| Work summaries | `--fs-body-sm` (16px) |
| Rail labels, WORK, eyebrows, nav, contact, cert meta/group titles, header meta, resume download, credential links, figure captions (`.meta`), issuer monograms | `--fs-label` (13px) |
| Cert group count | `--fs-label` size; color stays `--color-muted` (#7A8195) |
| RG wordmark | `--fs-label`; letter-spacing remains 0.14em (wordmark, not a rail label) |
| Cert chevron / logo slot pixel boxes | text → `--fs-label`; box dimensions unchanged (not type scale) |

## Did not map cleanly

- **Home name** — required `clamp(32px, 6vw, 46px)` outside the six-token list so it stays one line at 375px.
- **RG letter-spacing** — kept at 0.14em (wordmark), not 0.06em.

## Rules removed

- 44px horizontal rule under the name in the dark band
- Full-width / strong rule above the WORK label (home + projects)
- Trailing `border-bottom` on certification lists

## Checks

- 375px home: name one line, no wrap/overflow — **pass**
- `/`, `/work`, `/certifications` type scale + label colors — **pass**
- `npm run build` — **clean**

## Commit

See hash below after push.
