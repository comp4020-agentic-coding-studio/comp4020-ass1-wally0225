import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// The published spec for Assignment 1: "the visitor does something that
// changes what they see — state the core interaction plainly enough to write
// a test for it." This is that test. It's red until the core interaction
// exists — once you've built it, replace the selector and the assertion below
// with the real trigger and the real state change. Don't rename an unrelated
// element just to make this pass; the test should describe what the page
// actually does.

describe("assignment-1: core interaction", () => {
  it("changes what the visitor sees when they interact", () => {
    const distPath = resolve("dist/index.html");
    expect(
      existsSync(distPath),
      `${distPath} not found — run pnpm build first.`,
    ).toBe(true);

    const dom = new JSDOM(readFileSync(distPath, "utf8"), {
      runScripts: "dangerously",
      resources: "usable",
      url: `${new URL("dist/index.html", `file://${resolve(".")}/`)}`,
    });
    const doc = dom.window.document;

    // TODO: point this at the real trigger for your core interaction.
    const trigger = doc.querySelector('[data-testid="core-interaction"]');
    expect(
      trigger,
      'No element marked as the core interaction yet. Add data-testid="core-interaction" to it, or change this selector to match what you build.',
    ).toBeTruthy();

    // TODO: replace with an assertion on the actual state change (a value
    // shown, a class toggled, a region revealed) — not just "the HTML moved".
    const before = doc.body.innerHTML;
    trigger?.dispatchEvent(new dom.window.Event("click", { bubbles: true }));
    const after = doc.body.innerHTML;
    expect(after, "Interacting with it should visibly change the page.").not.toBe(before);
  });
});
