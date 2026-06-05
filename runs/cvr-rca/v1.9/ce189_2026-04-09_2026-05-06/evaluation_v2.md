# Evaluation v2 — CE 189 · Vatican Museums
Re-scored after post-evaluation inventory check (May 8, 2026)
Previous scores in brackets for comparison.

Changes applied before this re-score:
- Inventory re-queried: TIDs 52850 and 67659 show 0 tickets across all lead-time buckets in BOTH pre and post periods — supply ruled out and confirmed closed
- findings.md open item "Inventory: DATA_LIMIT" → "Inventory: CLOSED — supply ruled out"
- report.html experience breakdown subtext updated: DATA_LIMIT language replaced with the specific ruling-out evidence (zeros in both windows, 7 remaining TIDs = unlimited capacity)
- report.html Ruled-Out block: Supply/inventory added as an explicit ruled-out dimension with supporting data

---

## 1. Overall Verdict

The supply ruling-out materially strengthens this RCA. What was the biggest factual gap — an unresolved open item about whether inventory constrained TGID 6732 during the post period — is now closed with direct evidence: both limited-capacity TIDs had zero tickets across all lead-time windows in both the pre and post periods, confirming no supply change occurred between windows. The seasonal composition hypothesis is now confirmed rather than "consistent with," and the report explicitly rules out supply alongside device, language, and session recordings. The two remaining gaps are process issues that skill files should address: trend charts not filtered to the fixed segment (an EXEC_ERROR), and the missing controlled comparison excluding holiday dates (an EXEC_ERROR in Step 2b).

---

## 2. Theme Scores

### T1 — Narrative Coherence · Score: 4 [unchanged]

The report flows cleanly from callout to actions to supporting evidence. Supply is now explicitly ruled out in the Ruled-Out Dimensions block alongside device and language, giving the reader a complete picture of what was checked and eliminated. The root cause callout is specific, the action cards name TGID 6732 and mobile, and the Ruled-Out section is appropriately brief.

**Remaining gap:** Daily S2C trend chart and TGID 6732 daily chart appear to be rendered at full CE level rather than filtered to the fixed segment (MB · Google Ads) as report_structure.md requires. A reader who notices that the mix cascade above scopes to MB · Google Ads but the time-series below shows a different population will find an implicit inconsistency.

**Why:** `[EXEC_ERROR]` — report_structure.md, Section 3: "All trend charts filtered to the fixed segment." The fixed segment is declared in the mix cascade; the Plotly IIFEs for the daily trend charts were not constructed with the matching WHERE clause. Fix: add `is_microbrand_page = TRUE AND channel_name = 'Google Ads'` to the queries feeding the daily trend IIFEs.

---

### T2 — Hypothesis Specificity & Quality · Score: 5 [was 5, unchanged]

The seasonal composition hypothesis is now fully confirmed rather than "consistent with." Supply has been ruled out, device and language show no concentration, and the geo + holiday timing signals are specific and data-backed. The hypothesis names the mechanism (lower-intent post-Easter visitors), the segment (European markets, domestic Italy most affected), the timing (gradual from Apr 23, troughs on Apr 25 and May 1), and the structural calibration (structural delta ≈ 0 vs LY). No change in score — this was already 5/5 in v1.

---

### T3 — Investigation Effort & Adaptivity · Score: 4 [unchanged]

The post-evaluation inventory check demonstrates adaptivity — the investigation correctly re-ran when the DATA_LIMIT assumption was challenged and produced a definitive ruling-out. All standard S2C branches ran; TGID 6732 was drilled to daily granularity; session recordings were attempted. The investigation stopped at the leaf.

**Remaining gap:** SKILL.md Step 2b requires a controlled comparison for any calendar event cited as a cause. Italian Liberation Day (Apr 25) and Labour Day (May 1) are cited as supporting mechanism evidence, but the investigation does not compute TGID 6732 S2C for the post period with those two dates excluded. Without this, the holiday dates could be amplifiers of a broader shift rather than primary drivers — the magnitude attributable to the holidays specifically is unknown.

**Why:** `[EXEC_ERROR]` — SKILL.md, Step 2b: "Any calendar event (holiday, peak, school break) cited as a cause → is there a controlled comparison showing the metric with vs. without those dates?" Holiday dates were identified and annotated but no exclusion-comparison query was run. Fix: add a "holiday exclusion check" query computing average post S2C for TGID 6732 excluding Apr 25 and May 1, compared to the pre average.

---

### T4 — Branch Decision Quality · Score: 5 [unchanged]

Mix cascade correct with explicit arithmetic at all three levels. Shapley routing correct (S2C 63% opened, C2O 28% deferred, LP2S 9% not opened). Experience-level breakdown opened after device/language showed no concentration. Geo branch opened in parallel as a high-prior hypothesis given the seasonal L0 signal. No branch was opened speculatively.

---

### T5 — Evidence Strength · Score: 5 [was 4, +1]

