// Pure color logic for the "surface to deep sea" backdrop, kept DOM-free like
// progress.ts so the readability rule (does the text stay legible against
// whatever blue is currently behind it?) can be locked down with a test
// instead of eyeballed in a browser.

const SURFACE: [number, number, number] = [214, 240, 250]; // pale sky/surface blue
const DEEP: [number, number, number] = [8, 24, 44]; // near-black deep-sea navy

function mix(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

export function oceanColorForProgress(progress: number, depthOffset = 0): string {
  const t = Math.min(1, Math.max(0, progress + depthOffset));
  const [r, g, b] = [0, 1, 2].map((i) => mix(SURFACE[i], DEEP[i], t));
  return `rgb(${r} ${g} ${b})`;
}

// Text flips from black to white exactly when the visitor reaches Mackerel
// (stage 6, progress 0.45) — tied to the stage boundary itself (progress *
// (STAGES.length - 1) rounds to stage index 5 starting at 0.45) rather than
// an approximate luminance reading, so it lines up with a stage the visitor
// can name instead of a shade of blue.
const TEXT_COLOR_SWITCH_PROGRESS = 0.45;

export function readableTextColorForProgress(progress: number): string {
  return progress < TEXT_COLOR_SWITCH_PROGRESS ? "#222222" : "#ffffff";
}

// The stage-percent chip flips together with the page's main text at the
// same Mackerel boundary: a dark pill with light text up to that point, then
// a lighter blue pill with black text from there on — so the chip is never
// light-on-light or dark-on-dark no matter which side of the switch it's on.
export function chipBackgroundForProgress(progress: number): string {
  return progress < TEXT_COLOR_SWITCH_PROGRESS ? "rgb(8 24 44 / 80%)" : "rgb(191 227 245 / 95%)";
}

export function chipTextColorForProgress(progress: number): string {
  return progress < TEXT_COLOR_SWITCH_PROGRESS ? "#f0f7fa" : "#222222";
}
