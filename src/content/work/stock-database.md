---
title: Building a Point-in-Time Stock Database
meta: DATA ENGINEERING · POSTGRESQL, PYTHON, SQL, PARQUET, SEC EDGAR, OPRA
description: A centralized research data platform that every one of my quant and strategy projects queries instead of pulling its own data. 1.9 million raw files, a 68 GB PostgreSQL warehouse built from them, and 8,700+ U.S. stocks back to 1970, including companies that no longer exist.
---

## The purpose

I run a lot of quant and strategy research: earnings models, factor models, options studies, backtests. Before this database, every one of those projects pulled its own data. Each one had its own API scripts, its own cleaning code, its own rate-limit problems, and its own slightly different version of the truth. Two projects could disagree about the same company's earnings simply because they fetched it differently.

**This database exists to eliminate that.** Data is collected once, cleaned once, dated once, and stored in one place. A new research idea starts with a SQL query, not a week of building another data pipeline.

That made it a data engineering problem, not a research one. The platform had to be:

**Complete enough to serve any project.** Prices, fundamentals, earnings, analysts, ownership, short interest, options, and filings, all keyed to the same stock identifiers.

**Trustworthy enough to backtest on.** Every number carries the date it became public, so no project can accidentally use information from the future.

**Rebuildable from scratch.** The raw responses are the permanent record. The database is a view of them and can be dropped and rebuilt at any time.

## Engineering at a glance

| Area | What I built |
|---|---|
| Ingestion | Resumable crawler on a Postgres job queue, rate-limited to 2,615 req/min with zero errors |
| Raw storage | 1.9M gzipped responses, 28 GB, SHA-256 manifest, offsite backup |
| Transformation | Python loaders that parse, validate, stamp availability dates, and bulk-copy |
| Data model | One `security` hub, dated ticker history, four schemas split by backtest safety |
| Data quality | Database constraints, per-row rejection log with reasons, validation gates |
| Environments | Dev database first, tests and gates, then promotion to production |
| Schema management | 52 versioned migrations |
| Testing | 486 automated tests, including leakage tests on every research panel |
| Serving | SQL for ad hoc work, Parquet panels for model training |

## The pipeline

[IMAGE: /images/stockdb-pipeline.svg | Pipeline diagram. Sources (FMP API, SEC EDGAR, Databento OPRA, FINRA and FRED, the XNYS calendar) feed a crawler with a resumable job queue, rate limiter, date windowing and pagination guards. The crawler writes to a raw archive of 1.9 million files, 28 GB, with a SHA-256 manifest and offsite backup. Loaders parse each file, stamp date_available, reject bad rows with a reason, and load into a dev database before promoting to production. The 68 GB Postgres database feeds research extracts: an earnings event spine, options snapshots per event, and a monthly factor panel. | Fig 1. From six sources to research-ready extracts. Each stage can be re-run without touching the one before it.]

## Ingestion

**I planned the crawl before running it.** Before any bulk download, I probed every endpoint on five test tickers to measure compression, where each one silently capped its results, and how far back it really reached. That produced a written crawl plan ranked by priority, so a crawl that died halfway would still leave something usable.

**I measured instead of assuming.** The vendor's bulk CSV files looked efficient. In practice they were uncompressed, ignored filters, and got rate-limited after a handful of calls. Per-symbol JSON compressed to about 14% of its size, so the "slow" path was the cheap one.

**Price history had to be walked backwards.** The price endpoint returns at most 5,000 rows per request and doesn't say when it has cut you off. The crawler requests the latest window, and if it comes back full, steps back and asks again, filling any one- or two-day seams between windows.

**The crawler is a resumable job queue.** Every request is a row in Postgres, so a crash or reboot resumes exactly where it stopped without re-fetching anything. Each file's fingerprint is written to the manifest the moment it lands.

| Crawl | Requests | Notes |
|---|---|---|
| Phase 1: identity, prices, fundamentals, earnings, ownership | 428,000 | 4.1 hours |
| Phase 2: transcripts, news, funds, alternative data | 248,000 | 2.2 hours |
| Phase 3: everything an endpoint audit found missing | 941,000 | ~12 hours |
| Final pull: dead companies, original filings | 116,250 | 0 failures |
| Gap pull: catch-up before the subscription ended | 143,108 | 64 minutes, 0 failures |

**The archive was verified, not assumed.** A full check of every file against the manifest returned 1.43 million matches, 0 missing, and 0 mismatches.

**The vendor ended, but the pipeline didn't.** New statements now come from SEC EDGAR, short data from FINRA, credit spreads from FRED, and the trading calendar from the exchange. Any source can be swapped without touching the rest.

## Transformation and loading

**Loaders never trust a row.** Each one parses raw files, assigns the date the fact became public, validates it, and bulk-copies the survivors into Postgres. A row that fails is rejected with a written reason in an ingest log. Nothing disappears silently.

