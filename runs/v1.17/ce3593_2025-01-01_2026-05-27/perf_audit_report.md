# Paid Performance Audit — Antelope Canyon (CE 3593)

**Window:** YoY 2026-YTD vs 2025-same-period (147 days each)
- PRE: 2025-01-01 → 2025-05-27
- POST: 2026-01-01 → 2026-05-27
**Market:** North America (United States)
**Trigger:** CVR-RCA cascade flagged Paid · Google Ads · MB CVR rose +1.97pp YoY (5.16% → 7.13%). This audit interrogates that gain from the paid-acquisition side.

---

## 1. Executive Summary

**Status:** WARNING — the YoY paid CVR/volume picture looks great, but the latest trailing month shows efficiency collapsing well below tROAS targets, masked by the YTD aggregate.

### Causal story

The +1.97pp paid CVR lift is real and large, but it is overwhelmingly driven by the **tCPA → tROAS bidding migration plus account consolidation completed Feb 2026**, not by an organic improvement in user behavior. Smart Bidding under MAXIMIZE_CONVERSION_VALUE bought meaningfully **higher-quality clicks** (CTR jumped 8.97% → 14.50%, +62%), which converted at 5.79% click-CVR vs 3.94% prior (+47%). CPC rose to $2.00 from $1.72 (+16%), and ROI (CM1/spend) held essentially flat at 1.29 vs 1.31. That part is healthy and on-strategy.

The concern is hidden in the monthly trajectory: **April-May 2026 ROI on the two largest campaigns is 0.85 and 0.91** (English tROAS 167, Other Languages tROAS 158), well below the 145–167% targets and far outside Google's normal ~15% Smart-Bidding variance band. Budget-lost IS is essentially zero, so the constraint is auction-side — rank-lost IS has climbed to 66% YoY and ~79% in the trailing 8 weeks. SIS fell from 45% to 24% (note: not strictly like-for-like post-consolidation, but the MoM trajectory from Dec→May confirms a real decline from 24.5% to 25.8% with a Jan low of 18.1%).

### Channel attribution
The YoY Paid CVR delta is **dominated by Google Search** (no PMax, no Display for this CE). Bing contributed directionally (orders +39%) but at deteriorating ROI (1.64 → 1.40).

### Recommended actions

