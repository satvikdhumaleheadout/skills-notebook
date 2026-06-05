# CVR-RCA Evaluation
CE 6495 · Kualoa Ranch | Pre: 2026-03-05–2026-04-03 vs Post: 2026-04-04–2026-05-03 | Run: run5 (2026-05-08)

> **First evaluation of run5.** This run used the updated skill `cvr-rca_events` (changelog c022–c023), which adds **Step 2c** — a BQ micro-funnel breakdown (Select Page Viewed → Variant Card Clicked → Tour Selected → Checkout Started) queried for each Case B experience — and **Step 2d** — targeted session recordings based on the Step 2c drop step. The primary differentiator from run3 (same date window, standard skill) is the micro-funnel evidence layer. Run5 confirms the same seasonal root cause as run3 but adds direct BQ-level evidence for the demand-exit mechanism at each experience's booking funnel.

---

## Overall verdict

This is a strong, well-executed RCA that correctly identifies and confirms the seasonal spring break wind-down mechanism. The investigation covers all required branches: full 3-level cascade, Geo/Non-Geo, device/language cuts, TGID experience breakdown, Step 2c micro-funnel for all three affected experiences, Step 2d targeted session recordings, inventory time-series (Path A), and lead-time distribution.

The key advance over run3 is the Step 2c execution. Two distinct UX architectures were correctly identified: UTV Raptor uses a variant-card booking flow (drop at `pct_variant_clicked`, −7.2pp — lower engagement entry), while Movie Sites and Jungle use a direct date-selection flow (drop at `pct_checkout_of_selected`, −7.5pp and −8.9pp — price-check abandonment). Both patterns are correctly interpreted as demand-side and correctly distinguished from product or supply failures. The identification of the variant-card vs. direct-calendar architecture difference is a genuine analytical finding specific to this CE. The session recording evidence (1/16 coverage) is appropriately caveated as directional only; the "Error Viewed" signal on UTV Raptor's select page is elevated to a P1 action card with a specific decision rule.

Residual gaps are the same as run3: no controlled within-period comparison to confirm the spring break timing mechanism, and the daily S2C trend chart uses CE-level data without a fixed-segment disclosure note. T7 improves over run3: the P1 "Error Viewed" action card is specific and actionable.

---

## Theme scores

### 1. Narrative Coherence — 5/5

**Justification:** The executive summary opens with a quantified, specific finding: S2C fell 31.6%→25.2% (−6.44pp) concentrated in three experiences accounting for 87% of checkout volume lost. The callout correctly names the step (S2C), magnitude (−6.44pp), affected segments (US −6.73pp / Canada −10.56pp), and timing (gradual from Apr 4). The report follows a clean logical flow: metric cards → 90-day trend → callout → action cards → cascade (3 levels) → fixed segment banner → Geo/Non-Geo → Shapley → daily S2C trend → experience breakdown → micro-funnel blocks (3 TGIDs) → session recordings → inventory → lead-time → ruled-out dimensions. Every analysis block opens with a verdict line. The tree map in the transcript tracks all branches with OPEN/CONFIRMED/RULED OUT/LEAF states. The Step 2c micro-funnel blocks are correctly integrated after the experience-level locus identification and before the inventory block.

No gaps.

---

### 2. Hypothesis Specificity & Quality — 5/5

**Justification:** The root cause statement is specific and falsifiable: "Spring break wind-down — US domestic S2C fell −6.73pp on 15,711 pre select-page visitors; Canadian visitors fell −10.56pp on 1,053 pre visitors. Both are primary spring break origin markets for Hawaii." The mechanism is stated with named markets, magnitudes, user counts, and a coherent causal chain. Counter-evidence is correctly engaged: South Korea (−2.4pp, near-flat) and Mexico (+5.0pp) held flat or improved — implausible if the root cause were a product failure or supply constraint. The Step 2c micro-funnel adds a second independent confirmation: demand-exit behavioural signatures (engagement abandonment for UTV Raptor, price-check abandonment for Movie Sites and Jungle) are visible in event-level BQ data, not just inferred from aggregate rate changes. Supply is falsified via post-period time-series (all TGIDs healthy throughout; TGID 37530 step-down post-dates S2C onset by three weeks). The "consistent with" framing is retained for the spring break attribution (no controlled comparison run), which is appropriate.

No gaps.

---

### 3. Investigation Effort & Adaptivity — 5/5

