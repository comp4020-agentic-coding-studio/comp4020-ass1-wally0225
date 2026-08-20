// One ordered list describing the whole journey. Pure data — no DOM, no
// rendering — so it can be imported by the page, the tests, and nothing else
// needs to know the sequence of organisms or their numbers.
//
// energyPercent is null only for the Sun: it isn't a trophic level, so it
// carries no energy-remaining reading. The meter activates at Phytoplankton.
//
// These numbers are a deliberately designed curve, not a measured or
// textbook figure — see the footer caveat and CLAUDE.md for why a literal
// fixed 10%-per-level rule would either be too gentle to read as dramatic or,
// applied honestly across ten transfers, collapse to something like
// 0.0000001% (unreadable, and falsely precise either way).
export type Stage = {
  id: string;
  displayName: string;
  fact: string;
  energyPercent: number | null;
};

export const STAGES: Stage[] = [
  {
    id: "sun",
    displayName: "The Sun",
    fact: "The sun powers almost all life in the ocean — everything that follows is borrowed from it, a little less at every step.",
    energyPercent: null,
  },
  {
    id: "phytoplankton",
    displayName: "Phytoplankton",
    fact: "Drifting algae capture sunlight and turn it into the first rung of the food chain.",
    energyPercent: 100.0,
  },
  {
    id: "zooplankton",
    displayName: "Zooplankton",
    fact: "Tiny drifting animals graze on phytoplankton — most of the energy they eat is spent just staying alive.",
    energyPercent: 52.0,
  },
  {
    id: "krill",
    displayName: "Krill",
    fact: "Shrimp-like krill swarm by the billions, filtering zooplankton from the water.",
    energyPercent: 24.0,
  },
  {
    id: "small-fish",
    displayName: "Small fish",
    fact: "Sardines and anchovies feed in huge schools on krill.",
    energyPercent: 11.0,
  },
  {
    id: "mackerel",
    displayName: "Mackerel",
    fact: "Fast, schooling predators that hunt the small fish below them.",
    energyPercent: 5.2,
  },
  {
    id: "squid",
    displayName: "Squid",
    fact: "Quick and jet-propelled, squid chase down mackerel in open water.",
    energyPercent: 2.4,
  },
  {
    id: "tuna",
    displayName: "Tuna",
    fact: "Tuna are built for endurance hunting, covering huge distances to catch squid.",
    energyPercent: 1.1,
  },
  {
    id: "seal",
    displayName: "Seal",
    fact: "Seals dive deep and hold their breath to catch tuna and other fast fish.",
    energyPercent: 0.48,
  },
  {
    id: "great-white-shark",
    displayName: "Great white shark",
    fact: "A great white spends a large share of what it eats just powering its next hunt.",
    energyPercent: 0.15,
  },
  {
    id: "orca",
    displayName: "Orca",
    fact: "By the time the sun's energy reaches an orca, almost none of it is left.",
    energyPercent: 0.01,
  },
];
