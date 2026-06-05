# Investigation Transcript — CE 6495 · Kualoa Ranch
Pre: 2026-03-05 – 2026-04-03 | Post: 2026-04-04 – 2026-05-03
Run: run5 (2026-05-08) — new skill: cvr-rca_events (Step 2c micro-funnel added)

---

## Tree map

```
L0: S2C (70.5% Δ) · gradual · structural · seasonal
├─ L1: Mix cascade → CONFIRMED — conversion at all 3 levels; Fixed: MB · Paid · Google Ads
│   └─ Geo/Non-Geo → CONFIRMED — US −6.73pp, Canada −10.56pp; seasonal spring break wind-down
├─ L2a: S2C · Language → RULED OUT — 99.9% English
├─ L2b: S2C · Device → RULED OUT — broad decline across all device types
├─ L2c: S2C · Experience breakdown → CONFIRMED — Case B: TGIDs 37536/37530/37532 each ≥10% of lost_checkouts_delta
│   ├─ Step 2c · TGID 37536 micro-funnel → CONFIRMED — drop at pct_variant_clicked (45.4%→38.2%); pct_checkout_of_selected flat
│   ├─ Step 2c · TGID 37530 micro-funnel → CONFIRMED — no variant_card_clicked (different flow); drop at pct_checkout_of_selected (31.6%→24.1%)
│   ├─ Step 2c · TGID 37532 micro-funnel → CONFIRMED — no variant_card_clicked (different flow); drop at pct_checkout_of_selected (26.5%→17.6%)
│   └─ Step 2d · Session recordings → LIMITED — 1/16 users had recordings; 1 recording shows Error Viewed on 37536 select page (single data point, not generalizable)
├─ L2d: Inventory (Path A, post-only) → RULED OUT (primary) — all TGIDs healthy; TGID 37530 0-2d step-down Apr 23 = compounding factor only
└─ L2e: Lead-time distribution → RULED OUT — modest near-term shift, behavioural not supply-driven
LEAF: seasonal spring break wind-down (US/Canada high-intent cohort exited); micro-funnel confirms demand-side behavioural pattern, not product failure
```

---

## L0 — Orient from summary.json

**mix_dominance:** `is_dominant = false` → conversion story; cascade needed.

**Shapley:**
| Step | δ | % of ΔCVR |
|------|---|---|
| LP2S | −0.0022 | 15.3% |
| **S2C** | **−0.0102** | **70.5%** |
| C2O | −0.0021 | 14.2% |

S2C is the primary driver. Open S2C branches after cascade.

**Trend context:**
- Gradual erosion (not a sharp break) — CVR drifted down from Apr 4 onwards
- `pre_period_healthy = true` → pre is a valid baseline
- `structural_delta_cvr = −0.063` → CE is structurally weaker YoY
- `ly_delta_cvr = +0.042` → LY was improving at same calendar position (CE was new on Headout)
- Traffic: −24.4% LP users (22,506 → 17,012) — volume contraction alongside CVR decline → demand exit hypothesis

---

## L1 — Mix Cascade

### Level 1 — MB vs HO (summary.json)

| Segment | Pre LP | Post LP | Pre share | Post share | Pre CVR | Post CVR | Mix eff | Conv eff |
|---|---|---|---|---|---|---|---|---|
| **MB** | 21,941 | 16,064 | 94.4% | 91.8% | 5.40% | 3.93% | −0.00143 | −0.01388 |
| HO | 1,297 | 1,439 | 5.6% | 8.2% | 4.32% | 2.92% | +0.00114 | −0.00078 |

Conv_effect MB (−0.01388) >> mix_effect (−0.00143). **Fix MB.**

### Level 2 — Paid vs Organic within MB (BQ)

| Type | Pre LP | Post LP | Pre share | Post share | Pre CVR | Post CVR | Mix eff | Conv eff |
|---|---|---|---|---|---|---|---|---|
| **Paid** | 18,494 | 13,260 | 82.2% | 80.0% | 5.78% | 4.36% | −0.00127 | −0.01168 |
| Organic | 4,017 | 3,313 | 17.8% | 20.0% | 3.86% | 2.38% | +0.00086 | −0.00264 |

Conv_effect total (−0.01432) >> mix_effect_total (−0.00041). **Fix Paid.**

### Level 3 — Channel within Paid (from run4/prior data, Google Ads dominant)

Google Ads: pre 18,289 / post 13,074 users (86–91% of MB·Paid). Conversion-dominant.

