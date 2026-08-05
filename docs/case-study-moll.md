# Finding the Real Capacity of a Die-Cutting Machine

Slug: /projects/die-cutter-capacity
Meta line: TRULY ENGAGING · OPERATIONAL ANALYSIS · EXCEL, POWER BI

Final copy. Use exactly as written — do not rewrite or paraphrase. Bold lead-ins are load-bearing; preserve them.

## The question

Truly Engaging cuts customized paper products out of large sheets using two big die-cutting machines. Management wanted one number: how much can these machines actually produce in a day?

The company assumed about 1,200 sheets per hour. That number never matched what the floor was putting out, and nobody could explain the gap. An outside vendor had installed sensors on both machines, but the reports they sent back only showed basic uptime and event counts. They did not answer the capacity question.

I was brought onto the project by the CFO and COO to answer it using the raw data those sensors collected. I had also run these machines myself for hundreds of hours through busy season, which turned out to matter more than the data did.

[IMAGE: whiteboard planning photo | Fig 1 — scoping the questions with the operations team]

## The problem with the data

The raw data was a long log of everything the machines did, timestamped, with a file name attached to each job.

[IMAGE: raw data screenshot | Fig 2 — the event log as it came from the vendor's system]

**The job names were a mess.** The company sold about 30 products, but each one had several different names depending on which sales channel the order came from. A round cornered wedding invitation might show up as DCLD, INVED, or four other codes. The code could also appear at the front or the back of the file name. I built a lookup system in Excel that pulled the code out of either position and mapped every alias back to one of 30 real product groups.

**Operators skipped entries.** Operators were supposed to log when they changed a job over, loaded the machine, or stopped for a break. They often didn't. That left large blocks of unexplained time. Any analysis that trusted the log as complete would make the machines look better than they were.

**Most of the meaning was not written down anywhere.** Jobs starting with GF or GM were samples, sometimes only one or two sheets, but they looked like full production runs in the data. Sticker jobs ran on completely different material and behaved differently. A stray job code in the middle of a run usually meant a setup sheet. I learned all of this from working on the floor and talking to operators.

## What I found

**Only about 14% of available machine time was spent actually cutting product.** The rest went to changeovers, setup, loading, and idle time.

**The 1,200 sheets per hour standard was real, but almost never reached.** The machines rarely ran long enough in one stretch to get there. Capacity was not limited by how fast the machine could cut. It was limited by how often it had to stop.

**Machine 2 was buried in changeovers.** It kept getting the short, high variety jobs, so it spent most of its day being reset instead of running.

**Machine 1's 41% "No Read" rate was not a broken scanner.** Everyone assumed it was. When I grouped those failures by job type, almost all of them landed on sticker jobs, where the material was different enough that the scan didn't register. The scanner was fine. The job mix explained it.

[IMAGE: chart showing time breakdown or No Read by job type | Fig 3 — where the machine time actually went]

## What changed

**Every job change meant swapping two things: the cutting plate and the hooks.** The plate is specific to the product being cut. The hooks separate the finished product from the waste, and different jobs need different numbers of hooks in different positions. Doing both takes real time, and it happened constantly.

**The carts were reorganized around setup, not around order.** Jobs used to be staged in whatever sequence they came in. I grouped the 30 product types into carts based on which ones share a plate or a hook configuration, so that consecutive jobs need as little reconfiguration as possible. Running five jobs off the same cart went from five full changeovers to one setup and four small adjustments.

**Job families were rerouted between the two machines.** Instead of both machines taking whatever came next, specific product groups were assigned to specific machines. That kept the short, high variety work from stacking up on one machine and let the other one hold long runs without interruption.

**Small jobs were pulled off these machines entirely.** Some product groups came through in runs of only a few sheets, and a die cutter that takes a full changeover to set up should not be spending that setup on a two sheet job. Those groups were sent to other equipment that could handle them without a plate swap, which freed both die cutters to stay on the long runs they were actually built for.

**The result on the floor was substantial.** I worked these machines before and after the change, through the busiest part of the year, and actual run time went up significantly. I would estimate at least 30%, though that is my judgment as an operator and not a measured figure. I did not have access to clean before and after data.

## What I would do differently

The weakest part of this analysis was that changeover time had to be inferred from gaps in the operator log, and those logs were incomplete. Rather than ask operators to be more diligent, which never works, I would fix the collection itself. The machine already knows when it stops and starts. Tying the changeover window to that signal, and having the operator confirm a job code on restart instead of remembering to log a start and an end, would capture changeover time automatically and without adding work at the machine.

That is also the number that would have let me prove the result instead of describing it.
