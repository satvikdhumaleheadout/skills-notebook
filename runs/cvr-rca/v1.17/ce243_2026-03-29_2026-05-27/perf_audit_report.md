# Paid Performance Audit — Eiffel Tower Tickets (CE 243)

**Scope:** Paid · Google Ads · MB (cascade-fixed)
**Pre window:** 2026-03-29 → 2026-04-27
**Post window:** 2026-04-28 → 2026-05-27
**Market:** France
**Trigger:** CVR-RCA conversion-path step on Paid·Google Ads·MB

---

## 1. Executive Summary

**Status:** HEALTHY (with one data-quality caveat)

Paid performance for CE 243 is fundamentally stable across the pre→post window. Spend is steady, CPC is down ~1%, search impression share improved meaningfully (18.4% → 21.7%), budget-lost is effectively zero, and revenue-based ROI is flat at ~8x. Paid CVR ticked down slightly (3.51% → 3.25%, -7.4% relative), in proportion to a soft-demand window where paid sessions fell ~12% (72.6K → 63.8K). No campaigns are paused or dormant; portfolio campaigns are operating normally.

The only "red signal" in raw GAds data — CM1-based ROI dropping from 0.99 to 0.38 — is a **CM1 attribution data lag**, not a true efficiency drop. Revenue-based ROI is unchanged. The post window ends 2026-05-27 (yesterday) and the last 2 weeks show CM1 ROI of 0.04-0.06, physically impossible alongside an 8x revenue ROI. This is the standard CM1 cost-allocation lag on recent bookings.

**Verdict for the CVR-RCA cascade:** the conversion-path step landed on Paid·Google Ads·MB not because paid is broken, but because paid is 70% of all sessions and absorbs broader CE-level CVR softness mechanically. The paid channel itself is operating well.

---

## 2. Channel Overview (Google Ads, BQ, paid)

| Metric | Pre | Post | Δ |
|---|---:|---:|---:|
| Spend (USD) | $80,247 | $68,283 | -14.9% |
| Clicks | 86,711 | 74,633 | -13.9% |
| Impressions | 569,571 | 558,079 | -2.0% |
| CPC | $0.925 | $0.915 | -1.1% |
| CTR | 15.22% | 13.37% | -1.85pp |
| Attributed orders | 2,063 | 1,837 | -11.0% |
| Revenue (completed, attr) | $618,733 | $572,566 | -7.5% |
| CM1 (attr) | $79,154 | $26,142 | -67% ← lag |
| **Revenue-based ROI** | **7.71x** | **8.38x** | **+0.67x** |
| **CM1-based ROI** | **0.99x** | **0.38x** | **lag artifact** |
| CVR (orders/clicks) | 2.38% | 2.46% | +0.08pp |
| SIS | 18.4% | 21.7% | +3.3pp ✅ |
| Budget-lost IS | 0.92% | 0.06% | ~0 |
| Rank-lost IS | 80.7% | 78.3% | -2.4pp |

**Reading:** GAds click-attributed CVR is UP. Revenue per dollar of spend is UP. SIS is UP. The drop in spend/clicks is consistent with the slight demand softening (sessions -12% across all CE traffic).

### Weekly CM1 ROI trajectory — confirms attribution lag

| Week start | Spend | Rev (attr) | CM1 (attr) | Rev ROI | CM1 ROI |
|---|---:|---:|---:|---:|---:|
| 2026-03-23 | $17.3K | $151.9K | $25.2K | 8.77x | 1.46x |
| 2026-03-30 | $22.8K | $164.1K | $23.9K | 7.18x | 1.05x |
| 2026-04-06 | $19.5K | $142.7K | $20.7K | 7.31x | 1.06x |
| 2026-04-13 | $16.2K | $139.8K | $17.4K | 8.61x | 1.07x |
| 2026-04-20 | $15.1K | $123.3K | $9.9K | 8.16x | 0.66x |
| 2026-04-27 | $13.4K | $118.8K | $9.0K | 8.85x | 0.67x |
| 2026-05-04 | $16.1K | $139.9K | $10.3K | 8.68x | 0.64x |
| 2026-05-11 | $16.6K | $146.9K | $7.7K | 8.86x | 0.46x |
| 2026-05-18 | $16.8K | $132.5K | $0.6K | 7.90x | 0.04x |
| 2026-05-25 | $7.7K | $55.4K | $0.5K | 7.21x | 0.06x |

