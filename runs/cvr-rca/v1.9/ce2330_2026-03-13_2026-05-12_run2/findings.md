## Root cause

CVR fell from 1.04% to 0.69% (−34%) for Walt Disney World Orlando (CE 2330). The primary cause is a
seasonal demand shift: the pre window captures US spring break peak at WDW, while the post window is
off-season. A secondary, distinct issue is elevated order failure rates (A2O) for Magic Kingdom 1-Day
Ticket (experience 36344) throughout the post period. The mechanism behind the A2O failure is a data gap —
gateway, fraud, and WDW API sub-branches require order_attempted_events_v2 (parked in SKILL.md backlogs).

## Mechanism

**Seasonal (primary):** Spring break visitors (mid-March through mid-April) are highly committed buyers —
they have already booked hotels, flights, and park reservations. They reach the funnel with clear intent.
Post-spring-break visitors are earlier in the planning cycle or casual browsers. Within the fixed segment
(MB · Google Ads): LP2S fell from 44.09% to 42.46% (−1.63pp, −3.7% relative) and S2C fell from 24.60%
to 22.39% (−2.21pp, −9.0% relative), confirming both funnel steps declined within the fixed segment
consistent with the seasonal story. At CE level: LP traffic fell 12.5%, S2C fell 2.7pp, and C2A fell
3.2pp (checkout abandonment). Inventory is unlimited capacity (9,999 per date, zero sold-out dates),
confirming no supply-side explanation for S2C.

**Magic Kingdom A2O degradation (secondary):** Magic Kingdom 1-Day Ticket (36344) shows A2O declining
from ~65% pre to ~45% post (−15.8pp for experience 36344), representing ~17 orders lost in the Google
Ads segment in the post period. Other WDW experiences (Park Hopper, 2-Day) did NOT show this pattern —
their A2O improved or held. Since inventory is unlimited, the failures are not live slot sellouts.
The mechanism is a DATA GAP: sub-hypotheses (WDW fulfillment API, fraud over-blocking, payment gateway)
cannot be confirmed or ruled out without order_attempted_events_v2 (failure_reason, payment_gateway,
fraud_evaluation_result_origin for TGIDs 76930/76934/76935, Apr 13–May 12). Android Mweb additionally
shows an A2O drop (74.6%→54.5%), directionally consistent with the MK 36344 finding.

## Timing

**Seasonal:** Gradual — aligned with the end of spring break (mid-April). No single break date;
the funnel metrics deteriorate progressively as spring break ends.

