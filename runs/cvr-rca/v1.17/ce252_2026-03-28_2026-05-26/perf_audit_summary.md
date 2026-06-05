## Perf-Audit Insight Summary

**Overall verdict:** HEALTHY

**Traffic quality:**
- SIS trend: stable (English cohort 13.0% L4W, rank-lost 75.7%, budget-lost 11.3%; other languages 15–36% SIS, rank-lost 64–84%, budget-lost ≤6.1%)
- CPC trend: up 5% (paid blended $0.80 → $0.84) — offset by RPC +16%, so efficiency-positive
- Paid CVR trend: up 0.7pp (3.12% → 3.86%)
- Assessment: IMPROVED

**Campaign status:**
- Paused/dormant campaigns in post-period: none (all 12 active language Search campaigns spent in L4W; the ~33 $0-spend campaigns are intentional placeholders from Feb 2026 geo-consolidation + tROAS migration, not Post-period pauses)
- tROAS self-suppression (ROI up + clicks down): no (ROI +17.8pp, Clicks +13%, Spend +20% — Google bidding more aggressively, not pulling back)
- Budget exhaustion (spend/budget ≥ 0.95): no (only English campaign has budget-lost IS >10%, at 11.3%; all others ≤6.1%)

**Key finding (one sentence):** Paid Google Ads is healthy and improving Pre→Post (revenue +32%, ROI +17.8pp, CVR +0.7pp on +13% clicks) — paid acquisition is NOT the cause of the CVR cascade, so the residual Paid · Google Ads · MB signal almost certainly reflects a mobile conversion-path leak downstream of the ad click, not an upstream campaign issue.

**Surprise / new hypothesis (optional):** Aggregate paid CVR rose Post, so any mobile-paid CVR regression must be masked by desktop gains and/or language-mix shift — the parent RCA should split the funnel by device on the English/largest cohort to localize the MB-specific leak; the chronic 64–84% rank-lost IS across all language cohorts is a separate, pre-existing structural ceiling worth a Quality-Score deep dive but unrelated to the Pre→Post cascade.
