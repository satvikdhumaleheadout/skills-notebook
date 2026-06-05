# CVR-RCA Evaluation
CE 2330 · Walt Disney World Orlando | Pre 2026-03-13→2026-04-12 vs Post 2026-04-13→2026-05-12 | Evaluated 2026-05-18 | Run 2

---

## Overall verdict

Run 2 closes all three execution errors from Run 1: the seasonal claim is now paired with a data signal from the fixed-segment aggregate, the S2C investigation ran the required aggregate query before closing the branch, and the CPA bid adjustment is derived from Shapley arithmetic (~14%) rather than asserted. The MK A2O sub-branches are correctly closed as DATA GAP with three named sub-hypotheses — the action card now gives the DRI a testable framework, not an open-ended "investigate" instruction. The report structure has been materially improved: section ordering, Fixed Segment declaration, Hypotheses Explored table, and Microsoft Ads demoted to sub-bullet are all handled correctly. The remaining gaps are minor: the Fixed Segment banner specified in report_structure.md c008 was not rendered as a standalone component (the verdict line states the fixed segment but the dedicated HTML banner is missing), and the cross-cut (Android Mweb × experience × A2O) was not run — both are [EXEC_ERROR] and [MISSING_INSTRUCTION] respectively.

---

## Theme scores

### 1. Narrative Coherence — 4/5

The callout now names both C2O (59%) and S2C (27%) in the "What broke?" answer using one sentence — the same seasonal mechanism explains both, avoiding the run1 problem of picking one and ignoring the other. The seasonal framing is tied to the 90-day trend chart as explicit data signal. The investigation structure is not visible: no L0/L1/L2 labels, no "Path A/B" terminology. The two-mechanism story (seasonal primary, MK A2O operational secondary) is clear and ranked. Section 3 follows the fixed numbered order from report_structure.md c023.

**Gap:** The Fixed Segment banner is absent. report_structure.md c008 specifies "a new HTML component rendered once after the mix cascade and before the Shapley block, declaring the fixed MB/HO × Paid/Organic × Channel scope." The mix cascade verdict line says "Fixed segment: MB · Paid · Google Ads" but there is no standalone banner component between the cascade block and the Shapley block.

**Why:** `[EXEC_ERROR]` — report_structure.md c008 is explicit: "Fixed Segment banner: new HTML component rendered once after the mix cascade and before the Shapley block." The instruction exists and was available. The banner was not rendered. Fix: add the banner div between the mix cascade analysis-block and the Shapley analysis-block.

---

### 2. Hypothesis Specificity & Quality — 4/5

The MK A2O locus (experience 36344, TIDs 76930/76934/76935) is precisely identified. The three sub-hypotheses for the mechanism (WDW API failure, fraud over-blocking, payment gateway degradation) are falsifiable and testable — each maps to a specific field in `order_attempted_events_v2`. The seasonal hypothesis is now specific enough: within the fixed segment, LP2S fell 3.7% and S2C fell 9.0%. The Microsoft Ads anomaly is correctly framed as "consistent with" rather than confirmed. The Hypotheses Explored table at the end of Section 3 covers every branch with the correct disposition.

**Gap:** The seasonal hypothesis relies on the fixed-segment aggregate as its data signal, which shows moderate declines consistent with the seasonal story. However, the direction of causality is still asserted rather than isolated: both the seasonal demand effect AND the MK A2O failure were happening simultaneously in the post period. The C2O-level numbers in the fixed segment (12.44%→11.16%) include the MK A2O operational component — the seasonal-only CVR would be somewhat higher. This overlap is not discussed.

**Why:** `[MISSING_INSTRUCTION]` — Searched SKILL.md c025, report_structure.md c021, hypothesis.md — no instruction specifying that when a seasonal explanation and an operational failure overlap in the same period, the seasonal impact should be estimated net of the operational component. Fix: add a note to SKILL.md c025 check 2 that when two mechanisms are active simultaneously, the seasonal data signal should come from steps not affected by the operational failure (LP2S and S2C only, not C2O).

---

### 3. Investigation Effort & Adaptivity — 4/5

