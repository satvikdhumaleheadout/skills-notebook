# CVR-RCA Evaluation
CE 1223 · Pompeii Tickets & Tours | 2026-03-22→04-20 vs 2026-04-21→05-20 | 2026-05-21

## Overall verdict
This is a competent CVR-improvement RCA. The story is committed (broad-based C2O lift in MB · Paid · Google Ads, half seasonal / half structural, Italy domestic volume as the volume engine, HO as a small dilution headwind) and the report ties every numeric claim back to a query result or a `summary.json` field. The main failure mode is **investigation depth on the structural driver** — the report identifies that +0.23pp is structural beyond LY but does not test what produced it (checkout-flow change, intent-quality shift, new TGID 25518 launch timing). Session recordings were not pulled despite the report explicitly labelling Experience 8869 as the locus; that is the largest single gap.

## Theme scores

### 1. Narrative Coherence — 4/5
**Justification:** The hero callout names the segment, the funnel step, the magnitude, and the seasonal-vs-structural split in one paragraph (`MB · Paid · Google Ads`, `C2O 48.9% → 52.7%`, `+0.23pp structural`). Section 3 follows a coherent order — cascade → fixed-segment banner → geo → Shapley → daily trend → sub-step → experience → HO headwind → ruled-out → hypotheses. The HO headwind has its own section flagged as warn-coloured rather than buried in subtext.

**Gap:** The "What's holding it back" callout devotes equal weight to HO as a headwind even though the net CE impact (≈ −0.04pp) is acknowledged as negligible. Reads as if HO is a meaningful drag when the maths show it isn't.
**Why:** [AMBIGUOUS_INSTRUCTION] — `report_structure.md → Section 1c → "When CVR improved" → "What's holding it back"`: *"If CVR improved across all steps, write 'No significant headwinds — all funnel steps improved.'"* — instruction handles the no-headwind case but doesn't specify a magnitude threshold for declaring a "real" headwind vs a noise-level dilution. Fix: add a threshold (e.g., headwind must be ≥ 10% of total ΔCVR in absolute terms to merit its own callout-item) to `report_structure.md` Section 1c.

### 2. Hypothesis Specificity & Quality — 3/5
**Justification:** The hypotheses table is comprehensive (12 hypotheses, mix of ✅/❌/🔄/⚠️) and outcome tags are honest. The catalogue-mix-shift hypothesis is sharp ("Entry Tickets gained share over guided tours and combos"). However the *core* C2A +3.3pp lift hypothesis is not made falsifiable — the report ends at "checkout flow performing better" without naming a specific mechanism (form change, fee transparency, autofill, payment method).

**Gap:** C2A +3.3pp is the largest single sub-step mover in the fixed segment and the report cannot say *why*. It is listed as ⚠️ Data gap in the hypotheses table, which is honest, but no attempt was made to look for a deploy date, a checkout-event breakdown, or a session-recording fishing exercise on the checkout page.
**Why:** [MISSING_INSTRUCTION] — searched `SKILL.md`, `hypothesis.md` Patterns 5 & 6, `context.md`, `report_structure.md`. The C2A/A2O investigation patterns in `hypothesis.md` are written entirely for the *decline* case. There is no first-pass branch set for *unexplained C2A improvement* — should an analyst still pull recordings? Query checkout events? The skill is silent. Fix: add a short "C2O improvement — first-pass branches" section to `hypothesis.md`, mirroring the decline patterns (deploy-date check, recording locus, fee-structure timeline) for the improvement direction.

### 3. Investigation Effort & Adaptivity — 3/5
**Justification:** The investigation ran the full cascade, fixed-segment funnel, geo overview, experience-level breakdown, price & availability check, daily trend, and HO breakdown — five custom BQ queries beyond the baseline pipeline. Stopped sensibly after confirming price/availability ruled out and the lift was broad. But did not pull session recordings on Experience 8869 (the explicit locus per the hypotheses table) and did not pull a daily-by-experience series to test the TGID 25518 launch-timing hypothesis.

