# Cursor Task — Personal Website
Date: 2026-08-05
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: HIGH

## Context
Adding a work history section to the home page and renaming the existing WORK section to PROJECTS. Both get a section header treatment with a separating rule. Experience entries now include real dates and bullet descriptions.

## Task

STANDING RULE: when finished, run `npm run build`, then `git add -A`, commit, and `git push`. Record the commit hash in cursor_output.md.

## 1. SECTION HEADER TREATMENT

Create a reusable `SectionHeader.astro` taking a label string:

- A 1px #E1E4EA rule spanning the full content width
- Below it, ~14px gap, the label in IBM Plex Mono `--fs-label` (13px), uppercase, letter-spacing 0.06em, weight 500, color #4A5064
- ~20px below the label before the section content starts
- ~48px above the rule to separate it from the previous section

## 2. RENAME WORK TO PROJECTS

Replace the bare WORK label on the home page with SectionHeader using the label PROJECTS. The list itself is unchanged.

## 3. NEW EXPERIENCE SECTION

Add a section BELOW Projects using SectionHeader with the label EXPERIENCE.

Build from a data array in the page frontmatter. Each entry: role, company, location, dates, and an array of bullet points.

Entry layout — full width, no rail:
- Role in Manrope `--fs-heading` (21px) weight 600 color #1F2430
- Company and location below in Manrope `--fs-body-sm` (16px) color #4A5064, ~4px gap
- Dates in IBM Plex Mono `--fs-label` uppercase color #4A5064, ~6px gap
- Bullets below, Manrope `--fs-body-sm` (16px) line-height 1.6 color #4A5064, max-width 56ch, ~12px gap above
- Bullets use a simple hanging indent with a small middot or en dash marker in #7A8195 — NOT default browser list bullets. Reset list-style.
- 26px top and 24px bottom padding, 1px #E1E4EA rule between entries, none after the last

Entries, most recent first:

**1. Data Analyst Intern (Internal Project)** · Truly Engaging · Carol Stream, IL · JUL 2025 – SEP 2025
- Selected by the CFO and COO for a six-week analytics project
- Analyzed machine-level production data in Excel to identify bottlenecks and reduce downtime
- Cleaned and prepared large, inconsistent machine datasets
- Established true production capacity to improve planning accuracy
- Built Power BI dashboards to present findings

**2. Machine Operator** · Truly Engaging · Carol Stream, IL · AUG 2023 – PRESENT
- Operate CNC and die-cutting equipment
- Troubleshoot machine issues and assist other operators
- Handle packaging and shipping through FedEx, UPS and USPS systems
- Lead small teams to keep production moving

**3. Supervisor** · Glitz Decor LLC · Chicago, IL · JUL 2023 – PRESENT
- Oversee team operations and resolve workflow conflicts
- Manage project timelines to hit delivery dates
- Coordinate events with clients, vendors and venues

**4. Center Assistant (Operations Lead)** · Kumon North America · Glen Ellyn, IL · AUG 2022 – SEP 2023
- Managed daily center operations and staff coordination
- Led a team of 12+ tutors
- Streamlined scheduling and student progress tracking
- Analyzed student progress data to adjust instructional approach

## 4. ORDER ON THE HOME PAGE

ABOUT → SEEKING → CONTACT → PROJECTS → EXPERIENCE

Everything else stays as it is. Check at 375px before finishing.

## Rules
- Read existing files before editing
- Do not change any existing page copy
- Run `npm run build` and confirm it compiles clean
- Open the home page in a browser and confirm visually before calling this done
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Files created and changed, confirmation both section headers render identically, confirmation the bullets are not using default browser list styling, confirmation npm run build compiles clean, and the commit hash after push.

## Status
[x] Complete
