# Investigation Transcript — CE 3593 · Antelope Canyon
Pre (LY 2025): 2025-01-01 to 2025-05-27 (147 days) | Post (YTD 2026): 2026-01-01 to 2026-05-27 (147 days) | Market: North America | Direction: **IMPROVEMENT**

## Tree map
L0: **CVR rose +1.22pp YoY (4.93% → 6.15%, +24.8%)** · traffic +72.6% YoY · gradual · Shapley: C2O +1.08pp (89%, primary) · S2C +0.53pp (43%) · LP2S −0.39pp (−32%, headwind). C2O sub-decomp: C2A +5.12pp AND A2O +7.01pp (both meaningful).
├─ L1a: Cascade L1 MB vs HO  →  CONFIRMED — MB primary (96% share, grew +2.64pp); MB conversion-driven (+1.30pp); HO declined on both share and rate (small absolute) → fix MB
├─ L1b: Cascade L2 Paid vs Organic (within MB)  →  CONFIRMED — Within MB: Paid share 88% → 73%, Organic share 12% → 27% (organic grew 4.1x in users, 9,739 → 40,120). Conversion dominates within MB (+1.60pp vs mix +0.06pp). Fix Paid.
├─ L1c: Cascade L3 Channel within Paid MB  →  CONFIRMED — Google Ads 88% share post (grew +5pp); CVR jumped 5.31% → 7.28% (+1.97pp). Microsoft Ads also lifted (4.65% → 6.29%). Fix Google Ads. → **Fixed segment: MB · Paid · Google Ads** (LP2S 51.31% → 51.43% FLAT, S2C 29.33% → 33.14% **+3.81pp**, C2O 35.31% → 42.70% **+7.40pp**, CVR 5.31% → 7.28%)
├─ L2a: URL-level — multi-subdomain microsite strategy launched in 2026  →  **CONFIRMED LEAF** — Ken's Tours (`kens-tours.antelope-canyon-tours.com`) 22k users at 11.09% CVR; Taadidiin Tours subdomain 6k at 8.34%; Canyon X subdomain 3.3k at 7.21%; Lower/Upper/Navajo subdomains another ~3.7k combined. Together these 6 new subdomains absorbed 32% of post LP traffic share, all converting at 7-11% CVR vs the main domain's 6.67%. This is the structural #1 driver of the CE-level lift.
├─ L2b: C2O improvement on fixed segment (+7.40pp)  →  CONFIRMED — sub-decomp: C2A 41.92% → 47.58% (+5.66pp) AND A2O 84.22% → 89.75% (+5.53pp). Both substantial. A2O improvement is broad across nearly every TGID (+1-6pp per TGID), suggesting a CE-wide platform/payment/fraud-rule infrastructure fix.
├─ L2c: S2C improvement on fixed segment (+3.81pp)  →  CONFIRMED — concentrated on top TGIDs (29649 Lower Antelope Canyon: 9.4k → 30.9k selects, +228% growth; 29647 Antelope Canyon X: +53%; 29650 Upper Antelope Canyon: +95%). TGID 30270 (generic name) declined −46% suggesting demand reallocation to specific named tours.
├─ L2d: Catalogue change (Pattern 11)  →  CONFIRMED (partial) — TGID 40324 "Dixie's Lower Antelope Canyon Tour" created 2026-01-20 (true new launch); TGID 32732 "Secret Antelope Canyon & Horseshoe Bend" existed since 2025-03 but scaled traffic in 2026 (price dropped $195 → $149, -23.6%); review counts grew 3-5x on top TGIDs (29649: 351 → 1,740; 30270: 752 → 3,108; 29650: 254 → 824) — social-proof maturation.
├─ L2e: LP2S CE-level decline (−3.14pp)  →  CONFIRMED RULED OUT as a per-user mechanism — within fixed segment LP2S is FLAT (51.31% → 51.43%). The CE-level "decline" is entirely a routing/mix effect: organic surge (Organic LP2S 32.82% in post) diluting the weighted average. Within Paid Google Ads, LP2S held steady. Not a real conversion-side headwind.
└─ L2f: Geo (US domestic vs Non-Geo)  →  CONFIRMED — broad lift across both: Geo US CVR 5.68% → 7.66% (+1.98pp on +59% volume); Non-Geo CVR 4.16% → 6.11% (+1.95pp on +69% volume). Improvement is structural, not geo-specific.

## Root cause confirmed
CE 3593 Antelope Canyon posted a substantial YoY CVR improvement of +1.22pp (4.93% → 6.15%, +24.8%) on a 147-day YTD-2026 vs same-period-2025 comparison, with LP volume +72.6%. Within the fixed segment **MB · Paid · Google Ads**, the lift is **structural and multi-causal**, not single-mechanism:

