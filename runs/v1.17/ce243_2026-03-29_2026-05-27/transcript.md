# Investigation Transcript — CE 243 · Eiffel Tower Tickets
Pre: 2026-03-29 to 2026-04-27 | Post: 2026-04-28 to 2026-05-27 | Market: France | Direction: DECLINE

## Tree map
L0: **CVR declined −0.18pp at CE level (3.07% → 2.89%, −5.8%)** · structural −0.32pp vs LY +0.14pp on same window · gradual · Shapley: S2C −0.12pp (69%, **only significant step**) · LP2S −0.04pp (22%) · C2O −0.01pp (8%, flat)
├─ L1a: Cascade L1 MB vs HO  →  CONFIRMED — MB primary (96% share), conversion-driven (−0.21pp); HO small mix tailwind, MB conversion dominates → fix MB
├─ L1b: Cascade L2 Paid vs Organic (within MB)  →  CONFIRMED — Paid 73% share (flat), both segments declined; conversion-driven (−0.12pp within MB); mix essentially zero → fix Paid
├─ L1c: Cascade L3 Channel within Paid MB  →  CONFIRMED — Google Ads 82% share (flat); CVR 3.39% → 3.31% conversion-driven; Microsoft Ads also declined slightly. Fix Google Ads. → **Fixed segment: MB · Paid · Google Ads** (LP2S 46.16% → 46.31% flat, S2C 23.70% → 22.25% **−1.45pp**, C2O 30.99% → 32.10% +1.11pp)
├─ L2a: S2C decline driver (single significant step, 69% Shapley)  →  CONFIRMED — concentrated on Desktop × TGID 23604 (Eiffel Tower Guided Tour by Elevator: Reserved Entry to Summit or Second Floor): Non-Geo Desktop −3.6pp (4,794 → 4,130 selects), Geo Desktop −8.9pp (490 → 375); all 4 mobile cells flat; gradual onset ~mid-May. Supply healthy (~946 0-2d tickets/day across 3 TIDs); price actually *fell* −8.8%. **LEAF: Desktop-specific friction on TGID 23604's select page** — mechanism untested in data; consistent with select-page UX, variant complexity, or competitive comparison behavior unique to desktop visitors. Session recordings needed to confirm.
├─ L2b: LP2S decline (−0.04pp Shapley, 22%)  →  CONFIRMED partial — late-May LP2S softness on the fixed segment (40-43% range May 23-27 vs 45-51% earlier post); contributes a small CE-level Shapley share. Same gradual timing as S2C decline. Same-mechanism candidate (whatever changed on the LP/select page late May affects both). Low magnitude; no independent investigation needed.
└─ L2c: C2O essentially flat (8% Shapley, below threshold)  →  RULED OUT — C2A −0.45pp / A2O +0.57pp on summary.json; within fixed segment C2O actually rose +1.11pp. No mechanism to investigate.

## Root cause confirmed
CE 243 Eiffel Tower Tickets declined −0.18pp CVR at CE level (3.07% → 2.89%, structural −0.32pp vs LY +0.14pp same-window). Inside the fixed segment **MB · Paid · Google Ads**, S2C is the only significant funnel-step driver (−1.45pp; 69% of total Shapley delta). The leak is concentrated on **Desktop visitors browsing the dominant TGID 23604** (Eiffel Tower Guided Tour by Elevator: Reserved Entry to Summit or Second Floor) — Non-Geo Desktop S2C fell from 29.1% → 25.5% (−3.6pp on 4,130 post selects, ~149 lost checkouts), Geo Desktop fell 24.9% → 16.0% (−8.9pp on 375 post selects, ~33 lost checkouts). Mobile S2C on the same TGID was flat across iOS and Android, both Geo and Non-Geo. The decline onset is gradual from approximately May 14 onward, not a single-day deploy break.

What it is **not**: not a supply story (inventory_availability on TGID 23604's 3 active TIDs shows abundant near-term and forward inventory — median ~946 0-2d tickets/day and 14,000+ in the 14-30d bucket), not a price story (median price actually fell 8.8% pre/post), not a catalogue-change story (no high-volume TGID launched mid-window), not a mobile-UX regression (all four mobile cells flat). The Desktop-only concentration on a single TGID, with no upstream supply/pricing change, points to either a Desktop-specific select-page UX regression on TGID 23604 (variant rendering, date-picker behaviour, comparison shopping behavior unique to desktop), or a competitive shift visible to desktop multi-tab shoppers but not to mobile single-tab shoppers. Both warrant session recordings on Desktop visitors landing on TGID 23604's select page in late May.


---

## L0 — Orient
**mix_dominance:** is_dominant=False. mbho_mix_share=0.257, channel_mix_share=0.701. Channel mix shift is meaningful (Paid grew 71.5% → 73.7%) but not dominant; conversion effects lead at every level.
**shapley:** S2C is the only significant step (−0.12pp, 69% of total ΔCVR). LP2S secondary at 22%. C2O at 8% is below the 10% threshold — no independent investigation needed.
**trend_context:** structural_delta_cvr = −0.32pp. LY same-window was +0.14pp → genuine underlying decline, not seasonal. pre_period_healthy=True. Gradual rather than sharp break.
**MB/HO:** MB primary (96% share). MB conversion-driven (−0.21pp); HO mix tailwind +0.03pp.
**Channel (whole CE):** Paid grew share +2.24pp (mix tailwind of +0.08pp on Paid alone), but Paid CVR fell −0.26pp (conversion headwind of −0.19pp). Conversion dominates.
**c2o_sub:** C2A 37.30% → 36.85% (−0.45pp, slight). A2O 81.75% → 82.32% (+0.57pp, slight). Neither sub-step moved meaningfully — C2O is genuinely flat.
