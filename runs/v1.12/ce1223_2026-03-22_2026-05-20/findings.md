# Findings — CE 1223 Pompeii Tickets & Tours

## Root cause (improvement)
CVR rose +0.51pp (4.73% → 5.24%, +10.7%) driven almost entirely by C2O (+86% Shapley share, +4.24pp), concentrated in the MB · Paid · Google Ads segment. Within that segment C2O lifted from 48.9% → 52.7% (+3.80pp), with both C2A (+3.3pp) and A2O (+1.5pp) contributing. The lift is broad-based across countries and the top experiences; Italy domestic traffic also surged +26.7% on a seasonal ramp.

## Mechanism
The improvement is a combination of (a) checkout-flow performing better — C2A rose 55% → 58% across nearly every country and experience in the fixed segment, and A2O improved 89% → 90% — and (b) a favourable mix tilt within the catalogue, with cheap Entry Tickets (Experience 8869) and the new Skip-the-line Guided Tour with an Archaeologist (Experience 25518, volume more than doubled) gaining share over higher-friction Combo and audio-guide variants. Prices and availability for the top five experiences were flat throughout (final_price_usd within ±$1, days_to_first_available_date ≈ 0 for both periods), so the gain is not supply- or price-driven.

## Timing
Gradual lift, not a single date. Daily C2O within the fixed segment rises from a pre-period average of ~49% to a post-period average of ~53% with no inflection. The 90-day rolling trend mirrors this — current_delta_cvr +0.42pp vs ly_delta_cvr +0.20pp, leaving structural_delta_cvr +0.23pp. About half the lift is seasonal (Pompeii's spring ramp — LY repeated the same shape), the other half is structural improvement.

## Headwind
HO segment CVR declined (8.27% → 7.04%, −1.23pp) while HO traffic grew +38.8% (2,202 → 3,056 users). LP2S fell 6.7pp and S2C fell 5.1pp on HO. The new HO traffic is lower-intent — but absolute HO orders still grew +18% (182 → 215), so this is dilution from scaling rather than a flow regression. Mix effect from HO share growth: ≈ +0.10pp (small tailwind from share of higher-CVR segment grew); conversion effect from HO rate drop: ≈ −0.04pp. Net effect on CE-level CVR ≈ +0.06pp — negligible.

## Evidence inventory

| Claim | Supporting data | Source | Confidence |
|---|---|---|---|
| CVR 4.73% → 5.24% (+0.51pp / +10.7%) | headline.pre.cvr=0.0473, headline.post.cvr=0.0524, delta.cvr=0.00507 | summary.json | Confirmed |
| C2O explains 86% of ΔCVR | shapley.pct_contribution.C2O=0.86; absolute +0.44pp | summary.json | Confirmed |
| LP2S contribution noise (−0.04pp) | shapley.LP2S=−0.0004, ΔLP2S=−0.30pp on 66k users | summary.json | Confirmed |
| Mix not dominant (24% / 21%) | mix_dominance.is_dominant=false | summary.json | Confirmed |
| Fixed segment = MB · Paid · Google Ads (88% of MB paid volume) | Cascade L1 MB 96.8% share, L2 Paid 56% share of MB, L3 Google Ads 88% of MB Paid | BQ cascade queries | Confirmed |
| Fixed segment CVR 6.63% → 7.22% (+0.59pp) | users_lp 35,798 → 36,394, completed 2,373 → 2,627 (+254) | BQ fixed-segment headline | Confirmed |
| C2A 55.1% → 58.4% (+3.3pp) within fixed segment | users_checkout 4,854 → 4,986, users_attempted 2,674 → 2,912 | BQ fixed-segment headline | Confirmed |
| A2O 88.7% → 90.2% (+1.5pp) within fixed segment | users_attempted 2,674 → 2,912, users_completed 2,373 → 2,627 | BQ fixed-segment headline | Confirmed |
| Italy domestic volume +26.7% (11,198 → 14,194) | Geo overview row "Italy" | BQ geo query | Confirmed |
| Italy CVR 6.83% → 7.42% (+0.59pp) | Geo overview row "Italy" | BQ geo query | Confirmed |
| Improvement broad across top countries (DE, ES, UK all up; FR slightly down) | Per-country CVR table | BQ geo query | Confirmed |
| Experience 8869 (Pompeii Entry Tickets) carries the largest C2O lift | C2O 50.78% → 54.72% (+3.94pp), checkouts 3,281 → 3,578, completed 1,666 → 1,958 (+292) | BQ experience-level | Confirmed |
| Experience 25518 (Skip-the-line Guided Tour with Archaeologist) volume doubled | checkouts 205 → 434 | BQ experience-level | Confirmed |
| Prices flat (within ±$1) across top 5 experiences | avg_price pre/post all within ±$1 (e.g. 8869: $31.15 → $30.89) | BQ product_rankings_features | Confirmed |
| Availability flat — same-day inventory throughout | avg_days_to_first_available_date ≈ 0 in both periods for all five experiences | BQ product_rankings_features | Confirmed |
| Daily C2O lift is gradual, no break date | Daily series shows pre avg ~49%, post avg ~53% with no inflection | BQ daily trend | Confirmed |
| ~Half the gain is seasonal (LY same lift +0.20pp) | trend_context.ly_delta_cvr=0.00197; structural_delta_cvr=0.00226 | summary.json | Confirmed |
| HO segment CVR 8.27% → 7.04% (−1.23pp) on 38.8% volume growth | users 2,202 → 3,056, completed 182 → 215 | BQ HO breakdown | Confirmed |
| HO net order count still grew +18% | completed 182 → 215 | BQ HO breakdown | Confirmed |
| Weekday composition comparable (no major imbalance) | Pre 4 weekends + Easter (Apr 3–6); Post 4 weekends, no holiday | Calendar check | Confirmed |

## Open items
None. All numbers cited in the report have explicit data sources. Slack context not yet available — if it lands before report write, will reconcile; otherwise log "skipped".
