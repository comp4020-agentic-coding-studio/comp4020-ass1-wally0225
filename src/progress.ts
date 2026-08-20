import { STAGES, type Stage } from "./stages";

// Everything here is a pure function of a 0..1 scroll-progress value — no DOM.
// That's deliberate: it's the part of the core interaction worth locking down
// with a fast unit test, independent of however the motion itself is drawn.

// Continuous position across the journey: 0 at the very start of the Sun,
// STAGES.length - 1 once the visitor has scrolled all the way to the Orca.
export function positionForProgress(progress: number, stageCount = STAGES.length): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped * (stageCount - 1);
}

// The nearest stage to the current position — drives which illustration,
// fact, and "stage N of M" label are shown.
export function stageIndexForProgress(progress: number, stages: Stage[] = STAGES): number {
  const pos = positionForProgress(progress, stages.length);
  return Math.min(stages.length - 1, Math.round(pos));
}

// The live percentage reading, interpolated between stages. Holds at the
// Phytoplankton baseline (normally 100%) throughout the Sun stage — the sun's
// energy hasn't been spent by anything yet, so the reading starts full rather
// than showing nothing.
export function energyPercentForProgress(
  progress: number,
  stages: Stage[] = STAGES,
): number | null {
  const pos = positionForProgress(progress, stages.length);
  if (pos < 1) return stages[1]?.energyPercent ?? null;

  const lowerIndex = Math.min(Math.floor(pos), stages.length - 2);
  const upperIndex = lowerIndex + 1;
  const lower = stages[lowerIndex].energyPercent;
  const upper = stages[upperIndex].energyPercent;
  if (lower == null || upper == null) return null;

  const t = pos - lowerIndex;
  return lower + (upper - lower) * t;
}

export function formatEnergyPercent(percent: number | null): string {
  return percent === null ? "" : `≈ ${percent.toFixed(2)}%`;
}
