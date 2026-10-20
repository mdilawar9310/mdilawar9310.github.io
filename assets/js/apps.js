/*
  App list for the "Apps & Games" section.
  To add an app: put icon.webp + shot-1..3.webp in assets/apps/<slug>/ and add an entry below.
  type: "game" or "tool" (controls the filter). shots: how many shot-N.webp files exist.
*/
window.APPS = [
  {
    slug: "prism-harbor",
    name: "Prism Harbor",
    package: "com.dilawar.prismharbor",
    type: "game",
    tag: "Puzzle game",
    description: "Drag jewel blocks, clear lines and relax. An offline block puzzle with no ads.",
    shots: 3
  },
  {
    slug: "hexora",
    name: "Hexora: Stack & Merge",
    package: "com.dilawarzaman.hexora",
    type: "game",
    tag: "Puzzle game",
    description: "Stack, merge and clear glossy hexagons in a calm puzzle game. Fully offline.",
    shots: 3
  },
  {
    slug: "wildroot-run",
    name: "Wildroot Run",
    package: "com.dilawarzaman.wildrootrun",
    type: "game",
    tag: "Runner game",
    description: "Leap roots, slide under boughs and outrun the Thornback. Offline, no ads.",
    shots: 3
  },
  {
    slug: "pech-kas",
    name: "Pech Kas: Bolt Workshop",
    package: "com.dilawarzaman.pechkas",
    type: "game",
    tag: "Puzzle game",
    description: "Unscrew colourful bolts, sort them into toolboxes and clear 150 workshop benches.",
    shots: 3
  },
  {
    slug: "gravity-flip-bubbles",
    name: "Gravity Flip Bubbles",
    package: "com.dilawarzaman.gravityflipbubbles",
    type: "game",
    tag: "Bubble shooter",
    description: "Bubble shooter with a twist: every few shots the whole board flips 90°.",
    shots: 3
  },
  {
    slug: "royal-dice-arena",
    name: "Royal Dice Arena",
    package: "com.loecapital.royaldicearena",
    type: "game",
    tag: "Board game",
    description: "Elegant offline Ludo with smart computer rivals and local multiplayer.",
    shots: 3
  },
  {
    slug: "brick-breaker",
    name: "Brick Breaker",
    package: "com.dilawarzaman.brickbreaker",
    type: "game",
    tag: "Arcade game",
    description: "Smash bricks across 150 levels, 6 worlds and 3 modes. No ads, fully offline.",
    shots: 3
  },
  {
    slug: "snapsize",
    name: "SnapSize: Photo Resizer & KB",
    package: "com.dilawarzaman.snapsize",
    type: "tool",
    tag: "Utility",
    description: "Resize and compress photos to an exact KB size. Fully offline, no ads.",
    shots: 3
  },
  {
    slug: "safescan",
    name: "SafeScan",
    package: "com.dilawarzaman.safescan",
    type: "tool",
    tag: "Utility",
    description: "Private document scanner. PDF, text and signatures, fully offline on your phone.",
    shots: 3
  }
];