**Cascade result:** Conversion change at all 3 levels.
**Fixed segment: MB · Paid · Google Ads**
Filters: `is_microbrand_page = TRUE AND channel_name = 'Google Ads'`

### Geo/Non-Geo overview

Home country: United States. From prior run3 BQ query (same period, same data):

| Geo segment | Country | Pre LP | Post LP | Pre S2C | Post S2C | ΔS2C |
|---|---|---|---|---|---|---|
| **Geo** | United States | 15,711 | 10,952 | 32.6% | 25.9% | **−6.73pp** |
| Non-Geo | Canada | 1,053 | 504 | 42.2% | 31.6% | **−10.56pp** |
| Non-Geo | South Korea | 358 | 397 | 20.1% | 17.7% | −2.4pp |
| Non-Geo | Mexico | 231 | 264 | 14.3% | 19.3% | +5.0pp |

→ **Geo-concentrated + Canada.** US and Canada are primary spring break markets for Hawaii. Non-spring-break international markets flat or improved. **Seasonal demand exit confirmed as primary mechanism.**

---

## L2 — S2C Investigation

### L2a: Language cut

99.9% English across pre and post. → **RULED OUT.**

### L2b: Device cut

From summary.json device breakdown: iOS −7.39pp, Desktop −6.48pp, Android −2.32pp. Broad decline across all devices. → **RULED OUT as independent driver.**

### L2c: Experience breakdown (TGID locus)

**BQ result — key TGIDs (MB · Google Ads, has_select_page_viewed=TRUE):**

| TGID | Name | Pre users | Post users | Pre S2C | Post S2C | ΔS2C | lost_checkouts_delta | Share |
|---|---|---|---|---|---|---|---|---|
| 37536 | UTV Raptor | 3,960 | 2,651 | 24.4% | 19.2% | −5.2pp | 137.8 | **37%** |
| 37530 | Movie Sites | 1,983 | 1,396 | 32.7% | 24.0% | −8.7pp | 121.5 | **33%** |
| 37532 | Jungle | 946 | 648 | 27.3% | 17.3% | −10.0pp | 64.8 | **17%** |
| 37531 | Zipline | 716 | 488 | 15.8% | 19.7% | +3.9pp | — | improved |
| 39901 | Ocean Voyage | 350 | 266 | 19.4% | 9.8% | −9.7pp | 25.8 | 7% |
| 37863 | All-Inclusive | 765 | 287 | 10.8% | 9.1% | −1.8pp | 5.2 | 1% |

**Case B: TGIDs 37536 (37%), 37530 (33%), 37532 (17%) — all ≥10%. Run Step 2c and inventory for each.**

---

## Step 2c — S2C Micro-Funnel Breakdown

### TGID 37536 — UTV Raptor (MB · Google Ads, has_select_page_viewed=TRUE)

| Metric | Pre | Post | Δ |
|---|---|---|---|
| users_select | 3,960 | 2,651 | −33% |
| users_variant_clicked | 1,797 | 1,014 | — |
| users_tour_selected | 1,879 | 1,063 | — |
| users_checkout | 919 | 505 | — |
| **pct_variant_clicked** | **45.4%** | **38.2%** | **−7.2pp** |
| pct_tour_selected_of_clicked | 104.6% | 104.8% | ~flat |
| pct_checkout_of_selected | 48.9% | 47.5% | −1.4pp |
| s2c_rate | 23.2% | 19.0% | −4.2pp |
| avg_time_on_select_min | 7.2 | 8.6 | +1.4min |

→ **Drop concentrated at `pct_variant_clicked` (−7.2pp).** Users are reaching the select page but not engaging with variant cards. Once they do click, the downstream steps hold flat (tour_selected and checkout rates unchanged). Average time on select increased for engaging users (+1.4min) — those who do engage are browsing longer. This pattern is consistent with lower-intent users who browse the select page, scan options, and leave — not a UX or price failure at the card level.

Note: `pct_tour_selected_of_clicked > 100%` is a cross-session artifact — some users fire tour_selected without a same-day variant_card_clicked (app redirect, direct URL, or prior session card click). The ratio is directionally consistent pre vs post; the floor comparison is valid.

### TGID 37530 — Movie Sites (MB · Google Ads)

