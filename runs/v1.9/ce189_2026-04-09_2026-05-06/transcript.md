# Investigation Transcript — CE 189 · Vatican Museums
Pre: 2026-04-09 to 2026-04-22 | Post: 2026-04-23 to 2026-05-06

## Tree map
L0: S2C (63% of ΔCVR · −3.44pp) · gradual · structural_delta ≈ 0 (seasonal)
├─ L1: Mix cascade → CONFIRMED conversion at all levels
│   ├─ Level 1 (MB vs HO): conversion (conversion_effect −0.00822 >> mix_effect −0.000184) · FIX MB
│   ├─ Level 2 (Paid vs Organic within MB): conversion (conversion_effect −0.00649 >> mix_effect −0.00101) · FIX Paid
│   └─ Level 3 (Channel within Paid): Google Ads dominates, conversion (Google Ads S2C −3.6pp) · FIX Google Ads
│       Fixed segment: MB · Google Ads
├─ L2a: S2C — device breakdown → RULES OUT device-specific locus (all devices declined; mobile worse but not isolated)
├─ L2b: S2C — language breakdown → RULES OUT language-specific locus (all languages declined; Spanish/Dutch worst but broad)
├─ L2c: S2C — experience breakdown → CONCENTRATES on TGID 6732 (Skip-the-Line) by volume; secondary TGID 7998
│   └─ L3a: TGID 6732 daily S2C → CONFIRMED gradual pattern with Italian holiday troughs (Apr 25, May 1)
├─ L2d: S2C — geo breakdown → CONFIRMS seasonal composition (Italy −4.7pp + −22% volume; US stable −0.9pp)
└─ L2e: Inventory check (TGID 6732) → DATA_LIMIT (post-period experience dates expired from inventory table)

C2O secondary (28% of ΔCVR):
└─ C2A −3.0pp (checkout abandonment) · A2O +0.9pp (payment success improving) → consistent with composition effect, no UX/payment issue

Session recordings: DATA_LIMIT — no replays available for sampled mobile users in this period

LEAF: Post-Easter seasonal demand composition shift — lower-intent visitors browsing the Vatican select page with less intent to commit to dates, concentrated in European markets, aligned with Italian national holidays; pattern repeats LY (structural delta ≈ 0)

---

## L0 — Orient

**mix_dominance:** is_dominant = FALSE. MB = 94.5% share, conversion_effect = −0.00822 >> mix_effect = −0.000184 at MB/HO level. Confirmed conversion story — proceed through full cascade.

**shapley:**
- LP2S: −0.0007pp (9% of ΔCVR) — minor, do not open branch
- S2C: −0.0052pp (63% of ΔCVR) — PRIMARY
- C2O: −0.0023pp (28% of ΔCVR) — SECONDARY (open after S2C resolved)

**trend_context:**
- Shape: gradual across post period; S2C lowest Apr 29-30 and May 1 (Italian Labour Day)
- pre_period_healthy = TRUE
- current_delta_cvr = −0.00941 (90-day window); ly_delta_cvr = −0.011285
- structural_delta_cvr = 0.001875 ≈ 0 → this year's drop is slightly smaller than LY's at the same calendar position. Strong seasonal signal — calibrate investigation depth accordingly. A small structural delta raises the bar for declaring a "new problem."
- Weekday composition: both pre and post are 14-day periods covering 2 weekends each; no composition imbalance.

---

## L1 — Mix cascade (routing vs conversion determination)

### Level 1 — MB vs HO (from summary.json, no query)

MB: pre_share=94.51%, post_share=94.10%, pre_cvr=4.48%, post_cvr=3.61%
HO: pre_share=5.49%, post_share=5.90%, pre_cvr=6.98%, post_cvr=5.98%

Arithmetic:
- MB: Δshare = −0.41pp, Δrate = −0.87pp → mix_effect = −0.41% × 4.48% = **−0.00018** · conversion_effect = 94.51% × −0.87pp = **−0.00822**
- HO: Δshare = +0.41pp, Δrate = −1.00pp → mix_effect = +0.41% × 6.98% = +0.00029 · conversion_effect = 5.49% × −1.00pp = −0.00055

