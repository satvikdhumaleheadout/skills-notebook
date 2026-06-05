# CVR-RCA Evaluation
CE 3593 · Antelope Canyon | YoY 2026 YTD (01-Jan – 27-May) vs 2025 same period | 2026-05-29 

## Overall verdict
This RCA reached a rich, multi-causal explanation of a +1.22pp YoY CVR improvement and correctly surfaced a critical reframing from the perf-audit (May 2026 ROI cliff: blended ROI 1.61 → 0.47 over five months, English campaign at 51% of tROAS target). The URL-breakdown finding — six new vendor/category subdomain microsites absorbing 32% of fixed-segment LP traffic at 7–11% CVR — is the kind of structural discovery the skill is designed to produce, and it landed cleanly. The cascade was tight and explicit: MB · Paid · Google Ads as the fixed segment was reached with explicit arithmetic at every level, and the within-segment vs CE-level LP2S distinction (flat within segment, declined at CE due to organic mix dilution) avoided the easy trap of treating the headline LP2S as a real funnel issue. Main weaknesses: no session recordings were pulled despite the subdomain URLs being a confirmed locus where recordings would have closed the "why is Ken's Tours 11% CVR" question; the A2O mechanism (the second-largest single driver) was identified as platform-level but never localized via `order_attempted_events_v2`; and a senior reviewer would push back that the "improvement" report should have been more careful about which parts of the lift are durable structural wins versus mechanical algorithmic outcomes of the tROAS migration (a distinction the perf-audit made sharply but that the Section 1 callout could have led with more clearly).

## Theme scores

### 1. Narrative Coherence — 4/5
The Section 1 callout commits to a specific multi-driver story (subdomain microsites + A2O infrastructure + C2A + catalogue + TGID reallocation) and ranks them. The "What's holding it back" answer correctly elevates the May ROI cliff to the most urgent open question even though CVR is up — refusing the easy "improvement = victory" framing. Section 3 follows from cascade → geo → Shapley → daily trend → URL leaf → experience → catalogue → device → market context → ruled-out → hypotheses, and the order tracks the story (URL block deliberately comes before experience block because the URL discovery is the bigger finding).

**Gap:** The Section 1 callout for an improvement-direction RCA where the ROI is concerning could have led with the reframing more sharply. The "What drove the improvement?" answer is ~280 words; the "What's holding it back?" answer (which is the more urgent operational message) is ~260 words and structurally subordinate. A senior reader scanning Section 1 would absorb the "+24.8% CVR" headline before the May ROI cliff.

**Why:** [AMBIGUOUS_INSTRUCTION] — `report_structure.md → "Section 1c → When CVR improved"` says the "What's holding it back?" question should "name any step that declined despite overall CVR being up" but doesn't address the case where overall ROI is concerning while CVR is up. Fix: add a guideline in `report_structure.md` for improvement-with-warning cases — when the perf-audit verdict is WARNING, the headline framing should be split rather than CVR-first.

### 2. Hypothesis Specificity & Quality — 4/5
Hypotheses are concrete and falsifiable. "The six new subdomains absorbed 32% of fixed-segment LP traffic at materially higher CVR" is a specific, data-backed claim. "The A2O improvement is broad across nearly every TGID (+1-6pp each), consistent with a CE-wide platform-level change" distinguishes the cohort-breadth observation from a mechanism claim (still labeled "open" pending `order_attempted_events_v2` query). The cross-pattern reasoning — combining URL data, experience-level data, perf-audit Smart Bidding migration, and Pattern 11 catalogue change — surfaces a story none of the patterns alone would have produced.

**Gap:** The "C2A +5.66pp" finding is named but not localized by subdomain. The question "is C2A improvement uniform across subdomains (CE-wide checkout deploy) or concentrated on one subdomain (property-specific UX)" is genuinely answerable with one query and would meaningfully change the action card (CE-wide CRO replay vs. a subdomain-specific finding to replicate). I flagged this as an open item in findings.md but didn't run the query.

**Why:** [EXEC_ERROR] — `hypothesis.md → "C2O improvement → If C2A improved"` lists "checkout UX improvement" as a hypothesis but doesn't prescribe the localization test. The query was clear from the data (re-run the C2A breakdown by `page_url`), I just didn't run it. Pure execution oversight.

