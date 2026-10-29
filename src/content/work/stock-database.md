---
title: Building a Point-in-Time Stock Database
meta: PERSONAL PROJECT · DATA ENGINEERING · POSTGRESQL, PYTHON, SQL, SEC EDGAR, OPRA
description: A permanent research archive of 1.9 million raw files and a 68 GB database built from them, covering 8,700+ U.S. stocks back to 1970, including companies that no longer exist. Every research project I run pulls from it.
---

## The purpose

Every research idea I have starts with the same question: what did the market actually know on that day? Answering it needs data that free sources don't give you. That means prices for companies that went bankrupt, financial statements stamped with the day they were filed rather than the day the quarter ended, and options chains from years ago.

I had one month of access to a professional data vendor. Instead of pulling data for one project, I used that month to build a permanent archive: **collect everything once, store it untouched, and never pay for or wait on it again.** The database on top of it is what my earnings research, factor models, and backtests all pull from.

The design came down to two rules:

**The raw files are the record. The database is just a view of them.** Downloads can't be repeated once the subscription ends, but parsing can be repeated forever. So the raw responses are never edited, and the database can be dropped and rebuilt from them at any time.

**Every number carries the date it became public.** Any research built on top of it can only see what was knowable at the time.

## The pipeline

[IMAGE: /images/stockdb-pipeline.svg | Pipeline diagram. Sources (FMP API, SEC EDGAR, Databento OPRA, FINRA and FRED, the XNYS calendar) feed a crawler with a resumable job queue, rate limiter, date windowing and pagination guards. The crawler writes to a raw archive of 1.9 million files, 28 GB, with a SHA-256 manifest and offsite backup. Loaders parse each file, stamp date_available, reject bad rows with a reason, and load into a dev database before promoting to production. The 68 GB Postgres database feeds research extracts: an earnings event spine, options snapshots per event, and a monthly factor panel. | Fig 1. From six sources to research-ready extracts. Each stage can be re-run without touching the one before it.]

## Ingestion

**I planned the crawl before running it.** Before any bulk download, I probed every endpoint on five test tickers. I measured how well each format compressed, where each one silently capped its results, and how far back each one actually reached. That produced a written crawl plan with every endpoint ranked by priority. Identity and prices came first, so a crawl that died halfway would still leave something usable.

**Per-symbol JSON beat bulk downloads.** The vendor's bulk CSV files looked like the efficient route. Measured, they were uncompressed, ignored filters, and got rate-limited after a handful of calls. Per-symbol JSON compressed to about 14% of its size, so the "slow" path was actually the cheap one.

**Price history had to be walked backwards.** The price endpoint returns at most 5,000 rows per request, and it doesn't say when it has cut you off. The crawler requests the most recent window, and if it comes back full, steps back to the day before the earliest row and asks again, filling any one- or two-day seams between windows. Johnson & Johnson took three full windows plus a three-row seam fill to reach 1970.

**The crawler is a resumable job queue.** Every request is a row in a Postgres queue, so a crash or reboot picks up exactly where it stopped without re-fetching anything. Each file's SHA-256 fingerprint is written to a manifest the moment it lands, not reconstructed at the end.

**It ran at 2,615 requests a minute with zero rate-limit errors.** The host machine was the ceiling, not the vendor.

| Crawl | Requests | Notes |
|---|---|---|
| Phase 1: identity, prices, fundamentals, earnings, ownership | 428,000 | 4.1 hours |
| Phase 2: transcripts, news, funds, alternative data | 248,000 | 2.2 hours |
| Phase 3: everything an endpoint audit found missing | 941,000 | ~12 hours |
| Final pull: dead companies, original filings | 116,250 | 0 failures |
| Gap pull: catch-up before the subscription ended | 143,108 | 64 minutes, 0 failures |

**The archive was verified, not assumed.** After Phase 3, a full check of every file against the manifest came back with 1.43 million matches, 0 missing, and 0 mismatches. It's backed up offsite with a verified hash.

**Then the vendor ended, but the database didn't.** New quarterly statements now come straight from SEC EDGAR, short data from FINRA, credit spreads from FRED, and the trading calendar from the exchange itself. The pipeline was built so any source can be swapped without touching the rest.

## Loading

**Loaders never trust a row.** Each one parses raw files, assigns the date the fact became public, checks it, and bulk-copies the survivors into Postgres. A row that fails a check is rejected with a written reason in an ingest log. Nothing disappears silently.

**Everything goes through dev first.** New data loads into a development database, the test suite and validation gates run against it, and only then is it promoted to production through the same loaders. A backup is taken before every promotion.

**Availability dates come from the real world, not the data.**

| Data | When it counts as public |
|---|---|
| Financial statements | SEC acceptance timestamp of the filing |
| Short interest | FINRA publication, 7 trading days after settlement |
| Daily short volume, credit spreads | Next trading session |
| Options open interest | Earliest publication before the snapshot time |
| Economic releases | Scheduled release time in Eastern time |

Database constraints reject any row whose availability date comes before the thing it measures.

