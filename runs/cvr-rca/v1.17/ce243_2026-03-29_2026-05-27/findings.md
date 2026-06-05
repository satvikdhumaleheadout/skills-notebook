# Findings — CE 243 Eiffel Tower Tickets
Pre: 2026-03-29 to 2026-04-27 | Post: 2026-04-28 to 2026-05-27 | Market: France | Direction: DECLINE

## Root cause
CVR declined −0.18pp at CE level (3.07% → 2.89%), and structurally −0.32pp once LY's same-window pattern is subtracted (LY went +0.14pp over the same calendar). The single significant funnel-step driver is **S2C −1.45pp on the fixed segment MB · Paid · Google Ads** (69% of total Shapley delta). The S2C leak is concentrated on **Desktop visitors browsing the dominant TGID 23604** (Eiffel Tower Guided Tour by Elevator: Reserved Entry to Summit or Second Floor) — Non-Geo Desktop S2C fell from 29.1% → 25.5% (−3.6pp on 4,130 post selects), Geo Desktop fell 24.9% → 16.0% (−8.9pp on 375 post selects). All four mobile cells (iOS × Geo, iOS × Non-Geo, Android × Geo, Android × Non-Geo) held flat. The decline onset is gradual from approximately May 14 onward.

## Mechanism
Desktop visitors reaching TGID 23604's select page (the date/variant picker) from a Google Ads MB click increasingly abandoned without proceeding to checkout, starting mid-May. The mechanism is *not* upstream (supply, pricing, catalogue, traffic quality) — every upstream signal checks out as healthy or improving:
- **Supply healthy**: `inventory_availability` Path A medians for TGID 23604's 3 active TIDs show ~946 0-2d tickets/day combined, ~3,145 in 3-7d, ~5,011 in 8-13d, ~16,652 in 14-30d. Abundant near-term and forward inventory.
- **Price fell, not rose**: median `final_price_usd` on TGID 23604 dropped from $41.12 → $37.52 (−8.8%). If anything, the price signal should *help* S2C, not hurt it.
- **No catalogue change**: no high-volume TGID launched in the post window; a few small TGIDs (50-700 select rows) dropped out in early April but their volume is negligible vs TGID 23604's ~19k selects.
- **Not a mobile regression**: iOS and Android S2C on TGID 23604 held flat in both Geo and Non-Geo cells; the leak is *only* on Desktop.

What's left is a **Desktop-specific friction on TGID 23604's select page** — candidate mechanisms:
1. **Select-page UX regression visible to Desktop only** — TGID 23604 has 3 active TIDs (46405 "2nd floor + guided", 46406 "summit + guided", 46443 "summit + cruise combo"). Desktop displays all variants at once (more space); mobile presents them sequentially or collapsed. A change to variant rendering, comparison layout, or date-picker behaviour on the desktop view could create decision friction that mobile users don't encounter.
2. **Comparison-shopping behavior unique to Desktop** — desktop users multi-tab; mobile users single-tab. A competitor (GYG, Viator, direct booking site) that became more attractive in mid-May (lower price, better content, faster booking flow) would be visible to desktop comparison shoppers but invisible to mobile single-tab buyers. The −8.8% price drop on TGID 23604 may indicate Headout was *responding* to such pressure rather than causing the issue.
3. **Late-May LP2S softness** (40-43% range vs the 45-51% earlier post readings) emerges on roughly the same days as the S2C decline. Whatever changed on the listing/select page in mid-May appears to affect both stages, with S2C taking the larger hit.

Session recordings on Desktop visitors landing on TGID 23604's select page in late May are required to localize the mechanism — the data has narrowed to a specific URL/device combination but cannot identify the on-page behaviour change from numbers alone.