**Gap:** Session recordings were not pulled despite TGID 8869 being named as the experience locus.
**Why:** [AMBIGUOUS_INSTRUCTION] — `SKILL.md → "Session recordings — required once a locus is confirmed"`: *"Once a specific locus is confirmed (URL, experience, device, page type, or any concentrated cross-cut), pull session recordings ... Any single confirmed dimension is sufficient."* The instruction is mandatory but written in the context of an investigation where recordings *confirm a regression mechanism*. For an *improvement* with no specific UX hypothesis to verify, the instruction's value is unclear — would recordings on a working checkout flow add evidence, or just confirm normal behaviour? Fix: clarify in `SKILL.md` that the session-recordings requirement applies to both decline and improvement loci, and what the recording analyst should look for in the improvement case (a smooth flow that confirms the data, surfacing of any new UI element since the prior period).

**Gap:** No query for *when* TGID 25518 launched or first appeared in the listing — the 205 → 434 checkout doubling is the strongest "structural change" signal and was not characterised.
**Why:** [MISSING_INSTRUCTION] — Searched `hypothesis.md` Patterns 1–10 and `context.md` Dimensions section. No pattern lists "new TGID launch" as a hypothesis to test, and no query template exists for catalogue-introduction timing (first-appearance date by TGID). Fix: add to `hypothesis.md` a "Catalogue change" hypothesis for *both* decline (new TGID cannibalises) and improvement (new TGID adds incremental value) directions, with a pointer to `dim_experience_management.experience_created_at` or equivalent in `context.md`.

### 4. Branch Decision Quality — 4/5
**Justification:** Cascade was explicit, mix_dominance read at L0 and cited (24% / 21% not dominant), and the fixed segment is declared with arithmetic showing why MB · Paid · Google Ads (88% of paid MB volume) wins. The geo overview was run as a diagnostic (correct — it's an improvement, not a decline, so Italy's surge is informative rather than constraining). The first cuts after the cascade were the highest-signal ones for an improvement case: sub-step decomposition (C2A vs A2O), experience-level (where did C2O lift?), price/availability (could supply explain it?).

**Gap:** Did not run a cross-cut (`device_type × experience_id` or `language × experience_id`) before reporting Experience 8869 and Italy domestic as separate findings.
**Why:** [AMBIGUOUS_INSTRUCTION] — `hypothesis.md → "Dimension cross-cut — when two cuts both concentrate"`: *"When two dimension cuts for the same funnel metric both show a concentrated drop (≥8pp absolute or ≥20% relative in the leading segment)"* — instruction is written for the *drop* case. Geo (Italy +26.7% volume) and experience (8869 +292 orders) both show >20% relative concentration in the *improvement* direction, but the trigger rule is phrased in decline-only language. Fix: rephrase the rule in `hypothesis.md` to "concentrated movement" rather than "concentrated drop" so it triggers for improvements too.

### 5. Evidence Strength — 5/5
**Justification:** Every numeric claim in the report has a named source — `summary.json` field for headline metrics, BQ query for cascade arithmetic, `product_rankings_features` for the price ruling-out, geo query for Italy. Tables include raw user counts (per Section 3 spec) so the reader can judge sample size. Confidence qualifiers are appropriate ("consistent with" for the cannibalisation hypothesis, "Data gap" for unverified C2A mechanism).

### 6. Output Appropriateness — 4/5
**Justification:** Used the green callout for the improvement case (per report_structure.md spec for positive deltas). Daily C2O chart is the right form for a gradual lift. Mix cascade is a single block with three sub-tables, not three separate blocks. Skipped inventory section entirely because supply was ruled out — correct application of the "only include blocks that earned their place" rule.

**Gap:** Shapley flex bar uses `flex: 86 / 23 / 9` for proportional widths, but with a negative LP2S contribution (−9%) the absolute-value treatment compresses C2O's visual dominance — the bar reads "fairly balanced" when in fact C2O is 86% of the move. The Shapley visualisation does not handle mixed-sign contributions cleanly.
**Why:** [AMBIGUOUS_INSTRUCTION] — `report_structure.md → Shapley decomposition block`: *"Use a proportional flex bar — not a Plotly waterfall. Each segment's flex value equals its percentage contribution."* — instruction does not address what to do when one component is negative (offsetting the others). For improvement cases with one funnel step working against the lift, the flex bar misrepresents the relative scale. Fix: spec out a sign-aware Shapley pattern in `report_structure.md` — perhaps use absolute values with a "−" prefix in the label so the negative step still visualises proportionally.