**MK A2O:** Sustained from Apr 13 onward. Alternating weeks (Apr 20: 38%, Apr 27: 60%, May 04: 40%)
suggest intermittent or date-dependent fulfillment issue, not a constant failure.

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|-------|----------------|--------|------------|
| CVR fell 34% pre→post | pre 1.04% → post 0.69% | summary.json headline.cvr | Confirmed |
| C2O is primary Shapley driver (58.8%) | C2O Shapley = −0.002071pp | summary.json shapley | Confirmed |
| Spring break = pre window context | Pre: Mar 13–Apr 12, Post: Apr 13–May 12 | date windows | Confirmed |
| LP traffic fell 12.5% | 38,450 → 33,661 users | summary.json headline.users_lp | Confirmed |
| LP2S within fixed segment: −1.63pp | 44.09%→42.46% (MB Google Ads) | BQ fixed-segment query (run2) | Confirmed |
| S2C within fixed segment: −2.21pp | 24.60%→22.39% (MB Google Ads) | BQ fixed-segment query (run2) | Confirmed |
| S2C at CE level fell 2.7pp | pre=25.5% → post=22.8% | summary.json headline.s2c | Confirmed |
| C2A fell 3.2pp | pre=19.2% → post=16.0% | summary.json c2o_sub.c2a | Confirmed |
| A2O fell 3.2pp at CE level | pre=54.1% → post=50.9% | summary.json c2o_sub.a2o | Confirmed |
| Inventory: unlimited capacity, 0 sold-out | 9,999 remaining per date, all buckets | BQ inventory query (tgid_tours) | Confirmed |
| Mix cascade: pure conversion at all 3 levels | mix_effect ≈ 0 at L2+L3; conv_effect dominant | BQ cascade queries | Confirmed |
| Geo-concentrated: US domestic is primary segment | US CVR 1.82%→1.12%, UK improved | BQ geo query | Confirmed |
| MK 36344 is dominant checkout experience | 860 pre → 659 post checkouts (MB Google Ads) | BQ experience-level query | Confirmed |
| MK 36344 A2O: 63.9%→48.1% (−15.8pp) | 101/158 pre → 52/108 post completions/attempts | BQ experience-level query | Confirmed |
| MK 36344 A2O weekly: consistently lower in post | Pre avg ~65%, post weeks 38–60% | BQ weekly MK query | Confirmed |
| Other WDW experiences (36251, 36252) A2O: improved or stable | Park Hopper c2o improved, 2-Day A2O improved | BQ weekly TGID query | Confirmed |
| Android Mweb A2O crash: 74.6%→54.5% | 304→194 checkouts, A2O crashes | BQ device query | Confirmed |
| Microsoft Ads A2O crash: 53%→28% | 83→43 attempts, 44→12 completions | BQ channel query | Consistent with (small n=43) |
| MK A2O: ~17 Google Ads orders lost | 108 post attempts × (63.9%−48.1%) = 17.1 | BQ experience query + arithmetic | Confirmed |
| MK A2O mechanism: gateway/fraud/WDW API | Cannot test without order_attempted_events_v2 | SKILL.md backlogs | DATA GAP |
| Session recordings: not available | No recordings found for 5 sampled failed-order users | Mixpanel MCP | Data gap |

## CPA bid adjustment arithmetic (c025 check 4)

Seasonal component of CVR decline (LP2S + S2C Shapley):
- Shapley LP2S = 14.4% of ΔCVR | Shapley S2C = 26.8% of ΔCVR → combined = 41.2%
- ΔCVR relative = (0.69% − 1.04%) / 1.04% = −33.7%
- Seasonal bid-relevant decline = 41.2% × −33.7% ≈ −13.9% relative (round to ~14%)

Interpretation: A CPA bid reduction of ~14% covers the seasonal LP2S+S2C component.
The A2O operational failure (MK 36344) is being addressed by engineering (P1 action card).
After the P1 fix is deployed, actual CVR will recover partially; reassess bids at that time.

Note: C2A decline (3.2pp) is also seasonal (behavioral intent), but Shapley for C2A is embedded
in C2O's 58.8% share alongside the operational A2O failure — splitting the two requires additional
decomposition beyond what's needed here. Conservative bid adjustment = 14% (LP2S+S2C only).

## Open items

- **MK A2O mechanism (DATA GAP):** Cannot confirm gateway, fraud, or WDW API failure without
  order_attempted_events_v2. DRI: Ops/Engineering should query failure_reason, payment_gateway,
  fraud_evaluation_result_origin for TGIDs 76930/76934/76935, Apr 13–May 12, and test:
  Sub-hypothesis A: disproportionate 'inventory_unavailable' → WDW API returning unavailable
  Sub-hypothesis B: elevated fraud_evaluation_result_origin = 'fraud_check' → fraud over-blocking
  Sub-hypothesis C: specific payment_gateway with elevated failures → gateway degradation
- **Microsoft Ads A2O crash (53%→28%):** n=43 attempts — statistically uncertain. Directional
  signal only. Present in report as sub-bullet in P1 card per c022 evidence threshold.
- **Cross-cut Android × experience:** Android Mweb and MK 36344 are two co-directional findings.
  Whether they represent the same users was not confirmed (cross-cut not run). Logged as gap.
- **Session recordings:** No recordings available in MB context. Data gap logged.