## Timing
Gradual decline from approximately May 14 onward. Daily S2C on the fixed segment was running 22-28% through April and early May, then trends into the 20-22% range from May 14-27, with several days in the 19.8-21.1% band. Not a sharp deploy break — no single day shows the drop. `pre_period_healthy = TRUE` rules out a depressed pre-window baseline; the decline is genuine.

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|---|---|---|---|
| CVR declined −0.18pp at CE level (3.07% → 2.89%) | headline.delta.cvr = -0.001776 | summary.json | Confirmed |
| Structural delta −0.32pp (LY same-window +0.14pp) | trend_context.structural_delta_cvr = -0.003158; ly_delta_cvr = +0.001435 | summary.json | Confirmed |
| Pre-period not depressed | trend_context.pre_period_healthy = true | summary.json | Confirmed |
| S2C is the only significant funnel-step driver | Shapley: S2C −0.12pp (69%); LP2S −0.04pp (22%); C2O −0.01pp (8%, below threshold) | summary.json | Confirmed |
| MB primary (96% share), conversion-driven | mbho_mix MB conversion_effect = −0.00212 | summary.json | Confirmed |
| Within MB, Paid 73% share (flat), conversion-driven | Cascade L2 BQ: Paid CVR 3.25% → 3.13% on flat share | transcript Cascade L2 | Confirmed |
| Google Ads 82% of Paid MB (flat), conversion-driven | Cascade L3 BQ: Google Ads CVR 3.39% → 3.31% on flat share | transcript Cascade L3 | Confirmed |
| TGID 23604 carries the absolute checkout loss | Experience-level BQ: pre 3,330 → post 2,721 checkouts (−18.3%); 18,856 post selects (54% of fixed segment select volume); S2C 15.76% → 14.43% (−1.33pp) | transcript Experience block | Confirmed |
| Desktop S2C decline is the device locus | Device BQ: Desktop S2C 36.33% → 33.32% (−3pp); iOS 18.59% → 18.76% flat; Android 19.82% → 17.97% (−1.85pp) | transcript Device block | Confirmed |
| Desktop × TGID 23604 cross-cut is the leaf | Cross-cut BQ: Non-Geo Desktop × TGID 23604 S2C 29.1% → 25.5% (−3.6pp); Geo Desktop × TGID 23604 S2C 24.9% → 16.0% (−8.9pp); all 4 mobile cells flat | transcript Cross-cut block | Confirmed |
| Supply on TGID 23604 is healthy | inventory_availability Path A: median 946 0-2d tickets/day, 3,145 in 3-7d, 5,011 in 8-13d, 16,652 in 14-30d across 3 active TIDs | transcript Inventory block | Confirmed |
| Price on TGID 23604 fell, did not rise | product_rankings_features: median $41.12 → $37.52 (−8.8%) | transcript Pricing block | Confirmed |
| No catalogue change in the window | No TGID with ≥50 post-only select rows | transcript Catalogue check | Confirmed |
| Gradual timing, ~May 14 onset | Daily trend on fixed segment | transcript Daily trend block | Confirmed |
| Late-May LP2S softness corresponds to S2C decline | Same daily trend block, LP2S column May 23-27 readings 40-43% | transcript Daily trend block | Consistent with |
| Mechanism is Desktop-specific select-page friction on TGID 23604 | Data narrowed to URL/device locus; on-page behaviour cannot be identified from data alone | Inference from cross-cut + ruled-out upstream | Consistent with |

## Evidence: Paid traffic quality (perf-audit)
- **Verdict:** HEALTHY (overall); traffic quality IMPROVED
- **Key metrics:** SIS 18.4% → 21.7% (+3.3pp); CPC flat ($0.925 → $0.915); paid CVR slightly up on the Google Ads click side (2.38% → 2.46%); no paused/dormant campaigns; no tROAS self-suppression; no budget exhaustion (budget-lost IS = 0.06%)
- **Implication:** **Pattern A — direct corroboration** that paid acquisition is NOT the cause of the S2C decline. The cascade lands on Paid · Google Ads · MB mechanically because Paid is 70% of CE 243 sessions, but the actual S2C drop is page-side (Desktop × TGID 23604 select-page friction), not upstream traffic quality or campaign config.
- **Surprise / new hypothesis (informational):** Perf-audit flagged a CM1-ROI attribution lag in `sum_conversion_value_calculated_contribution_margin` — a data-engineering artifact, not a real efficiency collapse, but any dashboard using CM1-ROI for last-4-week decisions is being misled. Out-of-scope for this RCA; worth flagging to Data Eng separately.
- **Source:** perf_audit_summary.md (full report at perf_audit_report.md)

## Open items
- **Session recordings on Desktop visitors to TGID 23604 select page in late May** — required to localize the specific on-page friction (variant rendering, date-picker behavior, etc.). Not yet pulled.
- **Competitor comparison check** — GYG / Viator pricing and availability for Eiffel Tower guided summit tickets in late May. Desktop comparison-shopping hypothesis would benefit from this corroboration.
- **Slack reconciliation** — slack_context.md not yet returned at the time findings.md is written. If it returns before report render, reconcile per Step 2b check #9.
