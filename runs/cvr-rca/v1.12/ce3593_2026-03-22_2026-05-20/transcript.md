# Investigation Transcript — CE 3593 · Antelope Canyon
Pre: 2026-03-22 to 2026-04-20 | Post: 2026-04-21 to 2026-05-20

## Tree map
L0: CVR essentially flat (−0.08pp, −1.2%) — but mix_dominance.is_dominant=TRUE (mbho 104%, channel 542%), LY +0.44pp vs current −0.33pp → structural −0.77pp, pre_period_healthy=FALSE. Traffic −11.5%, orders −12.6%. Real story is volume loss disguised by offsetting Shapley signs.
├─ L1 cascade MB vs HO: conversion ~flat on MB, MB volume −12.3% · HO small (-19 orders) → CONFIRMED routing direction at L2
├─ L2 cascade Paid vs Organic within MB: Organic MB −25.9% volume → MIX EXIT at L2 (routing story)
├─ L3 (for context) channels within MB Paid: Google Ads −12.6%, Microsoft Ads +24.5% — Google Ads is the volume loser
├─ Routing investigation: URL breakdown within MB → kens-tours subdomain −43% volume (2,699 users lost)
├─ Channel split for kens-tours: Google Ads on kens-tours −46.6% (6,029 → 3,219), CVR held at ~11%
├─ Daily kens-tours Google Ads: 200–260/day through May 6 → 64 on May 7 → 11 on May 8 → essentially zero
└─ LEAF: Google Ads campaign serving kens-tours.antelope-canyon-tours.com paused or disabled on/around May 7, 2026

---

## L0 — Orient
**mix_dominance:** is_dominant=TRUE — extreme values (mbho_mix_share 1.043, channel_mix_share 5.418). Strong routing-story prior.
**shapley:** LP2S −0.38pp (489% — sign-inverted percentage because total delta near zero), S2C −0.06pp, C2O +0.36pp (−466%). All three "significant" because the total ΔCVR is tiny so each step exceeds the 10% noise floor. Real interpretation: LP2S meaningfully declined; C2O meaningfully improved; net cancels.
**c2o_sub:** C2A 47.7% → 49.8% (+2.1pp), A2O 88.4% → 89.6% (+1.2pp). Checkout improved.
**trend_context:** ly_delta_cvr=+0.44pp; current_delta_cvr=−0.33pp; **structural_delta_cvr=−0.77pp**; pre_period_healthy=**FALSE**. The pre window was already below trend; the structural drop vs LY is large.
**Direction:** Despite flat headline CVR, this is a CVR-DECLINE case relative to seasonal expectation. Investigation must focus on (a) the routing story (mix exit signal), and (b) the LP2S decline within whatever segment is fixed or routes out. Headcount: LP −11.5%, orders −12.6% — both materially down.

## L1 — Mix cascade

### Level 1 (MB vs HO)
- MB: 30,070 → 26,364 LP (−12.3%), CVR 6.38% → 6.36% (flat), orders 1,919 → 1,676 (−243)
- HO: 725 → 897 LP (+23.7%), CVR 8.97% → 5.13% (−3.84pp), orders 65 → 46 (−19)
- mix_effect_MB = −0.94% × 6.38% = −0.060pp; conv_effect_MB = 97.65% × −0.02pp ≈ 0pp
- mix_effect_HO = +0.94% × 8.97% = +0.084pp; conv_effect_HO = 2.35% × −3.84pp = −0.090pp
- Sum ≈ −0.07pp matches headline. MB-level conversion ~flat; routing toward HO is a tiny tailwind that cancels with HO's rate decline.
- Decision: Fix MB (97% of volume). Descend to Level 2.

### Level 2 (Paid vs Organic within MB)
- Paid MB: 23,757 → 21,831 LP (−8.1%), CVR 7.34% → 7.12% (−0.22pp), orders 1,744 → 1,555 (−189)
- Organic MB: 8,169 → 6,055 LP (−25.9%), CVR 4.22% → 4.43% (+0.21pp), orders 345 → 268 (−77)
- Total MB pre 31,926, post 27,886 (uses sum from cascade query — includes some users counted in both buckets across sessions)
- Paid share: 74.41% → 78.29% (Δ +3.88pp toward higher-CVR Paid)
- mix_effect Paid = +0.285pp; conv_effect Paid = −0.164pp
- mix_effect Organic = −0.164pp; conv_effect Organic = +0.054pp
- **Net mix effect ≈ +0.121pp · Net conv effect ≈ −0.110pp** — mix-dominant at this level.
- → **MIX EXIT at Level 2** — Organic MB share dropped by 4pp because Organic volume collapsed −25.9%. Funnel rates didn't break; traffic composition shifted.
- Investigation direction: why did Organic MB (and to a lesser extent Paid MB) lose volume? → Routing story.