The S2C branch now runs the fixed-segment aggregate as prescribed by hypothesis.md c016 (LP2S=44.09%→42.46%, S2C=24.60%→22.39%), correctly closes S2C as seasonal with a one-liner, and does not open the full first-pass branch set. The investigation drilled correctly from CE-level → cascade → C2O → C2A/A2O decomp → experience-level → weekly trend → inventory. Session recordings were attempted after the MK locus was confirmed. The backlog boundary was respected: order_attempted_events_v2 was not queried, and the branches that depend on it are correctly marked DATA GAP rather than LEAF.

**Gap:** The cross-cut (Android Mweb × experience × A2O) was not run. The transcript notes it as a gap but does not run it. Android Mweb showed A2O 74.6%→54.5% and MK 36344 showed A2O 63.9%→48.1%; whether these represent the same users was not confirmed. The report states they are "co-directional" but this is not the same as confirming overlap.

**Why:** `[MISSING_INSTRUCTION]` — Searched hypothesis.md C2O section, SKILL.md, report_structure.md — no instruction specifying that when two dimension cuts both concentrate (device and experience), the cross-cut should be run to confirm whether they are the same users before reporting both as findings. This was identified as [MISSING_INSTRUCTION] in Run 1 evaluation; the fix was planned but not yet applied to hypothesis.md. Fix: add to hypothesis.md C2O section: "When both a device cut and an experience cut concentrate, run the cross-cut (device × experience × A2O) before reporting both as independent findings."

---

### 4. Branch Decision Quality — 4/5

The cascade correctly applied mix vs. conversion test at all three levels with explicit arithmetic in the transcript (conv_effect dominates at every level). MB selected with the correct Δcvr × post_users calculation. Shapley correctly directed investigation to C2O (58.8%); S2C and LP2S handled as secondary per c023 with one fixed-segment aggregate query. The A2O branch correctly reached inventory check (unlimited capacity confirmed), then correctly stopped at DATA GAP when order_attempted_events_v2 was the natural next step. The Microsoft Ads branch correctly stayed below the standalone evidence threshold (n=43).

**Gap:** The cross-cut (same as T3 gap) — after device breakdown concentrated on Android Mweb and experience-level concentrated on MK 36344, the two findings were reported as co-directional without confirming the overlap. Per the rubric: "at each fork, did Claude pick the right path?" — the right path after two concentrated dimension cuts is the cross-cut.

**Why:** `[MISSING_INSTRUCTION]` — Same as T3. No instruction in hypothesis.md C2O section for this decision point.

---

### 5. Evidence Strength — 4/5

All claims are traceable to named sources: fixed-segment aggregate query for LP2S/S2C decline, BQ experience-level query for MK A2O, BQ inventory query for unlimited capacity, BQ weekly query for MK A2O time pattern. The CPA bid adjustment is now derived: "41.2% × −33.7% ≈ −13.9% relative → round to ~14%." The DATA GAP branches are correctly distinguished from confirmed findings. Microsoft Ads n=43 is noted with appropriate hedging. The LY overlay is absent but the amber badge per report_structure.md c018 was added (corrected in run2 after initial omission). The fixed-segment data provides the seasonal data signal required by c025 check 2.

**Gap:** The LY data is unavailable (`ly_delta_cvr = null`, `structural_delta_cvr = null`), which means the seasonal magnitude claim (pre period = spring break peak) is supported by within-period evidence (LP2S/S2C decline within fixed segment) but not by a year-over-year comparison. This is unavoidable, but it limits confidence in the magnitude of the seasonal effect.

**Why:** `[DATA_LIMIT]` — report_structure.md requires LY overlay on the 90-day chart. `trend_context.series` contains no `series = 'ly'` entries for CE 2330 — the CE had no prior-year Mixpanel data in the equivalent Mar–May window. Correct to render current-period-only with the amber badge; no skill flaw.

---

### 6. Output Appropriateness — 4/5