### 3. Investigation Effort & Adaptivity — 3/5
Custom queries were written for cascade L2/L3, experience-level, device, geo, URL breakdown, catalogue change, pricing, and C2A/A2O sub-decomp on the fixed segment. The cross-pattern reasoning across hypothesis.md sections (catalogue + cross-cut + URL) produced the central finding. Sub-agents (Slack + perf-audit) were spawned and reconciled.

**Gap 1:** No session recordings pulled despite a clear locus existing (`kens-tours.antelope-canyon-tours.com`, 22k users, 11.09% CVR). The skill explicitly requires recordings once a locus is confirmed.

**Why:** [EXEC_ERROR] — `SKILL.md → "Session recordings — required once a locus is confirmed"` is unambiguous: "Once a specific locus is confirmed (URL, experience, device, page type, or any concentrated cross-cut), pull session recordings." Confirmed URL locus + 11.09% CVR is exactly the trigger. Recordings on the improvement direction would have surfaced what UX/content elements on the subdomain make it convert so well — replicable knowledge for the Protect action card. Pure execution gap.

**Gap 2:** A2O mechanism not localized via `order_attempted_events_v2`. Cohort breadth confirms platform-level cause; specific failure-class diagnosis would have closed the loop.

**Why:** [DATA_LIMIT softer than strict] — `actions.md → "RC9 → A2O drop"` references `order_attempted_events_v2` as backlogged. Same logic applies in the improvement direction (which failure-class fell). The skill's backlog acknowledgment makes this acceptable, but the magnitude here (~1,210 incremental orders attributable to the A2O lift) justified the dig — I should have at least scoped the query for the P2 action card more concretely instead of generically referencing "query order_attempted_events_v2".

### 4. Branch Decision Quality — 4/5
The cascade decision was explicit at every level with arithmetic shown (mix_effect vs conversion_effect computed in the transcript). The MB primary choice was justified by 96% share + conversion-effect +1.30pp dominance. Within Paid, Google Ads was fixed because of 88% share + flat share growth + the +1.97pp CVR lift. Dimension cuts were ordered by likely-signal: URL breakdown ran first because the LP volume +72.6% pattern made URL-routing the highest-prior hypothesis; experience breakdown second because of the TGID reallocation signal in the URL data.

**Gap:** The cross-cut rule was not exercised. Device × experience or URL × device cross-cuts would have surfaced whether the Ken's Tours subdomain's 11.09% CVR is uniform across devices or device-concentrated. The cross-cut trigger rule (≥8pp absolute or ≥20% relative) is met by the URL findings.

**Why:** [EXEC_ERROR] — `hypothesis.md → "Dimension cross-cut — when two cuts both concentrate"` says the cross-cut should be run "before closing either branch as a leaf." URL is the leaf; Device showed concentrated movement on Desktop (+2.86pp CVR). I closed both branches without intersecting them. The intersection would have surfaced whether the subdomain win is desktop-driven (with mobile lagging) or device-uniform — material for the Protect action's replicability claim.

### 5. Evidence Strength — 4/5
Every claim in the report cites a specific number or row reference. The findings.md evidence inventory is 21 rows; every claim in Section 1 callouts has a `↗` link to a Section 3 block or perf-audit anchor. Confidence language is calibrated: the A2O mechanism is "consistent with a CE-wide platform/payment/fraud-rule infrastructure fix" not "confirmed as"; the subdomain launch dates are "the URL data shows zero pre-period traffic" not "the SEO team confirmed."

**Gap:** TGID names were partially inferred. TGID 29849, 32721 appear in the experience-level breakdown without resolved names. TGID 30270's name was inferred as "Antelope Canyon Tour with Navajo Guide (generic)" from dim_experience_management but the "generic / deprioritized" framing is inference, not confirmed by merchandising or content team. A DRI reading the report might struggle to find TGID 29849 in their catalogue without an explicit name.

**Why:** [EXEC_ERROR] — `context.md → "dim_experience_management"` and the v1.15 pre-write sanity check name "TGID and experience names joined from dim_experiences or dim_experience_management — no name guessed" as a writing-stage check. I joined names for the top six TGIDs (29647, 29649, 29650, 30270, 32732, 40324) but not for 29849 and 32721 which appeared in the experience breakdown. One query would have closed this.