### Level 3 (for context within MB Paid)
- Google Ads: 21,151 → 18,487 (−12.6%), CVR 7.40% → 7.19% (−0.21pp), orders 1,566 → 1,330 (−236)
- Microsoft Ads: 2,737 → 3,409 (+24.5%), CVR 7.16% → 6.75% (−0.41pp), orders 196 → 230 (+34)
- Google Ads is the paid volume loser. Bing grew partially compensating.

## L2 — Routing investigation (URL & traffic source)

### URL breakdown within MB (top URLs by volume)
- **antelope-canyon-tours.com root: pre 18,295 (52.2%) → post 17,981 (60.1%)** — volume nearly flat, CVR 6.28% → 6.60%. Healthy.
- **kens-tours.antelope-canyon-tours.com: pre 6,276 (17.9%) → post 3,577 (12.0%)** — **−2,699 users (−43%)**, CVR held at 10.79% (pre 10.90%). Lost share 5.9pp.
- taadidiin-tours: 1,496 → 1,356 (−9.4%), CVR 8.36% → 7.67%
- lower.antelope-canyon-tours.com: 819 → 676 (−17.5%), CVR 8.67% → 9.62% (held)
- Other subdomains and content pages: stable or mildly down

kens-tours is the dominant volume loser. Its pre-period CVR was 10.9% — meaningfully higher than the CE average — so losing this slice depresses the CE-wide LP2S average even though its own rates held flat. Order math: 2,699 lost users × 10.9% pre CVR ≈ 294 forgone orders — close to the CE-wide gap of −245 orders (the rest is the C2O improvement offsetting it).

### kens-tours channel breakdown (where did this subdomain lose traffic?)
- Google Ads: 6,029 → 3,219 (−2,810, −46.6%), CVR 10.85% → 11.00% (held)
- Microsoft Ads: 91 → 224 (+146%, small base)
- Other: 442 → 260 (−41%)

Google Ads on kens-tours lost almost exactly the entire volume drop. CVR within Google Ads → kens-tours held at 11%. This is a paid acquisition collapse, not a funnel-quality drop.

### Daily kens-tours Google Ads timeline
| Date | Users LP | Orders |
|---|---|---|
| Apr 25 | 177 | 35 |
| Apr 30 | 237 | 21 |
| May 1 | 225 | 24 |
| May 2 | 212 | 25 |
| May 3 | 230 | 27 |
| May 4 | 257 | 31 |
| May 5 | 236 | 25 |
| May 6 | 209 | 17 |
| **May 7** | **64** | **3** |
| **May 8** | **11** | **1** |
| May 9 onward | 0 (no rows returned) | 0 |

**LEAF: Google Ads campaign(s) serving kens-tours.antelope-canyon-tours.com were paused or disabled on or around May 7, 2026.** Traffic from this source went from ~220/day to essentially zero overnight. Across the post period the campaign delivered 3,219 users; if it had run at the pre rate (~200/day for 30 days) it would have delivered ~6,000 users — the missing ~2,800 users at 11% CVR is ~310 forgone orders, accounting for the bulk of the CE's −245 order shortfall (offset by C2O improvements on the rest of the catalogue).

## Other diagnostics

### Geo overview within MB
- US (Geo): 21,088 → 18,894 (−10.4%), CVR 6.75% → 6.80% (flat), orders 1,423 → 1,284 (−139)
- Italy: 1,141 → 1,031 (−9.6%), CVR flat
- Canada: 955 → 719 (−24.7%), CVR 7.02% → 4.45% (−2.57pp) — small but flagging
- France: 915 → 727 (−20.5%), CVR 5.03% → 5.91% (+0.88pp)
- Germany: 743 → 648 (−12.8%), CVR flat
- Net: US volume drop is the dominant geo signal but per-rate held — consistent with the paid-traffic loss being a US-targeted campaign (kens-tours is a US subdomain).

### Daily MB CVR trend (post period)
Mostly 5.5–8.0%, post-period average roughly matches pre (~6.4%). No CVR break date. The volume break (May 7) shows up as falling daily users in the post window's last 14 days — May 7–20 daily LP users dropped from ~1,100 to ~800 in MB.

## Root cause confirmed
Mix-exit routing story at cascade Level 2 within MB. The dominant mechanism: **a Google Ads campaign serving the kens-tours.antelope-canyon-tours.com subdomain was paused or disabled on or around May 7, 2026**, removing roughly 2,800 users at ~11% CVR from CE-wide traffic in the second half of the post window. The headline CVR ratio looks flat only because the lost traffic was a high-CVR slice (its removal pulls the CE-average LP2S down) while C2O on the remaining catalogue independently improved. Order volume is the truer indicator: −12.6% MoM and structurally −0.77pp below where LY had this CE at the same calendar position, while pre_period_healthy=false signals the underlying erosion started before the post window. The Google Ads → kens-tours campaign event is the single largest, datable, actionable driver.
