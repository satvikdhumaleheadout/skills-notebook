# Findings — CE 6495 · Kualoa Ranch
Pre: 2026-03-05 – 2026-04-03 | Post: 2026-04-04 – 2026-05-03
Run: run5 (2026-05-08)

---

## Root Cause (one sentence)

Seasonal spring break wind-down: the US and Canadian high-intent travel cohort exited the post-period as schools returned, causing broad-based S2C decline across all three major Kualoa Ranch experiences — confirmed by geo cut, micro-funnel demand-exit signatures, and cross-TGID consistency; supply is ruled out as a primary cause.

---

## Mechanism (causal chain)

1. **Traffic composition shift:** Pre-period (Mar 5–Apr 3) captured peak US/Canada spring break. Post-period (Apr 4–May 3) began as schools returned. LP users fell −24.4% (22,506→17,012) alongside CVR decline — volume and quality both contracted.

2. **S2C primary driver (70.5% of ΔCVR):** Shapley decomposition assigns S2C −6.4pp the dominant share. LP→S and C→O are secondary.

3. **Mix cascade → MB · Paid · Google Ads:** Conversion effect dominates at all 3 cascade levels; mix shifts are negligible. The core segment driving the decline is MB Google Ads users.

4. **Geo confirmation:** US domestic (−6.73pp on 15,711 pre select users) and Canada (−10.56pp on 1,053 pre users) are the two declining markets. Both are primary spring break origin countries for Hawaii. South Korea (−2.4pp) held near-flat; Mexico improved (+5.0pp). Geographic pattern matches spring break departure hypothesis precisely.

5. **TGID locus:** Three TGIDs each exceed 10% of total lost_checkouts_delta:
   - 37536 UTV Raptor: 37% share (ΔS2C −5.2pp)
   - 37530 Movie Sites: 33% share (ΔS2C −8.7pp)
   - 37532 Jungle: 17% share (ΔS2C −10.0pp)

6. **Step 2c micro-funnel — demand-exit signatures confirmed (new in run5):**
   - **TGID 37536 (variant-card flow):** Drop concentrates at `pct_variant_clicked` (45.4%→38.2%, −7.2pp). Downstream steps (tour_selected, checkout) hold flat once users engage. Avg time on select increased (+1.4min) for engaging users. Pattern: post-period visitors browse but don't interact with cards — lower intent, not a product failure.
   - **TGID 37530 (direct calendar flow):** `pct_variant_clicked = 0%` in both periods (no card click UX). Drop at `pct_checkout_of_selected` (31.6%→24.1%, −7.5pp). Time on select fell −1.5min. Pattern: visitors select dates quickly, see price/summary, and abandon — price-checking without commitment.
   - **TGID 37532 (direct calendar flow):** Same architecture as 37530. Drop at `pct_checkout_of_selected` (26.5%→17.6%, −8.9pp) — largest single drop. Time on select fell −2.4min. Same pattern, amplified.

7. **Cross-TGID S2C consistency:** All three major TGIDs declined simultaneously. Supply-side causes (allotment cuts, TID issues) would typically affect one TGID and not others. Demand exit explains universal decline.

8. **Supply ruled out (primary):** All TIDs healthy in current snapshot. Daily time-series (Path A, post-period only): pipeline artifact zeros identified (simultaneous across all TGIDs Apr 16/23-24/26/29 — non-TGID-specific, disconfirmed as real). Progressive depletion disconfirmed for 37536 (3-7d declining trend reversed by 8-13d bucket recovery). TGID 37530 0-2d stepped down −46% from Apr 23 (real, TGID-specific) — but S2C decline began Apr 4, three weeks prior; compounding factor at most.

---

## Timing

**Gradual erosion.** CVR drifted down from Apr 4 onwards — no discrete event or step-change.

`structural_delta_cvr = −0.063` → CE is structurally weaker YoY in this calendar window.
`ly_delta_cvr = +0.042` → Last year's same window was improving (CE was new on Headout then).