**Justification:** All required branches executed and documented.
- **Mix cascade:** 3 full levels with explicit mix/conv effect arithmetic. Fixed segment declared.
- **Language:** 99.9% English — ruled out.
- **Device:** Broad decline across all device types — ruled out as independent driver.
- **TGID experience breakdown:** Full lost_checkouts_delta table with all TGIDs. Case B correctly identified (37536 37%, 37530 33%, 37532 17% — all ≥10%).
- **Step 2c micro-funnel (new in cvr-rca_events):** BQ S2C micro-funnel query run for all three Case B TGIDs. Two distinct UX architectures identified: variant-card flow (37536) and direct-calendar flow (37530/37532). Drop step correctly identified per TGID. The `pct_tour_selected_of_clicked > 100%` artifact for 37536 is explained correctly (cross-session user matching). `avg_time_on_select_min` used correctly as supporting — not primary — evidence.
- **Step 2d session recordings (new in cvr-rca_events):** Targeted cohorts defined correctly based on Step 2c drop step (37536 "no variant click" cohort, 37530 "no checkout" cohort). Low coverage (1/16) documented as a data pull failure per skill guidance. "Error Viewed" signal identified in the one available recording, caveated appropriately as directional only.
- **Inventory (Path A):** Daily time-series for all three Case B TGIDs across the post period. Synchronised zero days identified as pipeline artifacts (simultaneous across unrelated TGIDs). TGID 37537 3-7d declining trend disconfirmed by 8-13d recovery. TGID 37530 0-2d step-down (−46% from Apr 23) correctly identified as real, TGID-specific, and compounding (not primary cause — onset three weeks after S2C decline began).
- **Lead-time:** Modest near-term shift confirmed as behavioural, not supply-driven.

No gaps.

---

### 4. Branch Decision Quality — 5/5

**Justification:** Every cascade and L2 decision is explicitly reasoned with numbers. Level 1: conv_effect MB (−1.37pp) >> mix_effect (−0.14pp) — stated before fixing MB. Level 2 and 3 follow the same explicit arithmetic. The Case B determination is documented with a full lost_checkouts_delta table and the ≥10% threshold applied explicitly to all three TGIDs. The decision to run Step 2c for all three Case B TGIDs (not just the highest-volume one) is consistent with the skill protocol. The Step 2c drop-step identification is correctly derived from the cross-TGID comparison: 37536 drops at `pct_variant_clicked` (variant-card flow → engagement entry), while 37530/37532 show 0% `pct_variant_clicked` and drop at `pct_checkout_of_selected` (direct-calendar flow → post-selection commitment). The architectural distinction between the two UX flows is a genuine observation, not an assumption — it emerges directly from the data. Step 2d cohort targeting (UTV Raptor "no click" cohort, Movie Sites "no checkout" cohort) is correctly derived from the Step 2c drop steps. The tree map accurately reflects all branch outcomes.

No gaps.

---

### 5. Evidence Strength — 4/5

**Justification:** The evidence base is materially stronger in run5 vs run3 due to the Step 2c micro-funnel. All key claims have named BQ sources with user counts. The demand-exit mechanism is now supported by two independent data layers: (1) Geo/Non-Geo cut showing US/Canada concentrated decline on 15,711 pre select users; (2) BQ event-level micro-funnel showing the specific step in each experience's booking flow where conversion fell (engagement abandonment for UTV Raptor, price-check abandonment for Movie Sites and Jungle). The supply ruling-out is rigorous: daily time-series with pipeline artifact disconfirmation, progressive depletion cross-bucket analysis, and correct timing argument (S2C decline Apr 4, TGID 37530 step-down Apr 23 → cannot be primary cause). The session recording evidence is thin (1/16, single user) but correctly labeled as directional.

**Gap:** The spring break mechanism is confirmed by convergent inference but not by a controlled within-period comparison. SKILL.md Step 2b: "Any calendar event cited as a cause → is there a controlled comparison?" No query was run comparing US S2C in the pre-period spring break peak (Mar 15–Apr 3) vs. the early post period (Apr 4–Apr 17) to confirm the drop aligns with the school return window rather than some other concurrent change. The claim is correctly framed as "consistent with" in the report, but the deliberate omission of this comparison is not noted in the transcript.

**Why:** `[EXEC_ERROR]` — The controlled within-period Geo S2C comparison was not run. The Step 2c evidence materially reduces (but does not eliminate) the importance of this gap by providing direct event-level confirmation of demand-exit patterns. Fix: query Geo (US) S2C by week across the pre/post boundary to confirm the drop aligns with the school return calendar.

---

### 6. Output Appropriateness — 4/5

**Justification:** Visual and structural component choices are well-calibrated. The three Step 2c micro-funnel blocks are correctly formatted as `.analysis-block` with verdict lines, structured tables with user counts at every step, and interpretive subtext paragraphs. The session recordings block uses the specified table format (Recording | Steps observed | Inference). The inventory section correctly shows a 0-2d Plotly line chart for all three TGIDs (Path A, post-period only) with the TGID 37530 step-down visible against the healthy UTV Raptor and Jungle baselines. Omit-with-inline-sentence rule correctly applied: the 3–7d, 8–13d, and 14–30d buckets (all healthy throughout) are replaced by a single inline sentence. No internal investigation terminology (Step 2c, Path A, Case B, locus, lost_checkouts_delta) appears in the report body — all translated to business language. The amber LY-absent badge is rendered. Fixed segment banner appears after the cascade.

**Gap:** The daily S2C trend chart uses CE-level daily S2C from the summary.json pipeline data, not fixed-segment (MB·Paid·Google Ads) data. No disclosure note is present in the chart's subtext paragraph.