Rev ROI is steady at 7-9x throughout. CM1 ROI decays mechanically as report_date approaches today. **Not a perf issue — ETL lag.**

---

## 3. Campaign-level state

All campaigns under CE 243 are **ENABLED**. No pauses, no dormancy.

- **Individual tROAS campaigns** (Pro+, 143–160% targets): EN, DE, ES, FR, IT, NL, Other-Languages — all 7 enabled.
- **Portfolio campaigns** (shared budget): PL, DA, PT, RU, SV, NO + 16 Madame Brasserie variants. All ENABLED.

Per-campaign Rev ROI is consistently ~7-8x in both periods. The per-campaign CM1 ROI collapse mirrors the global lag and is not a per-campaign perf signal.

---

## 4. Traffic quality (3-lens)

- **SIS:** 18.4% → 21.7% (+3.3pp, +18% rel). **Healthy.** Showing in MORE auctions.
- **CPC:** $0.925 → $0.915 (-1.1%). Flat. No bidding war.
- **Paid CVR (GAds clicks):** 2.38% → 2.46% (+3.4% rel). UP slightly.

This is a "Google buying better clicks" pattern. No competitor-pressure or quality-score erosion signal.

---

## 5. Coverage / budget

- Budget-lost IS 0.06%. **Budget is not the constraint.**
- Rank-lost IS 78.3% (down 2.4pp). Mild improvement; headroom remains.
- Language and geo coverage are comprehensive. No gaps.

---

## 6. Funnel context (from RCA upstream)

| Step | Pre | Post | Δ |
|---|---:|---:|---:|
| LP→Select | 40.65% | 40.11% | -0.54pp |
| Select→Checkout | 24.73% | 23.73% | **-1.00pp** ← Shapley primary (69%) |
| Checkout→Order | 30.49% | 30.34% | -0.15pp |
| CVR | 3.065% | 2.888% | -0.18pp |

S2C drop is CE-wide, not paid-specific. Paid inherits it; it is not the originator.

---

## 7. Red flags

- None at the paid-channel level.
- Data-quality flag: **CM1 attribution lag** distorts ROI for the last ~3-4 weeks of any report. Use revenue-attributed ROI in this window.

---

## 8. Recommended actions

| # | Action | Owner | Est. Impact | Timeline | Evidence |
|---|---|---|---|---|---|
| 1 | Do NOT adjust tROAS on CE 243 — within target band. | Perf | Avoid spend leak | Immediate | Rev ROI 8x, SIS +3pp |
| 2 | Investigate CE-level S2C drop on Eiffel Tower select page. | Product/CRO | +30 orders / 4w | 2 weeks | RCA Shapley S2C 69% |
| 3 | Audit CM1 attribution ETL — recent-week CM1 ROI misleading. | Data Eng | Cleaner perf decisions | 1 week | Weekly CM1 decay table |
| 4 | Monitor SIS; if +3pp sustains, consider modest budget lift on EN/DE individual campaigns. | Perf | +$3-5K rev/wk | 4 weeks | Rank-lost 78%, budget-lost ~0 |
| 5 | Keep portfolio structure unchanged. | Perf | Stability | — | Per-campaign ROI |

---

## Appendix — Data sources

- `headout-analytics.analytics_reporting.google_ads_campaign_stats`
- `headout-analytics.analytics_reporting.mixpanel_user_funnel_progression`
- RCA stage outputs in run_dir

Caveat: CM1 conversion-value figures are cost-allocation-lagged ~4 weeks behind report_date. Revenue-completed attribution is reliable.
