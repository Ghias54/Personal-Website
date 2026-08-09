# Cursor Output — Expand Glitz & Kumon experience bullets
Date: 2026-08-08

## 1. Experience page contents before (verbatim from source)

File: `src/pages/experience.astro` — data array before edits:

1. **Data Analyst Intern (Internal Project)** · Truly Engaging · Carol Stream, IL · Jul 2025 – Sep 2025  
   - Selected by the CFO and COO for a six-week analytics project  
   - Analyzed machine-level production data in Excel to identify bottlenecks and reduce downtime  
   - Cleaned and prepared large, inconsistent machine datasets  
   - Established true production capacity to improve planning accuracy  
   - Built Power BI dashboards to present findings  

2. **Machine Operator** · Truly Engaging · Carol Stream, IL · Aug 2023 – Present  
   - Operate CNC and die-cutting equipment  
   - Troubleshoot machine issues and assist other operators  
   - Handle packaging and shipping through FedEx, UPS and USPS systems  
   - Lead small teams to keep production moving  

3. **Supervisor** · Glitz Decor LLC · Chicago, IL · Jul 2023 – Present  
   - Oversee team operations and resolve workflow conflicts  
   - Manage project timelines to hit delivery dates  
   - Coordinate events with clients, vendors and venues  

4. **Center Assistant (Operations Lead)** · Kumon North America · Glen Ellyn, IL · Aug 2022 – Sep 2023  
   - Managed daily center operations and staff coordination  
   - Led a team of 12+ tutors  
   - Streamlined scheduling and student progress tracking  
   - Analyzed student progress data to adjust instructional approach  

Markup: `ExperienceItem.astro` via `experience.map` → role / place / dates / `experience-bullets` list.  
**Punctuation convention:** no trailing periods on bullets (matched for new copy).

## 2. File modified

`src/pages/experience.astro` (bullet arrays only)

## 3. Glitz Decor bullets

**Before (3):**
- Oversee team operations and resolve workflow conflicts
- Manage project timelines to hit delivery dates
- Coordinate events with clients, vendors and venues

**After (5):**
- Started as a crew member and was promoted to supervisor
- Lead crews of 3 to 5 on event setups and takedowns
- Serve as the point of contact between the owner and the crew on site
- Manage project timelines to hit delivery dates on fixed, non-negotiable event days
- Coordinate with clients, vendors and venues for South Asian weddings and large-scale events

## 4. Kumon bullets

**Before (4):**
- Managed daily center operations and staff coordination
- Led a team of 12+ tutors
- Streamlined scheduling and student progress tracking
- Analyzed student progress data to adjust instructional approach

**After (5):**
- Promoted to operations lead within three months of starting as a tutor
- Managed daily center operations and coordinated a team of 12+ tutors
- Owned progress tracking and parent communication for roughly 100 of the center's 130 students
- Analyzed student progress data to adjust instructional approach
- Assisted the owner with monthly reporting and inventory tracking

## 5. Unchanged entries (byte-identical HTML blocks)

- Data Analyst Intern (Internal Project): **identical** (591 bytes normalized)
- Machine Operator: **identical** (439 bytes normalized)

## 6–7. Titles / employers / locations / dates / order

All four roles keep the same title, company, location, dates, and order (Analyst → Machine Operator → Supervisor → Kumon).

## 8. CSS

No new CSS rules. Diff is data-only (`+9 / -6` lines in the bullets arrays).

## 9. Built page diff

Only `dist/experience/index.html` changed. Body diff replaces the Glitz 3-bullet list and Kumon 4-bullet list with the five-bullet lists; Analyst and Machine Operator markup unchanged on that line.

## 10. Other `dist/` files

Unchanged — only `experience/index.html` differed from the pre-build snapshot.

## 11. Build

- Clean: **7 page(s)**
- Client-side JS: **0**

## 12. Commit / push

- Hash: `b12eae64aaf1b020acb94c241761dd33a75b07c0`
- Pushed to `main` (Cloudflare Workers Build; no wrangler pages deploy)

## 13. Post-deploy

- `curl -sI https://rehanghias.com/experience/` → **HTTP/2 200**
- `grep -c "130 students"` → **1**
- `grep -ci "promoted to supervisor"` → **1**

## 14. NEEDS HUMAN CHECK

- Bullet wrapping at mobile width with five lines each on Glitz and Kumon
- Vertical rhythm / spacing of the experience list after the longer entries
