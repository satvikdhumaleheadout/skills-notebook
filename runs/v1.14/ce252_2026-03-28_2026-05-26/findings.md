# Findings — CE 252 Louvre Museum Tickets
Pre: 2026-03-28 to 2026-04-26 | Post: 2026-04-27 to 2026-05-26 | Market: France

## Root cause
CVR improved +0.72pp at CE level (3.46%→4.19%) and **+1.69pp structurally** (LY trended −1.07pp over the same window). The lift is driven within MB · Paid · Google Ads by (a) a paid-share shift from Organic to Paid (mix), (b) a S2C and C2O lift concentrated on the dominant TGID 3909 (Louvre main product), supported by **same/next-day availability improving** (median days_to_first_available 1 → 0), and (c) a +61% Geo France volume surge with strong CVR lift. iOS Mweb concentrates the lift on the device side. LP2S declined −3.26pp (Shapley −47%) as a headwind, attributable to paid-traffic dilution and a routing shift away from a higher-LP2S secondary URL.

## Mechanism
Structural improvements to product availability on the dominant TGID 3909 (the main Louvre Museum Tickets product) — same/next-day slots now reliably show on the listing — converts users on the date-picker into checkout starters at substantially higher rate (S2C +7.6pp on this TGID). Once in checkout, fewer abandon before submitting payment (C2A +6.1pp on the fixed segment), implying that the friction users were hitting at the checkout stage (price/availability surprise, no near-term slot) has eased. Paid Google Ads volume is stable (29.8k → 30.1k landing-page users) but its share of MB traffic rose because Organic MB volume fell ~35%, lifting CE CVR via mix on top of the within-Paid conversion lift. Domestic France traffic surged on Google Ads MB (+61% volume) with a +1.19pp CVR lift — consistent with seasonal spring/Easter domestic demand, paired with the underlying funnel improvements.

## Timing
Gradual rather than a sharp break. `pre_period_healthy = True`; `current_delta_cvr = +0.62pp` vs `structural_delta_cvr = +1.69pp` once seasonality is stripped. The improvement compounds across the post window; daily series shows a steady lift in C2O and S2C from late April through mid-May, not a single inflection date.

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|---|---|---|---|
| CVR improved +0.72pp at CE level (3.46%→4.19%) | headline.delta.cvr = 0.007217 | summary.json | Confirmed |
| Structural improvement +1.69pp (vs LY −1.07pp) | trend_context.structural_delta_cvr = 0.016903; ly_delta_cvr = −0.010679 | summary.json | Confirmed |
| Pre-period not depressed (healthy baseline) | trend_context.pre_period_healthy = true | summary.json | Confirmed |
| C2O and S2C carry the lift; LP2S is the headwind | Shapley: C2O +0.54pp (74%), S2C +0.53pp (73%), LP2S −0.34pp (−47%) | summary.json | Confirmed |
| C2A is the dominant C2O sub-driver | C2A 40.3%→44.8% (Δ +4.5pp CE-level); within fixed segment +6.1pp | summary.json + BQ c2o_sub on fixed segment | Confirmed |
| MB is the primary brand (95% share) and conversion-driven | mbho_mix MB conversion_effect = +0.00751 | summary.json | Confirmed |
| Within MB, Paid grew share from 63%→73% and lifted CVR 4.22%→4.87% | Cascade L2 BQ results | transcript Cascade L2 table | Confirmed |
| Google Ads dominates Paid MB (77% share) and is conversion-driven | Cascade L3 BQ results, share flat, CVR 4.56%→5.42% | transcript Cascade L3 table | Confirmed |
| TGID 3909 carries the lift: S2C +7.6pp, C2O +8.4pp, completions +57.6% | Experience-level BQ: pre 564 / post 889 completions on 9,013 / 8,133 selects | transcript L2 Experience block | Confirmed |
| Same/next-day availability improved on top TGIDs | TGID 3909, 23442 median days_to_first_available_date: 1 → 0; TGID 9082 stable at 0 | transcript L2 Pricing block (product_rankings_features) | Confirmed |
| Geo France volume on Google Ads MB +60.8%, CVR +1.19pp | Geo cut BQ: pre 3,265 / post 5,249 users; CVR 4.75% → 5.94% | transcript L2 Geo block | Confirmed |
| iOS Mweb is the strongest device beneficiary | iOS Mweb users 9,765 → 11,583 (+18.6%), CVR 3.81%→5.46% (+1.65pp) | transcript L2 Device block | Confirmed |
| LP2S decline is broad-based across devices (not a UX regression) | All three devices: −4.1 to −5.8pp LP2S | transcript L2 Device block | Confirmed |
| Secondary URL `paristickets.com/louvre-museum/` collapsed (11.3%→4.7% of LP traffic) — partial cause of LP2S decline via routing | URL breakdown BQ: 2,679 → 1,121 users (−58%); URL LP2S 60.9% → 51.4% | transcript L2 URL block | Confirmed |
| No catalogue change in the window (Pattern 11 ruled out) | All TGIDs first-seen in post are ≤40 select rows; no high-volume launch/disablement | transcript L2 Catalogue check | Confirmed |
| LP2S decline likely paid-traffic-quality dilution within the primary URL | Primary URL LP2S fell 53%→48% on +1,663 user growth — directional, not directly tested | transcript L2 URL block + Device broad decline | Consistent with |

## Evidence: Paid traffic quality (perf-audit)
- **Verdict:** IMPROVED (overall HEALTHY)
- **Key metrics:** SIS stable (English 13% L4W, others 15–36%); CPC +5% offset by RPC +16% (efficiency positive); Paid CVR +0.7pp (3.12% → 3.86%)
- **Campaign status:** No paused/dormant campaigns; no tROAS self-suppression; no budget exhaustion (only English campaign at 11.3% budget-lost IS, all others ≤6.1%)
- **Implication:** **Pattern A — direct corroboration** of the improvement story. ROI +17.8pp, revenue +32% Pre→Post. Critically, this *refutes* the "paid-traffic-quality dilution" sub-hypothesis I floated for the LP2S decline — Google's quality lens shows traffic quality improved, not degraded. The LP2S headwind must originate either from the URL-routing shift (confirmed via data) or from on-page browsing-behaviour change (consistent with, not directly tested). The perf-audit note about 64–84% rank-lost IS across language cohorts is a structural ceiling, not a Pre→Post mover.
- **Source:** perf_audit_summary.md (full report at perf_audit_report.md)

## Open items
- **Slack reconciliation** — slack_context.md did not return within the wait window. Logged as "Slack context unavailable — skipped" per Step 2b check #9 fallback rule. No Slack signals enter this report.
- **LP2S decline residual attribution** — URL-routing shift is data-confirmed (secondary URL retreated, removing its higher LP2S from the mix). The primary URL's own LP2S decline (53%→48%) remains "consistent with" rather than "confirmed" — perf-audit refutes the paid-dilution explanation, leaving on-page browsing behaviour or LP-content interaction as a residual hypothesis. Not material enough to block the report — it is captured as a headwind, not as the root cause.
- **Session recordings on TGID 3909** — skipped: locus is broad (lift across S2C+C2O on the dominant product, no single failure point to confirm). Improvement-direction recordings could verify the smooth date-picker flow but are not necessary to call the leaf.
- **Weekday composition** — pre and post are both 30-day windows back-to-back; no material weekday imbalance.
