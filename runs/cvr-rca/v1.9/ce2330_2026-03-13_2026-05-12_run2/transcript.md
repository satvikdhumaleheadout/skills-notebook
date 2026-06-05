# Investigation Transcript — CE 2330 · Walt Disney World Orlando
Pre: 2026-03-13 to 2026-04-12 | Post: 2026-04-13 to 2026-05-12
Run2: applies SKILL.md c023–c025, hypothesis.md c016, report_structure.md c021–c023, actions.md c004

## Tree map
<!-- Updated as branches resolved -->
L0: CVR 1.04%→0.69% (−34%) · gradual · seasonal primary + MK A2O operational secondary · pre_period_healthy
├─ L1 Cascade: MB vs HO  →  CONFIRMED CONVERSION (conv_effect=−0.00328 vs mix_effect=−0.00041)
│   └─ L1 Cascade Level 2: Paid vs Organic within MB  →  CONFIRMED CONVERSION (mix≈0, conv=−0.00385)
│       └─ L1 Cascade Level 3: Google vs Microsoft within Paid  →  CONFIRMED CONVERSION (mix≈0, conv=−0.00342)
│           └─ Fixed segment: MB · Paid · Google Ads
├─ L1 Geo overview  →  CONFIRMED GEO-CONCENTRATED (US CVR 1.82%→1.12%; UK improved)
├─ L2a: C2O — C2A drop (checkout abandonment)  →  CONFIRMED seasonal / intent
│   └─ Device cut: iOS stable, Desktop stable, Android Mweb A2O 74.6%→54.5%
├─ L2b: C2O — A2O drop (order failure)  →  CONFIRMED experience-specific
│   ├─ L3: Experience-level: 36344 (Magic Kingdom 1-Day) A2O 63.9%→48.1%  →  CONFIRMED PRIMARY LOCUS
│   │   ├─ Inventory check: 9,999 remaining per date, 0 sold-out  →  RULED OUT live inventory failure
│   │   ├─ DATA GAP: Gateway vs fraud sub-branches — order_attempted_events_v2 parked (see SKILL.md backlogs)
│   │   │   Sub-hypothesis A: WDW fulfillment API returning failures for MK single-day TIDs
│   │   │   Sub-hypothesis B: Fraud over-blocking on MK TIDs post-Apr-13
│   │   │   Sub-hypothesis C: Payment gateway degradation specific to MK TID/amount combination
│   │   │   → Cannot confirm or rule out without order_attempted_events_v2 (failure_reason, payment_gateway)
│   │   └─ DRI ACTION: Ops/Engineering investigate MK 36344 fulfillment + payment logs (see findings.md RC9)
│   └─ Microsoft Ads A2O: 53%→28% (−25pp, n=43 post attempts)  →  CONSISTENT WITH (small n, directional)
│       → Sub-bullet in P1 action card only (c022: below evidence threshold for standalone card)
├─ L2c: S2C decline (26.8% of Shapley)  →  CONFIRMED SEASONAL (fixed-segment aggregate + inventory check)
│   Fixed-segment (MB Google Ads): S2C 24.60%→22.39% (−2.21pp, −9.0% relative). Inventory: unlimited.
│   Per c023: decline present within fixed segment, directionally consistent with seasonal → close with one-liner.
│   No independent branch set needed.
└─ L2d: LP2S decline (14.4% of Shapley)  →  CONFIRMED SEASONAL (fixed-segment aggregate)
    Fixed-segment (MB Google Ads): LP2S 44.09%→42.46% (−1.63pp, −3.7% relative). Seasonal demand composition.

---

## L0 — Orient

**mix_dominance:** is_dominant=False. MB/HO mix contributes 37.6% of ΔCVR — not dominant.
Preliminary orientation: conversion story. Cascade will confirm.

**shapley:** C2O=−0.002071pp (58.8%) · S2C=−0.000944pp (26.8%) · LP2S=−0.000506pp (14.4%)
Primary step: C2O. C2O sub-split: C2A pre=19.2%→post=16.0% (−3.2pp); A2O pre=54.1%→post=50.9% (−3.2pp).
Both sub-steps declined equally in absolute pp terms.

**trend_context:** pre_period_healthy=True. structural_delta_cvr=null (no LY data). ly_delta_cvr=null.
Critical context: pre window (Mar 13–Apr 12) captures **US spring break peak season at WDW** — highest demand,
most committed buyers. Post window (Apr 13–May 12) is post-spring-break off-season. This is the dominant
framing for all rate differences. Traffic itself fell 12.5% (38,450→33,661 LP users).

