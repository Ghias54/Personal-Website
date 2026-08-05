# Testing Whether Earnings Volatility Can Be Traded

Slug: /work/earnings-factor-model
Meta line: PERSONAL PROJECT · QUANTITATIVE RESEARCH · PYTHON, PANDAS, STREAMLIT, LINUX

Final copy. Use exactly as written — do not rewrite or paraphrase. Bold lead-ins are load-bearing; preserve them. Do not soften the negative result.

## The question

Stock prices move sharply when a company reports earnings. That is well known. The question I wanted to answer is whether those moves can be traded systematically, and more specifically whether being selective about which companies you trade around earnings actually helps.

Anyone can buy every stock before it reports. The interesting question is whether filtering those trades by the quality of the company improves the outcome, or whether it just feels like it does.

I built a full research pipeline to find out, and then I hosted it so I could keep testing new versions of the strategy.

## How it works

**The system pulls its own data.** It connects to a financial data provider and ingests company profiles, earnings dates, historical prices, stock splits, share counts, analyst estimates, financial statements, and insider trading activity. Each of these lives in its own module so a change in one data source doesn't break everything else.

**Every earnings event gets scored across six factors.** Valuation, growth, profitability, momentum, analyst revisions, and insider activity. Each factor is scored on a common scale by ranking a company against everyone else rather than against a fixed threshold, then the six are blended into one composite score. That way a score means the same thing in 2015 as it does in 2024.

**The scores only use information that existed at the time.** This is the part that quietly ruins most backtests. If you score a company using financial statements that were not published until after the earnings date, your strategy looks brilliant and is completely fake. I used point in time joins so every score reflects only what was actually knowable on the day of the trade.

**The backtest simulates a real portfolio, not a spreadsheet average.** It holds a limited number of positions at once, enters and exits on configurable windows around the earnings date, applies transaction costs on every round trip, and supports stop losses. Capital is finite, so a trade you take is a trade you cannot take somewhere else.

[IMAGE: dashboard screenshot showing equity curve | Fig 1 — the dashboard, showing the equity curve for a full run]

## What I found

**The strategy loses money.** Across 58,710 simulated trades the portfolio ended down 70.85%, with a maximum drawdown of 85.13%.

**It loses money despite winning almost half the time.** The win rate was 48.45%, which is close to a coin flip. The losses were simply bigger than the wins, and transaction costs on tens of thousands of trades did the rest.

**That is the actual finding, and I kept it.** The easy move here is to tune parameters until the equity curve points up and put that on a website. But a strategy that only looks good after you have hunted for the settings that make it look good is not a result, it is a fit to noise. Trading earnings volatility with these factors does not work, and knowing that with this much rigor behind it is worth more than a fake number.

**The infrastructure is the reusable part.** The ingestion, scoring, point in time discipline, and portfolio simulation are all independent of this particular strategy. A different hypothesis can be tested by swapping the factors and rerunning.

## Running it

I built an interactive dashboard that exposes every strategy parameter, entry and exit windows, factor filters, position limits, transaction costs, and stop losses, and recomputes the whole backtest live. It renders the equity curve, the drawdown, the distribution of trades, and the summary numbers on each run.

[IMAGE: dashboard controls or trade distribution chart | Fig 2 — strategy parameters are adjustable and rerun live]

It runs on a Linux server I set up and maintain, kept alive as a background service so it stays up on its own, and reachable over a private network rather than exposed to the internet. Link available on request.

**I also had to make it fast.** The original simulation scanned the full dataset once per ticker and once per date, which made the dashboard unusable for live parameter changes. I restructured those lookups and replaced the row by row loop with a faster iteration method. Before committing it, I verified the optimized version produced numerically identical results to the original across every configuration, since a performance fix that silently changes your numbers is worse than a slow backtest.

## What I would do differently

The biggest limitation is that the factor scores are static. They rank a company against its peers at a moment in time but say nothing about whether the market has already priced that in, which is probably why the composite has no predictive power here. A version that measured surprise, meaning the gap between what was expected and what was reported, would be a more honest test of the underlying idea.

I am currently rebuilding the system to make the strategy logic modular, so new hypotheses can be tested without rewriting the pipeline each time.
