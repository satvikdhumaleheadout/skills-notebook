# Perf Audit Summary — Antelope Canyon (CE 3593)

**Window:** YoY 2026-01-01..2026-05-27 vs 2025-01-01..2025-05-27 (147 days)
**Market:** North America (US) · **Status:** WARNING

## Verdict on the CVR-RCA finding
The cascade's +1.97pp paid CVR lift (5.16% → 7.13%) is **confirmed real** but is overwhelmingly the mechanical outcome of the **tCPA → tROAS bidding migration + Feb 2026 account consolidation**, not an organic improvement. Smart Bidding under MAXIMIZE_CONVERSION_VALUE bought higher-quality clicks (CTR +62% from 8.97% to 14.50%, click-CVR +47% from 3.94% to 5.79%) at modestly higher CPC ($1.72 → $2.00, +16%). YoY blended ROI held flat at 1.29 (vs 1.31 prior).

## Headline numbers (Google Search, YoY)
- Spend: $164,896 → $268,852 (+63%)
- Orders: 3,780 → 7,778 (+106%)
- Revenue (BQ): $249,526 → $389,843 (+56%)
- CM1 (BQ): $216,680 → $346,605 (+60%)
- ROI (CM1/spend): 1.31 → 1.29 (-1.5%)
- SIS: 44.9% → 23.7% (not strictly comparable post-consolidation; MoM trajectory Dec 24.5% → May 25.8%)
- Rank-lost IS: 53.8% → 66.2% (+12pp)
- Budget-lost IS: 1.3% → 10.1% (still below 10% threshold so not flagged as constraint)

Bing: spend +17%, orders +39%, ROI 1.64 → 1.40 (-15%).

## Key surprise (worth escalating)
**Monthly ROI trajectory has collapsed in the latest window.** YTD ROI masks a steep decline:
Jan 1.61 → Feb 1.62 → Mar 1.41 → Apr 1.17 → **May 0.47**.
Trailing-8-week per-campaign ROI: English (tROAS 167) = 0.85; Other Languages (tROAS 158) = 0.91 — 50–60% of target, far outside Smart Bidding's normal 15% variance band. Budget is NOT the constraint (budget-lost IS ≈ 0 in those campaigns); rank-lost IS is 67–87%.

Two competing hypotheses:
1. **May 2026 CM1 attribution incomplete** (offline conversions still landing) — would explain the sudden cliff. Validate first.
2. **Real efficiency degradation** under tROAS — Smart Bidding entering auctions where actual value falls well short of predicted. If real, expected to recover as algorithm learns or worsen if structural (query mix, LP regression, margin compression).

## Funnel reconciliation (from CVR-RCA cascade)
- LP2S **regressed** -3.14pp (46.58% → 43.44%) — biggest concern despite higher click quality (CTR +62%). Points to landing page / Page UX issue at `antelope-canyon-tours.com/`.
- S2C +3.04pp · C2O +7.52pp (C2A +5.12pp, A2O +7.01pp) — checkout improvements likely structural and durable. Shapley: C2O drove 89% of the CVR delta.

## Ad-group mix (POST)
- Tour: 75% of spend, ROI 1.69, CVR 5.99% (up from 4.74%) — the engine of the YoY win
- Generic/Brand: 18% of spend, ROI 1.38 (spend down -11% YoY, consistent with tROAS reallocation)
- Tickets: 8% of spend, ROI 1.53 — profitable but no dedicated campaign, sits inside Page-type AGs

## Campaign roster
4 active campaigns in consolidated "North America" account, all Search:
- Page - Antelope Canyon - English - All - All (tROAS 167)
- Page - Antelope Canyon - Other Languages - All - All (tROAS 158)
- Page - Las Vegas → Antelope Canyon - English - All (Portfolio: "North America - Existing CEs")
- Page - Antelope Canyon - Spanish - All (Portfolio: same)

All pre-consolidation campaigns ("Transitioned", "Merged", "Rest Of Usa" account) are intentionally PAUSED per Feb 2026 consolidation playbook — do not flag.

## Top recommended actions
1. **Diagnose May-2026 ROI cliff** before any bid changes — validate CM1 attribution completeness, then check LP CR, query-mix shift, broad-match overflow. Maintain tROAS in the meantime.
2. **Audit landing page** `antelope-canyon-tours.com/` for LP2S regression (-3.14pp) — paid CTR rose +62%, click quality is higher, so the LP is the leak.
3. **Validate SIS=0% anomaly** on all 4 active campaigns in trailing 8 weeks — likely a reporting artifact post-consolidation.
4. **Pull auction insights + search terms CSVs** for consolidated NA account to size competitive pressure (rank-lost +12pp YoY) and check Tickets/Tour coverage.
5. **Investigate Bing ROI compression** 1.64 → 1.40.

## Confidence
- Paid-side confirmation of CVR lift: **High** (BQ campaign + ad-group data both align)
- Causal attribution to tROAS migration: **High** (timing, CTR + CVR pattern, ROI flat suggests algorithmic effect not organic)
- Latest-month ROI cliff severity: **Medium-High** (real in BQ but May attribution may be incomplete)
- LP2S regression as the funnel leak: **High** (cascade Shapley + paid CTR rise both confirm)

Full report: `/Users/apple/Documents/CVR RCA Runs/ce3593_2025-01-01_2026-05-27/perf_audit_report.md`
