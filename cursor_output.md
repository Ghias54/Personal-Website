# Cursor Output — C++ Parchment credential link
Date: 2026-08-08

## 1. Markup before → after

**Before:**
```html
<span class="cert-name">C++ Proficiency Certificate</span>
```

**After:**
```html
<span class="cert-name">
  <a class="cert-title-link"
     href="https://www.parchment.com/lp/award/19e83acb-9c51-41ee-8de4-d4584467f6b5"
     target="_blank"
     rel="noopener noreferrer">
    C++ Proficiency Certificate
    <span class="cert-ext" aria-hidden="true">&nbsp;↗</span>
  </a>
</span>
```

Source change was only `credentialUrl` on the C++ entry in `src/pages/certifications.astro`.

## 2. Same treatment as Coursera entries

Uses the existing `titleHref ? <a class="cert-title-link">…<span class="cert-ext" aria-hidden="true">` branch — same classes, same arrow, same `target`/`rel`. **No new CSS.**

## 3. All seven credentials (built HTML)

| Credential | href |
|---|---|
| Extract, Transform and Load Data in Power BI | `https://coursera.org/share/79546c1e8f0de09844c77bb2bff73f3a` |
| Harnessing the Power of Data with Power BI | `https://coursera.org/share/ebecc79313353debd13fdb2028670e23` |
| Preparing Data for Analysis with Microsoft Excel | `https://coursera.org/share/0a5460d67af9a3e77535ab96754fd293` |
| Google Prompting Essentials Specialization | `https://coursera.org/share/ada2680658bde44de8948fa1d038bb90` |
| Google AI Essentials Specialization | `https://coursera.org/share/f35e8cb86431e1a48a9c9f3be2a09ef7` |
| C++ Proficiency Certificate | `https://www.parchment.com/lp/award/19e83acb-9c51-41ee-8de4-d4584467f6b5` |
| Web3 and Blockchain Fundamentals | `https://coursera.org/share/fd53fe8d6cd438f156b2b9946fa5755b` |

Anchors: **7**. Arrows: **7**.

## 4. Coursera hrefs

Byte-identical to the previous build (`coursera identical True`).

## 5. Diff vs previous build

Only `dist/certifications/index.html` changed. Semantic body change is the C++ plain title becoming the same linked title + arrow pattern. (Full HTML is one minified line; the meaningful delta is the new Parchment `<a class="cert-title-link"…>` wrapping `C++ Proficiency Certificate` with `<span class="cert-ext" aria-hidden="true">&nbsp;↗</span>`.)

Source diff:
```diff
-        credentialUrl: "",
+        credentialUrl:
+          "https://www.parchment.com/lp/award/19e83acb-9c51-41ee-8de4-d4584467f6b5",
```

## 6. Other `dist/` pages

Unchanged. Only `certifications/index.html` differed from the pre-build snapshot.

## 7. Build

- Clean: **7 page(s)**
- Client-side JS: **0**

## 8. Commit / push

- Hash: `820ccf5c565cb852bdb9177182cd11889f2659dc`
- Pushed to `main` (Cloudflare Workers Build; no wrangler pages deploy)

## 9. Post-deploy

- `curl -sI https://rehanghias.com/certifications/` → **HTTP/2 200**
- Arrow occurrences: **7** (`grep -c` reports 1 because the HTML is one minified line)
- Parchment href live: `href="https://www.parchment.com/lp/award/19e83acb-9c51-41ee-8de4-d4584467f6b5"`

## 10. NEEDS HUMAN CHECK

- Open the Parchment URL in a private/incognito window and confirm it resolves publicly (not behind a Parchment login)
- Confirm the seventh arrow matches the Coursera ones visually