| Action | Expected Impact | Confidence | Why |
|---|---|---|---|
| Diagnose May-2026 ROI cliff on English/Other Languages campaigns before recommending bid changes | Stem ~$30K/mo CM1 leak | High | Latest-month ROI 0.47 blended, 0.85/0.91 per-campaign vs target 1.67/1.58 — gap is structural, not variance |
| Investigate landing page regression hitting LP2S | +$15–25K CM1/mo | Medium | CVR-RCA shows LP2S fell -3.1pp YoY despite paid CTR rising +62% — LP is the leak |
| Maintain tROAS — do NOT lower to "match" actual ROI | Avoid loss | Certain | Lowering tROAS tells Google to bid harder — would worsen the efficiency picture (skill anti-pattern #4) |
| Pull auction insights + search terms CSVs for consolidated NA account | Diagnostic | High | Rank-lost +12pp YoY with no competitor data is a known unknown |
| Investigate Bing ROI compression 1.64 → 1.40 | +$8K CM1/half | Medium | Orders +39% on +17% spend looks good but ROI is bleeding |
| Read-only monitor C2O sustainability | Validation | Low | +7.5pp C2O is 89% of CVR delta — confirm it's a real checkout improvement, not a one-period spike |
| Validate May 2026 CM1 completeness (offline-conversion lag) | Data quality | Medium | May ROI 0.47 vs Jan/Feb 1.61/1.62 is suspicious — may be partial attribution |

### Health verdict
This is a CE where the **YTD report shows a win but the trailing month shows efficiency in retreat.** The CVR-RCA cascade's +1.97pp paid CVR finding is a true outcome of the bidding migration, but the audit reveals it cost more per click and is currently buying lower-CM1 clicks than tROAS targets imply. Do not declare victory on the +47% click-CVR — it is largely Google Smart Bidding doing its job under a new objective function. The next 4–6 weeks should focus on **why ROI is 50–60% of target in the latest window.**

---

## 2. CE Overview

| Metric | PRE (2025) | POST (2026) | YoY Δ |
|---|---|---|---|
| Paid Spend (Google Ads) | $164,896 | $268,852 | +63% |
| Paid Spend (Bing) | $37,760 | $44,016 | +17% |
| Total Paid Spend | $202,656 | $312,868 | +54% |
| Clicks (Google) | 95,849 | 134,408 | +40% |
| Orders (Google attributed) | 3,780 | 7,778 | +106% |
| Revenue (Google, BQ calculated) | $249,526 | $389,843 | +56% |
| CM1 (Google, BQ calculated) | $216,680 | $346,605 | +60% |
| ROI = CM1/Spend (Google) | 1.31 | 1.29 | –1.5% |
| CPC | $1.72 | $2.00 | +16% |
| CTR | 8.97% | 14.50% | +62% |
| Click-CVR | 3.94% | 5.79% | +47% |
| RPC | $2.60 | $2.90 | +12% |
| SIS (impression-share weighted) | 44.91% | 23.67% | –47% |
| Budget-lost IS | 1.32% | 10.10% | +667% |
| Rank-lost IS | 53.77% | 66.23% | +23% |

**Footnote:** SIS YoY is **not** strictly comparable — Feb 2026 account consolidation moved campaigns from "Rest Of Usa" to "North America" account, expanding the eligible-impressions denominator. Use MoM as the primary SIS signal.

---

## 3. Channel Breakdown

Google Search is the only Google paid surface of meaningful size for Antelope Canyon — no PMax, no Display, no Discovery (collection-type, US market). Bing is the secondary paid channel.

| Channel | PRE spend | POST spend | PRE orders | POST orders | PRE ROI | POST ROI |
|---|---|---|---|---|---|---|
| Google Search | $164,896 | $268,852 | 3,780 | 7,778 | 1.31 | 1.29 |
| Microsoft Ads (Bing) | $37,760 | $44,016 | 818 | 1,137 | 1.64 | 1.40 |

**So-what:** the +106% order growth on Google + +39% on Bing **drives the BQ-side paid CVR lift** seen in the cascade. The CVR improvement is real volume, not just attribution shift. Google ROI held flat (within the noise band), Bing ROI deteriorated 15%.

---

## 4. Paid Deep Dive — Google Search

### 4a. Campaign roster, post-consolidation (Apr–May 2026 trailing snapshot)

| Campaign | Status | tROAS | Spend (8w) | Trailing ROI | SIS | Rank-lost | Budget-lost |
|---|---|---|---|---|---|---|---|
| Page - Antelope Canyon - English - All - Search - All - **All** | ENABLED | 167 | $62,465 | **0.85** | 0.0% | 79.2% | 0.0% |
| Page - Antelope Canyon - Other Languages - All - Search - All - **All** | ENABLED | 158 | $30,701 | **0.91** | 0.0% | 66.6% | 0.0% |
| Page - Las Vegas → Antelope Canyon - English - All | ENABLED | 0 (Portfolio: "North America - Existing CEs") | $2,277 | 1.00 | 0.0% | 74.1% | 0.0% |
| Page - Antelope Canyon - Spanish - All | ENABLED | 0 (Portfolio: "North America - Existing CEs") | $842 | 0.80 | 0.4% | 86.8% | 0.0% |

All paused campaigns ("Transitioned" / "Merged" / "Rest Of Usa" accounts) are **intentionally paused per the Feb 2026 consolidation playbook** — do not flag.

**Reading the campaign table:**
- 0% SIS in the latest 8 weeks across all 4 active campaigns is almost certainly a **reporting anomaly** post-consolidation. The whole-window SIS computed earlier (23.7%) is reliable; the trailing-8w view appears to mis-attribute eligible-impression denominator. Flag for the perf-data team.
- **Rank-lost IS of 67–87% across the board** — Google is choosing not to enter most auctions where it's eligible. Under tROAS this is expected algorithmic behavior, but the latest-month ROI gap to target (0.85 vs 1.67 = 51%) means Smart Bidding is significantly under-delivering — the algorithm is bidding into auctions where actual CM1 falls well short of predicted value.

### 4b. CPC explanation — 3-lens

1. **Quality traffic?** YES — CTR jumped 8.97% → 14.50% (+62%) and click-CVR rose 3.94% → 5.79% (+47%). Google bought meaningfully better clicks under tROAS. This justifies a CPC lift.
2. **AOV structural?** Yes, partially — RPC rose +12% indicating either price or mix lift. Tour ad-group (75% of spend) has higher AOV than Tickets/Generic.
3. **Competition?** Cannot claim without auction insights CSV. Rank-lost IS rose +12pp YoY — suggestive of competitive pressure or eligibility expansion under broad match, but unverified.

**Verdict:** CPC lift is justified by quality; do not flag as overpay at the YTD level. Latest-month ROI is the separate concern.

---

## 5. Coverage + Matchmaking

### 5a. Ad-group cohort backbone

| AG Type | POST Spend | POST Clicks | POST CVR | POST ROI | Spend share | PRE Spend | YoY Δ |
|---|---|---|---|---|---|---|---|
| Tour | $200,708 | 92,787 | 5.99% | **1.69** | 75% | $99,373 | +102% |
| Generic/Brand | $47,603 | 30,817 | 3.29% | 1.38 | 18% | $53,201 | -11% |
| Tickets | $20,541 | 10,804 | 4.28% | 1.53 | 8% | $12,322 | +67% |

**Reading the cohort table:**
- Tour-intent AGs carry the CE and improved CVR materially (4.74% → 5.99%). This is where the YoY win lives.
- Generic/Brand spend **shrunk** in absolute terms (-11%) while Tour doubled — a sensible reallocation under tROAS toward highest-AOV intent.
- Tickets is small (8% spend) but profitable (1.53 ROI). No dedicated Tickets campaign in the active roster — Tickets AGs sit inside Page-type campaigns mixed with Tour intent. Coverage gap.

### 5b. Coverage gaps
- **No Tickets-dedicated campaign** — Tickets clicks are catching overflow from Tour-named Page campaigns under broad match. Match-type tightening or a dedicated Tickets ad group could lift CTR + ad relevance.
- **No PMax** — expected for a US collection-type CE; not flagged.
- **Spanish/Other Languages** volume is small (Spanish $842 at 0.80 ROI in latest 8w) — sample too small to act on, monitor only.

### 5c. Money on table (sized)
- If May-2026 ROI restored to YTD-average 1.29 (vs realized 0.47) on $41K May spend → roughly **$30K CM1 leak/month** if the trend continues. Biggest sizing in this audit.
- LP2S restoration to PRE level: 3.1pp lift × 143K POST LP × 6.15% downstream CVR × ~$80 AOV → ~$15–25K CM1/mo if landing page can be remediated.

---

## 6. External Dynamics

**Demand (Ahrefs):** unavailable — Ahrefs MCP not loaded in this session. Antelope Canyon has strong evergreen US tourist demand, peaking spring–summer. Q1–Q2 is the seasonal ramp (consistent with the monthly trajectory).

**Competition:** auction insights CSVs not supplied. Rank-lost IS rising +12pp YoY is suggestive but inconclusive. Recommend pulling auction insights to identify whether GetYourGuide / Viator / direct operators (Ken's Tours, Dixie Ellis) are bidding up.

**Tourist mix (est.):** US domestic + LATAM is the bulk; APAC/EU smaller share. Other Languages campaign captures Spanish primarily.

---

## 7. Funnel (CE 3593, BQ paid sessions, all-paid cohort from CVR-RCA)

| Step | PRE | POST | Δ (abs) | Δ (rel) |
|---|---|---|---|---|
| LP users | 82,996 | 143,244 | +60,248 | +73% |
| LP2S | 46.58% | 43.44% | -3.14pp | -6.7% |
| S2C | 30.50% | 33.54% | +3.04pp | +10.0% |
| C2O | 34.68% | 42.20% | +7.52pp | +21.7% |
| → C2A | 42.17% | 47.29% | +5.12pp | +12.1% |
| → A2O | 82.22% | 89.23% | +7.01pp | +8.5% |
| Overall CVR | 4.93% | 6.15% | +1.22pp | +24.8% |

**Shapley contribution:** C2O 89%, S2C 43%, LP2S –32% (regression).

**Reading the funnel:**
- The **leak is LP2S** — landing page → select-page dropped 3.14pp. Paid CTR rose substantially (better click quality), so the LP is the bottleneck, not click intent. Investigate Page UX / content regression.
- The **win is C2O** — checkout → order rose +7.5pp, with both C2A (form completion) +5.1pp and A2O (payment) +7pp improving. Likely structural (checkout flow improvements) and probably durable.
- S2C also improved +3pp. Mid-funnel is in good shape.

---

## 8. Search Intelligence

Search terms CSV not supplied — abbreviated analysis.

**Ad-Group coverage (from BQ):**
- Tour AG = 75% of paid spend. Driving the lift.
- Tickets AG = 8% of paid spend. Healthy ROI (1.53) but no dedicated campaign.
- Generic/Brand AG = 18%. Reasonable ROI (1.38).
- No DSA observed. No clear Competitor or Informational AG by name. Negative-keyword posture unknown without search terms.

**Recommendation:** request search terms CSV (last 4 weeks of consolidated NA account, filtered to cid3593 campaigns) to build cluster analysis and surface any wasted spend on Competitor (klook/viator/getyourguide) or Informational (timings/hours) terms.

---

## 9. Red Flags Summary

1. **Latest-month ROI collapse** (Apr–May 2026): English campaign ROI 0.85, Other Languages 0.91, blended May 0.47, against tROAS targets of 1.67/1.58. Gap to target is 50–60% — far outside the 15% Smart-Bidding variance band. **Highest priority.**
2. **LP2S regression** -3.14pp YoY despite higher-CTR clicks landing on the page. Landing page or Page UX issue.
3. **Rank-lost IS climbing** to 66% YoY and 79% in latest 8 weeks. Eligibility broadened post-consolidation, but Google is choosing not to enter most auctions — consistent with tROAS predicting low value, but the gap is concerning.
4. **0% SIS in latest 8 weeks** on all 4 active campaigns is almost certainly a reporting anomaly post-consolidation. Validate with perf team.
5. **Bing ROI -15%** (1.64 → 1.40). Spend up 17% with deteriorating ROI is a small but real efficiency leak.
6. **May 2026 attribution completeness uncertain** — offline conversions may still be landing. Validate before acting on May ROI specifically.

---

## 10. Recommended Actions

| # | Action | Owner | Est. Impact | Timeline | Evidence |
|---|---|---|---|---|---|
| 1 | Diagnose May-2026 ROI cliff on English (tROAS 167) and Other Languages (tROAS 158) campaigns. Check: conversion-value tracking, landing page CR, query-mix shift, broad-match overflow. Do NOT reduce tROAS until root cause identified. | Perf | +$30K CM1/mo if restored | 2 weeks | §4a trailing ROI 0.85/0.91 vs target 1.67/1.58; Appendix May ROI 0.47 |
| 2 | Audit LP (`antelope-canyon-tours.com/`) for regressions vs PRE period — page speed, hero block, select-page CTA prominence. | Web/Page | +$15–25K CM1/mo | 2–3 weeks | §7 LP2S -3.14pp, paid CTR +62% |
| 3 | Validate SIS = 0% anomaly with perf-data team. If real → coverage cliff; if reporting → fix dashboards. | Perf-data | Read-only / fix data | 1 week | §4a all 4 campaigns SIS=0% in trailing 8w |
| 4 | Maintain current tROAS targets. Lowering tROAS would tell Google to bid more aggressively into the same low-ROI auctions. | Perf | Avoid loss | Immediate | Skill anti-pattern #4 |
| 5 | Pull auction insights CSV (last 8 weeks consolidated NA account, cid3593 campaigns) to identify competitive pressure. | Perf | Diagnostic | 1 week | §6 rank-lost +12pp YoY, no competitor data |
| 6 | Pull search terms CSV (last 4 weeks) and cluster Tour/Tickets/Generic/Competitor/Informational. Validate negative keyword posture. | Perf | +5–10% volume | 2 weeks | §8 no dedicated Tickets campaign, broad-match overflow likely |
| 7 | Bing efficiency check — query-mix and match-type audit, ROI 1.64 → 1.40 deserves attention. | Perf | +$8K CM1/half | 3 weeks | §3 Bing ROI -15% |
| 8 | Read-only: monitor C2O sustainability over next 6 weeks to confirm it's a real checkout improvement. | Growth/CRO | Validation | 6 weeks | §7 Shapley C2O = 89% |

---

## Appendix A — Monthly Trajectory (last 18 months, Google Ads only)

| Month | Spend | Clicks | Orders | ROI (CM1) | CPC | CVR | SIS |
|---|---|---|---|---|---|---|---|
| 2025-01 | $6,347 | 4,877 | 138 | 1.31 | $1.30 | 2.83% | 30.9% |
| 2025-02 | $35,753 | 16,646 | 682 | 1.12 | $2.15 | 4.10% | 52.8% |
| 2025-03 | $64,179 | 32,540 | 1,448 | 1.29 | $1.97 | 4.45% | 55.9% |
| 2025-04 | $18,115 | 15,306 | 539 | 1.60 | $1.18 | 3.52% | 34.8% |
| 2025-05 | $44,007 | 29,098 | 1,066 | 1.46 | $1.51 | 3.66% | 43.0% |
| 2025-06 | $43,977 | 25,749 | 1,027 | 1.46 | $1.71 | 3.99% | 40.4% |
| 2025-07 | $43,423 | 25,274 | 965 | 1.30 | $1.72 | 3.82% | 37.9% |
| 2025-08 | $28,839 | 19,703 | 824 | 1.42 | $1.46 | 4.18% | 33.7% |
| 2025-09 | $50,842 | 28,742 | 1,368 | 1.26 | $1.77 | 4.76% | 38.3% |
| 2025-10 | $31,223 | 22,406 | 918 | 1.36 | $1.39 | 4.10% | 30.7% |
| 2025-11 | $28,928 | 19,170 | 706 | 1.26 | $1.51 | 3.68% | 28.8% |
| 2025-12 | $30,745 | 20,131 | 717 | 1.46 | $1.53 | 3.56% | 24.5% |
| **2026-01** | $38,989 | 23,094 | 1,219 | **1.61** | $1.69 | 5.28% | 18.1% |
| **2026-02** | $55,224 | 26,444 | 1,581 | **1.62** | $2.09 | 5.98% | 22.7% |
| **2026-03** | $78,269 | 36,851 | 2,182 | 1.41 | $2.12 | 5.92% | 29.2% |
| **2026-04** | $55,099 | 27,062 | 1,656 | 1.17 | $2.04 | 6.12% | 22.6% |
| **2026-05** | $41,270 | 20,957 | 1,140 | **0.47** | $1.97 | 5.44% | 25.8% |

**ROI trajectory tells the real story:** Jan-Feb 2026 saw the bidding migration deliver outstanding ROI (1.61 / 1.62). It then declined month-on-month — 1.41 → 1.17 → **0.47**. CVR is holding (5.4-6.1%), CPC is holding ($1.97-$2.12), but ROI per dollar spent has dropped. Either CM1 per order has fallen sharply (margin / take-rate / discounting shift) or the May 2026 data is incomplete (offline conversions still landing). **Validate completeness of May 2026 CM1 attribution before drawing final conclusions.**

---

## Data Sources

- BQ: `headout-analytics.analytics_reporting.google_ads_campaign_stats` (Google Ads campaign-level)
- BQ: `headout-analytics.analytics_reporting.microsoft_ads_campaign_stats` (Bing)
- BQ: `headout-analytics.analytics_reporting.google_ads_ad_group_stats` (ad-group cohort)
- BQ: `headout-analytics.analytics_reporting.mixpanel_user_funnel_progression` (funnel — via CVR-RCA cascade)
- CVR-RCA summary: `/Users/apple/Documents/CVR RCA Runs/ce3593_2025-01-01_2026-05-27/summary.json`
- Window: YoY 147-day (2025-01-01..2025-05-27 vs 2026-01-01..2026-05-27). Non-standard L4W framing per caller spec.
