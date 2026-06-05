# CVR-RCA Evaluation
CE 6495 · Kualoa Ranch | 2026-03-13–2026-04-12 vs 2026-04-13–2026-05-12 | 2026-05-13

## Overall verdict

This RCA did the hardest part well: it drilled from a CE-level S2C drop to a single specific TID (80074), confirmed the mechanism with a daily time-series, and found the inverse confirmation (Jurassic Zipline) that turns a supply hypothesis into a supply finding. The root cause callout and action cards are specific enough to act on immediately. The main failure was a C2O blind spot — C2O contributed 22% of Shapley (−2.59pp) and was mentioned once at L0 then silently dropped, with no C2A/A2O decomposition and no branch opened. A senior analyst reading the report would note the C2O metric card shows a non-trivial decline and wonder why it was not explained.

---

## Theme scores

### 1. Narrative Coherence — 4/5

The report reads as a story: mix is ruled out (stated explicitly), price is ruled out, device shows no single locus, experience breakdown confirms UTV Raptor, inventory confirms TID 80074. Each section earns its place. The root cause callout names the specific TID and posts_median_0_2d = 0. The Jurassic Zipline inverse confirmation appears in both the callout and Section 3, reinforcing the causal logic for readers who want to verify.

**Gap:** The lead-time distribution table (UTV Raptor checkouts by 0–2d / 3–7d / 8–13d / 14d+ bucket) appears in Section 3 but the −70% decline in the 14d+ bucket creates a false-negative impression — a reader scanning that column sees a large drop in a bucket where supply is abundant. The subtext does address this, but placing the table without a pre-emptive verdict line risks a misread.

**Why:** [AMBIGUOUS_INSTRUCTION] — report_structure.md, "Lead-time distribution: When availability scarcity is the hypothesis" — spec includes the table type but does not specify that a strong verdict line is required before the table when one bucket's decline is traffic-driven (not supply-driven). Fix: add to report_structure.md spec a note that the verdict line must distinguish supply-constrained buckets from traffic-volume-reduced buckets when both appear in the same table.

---

### 2. Hypothesis Specificity & Quality — 4/5

The root cause names TID 80074 (not just "UTV Raptor"), the 0–2 day booking window, and the count of affected post-period days (28/30). The spillover abandonment mechanism for Movie Sites and Jungle Expedition is explicitly labeled "consistent with" — the correct confidence level when direct observation was unavailable. The investigation used Jurassic Zipline as a natural experiment rather than passively noting its improvement, which is a step above description.

**Gap:** The underlying cause of TID 80074's depletion is listed as three open possibilities (API cut-off period settings, vendor throttling, deliberate booking window restriction) without ranking them by prior probability. hypothesis.md Pattern 4.1 and Pattern 3.1 both name "API cut-off period shortened" as the highest-frequency mechanism across historical Headout cases. The action card lists all three in a flat list rather than leading with the most probable.

**Why:** [MISSING_INSTRUCTION] — Searched SKILL.md, hypothesis.md, context.md, report_structure.md — none require the analyst to rank competing hypotheses for an open item by base rate when the mechanism cannot be confirmed from data alone. Fix: add to hypothesis.md Pattern 4 a note that when supply depletion is the confirmed finding but the specific mechanism is unresolvable from data, the action card should lead with the highest-frequency historical mechanism (API cut-off) with the others listed as alternates.

---

### 3. Investigation Effort & Adaptivity — 4/5

Custom queries were written at every stage beyond the baseline. The Jurassic Zipline supply check was self-generated — it was not in any default branch list, it came from reading the experience breakdown and noticing an outlier. The investigation ran TID 80075 (Ride-Along) alongside 80074, which confirmed the supply constraint is TID-specific, not TGID-wide. The All-Inclusive Package volume collapse was noticed and flagged as a secondary finding. The investigation stopped at the confirmed leaf without running additional unnecessary analyses.

**Gap:** The language × S2C dimension cut — listed in hypothesis.md "S2C first-pass branches" as a parallel starting cut — was not run. The transcript jumps from the geo overview (uniform drop, US −6.29pp / Non-Geo −6.32pp) directly to device breakdown, skipping language. Since the geo overview confirmed uniformity, this omission is defensible, but the language cut was explicitly in the first-pass set and the skip was not stated in the transcript.