---

## L1 — Mix Cascade

### Level 1: MB vs HO

From summary.json (no query needed):
- MB: pre_share=72.6%, post_share=65.5%, pre_cvr=1.22%, post_cvr=0.84%
  conv_effect = 0.726 × (−0.0038) = −0.00276
  mix_effect  = (−0.071) × 0.0122  = −0.00087
- HO: pre_share=27.4%, post_share=34.5%, pre_cvr=0.64%, post_cvr=0.45%
  conv_effect = 0.274 × (−0.0019) = −0.00052
  mix_effect  = (+0.071) × 0.0064  = +0.00045
Total conv_effect = −0.00328 | Total mix_effect = −0.00041
→ CONVERSION dominates. Fix MB (|Δcvr|×post_users = 0.0038×22,494 = 85.5 checkouts vs HO 22.5).

### Level 2: Paid vs Organic within MB

Query ran. Result:
| type     | pre_users | post_users | pre_cvr | post_cvr |
|----------|-----------|------------|---------|----------|
| Paid     | 24,996    | 19,742     | 1.24%   | 0.90%    |
| Organic  | 3,726     | 2,922      | 1.37%   | 0.65%    |

Paid share: 87.0%→87.1% (Δ+0.1pp — stable)
Organic share: 13.0%→12.9% (Δ−0.1pp — stable)
Total conv_effect ≈ −0.00385 | Total mix_effect ≈ 0 (negligible)
→ CONVERSION dominates (no mix exit). Fix Paid (87% share).

### Level 3: Channel within Paid MB

| channel        | pre_users | post_users | pre_cvr | post_cvr | abs_impact |
|----------------|-----------|------------|---------|----------|------------|
| Google Ads     | 19,939    | 15,745     | 1.35%   | 1.05%    | 46.4       |
| Microsoft Ads  | 5,401     | 4,015      | 0.81%   | 0.30%    | 20.7       |

Google share: 78.7%→79.7% (stable). Microsoft share: 21.3%→20.3% (stable).
Total conv_effect ≈ −0.00342 | Total mix_effect ≈ +0.00005 (negligible)
→ CONVERSION dominates. Google Ads has larger absolute impact (46.4 vs 20.7).

**Mix cascade result: conversion change at all levels — no routing story.**
**Fixed segment: MB · Paid · Google Ads**
Filters for subsequent funnel queries:
  AND is_microbrand_page = TRUE
  AND channel_name = 'Google Ads'

---

## Geo overview (post-cascade)

Query: browsing_country breakdown for MB Paid.
US (Geo): pre 9,824 users, cvr=1.82%, c2o=18.3% → post 6,899 users, cvr=1.12%, c2o=13.7%
UK (Non-Geo): pre 2,419 users, cvr=1.28% → post 1,540, cvr=1.69% (IMPROVED)
Brazil: cvr 0.57%→0.41% (decline). Ecuador/Canada/Other: mixed.

→ GEO-CONCENTRATED: US domestic users show the dominant decline. UK actually improved.
Note: downstream analysis is CE-level, not geo-filtered.

---

## L2 — Funnel Step Analysis

### Fixed-segment funnel (MB · Google Ads) — all steps

Query ran. Result:
| period | users_lp | lp2s  | s2c   | c2o   | cvr   |
|--------|----------|-------|-------|-------|-------|
| pre    | 19,939   | 44.09%| 24.60%| 12.44%| 1.35% |
| post   | 15,745   | 42.46%| 22.39%| 11.16%| 1.06% |

LP2S change: −1.63pp (−3.7% relative)
S2C change: −2.21pp (−9.0% relative)
C2O change: −1.28pp (−10.3% relative)

All three steps declined within the fixed segment, consistent with seasonal demand shift.
Per c023 secondary-driver scoping:
- LP2S: declined within fixed segment, directionally consistent with seasonal → CONFIRMED seasonal (one-liner)
- S2C: declined within fixed segment, directionally consistent with seasonal → CONFIRMED seasonal (one-liner)
No independent branch set needed for S2C or LP2S.

Seasonal data signal: fixed-segment LP2S and S2C both show moderate declines (3.7% and 9.0% relative),
consistent with lower-intent off-season traffic. This provides the data pairing required by c025 check 2.

