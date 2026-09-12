/**
 * Scene-space anchors for London ambient overlays (2048×1152).
 * Tuned to the raster day/night masters — decorative, not structural.
 */

export const LONDON_ENV = {
  river: {
    y: 488,
    height: 42,
  },
  lamps: [
    { id: 'lamp-near-left', x: 268, y: 402, radius: 54 },
    { id: 'lamp-promenade-1', x: 812, y: 338, radius: 42 },
    { id: 'lamp-promenade-2', x: 1064, y: 338, radius: 40 },
    { id: 'lamp-promenade-3', x: 1318, y: 338, radius: 42 },
    { id: 'lamp-near-right', x: 1788, y: 392, radius: 48 },
  ],
  windows: [
    { x: 42, y: 128, w: 16, h: 20 },
    { x: 78, y: 168, w: 16, h: 20 },
    { x: 114, y: 128, w: 16, h: 20 },
    { x: 196, y: 148, w: 14, h: 18 },
    { x: 236, y: 188, w: 14, h: 18 },
    { x: 1888, y: 118, w: 16, h: 20 },
    { x: 1930, y: 158, w: 16, h: 20 },
    { x: 1972, y: 118, w: 16, h: 20 },
    { x: 1860, y: 200, w: 14, h: 18 },
  ],
  shelterGlow: { x: 300, y: 500, w: 170, h: 42 },
  platformPools: [
    { x: 240, y: 848 },
    { x: 520, y: 848 },
    { x: 800, y: 848 },
    { x: 1080, y: 848 },
    { x: 1360, y: 848 },
    { x: 1640, y: 848 },
    { x: 1880, y: 848 },
  ],
} as const;
