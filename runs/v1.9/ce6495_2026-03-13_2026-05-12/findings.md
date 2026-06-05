# Findings — CE 6495 · Kualoa Ranch
Pre: 2026-03-13 – 2026-04-12 | Post: 2026-04-13 – 2026-05-12

## Root cause
Near-term (0–2 day) inventory depletion of the UTV Raptor Tour (TID 80074, TGID 37536) — the highest-volume experience at Kualoa Ranch — drove S2C down across the entire CE. TID 80074 had zero near-term tickets on 28 of 30 post-period days; S2C at TGID level fell from 23.32% to 17.59% (−5.73pp), the single largest checkout impact by volume.

## Mechanism
The UTV Raptor Tour is Kualoa Ranch's anchor product. When users reach the select page and find the main Raptor Tour fully sold out near-term, a portion abandon rather than booking a different experience — creating broad S2C deterioration across other experiences (Movie Sites, Jungle Expedition, Ocean Voyage) even though those experiences have normal inventory. The Ride-Along variant (TID 80075) has near-term availability but is a different product offering. Jurassic Zipline (TGID 37531) is the inverse confirmation: supply improved (avg_days_to_first_available 4.0d → 0.1d) and S2C improved (+4.27pp) — the only experience where both moved together positively.

Separately, the All-Inclusive Package (37863) appears effectively closed in the post period — its unlimited-capacity TIDs show near-zero active slots and select volume collapsed from 793 to 64 users.

## Timing
Gradual erosion, worsening over at least 90 days. CVR was ~6–7% in February 2026; it has declined structurally to 3.75% in the post period (structural_delta_cvr = −4.94pp). The pre period itself was already below the preceding 60-day baseline (pre_period_healthy = false). The post period shows continued deterioration with S2C reaching as low as 14.21% on April 25. No single-day break event — this is a compounding supply capacity issue.

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|-------|----------------|--------|------------|
| S2C is the primary driver of CVR decline | Shapley S2C = 94% of ΔCVR (−10.79pp contribution) | summary.json → shapley.pct_contribution.S2C | Confirmed |
| CVR decline is structural, not seasonal | structural_delta_cvr = −4.94pp; LY had near-zero traffic | summary.json → trend_context | Confirmed |
| Pre period was already degraded | pre_period_healthy = false | summary.json → trend_context.pre_period_healthy | Confirmed |
| Drop is conversion-driven, not routing | Cascade: conversion_effect dominates at all 3 levels | Level 2: −1.20pp conv vs +0.14pp mix; Level 3: −1.28pp conv vs −0.17pp mix | Confirmed |
| Fixed segment: MB · Paid · Google Ads | Google Ads absolute checkout impact: 108 checkouts > Microsoft 35 | Cascade Level 3 BQ query | Confirmed |
| Drop is geographic uniform | Geo (US) ΔS2C = −6.29pp; Non-Geo ΔS2C = −6.32pp | Geo overview BQ query | Confirmed |
| Drop is not device-specific | Desktop −7.7pp, iOS −6.2pp, Android −1.3pp — all declined | Device BQ query | Confirmed |
| UTV Raptor is the highest-volume experience | 3,954 select users pre (next: Movie Sites 2,017) | Experience breakdown BQ query | Confirmed |
| UTV Raptor S2C dropped the most by checkout impact | −5.73pp × 2,132 post users = −122 fewer checkouts | Experience breakdown BQ query + arithmetic | Confirmed |
| TID 80074 had zero near-term tickets throughout post | post_median_0_2d = 0; zero on 28/30 post days in daily series | Inventory Path A median + daily time-series BQ query | Confirmed |
| TID 80075 (Ride-Along) had healthy near-term tickets | post_median_0_2d = 304 (range 156–484 in daily series) | Inventory daily time-series BQ query | Confirmed |
| Movie Sites, Jungle Expedition had normal inventory | post_median_0_2d = 955, 840 respectively | Inventory Path A median BQ query | Confirmed |
| Jurassic Zipline supply improved AND S2C improved | avg_days_to_first_available: 4.0d → 0.1d; S2C: +4.27pp | Price features BQ query + experience breakdown | Confirmed |
| Prices are unchanged | avg_final_price_usd = avg_original_price_usd, flat pre vs post for all experiences | product_rankings_features BQ query | Confirmed |
| All-Inclusive Package effectively closed | Select volume 793 → 64; unlimited-cap TIDs with 0–6 active slots | Experience breakdown + inventory BQ query | Confirmed |
| Session recordings unavailable | 4 distinct_ids attempted, all returned "no replays" | Mixpanel MCP | Data gap |

## Open items
All key claims are confirmed from named sources. The following are genuinely unresolvable without supply team engagement:

1. **Why TID 80074 is consistently depleted at 0-2d**: could be API cut-off period settings (minimum lead time), vendor throttling, or a deliberate booking window restriction by Kualoa Ranch. This requires Ops/BDM to check cut-off configuration directly with the SP.
2. **All-Inclusive Package status**: whether it was deliberately suspended, removed, or simply ran out of inventory permanently — needs confirmation from BDM.
3. **Session recordings unavailable**: cannot directly observe the empty-calendar experience on the select page for kualoa-ranch.tickets-hawaii.com. The inventory time-series and S2C-supply correlation provide strong indirect evidence.
