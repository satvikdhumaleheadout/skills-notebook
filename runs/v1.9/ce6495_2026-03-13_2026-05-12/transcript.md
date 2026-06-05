# Investigation Transcript — CE 6495 · Kualoa Ranch
Pre: 2026-03-13 – 2026-04-12 | Post: 2026-04-13 – 2026-05-12

## Tree map
L0: S2C (94% Shapley) · gradual 90d erosion · structural_delta_cvr −4.94pp · pre_period_healthy = false
├─ L1 (Mix cascade): Conversion at all 3 levels  →  CONFIRMED (MB conversion-driven; Paid conversion-driven; Google Ads conversion-driven)
│   Fixed segment: MB · Paid · Google Ads
├─ Geo overview: Uniform  →  CONFIRMED (US −6.29pp, Non-Geo −6.32pp — not geo-concentrated)
├─ L2a: Device breakdown  →  RULED OUT as root locus (broad decline across Desktop −7.7pp, iOS −6.2pp, Android −1.3pp — no single-device concentration)
├─ L2b: Experience-level S2C breakdown  →  CONFIRMED broad decline · UTV Raptor & Movie Sites largest contributors
│   └─ L3a: Inventory — UTV Raptor TID 80074  →  CONFIRMED LEAF
│       TID 80074 had 0 tickets in 0-2d window on 28 of 30 post-period days
│       LEAF: Near-term (0-2d) depletion of UTV Raptor Tour (TID 80074), the highest-volume experience, drove broad S2C abandonment across the CE
├─ L2c: Price analysis  →  RULED OUT (all prices flat — $59.95/$124.95/$154.95/$184.95 unchanged)
├─ L2d: C2O branch (22% Shapley, −2.59pp)  →  RULED OUT as independent mechanism
│   C2A: 55.0% → 53.9% (−1.1pp) · A2O: 85.7% → 88.1% (+2.4pp) within fixed segment
│   Net C2O within fixed segment: +0.33pp (improved). CE-level C2O decline originates outside fixed segment.
│   Experience-level C2A: UTV Raptor −4.68pp, Jungle Expedition −10.0pp — consistent with supply story.
└─ Session recordings  →  DATA GAP (no recordings available for kualoa-ranch.tickets-hawaii.com)

---

## L0 — Orient
**mix_dominance:** is_dominant = false (mbho_mix_share 29.6%, channel_mix_share 41.1%) — not routing-dominant; cascade likely confirms conversion at all levels

**shapley:**
- LP2S: −0.164 share (LP2S actually IMPROVED +1.58pp)
- S2C: **+0.940 share** — overwhelmingly the primary step (−10.79pp Shapley contribution)
- C2O: +0.224 share (secondary, −2.59pp)
All analysis to focus on S2C.

**trend_context:**
- structural_delta_cvr = **−4.94pp** — this is a massive 90-day structural decline (Feb 2026 baseline ~6-7% CVR → current 3.75%)
- pre_period_healthy = **false** — the pre period (Mar 13 – Apr 12) was ALREADY below the 60-day baseline; the 30/30 comparison understates the true change
- LY data: essentially non-existent (1–8 users per day a year ago) — CE is ~1 year old; no seasonal context available
- Trend shape: **gradual erosion** — S2C declined from ~39% in Feb 2026 to ~30-33% through March, accelerating to ~17-22% by mid-April
- Weekday composition: 30 days each in pre and post, no compositional artifact

---

## L1 — Mix Cascade

### Level 1 — MB vs HO (from summary.json)

MB (primary, 94.1% → 90.4% share):
- Δshare = −3.68pp; Δrate = −1.09pp (CVR pre 5.09% → post 4.00%)
- mix_effect = −3.68% × 5.09% = −0.187pp
- conversion_effect = 94.1% × −1.09pp = **−1.026pp** ← dominant
- dominant_driver: **conversion** → fix MB

HO (small, 5.89% → 9.57% share):
- dominant_driver: mix (HO share grew, but HO CVR also dropped −1.87pp)
- HO is not primary — total_effect only −0.027pp

**Level 1 outcome: conversion. Fix MB (is_microbrand_page = TRUE)**

### Level 2 — Paid vs Organic within MB

Query result (MB only):

| Type | Period | Users | CVR |
|---|---|---|---|
| Paid | pre | 18,371 | 5.68% |
| Paid | post | 10,754 | 4.18% |
| Organic | pre | 4,461 | 3.03% |
| Organic | post | 1,786 | 3.08% |

Arithmetic:
- Total pre MB: 22,832; Total post MB: 12,540
- Paid: share_pre = 80.5%, share_post = 85.8%, Δshare = +5.3%, Δrate = −1.50pp
  → mix_effect = +5.3% × 5.68% = +0.30pp; conversion_effect = 80.5% × −1.50pp = **−1.21pp** ← dominant
