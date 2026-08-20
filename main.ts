import { ILLUSTRATIONS } from "./src/illustrations";
import { renderPanelsHTML } from "./src/panels";
import { energyPercentForProgress, formatEnergyPercent, positionForProgress, stageIndexForProgress } from "./src/progress";
import { STAGES } from "./src/stages";
import { chipBackgroundForProgress, chipTextColorForProgress, oceanColorForProgress, readableTextColorForProgress } from "./src/theme";

const journey = document.querySelector<HTMLElement>("#journey");
const stageEl = document.querySelector<HTMLElement>("#stage");
const track = document.querySelector<HTMLElement>("#track");
const energyEl = document.querySelector<HTMLElement>('[data-testid="energy-percent"]');
const counterEl = document.querySelector<HTMLElement>("#stage-counter");
const oceanBg = document.querySelector<HTMLElement>("#ocean-bg");
const restartBtn = document.querySelector<HTMLButtonElement>("#restart-btn");

if (journey && stageEl && track && energyEl && counterEl) {
  // Panels are generated from the stage data rather than hand-written, so the
  // journey and its numbers can only ever say one thing. The big top-center
  // percentage is a decorative, continuously interpolated readout — it's
  // aria-hidden because it updates too often per scroll tick to announce
  // sensibly. The real, fixed reading for every stage is written into that
  // stage's own panel text below, in plain document order — which is also
  // what gives screen reader and keyboard users the full linear narrative
  // without depending on the scroll-linked motion at all.
  track.innerHTML = renderPanelsHTML(STAGES, ILLUSTRATIONS);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = motionQuery.matches;

  function setJourneyHeight() {
    journey!.style.height = `${STAGES.length * window.innerHeight}px`;
  }

  function updateProgress() {
    const maxScroll = journey!.offsetHeight - window.innerHeight;
    const scrolled = -journey!.getBoundingClientRect().top;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrolled / maxScroll)) : 0;

    const stageIndex = stageIndexForProgress(progress);
    const containerWidth = stageEl!.clientWidth;
    const pos = reduceMotion ? stageIndex : positionForProgress(progress);
    track!.style.transform = `translateX(${-pos * containerWidth}px)`;

    const percent = reduceMotion ? STAGES[stageIndex].energyPercent : energyPercentForProgress(progress);
    energyEl!.textContent = formatEnergyPercent(percent);
    counterEl!.textContent = `Stage ${stageIndex + 1} of ${STAGES.length}`;

    // The backdrop runs from pale surface blue to near-black deep-sea navy
    // across the whole page (progress sits at 0 before the journey starts and
    // 1 once it's finished, so the intro and closing sections pick up the
    // ends of the same gradient for free). Text color is re-derived from the
    // ACTUAL current color rather than a fixed stage number, so it stays
    // readable even if the palette above changes later.
    if (oceanBg) {
      oceanBg.style.setProperty("--bg-top", oceanColorForProgress(progress, -0.06));
      oceanBg.style.setProperty("--bg-bottom", oceanColorForProgress(progress, 0.06));
    }
    document.body.style.setProperty("--fg", readableTextColorForProgress(progress));
    document.body.style.setProperty("--chip-fg", chipTextColorForProgress(progress));
    document.body.style.setProperty("--chip-bg", chipBackgroundForProgress(progress));
  }

  let ticking = false;
  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateProgress();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", () => {
    setJourneyHeight();
    onScrollOrResize();
  });
  motionQuery.addEventListener("change", (event) => {
    reduceMotion = event.matches;
    updateProgress();
  });

  restartBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  setJourneyHeight();
  updateProgress();
}
