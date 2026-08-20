# Process overview

A reading-guide to how the work came together --- a map to your process, not an
essay about it.

## What I built

**The Great Energy Chase** is a scrollytelling explainer of trophic energy
loss: a single scroll gesture carries the visitor through an 11-stage marine
food chain (sun → phytoplankton → zooplankton → krill → small fish → mackerel
→ squid → tuna → seal → great white shark → orca), while a live percentage
readout and a shrinking, darkening backdrop make the point of view --- animals
get bigger, energy gets smaller --- felt rather than just stated. Everything on
the page, including all 11 organism illustrations, is original hand-drawn
inline SVG.

## The moments that mattered

1. **Inconsistent outline weight across illustrations.** Two of the eleven SVGs
   (the sun's rays, the phytoplankton's spikes) had heavier stroke-width
   overrides than the shared default, so they read as bolder than the rest of
   the set even though nothing else about their style differed. Instead of
   eyeballing which illustrations "looked off," I audited every stroke-width
   declaration across all eleven entries in `src/illustrations.ts` and found
   exactly two outliers, which is what told me the fix was those two
   overrides and nothing structural. Verified by comparing closeup screenshots
   of every organism side by side after removing them
   ([`dd6ef45`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-wally0225/commit/dd6ef45)).

2. **A background decoration clipped at the SVG edge.** The seaweed fronds I
   added looked flat-tipped and near-identical in length. The cause wasn't
   the path shapes themselves but their tip coordinates sitting right on the
   `viewBox` boundary, so the rounded stroke-cap was rendered half off-canvas.
   Rather than just nudging the curve, I recalculated each tip with margin
   from the edge and deliberately different y-values, then re-screenshotted
   at both marking viewports to confirm no tip was cut off and the three
   fronds read as genuinely different lengths
   ([`3433dc4`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-wally0225/commit/3433dc4)).

3. **One threshold instead of two.** When asked to make the energy-remaining
   chip flip to a lighter background at the same moment the body text turns
   white, the obvious approach was a new hardcoded progress value. Instead I
   added `chipBackgroundForProgress` in `src/theme.ts` against the *existing*
   `TEXT_COLOR_SWITCH_PROGRESS` constant already driving the body-text flip,
   so the two can never drift out of sync if that threshold is tuned later.
   Confirmed by scrolling through the switch point and screenshotting the
   chip immediately before and after
   ([`3f9eac8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-wally0225/commit/3f9eac8)).

4. **Testing the interaction, not the boilerplate.** The starter's placeholder
   test didn't assert anything about this prototype. I replaced it with
   assertions against the actual contract: the progress-to-energy-percent
   curve, stage ordering, percentage formatting, and the rendered panel
   markup, so a future change that breaks the scroll interaction fails a test
   instead of just looking wrong in a screenshot
   ([`1875d4b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-wally0225/commit/1875d4b)).

## Where to look

`pnpm check` (typecheck, build, lint, 25 tests) is green on every commit
above. The four commits split the working prototype by concern --- data/logic,
illustrations, page assembly, spec --- rather than one dump.