(1) **Multi-subdomain microsite expansion** — six new vendor/category-specific subdomains (Ken's Tours, Taadidiin Tours, Canyon X, Lower Antelope Canyon, Upper Antelope Canyon, Navajo) absorbed 32% of post fixed-segment LP traffic in 2026, converting at 7–11% CVR vs the main microsite's 6.67%. Ken's Tours alone (22k users at 11.09% CVR) generates ~2.4k orders — a structural mix shift toward higher-converting properties. The main microsite's LP traffic share fell from 80.6% → 65%; its absolute volume grew (58k → 69k) but its share fell as the subdomains absorbed incremental SEO surface.

(2) **CE-wide A2O infrastructure fix** — A2O improved +5.53pp on the fixed segment (84.22% → 89.75%) and +1–6pp across nearly every TGID independently. The breadth across TGIDs rules out a per-product cause; consistent with a platform-level change (fraud rule loosening, payment gateway improvement, or live inventory sync upgrade). Investigation should query `order_attempted_events_v2` to localize the mechanism but the cohort breadth is the diagnostic signal.

(3) **C2A checkout-side improvement (+5.66pp on fixed segment)** — checkout-form abandonment fell sharply. Possible mechanism: the new subdomain checkout flows have a different (better) UX, or a CE-wide checkout deploy reduced friction. Worth localizing whether C2A improved on the main domain alone or across subdomains.

(4) **Catalogue & content maturation** — TGID 40324 (Dixie's Lower Antelope Canyon) launched 2026-01-20; TGID 32732 (Secret Antelope Canyon) scaled traffic from 2025-launch through 2026 with a 23.6% price reduction (-$46). Top TGIDs' review counts grew 3–5x YoY (lower bound on social-proof maturation): TGID 29649 jumped 351 → 1,740 ratings (+395%); TGID 30270 752 → 3,108 (+313%); TGID 29650 254 → 824 (+225%). These compound with the subdomain expansion.

(5) **TGID restructure within the CE** — generic TGID 30270 ("Antelope Canyon Tour with Navajo Guide") declined 18.4k → 9.9k selects, while specific named tours grew: TGID 29649 "Lower Antelope Canyon" +228%, TGID 29647 "Antelope Canyon X" +53%, TGID 29650 "Upper Antelope Canyon" +95%. Demand reallocated to named specific products, all of which have higher CVR than the generic.

Headwind / non-issues:
- CE-level LP2S "decline" (-3.14pp at headline) is **not a per-user funnel weakening** — it's the weighted-average dilution from the organic surge (organic users have lower LP2S 32.82% vs paid 51.43%). Within the fixed segment LP2S is flat. Not actionable as a funnel fix.
- HO segment fell on both share (6.07% → 3.43%) and CVR (4.60% → 4.06%), but at 3% of CE volume the impact is small. The mix shift toward MB (now 96.57% share) is also a tailwind: MB CVR (6.44%) is higher than HO CVR (4.06%).


---

## L0 — Orient
**direction:** IMPROVEMENT — CVR rose substantially YoY (+1.22pp absolute, +24.8% relative).
**comparison shape:** This is a 147-day YoY (2026 YTD vs 2025 same calendar period), not the skill's default 30/30. Seasonal pattern preserved (both windows span Jan→May). No further LY subtraction needed; the comparison IS LY vs current. `structural_delta_cvr` is `None` from the pipeline — correct for this window shape.
**mix_dominance:** is_dominant=False. mbho_mix_share=0.208, **channel_mix_share=1.131** (high — channel mix shift is meaningful: Paid 89% → 75%, Organic 11% → 25%, a 14pp swing).
**shapley:** C2O dominates (+1.08pp, 89%). S2C contributes (+0.53pp, 43%). LP2S is the only negative (−0.39pp, −32%) — a real headwind. All three steps significant.
**c2o_sub:** C2A 42.17% → 47.29% (+5.12pp) AND A2O 82.22% → 89.23% (+7.01pp). **Both checkout sub-steps improved substantially.** This is rare — most C2O moves are dominated by one sub-step. Worth understanding the mechanism on each.
**MB/HO:** MB primary (96% share post, grew from 94%). MB CVR 5.06% → 6.44% (+1.38pp) — conversion-driven. HO share fell 6.07% → 3.43%; small absolute. Fix MB.
**Channel (whole CE):** Paid CVR 5.12% → 7.13% (+2.01pp, large per-user lift). Organic share grew 10.8% → 25.15% (+14.35pp) at flat CVR (4.53% → 4.38%). Story: Paid conversion improved AND organic surged in share at lower CVR — net effect is conversion-positive (+1.77pp from conversion, slight −0.08pp drag from mix).
**Volume context:** +72.6% LP users YoY. This is a massive traffic expansion — most likely organic SEO gains (consistent with organic share doubling). LP2S decline is a candidate for traffic-quality dilution.
