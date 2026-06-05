# Paid Performance Audit: Louvre Museum Tickets (CE 252)
**Market**: France
**Pre window (P4W)**: 2026-03-28 — 2026-04-26
**Post window (L4W)**: 2026-04-27 — 2026-05-26
**LY**: 2025-04-28 — 2025-05-27
**Trigger**: CVR-RCA cascade fixed on Paid · Google Ads · MB

---

## 1. Executive Summary

**Status: HEALTHY (paid channel)**

Paid Google Ads delivered a strong post-period: revenue +32%, ROI +17.8pp, CVR +0.7pp on +13% clicks at +5% CPC. None of the classic perf-suppression signatures fire (no tROAS-driven self-suppression, no broad budget exhaustion, no dormant primary campaigns, no SIS collapse). The cascade fix on Paid · Google Ads · MB is therefore unlikely to be caused by a paid-acquisition regression — paid quality and reach both improved Pre→Post. The remaining anomaly worth flagging is **English campaign budget-lost IS at 11.3%** (just over the 10% threshold) on the largest single cohort (38% of Google Search CM1) with extreme rank-lost (75.7%) — a chronic supply gap that pre-existed both windows, not a Post-period change.

---

## 2. Traffic Quality (Pre vs Post)

**Paid (Google Search + PMax + Bing) — Table 2:**

| Metric | P4W (Pre) | L4W (Post) | Δ |
|---|---|---|---|
| Paid Revenue | $32.7K | $43.1K | +32% |
| Paid ROI | 130.37% | 148.14% | +17.8pp |
| RPC | $0.69 | $0.80 | +16% |
| CPC | $0.80 | $0.84 | +5% |
| Ad Spend | $37.8K | $45.2K | +20% |
| Clicks | 47,477 | 53,832 | +13% |
| CTR | 6.34% | 5.99% | -0.4pp |
| Paid CVR | 3.12% | 3.86% | **+0.7pp** |
| Paid CR | 90.34% | 97.27% | +6.9pp |

**Read:** CVR is up, ROI is up, RPC is up, clicks are up. CPC rose 5% but RPC rose 16% — clicks are higher quality, not more expensive in real terms. CTR softened 0.4pp which is the only mildly negative signal; could indicate slightly broader match-type reach but volume + CVR more than compensated.

**Channel composition (BQ, fct_orders L4W vs P4W):**
- Google Search: $37.3K (+56% vs P4W) — main driver
- Google PMax: $22.8K (+42% vs P4W)
- Bing: $6.3K (+40% vs P4W)
- Google Cross-sell: -22% (only paid-adjacent decline)

All major paid surfaces grew Post vs Pre. No paid channel regressed in a way that would cause an MB-cohort CVR cascade.

---

## 3. SIS / Reach (Largest Cohorts, L4W)

| Cohort | SIS | Budget-Lost IS | Rank-Lost IS | tROAS | CM1 Share |
|---|---|---|---|---|---|
| English (All Geos) | 13.0% | **11.3%** | 75.7% | 160% | 38.4% |
| Italian | 27.1% | 5.2% | 67.7% | 157% | 10.8% |
| French | 15.6% | — | 84.4% | 148.5% | 9.5% |
| German | 20.8% | 6.1% | 73.1% | 165% | 9.6% |
| Spanish | 20.7% | 1.3% | 77.9% | 160% | 7.3% |
| Dutch | 36.0% | 0.2% | 63.9% | 160% | 7.0% |

**Read:** English campaign is the only one breaching the 10% budget-lost threshold. Rank-lost is the dominant constraint across every language — a structural quality-score / bid-ceiling pattern, not a Post-period event. SIS is not trending down at the campaign level (no MoM SIS deterioration evident in the cohort table).

---

## 4. Campaign Status Audit

**Active campaigns in Post period:** 12 (all 12 language Search campaigns spent in L4W).

