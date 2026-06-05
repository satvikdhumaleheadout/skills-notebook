# CVR-RCA Evaluation
CE 3593 · Antelope Canyon | 2026-03-22→04-20 vs 2026-04-21→05-20 | 2026-05-21

## Overall verdict
Strong RCA. The headline is genuinely tricky — CVR is statistically flat (−0.08pp) so a template-driven investigation would conclude "nothing happened" and stop. This run correctly read the L0 signals (mix dominant, structural −0.77pp vs LY, pre_period_healthy=false, traffic −11.5%) as evidence that something real was happening *underneath* the offsetting Shapley contributions, drilled the cascade to the kens-tours subdomain through URL breakdown, and pinpointed the exact break date (May 7, 2026) before Slack corroboration arrived. The data-derived finding matched the documented mitigation cause (Ken's Tours legal Cease & Desist) to the day. Main weakness: the investigation did not pull session recordings — though, for an intentional ad-LP swap, recordings have little additional evidence value.

## Theme scores

### 1. Narrative Coherence — 5/5
**Justification:** Hero callout opens with the volume reality ("Headline CVR is flat … the real cost is volume: LP −11.5% and orders −12.6%") rather than parroting the −0.08pp number. The Shapley block names the offsetting structure ("LP2S −0.38pp and C2O +0.36pp are real but offset to a near-zero net ΔCVR. The volume loss, not the rate composition, is what to act on") so the reader is not confused by the percentage-contribution column showing 489% / -466%. Section 3 reads as a single converging argument: cascade → URL → channel → date. No filler.

### 2. Hypothesis Specificity & Quality — 5/5
**Justification:** The root cause names a specific subdomain, a specific channel, a specific date, and (post-Slack) a specific legal mechanism — kens-tours.antelope-canyon-tours.com, Google Ads, May 7 2026, Ken's Tours C&D. The hypotheses table tests both the obvious paths (mix shift Level 1, funnel rate breakage) and the speculative ones (the kens-tours subdomain might be broken — which Slack confirmed was the deliberate deletion) and labels each outcome cleanly.

### 3. Investigation Effort & Adaptivity — 4/5
**Justification:** Eight custom BQ queries beyond the baseline (cascade L1/L2/L3, organic channel breakdown, geo overview, URL breakdown, kens-tours channel split, daily kens-tours timeline, weekly URL group trend). The investigation drilled adaptively: URL breakdown produced kens-tours → channel split produced Google Ads → daily timeline produced May 7. Each query was the next-most-informative one given what the prior query showed.

**Gap:** Session recordings on the kens-tours subdomain (e.g. during late April when the subdomain was still active) were not pulled.
**Why:** [AMBIGUOUS_INSTRUCTION] — `SKILL.md → "Session recordings — required once a locus is confirmed"`: *"Once a specific locus is confirmed (URL, experience, device, page type, or any concentrated cross-cut), pull session recordings ... If recordings are skipped, the report must explicitly state why (volume too low or no concentrated locus found)."* The kens-tours URL IS a confirmed locus, so the instruction triggers. But for a routing/acquisition-source story (campaign stopped delivering, funnel itself didn't break) recordings have minimal evidence value — the question is "why did the source stop?", which recordings cannot answer. The skill does not distinguish "locus where funnel broke" (recordings needed) from "locus where traffic disappeared" (recordings not informative). Fix: clarify in `SKILL.md` Session recordings section that for traffic-source / routing root causes, recordings are not required; state this exception explicitly so the omission is justified rather than appearing as an oversight.

### 4. Branch Decision Quality — 5/5
**Justification:** The L0 signals (mix_dominance=TRUE, structural −0.77pp, pre_period_healthy=false) were read correctly as "the headline is misleading; this is a routing story" and the cascade was the right first move. At L2 the cascade properly exited (mix-vs-conversion arithmetic showed mix effects within margin of conversion effects) and investigation pivoted to URL breakdown rather than continuing to L3 channel decomposition. URL breakdown immediately concentrated on kens-tours, and the channel split inside kens-tours pointed to Google Ads with no ambiguity. Each branch was the next-best query given the previous result.

### 5. Evidence Strength — 5/5
**Justification:** Every number in the report has a named source. The kens-tours daily timeline table cites raw user counts and order counts day-by-day so the May 7 break is verifiable line-by-line. Slack corroboration is cited with specific thread links, and the report distinguishes data-derived findings (10.9% CVR on the subdomain) from Slack-derived numbers (7%+ ad-group CVR per the MMP) and notes the difference is "directionally consistent, different denominator."

### 6. Output Appropriateness — 4/5
**Justification:** Used red callout for the decline (correct — orders are down even though CVR is flat). Dual-axis daily chart (users + orders) makes the single-day collapse visually unambiguous. The May 7 break date is annotated directly on both the 90-day chart and the daily kens-tours chart with vertical dashed lines.

**Gap:** The 90-day chart shows the LY overlay above current line for much of the early period — suggesting CE 3593 outperformed LY in March, then converged in late April/May. The callout subtext says "Current CVR runs broadly above LY all year, then converges with — and dips below — LY in mid-May" but the chart actually shows current ABOVE LY for most of the window. Re-reading the data: current Feb 20 = 6.7% vs LY 6.6%; March averages ~8% vs LY ~6%; late April current dips to 5-6% while LY rebounds to 6-7%. So current was ahead, lost the lead, and is now behind. The subtext is roughly correct but the phrasing could be sharper to match what the chart actually shows.
**Why:** [EXEC_ERROR] — Chart was rendered correctly per `report_structure.md → "90-day chart spec"` which describes correct trace assembly. Claude wrote the subtext from memory of `summary.json.trend_context` (ly_delta_cvr=+0.44pp, current_delta_cvr=−0.33pp at the *post-period* calendar position, not whole-window) rather than from re-reading the chart. Fix: when writing the 90-day chart subtext, explicitly compute and cite the within-pre-period vs within-post-period averages rather than only the trend_context fields.

### 7. DRI & Actionability — 4/5
**Justification:** Action 1 names a specific revenue envelope ($25-50K/year from the Slack-corroborated estimate), a specific channel team, and three testable steps (verify post-swap CVR, build replacement high-intent paths, establish a monthly watch). Action 2 surfaces the Apr 29 seasonality-prune as a separate confound that needs decomposition — concrete next query is named.

**Gap:** Action 1 does not name a deadline or owner-by-name. The skill spec calls for "a GM reading the report could forward the action card directly to the DRI without additional interpretation" — "Performance Marketing" is broad; a named owner (Saurabh? Deeksha? the CE 3593 paid lead) would make it forwardable.
**Why:** [MISSING_INSTRUCTION] — Searched `report_structure.md → Section 2 → "DRI naming standard"`. The spec example names a *team* and a *task* but not an individual owner: *"Supply team — check availability configuration for Keukenhof Entry Tickets ... API cut-off period may be restricting inventory the SP has available."* The skill does not require named individual owners, and named individuals can churn between investigations. Fix: optional but useful — add a note in `report_structure.md` Section 2 that when Slack context surfaces named DRIs (e.g. "Deeksha executed the LP swap"), the action card may name that individual as the suggested first contact.

## Top improvements for next run
1. **When `mix_dominance.is_dominant=true` AND traffic delta exceeds ±10%, lead the cascade with a URL breakdown before Level 3 channel decomposition** — the URL was the locus in this CE because the traffic loss was at the subdomain level, not the channel level. Going to L3 (channels within paid) would have found Google Ads as the volume loser but missed that the loss was concentrated in one specific URL. Encode in `hypothesis.md` as a routing-exit branch hint: "if mix exit at L2 and traffic Δ > ±10%, run URL breakdown before channel decomp."
2. **Pull the previous_page_url breakdown for the kens-tours subdomain** to confirm whether the lost traffic was specifically branded ad-clickthroughs vs other entry paths. Not strictly necessary here (Slack confirmed the cause) but would have closed the loop entirely from BQ alone before Slack arrived.
3. **For intentional/legal mitigation cases, the action focus shifts from "investigate cause" to "size and replace the lost revenue."** The first draft of Action 1 (pre-Slack) was "investigate why Google Ads stopped serving"; the post-Slack version pivoted correctly to "build replacement high-intent paths." When Slack corroborates a deliberate cause, the action template should follow that pivot automatically.

## Failure Mode Summary

| Gap (short label) | Theme | Tag | Fix target |
|---|---|---|---|
| Session recordings not pulled on confirmed kens-tours locus | T3 | [AMBIGUOUS_INSTRUCTION] | `SKILL.md` Session recordings — clarify exception for traffic-source / routing root causes where recordings have no evidence value |
| 90-day chart subtext phrasing imprecise vs chart content | T6 | [EXEC_ERROR] | `report_structure.md` 90-day chart spec — require explicit pre vs post window average computation in subtext, not only `trend_context` field citation |
| Action card DRI is a team, not a named individual | T7 | [MISSING_INSTRUCTION] | `report_structure.md` Section 2 DRI naming — optional add for naming individual Slack-surfaced owners |

**Total: 32/35** · Strongest: Narrative Coherence / Hypothesis Specificity / Branch Decision Quality / Evidence Strength (all 5) · Watch: Investigation Effort (4), Output Appropriateness (4), DRI & Actionability (4)
