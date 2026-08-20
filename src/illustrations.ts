// Flat vector-icon style, one per stage, drawn as inline SVG markup strings so
// there's no external asset pipeline and no license to track — every shape
// below is an original redraw inspired by common flat-icon conventions (bold
// dark outline, few flat colour fills, minimal interior detail), not a trace
// of any third-party asset. Each body shape carries its own fixed flat fill
// colour (a real, identifying colour — golden sun, green phytoplankton,
// black-and-cream orca) so species are recognisable from silhouette *and*
// colour, not shape alone. The ink outline stays stroke="currentColor", which
// the page already flips black/white against the darkening ocean background,
// so the outline reads against both the fill and the page regardless of
// scroll depth. Small solid accents (eye pupils) use a fixed dark fill rather
// than the adaptive outline colour, since a flat-icon eye should stay dark
// regardless of theme. The bold default stroke-width="4" is the icon's main
// outline; interior accent lines (a mouth, a single stripe, a whisker) use a
// thinner stroke-width so they read as secondary to the main silhouette.
// Every viewBox stays "0 0 120 80" so all 11 scale together at the same
// aspect ratio as the journey progresses.
const WRAP = (inner: string) =>
  `<svg viewBox="0 0 120 80" role="img" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

export const ILLUSTRATIONS: Record<string, string> = {
  // A flat-icon sun: rounded ray bars, drawn at the same default outline
  // weight as every other organism's silhouette, radiating from a plain
  // golden disc, with a simple dot-eyed smiling face.
  sun: WRAP(`
    <path d="M60 6v14M60 60v14M20 40h14M86 40h14" />
    <path d="M31 11l10 10M89 11l-10 10M89 69l-10-10M31 69l10-10" />
    <circle cx="60" cy="40" r="17" fill="#ffc94d" />
    <circle cx="53" cy="37" r="2.6" fill="#222" stroke="none" />
    <circle cx="67" cy="37" r="2.6" fill="#222" stroke="none" />
    <path d="M52 47c3 3 5 4 8 4s5-1 8-4" stroke-width="3" />
  `),

  // A flat "spiky ball" diatom: a plain green disc ringed by short spike
  // bars (same default outline weight as every other organism) radiating
  // evenly in every direction — radial and boxed-in, never bilateral or
  // jointed, which is what keeps it distinct from the zooplankton drawn just
  // below.
  phytoplankton: WRAP(`
    <circle cx="60" cy="40" r="15" fill="#7cc576" />
    <path d="M60 25v-9M60 55v9M45 40h-9M75 40h9" />
    <path d="M49 29l-7-7M71 29l7-7M71 51l7 7M49 51l-7 7" />
    <circle cx="55" cy="36" r="2" fill="#3f8f3f" stroke="none" />
    <circle cx="66" cy="44" r="2" fill="#3f8f3f" stroke="none" />
  `),

  // A flat copepod: one oval body, a single dot eye, two long swept-back
  // antennae, a couple of short jointed legs, and a small forked tail —
  // bilateral and jointed where phytoplankton is radial, so the two never
  // read as the same creature.
  zooplankton: WRAP(`
    <path d="M40 40c0-10 9-16 20-16 13 0 26 6 26 16s-13 16-26 16c-11 0-20-6-20-16Z" fill="#f2a679" />
    <circle cx="48" cy="35" r="3" fill="#222" stroke="none" />
    <path d="M42 30c-6-5-9-11-10-17M46 28c-4-6-5-11-4-17" stroke-width="3" />
    <path d="M50 52c-1 4 0 8 2 11M60 53c0 4 1 8 3 11" stroke-width="3" />
    <path d="M86 34c5-2 10-1 13 2M86 46c5 2 10 1 13-2" stroke-width="3" />
  `),

  // Shrimp-like, not fish-like: a banana-curved segmented body, a fan-shaped
  // tail with its own flat lobe, a few bold swimming-leg ticks, a curling
  // antenna, and an oversized dot eye — krill's signature tell versus a
  // generic shrimp.
  krill: WRAP(`
    <path d="M18 36C22 24 34 16 48 14C64 12 82 18 92 28C96 34 96 40 92 46C80 54 40 56 24 48C18 44 16 40 18 36Z" fill="#ff8c5a" />
    <path d="M90 36c6-6 16-8 22-4 4 3 4 9 0 13-6 5-16 4-22-3-3-3-3-4 0-6Z" fill="#ff8c5a" />
    <path d="M46 20c8-2 16-1 22 2" stroke-width="3" />
    <path d="M36 52l-4 8M48 54l-3 9M60 55l-1 9M72 53l2 9" stroke-width="4" />
    <path d="M20 34c-8-6-14-14-12-22" stroke-width="4" />
    <circle cx="20" cy="31" r="4" fill="#222" stroke="none" />
  `),

  // The plain, generic schooling fish: small flat body, a simple triangular
  // dorsal fin, and a modest fork tail — deliberately the least decorated of
  // the fish silhouettes so mackerel's stripes+fork and tuna's crescent+fins
  // read as clear upgrades in complexity down the chain.
  "small-fish": WRAP(`
    <path d="M14 40c14-14 46-14 62 0-16 14-48 14-62 0Z" fill="#f2ece0" />
    <path d="M76 40c9-9 20-11 24-8-4 3-6 5-6 8s2 5 6 8c-4 3-15 1-24-8Z" fill="#f2ece0" />
    <path d="M42 26c4-6 10-8 15-7-1 6-6 10-11 12Z" fill="#f2ece0" />
    <circle cx="27" cy="37" r="3" fill="#222" stroke="none" />
  `),

  // Mackerel's two signature tells: a couple of bold barring stripes across
  // the back and a forked tail, plus a raised triangular dorsal fin in its
  // own darker shade — enough to read as a clear step up from the plain
  // small-fish silhouette.
  mackerel: WRAP(`
    <path d="M8 40c17-18 60-18 80 0-20 18-63 18-80 0Z" fill="#3f8f8a" />
    <path d="M86 40l22-15v9l-9 6 9 6v9l-22-15Z" fill="#3f8f8a" />
    <path d="M46 24c4-7 11-11 18-10-2 6-8 11-14 13Z" fill="#2f726d" />
    <path d="M26 30c8 5 14 5 22 0M40 25c10 6 18 6 27 0" stroke-width="3" />
    <circle cx="20" cy="38" r="3" fill="#222" stroke="none" />
  `),

  // Squid, not octopus: a pointed triangular mantle with a pair of flat
  // arrow-shaped fins at its base, two round eyes with a distinct bright
  // sclera and dark pupil, and a pair of long looping tentacles below —
  // exactly the tells the reference icon leans on, redrawn as flat shapes.
  squid: WRAP(`
    <path d="M60 8c8 10 14 20 16 28 2 9-3 15-16 15s-18-6-16-15c2-8 8-18 16-28Z" fill="#c9636b" />
    <path d="M40 34c-8 2-14 6-18 11 3 1 6 1 9 0 3-4 6-8 9-11Z" fill="#e0797f" />
    <path d="M80 34c8 2 14 6 18 11-3 1-6 1-9 0-3-4-6-8-9-11Z" fill="#e0797f" />
    <circle cx="52" cy="46" r="6" fill="#e8b84b" />
    <circle cx="68" cy="46" r="6" fill="#e8b84b" />
    <circle cx="52" cy="46" r="2.6" fill="#2c2c4a" stroke="none" />
    <circle cx="68" cy="46" r="2.6" fill="#2c2c4a" stroke="none" />
    <path d="M44 52c-6 0-11 3-13 8M76 52c6 0 11 3 13 8" stroke-width="3" />
    <path d="M44 58c-3 6-2 13 3 18 4-4 4-10 1-15Z" fill="#c9636b" />
    <path d="M76 58c3 6 2 13-3 18-4-4-4-10-1-15Z" fill="#c9636b" />
    <path d="M55 58c-1 6 0 11 2 15M65 58c1 6 0 11-2 15" stroke-width="3" />
  `),

  // Bulkier than mackerel, with the two tells mackerel lacks: two dorsal fins
  // (plus a matching flat-shaped anal fin) in yellowfin gold, and a deeply
  // forked crescent (lunate) tail rather than mackerel's shallower fork.
  tuna: WRAP(`
    <path d="M4 40c18-20 72-23 98-4-7 3-11 3-15 4 4 1 8 1 15 4-26 19-80 16-98-4Z" fill="#3a5f7d" />
    <path d="M96 40l21-16-5 16 5 16-21-16Z" fill="#3a5f7d" />
    <path d="M38 19c4-9 12-13 19-13 0 8-5 12-12 16Z" fill="#f2c14e" />
    <path d="M64 23c3-5 8-8 13-7-1 5-5 8-10 10Z" fill="#f2c14e" />
    <path d="M42 61c3 7 9 10 15 11 1-6-3-11-9-14Z" fill="#f2c14e" />
    <circle cx="23" cy="37" r="3" fill="#222" stroke="none" />
  `),

  // Redrawn after a real seal illustration: a single flat peachy-tan tone
  // carried through the torso, the fused fan-shaped tail flippers and the
  // front flipper (told apart by outline, not a different shade, the same
  // convention as the orca's fins below), a lifted rounded head with a brow
  // ridge over a dark almond eye, a dark button nose, a fan of whiskers, and
  // a couple of thin belly-crease lines for the torso's characteristic
  // wrinkled blubber.
  seal: WRAP(`
    <path d="M10 40C4 24 22 8 42 10 66 12 88 18 98 32c3 3 3 6 0 9-2 3-2 4 1 6 4 3 4 7 1 10-9 11-38 15-62 8-20-6-30-16-30-25Z" fill="#f2b98a" />
    <path d="M96 38c8-10 18-14 22-9-2 6-8 11-14 14-3 1-6 0-8-5Z" fill="#f2b98a" />
    <path d="M97 47c7 10 17 15 21 10-1-6-7-12-13-16-3-2-6-1-8 6Z" fill="#f2b98a" />
    <path d="M72 54c9 2 17 8 19 18-9 1-17-3-22-11-2-4-1-6 3-7Z" fill="#f2b98a" />
    <path d="M77 62l3 8M83 64l2 8M88 65l1 7" stroke-width="2.5" />
    <path d="M28 58c5 4 10 5 15 4M43 61c5 3 10 3 14 1" stroke-width="2.5" />
    <path d="M18 22c2-3 6-4 9-3" stroke-width="3" />
    <circle cx="26" cy="27" r="3.2" fill="#222" stroke="none" />
    <circle cx="10" cy="40" r="2.3" fill="#222" stroke="none" />
    <path d="M10 40l-8-4M10 40l-9 0M10 40l-8 4M10 38l-6-7M10 42l-6 7" stroke-width="2" />
  `),

  // The shark tells, all present and none shared with the orca below: a
  // pointed conical snout, a tall standalone triangular dorsal fin rising
  // clear of the back, a dark open jaw with a bold jagged row of teeth, a
  // flat pectoral fin, and a heterocercal tail with a much taller upper lobe
  // than lower lobe.
  "great-white-shark": WRAP(`
    <path d="M4 46c22-20 76-24 102-13-8 4-13 8-15 13 2 5 7 9 15 13-26 11-80 7-102-13Z" fill="#8a99a6" />
    <path d="M50 34c2-10 8-17 16-19 3 7 0 14-7 19-3 1-6 1-9 0Z" fill="#8a99a6" />
    <path d="M88 48l31.5-45-11.25 37.5 3.375 7.5-3.375 6 9 24-29.25-30Z" fill="#8a99a6" />
    <path d="M42 58c-2 7 0 13 5 18 5-4 6-10 3-16-2-2-5-2-8-2Z" fill="#8a99a6" />
    <path d="M8 48c4 6 10 10 17 11 2-4 1-8-2-11-5-2-10-2-15 0Z" fill="#7a2020" />
    <path d="M10 50l3 3 3-3 3 3 3-3" stroke="#f2f2f2" stroke-width="2.5" />
    <circle cx="22" cy="38" r="3" fill="#222" stroke="none" />
  `),

  // The orca tells, redrawn to match the reference's actual palette rather
  // than a plain black-and-white cartoon: a dark grey-blue body (never true
  // black), a lighter grey-blue accent carried through the dorsal fin, the
  // pectoral flipper and a stripe along the back toward the tail, a pale
  // cream belly, a soft pale-blue eye patch, and a separate dark eye dot
  // near the snout — no pointed shark-like snout, a short flat fluke instead
  // of a tall vertical tail, and a blunt rounded head from the body outline
  // alone.
  // Recolored to match true orca markings rather than a soft flat-icon
  // palette: a near-black body and fins (fins are the same colour as the
  // body on a real orca, told apart by silhouette, not accent colour), a
  // pale grey "saddle patch" behind the dorsal fin, and white for the belly
  // and the eye patch.
  orca: WRAP(`
    <path d="M4 44c18-22 68-24 88-6-6 3-9 5-11 8 2 3 5 5 11 8-20 18-70 14-88-4Z" fill="#12151c" />
    <path d="M92 44L114 20L108 44L114 68Z" fill="#12151c" />
    <path d="M10 48c12 8 40 13 64 8 3 5 8 6 13 5-24 12-64 6-77-13Z" fill="#eef2f5" />
    <path d="M50 24c2-12 11-16 22-17 4 9-1 15-14 18Z" fill="#12151c" />
    <path d="M66 26c9 3 15 11 16 21-7 2-13-2-17-9-2-4-2-8 1-12Z" fill="#c9d1d6" />
    <path d="M26 48c-10 6-16 16-14 28 10-2 18-12 20-24-1-2-3-3-6-4Z" fill="#12151c" />
    <path d="M28 28c-3 3-4 7-1 10 4 1 8-1 9-5-1-3-4-5-8-5Z" fill="#eef2f5" stroke="none" />
    <circle cx="16" cy="40" r="2.2" fill="#050608" stroke="none" />
  `),
};