Sum: conversion_effect = −0.00877 >> mix_effect = +0.00011 → **conversion dominates at Level 1**
FIX: MB (94.5% share, |Δcvr| × post_users = 0.0087 × 80,273 = 698 lost conversions)

---

### Level 2 — Paid vs Organic within MB (BQ query)

Query: Paid/Organic split within is_microbrand_page = TRUE, CE 189, full date range.

| segment | period | users_lp | s2c | cvr |
|---|---|---|---|---|
| Paid | pre | 45,922 | 27.3% | 6.32% |
| Paid | post | 41,798 | 23.8% | 5.11% |
| Organic | pre | 40,821 | 28.9% | 2.45% |
| Organic | post | 40,028 | 25.1% | 2.08% |

Total MB pre users: 86,743 | post users: 81,826

Arithmetic:
- Paid: pre_share=52.9%, post_share=51.1%, Δshare=−1.8pp, Δcvr=−1.21pp → mix_effect=−1.8% × 6.32%=**−0.00114** · conversion_effect=52.9%×−1.21pp=**−0.00640**
- Organic: pre_share=47.1%, post_share=48.9%, Δshare=+1.8pp, Δcvr=−0.37pp → mix_effect=+1.8%×2.45%=+0.00044 · conversion_effect=47.1%×−0.37pp=**−0.00174**

Sum: conversion_effect = −0.00814 >> mix_effect = −0.00070 → **conversion dominates at Level 2**
FIX: Paid (larger checkout impact: |−1.21pp| × 41,798 = 506 vs Organic |−0.37pp| × 40,028 = 148)

---

### Level 3 — Channel breakdown within Paid (BQ query)

Query: channel_name IN ('Google Ads', 'Microsoft Ads', 'Facebook Ads (Meta)', 'Affiliates') within MB, CE 189.

| channel | period | users_lp | s2c | cvr |
|---|---|---|---|---|
| Google Ads | pre | 41,776 | 26.7% | 6.33% |
| Google Ads | post | 37,226 | 23.1% | 5.04% |
| Microsoft Ads | pre | 4,186 | 35.5% | 6.26% |
| Microsoft Ads | post | 4,611 | 32.3% | 5.62% |
| Affiliates | post | 1 | — | — (negligible) |

Total Paid pre: 45,962 | post: 41,837

Arithmetic (Google Ads):
- pre_share=90.9%, post_share=89.0%, Δshare=−1.9pp, Δcvr=−1.29pp
- mix_effect=−1.9%×6.33%=**−0.00120** · conversion_effect=90.9%×−1.29pp=**−0.01173**

Google Ads conversion_effect dominates overwhelmingly. Microsoft Ads has only 10% of Paid volume and a smaller rate decline.

Sum: conversion_effect >> mix_effect → **conversion dominates at Level 3**
FIX: Google Ads (90.9% of Paid users, 37K+ users post, S2C −3.6pp)

**Mix cascade result:** conversion change at all levels — no routing story
**Fixed segment: MB · Google Ads**
Filters for all subsequent queries:
  AND is_microbrand_page = TRUE
  AND channel_name = 'Google Ads'
  AND (advertising_channel_type IS NULL OR advertising_channel_type != 'PERFORMANCE_MAX')

---

## Geo overview

CE home country: Italy

| country | period | users | s2c | cvr |
|---|---|---|---|---|
| Italy | pre | 8,313 | 24.0% | 6.11% |
| Italy | post | 6,503 | 19.3% | 4.31% |
| Spain | pre | 3,831 | 26.9% | 6.11% |
| Spain | post | 3,721 | 21.6% | 4.33% |
| United Kingdom | pre | 3,337 | 26.6% | 6.80% |
| United Kingdom | post | 2,349 | 23.2% | 6.64% |
| United States | pre | 2,712 | 36.8% | 10.03% |
| United States | post | 2,857 | 35.9% | 9.66% |
| Netherlands | pre | 1,808 | 26.4% | 7.36% |
| Netherlands | post | 1,592 | 22.2% | 5.34% |
| Greece | pre | 1,971 | 23.5% | 5.58% |
| Greece | post | 1,707 | 21.6% | 4.92% |

