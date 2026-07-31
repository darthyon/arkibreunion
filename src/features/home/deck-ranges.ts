export type DeckMode = "desktop" | "tablet" | "mobile";

export type DeckRanges = {
  /** Fractional distances from centre that the ranges below are keyed to. */
  anchors: number[];
  x: number[];
  y: number[];
  scale: number[];
  rotate: number[];
  opacity: number[];
  zIndex: number[];
};

const OFFSETS = {
  desktop: { near: 268, far: 456 },
  tablet: { near: 202, far: 344 },
  mobile: { near: 164, far: 314 }
} as const;

/**
 * Maps a card's distance from the centre of the deck onto its transform. The
 * deck interpolates between these anchors continuously, so a card halfway
 * through a drag sits halfway between two resting states.
 *
 * The outermost anchor is the loop seam (half the deck, so ±2.5 for five
 * cards). Opacity is 0 there, which is what lets a card jump from one end of
 * the deck to the other without being seen. Assumes at least five cards; with
 * fewer, the seam would fall inside the visible fan.
 */
export function getDeckRanges(mode: DeckMode, itemCount: number): DeckRanges {
  const offsets = OFFSETS[mode];
  const isMobile = mode === "mobile";
  const seam = Math.max(2.5, itemCount / 2);

  return {
    anchors: [-seam, -2, -1, 0, 1, 2, seam],
    x: [
      -(offsets.far + 140),
      -offsets.far,
      -offsets.near,
      0,
      offsets.near,
      offsets.far,
      offsets.far + 140
    ],
    y: [
      isMobile ? 42 : 56,
      isMobile ? 26 : 44,
      isMobile ? 18 : 28,
      0,
      isMobile ? 18 : 28,
      isMobile ? 26 : 44,
      isMobile ? 42 : 56
    ],
    scale: [
      0.72,
      isMobile ? 0.8 : 0.78,
      isMobile ? 0.92 : 0.88,
      1,
      isMobile ? 0.92 : 0.88,
      isMobile ? 0.8 : 0.78,
      0.72
    ],
    rotate: [
      -4,
      isMobile ? -2.3 : -3.5,
      isMobile ? -1.4 : -2,
      0,
      isMobile ? 1.4 : 2,
      isMobile ? 2.3 : 3.5,
      4
    ],
    opacity: [0, isMobile ? 0.55 : 0.9, 0.96, 1, 0.96, isMobile ? 0.55 : 0.9, 0],
    zIndex: [0, 10, 20, 30, 20, 10, 0]
  };
}