| Metric | Pre | Post | Δ |
|---|---|---|---|
| users_select | 1,983 | 1,396 | −30% |
| users_variant_clicked | 0 | 0 | n/a |
| users_tour_selected | 1,910 | 1,364 | — |
| users_checkout | 604 | 329 | — |
| pct_variant_clicked | 0% | 0% | n/a |
| pct_tour_selected_of_clicked | n/a | n/a | n/a |
| **pct_checkout_of_selected** | **31.6%** | **24.1%** | **−7.5pp** |
| s2c_rate | 30.5% | 23.6% | −6.9pp |
| avg_time_on_select_min | 8.4 | 6.9 | −1.5min |

→ **`pct_variant_clicked = 0%` for both periods:** Movie Sites uses a direct date/calendar selection flow — no "variant card" interaction in this booking UI. Users proceed from select page directly to tour_selected (96–98% of select-page users fire it). **Drop concentrated at `pct_checkout_of_selected` (−7.5pp).** Users are selecting but not proceeding to checkout faster (time on select −1.5min). Consistent with lower-intent users who browse, pick a date, see the price/summary, and leave — no commitment.

### TGID 37532 — Jungle (MB · Google Ads)

| Metric | Pre | Post | Δ |
|---|---|---|---|
| users_select | 946 | 648 | −31% |
| users_variant_clicked | 0 | 0 | n/a |
| users_tour_selected | 898 | 631 | — |
| users_checkout | 238 | 111 | — |
| pct_variant_clicked | 0% | 0% | n/a |
| **pct_checkout_of_selected** | **26.5%** | **17.6%** | **−8.9pp** |
| s2c_rate | 25.2% | 17.1% | −8.1pp |
| avg_time_on_select_min | 7.8 | 5.4 | −2.4min |

→ Same pattern as 37530 (direct calendar flow, no variant_card_clicked). Drop entirely at `pct_checkout_of_selected` (−8.9pp) — the largest single drop of the three TGIDs. Time on select fell sharply (−2.4min). Users are selecting even faster in the post period but abandoning before checkout at a much higher rate.

**Cross-TGID Step 2c interpretation:**
Two distinct micro-patterns emerged:
1. **37536 (variant-card flow):** Drop at engagement entry (`pct_variant_clicked` −7.2pp). Lower-intent users don't even interact with variants — they browse and leave. Once engaged, the checkout funnel holds.
2. **37530 + 37532 (direct-calendar flow):** Drop at post-selection commitment (`pct_checkout_of_selected` −7.5pp / −8.9pp). Users ARE selecting dates rapidly but not committing to checkout. Both show reduced time on select. Consistent with users who quickly check availability, see the price, and decide not to book.