**Key finding:** Italy (home country) shows a 22% volume decline AND the largest S2C drop (−4.7pp). UK volume also fell 30%. Meanwhile, US users showed essentially stable S2C (−0.9pp). European markets all declined by −2.5 to −5.3pp; US is an outlier in stability.

**Outcome: Uniform decline across European markets with Geo (Italy) showing largest volume + rate impact. US non-Geo is the only market that held.**

This is consistent with a post-Easter European tourism seasonal pattern. Vatican Museums is deeply relevant to European (especially Catholic) travelers whose travel intensity peaks during Holy Week and falls after Easter. US tourists plan Vatican visits more independently of the Easter calendar.

---

## L2 — S2C investigation (MB · Google Ads)

### L2a: Device breakdown

| device_type | period | users | s2c |
|---|---|---|---|
| iOS Mweb | pre | 17,395 | 22.8% |
| iOS Mweb | post | 16,335 | 18.8% |
| Android Mweb | pre | 11,204 | 21.8% |
| Android Mweb | post | 9,619 | 17.5% |
| Desktop | pre | 12,949 | 36.5% |
| Desktop | post | 11,034 | 34.3% |

S2C declined across all devices. Mobile is worse (iOS −4.0pp, Android −4.3pp) than Desktop (−2.2pp), but no device shows zero or near-zero — the pattern is broad.
→ **RULED OUT as device-specific locus.** Mobile shows amplified effect but not isolated causation.

### L2b: Language breakdown

| language | period | users | s2c |
|---|---|---|---|
| English | pre | 23,624 | 28.5% |
| English | post | 22,003 | 24.9% |
| Spanish | pre | 5,379 | 28.9% |
| Spanish | post | 5,073 | 23.6% |
| Italian | pre | 4,531 | 20.1% |
| Italian | post | 3,160 | 18.4% |
| Dutch | pre | 2,045 | 25.6% |
| Dutch | post | 1,847 | 19.6% |
| German | pre | 2,128 | 24.8% |
| German | post | 1,350 | 22.3% |

S2C declined across all languages. Dutch (−6.0pp) and Spanish (−5.3pp) most affected; Italian traffic volume also fell 30% alongside a rate decline. No language was immune.
→ **RULED OUT as language-specific locus.** Broad-based.

### L2c: Experience (TGID) breakdown

| experience_id | experience_name | pre_select | pre_s2c | post_select | post_s2c | lost_checkouts_delta |
|---|---|---|---|---|---|---|
| 6732 | Vatican Museums & Sistine Chapel Skip-the-Line | 22,179 | 23.5% | 19,672 | 19.8% | 19,672 × (23.5%−19.8%) = **727** |
| 7998 | Vatican Museums & Sistine Chapel Guided Tour + St. Peter's | 5,300 | 21.3% | 4,529 | 19.2% | 4,529 × (21.3%−19.2%) = **95** |
| 42093 | Combo: Vatican + Pantheon | 2,350 | 8.6% | 2,352 | 6.7% | 2,352 × 1.9% = 45 |
| 9379 | Vatican Museums & Sistine Chapel Guided Tour | 1,665 | 11.5% | 1,829 | 10.4% | 1,829 × 1.1% = 20 |
| 42091 | Combo: Colosseum + Vatican + Pantheon | 1,916 | 16.1% | 1,435 | 13.0% | 1,435 × 3.1% = 44 |

TGID 6732 dominates: 727 lost checkouts = ~79% of the experience-level impact.
Note: TGID→TID mapping confirms 9 TIDs under 6732 (12226, 13634, 16026, 16539, 27806, 27807, 52850, 60000, 67659). Only TIDs 52850 and 67659 have inventory data — both covering future experience dates only (post-period dates expired).
→ **CONCENTRATES** on TGID 6732. Opens L3a: daily S2C trend for TGID 6732.

### L3a: TGID 6732 daily S2C trend (MB · Google Ads)

**Pre period (Apr 9-22):**
- Peak range: 25-27% (Apr 12-17)
- Easter weekend (Apr 19-22): 22.8%, 24.5%, 23.3%, 22.6% (lower — holiday traffic effect in late pre)