**Why:** [EXEC_ERROR] — hypothesis.md, "S2C — first-pass branches": "Run dimension cuts in parallel: `language` × S2C rate pre/post." The transcript shows the geo overview was run (covers country-level), but no language breakdown query appears. The geo result (uniform drop) could have been used to close the language branch, but no explicit "language → RULED OUT because geo is uniform" notation appears in the tree map. Fix: require the tree map to show an explicit `RULED OUT` entry for the language branch when it is skipped on the basis of another result.

---

### 4. Branch Decision Quality — 3/5

The cascade arithmetic is shown at all three levels with explicit mix_effect vs conversion_effect comparisons. The fixed segment declaration (MB · Paid · Google Ads) is clean. The sequence from experience breakdown → inventory is the correct path per hypothesis.md. Price was ruled out before inventory (efficient). The decision to omit the 8–13d and 14–30d inventory charts (healthy buckets omitted per spec) was correct and applied appropriately.

**Gap:** C2O had a Shapley share of 22.4% (−2.59pp absolute) — above the "~10% of ΔCVR" threshold in SKILL.md for opening a branch — yet was declared "secondary" at L0 and never branched. hypothesis.md for C2O instructs: "Check `c2o_sub` from `summary.json` first. C2O = C2A × A2O... Always decompose first — do not run C2O queries before knowing which sub-metric moved." No decomposition was run, no c2o_sub check appears in the transcript. The report's C2O metric card (pre% → post%) has no supporting explanation in Section 3.

**Why:** [EXEC_ERROR] — SKILL.md, L2+ section: "Do not deep-dive steps that carry less than ~10% of the delta." C2O at 22.4% is well above that threshold. hypothesis.md, "C2O — first-pass branches": "Check `c2o_sub` from `summary.json` first." Transcript shows C2O noted at L0 ("secondary, −2.59pp — All analysis to focus on S2C") and then never revisited. The rule says not to deep-dive below ~10%, not to skip above it. Fix: label C2O as a confirmed-open investigation item in the report when it contributes >15% of ΔCVR and no branch was opened, and add a one-line callout explaining what was observed (C2O declined X → Y) even if the mechanism was not investigated.

---

### 5. Evidence Strength — 4/5

Every claim in findings.md has a named source (summary.json field, BQ query result, or report table row). The −122 checkout impact for UTV Raptor is derived explicitly (2,132 post users × −5.73pp rate delta). The 28/30 zero-day count traces to the daily time-series BQ query. Confidence qualifiers are correct: "confirmed" where query results are direct, "consistent with" for the spillover mechanism where only indirect evidence exists.

**Gap:** The "gradual 90-day structural decline since February 2026" framing in the timing section is stated as a finding, but the investigation window's pre period (Mar 13 – Apr 12) was already degraded (pre_period_healthy = false). The pre-period CVR of ~6–7% in February 2026 is cited as the baseline, but there is no named BQ query result that provides the February 2026 S2C rate specifically for TID 80074 — the transcript references the trend_context 90-day rolling chart but does not show the actual February S2C values for the fixed segment. The structural_delta_cvr = −4.94pp is from summary.json but covers total CVR, not S2C specifically.

**Why:** [EXEC_ERROR] — SKILL.md, Step 2b check: "Every count or computed metric cited anywhere in findings.md — it must have a named Source in the Evidence inventory." The February 2026 CVR ~6–7% claim cites "summary.json → trend_context" but the trend_context series is at CVR level, not S2C level, and not filtered to the fixed segment. The findings.md Evidence inventory lists this as "Confirmed" against trend_context. The number is accurate at the whole-CE level but the source should clarify this is whole-CE CVR, not fixed-segment S2C.

---

### 6. Output Appropriateness — 4/5

The report is shaped by the finding. The device breakdown table appears with a neutral verdict line (ruled out — broad cross-device decline). The Jurassic Zipline improvement appears in the experience table and is called out in subtext as the inverse confirmation rather than being buried as a footnote. The inventory section correctly omits the 8–13d and 14–30d charts (healthy buckets per spec), showing only the two buckets relevant to the finding (0–2d and 3–7d). The proportional Shapley flex bar is used rather than a waterfall chart.

**Gap:** The 8–13d and 14–30d chart omissions are not accompanied by the inline replacement sentence specified in report_structure.md: *"[X–Yd bucket: all experiences maintained available tickets throughout (range: N–M tickets). Not charted.]"* A reader scanning the inventory section will notice only two of four expected lead-time charts and have no indication that the other two were assessed and found healthy — vs simply not run.

