# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: HIGH

## Context
The work list entries are broken. The rail grid was supposed to be removed from them but is still applied: the eyebrow and the summary are being placed in the 96px rail column while only the title sits in the wide content column. The result is a 120px-wide strip of text running down the page. The eyebrow is also rendering in Manrope instead of IBM Plex Mono.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

## FIX THE WORK LIST

Open `WorkListItem.astro` (or whatever the work entry component is now called) and remove ALL grid and rail layout from it. The work list entries do not use the rail. Not for the eyebrow, not for the summary, not for anything.

Each entry is a single full-width block. All three elements stack vertically at the SAME full content width:

```
<a>                                 <- whole entry is the link, display: block
  <p class="eyebrow">TRULY ENGAGING</p>
  <h3 class="title">Finding the real capacity of a die-cutting machine</h3>
  <p class="summary">Management wanted to know…</p>
</a>
```

Styling:
- Eyebrow: IBM Plex Mono, 11px, uppercase, letter-spacing 0.05em, color #7A8195, margin-bottom 8px. It must be MONO — it is currently rendering in Manrope.
- Title: Manrope, 21px, weight 600, letter-spacing -0.015em, line-height 1.3, color #1F2430, margin-bottom 8px
- Summary: Manrope, 16px, line-height 1.6, color #4A5064, max-width 56ch
- Entry padding: 24px top, 22px bottom
- 1px #E1E4EA rule between entries, none after the last
- Hover: title color to #1F2A36. Nothing else changes.

The `<a>` must be `display: block` and full width. No flex, no grid, no fixed-width children anywhere in this component.

Verify in a browser that the summary paragraph runs the full width of the content column — roughly 56 characters per line — and not a narrow strip.

## ALSO CHECK

The WORK label and its rule above the list should span the full content width and sit at the same left edge as the ABOUT / SEEKING / CONTACT labels.

Confirm /work uses the same component and is not separately broken.

Everything else stays as it is.

## Rules
- Read the component file before editing
- Do not change any page copy
- Run `npm run build` and confirm it compiles clean
- Open the home page and /work in a browser and confirm the fix visually before calling this done
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
What was actually wrong in the component, what was changed, confirmation the summary now runs full width on both the home page and /work, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete — see cursor_output.md
