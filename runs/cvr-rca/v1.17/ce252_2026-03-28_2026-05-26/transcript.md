# Investigation Transcript — CE 252 · Louvre Museum Tickets
Pre: 2026-03-28 to 2026-04-26 | Post: 2026-04-27 to 2026-05-26 | Market: France

## Tree map
L0: **CVR improved +0.72pp (3.46%→4.19%, +20.8%)** · structural +1.69pp (LY: -1.07pp) · gradual · Shapley: C2O +0.54pp (74%) · S2C +0.53pp (73%) · LP2S -0.34pp (-47%, headwind)
├─ L1a: Cascade L1 MB vs HO  →  CONFIRMED — MB primary (95% share), conversion +0.75pp; HO grew share but rate fell (small +0.04pp net)
├─ L1b: Cascade L2 Paid vs Organic (within MB)  →  CONFIRMED — Paid dominant (63%→73% share), both mix (+0.23pp) and conversion (+0.50pp) positive; conversion leads. Fix Paid.
├─ L1c: Cascade L3 Channel within Paid MB  →  CONFIRMED — Google Ads dominant (77% share, flat), conversion-driven CVR 4.56%→5.42% (+0.86pp). Fix Google Ads.
│   └─ **Fixed segment: MB · Paid · Google Ads** (LP2S 51.82%→46.63%, S2C 27.26%→30.70%, C2O 32.29%→37.89%, CVR 4.56%→5.42%)
├─ L2a: S2C +3.4pp on fixed segment  →  CONFIRMED — concentrated on TGID 3909 (+7.6pp, 78% of selects); availability improved (median days_to_first_available 1→0 for top TGIDs)
├─ L2b: C2O +5.6pp on fixed segment  →  CONFIRMED — C2A drives it (+6.1pp), A2O small (+1.5pp); TGID 3909 +8.4pp dominant; iOS Mweb C2O +7.7pp
├─ L2c: LP2S −5.2pp on fixed segment  →  CONFIRMED — broad across devices (iOS −5.8pp, Android −4.1pp, Desktop −5.7pp); paid Google Ads volume held but secondary URL collapsed (61%→51% LP2S, lost 58% of volume); consistent with paid traffic-quality dilution as channel expanded
├─ L2d: Geo France volume  →  CONFIRMED — domestic Google Ads MB +60.8% volume, CVR +1.19pp; non-Geo CVR +0.79pp (improvement is broader than Geo but Geo is the bigger contributor)
├─ L2e: Device concentration  →  CONFIRMED — iOS Mweb dominant beneficiary: volume +18.6%, CVR 3.81%→5.46% (+1.65pp); Desktop volume −24.9% but CVR up
└─ L2f: Catalogue change (Pattern 11)  →  RULED OUT — no significant TGID launched/disabled inside the window; TGIDs first-seen in post are all <40 select rows (long-tail)

