# Findings — CE 3593 Antelope Canyon

## Root cause
A Google Ads campaign serving the **kens-tours.antelope-canyon-tours.com** subdomain was paused or disabled on or around **May 7, 2026**, removing approximately 2,800 high-CVR (~11%) users from the second half of the post window. The CE-level CVR ratio looks flat (−0.08pp) only because the lost traffic was a high-converting slice — its removal pulls the average LP2S down while C2O on the rest of the catalogue independently improved, masking the volume loss. Order count fell −12.6% (1,941 → 1,696) and is structurally −0.77pp below where LY had this CE at the same calendar position. Mix is dominant per the L0 signal, and the cascade exited at Level 2 (Organic MB share collapsed via volume loss).

## Mechanism
kens-tours.antelope-canyon-tours.com is a high-CVR MB subdomain (10.9% pre, 10.8% post — rate stable) that received the bulk of its traffic from Google Ads (6,029 of 6,276 LP users pre period = 96%). Daily Google Ads delivery to that subdomain ran at 200–260 users/day from late March through May 6, then collapsed to 64 users on May 7, 11 on May 8, and effectively zero from May 9 onwards. Nothing in the funnel itself broke — the campaign simply stopped serving traffic. This is consistent with: campaign pause, budget exhaustion, ad-group disapproval, account-level policy action, or a deliberate Performance Marketing decision to redirect spend. The next step belongs to the Performance Marketing team with access to the Google Ads account.

## Timing
Sudden break on **May 7, 2026** — half-way through the post window. Daily Google Ads → kens-tours volume drops from 209 users on May 6 to 64 on May 7 (a −69% single-day drop) to 11 on May 8 and zero thereafter. This is not gradual erosion; it is a discrete event. CE-wide daily LP traffic within MB shows a softer step-down in the same window (post-May-7 daily LP averages ~800–900 vs ~1,000–1,200 in the pre period and early post).

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|---|---|---|---|
| CVR essentially flat (−0.08pp, 6.35% → 6.27%) | headline.pre.cvr=0.0635, headline.post.cvr=0.0627, delta=-0.000784 | summary.json | Confirmed |
| LP traffic −11.5% (30,553 → 27,030) | headline.delta.users_lp=−3,523 | summary.json | Confirmed |
| Orders −12.6% (1,941 → 1,696) | headline.pre.users_order_completed=1,941, post=1,696 | summary.json | Confirmed |
| Mix is dominant (L0 signal) | mix_dominance.is_dominant=true (mbho 1.043, channel 5.418) | summary.json | Confirmed |
| LY same calendar window grew +0.44pp; structural delta −0.77pp; pre_period_healthy=false | trend_context.ly_delta_cvr=0.00437, current_delta_cvr=−0.00334, structural_delta_cvr=−0.00771, pre_period_healthy=false | summary.json | Confirmed |
| Cascade exits at Level 2 — Organic MB share collapsed via volume | Organic MB −25.9% volume, mix_effect dominates net | BQ L2 cascade | Confirmed |
| kens-tours subdomain lost 2,699 LP users (−43%); CVR held at ~10.9% | URL breakdown: pre 6,276 (17.9% of MB) → post 3,577 (12.0%) | BQ URL breakdown | Confirmed |
| Google Ads delivered 96% of kens-tours pre traffic | kens-tours channel split: Google Ads 6,029 / 442 Other / 91 Microsoft / total 6,576 | BQ kens-tours channel breakdown | Confirmed |
| Google Ads → kens-tours volume dropped −46.6% (6,029 → 3,219), CVR held at ~11% | Same query | BQ kens-tours channel breakdown | Confirmed |
| Daily Google Ads → kens-tours collapsed on May 7, 2026 | Apr 25 – May 6 ran 177–257/day; May 7 = 64; May 8 = 11; May 9+ ≈ 0 | BQ daily kens-tours timeline | Confirmed |
| US (home market) volume −10.4%; per-US-user CVR flat | Geo overview: US 21,088 → 18,894 LP, CVR 6.75% → 6.80% | BQ geo within MB | Confirmed |
| Root domain antelope-canyon-tours.com held (18,295 → 17,981) | URL breakdown — only −1.7% volume change, CVR flat | BQ URL breakdown | Confirmed |
| Order shortfall is explained by kens-tours alone | 2,699 lost users × 10.9% pre CVR = 294 forgone orders. CE-wide order gap = 245; difference of ~50 absorbed by C2O improvement on remaining catalogue. | Arithmetic from BQ outputs | Confirmed |
| Headline Shapley signs offset (LP2S −0.38pp, C2O +0.36pp) | shapley.shapley.LP2S=−0.00383, S2C=−0.00060, C2O=+0.00364 | summary.json | Confirmed |
| C2O sub-step improvement is independent of kens-tours loss | Root domain post CVR +0.32pp, taadidiin-tours stable; C2A +2.1pp, A2O +1.2pp across CE | summary.json c2o_sub + URL breakdown | Confirmed |

## Open items
None unresolved by the available data. Two items the analyst flags but cannot test from BQ alone:
1. **Why** the kens-tours Google Ads campaign stopped on May 7 (budget, pause, disapproval, redirect) — requires Performance Marketing access to the Google Ads account.
2. Whether the kens-tours subdomain itself is still operational and indexed — quick browser check is enough; not a query.

Slack context not yet available; will reconcile if it returns before report finalisation.