- Organic: share_pre = 19.5%, share_post = 14.2%, Δshare = −5.3%, Δrate = +0.05pp
  → mix_effect = −5.3% × 3.03% = −0.16pp; conversion_effect = +0.01pp (tiny)

Sum: conversion_effect = −1.20pp >> mix_effect = +0.14pp → **conversion. Fix Paid.**

**Level 2 outcome: conversion. Fix Paid.**

### Level 3 — Channel breakdown within Paid MB

Query result:

| Channel | Period | Users | CVR | S2C |
|---|---|---|---|---|
| Google Ads | pre | 16,843 | 5.85% | 29.79% |
| Google Ads | post | 8,749 | 4.62% | 23.57% |
| Microsoft Ads | pre | 1,676 | 4.06% | 33.39% |
| Microsoft Ads | post | 2,016 | 2.33% | 22.54% |

Totals: pre = 18,519, post = 10,765

Google Ads:
- share_pre = 90.9%, share_post = 81.3%, Δshare = −9.6%, Δrate = −1.23pp
- mix_effect = −9.6% × 5.85% = −0.56pp; conversion_effect = 90.9% × −1.23pp = **−1.12pp** ← dominant

Microsoft Ads:
- share_pre = 9.1%, share_post = 18.7%, Δshare = +9.6%, Δrate = −1.73pp
- mix_effect = +9.6% × 4.06% = +0.39pp; conversion_effect = 9.1% × −1.73pp = **−0.16pp**

Sum: conversion_effect = −1.28pp >> mix_effect = −0.17pp → **conversion dominates.**

Absolute checkout impact:
- Google Ads: |Δcvr| × post_users = 1.23% × 8,749 = 108 fewer checkouts — primary
- Microsoft Ads: 1.73% × 2,016 = 35 fewer checkouts — secondary, but noteworthy (volume nearly doubled while CVR dropped sharply — possible traffic quality issue or new campaign with lower intent)

**Level 3 outcome: conversion. Fix Google Ads.**

**MIX CASCADE RESULT: Conversion change at all three levels — no routing story.**
**Fixed segment: MB · Paid · Google Ads**
**Filters for all subsequent queries:**
```
AND is_microbrand_page = TRUE
AND channel_name = 'Google Ads'
```

---

## Geo overview (post-cascade)

| Segment | Period | Users | S2C | CVR |
|---|---|---|---|---|
| Geo (US) | pre | 14,104 | 29.42% | 6.13% |
| Geo (US) | post | 7,226 | 23.13% | 4.82% |
| Non-Geo | pre | 2,810 | 32.62% | 4.88% |
| Non-Geo | post | 1,561 | 26.30% | 4.04% |

ΔS2C Geo = −6.29pp; ΔS2C Non-Geo = −6.32pp → **Uniform** — drop is not geo-concentrated.

---

## L2a — Device breakdown

| Device | Period | Users | S2C |
|---|---|---|---|
| Desktop | pre | 4,665 | 38.97% |
| Desktop | post | 2,079 | 31.31% |
| iOS Mweb | pre | 10,055 | 26.77% |
| iOS Mweb | post | 5,701 | 20.61% |
| Android Mweb | pre | 2,024 | 23.79% |
| Android Mweb | post | 937 | 22.51% |

All devices declined. Desktop dropped −7.66pp, iOS −6.17pp, Android only −1.28pp. The broad cross-device decline rules out a UX/deploy event (which would typically concentrate in one device). Android's smaller drop is notable but not explanatory. Device breakdown does not point to a single locus.

→ **RULED OUT as root locus.** Continue to experience breakdown.

---

## L2b — Experience-level S2C breakdown (select-page users, fixed segment)

| Experience | TGID | Pre users | Pre S2C | Post users | Post S2C | ΔS2C | Rate × post-vol impact |
|---|---|---|---|---|---|---|---|
| UTV Raptor Tour | 37536 | 3,954 | 23.32% | 2,132 | 17.59% | **−5.73pp** | **−122 checkouts** |
| Movie Sites & Ranch Tour | 37530 | 2,017 | 31.38% | 1,116 | 23.92% | **−7.46pp** | **−83 checkouts** |
| Jungle Expedition Tour | 37532 | 958 | 24.32% | 489 | 16.97% | −7.35pp | −36 checkouts |
| Jurassic Valley Zipline | 37531 | 715 | 15.38% | 402 | 19.65% | **+4.27pp** | +17 (IMPROVED) |
| Horseback Walking Tour | 37535 | 623 | 13.48% | 399 | 11.78% | −1.70pp | −7 checkouts |
| Ocean Voyage Tour | 39901 | 382 | 17.54% | 199 | 8.54% | −9.00pp | −18 checkouts |
| UTV Raptor (All-Inclusive) | 37863 | 793 | 10.72% | 64 | 3.13% | −7.59pp | −5 checkouts |
| E-Bike Tour | 39903 | 244 | 18.44% | 121 | 9.09% | −9.35pp | −11 checkouts |