**Why:** [EXEC_ERROR] — report_structure.md, "Omit non-informative buckets": "Replace it with a single inline sentence immediately before the next chart heading: *[X–Yd bucket: all experiences maintained available tickets throughout (range: N–M tickets). Not charted.]*" The omission was correct; the replacement sentence was not rendered. Fix: write the inline sentence for each omitted bucket.

---

### 7. DRI & Actionability — 4/5

The P1 card names TID 80074 explicitly, names "UTV Raptor Tour" (not just "the main experience"), names the supply team's contact path (Ops/BDM → SP/API), and names the specific configuration to check (cut-off period / release window). The P2 card names TGID 37863. The P3 card gives the Microsoft Ads CVR delta (4.06% → 2.33%) and the volume change (+340 sessions) — quantified enough to hand off. A GM could forward all three cards without additional interpretation.

**Gap:** The P3 action card for Microsoft Ads says "audit Microsoft Ads campaigns for potential traffic quality issues or new lower-intent campaigns" — this is directional but stops short of a specific testable step. It does not name what the performance marketer should look at (e.g., check campaign log for new campaigns or bid strategy changes in the post period, or look at audience targeting changes that explain the 20% volume surge with lower CVR).

**Why:** [MISSING_INSTRUCTION] — Searched SKILL.md, hypothesis.md (Pattern 7), actions.md, report_structure.md — none specify what "audit" means for a paid channel anomaly where volume grew and CVR dropped. The anomaly was correctly flagged but the action card generation guidance in actions.md (RC7 — traffic quality) does not cover a same-channel volume-up/CVR-down pattern specifically. Fix: add to actions.md a cause category for "same-channel volume surge with CVR decline" — the standard first-step action is to check for new campaigns, audience expansion, or broad-match keyword additions in the channel log.

---

## Top improvements for next run

1. **Open a C2O decomposition branch when Shapley share exceeds 15%.** In this run, C2O contributed −2.59pp (22%) and was dropped after L0. Even a single c2o_sub read from summary.json (C2A rate vs A2O rate) would either confirm C2O is in the same supply story or surface a separate finding worth a report callout. The cost is one query; the gain is a complete funnel picture.

2. **State explicitly in the tree map when a first-pass branch is ruled out by inference from another result.** Language was skipped because the geo overview showed a uniform drop — that logic is valid, but it never appeared as a `→ RULED OUT` entry in the tree map. Future readers of the transcript (or the evaluator) cannot tell if language was skipped intentionally or overlooked. One line in the map closes this.

3. **Add inline "not charted" sentences for omitted inventory buckets.** The spec requires a replacement sentence when a time-series chart is omitted. Skipping it creates an unexplained gap in the report for readers who count four expected bucket charts and see only two. This is a one-line fix per omitted bucket.

---

## Failure Mode Summary

| Gap (short label) | Theme | Tag | Fix target |
|-------------------|-------|-----|------------|
| Lead-time table lacks pre-emptive supply vs traffic verdict | T1 | [AMBIGUOUS_INSTRUCTION] | report_structure.md — add spec note: verdict line must distinguish supply-constrained vs traffic-reduced buckets in same table |
| Action card doesn't rank competing mechanisms by base rate | T2 | [MISSING_INSTRUCTION] | hypothesis.md Pattern 4 — add: when mechanism unresolvable, action card leads with highest-frequency historical mechanism (API cut-off) |
| Language branch not explicitly ruled out in tree map | T3 | [EXEC_ERROR] | SKILL.md transcript format — add: if a first-pass branch is skipped because another result implies it, mark RULED OUT with the inference stated |
| C2O not branched despite 22% Shapley share | T4 | [EXEC_ERROR] | SKILL.md L2+ — clarify: "do not deep-dive below ~10%" means open a C2O branch if share ≥15%, even if it is not the primary step |
| February 2026 baseline CVR cited without fixed-segment source | T5 | [EXEC_ERROR] | SKILL.md Step 2b evidence inventory — add: source must specify segment filter if claim is not whole-CE level |
| Omitted inventory charts lack replacement inline sentences | T6 | [EXEC_ERROR] | report_structure.md "Omit non-informative buckets" — add rendered example of the replacement sentence in the spec |
| P3 Microsoft Ads action lacks specific first step | T7 | [MISSING_INSTRUCTION] | actions.md — add cause category: same-channel volume-up/CVR-down; standard first action is check campaign log for new campaigns or audience expansion |