The inventory ruling-out closes the main evidence gap from v1. Every material claim in the report is now fully confirmed:
- Seasonal composition: structural delta 0.002pp ≈ 0 (summary.json) + LY identical pattern (summary.json) — **Confirmed**
- Supply ruled out: TIDs 52850/67659 show 0 tickets in both pre and post (BQ inventory_availability daily time-series) — **Confirmed**
- Holiday mechanism: TGID 6732 S2C = 17.0% on Apr 25, 16.3% on May 1 (BQ daily query) — **Confirmed**
- European vs US differential: Italy −4.7pp, US −0.9pp (BQ geo query) — **Confirmed**

The LY calibration caveat (Vatican closure during Easter 2025 potentially depressing the LY pre-period baseline) remains an acknowledged nuance in findings.md. It is visible in the 90-day chart LY overlay but not explicitly called out in report subtext — a minor presentation gap, not a confidence issue for the root cause.

---

### T6 — Output Appropriateness · Score: 4 [unchanged]

Supply now appears as an explicit ruled-out item in the Ruled-Out Dimensions block alongside device and language — correctly positioned and concisely stated. The report does not add an inventory chart block (correctly, since the finding is a ruling-out rather than a confirmation, and the evidence is a simple zero-count observation not worth a Plotly chart). The TGID 6732 holiday annotation chart remains the strongest custom visualization.

**Remaining gap:** Trend charts rendered at full CE level rather than filtered to fixed segment (MB · Google Ads).

**Why:** `[EXEC_ERROR]` — report_structure.md, Section 3: "All trend charts filtered to the fixed segment." Fix: re-render `s2c-trend` and `tgid-6732-trend` Plotly IIFEs with fixed-segment-filtered query results.

---

### T7 — DRI & Actionability · Score: 4 [unchanged]

Two P2 action cards. Card 1 (seasonal monitoring) has explicit close/escalate conditions — names TGID 6732, monitoring threshold, and review date. Card 2 (C2A checkout friction review) names TGID 6732 and mobile.

**Remaining gap:** The investigation tree map concludes C2A −3.0pp is "consistent with composition effect, no UX/payment issue." The C2A action card directs a DRI to investigate checkout friction — a mechanism the investigation attributed to the same seasonal composition shift driving S2C. The card is not wrong (session recordings were unavailable, so friction cannot be fully eliminated) but it should explicitly scope the action as a precautionary check contingent on S2C normalising, not as a standalone confirmed finding.

**Why:** `[EXEC_ERROR]` — report_structure.md, Section 2 DRI standard and actions.md RC-pattern: a C2A action card is warranted when C2A is attributed to a distinct UX/pricing mechanism. Here C2A was attributed to composition effect; the action card should reflect that hedge explicitly. Fix: add a qualifier to the C2A card ("if S2C normalises post-season but C2A remains depressed, investigate checkout friction") rather than framing it as an unconditional P2 action.

---

## 3. What Improved and What Remains

**Improved (score changed):**
- T5: +1 — Supply ruling-out closes the main evidence gap; all material claims now confirmed

**Substantively improved but score unchanged:**
- T2: Supply ruling-out upgrades the hypothesis from "consistent with" to confirmed; score was already 5/5

**Unchanged and requires skill-file fix:**
- T1/T6: Trend charts not filtered to fixed segment — report_structure.md
- T3: Holiday controlled comparison missing — SKILL.md Step 2b
- T7: C2A action card inconsistent with composition attribution — actions.md

---

## 4. Failure Mode Summary — Remaining Gaps

| Gap (short label) | Theme | Tag | Fix target |
|---|---|---|---|
| Daily trend charts not filtered to fixed segment | T1, T6 | `[EXEC_ERROR]` | report_structure.md — add explicit instruction that Plotly trend IIFEs must use fixed-segment-filtered query results |
| No controlled comparison excluding holiday dates | T3 | `[EXEC_ERROR]` | SKILL.md Step 2b — the calendar-event check is present but was not applied; add example showing the holiday-exclusion query as required output |
| LY baseline anomaly not explained in report subtext | T5 | `[MISSING_INSTRUCTION]` | report_structure.md — add spec for surfacing LY baseline anomalies (venue closures, known dips) as a subtext note below the 90-day chart |
| C2A action card inconsistent with composition attribution | T7 | `[EXEC_ERROR]` | actions.md — gate: C2A action card only when C2A is attributed to a distinct UX/pricing mechanism; composition-attributed C2A does not warrant a standalone card |

---

**Total: 31/35** [was 30/35, +1]
Δ from v1: T5 +1 — supply ruling-out closes the main evidence gap
Strongest: Hypothesis Specificity (T2 · 5/5) + Branch Decision Quality (T4 · 5/5) + Evidence Strength (T5 · 5/5)
Watch: Investigation Effort (T3 · 4/5) — holiday controlled comparison; Output Appropriateness (T6 · 4/5) — fixed segment on trend charts