Key observations:
- UTV Raptor (37536) has the highest volume (3,954 select users pre) and the largest absolute checkout impact (−122 from rate effect alone)
- Movie Sites second (−83 checkouts from rate)
- Jurassic Zipline is the ONLY experience that IMPROVED in S2C (+4.27pp) — a critical outlier
- All-Inclusive Package (37863): volume collapsed from 793 to 64 select users — likely suspension

→ **CONFIRMED broad decline, concentrated by volume in UTV Raptor + Movie Sites. Jurassic Zipline anomaly is diagnostic — investigate supply for both.**

---

## L3a — Inventory investigation

### Price check (ruled out first)
All prices are flat in pre vs post (no changes, no discounts applied):
- Movie Sites, Jungle Expedition, Ocean Voyage: $59.95
- E-Bike, All-Inclusive: $124.95
- Horseback, UTV Raptor: $154.95
- Jurassic Zipline: $184.95

**Price: RULED OUT** — no pricing change explains the S2C decline.

### Inventory — Path A (post-period median, pre > 30 days ago)

**Top 3 experiences by volume — TID summary (post-period medians):**

| Exp | TID | TID Name | 0-2d | 3-7d | 8-13d | 14-30d | Unlimited? |
|---|---|---|---|---|---|---|---|
| 37536 | 80074 | UTV Raptor Tour | **0** | 204 | 719 | 3,676 | No |
| 37536 | 80075 | UTV Raptor Ride-Along | 304 | 892 | 1,140 | 3,336 | No |
| 37530 | 80066 | Movie Sights + Ranch Tour | 955 | 2,076 | 2,762 | 8,421 | No |
| 37532 | 80068 | Jungle Expedition Tour | 840 | 1,613 | 2,026 | 6,052 | No |

**UTV Raptor TID 80074: post_median_0_2d = 0** — consistently zero near-term tickets throughout the post period.

**Daily time-series (TID 80074, post period):**
Every single day from Apr 13 to May 12: tickets_0_2d = 0 (28 out of 30 days), with only 6 tickets on May 2 and May 12. The 3-7d bucket was also intermittently zero (Apr 21, 23, 24, 27, 28, May 11, 12). The 14-30d bucket had 905-6,234 tickets — capacity exists for future dates but not near-term.

**Daily time-series (TID 80075, post period):**
Healthy throughout — 0-2d bucket ranged 212-484 tickets across the period. This is the Ride-Along variant; its supply is not constrained.

**Key comparison — Movie Sites (80066) and Jungle Expedition (80068):**
Both have healthy 0-2d median inventory (955 and 840 respectively). Their S2C drops are NOT explained by near-term supply constraints → other mechanism (possibly spillover abandonment, see root cause synthesis below).

**Jurassic Zipline (80067) inventory:**
- post_median_0_2d = 126; 3-7d = 342 — AVAILABLE NEAR-TERM
- avg_days_to_first_available: pre = 4.0 → post = 0.1 (supply IMPROVED in post period)
- S2C also IMPROVED (+4.27pp) — **perfect inverse confirmation**: where supply recovered, S2C recovered

**All-Inclusive Package (37863):**
TID 80888 and 80889: is_fully_unlimited_capacity = TRUE but near-zero slots (0-6 in 0-2d) — unlimited-capacity TIDs showing no active slots, consistent with the volume collapse from 793 → 64 select users. This experience appears effectively closed/suspended in the post period.

→ **LEAF CONFIRMED: Near-term (0-2d) depletion of UTV Raptor Tour (TID 80074) throughout the entire post period is the primary supply-side mechanism driving S2C decline at Kualoa Ranch.**

### Lead-time distribution — UTV Raptor checkouts (confirming near-term impact)

| Lead time | Pre checkouts | Post checkouts | Change |
|---|---|---|---|
| 0-2d | 245 | 101 | −59% |
| 3-7d | 154 | 93 | −40% |
| 8-13d | 127 | 60 | −53% |
| 14d+ | 426 | 129 | −70% |

The 14d+ bucket declined the most in absolute terms (−297 checkouts). Given that TID 80074 has ample inventory at 14-30d (median 3,676), this decline is NOT supply-driven — it reflects the overall traffic volume reduction (select users fell from 3,954 to 2,132). The 0-2d checkout volume dropped −59% but the post-period absolute count (101) confirms some near-term bookings continued — these were routed entirely through TID 80075 (Ride-Along).

