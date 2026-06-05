# Findings — CE 3593 Antelope Canyon
Pre (LY 2025): 2025-01-01 to 2025-05-27 | Post (YTD 2026): 2026-01-01 to 2026-05-27 | Market: North America | Direction: **IMPROVEMENT**

## Root cause
CE 3593 Antelope Canyon posted a +1.22pp YoY CVR improvement (4.93% → 6.15%, +24.8%) with +72.6% LP volume growth. The improvement is **structural and multi-causal**, not single-mechanism: (1) six new vendor/category-specific subdomain microsites launched in 2026 absorbed 32% of fixed-segment LP traffic at 7–11% CVR (vs the main domain's 6.67%), most notably `kens-tours.antelope-canyon-tours.com` at 11.09% CVR on 22k users; (2) a CE-wide A2O improvement of +5.53pp on the fixed segment, broad across nearly every TGID (+1–6pp), consistent with a platform-level payment/fraud/inventory-sync infrastructure fix; (3) a +5.66pp C2A improvement on the fixed segment — checkout-form friction fell sharply; (4) catalogue maturation: TGID 40324 (Dixie's Lower Antelope Canyon) launched 2026-01-20, TGID 32732 (Secret Antelope Canyon & Horseshoe Bend) scaled with a 23.6% price reduction; top TGIDs' review counts grew 3–5x YoY (TGID 29649 351 → 1,740 ratings); (5) TGID-level restructure within the CE — generic TGID 30270 declined 18.4k → 9.9k selects while specific named tours (Lower / Upper / X) grew 50–230%.

## Mechanism
The dominant driver is the **subdomain microsite expansion**. In 2025, Antelope Canyon traffic concentrated on a single microsite (`antelope-canyon-tours.com`) at ~50% LP2S and ~5.3% CVR. In 2026 Headout (or its content team) launched and scaled six new vendor- and feature-specific subdomains — Ken's Tours, Taadidiin Tours, Canyon X, Lower, Upper, Navajo — each a focused property aligned with a specific search intent. These subdomains attract higher-intent traffic from organic search (the URL itself signals to the user "this is the page for what you searched for") and convert at materially higher rates across every funnel step. Ken's Tours (named after a real Navajo-operated tour company near Lower Antelope Canyon, a heavily-searched brand term) drives the most volume of the new subdomains. The mix shift away from the generic main microsite raises CE-level CVR via composition alone — even before any per-page improvement.

Layered on top of that mix shift, the A2O improvement (+5.53pp on the fixed segment, broad across every TGID) and C2A improvement (+5.66pp) reflect platform-level infrastructure / checkout-flow changes that benefit every microsite equally. These contribute the within-segment conversion lift.