### 7. DRI & Actionability — 3/5
**Justification:** Both action cards name specific teams (Growth/Merchandising + BDM; Performance Marketing + Growth/Analytics). The first card cites specific TGIDs (8869, 25518) and specific dates (May–August). However the actions for a *successful* CVR run are inherently softer than for a regression: "protect the gain" and "investigate why HO is softening" are less crisp than "fix this broken thing." The cards do not give the DRI a specific test to run.

**Gap:** Action 2 ("Investigate why HO LP2S and S2C are softening") is closer to "monitor the situation" than to a testable hypothesis. The card lists three sub-bullets (paid expansion? new SEO? affiliate?) but doesn't propose the specific BQ query the DRI should run.
**Why:** [AMBIGUOUS_INSTRUCTION] — `report_structure.md → Section 2 → "DRI naming standard"`: provides one example for a decline ("Supply team — check availability configuration..."). The skill is silent on what a CVR-improvement action card should look like — protect/extend/investigate-headwind are the three options, but each needs its own template. Fix: add to `report_structure.md` Section 2 a brief sub-spec for improvement cases: (a) "protect" cards must name the ranking/inventory/budget mechanism that supports the gain; (b) "extend" cards must name a segment to grow; (c) "investigate-headwind" cards must propose the specific next query, not just the team to ask.

## Top improvements for next run
1. **Pull session recordings on Experience 8869** even though the move is an improvement. The C2A +3.3pp lift within Google Ads MB is the largest unexplained sub-step movement, and recordings on the checkout page are the cheapest way to surface whether a UI change is responsible.
2. **Query catalogue introduction timing for TGID 25518** (`dim_experience_management.experience_created_at` or a first-appearance date in `product_rankings_features`). If 25518 launched mid-April, that timing alone could explain ~40% of the structural delta and would close the ⚠️ Data gap.
3. **Run a cross-cut of `browsing_country × experience_id`** within the fixed segment. Italy volume rose +26.7% and Experience 8869 added +292 orders — the report treats these as independent findings, but they may describe the same users (Italian visitors buying entry tickets) and the cross-cut would resolve it.

## Failure Mode Summary

| Gap (short label) | Theme | Tag | Fix target |
|---|---|---|---|
| HO headwind callout overstates impact relative to magnitude | T1 | [AMBIGUOUS_INSTRUCTION] | `report_structure.md` Section 1c — add magnitude threshold for declaring a headwind in improvement callouts |
| C2A +3.3pp mechanism left unexplained | T2 | [MISSING_INSTRUCTION] | `hypothesis.md` — add "C2O improvement — first-pass branches" mirroring decline patterns |
| Session recordings not pulled despite confirmed locus | T3 | [AMBIGUOUS_INSTRUCTION] | `SKILL.md` "Session recordings" — clarify requirement applies to improvement loci too, name what to look for |
| Catalogue change (TGID 25518 launch) not tested | T3 | [MISSING_INSTRUCTION] | `hypothesis.md` — add "Catalogue change" hypothesis bidirectionally; `context.md` — pointer to TGID-first-appearance query |
| Cross-cut not run despite two concentrating dimensions | T4 | [AMBIGUOUS_INSTRUCTION] | `hypothesis.md` Dimension cross-cut section — change "concentrated drop" to "concentrated movement" so it triggers for improvements |
| Shapley flex bar misrepresents scale with negative components | T6 | [AMBIGUOUS_INSTRUCTION] | `report_structure.md` Shapley block — add sign-aware spec |
| Investigate-headwind action card lacks a concrete next query | T7 | [AMBIGUOUS_INSTRUCTION] | `report_structure.md` Section 2 — add sub-spec for protect/extend/investigate-headwind cards in improvement cases |

**Total: 26/35** · Strongest: Evidence Strength (5) · Watch: Hypothesis Specificity (3), Investigation Effort (3), DRI &amp; Actionability (3)