**Why:** `[EXEC_ERROR]` — report_structure.md: "All trend charts filtered to the fixed segment." A fixed-segment daily BQ query was not run. Fix: add a subtext disclosure: "Chart uses CE-level daily S2C aggregated across all segments; the fixed-segment (Microsite·Paid·Google Ads) aggregate rates are shown in the analysis blocks above and are consistent with this trend."

---

### 7. DRI & Actionability — 5/5

**Justification:**
- **P1 (Product/Engineering — UTV Raptor "Error Viewed"):** Highly specific. Names the Mixpanel event (`Error Viewed`), the experience (UTV Raptor, TGID 37536), the page URL (`book.tickets-hawaii.com/book/37536/select/`), the date range (Apr 4–May 3 vs. Mar 5–Apr 3), and provides a clear decision rule: if error rate increased in the post period and correlates with the variant card engagement drop, escalate to bug review; if stable, close as noise. A DRI can act immediately.
- **P2 (Supply team — Movie Sites 0-2d step-down):** Specific. Names the experience (Movie Sites, TGID 37530), the bucket (0–2 day, same/next-day), the onset date (Apr 23), the magnitude (−46%, ~1,130→~607 tickets/day), confirms TGID-specificity as the distinguishing feature from data artifacts, and states a concrete recovery target (restore to pre-Apr-23 levels before Memorial Day). The timing argument (compounding, not primary cause) is explicitly stated to prevent over-weighting the finding.
- **P3 (Analytics/Commercial — Seasonal calibration):** Actionable. Specifies the 3-year YoY CVR pull (Apr–May 2024, 2025, 2026) and a follow-up evaluation of Google Ads bidding strategy for the post-spring-break period. More specific than run3's seasonal calibration card.

No gaps.

---

## Top improvements for next run

1. **Run the within-period Geo S2C comparison when a calendar event is cited as the mechanism.** For spring break: query US S2C by week for the 6 weeks straddling the pre/post boundary (Mar 15–Apr 28). A progressive week-over-week decline in the US that accelerates after school return dates would upgrade the spring break attribution from "consistent with" to "confirmed."

2. **Add a fixed-segment disclosure note to the daily S2C trend chart.** One sentence in the subtext: "Chart uses CE-level daily S2C from pipeline data; fixed-segment (Microsite·Paid·Google Ads) aggregate rates shown in the experience breakdown block above are consistent with this trend." This takes 10 seconds and closes the T6 gap permanently.

3. **Consider running Step 2c for the control experience (Zipline).** Zipline (37531) improved (+3.9pp S2C) despite the same traffic decline. Comparing its micro-funnel to the three declining experiences would provide a direct within-CE control: if Zipline shows stable `pct_variant_clicked` or `pct_checkout_of_selected`, that strengthens the demand-exit claim by showing the funnel can hold even in the same post-period context.

---

## Failure Mode Summary

| Gap (short label) | Theme | Tag | Fix target |
|---|---|---|---|
| Spring break not confirmed via controlled within-period Geo S2C comparison | T5 | [EXEC_ERROR] | SKILL.md Step 2b — "calendar event cited as cause → run Geo S2C within-period comparison or note explicit omission" |
| Daily S2C chart is CE-level proxy without disclosure | T6 | [EXEC_ERROR] | report_structure.md — "All trend charts filtered to fixed segment; if proxy used, add subtext disclosure" |

---

## Total: 33/35

| Theme | Score |
|---|---|
| T1 — Narrative Coherence | 5/5 |
| T2 — Hypothesis Specificity & Quality | 5/5 |
| T3 — Investigation Effort & Adaptivity | 5/5 |
| T4 — Branch Decision Quality | 5/5 |
| T5 — Evidence Strength | 4/5 |
| T6 — Output Appropriateness | 4/5 |
| T7 — DRI & Actionability | 5/5 |
| **Total** | **33/35** |

**run5 vs run3 comparison:** Same overall score (33/35), but substantively richer. Run5 adds Step 2c micro-funnel BQ evidence that directly confirms the demand-exit mechanism in event data — the variant-card engagement drop for UTV Raptor and the price-check abandonment pattern for Movie Sites and Jungle are visible in COUNT(DISTINCT user_id) event counts, not just inferred from aggregate S2C rates. T7 improves to 5/5 vs run3's 4/5 — the P1 "Error Viewed" action card is more specific and actionable than run3's seasonal calibration card. The two remaining gaps (T5 controlled comparison, T6 chart disclosure) are the same structural gaps that exist in run3 and are not addressed by the new skill capability.

**New skill element assessment (cvr-rca_events Step 2c/2d):** Step 2c was executed correctly for all three Case B TGIDs. The discovery of two distinct UX flow architectures (variant-card vs direct-calendar) was a genuine analytical finding that required interpreting the 0% `pct_variant_clicked` result correctly rather than treating it as an error. Step 2d targeting was derived correctly from Step 2c drop steps. The low recording coverage (1/16) was handled appropriately: documented as a data pull failure, single recording findings caveated as directional, P1 action card framed as a verification check rather than a confirmed finding.