**Everything goes through dev first.** New data loads into a development database, the tests and validation gates run against it, and only then is it promoted to production through the same loaders. A backup is taken before every promotion.

**Availability dates come from the real world, not the data.**

| Data | When it counts as public |
|---|---|
| Financial statements | SEC acceptance timestamp of the filing |
| Short interest | FINRA publication, 7 trading days after settlement |
| Daily short volume, credit spreads | Next trading session |
| Options open interest | Earliest publication before the snapshot time |
| Economic releases | Scheduled release time in Eastern time |

Database constraints reject any row whose availability date comes before the thing it measures.

## The data model

[IMAGE: /images/stockdb-schema.svg | Schema diagram of the stock database. A central security table links to company and symbol_history, and to groups of tables for prices, fundamentals, analysts, ownership, earnings, options, text, and alternative data. Options snapshots link to earnings events. A market schema holds index, ETF and macro data with no stock link, and an archive schema is walled off with no foreign key to security. | Fig 2. Everything hangs off one security table. Market data stands apart, and the archive is deliberately walled off.]

**Tickers are not identifiers.** Every stock gets a permanent ID in `security`, and its tickers live in `symbol_history` with start and end dates. Tickers get recycled, so a constraint makes it impossible for two companies to hold the same ticker on the same day.

**Delisted companies are first-class.** A stock that stopped trading keeps its full history and simply gets a last trade date.

**Schemas are split by how safe the data is to backtest on.** Stock-level facts live in `public`, market-wide data in `market`, and text in `text`. Data that only exists as today's value lives in `archive`, which has no link to `security` at all, and a test confirms it stays that way.

## What's in it

| Area | Coverage | Size |
|---|---|---|
| Prices | Daily OHLCV, split- and dividend-adjusted, 1970 onward | 29M rows |
| Fundamentals | Quarterly and annual statements, dated by filing | 617k rows |
| Original filings | Figures as first filed, before restatement | 1.78M rows |
| Earnings | Report dates, actual vs. expected EPS, announcement times | 461k events |
| Analysts | Estimates, rating changes, price targets | 17.9M rows |
| Insiders | Executive buys and sells | 8.1M rows |
| Institutions | 13F fund holdings, 2014 onward | 37M+ rows |
| Short selling | FINRA daily short volume and short interest | 77M rows |
| Options | OPRA chains around every earnings event | t−1, t, t+1 |
| Text | Earnings call transcripts, SEC filing index | 196k calls, 8.1M filings |
| Market-wide | 427 indexes, ETFs, 23 economic series, Treasury yields | S&P 500 since 1970 |

## Serving the research projects

None of my research projects call a vendor API anymore. They read from this database, either with SQL directly or through extracts built from it.

**Earnings event spine.** One row per earnings report, with the price reaction around it and every feature checked against a hard rule: its source data must have been public before the day before the report.

**Options snapshots.** For every report, the option chain the day before, the day of, and the day after, with the implied move the market was pricing in. Missing quotes are stored as missing with a reason, never as zero.

**Monthly factor panel.** One row per stock per month back to 1970, 1.5 million rows, shared as Parquet for model training, with leakage tests run on every build.

**Fixes flow back upstream.** When research uncovers a data problem, it gets fixed in the database once, and every project benefits. An earnings study surfaced a stock whose adjusted price flipped between two companies. Tracing it found 446 securities with corrupted adjusted prices, which were repaired and guarded against in the loaders.

## Data quality, enforced

**The database refuses to guess.** One feed had no availability date. Falling back to the quarter-end date would have been exactly the lookahead the system exists to prevent, so those rows were rejected instead.

**An audit still found 44,752 rows dated too early.** They came from a feed using period end as a placeholder. They were redated from real SEC acceptance times, never moved earlier, and a constraint now blocks placeholders permanently.

**Restatements are kept separately.** In a ten-company test, the vendor's "as-reported" feed matched the restated value 0 times out of 441 restated periods. The original-filings table keeps what the market actually saw.

**Survivorship bias got in three times,** each time through an algorithm that starts from today. The worst was in my own loader, which took each company's SEC identifier from a vendor field that goes blank when a company dies, so 175 dead companies were quietly rejected. It now recovers the identifier from filings made while the company was trading.

## What broke

**The audit copy ate the disk.** Storing the vendor's JSON inside every row turned out to be 62% of the database. I verified the archive, dropped the database, and rebuilt it without the duplicate: 86 GB down to 32 GB, identical checksums.

**Vendors lie about pagination.** Some endpoints returned the same page forever. The crawler now stops on a duplicate page.

**"We got everything" was false.** An audit after the first pull found whole endpoints missing. Since then, every plan ends with an explicit list of what was not done.

## What's not in it yet

**Companies that died before about 2017.** The vendor never had them. Filling the gap needs an academic source like CRSP.

**Historical sector assignments.** Only today's sector exists, which would be lookahead. SIC codes from past SEC filings are the likely fix.

**Intraday prices and daily options history.** Stocks are daily, and options cover the window around each earnings report.
