---
title: Running AI Coding Models Locally
meta: PERSONAL PROJECT · LOCAL AI · LLAMA.CPP, OPENCODE, BENCHMARKING, LINUX
description: Can a free, open-weight model running on my own CPU do real coding work? I built an agent pipeline around one, benchmarked three models, and measured exactly where the time goes. The answer was yes for small background tasks, and the benchmarks showed why not for everything else.
---

## The question

Paid coding assistants charge per task. My server has 24 CPU cores and sits idle most of the night. I wanted to know how close a free, open-weight model running on that CPU could get to a paid tool, and what it would actually be good for. So I measured it instead of guessing.

## The setup

**Hardware.** CPU only, no GPU: a 24-core Intel Core Ultra 9 with a single 32 GB memory stick.

**Models.** Two open-weight coding models built as mixture-of-experts, where only about 2.5 to 3 billion parameters run per token out of 35 to 40 billion total, which is what makes them practical on a CPU: Ornith-1.5-35B and Flint-40B.

**Runtime.** llama.cpp built from source, serving each model over a local API that only the server itself can reach.

## Benchmarks

### More cores made it slower

| Threads | Reading (tokens/sec) | Writing (tokens/sec) |
|---|---|---|
| 8 performance cores | 124.7 | 9.33 |
| 16 | 119.7 | 6.04 |
| All 24 | 116.6 | 3.51 |

Adding the efficiency cores cut writing speed by almost two thirds. The bottleneck is memory bandwidth, not compute, and the extra cores just fought over it. Writing now runs on the 8 performance cores, while reading uses all 24 with a larger batch size, which gave reading another 21%.

### Reading slows down as context grows

| Context depth | Flint read / write | Ornith read / write |
|---|---|---|
| 0 | 94.0 / 10.5 | 112.3 / 9.2 |
| 8K tokens | 39.7 / 8.0 | 54.7 / 7.7 |
| 16K tokens | 21.5 / 6.4 | 34.6 / 6.6 |
| 32K tokens | 5.1 / 3.4 | 9.7 / 4.6 |

Both models read far slower as the prompt grows: Flint about 18 times slower at 32K tokens. Ornith's hybrid attention design degrades about half as fast, and it's the better default for agent runs on this hardware.

### Format matters

The first Flint build used NVFP4, a format designed for GPUs. On a CPU it read prompts at only 23 to 27 tokens per second. A standard IQ3 quantization of the same model, with comparable quality, read at 102.6. On CPU, standard quantizations only.

### Speculative decoding has a sweet spot

| Draft length | Writing (tokens/sec) | Draft acceptance |
|---|---|---|
| None | 9.19 | |
| 2 tokens | 9.95 | 67% |
| 3 tokens | 11.35 | 55% |
| 6 tokens (default) | 7.89 | 34% |

Ornith ships a small draft head that guesses upcoming tokens for the main model to check. Short drafts gave a 23% speedup. The recommended default of 6 made it slower, because on a CPU every rejected guess costs real time.

## The agent pipeline

I built the full loop so the model could do real work unattended:

```
Claude writes a task  →  file watcher picks it up  →  new git branch
  →  OpenCode agent runs on the local model  →  commit  →  run logged
```

**Every run is measured.** The watcher logs each run's duration, prompt and generated tokens, read and write speed, peak context used, and an honest outcome: success, timeout, killed, server died, or ran out of context. Early on, killed runs were being logged as successes, so I made the watcher check for real output before calling a run a pass.

**Bugs found along the way.** Runs hung forever because the agent was reading from the watcher's input pipe. Git checkouts re-triggered runs because the task file was tracked. The model re-triggered its own run by ticking a checkbox in the task file. Each one is fixed and written up.

## Thinking on vs. off

The same task, run both ways:

| | Reasoning off | Reasoning on |
|---|---|---|
| Result | Correct, clean code | No code produced |
| Duration | 10 minutes | Killed at 25 minutes |
| Prompt tokens read | 15,299 | 21,430 |
| Tokens generated | 1,472 | 8,335 |

With reasoning on, one turn spent 13 minutes thinking before producing anything. About 70% of the successful run's time was spent reading the prompt: the agent's instructions and tool list alone take about 7,000 tokens before it sees the task.

## What it's good for

**Small, well-defined background jobs.** A clear task, a short context, reasoning off: the local model finishes correctly and costs nothing per request.

**Not interactive coding.** Connected to Cursor, a simple "hi" arrives wrapped in about 11,000 tokens of context and takes over three minutes to answer cold. Hard problems go to stronger hosted models.

## What would change it

**Memory first.** The server runs on a single memory stick, which halves the bandwidth these models depend on. A two-stick upgrade is the biggest single speed gain available.

**A GPU second.** The benchmarks show the real wall is reading long prompts, and that's attention work a GPU handles far better. Even a small card holding just the attention layers while the experts stay in RAM would change the shape of the curve, not just shift it.

**Then re-run every benchmark.** The pipeline already logs everything, so the before-and-after comparison will come straight out of the run log.