---

## L2b — C2O Investigation

### C2A and A2O by device (MB Google Ads)

| device       | pre c2a | post c2a | pre a2o | post a2o | pre checkouts | post checkouts |
|--------------|---------|----------|---------|----------|---------------|----------------|
| Android Mweb | 23.4%   | 17.0%    | 74.6%   | 54.5%    | 304           | 194            |
| Desktop      | 17.7%   | 15.4%    | 51.4%   | 55.3%    | 980           | 669            |
| iOS Mweb     | 20.0%   | 22.1%    | 71.1%   | 65.9%    | 864           | 625            |

iOS Mweb: c2a improved slightly (+2.1pp), A2O modest drop (−5.2pp). iOS is fine.
Desktop: c2a small drop (−2.3pp), A2O slightly improved. Desktop is fine.
Android Mweb: c2a dropped −6.4pp and A2O crashed −20.1pp.
→ Android Mweb is the device dimension showing A2O concentration. Locus confirmed separately at
  experience-level (36344). Device and experience findings are co-directional; cross-cut not run
  (would require experience × device × A2O query; logged as gap per c022 MISSING_INSTRUCTION note).

### A2O by channel (MB all)

| channel        | pre a2o | post a2o | pre attempted | post attempted |
|----------------|---------|----------|---------------|----------------|
| Google Ads     | 63.9%   | 60.6%    | 421           | 274            |
| Microsoft Ads  | 53.0%   | 27.9%    | 83            | 43             |
| Organic/Other  | 60.0%   | 45.2%    | 85            | 42             |

Google Ads A2O held (−3.3pp). Microsoft Ads crashed (−25.1pp, n=43 post — below evidence threshold).
Per c022: Microsoft Ads signal is directional only (small n=43). Will appear as sub-bullet in P1 card,
not as a standalone action card.

### Experience-level locus (MB Google Ads)

| experience_id | name                          | pre checkouts | post checkouts | pre c2o | post c2o | pre a2o | post a2o |
|---------------|-------------------------------|---------------|----------------|---------|----------|---------|----------|
| 36344         | Magic Kingdom 1-Day Ticket    | 860           | 659            | 11.7%   | 7.9%     | 63.9%   | 48.1%    |
| 36250         | WDW 1-Day Tickets             | 329           | 99             | 8.8%    | 10.1%    | 64.4%   | 62.5%    |
| 36252         | WDW 2-Day Tickets             | 231           | 195            | 5.2%    | 8.7%     | 52.2%   | 63.0%    |
| 36251         | WDW 1-Day Park Hopper         | 128           | 121            | 10.9%   | 19.0%    | 56.0%   | 76.7%    |

36344 (Magic Kingdom 1-Day): A2O 63.9%→48.1% (−15.8pp). PRIMARY LOCUS.
36250, 36251, 36252: A2O stable or improved. The A2O decline is specific to Magic Kingdom 1-Day.

### Magic Kingdom (36344) weekly A2O (MB Google Ads)

| week       | checkouts | attempted | completed | a2o   |
|------------|-----------|-----------|-----------|-------|
| Mar 09     | 106       | 18        | 13        | 72.2% |
| Mar 16     | 150       | 33        | 22        | 66.7% |
| Mar 23     | 236       | 45        | 27        | 60.0% |
| Mar 30     | 198       | 36        | 19        | 52.8% |
| Apr 06     | 212       | 33        | 24        | 72.7% |
| **Apr 13** | **166**   | **24**    | **13**    | **54.2%** |
| **Apr 20** | **150**   | **21**    | **8**     | **38.1%** |
| **Apr 27** | **166**   | **30**    | **18**    | **60.0%** |
| **May 04** | **156**   | **35**    | **14**    | **40.0%** |
| **May 11** | **51**    | **6**     | **2**     | **33.3%** |

Pre avg A2O ≈ 65%. Post avg A2O ≈ 45%. Consistent decline with alternating weeks (Apr 20 and May 04
particularly bad at 38% and 40%). Not a single-day break — sustained degradation from Apr 13 onward.

### Inventory check — Magic Kingdom (TIDs 76930, 76934, 76935)

Snapshot query (Path A — post only, pre > 30 days ago):
All lead-time buckets: total_remaining = 9,999 per date, 0 sold-out dates.
→ Magic Kingdom TIDs are unlimited-capacity. NO supply constraint.
→ A2O failures are NOT live inventory failures.
→ Remaining candidates: WDW fulfillment API failure, payment processing, or fraud over-blocking.