The report is shaped by the story: device findings are a bullet in the ruled-out block (not a full table), Microsoft Ads is a sub-bullet in the P1 card (not a standalone card), Section 3 follows the fixed ordered sequence (mix → geo → Shapley → daily trend → primary cuts → secondary → ruled-out → hypotheses explored), and the Hypotheses Explored table closes Section 3. Three Plotly charts are well-chosen: 90-day CVR trend (seasonal context), daily C2O (timing confirmation), MK weekly A2O (operational failure pattern). The DATA GAP block with the sub-hypothesis table is a new component — it adds value by surfacing the three specific branches the DRI needs to test, rather than burying them in bullet text.

**Gap:** Fixed Segment banner absent (same as T1) — report_structure.md c008 specifies a standalone banner component between the cascade and Shapley blocks. The current report has the fixed segment noted in the cascade verdict line but no dedicated banner.

**Why:** `[EXEC_ERROR]` — Same as T1. report_structure.md c008 is clear.

---

### 7. DRI & Actionability — 4/5

The P1 action card names experience 36344 and TIDs 76930/76934/76935 explicitly. Instead of "investigate order_attempted_events_v2," the DRI now has three testable sub-hypotheses with specific field names and outcome criteria. The Microsoft Ads anomaly is correctly folded as a sub-bullet with explicit caveats (n=43). The P2 seasonal card derives the bid adjustment (14% from Shapley arithmetic) rather than asserting it. The DRI assignments (Ops/Payments + Engineering for P1, Growth/Performance Marketing for P2) are specific and appropriate.

**Gap:** The P2 seasonal card recommends "request the Analytics team to provide year-over-year comparison." This is correct framing but it does not give the Analytics team a specific table or metric to query — it's a slightly under-specified ask. A GM forwarding this card would need to interpret what "year-over-year comparison" means.

**Why:** `[MISSING_INSTRUCTION]` — Searched SKILL.md, actions.md — no instruction specifying what the Analytics team should be asked to produce when structural_delta_cvr is null and seasonal is the primary driver. Fix: add to actions.md or SKILL.md: when structural_delta_cvr is null, the Analytics team ask should specify: "CE-level CVR for Mar 13–May 12 [LY dates], broken by pre/post equivalent windows."

---

## Top improvements for next run

1. **Add the Fixed Segment banner between mix cascade and Shapley.** report_structure.md c008 is explicit: a standalone HTML banner declaring the fixed segment (MB/HO × Paid/Organic × Channel) goes between the cascade block and the Shapley block. It ran correctly in the cascade verdict line but the dedicated visual separator was omitted. One missing component — easy to add.

2. **Add the cross-cut instruction to hypothesis.md C2O section.** When device cut (Android Mweb) and experience cut (MK 36344) both concentrate, run the cross-cut (device × experience × A2O) before reporting both findings. This has been identified in two consecutive evaluations as [MISSING_INSTRUCTION]. The fix is a one-paragraph addition to hypothesis.md.

3. **Specify the Analytics team ask when structural_delta_cvr is null.** The P2 seasonal card says "request year-over-year comparison" without naming what to query. Add to actions.md the specific metric: CE-level CVR for the equivalent pre/post dates in the prior year. This closes the under-specified action that a GM would need to re-interpret.

---

## Failure Mode Summary

| Gap (short label) | Theme | Tag | Fix target |
|---|---|---|---|
| Fixed Segment banner not rendered as dedicated HTML component | T1, T6 | `[EXEC_ERROR]` | report_structure.md c008 — banner HTML exists in spec; add between cascade and Shapley blocks |
| Seasonal hypothesis doesn't net out operational C2O component | T2 | `[MISSING_INSTRUCTION]` | SKILL.md c025 check 2 — add: when two mechanisms active, use LP2S/S2C as seasonal signal (not C2O which blends both) |
| Cross-cut (Android × experience × A2O) not run | T3, T4 | `[MISSING_INSTRUCTION]` | hypothesis.md C2O section — add: when two dimension cuts both concentrate, run cross-cut before reporting both as independent findings |
| LY overlay absent | T5 | `[DATA_LIMIT]` | CE has no prior-year Mixpanel data; amber badge correctly added; no fix needed |
| Analytics team ask for YoY comparison under-specified | T7 | `[MISSING_INSTRUCTION]` | actions.md — add: when structural_delta_cvr null + seasonal primary, specify exact YoY metric request (CE-level CVR for equivalent LY dates) |
