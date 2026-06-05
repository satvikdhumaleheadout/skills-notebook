## Perf-Audit Insight Summary

**Overall verdict:** HEALTHY

**Traffic quality:**
- SIS trend: IMPROVED — 18.4% → 21.7% (+3.3pp, +18% rel)
- CPC trend: FLAT — $0.925 → $0.915 (-1.1%)
- Paid CVR trend: GAds click-CVR slightly UP (2.38% → 2.46%); Mixpanel paid LP-CVR slightly down (3.51% → 3.25%) in line with overall CE softness, not a paid-quality issue
- Assessment: IMPROVED

**Campaign status:**
- Paused/dormant campaigns in post-period: NONE — all 7 individual tROAS campaigns (EN, DE, ES, FR, IT, NL, Other) and all portfolio campaigns (PL, DA, PT, RU, SV, NO + Madame Brasserie variants) are ENABLED and spending
- tROAS self-suppression: NOT OBSERVED — individual campaign targets 143-160%, within Pro+ standard; revenue-based ROI steady at ~8x
- Budget exhaustion: NO — budget-lost IS = 0.06% in post; budget is not the constraint

**Key finding (one sentence):** Paid·Google Ads·MB is healthy — spend, CPC, SIS, and revenue-based ROI all stable or improving; the CVR-RCA cascade lands here mechanically because paid is 70% of CE 243 sessions, but the actual S2C drop is CE-wide (driven by select-page experience) and not originated by paid acquisition.

**Surprise / new hypothesis (optional):** The GAds `sum_conversion_value_calculated_contribution_margin` field shows a severe attribution lag — weekly CM1 ROI decays from 1.46x (Mar 23) → 0.04x (May 18) while revenue-based ROI stays at 8x throughout. This is a data-engineering artifact (cost/CM allocation hasn't caught up to recent bookings), not a real efficiency collapse — but any dashboard or audit using CM1-ROI for last-4-week decisions on CE 243 (or likely other CEs) is being misled. Worth flagging to Data Eng beyond this RCA.