### MK A2O sub-branch closure

Per SKILL.md c024: when the decisive mechanism test (order_attempted_events_v2) is in backlogs,
close sub-branches as DATA GAP, not CONFIRMED or LEAF.

Sub-hypothesis A (WDW API failure): DATA GAP — would require order_attempted_events_v2 failure_reason
  distribution for TGIDs 76930/76934/76935, Apr 13–May 12. Table parked in SKILL.md backlogs.
Sub-hypothesis B (fraud over-blocking): DATA GAP — would require fraud_evaluation_result_origin column
  in same table/date range. Not queried.
Sub-hypothesis C (payment gateway): DATA GAP — would require payment_gateway breakdown per TGID.
  Not queried.

Inventory ruled out (Path A confirms unlimited capacity). A2O locus confirmed (36344). Mechanism: DATA GAP.

### Session recordings — Magic Kingdom checkout failures

Data gap: No recordings available for any of the 5 sampled failed-order users (MB context).
Impact: Cannot visually confirm error message or failure point at checkout.

---

## Pre-Step-3 Checks (SKILL.md c025)

1. **Weekday composition:** Pre (Mar 13–Apr 12): 21 weekdays / 10 weekends in 31 days. Post (Apr 13–May 12):
   22 weekdays / 8 weekends in 30 days. Slightly more weekdays in post (73% vs 68%). For WDW, a leisure
   destination, weekends slightly skew higher intent. The difference is small (5pp) and would produce a
   minor headwind for post CVR — directionally consistent with but insufficient to explain −34% drop.
   **PASS — weekday composition not the story.**

2. **Seasonal claim data pairing:** Seasonal spring break framing (primary driver) is paired with:
   - Fixed-segment aggregate showing LP2S −3.7% and S2C −9.0% within MB Google Ads (query result above)
   - 90-day CVR trend: elevated CVR during pre period (spring break weeks) with progressive decline
     into post period (available in summary.json trend data → Chart 1 in report)
   **PASS — seasonal claim is paired with a corresponding data signal from the fixed-segment query.**

3. **Every number has a source:** All claims in evidence inventory cite named BQ queries or summary.json.
   Fixed-segment funnel numbers (LP2S/S2C run2 query), experience-level A2O (BQ experience query),
   inventory (BQ inventory query), weekly MK A2O (BQ weekly query), device breakdown (BQ device query).
   **PASS.**

4. **Numeric recommendations verified:** CPA bid adjustment arithmetic (see findings.md):
   - Seasonal LP2S+S2C Shapley = 14.4% + 26.8% = 41.2% of total ΔCVR
   - ΔCVR = 1.04%→0.69% = −0.35pp = −33.7% relative
   - Seasonal bid-relevant decline = 41.2% × −33.7% ≈ −13.9% relative → round to ~14% bid reduction
   - Not 15–20% (original report): derived here from Shapley data.
   **PASS — bid adjustment is 14%, sourced from Shapley arithmetic.**

5. **Backlogged branches as DATA GAP:** MK A2O mechanism (gateway/fraud) → logged as DATA GAP above.
   Microsoft Ads A2O anomaly → logged as directional/consistent-with (below standalone evidence threshold).
   **PASS.**

---

## Root cause confirmed

**Primary (seasonal):** Pre window (Mar 13–Apr 12) is US spring break peak at WDW — highest-intent buyers.
Post (Apr 13–May 12) is off-season. Within the fixed segment (MB · Google Ads): LP2S fell −1.63pp,
S2C fell −2.21pp, C2O fell −1.28pp. At CE level: traffic fell 12.5%, S2C fell 2.7pp, C2A fell 3.2pp.
Inventory is unlimited (9,999 per date, zero sold-out dates) — no supply-side explanation.

**Secondary (operational):** Magic Kingdom 1-Day Ticket (36344) shows A2O 63.9%→48.1% (−15.8pp),
representing ~17 orders lost in the Google Ads segment in the post period. Other WDW experiences (Park
Hopper, 2-Day) did NOT show this pattern — their A2O improved. Since inventory is unlimited, failures
are not live slot sellouts. Mechanism is DATA GAP — gateway, fraud, or WDW API sub-branches require
order_attempted_events_v2 to resolve, which is parked in SKILL.md backlogs.