## Root cause confirmed
CE 252 Louvre Museum Tickets posted a structural CVR improvement of +1.69pp (vs LY −1.07pp over the same window). Within the fixed segment **MB · Paid · Google Ads** (which dominates the CE's checkouts), three forces stack:

(1) **Mix shift toward Paid**: Paid MB share rose 63%→73% (mix_effect +0.23pp within MB; at whole-CE level Paid grew 60%→72%). Paid carries higher native CVR than Organic; the share shift alone explains roughly a third of MB's lift.

(2) **S2C and C2O lifted on the dominant TGID 3909** (78% of selects on Google Ads MB): S2C 21.2%→28.8% (+7.6pp), C2O 29.6%→38.0% (+8.4pp). C2A specifically rose +6.1pp (the dominant C2O sub-driver). Same-day availability improved measurably — median `days_to_first_available_date` on top TGIDs fell from 1 → 0; better near-term inventory at the date-picker is a direct S2C lever.

(3) **iOS Mweb concentration**: iOS Mweb users grew +18.6% in volume and lifted CVR +1.65pp (3.81%→5.46%) — the strongest beneficiary device-side. Desktop volume fell 25% but per-user CVR still improved.

**Headwind: LP2S declined −5.2pp** within the fixed segment, broadly across devices. Two contributors: (a) the secondary MB URL `paristickets.com/louvre-museum/` collapsed in volume (11.3% → 4.7% of CE LP traffic) — that URL had higher native LP2S (61%) so its retreat lowers the weighted average; (b) the primary microsite URL's own LP2S fell 53%→48%, consistent with paid traffic-quality dilution as Google Ads expanded reach into a less qualified audience pool. The headwind is real but is more than offset by the downstream lifts.

---

## L1 — Mix cascade

### Level 1 — MB vs HO (from summary.json)
MB share 95.06% → 93.33% (Δ −1.73pp), MB CVR 3.41%→4.20% (Δ +0.79pp); mix_effect −0.06pp, conversion_effect **+0.75pp** → conversion dominant; total MB effect +0.68pp.
HO share 4.94% → 6.67% (Δ +1.73pp), HO CVR 6.73%→5.58% (Δ −1.15pp); mix_effect +0.12pp, conversion_effect −0.06pp; total HO effect +0.04pp.
**Decision:** fix MB.

### Level 2 — Paid vs Organic within MB (BQ)
| segment | period | users | cvr |
|---|---|---|---|
| Paid | pre | 29,773 | 4.22% |
| Paid | post | 30,070 | 4.87% |
| Organic | pre | 17,302 | 1.88% |
| Organic | post | 11,156 | 2.12% |

Shares: Paid 63.25% → 72.94% (Δ +9.69pp); Organic 36.75%→27.06% (Δ −9.69pp).
- Paid: mix_effect = +0.097 × 0.0422 = **+0.41pp**; conversion_effect = 0.6325 × 0.0065 = **+0.41pp**
- Organic: mix_effect = −0.097 × 0.0188 = **−0.18pp**; conversion_effect = 0.3675 × 0.0024 = +0.09pp
- Sum: mix_effect = **+0.23pp**; conversion_effect = **+0.50pp**.

Conversion effect leads but mix is meaningfully contributing (~⅓). **Fix Paid.**

### Level 3 — Channel within Paid MB (BQ)
| channel | period | users | cvr | lp2s | s2c | c2o |
|---|---|---|---|---|---|---|
| Google Ads | pre | 22,935 | 4.56% | 51.82% | 27.26% | 32.29% |
| Google Ads | post | 23,155 | 5.42% | 46.63% | 30.70% | 37.89% |
| Microsoft Ads | pre | 6,867 | 3.07% | 30.76% | 32.01% | 31.21% |
| Microsoft Ads | post | 6,943 | 3.01% | 24.96% | 36.06% | 33.44% |

Share within Paid is flat (Google ~77%, Microsoft ~23%). Google Ads is the conversion-driven story (+0.86pp CVR on flat share). Microsoft Ads CVR essentially flat.

**Fixed segment: MB · Paid · Google Ads.** All subsequent queries carry `is_microbrand_page = TRUE AND channel_name = 'Google Ads'`.

## L2 — First-pass batch (parallel)

### Geo (Google Ads · MB)
| group | period | users | cvr | lp2s | s2c | c2o |
|---|---|---|---|---|---|---|
| Geo France | pre | 3,265 | 4.75% | 54.7% | 23.7% | 36.6% |
| Geo France | post | 5,249 | 5.94% | 48.6% | 27.8% | 43.9% |
| Non-Geo | pre | 19,799 | 4.57% | 51.4% | 27.9% | 31.9% |
| Non-Geo | post | 18,141 | 5.35% | 46.2% | 31.7% | 36.6% |

Geo France volume +60.8%, CVR +1.19pp. Non-Geo CVR +0.79pp. Improvement is broad but Geo France is the bigger per-user mover and a notable volume injection — consistent with domestic spring/Easter demand for the Louvre.

### Experience-level (Google Ads · MB, ≥50 selects)
TGID 3909 (the main Louvre Museum Tickets product): selects 9,013→8,133, checkouts 1,908→2,340 (+22.6%), completions 564→889 (+57.6%). S2C 21.2%→28.8% (+7.6pp), C2O 29.6%→38.0% (+8.4pp). **Dominant lift carrier.**
TGID 9082: 2,093→1,734 selects, S2C flat-low (12.6%→11.3%), C2O 28.4%→33.7%. Side contributor.
TGID 23442: 1,114→878, S2C 21.3%→35.8% (+14.5pp, small volume).
No new TGID materialised inside the window with meaningful volume (catalogue check confirms).

### URL breakdown (Google Ads · MB)
| URL | period | users | pct_of_lp | lp2s | cvr |
|---|---|---|---|---|---|
| louvre-museum.paristickets.com/ | pre | 19,479 | 82.2% | 52.97% | 4.56% |
| louvre-museum.paristickets.com/ | post | 21,142 | 89.1% | 48.03% | 5.64% |
| paristickets.com/louvre-museum/ | pre | 2,679 | 11.3% | 60.88% | 6.31% |
| paristickets.com/louvre-museum/ | post | 1,121 | 4.7% | 51.38% | 5.53% |

The primary microsite URL gained 7pp of LP share. The secondary URL lost 58% of its volume — and that URL had the highest LP2S, so its retreat is the *routing* reason aggregate LP2S fell. The primary URL's own LP2S also fell 53%→48% — that's the *performance* layer of the LP2S headwind.

### Device (Google Ads · MB)
| device | period | users | lp2s | s2c | c2o | cvr |
|---|---|---|---|---|---|---|
| iOS Mweb | pre | 9,765 | 50.7% | 21.6% | 34.8% | 3.81% |
| iOS Mweb | post | 11,583 | 44.9% | 28.7% | 42.5% | 5.46% |
| Android Mweb | pre | 6,385 | 56.9% | 24.1% | 29.5% | 4.04% |
| Android Mweb | post | 6,425 | 52.8% | 25.8% | 32.0% | 4.36% |
| Desktop | pre | 6,650 | 48.5% | 39.4% | 32.1% | 6.15% |
| Desktop | post | 4,995 | 42.8% | 43.7% | 36.3% | 6.79% |

iOS Mweb is the dominant beneficiary — both volume and CVR. Desktop traffic shrank but its per-user CVR still rose. The LP2S decline shows broadly (every device down 4–6pp) — confirms it's not a device-specific UX issue.

### C2A / A2O sub-decomp (Google Ads · MB)
C2A 40.29% → 46.40% (+6.1pp). A2O 80.15% → 81.66% (+1.5pp). **C2A is the primary C2O driver** — users abandoning before submitting payment fell sharply. Mechanism candidates: better same-day availability (less price/availability shock at checkout), pricing transparency, or improved post-checkout flow.

### Pricing & availability (top 3 TGIDs, product_rankings_features)
| TGID | metric | pre | post |
|---|---|---|---|
| 3909 | median final_price_usd | $56.44 | $57.34 |
| 3909 | median days_to_first_available | 1 | **0** |
| 3909 | avg rating | 4.20 | 4.11 |
| 9082 | median final_price_usd | $70.36 | **$57.25** (−18.6%) |
| 9082 | median days_to_first_available | 0 | 0 |
| 23442 | median final_price_usd | $67.92 | $68.01 |
| 23442 | median days_to_first_available | 1 | **0** |

Availability **improved** on the top TGIDs — same/next-day slots now reliably show. This is a direct S2C lever (consistent with the S2C lift on the date-picker stage). TGID 3909 price effectively flat; TGID 9082 price fell ~19% but its volume actually fell too, so it's not the major driver.

### Catalogue change check (Pattern 11)
Queried `mixpanel_user_page_funnel_progression` for TGIDs whose first or last `event_date` falls inside the window with non-trivial pre/post select rows. No TGID with meaningful volume launched mid-window — all TGIDs first-seen in post period are ≤40 select rows. **Pattern 11 ruled out** for this CE.


---

## L0 — Orient
**mix_dominance:** is_dominant=False. mbho_mix_share=0.243, channel_mix_share=1.024. Mix contributed but did not dominate — conversion changes are the primary story.
**shapley:** C2O +0.54pp (74%), S2C +0.53pp (73%), LP2S -0.34pp (-47%, headwind). All three steps significant. C2A +4.5pp dominant within C2O (A2O +2.7pp also positive).
**trend_context:** Structural ΔCVR = +1.69pp (vs apparent +0.72pp); LY same window was -1.07pp → genuine improvement, not seasonal. pre_period_healthy=True. Gradual rather than sharp break.
**MB/HO:** MB primary (95% share, conversion-driven +0.75pp). HO grew share but rate fell (small +0.04pp net).
**Channel:** Paid share 60%→72% (+11.7pp), Paid CVR 4.35%→4.95% — Paid grew on both axes. Organic share fell. Whole-CE channel_mix_share=1.024 (meaningful).