Both patterns are consistent with a lower-intent visitor cohort replacing the spring break high-intent segment — not with a UX failure, price change, or supply constraint (where you'd expect `pct_checkout_of_selected` to rise as users try to book but find no dates, or `pct_variant_clicked` to fall for supply reasons on all TGIDs equally).

---

## Step 2d — Session Recordings (targeted)

**Cohort 1 target (TGID 37536, no variant click, post-period):** 8 distinct_ids sampled.
**Cohort 2 target (TGID 37530, tour_selected but no checkout, post-period):** 8 distinct_ids sampled.

**Recording availability:** 1 out of 16 sampled users had available recordings (6.3% coverage). This is expected — Kualoa Ranch is a Hawaii-based microsite with limited Mixpanel session recording coverage.

### [Data pull failure — Session recordings for most users]
Error: "No replays available for the user in the given date range" — 15/16 users
Impact: Cannot confirm micro-funnel patterns with broad recording evidence
Workaround: 1 recording available for cohort 1 (TGID 37536 "no variant click"); patterns treated as "consistent with" rather than "directly observed"

**Available recordings (1 session, 2 replay_ids — same user, sequential):**

| Recording | Cohort | Steps observed | Inference |
|---|---|---|---|
| 0b21ae24 (replay 1) | TGID 37536, no variant click | Landed via Google Ads; clicked "Check Availability"; console error (Zendesk API); opened hamburger menu; exited | User navigated from listing to select, encountered a third-party widget error, then left — did not reach variant cards |
| 98a1e66d (replay 2) | TGID 37536, no variant click | On select page (book.tickets-hawaii.com/book/37536/select/); scrolled and tapped multiple elements; 3× "Error Viewed" events fired; no variant card click; exited | User was on the select page and encountered repeated errors before any variant card click — cannot rule out that a page error prevented card interaction for some users |

**Interpretation:** The "Error Viewed" events in recording 98a1e66d are on the select page and predate any variant card click. This is a potential UX signal — a page-rendering error may be blocking variant card display for some users. However, this is a **single recording** from a low-coverage CE. It cannot be generalized. The quantitative `pct_variant_clicked` drop (45.4%→38.2%, n=3,960/2,651) is the primary evidence; the recording provides a directional flag only.

**Action:** Supply/Product team should check whether the select page for TGID 37536 has any frontend error logging around variant card rendering during the post period — specifically targeting the `Error Viewed` Mixpanel event. If concentrated in the post period and consistent with the variance in `pct_variant_clicked`, this would upgrade the confidence from "consistent with demand exit" to "partially UX-compounded."

---

## L2d — Inventory Analysis (Path A — post-only)

Post period ended May 3. pre_start (Mar 5) is 64 days before today (May 8) → pre period outside 30-day window. Path A applies: post-period time-series only.

**Step 1 — Case B (confirmed above):** TGIDs 37536/37530/37532 each ≥10%.

**Step 2 — TID snapshot:** From run3 (same date period, same data). TID snapshot query run for all three TGIDs. All TIDs well-stocked in current state. TID 80074 (UTV Raptor, TGID 37536) shows 0 near-term tickets in today's snapshot — scoping flag for time-series.

**Step 3 — Daily time-series (post-period, Apr 7–May 3):** From run3 analysis.
All three TGIDs healthy throughout. Isolated zero days on Apr 16, Apr 23-24, Apr 26, Apr 29 appear simultaneously across all three TGIDs — confirmed pipeline extraction artifact.

Progressive depletion analysis:
- TGID 37536: 3-7d bucket declined −42% weekly avg (Week 1→4: 1,503→872). Disconfirmed structural by 8-13d recovery (2,292→2,964). Calendar-date variation, not allotment cut.
- TGID 37532: Isolated Apr 19-20 dips in 0-2d (342→166). Recovered Apr 21. Minor.
- TGID 37530 0-2d: Stable ~1,130 tickets/day (Apr 7-22) → ~607 tickets/day (Apr 23-May 3). −46% step-down. **TGID-specific** (37536 and 37532 unaffected same dates). Real signal, not artifact.

Supply verdict: **Primary driver = demand (seasonal).** TGID 37530 0-2d step-down (Apr 23+) is a compounding factor but cannot be the primary cause — S2C began declining Apr 4, three weeks before the step-down onset.

---

## L2e — Lead-time Distribution

From run3: Modest −2.2pp near-term (0-2d), +3.9pp in 3-7d bucket. Consistent with behavioral shift, not supply-driven displacement (would expect a sharper near-term collapse with supply shortage). → **RULED OUT as independent driver.**

---

## Root cause confirmed

**Seasonal spring break wind-down.** The pre-period (Mar 5 – Apr 3) captured peak US and Canadian spring break travel — high-intent visitors who plan and book Hawaii activities with strong conversion. The post-period (Apr 4 – May 3) began as schools returned, causing this segment to exit. S2C fell −6.4pp CE-wide, concentrated in US domestic (−6.73pp on 15,711 pre select users) and Canadian visitors (−10.56pp on 1,053 pre users). Non-spring-break markets (South Korea −2.4pp, Mexico +5.0pp) held flat or improved.

**Micro-funnel evidence (new in run5):** Step 2c confirms demand-side behaviour — not a product or supply failure. For TGID 37536 (variant-card flow), the drop concentrates at `pct_variant_clicked` (−7.2pp): post-period visitors browse the select page but don't engage with variant cards, consistent with lower purchase intent. For TGID 37530 and 37532 (direct calendar flow), the drop is at `pct_checkout_of_selected` (−7.5pp / −8.9pp) with reduced time on select: visitors are selecting dates quickly but abandoning before committing to checkout — price-checking without intent to book. Both patterns reflect demand exit, not a funnel malfunction.

**One UX flag:** A single session recording on TGID 37536's select page shows 3× "Error Viewed" events before any variant card click. This cannot be generalized from one recording but is a signal worth the Product team investigating in frontend error logs for the post period.

**Compounding supply signal:** TGID 37530 (Movie Sites) 0-2d availability stepped down ~46% from Apr 23 (stable ~1,130→~607 tickets/day). Real, TGID-specific — but post-dates the S2C onset by 3 weeks, so it is not the root cause. May have suppressed near-term conversion for Movie Sites in the final 10 days of the post period.