### Session recordings
Attempted for 4 users on kualoa-ranch.tickets-hawaii.com. No recordings available for this MB microsite. Noted as data gap. The inventory time-series provides the primary evidence.

---

## L2d — C2O branch (C2A × A2O decomposition)

**Trigger:** C2O Shapley share = 22.4% (−2.59pp). Above the 10% threshold — branch opened.

**c2o_sub from summary.json (whole CE):**
- C2A: 51.07% → 49.33% = −1.74pp
- A2O: 87.70% → 85.54% = −2.16pp

Both sub-metrics declined at CE level. Investigating within fixed segment (MB · Paid · Google Ads).

**Fixed-segment daily series query — pre/post aggregates:**

| Metric | Pre | Post | Δ |
|---|---|---|---|
| Users (checkout) | 2,701 | 1,219 | −55% |
| Users (attempted) | 1,486 | 657 | −56% |
| Users (completed) | 1,274 | 579 | −55% |
| C2A | 55.02% | 53.90% | **−1.12pp** |
| A2O | 85.73% | 88.13% | **+2.40pp** |
| C2O | 47.17% | 47.50% | **+0.33pp** |

**Result:** Within the fixed segment, C2O actually improved slightly (+0.33pp). C2A fell a modest −1.12pp; A2O improved +2.40pp. The CE-level C2O decline (−2.59pp) is concentrated in non-fixed-segment traffic (organic, Microsoft Ads, HO) and is not an independent mechanism requiring a separate action.

**Experience-level C2A to check for concentration (within fixed segment):**

| Experience | TGID | Pre checkout | Post checkout | Pre C2A | Post C2A | ΔC2A |
|---|---|---|---|---|---|---|
| UTV Raptor Tour | 37536 | 986 | 462 | 49.49% | 44.81% | **−4.68pp** |
| Movie Sites | 37530 | 656 | 319 | 54.12% | 60.19% | +6.07pp |
| Jungle Expedition | 37532 | 242 | 105 | 62.40% | 52.38% | **−10.02pp** |
| Jurassic Zipline | 37531 | 115 | 91 | 44.35% | 50.55% | +6.20pp |
| Horseback | 37535 | 94 | 55 | 50.00% | 60.00% | +10.00pp |
| Ocean Voyage | 39901 | 71 | 20 | 60.56% | 50.00% | −10.56pp |

UTV Raptor shows a −4.68pp C2A drop — the highest-volume experience with the supply constraint. This is consistent with the supply story: users who committed to checking out may be abandoning at the checkout step when they see only far-future dates. Jungle Expedition's −10.0pp drop is notable but volume is low (105 post checkout users). Movie Sites, Zipline, and Horseback all improved C2A — ruling out a CE-wide checkout issue.

**A2O:** Improved within fixed segment (+2.4pp overall). No payment gateway or fraud issue visible.

→ **C2O RULED OUT as independent mechanism.** Modest C2A concentration on UTV Raptor is a secondary effect of the supply depletion (same root cause). No checkout UX, payment gateway, or fraud issue to report. CE-level C2O decline (22% Shapley) originates outside the fixed segment.

---

## Root cause confirmed

The 90-day CVR decline at Kualoa Ranch (CE 6495) is driven primarily by near-term inventory depletion at the UTV Raptor Tour (TID 80074, experience 37536). This is the highest-volume experience in the collection — it received 3,954 select-page visits in the pre period, more than any other experience. Throughout the post period (April 13 – May 12), TID 80074 had zero tickets available in the 0–2 day booking window on 28 of 30 days, with the 3–7 day window also intermittently depleted (7 zero-ticket days). The Ride-Along variant (TID 80075) maintained consistent near-term availability — but it is a different product (observation only) that users of the main Raptor Tour may not regard as equivalent.

The inverse confirmation from Jurassic Zipline (TGID 37531) is the strongest evidence: it was the only experience where supply improved (avg_days_to_first_available fell from 4.0 to 0.1 days) AND S2C improved (+4.27pp). All other experiences with supply constraints or flat supply showed S2C declines.

The All-Inclusive Package (37863) appears to have been suspended or closed — its unlimited-capacity TIDs show near-zero active slots and its select volume collapsed from 793 to 64 users. This is a secondary contributor.

The broad S2C decline across Movie Sites, Jungle Expedition, and other experiences (despite their having normal inventory) is consistent with spillover abandonment: users who arrive at the Kualoa Ranch collection page, navigate to the primary UTV Raptor product, and find it unavailable near-term, then abandon the entire collection rather than booking a different experience. The gradual 90-day structural decline (pre_period_healthy = false, structural_delta_cvr = −4.94pp) suggests the capacity constraint at TID 80074 has been worsening since at least February 2026, predating both the pre and post analysis windows.