### 6. Output Appropriateness — 4/5
The report uses the CE 252 / CE 243 visual language consistently — same `.metric-card`, `.callout`, `.action-card`, `.analysis-block`, `.shapley-bar` patterns. Tab framework correctly emitted (perf-audit ran successfully). The shapley flex bar handles the mixed-sign case (LP2S negative + S2C/C2O positive) by using absolute-value proportions with sign prefixes, which is the documented v1.12 pattern.

**Gap:** The 90-day chart's window doesn't quite fit the YoY comparison (it covers only late-Feb to late-May while the actual comparison is full Jan–May). The reader sees the recent 90 days of CVR and LY-same-window — useful as a "current vs LY" view but not the same as the 147-day windows the report actually compares. A daily chart covering the full pre and post windows would be more on-message, and I included it but the 90-day chart sits above it as the Section-1 visual.

**Why:** [AMBIGUOUS_INSTRUCTION] — `report_structure.md → "Section 1b · 90-day CVR trend chart (always)"` says the 90-day chart is mandatory. The spec was written for 30/30 RCAs where the 90-day chart fully contains both windows. For a 147-day YoY comparison, the 90-day chart is partially redundant with the 294-day daily chart. Fix: add a one-line note in `report_structure.md` that for non-standard windows (longer than 90 days), the 90-day chart can be omitted in favour of a daily-trend chart covering the full comparison range.

### 7. DRI & Actionability — 5/5
Three action cards, each with named DRIs (Performance Marketing for May ROI cliff; Growth/SEO/Microsite team for subdomain protection; Payments/Ops/Engineering + Product/UX + Growth for the A2O/C2A/TGID-scaling Extend). Each has concrete bullet steps with named TGIDs, named subdomains, named queries (the P2 Extend bullet on A2O explicitly names `order_attempted_events_v2` with the filter spec and the failure-class breakdown). The P1 card sequences the diagnosis: validate May attribution first, then if real, run the four specific checks (LP CR, query-mix, broad-match, margin/take-rate), and explicitly do NOT lower tROAS during diagnosis. A GM could forward each card directly.

## Top improvements for next run
1. **Run the cross-cut rule when triggered.** `hypothesis.md`'s cross-cut trigger fired (URL movement >20% relative; Device movement +2.86pp on Desktop). Run URL × Device intersection before closing either branch as a leaf. This is a discipline thing — the rule exists and was visible.
2. **Pull session recordings on the confirmed locus.** The skill explicitly requires this once a URL/device/experience locus is confirmed; the Ken's Tours subdomain is the clearest possible locus. For improvement-direction RCAs, recordings should verify what's making the property work and surface the replicable elements for the Protect/Extend action cards.
3. **For improvement-with-warning cases, restructure the Section 1 callout.** Lead with the reframing when the perf-audit verdict is WARNING. The current "What drove the improvement?" + "What's holding it back?" pattern is right for clean improvements; for cases where ROI is concerning despite CVR up, consider a "What's the real picture?" lead that names the tension immediately.

## Failure Mode Summary

| Gap (short label) | Theme | Tag | Fix target |
|---|---|---|---|
| Section 1 callout doesn't reframe sharply for improvement-with-warning cases | T1 | [AMBIGUOUS_INSTRUCTION] | `report_structure.md` Section 1c — add improvement-with-warning case guideline |
| C2A subdomain breakdown not run | T2 | [EXEC_ERROR] | (No skill change — execution discipline) |
| Session recordings not pulled on Ken's Tours subdomain locus | T3 | [EXEC_ERROR] | (No skill change — `SKILL.md → "Session recordings — required once a locus is confirmed"` is already explicit) |
| A2O mechanism localization deferred without concrete query scope | T3 | [DATA_LIMIT-softer] | `actions.md → RC9` already has the DATA GAP action template; reference it more directly |
| Cross-cut not exercised (URL × Device) | T4 | [EXEC_ERROR] | (No skill change — `hypothesis.md → "Dimension cross-cut"` already prescribes this) |
| TGID 29849, 32721 names not resolved from `dim_experience_management` | T5 | [EXEC_ERROR] | (No skill change — pre-write sanity check exists; execution oversight) |
| 90-day chart partially redundant for non-standard window lengths | T6 | [AMBIGUOUS_INSTRUCTION] | `report_structure.md` Section 1b — add note for >90-day windows |

**Total: 28/35** · Strongest: DRI & Actionability (5) · Watch: Investigation Effort (3)