Spring break typically runs late March to mid-April for the US/Canada markets. The Apr 4 post-period start aligns with the beginning of return-to-school for most US school districts.

---

## Evidence Inventory

| Claim | Evidence | Source |
|---|---|---|
| S2C is primary driver (70.5%) | Shapley δS2C = −0.0102 | summary.json |
| Conversion-dominant at all cascade levels | Conv_effect >> mix_effect at MB, Paid, Google Ads levels | BQ cascade query (L1) |
| US −6.73pp, Canada −10.56pp | Geo cut S2C by country | BQ geo query (run3/L2c) |
| Non-spring-break markets flat | South Korea −2.4pp, Mexico +5.0pp | BQ geo query |
| 37536 lost_checkouts_delta = 137.8 (37%) | TGID breakdown table | BQ L2c query |
| 37530 lost_checkouts_delta = 121.5 (33%) | TGID breakdown table | BQ L2c query |
| 37532 lost_checkouts_delta = 64.8 (17%) | TGID breakdown table | BQ L2c query |
| 37536 pct_variant_clicked 45.4%→38.2% (−7.2pp) | Step 2c micro-funnel BQ | BQ S2C query TGID 37536 |
| 37536 downstream steps flat | pct_checkout_of_selected −1.4pp (not significant) | BQ S2C query TGID 37536 |
| 37530 pct_variant_clicked = 0% (direct calendar flow) | Step 2c micro-funnel BQ | BQ S2C query TGID 37530 |
| 37530 pct_checkout_of_selected 31.6%→24.1% (−7.5pp) | Step 2c micro-funnel BQ | BQ S2C query TGID 37530 |
| 37532 pct_checkout_of_selected 26.5%→17.6% (−8.9pp) | Step 2c micro-funnel BQ | BQ S2C query TGID 37532 |
| 37530/37532 time on select fell (−1.5min / −2.4min) | avg_time_on_select_min step 2c | BQ S2C query |
| Pipeline artifact zeros simultaneous across TGIDs | Apr 16/23-24/26/29 zeros appear on all three TGIDs same day | BQ time-series (run3) |
| 37536 3-7d depletion disconfirmed | 8-13d bucket recovered (2,292→2,964) | BQ time-series (run3) |
| 37530 0-2d step-down real, TGID-specific | 1,130→607 tickets/day from Apr 23; 37536/37532 unaffected | BQ time-series (run3) |
| Error Viewed on 37536 select page | 3× Error Viewed in session 98a1e66d before variant card click | Mixpanel session recording (1 session) |

---

## Open Items

| Priority | Item | Owner | Action |
|---|---|---|---|
| P1 | **TGID 37536 "Error Viewed" on select page** | Product/Engineering | Check frontend error logs for `Error Viewed` events on TGID 37536 select page, post period. If event rate increased Apr 4–May 3 and correlates with `pct_variant_clicked` drop, upgrade confidence from "demand exit" to "partially UX-compounded." Single recording cannot generalize; error logs can. |
| P2 | **TGID 37530 0-2d allotment step-down** | Supply team | Investigate why Movie Sites 0-2d near-term availability fell ~46% from Apr 23. Was this intentional allotment management, a TID setting change, or an unintended reduction? Clarify before next peak season. |
| P3 | **Session recording coverage** | Analytics | 1/16 sampled users had available recordings (6.3%). Kualoa Ranch / book.tickets-hawaii.com is low-coverage for Mixpanel session recording. Consider whether recording sampling rate or CE scoping can be improved for future investigations. |
| P3 | **Seasonal baseline calibration** | Analytics | Confirm YoY CVR delta for same calendar window (Apr 4–May 3, 2025 vs 2026). `structural_delta_cvr = −0.063` indicates this window was weaker even vs last year — either last year's spring break was stronger, or CE added listing volume without proportional demand. Worth tracking annually. |
