---
title: Building the Server My Research Runs On
meta: INFRASTRUCTURE · LINUX, TAILSCALE, OAUTH, MCP, OBSIDIAN, CURSOR
description: A self-hosted Linux server that every one of my projects runs on, reachable from anywhere over a private network, with a version-controlled knowledge base and a bridge that pairs a reasoning model to plan the work with a fast coding agent to build it.
---

## The setup

Everything I build runs on one machine: a Minisforum MS-02 Ultra with a 24-core Intel Core Ultra 9 and 1 TB of NVMe storage, running Ubuntu Server headless. It hosts my 68 GB stock database, my research projects and their dashboards, my trading bot's paper desk, and my notes.

I moved everything onto it from an older server one project at a time, under one rule: **every service runs in exactly one place.** A trading bot on two machines places two sets of orders, and two database copies drift apart. So each service was stopped on the old machine before it started on the new one. The database alone was restored and checked row by row: all 438 production tables matched before I switched anything over.

The server does three jobs, and each one is its own system.

## 1. Private networking with Tailscale

**The server is never exposed directly to the internet.** It sits on a Tailscale private network, so my laptop and phone reach it from anywhere as if they were on the same desk. Dashboards, SSH, and dev servers stay private to my own devices.

**Only one thing is public, and it's behind a login.** Claude needs to reach the server from Anthropic's side, so I exposed exactly one route through Tailscale Funnel. It doesn't point at the tools themselves. It points at an OAuth 2.1 proxy I run, and only after a successful login does a request reach the tool server.

**Defense in depth behind that.** The tool server's port is blocked by a firewall rule unless the request comes from the machine itself, so even a misconfigured route can't skip the login. Every file tool is pinned to its own project folder and refuses `../` escapes and credential files. When I moved tools over from the old server, I audited them first and found whole tool groups with no path protection at all. They were fixed before they moved.

**The hardest bug was invisible from the inside.** The public address worked on the old server and never appeared on the new one, with what looked like identical settings. Testing from the server itself was misleading, because it resolves its own name privately and never touches the internet. Checking against public DNS showed the record simply didn't exist. I diffed every Tailscale setting between the two machines and found the only difference: a hostname flag I had set during install. Clearing it brought the public record up in seconds.

## 2. A second brain in Obsidian

**My notes are a git repository, not an app's private database.** I keep an Obsidian vault with project notes, reference docs, decision logs, and infrastructure write-ups. It lives on the server and syncs to GitHub, and my laptop has its own clone for Obsidian's graph view.

**It saves itself.** A file watcher notices any change in the vault, waits a few seconds for edits to settle, and commits. Git hooks then do two more jobs: a pre-commit hook records which agent made the change (Claude, Cursor, or me) into a daily log and a running "current state" summary, and a post-commit hook pushes to GitHub. Nobody has to remember to save or sync.

**It's written for AI as much as for me.** Every reference note starts with a short "for future Claude" summary, so an assistant opening a note cold knows what it covers and what's already been decided. One map note records where every project, repo, and tool physically lives. When something breaks, the answer is usually already in the vault.

**Lesson learned in the move:** git hooks are not copied by `git clone`. The first move of the vault quietly lost its auto-push until the hooks were copied over by hand. That gotcha is now written at the top of the map note.

## 3. The bridge: a reasoning model to plan, a coding agent to build

**Two kinds of AI, each used for what it's best at.** Reasoning models like Claude are strongest at understanding a problem: reading a codebase and its history, weighing approaches, catching the edge case, and deciding exactly what should change. Coding agents like Cursor are strongest at execution: making edits across many files quickly, running the tests, and iterating until they pass. Asking one tool to do both gives you either slow, expensive typing or fast, careless planning. Splitting the job gives you both strengths at once.

**Claude scopes the work.** Through an MCP server on the server (the protocol AI assistants use to call tools), Claude reads the actual repo, the database schema, and the vault notes directly, with 56 tools across eight project areas. It turns a goal into a precise task: the context the agent needs, the exact changes, files that must not be touched, the tests to run, and what to report back. Because Claude has already done the thinking, the task leaves very little for the agent to guess about.

**Cursor executes it.** The task lands as a file in the repo. Cursor picks it up, works on its own branch, makes the changes, runs the tests, commits, and writes a report back to an output file. Claude reads that report, checks the result against the plan, and either approves the merge or writes the next task. Every handoff is a plain file, so the whole loop is readable and stays in git history.

**Why it works so well.** A well-scoped task means the fast agent spends its time building instead of exploring. Hard reasoning happens once, up front, on the strongest model. Mistakes get caught at the review step, before they're merged.

### Cursor Rules: guardrails the agent can't forget

**Every repo has a rules file** in `.cursor/rules/` that Cursor loads automatically on every task. Where a task describes one job, the rules describe how every job in that repo must be done. They turn lessons I learned the hard way into constraints that apply every time.

**Git discipline.** A branch per task and a commit per step. The agent never merges on its own; merges only happen when I approve them in the task file or in chat. Live trading and broker code is listed as off-limits.

**Compute limits.** On my laptop, total memory use has to stay under a set budget. The agent measures what the system is already using, sizes its parallel workers to fit the rest, and runs a watchdog that stops the job if it crosses the line.

**Research integrity.** The rules for my earnings model encode the methodology itself: every test is pre-registered before results are seen, features may only use data that was public before the trade, a held-out test period stays sealed until the very end, and fixed vocabulary keeps "the company beat estimates" separate from "the stock went up."

**They hold under pressure.** In one data-quality task, the obvious way to make a failing database check pass was to loosen the check. Cursor refused, because the rules say constraints protecting point-in-time data don't get weakened. The real problem turned out to be about 84,000 rows dated weeks too early, which a loosened check would have hidden.

## What I'd do differently

**Write the migration rules down first.** The one-place-per-service rule and the row-count check are what made the move safe. I worked them out partway through. Next time they come first.

**Version the tool server.** It started as a single script with backup copies instead of a git repository. It's grown to 56 tools, and it should have had history from day one.

**Wire it in.** The server runs on Wi-Fi today. Ethernet is the next fix.
