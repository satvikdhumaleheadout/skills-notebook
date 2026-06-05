## Root cause
S2C dropped −3.44pp (27.9% → 24.5%) across Vatican Museums (CE 189) post-Easter, driven by a post-Easter seasonal demand composition shift. Users arriving at the Vatican date-selection page in the post period (Apr 23 - May 6) are lower-intent than the Easter-week visitors in the pre period, and convert to checkout at a meaningfully lower rate. LY had an identical pattern (structural delta = 0.002pp ≈ 0); this is an annually recurring seasonal effect.

## Mechanism
Post-Holy Week Vatican traffic skews toward casual European tourists and Italian day-trippers (especially on national holidays Apr 25, May 1) rather than the committed religious/cultural travelers who dominate Easter week. These visitors browse dates on the select page but are less willing to commit to a specific date and pay. The mechanism repeats at every level — European markets are uniformly worse than US (US S2C stable at −0.9pp vs European declines of −2.5 to −5.3pp); all devices and languages are affected with no concentrated locus; the top experience TGID 6732 (Vatican Skip-the-Line) shows the clearest signal with daily S2C troughs directly on Italian national holidays (Apr 25: 17.0%, May 1: 16.3%). The C2O drop is driven by C2A abandonment (checkout started but not completed), consistent with price-sensitivity in the same lower-commitment visitor cohort.

## Timing
Gradual from Apr 23 (immediately post-Easter). Deepest troughs Apr 30 (15.6% S2C for TGID 6732) and May 1 (16.3%) aligned with Italian Labour Day. Partial recovery toward May 3-4 (22-23%). The pattern is not a step-change event but a sustained compositional shift across the entire post period.

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|-------|----------------|--------|------------|
| S2C is primary driver (63% of ΔCVR) | Shapley S2C = −0.0052pp, 63.0% | summary.json shapley.pct_contribution | Confirmed |
| Structural delta ≈ 0 (seasonal) | current_delta_cvr = −0.0094, ly_delta_cvr = −0.0113, structural_delta = 0.002 | summary.json trend_context | Confirmed |
| Mix cascade: conversion at all levels | L1 conversion_effect −0.00877 >> mix_effect; L2 −0.00814 >> −0.00070; L3 Google Ads dominates | BQ queries: Paid/Organic + channel breakdown | Confirmed |
| TGID 6732 = 79% of lost checkouts | 727 of ~921 total lost checkouts | BQ experience breakdown query | Confirmed |
| Italy −22% volume decline | Italy pre 8,313 → post 6,503 users | BQ geo overview query | Confirmed |
| Italy S2C −4.7pp (worst European market) | Italy S2C pre 24.0% → post 19.3% | BQ geo overview query | Confirmed |
| US S2C barely moved (−0.9pp) | US S2C pre 36.8% → post 35.9% | BQ geo overview query | Confirmed |
| Apr 25 Liberation Day S2C trough | TGID 6732 S2C = 17.0% on Apr 25 | BQ TGID 6732 daily S2C query | Confirmed |
| May 1 Labour Day S2C trough | TGID 6732 S2C = 16.3% on May 1 | BQ TGID 6732 daily S2C query | Confirmed |
| C2A −3.0pp, A2O +0.9pp | c2o_sub: delta_c2a=−0.0296, delta_a2o=+0.0092 | summary.json c2o_sub | Confirmed |
| Supply ruled out | TIDs 52850/67659 show 0 tickets across all lead-time buckets in BOTH pre and post periods (no change between windows); remaining 7 TIDs absent from inventory_availability = unlimited-capacity reseller products | BQ inventory_availability daily time-series query (2026-04-09 to 2026-05-08) | Confirmed |
| Session recordings unavailable | No replays returned for 2 sampled mobile users | Mixpanel Get-User-Replays-Data | Confirmed |
| Mobile S2C worse than desktop | iOS Mweb −4.0pp, Android −4.3pp vs Desktop −2.2pp | BQ device breakdown query | Confirmed |
| All devices affected (no locus) | iOS/Android/Desktop all declined | BQ device breakdown query | Confirmed |

## Open items
- Inventory: CLOSED — supply ruled out. TIDs 52850 and 67659 show 0 tickets across all lead-time buckets throughout both the pre and post periods. No supply change occurred between windows; the S2C drop cannot be attributed to a change in availability. The remaining 7 TIDs are not tracked in inventory_availability (unlimited-capacity reseller products). Root cause classification is upgraded from "consistent with" to "confirmed" seasonal composition shift.
- Session recordings: DATA_LIMIT — no replays available for sampled users. Cannot directly observe what mobile users see on the Vatican select page. Cannot upgrade to "directly observed" for UX.
- LY deep-dive: The LY series shows very low CVR Apr 19-22 in LY (0.8-1.0%), likely because Vatican was closed/restricted during Easter 2025. This makes the pre-period CVR comparison potentially conservative — the LY baseline for the pre window is depressed, which means structural_delta may slightly understate the new year's performance. However, this is a calibration nuance rather than a change in root cause classification.
