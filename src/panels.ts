import { formatEnergyPercent } from "./progress";
import type { Stage } from "./stages";

// Pure markup generation, kept separate from main.ts's DOM wiring so the
// output can be asserted on directly — jsdom (used in spec/) never executes
// <script type="module">, so a test that only ran the real page would see
// nothing rendered at all, regardless of whether the page actually works.

const MIN_SIZE = 96;
const MAX_SIZE = 360;
// The Sun isn't part of the "organisms get bigger down the chain" progression
// it kicks off — it's the energy source dwarfing everything that follows, so
// it gets its own size, deliberately larger than the chain's biggest predator.
const SUN_SIZE = 400;

export function sizeForIndex(index: number, stageCount: number): number {
  if (index === 0) return SUN_SIZE;
  if (stageCount <= 1) return MIN_SIZE;
  return MIN_SIZE + (index / (stageCount - 1)) * (MAX_SIZE - MIN_SIZE);
}

// The Sun isn't prey — nothing is "eaten" to produce it, so it gets no
// connector. Phytoplankton is the one other exception: it doesn't eat the
// stage before it, it captures the sun's light directly. Every stage from
// zooplankton on is a straightforward predation step, so "Eaten by" holds for
// all of them. It sits above the illustration as a short cue introducing the
// stage, not a full sentence — the organism names are already the heading
// right below it, so repeating them here would be redundant.
function connectorFor(index: number): string {
  if (index === 0) return "";
  const label = index === 1 ? "Captured by" : "Eaten by";
  return `<p class="connector" aria-hidden="true"><span class="connector-label">— ${label} —</span></p>`;
}

export function renderPanelsHTML(stages: Stage[], illustrations: Record<string, string>): string {
  return stages
    .map((stage, i) => {
      const size = sizeForIndex(i, stages.length);
      const percentLine =
        stage.energyPercent === null
          ? ""
          : `<p class="stage-percent">${formatEnergyPercent(stage.energyPercent)} of the energy reaching here remains.</p>`;
      return `
        <article class="panel" data-stage-id="${stage.id}">
          ${connectorFor(i)}
          <div class="illustration" style="width:${size}px">${illustrations[stage.id]}</div>
          <h2>${stage.displayName}</h2>
          <p>${stage.fact}</p>
          ${percentLine}
        </article>
      `;
    })
    .join("");
}