**$0 spend campaigns:** ~33 dormant variant campaigns (Translation/Guided/MaxConv/tCPA legacy structures). These are intentional placeholders from the geo-consolidation + tROAS migration (Feb 2026 perf infra change), not Post-period pauses. Not flagged as dormancy.

**tROAS self-suppression check:**
- Self-suppression = ROI ↑ + Clicks ↓ + Spend ↓ (Google bidding below cap due to ROAS target)
- Actual L4W vs P4W: ROI +17.8pp, Clicks **+13%**, Spend **+20%**
- → **No self-suppression.** Google is bidding more aggressively, not pulling back.

**Budget exhaustion check:**
- Only English campaign has budget-lost IS >10% (at 11.3%).
- All other campaigns at ≤6.1%.
- → **No widespread budget exhaustion.** Slight constraint on English only.

---

## 5. CPC 3-Lens Diagnostic

1. **Quality traffic?** CVR rose 0.7pp alongside the 5% CPC increase — Google is buying better clicks. Justified.
2. **AOV structural?** AOV moved $151.92 → $139.72 (-8%) Post. AOV did NOT rise to justify CPC — but the +CVR alone covers it (RPC +16% vs CPC +5%).
3. **Competition?** No auction-insights CSV provided. Cohort SIS and rank-lost are stable, no evidence of competitor incursion in Post window.

Verdict: CPC rise is efficiency-positive, not competitive pressure.

---

## 6. Mobile / Conversion-Path Connection to Trigger

The CVR-RCA cascade fixed on **Paid · Google Ads · MB**. Two important observations:

1. **Aggregate paid CVR rose Post**, so the mobile-paid CVR regression — if real — is a sub-segment effect masked by desktop/tablet gains, or by language-mix shift. The audit data here is desk+mobile blended; this audit cannot confirm or deny the MB-specific leak. The funnel would need to be split by device to localize it.
2. **No paid-acquisition cause is visible.** Spend mix, campaign config, bid strategy, and traffic quality are all stable or improving. If the MB CVR leak is real, the root cause is downstream of acquisition (LP/checkout/payment on mobile), not in Google Ads campaign setup.

This is the key handoff to the parent RCA: **paid traffic is not degraded; investigate the mobile conversion path itself.**

---

## 7. Red Flags

| Severity | Issue | Evidence |
|---|---|---|
| MEDIUM | English campaign budget-lost IS at 11.3% on 38% of Search CM1 | Section 3 |
| LOW | Universal high rank-lost IS (64–84%) across all language cohorts | Section 3 — chronic, not Post-window-specific |
| LOW | CTR softened 0.4pp Post | Section 2 — offset by CVR gain |

No CRITICAL or HIGH paid flags.

---

## 8. Recommended Actions

| # | Action | Owner | Est. Impact | Why |
|---|---|---|---|---|
| 1 | Raise English campaign daily budget from $500 → $600 | Perf | +$1K–1.5K rev / L4W | Budget-lost IS 11.3%; rank ceiling means most extra budget will recover bid-eligible auctions |
| 2 | Investigate quality-score / ad strength on English campaign to address 75.7% rank-lost IS | Perf | +$10K rev / L4W per 10pp SIS recovered | Rank — not budget — is the dominant constraint |
| 3 | Split funnel by device (Section 7 of standard audit) to localize MB CVR leak | Analytics | n/a | Audit blended view shows healthy paid; device split needed to size MB-specific issue |
| 4 | Pull auction-insights CSV next cycle to confirm no competitive pressure | Perf | n/a | Currently inferring competition absence from cohort SIS only |

---

## 9. Conclusion for CVR-RCA Cascade

The paid channel is **not** the cause of the Pre→Post CVR cascade for CE 252. Paid acquisition delivered improved CVR (+0.7pp), improved ROI (+17.8pp), and grew revenue +32% Post vs Pre on the very same window. If the cascade-fix landed on Paid · Google Ads · MB, the residual signal is almost certainly a **mobile conversion-path issue downstream of the ad click** (LP load, mobile checkout, payment friction), not an upstream campaign/bid/targeting issue.