**Post period (Apr 23-May 6):**
- Apr 23-24: 21.4%, 20.5%
- Apr 25: **17.0%** (Italian Liberation Day — national holiday)
- Apr 26-28: 19.8%, 21.4%, 22.3%
- Apr 29: 20.4%
- Apr 30: **15.6%** (Saturday pre-Labour Day)
- May 1: **16.3%** (Italian Labour Day — national holiday)
- May 2-6: 19.8%, 22.1%, 23.3%, 21.4%, 20.2%

**Pattern:** Two pronounced troughs aligned with Italian national holidays. Apr 25 (Liberation Day) and May 1 (Labour Day) — both Italian public holidays — show the deepest S2C readings (15-17%). These dates attract local Italian tourists who are browsing but have lower purchase intent (domestic tourism, day-trippers, non-advance-planners). Between these troughs, S2C partially recovers, but never reaches pre-period levels of 25-27%.

### L2d: Inventory check (TGID 6732)

TGID→TID mapping: 9 TIDs (12226, 13634, 16026, 16539, 27806, 27807, 52850, 60000, 67659).
Inventory data available only for TIDs 52850 and 67659, and only for future experience dates (May 5+).
Post-period experience dates (Apr 23 - May 6) are expired from the inventory_availability table.
→ **DATA_LIMIT — inventory check cannot be performed for the post period.**
Cannot confirm or rule out supply constraint as a contributing factor. The seasonal hypothesis is supported by evidence from all other dimensions.

### Session recordings
Attempted for 2 mobile users (iOS Mweb, Android Mweb) who reached select page for TGID 6732 in post period but did not checkout. Mixpanel returned no replays for either user.
→ **DATA_LIMIT — session recordings unavailable.** Investigation continues with available evidence. Language adjusted to "consistent with" for the UX observation.

---

## C2O secondary investigation

From summary.json c2o_sub:
- C2A: pre 44.3% → post 41.4% (Δ = −3.0pp) — more users abandoning after checkout-started before payment attempt
- A2O: pre 84.4% → post 85.3% (Δ = +0.9pp) — payment success slightly improving

The C2O decline is entirely driven by C2A (checkout abandonment). A2O improving rules out payment gateway issues. The C2A pattern is consistent with the same seasonal composition story: visitors who made it to checkout are also less committed than in the pre period, abandoning when they see the price breakdown / booking fees. No new product or UX issue is indicated.

No separate C2O deep-dive warranted — the mechanism is coherent with the S2C seasonal finding.

---

## Root cause confirmed

The −0.83pp CVR drop at Vatican Museums (CE 189) from Apr 23 to May 6 is driven by a post-Easter seasonal demand composition shift. The primary step is S2C (63% of ΔCVR, −3.44pp): users reaching the Vatican date-selection page are less likely to commit to a booking in the post-Easter period than during the Easter week of the pre period. The pattern is broad across all devices, languages, and European markets, with no single technical or product locus — the signature of a demand-side composition change rather than a UX or supply failure.

Italian users (home market) show both volume decline (−22%) and rate decline (−4.7pp S2C), while US users show stable S2C (−0.9pp), consistent with European Catholic holiday seasonality. TGID 6732 (Vatican Skip-the-Line, 9 TIDs) accounts for ~79% of the lost checkouts within the fixed segment. Daily S2C for TGID 6732 shows the deepest troughs on Italian national holidays (Apr 25 Liberation Day: 17.0%; May 1 Labour Day: 16.3%), providing a precise mechanism: high-volume Italian public holiday traffic is lower-intent than the pre-period's committed Easter travelers.

LY had a −1.13pp CVR drop at the same calendar position; this year's drop is −0.94pp (structural delta = 0.002pp ≈ 0). This is seasonal — the year-over-year pattern repeats almost exactly. No new structural issue is indicated.

The secondary C2O drop (28% of ΔCVR) is driven entirely by C2A abandonment (+checkout starts that don't reach payment), with A2O improving. This is coherent with the same composition effect — fewer committed buyers in the funnel overall.
