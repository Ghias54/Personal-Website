# Cursor Output — Cert link treatment + Jul date
Date: 2026-08-08

## 1. CSS before → after (credential title links)

**Before:**
```css
.cert-name a {
  color: var(--color-dark);
  text-decoration: underline;
  text-decoration-color: var(--color-link-underline);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.25em;
}
.cert-name a:hover {
  text-decoration-color: var(--color-dark);
}
```

**After:**
```css
.cert-title-link {
  color: var(--color-heading);
  text-decoration: none;
}
.cert-title-link:hover,
.cert-title-link:focus {
  color: var(--color-dark);
  text-decoration: none;
}
.cert-title-link:hover .cert-ext,
.cert-title-link:focus-visible .cert-ext {
  transform: translate(2px, calc(-0.12em - 2px));
}
.cert-ext {
  display: inline-block;
  font-size: 0.7em;
  font-weight: 500;
  color: var(--color-muted);
  line-height: 1;
  transform: translateY(-0.12em);
  transition: transform 0.2s ease;
}
```

## 2. Underline

`text-decoration: none` at rest, hover, and focus. Built CSS for `.cert-title-link` contains no `underline`.

## 3. Hover

Title color shifts to `--color-dark` (existing interactive accent). Arrow translates 2px right and further up. No underline, fill, shadow, or scale.

## 4. Arrow insertion / a11y

Markup inside the anchor, after the title text:

```html
<span class="cert-ext" aria-hidden="true">&nbsp;↗</span>
```

`aria-hidden="true"` keeps `↗` out of the accessible name. Global `:focus-visible` outline (`2px solid var(--color-dark)`) still applies.

## 5. No wrap onto own line

Non-breaking space before `↗`, and `.cert-ext` is `display: inline-block`, so the arrow stays with the title’s trailing edge.

## 6. C++ entry

Unlinked plain text in `.cert-name` — no `<a>`, no `↗`.

## 7. Date

Harnessing meta is `Microsoft · Jul 2025` (renders as `JUL 2025` via uppercase). Other dates unchanged:
`Feb 2026`, `May 2025`, `Aug 2025`, `Jun 2025`, `May 2026`, `Dec 2025`.

## 8. Hrefs

Byte-identical to previous build (all six `coursera.org/share/…` hashes unchanged).

## 9. Build

- Clean: **7 page(s)**
- Client-side JS: **0**
- Exactly **6** `↗` in `dist/certifications/index.html`

## 10. Commit / push

Pending — filled after push.

## 11. Post-deploy

Pending — filled after Cloudflare Workers Build.

## 12. NEEDS HUMAN CHECK

- Arrow size (~0.7em) and optical alignment with cap height
- Hover color + arrow nudge feel
- Focus ring visibility on keyboard tab
- Mobile wrapping of long titles with trailing arrow
- Linked vs unlinked (C++) still distinguishable without underline
