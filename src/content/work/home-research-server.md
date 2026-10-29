---
title: Building the Server My Research Runs On
meta: PERSONAL PROJECT · INFRASTRUCTURE · LINUX, POSTGRESQL, LLAMA.CPP, MCP
description: A self-hosted server that holds my 68 GB market database, runs local AI models, and connects to AI assistants so they can work directly with my data. Built, migrated, and benchmarked by hand.
---

## The problem

My research projects had outgrown the machine they lived on. The old server was at 96% disk, carried a 77 GB stock database, and had picked up years of stray services I no longer understood. Every new experiment meant clearing space first.

I wanted one box that could hold all of my data, run heavy backtests, host AI models locally, and let AI assistants work with my projects directly instead of through copy and paste. So I built it, and moved everything over one project at a time.

## What it runs

**A 68 GB PostgreSQL database.** Prices, financial statements, earnings events, analyst and ownership data across three databases, plus about 1.9 million raw source files that cannot be re-downloaded. Every research project reads from it. How the database itself is designed is its own case study: [Building a point-in-time stock database](/projects/stock-database).

**The research projects themselves.** The earnings models, their dashboards, and the code that keeps the data current all run on the server as background services that restart on their own.

**Local AI models.** Open-weight coding models run on the CPU, so routine background tasks cost nothing per request.

**A bridge to AI assistants.** A tool server lets assistants like Claude read files, query the database, and hand coding tasks to the local model, all through one authenticated connection.

## How it's built

**Hardware.** A Minisforum MS-02 Ultra mini workstation with a 24-core Intel Core Ultra 9 and 1 TB of NVMe storage, running Ubuntu Server headless. It sits on a private network, so I can reach it from my laptop or phone anywhere without exposing it to the internet.

**Moving the database without losing a row.** I dumped all three databases in parallel with compression, copied them across, and restored them on PostgreSQL 18 in under four minutes. Then I counted every row in every table on both machines. All 438 production tables matched exactly. The database also shrank from 77 GB to 68 GB because the restore cleared out years of bloat. Only after the counts matched did I switch the projects over and delete the old copy.

**One rule for the migration: every service runs in exactly one place.** A trading bot running on two machines places two sets of orders. Two database copies drift apart. So each service is turned off on the old server before it starts on the new one, never both at once.

**Connecting AI assistants safely.** The tool server sits behind an OAuth login, and it is the only thing reachable from outside. Every file tool is restricted to its own project folder and refuses to touch credential files. While moving tools over, I audited the old server and found several tool groups with no path protection at all. I fixed them before they moved, not after.

## Running AI models locally

I wanted to know how close a free local model could get to paid coding tools. So I measured it instead of guessing.

| Setup | Writing speed | Reading speed |
|---|---|---|
| 35B model, 8 performance cores | 9.3 tokens/sec | 125 tokens/sec |
| Same model, all 24 cores | 3.5 tokens/sec | 117 tokens/sec |
| Coding-agent model, standard quant | 9.1 tokens/sec | 103 tokens/sec |

**More cores made it slower.** Adding the efficiency cores cut writing speed by almost two thirds. The bottleneck is memory bandwidth, not compute, and the extra cores just fought over it.

**Reading is the real limit, not writing.** On a real coding task, about 70% of the ten-minute run was the model reading its prompt. An agent's instructions and tools alone take around 7,000 tokens before it sees the task.

**"Thinking" mode made it worse.** With reasoning on, the same task never produced code. One turn spent 13 minutes thinking before I stopped it. With reasoning off, it finished correctly in ten. On this hardware the local model handles small, well-defined background jobs, and hard problems go to stronger hosted models.

I built the full pipeline around that: an assistant writes a task, a watcher picks it up, the local model does the work on its own branch, and every run is logged with its duration, token counts, speed, and whether it succeeded or ran out of context.

## What broke

**The screen stayed black.** The default graphics driver didn't support this chip yet. I switched to the newer driver through the boot configuration and pinned a display mode the monitor would accept.

**The public address never appeared.** One server could be reached from outside and the new one couldn't, with identical settings as far as I could see. I compared every network setting between the two machines line by line. The only difference was a hostname flag I had set during install. Clearing it fixed the problem in seconds.

**My internet stopped working, but only for my devices.** Pages half-loaded and secure connections hung, while my roommates were fine. It wasn't the server. A router traffic setting had capped my devices at 100 kbps. Turning it off fixed it instantly.

## What I would do differently

**Buy the right memory first.** The box shipped with one memory stick, which halves the bandwidth that local models depend on. A two-stick upgrade is the single biggest speed improvement available, and I would have planned for it from the start.

**Wire it in.** It runs on Wi-Fi today, and the old server dropped off Wi-Fi twice. Ethernet is the next fix.

**Write the rules down before migrating.** The one-place-per-service rule and the row-count check were what made the move safe. I worked them out partway through. Next time they come first.