## The schema

[IMAGE: /images/stockdb-schema.svg | Schema diagram of the stock database. A central security table links to company and symbol_history, and to groups of tables for prices, fundamentals, analysts, ownership, earnings, options, text, and alternative data. Options snapshots link to earnings events. A market schema holds index, ETF and macro data with no stock link, and an archive schema is walled off with no foreign key to security. | Fig 2. Everything hangs off one security table. Market data stands apart, and the archive is deliberately walled off.]

**Tickers are not identifiers.** Every stock gets a permanent ID in `security`, and its tickers live in `symbol_history` with start and end dates. Tickers get recycled, so a database constraint makes it impossible for two companies to hold the same ticker on the same day. When Facebook became Meta, it stayed one security.

**Delisted companies are first-class.** A stock that stopped trading keeps its full history. It just gets a last trade date.

**The archive is walled off on purpose.** Some vendor data only exists as today's value, like a current ratio or peer list. Using it historically would leak the future, so those tables have no link to `security` at all, and a test confirms there are zero connections.

## What's in it

| Area | Coverage | Size |
|---|---|---|
| Prices | Daily OHLCV, split- and dividend-adjusted, 1970 onward | 29M rows |
| Fundamentals | Quarterly and annual statements, dated by filing | 617k rows |
| Original filings | Figures as first filed, before restatement, from EDGAR | 1.78M rows |
| Earnings | Report dates, actual vs. expected EPS, 8-K announcement times | 461k events |
| Analysts | Estimates, rating changes, price targets, rating history | 17.9M rows |
| Insiders | Executive buys and sells | 8.1M rows |
| Institutions | 13F fund holdings, 2014 onward | 37M+ rows |
| Short selling | FINRA daily short volume and short interest | 77M rows |
| Options | OPRA chains around every earnings event | t−1, t, t+1 |
| Text | Earnings call transcripts, SEC filing index | 196k calls, 8.1M filings |
| Market-wide | 427 indexes, ETFs, 23 economic series, Treasury yields | S&P 500 since 1970 |

## Pulling from it for earnings research

My earnings projects never touch a vendor API. They pull everything from this database, and that's what made them testable.

**The event spine.** Each earnings report becomes one row: the stock, the report date, and the reaction from the close before the report to the close after it. Companies that later delisted stay in, exiting at their last real price. Every feature attached to an event is checked against a hard rule: its source data must have been public before the day before the report.

**Options around each event.** For every report, the database holds the option chain the day before, the day of, and the day after, with minute quotes from 3:50 to 4:00 PM. From those it computes what the options market was pricing in for the move. A missing quote is stored as missing with a reason, never as zero, which would quietly drag every average toward nothing.

**Research found database bugs, and the fixes went back into the database.** An earnings study turned up a stock whose adjusted price flipped between two different companies, producing a fake 2,700% return. Tracing it led to 446 securities with corrupted adjusted prices, which were repaired or flagged, along with new loader guards so it can't happen again. Open interest had a similar trap: for about a year, the feed republished it after the close with different values, and snapshots taken at 3:59 PM were using numbers from 5 PM. The loader now keeps only what was public at snapshot time, and the affected rows were repaired from the raw files.

## Point-in-time, enforced

**The database refuses to guess.** One feed had no availability date at all. Falling back to the quarter-end date would have been exactly the lookahead the system exists to prevent, so those rows were rejected instead.

**An audit still found 44,752 rows dated too early.** They came from a feed using period end as a placeholder. They were redated with real SEC acceptance times where available and a conservative lag where not, never moved earlier, and a constraint now blocks placeholders permanently.

**Restatements are kept separately.** In a ten-company test, the vendor's "as-reported" feed matched the restated value 0 times out of 441 restated periods. The original-filings table keeps the numbers the market actually saw.

**Survivorship bias got in three times,** and each time the same way: an algorithm that starts from today. The worst was in my own loader. It took each company's SEC identifier from the vendor profile, which goes blank when a company dies, so 175 dead companies were quietly rejected. It now recovers the identifier from filings made while the company was trading.

## What broke

**The provenance copy ate the disk.** Storing the vendor's JSON inside every row as an audit trail turned out to be 62% of the database. I verified the archive, dropped the database, and rebuilt it without the duplicate: 86 GB down to 32 GB, identical checksums.

**Vendors lie about pagination.** Some endpoints ignored the page number and returned the same page forever. The crawler now stops on a duplicate page.

**"We got everything" was false.** An audit after the first pull found whole endpoints missing. Since then, every plan ends with an explicit list of what was not done.

**Editing a running script corrupted it.** The rebuild resumed cleanly from the archive. Never edit a running script.

## What's not in it yet

**Companies that died before about 2017.** The vendor never had them. Filling the 2014–15 gap needs an academic source like CRSP.

**Historical sector assignments.** Only today's sector exists, which would be lookahead. SIC codes from past SEC filings are the likely fix.

**Intraday stock prices and daily options history.** Stocks are daily, and options cover the window around each earnings report rather than every day.
