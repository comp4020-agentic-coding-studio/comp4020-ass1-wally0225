import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { ILLUSTRATIONS } from "../src/illustrations";
import { renderPanelsHTML } from "../src/panels";
import {
  energyPercentForProgress,
  formatEnergyPercent,
  stageIndexForProgress,
} from "../src/progress";
import { STAGES } from "../src/stages";

// The core interaction: the visitor scrolls, which drives a single 0..1
// progress value. That value picks the current stage and the live energy
// percentage — both strictly a function of progress, which is exactly what
// makes it testable without simulating real scroll physics in JSDOM (whose
// layout engine can't produce real scroll offsets anyway). These tests lock
// down that function directly, then check the built page actually wires the
// stages and their percentages into the DOM the function assumes exist.

describe("assignment-1: core interaction — scroll progress drives the journey", () => {
  it("shows the full Phytoplankton-baseline reading during the Sun stage", () => {
    const phytoplankton = STAGES[1];
    expect(energyPercentForProgress(0)).toBeCloseTo(phytoplankton.energyPercent!, 5);
    expect(energyPercentForProgress(0.05)).toBeCloseTo(phytoplankton.energyPercent!, 5);
  });

  it("reaches the final stage's reading at the end of the scroll", () => {
    const last = STAGES.at(-1)!;
    expect(energyPercentForProgress(1)).toBeCloseTo(last.energyPercent!, 5);
  });

  it("strictly decreases as the visitor scrolls further, once past the Sun's flat start", () => {
    // Progress before Phytoplankton (pos < 1, i.e. progress < 1 / (STAGES.length - 1))
    // holds flat at the Sun-stage reading by design, so sampling starts just past it.
    const samples = Array.from({ length: 40 }, (_, i) => 1 / (STAGES.length - 1) + (i * (1 - 1 / (STAGES.length - 1))) / 39)
      .map((p) => energyPercentForProgress(p))
      .filter((p): p is number => p !== null);

    for (let i = 1; i < samples.length; i++) {
      expect(samples[i]).toBeLessThan(samples[i - 1]);
    }
  });

  it("moves through every stage in order as progress goes from 0 to 1", () => {
    const indices = Array.from({ length: 200 }, (_, i) => i / 199).map((p) =>
      stageIndexForProgress(p),
    );
    expect(indices[0]).toBe(0);
    expect(indices.at(-1)).toBe(STAGES.length - 1);
    for (let i = 1; i < indices.length; i++) {
      expect(indices[i]).toBeGreaterThanOrEqual(indices[i - 1]);
    }
    expect(new Set(indices).size).toBe(STAGES.length);
  });

  it("formats the reading as an approximate percentage, never a false-precise one", () => {
    expect(formatEnergyPercent(null)).toBe("");
    expect(formatEnergyPercent(52)).toBe("≈ 52.00%");
    expect(formatEnergyPercent(0.01)).toBe("≈ 0.01%");
  });
});

describe("assignment-1: the rendered journey panels", () => {
  // main.ts renders these into the page at runtime via a module script, which
  // jsdom (used here) never executes — so this asserts on the same pure
  // render function main.ts calls, rather than trying to run the real bundle.
  const doc = new JSDOM(`<div id="track">${renderPanelsHTML(STAGES, ILLUSTRATIONS)}</div>`).window
    .document;

  it("renders one panel per stage, in journey order", () => {
    const panels = [...doc.querySelectorAll("[data-stage-id]")];
    expect(panels.map((p) => p.getAttribute("data-stage-id"))).toEqual(
      STAGES.map((s) => s.id),
    );
  });

  it("gives every non-Sun panel a static, non-interpolated percentage a screen reader can read", () => {
    const percents = STAGES.filter((s) => s.energyPercent !== null).map((stage) => {
      const panel = doc.querySelector(`[data-stage-id="${stage.id}"]`);
      const text = panel?.querySelector(".stage-percent")?.textContent ?? "";
      const match = text.match(/([\d.]+)%/);
      expect(match, `panel for ${stage.id} is missing its percentage text`).toBeTruthy();
      return Number(match![1]);
    });

    for (let i = 1; i < percents.length; i++) {
      expect(percents[i]).toBeLessThan(percents[i - 1]);
    }
  });
});

describe("assignment-1: the built page ships the journey scaffold", () => {
  const distPath = resolve("dist/index.html");
  const built = existsSync(distPath);
  const doc = built
    ? new JSDOM(readFileSync(distPath, "utf8")).window.document
    : null;

  it("built the page", () => {
    expect(built, `${distPath} not found — run pnpm build first.`).toBe(true);
  });

  it("has the decorative live percentage readout", () => {
    expect(doc?.querySelector('[data-testid="energy-percent"]')).toBeTruthy();
  });

  it("has an empty track for the panels to render into", () => {
    expect(doc?.querySelector("#track")).toBeTruthy();
  });
});