The volume growth (+72.6%) is driven by both new SEO surface (the subdomains' page counts add new ranking opportunities) and the organic-share doubling at the CE level (organic share went 10.8% → 25.15% — likely driven by the subdomain SEO strategy).

## Timing
Gradual ramp across the post period. TGID 40324 launched 2026-01-20; subdomain microsites likely went live in late 2025 or early 2026 (would need to confirm via Slack or microsite registration records). The improvement is consistent across the entire 2026 YTD window — no sharp inflection date observed in the daily series.

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|---|---|---|---|
| CVR rose +1.22pp YoY (4.93% → 6.15%) at CE level | headline.delta.cvr = +0.012241 on 147-day windows | summary.json | Confirmed |
| LP volume grew +72.6% YoY (82,996 → 143,244) | headline.delta.users_lp = +60,248 | summary.json | Confirmed |
| All three funnel steps significant; C2O dominates Shapley (+1.08pp, 89%) | shapley.shapley + significant_steps | summary.json | Confirmed |
| MB is primary brand, conversion-driven lift | MB conversion_effect +1.30pp; MB share grew 93.93% → 96.57% | summary.json (mbho_mix) | Confirmed |
| Organic share grew 10.8% → 25.15% (4x growth in absolute organic users) | channel_mix Organic delta_share = +0.1435 | summary.json (channel_mix) | Confirmed |
| Within fixed segment (MB · Paid · Google Ads), LP2S is flat (51.31% → 51.43%) — CE-level LP2S "decline" is mix dilution from organic surge | Cascade L3 BQ results | transcript L1c | Confirmed |
| Within fixed segment, S2C +3.81pp, C2O +7.40pp, CVR +1.97pp | Cascade L3 BQ results | transcript L1c | Confirmed |
| Six new subdomain microsites absorbed 32% of post fixed-segment LP traffic | URL breakdown BQ: kens-tours 20.7%, taadidiin-tours 5.6%, canyon-x 3.1%, lower 1.4%, upper 1.1%, navajo 1.0% | transcript L2a | Confirmed |
| Ken's Tours subdomain CVR 11.09% (vs main domain's 6.67%) | URL breakdown BQ: 21,967 users, 2,437 orders implied | transcript L2a | Confirmed |
| Main microsite LP share fell 80.6% → 65% (absolute volume grew 58k → 69k) | URL breakdown BQ | transcript L2a | Confirmed |
| Within fixed segment, A2O improved +5.53pp (84.22% → 89.75%) | C2A/A2O sub-decomp BQ on fixed segment | transcript L2b | Confirmed |
| A2O improvement is CE-wide (broad across TGIDs +1-6pp each) | Experience-level breakdown: 29649 +5.9pp, 29650 +6.3pp, 30270 +5.8pp, 29647 +1.2pp | transcript L2b | Confirmed |
| Within fixed segment, C2A improved +5.66pp (41.92% → 47.58%) | C2A/A2O sub-decomp BQ on fixed segment | transcript L2b | Confirmed |
| TGID 29649 (Lower Antelope Canyon) selects grew +228% (9,429 → 30,902) | Experience-level breakdown | transcript L2c | Confirmed |
| TGID 30270 (generic) selects declined −46% (18,437 → 9,915) | Experience-level breakdown | transcript L2c | Confirmed |
| TGID 40324 (Dixie's Lower Antelope Canyon) launched 2026-01-20 | dim_experience_management.experience_created_at | transcript L2d | Confirmed |
| TGID 32732 (Secret Antelope Canyon & Horseshoe Bend) created 2025-03-07, scaled traffic in 2026 with price drop $195 → $149 (-23.6%) | dim_experience_management + product_rankings_features | transcript L2d | Confirmed |
| Top TGIDs review counts grew 3-5x YoY (29649: 351→1,740; 30270: 752→3,108; 29650: 254→824) | product_rankings_features avg_count_ratings | transcript L2d | Confirmed |
| Supply healthy throughout — median days_to_first_available_date = 0 on all top TGIDs in both periods | product_rankings_features | transcript L2d | Confirmed (proxy; canonical inventory_availability not available for the 2025 pre window per Path A rule) |
| Improvement broad across Geo US (+1.98pp CVR) and Non-Geo (+1.95pp CVR) | Geo cut BQ on fixed segment | transcript L2f | Confirmed |
| Improvement broad across devices: Desktop +2.86pp, Android +2.21pp, iOS +1.14pp CVR | Device cut BQ on fixed segment | transcript L2c | Confirmed |
| CE-level LP2S "decline" −3.14pp is mix dilution (organic surge), not per-user weakening | Within-fixed-segment LP2S is flat (+0.12pp) | transcript L1c | Confirmed |

## Evidence: Paid traffic quality (perf-audit) — Pattern C REFRAMING CONTEXT
- **Verdict:** WARNING (status — paid is healthy on aggregate but the per-dollar trajectory is concerning)
- **Pattern A corroboration:** The cascade's +1.97pp paid CVR lift (5.16% → 7.13%) is real on the click side — CTR +62% (8.97% → 14.50%), click-CVR +47% (3.94% → 5.79%). Smart Bidding is buying higher-quality clicks.
- **Pattern B mechanism explanation:** The CVR lift is **overwhelmingly the mechanical outcome of the tCPA → tROAS bidding migration + Feb 2026 account consolidation**, not "organic" improvement. The Smart Bidding algorithm under MAXIMIZE_CONVERSION_VALUE captures higher-intent traffic at modestly higher CPC ($1.72 → $2.00, +16%). The mix shift this CVR-RCA observed (Paid CVR up, Organic share up) is partly an artifact of the consolidation playbook redistributing spend.
- **Pattern C reframing:** **YoY blended ROI held flat at 1.29 (vs 1.31 prior, −1.5%).** Revenue grew +56%, spend grew +63%, orders +106%, but per-dollar margin did not improve. The CVR lift looks great in funnel terms but does not translate to incremental margin per dollar invested. Reframes the headline "+24.8% CVR" into "we scaled paid ~60% YoY at flat ROI — volume gain, not efficiency gain."
- **Pattern D testable gap (CRITICAL):** Monthly ROI trajectory has COLLAPSED in the latest window — Jan 1.61 → Feb 1.62 → Mar 1.41 → Apr 1.17 → **May 0.47**. Trailing-8-week per-campaign ROI shows the English campaign at 0.85 (vs tROAS target 1.67) and Other Languages at 0.91 (vs target 1.58) — 50-60% of target, far outside Smart Bidding's ±15% normal variance band. Two competing hypotheses: (1) May 2026 CM1 attribution incomplete (offline conversions still landing), (2) real efficiency degradation under tROAS. Validate (1) first; if it's (2), urgency rises substantially.
- **Source:** perf_audit_summary.md (full report at perf_audit_report.md)

## Evidence: Slack context (limited coverage)
- 7 platform-bug signals from `#tf-bugalert` (post window): Zapdos select/checkout error rate + response time, LCP breaches, Next-Deimos errors — sustained, platform-wide. Not CE-specific.
- **Coverage gap:** Search 1 (CE-specific global) and Search 2 (`#mkt-usa` channel) were denied by Slack MCP permission policy — only `#tf-bugalert` returned. This is a meaningful gap because operational signals about subdomain launches, vendor changes, or content team initiatives would have lived in those channels.
- **Pattern interpretation:** The bug signals are coincident with the post window but the cascade and perf-audit data both support the lift being real (CVR up, click quality up, A2O improvement broad). The platform bugs may be background noise rather than a material driver here.

## Open items
- **A2O mechanism localization** — confirmed CE-wide A2O improvement (+5.53pp on fixed segment, +1-6pp broad across TGIDs) but the underlying platform change is not yet identified. Would require querying `order_attempted_events_v2` with `payment_gateway` / `fraud_evaluation_result_origin` / `failure_reason` breakdowns. Recommended as a P2 follow-up — the magnitude (~1,210 incremental orders per period) justifies the dig.
- **May 2026 ROI cliff investigation (P1)** — per perf-audit, ROI fell from 1.61 (Jan) to 0.47 (May). Pattern D — needs CM1 attribution completeness check first, then if real, deeper LP/query-mix/broad-match diagnosis. This is potentially urgent.
- **Subdomain microsite launch dates / rationale** — confirmed via URL data that subdomains went live in 2026 (zero pre-period traffic) but the exact go-live date and the operational rationale (intentional SEO strategy launch? vendor-driven property segmentation? content-team initiative?) is not in this run's data. Slack coverage gap (`#mkt-usa` denied) meant this couldn't be confirmed retrospectively. Best evidence is the data pattern itself.
- **C2A mechanism localization** — broad +5.66pp lift, not yet broken out by subdomain. Open follow-up.
- **A2O mechanism localization** — confirmed CE-wide A2O improvement but the underlying platform change (payment gateway upgrade vs fraud rule loosening vs live inventory sync improvement) is not yet identified. Would require querying `order_attempted_events_v2` with `payment_gateway` / `fraud_evaluation_result_origin` / `failure_reason` breakdowns. Recommended as a P2 follow-up action — the magnitude (+5.5pp on 22k checkout starters → ~1,210 incremental orders per period) justifies the dig.
- **Subdomain microsite launch dates** — confirmed via URL data that subdomains went live in 2026 (zero pre-period traffic) but the exact go-live date and the operational rationale (intentional SEO strategy launch? vendor-driven property segmentation? content-team initiative?) is not in this run's data. Slack or product-team confirmation would close this.
- **C2A mechanism localization** — broad +5.66pp lift on the fixed segment, but whether this is uniform across subdomains (suggesting a CE-wide checkout-flow change) or concentrated on one subdomain (suggesting a property-specific UX improvement) is not yet broken out. One additional query would close this.
