"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { DEFAULT_ACTIVE_HOME_CARD_INDEX } from "@/lib/constants";

type DragResult = {
  offset: {
    x: number;
  };
  velocity: {
    x: number;
  };
};

type UseCardDeckOptions = {
  itemCount: number;
  initialIndex?: number;
};

type LastMove = {
  /** 1 = advanced, -1 = went back, 0 = no move yet. */
  direction: number;
  /** Positions travelled along the shortest path. */
  step: number;
};

// Flick speed is carried into the settle spring so a hard swipe lands harder
// than a lazy one. Clamped because motion's spring takes px/s and an
// unbounded flick overshoots the deck.
const MAX_HANDOFF_VELOCITY = 1600;

export function useCardDeck({
  itemCount,
  initialIndex = DEFAULT_ACTIVE_HOME_CARD_INDEX
}: UseCardDeckOptions) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [dragVelocity, setDragVelocity] = useState(0);
  // Which way the deck last travelled, and by how many positions. The view uses
  // this to spot cards that looped from one end to the other.
  const [lastMove, setLastMove] = useState<LastMove>({ direction: 0, step: 0 });

  const midpoint = Math.floor(itemCount / 2);

  const goTo = useCallback(
    (index: number) => {
      if (itemCount <= 0) {
        return;
      }

      const nextIndex = ((index % itemCount) + itemCount) % itemCount;
      let delta = nextIndex - activeIndex;

      if (delta > midpoint) {
        delta -= itemCount;
      }

      if (delta < -midpoint) {
        delta += itemCount;
      }

      setActiveIndex(nextIndex);
      setLastMove({ direction: Math.sign(delta), step: Math.abs(delta) });
      // Buttons, dots and keys settle from rest; only a drag hands off speed.
      setDragVelocity(0);
    },
    [activeIndex, itemCount, midpoint]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const getDistance = useCallback(
    (index: number) => {
      if (itemCount <= 0) {
        return 0;
      }

      let distance = index - activeIndex;
      const midpoint = Math.floor(itemCount / 2);

      if (distance > midpoint) {
        distance -= itemCount;
      }

      if (distance < -midpoint) {
        distance += itemCount;
      }

      return distance;
    },
    [activeIndex, itemCount]
  );

  const handleDragEnd = useCallback(
    ({ offset, velocity }: DragResult) => {
      const swipeDistance = 58;
      const swipeVelocity = 520;
      const handoff = Math.max(
        -MAX_HANDOFF_VELOCITY,
        Math.min(MAX_HANDOFF_VELOCITY, velocity.x)
      );

      if (offset.x < -swipeDistance || velocity.x < -swipeVelocity) {
        next();
        setDragVelocity(handoff);
        return;
      }

      if (offset.x > swipeDistance || velocity.x > swipeVelocity) {
        previous();
        setDragVelocity(handoff);
        return;
      }

      // Below threshold: the card springs back to centre, and it should carry
      // the flick that failed to commit.
      setDragVelocity(handoff);
    },
    [next, previous]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    },
    [next, previous]
  );

  // True when a card reached its new distance by looping past the end of the
  // deck rather than sliding one seat across. Advancing by `step` positions
  // wraps every card that lands within `step` of the trailing edge.
  const hasWrapped = useCallback(
    (distance: number) => {
      if (lastMove.step === 0) {
        return false;
      }

      if (lastMove.direction > 0) {
        return distance >= midpoint - lastMove.step + 1;
      }

      if (lastMove.direction < 0) {
        return distance <= -midpoint + lastMove.step - 1;
      }

      return false;
    },
    [lastMove, midpoint]
  );

  return {
    activeIndex,
    dragVelocity,
    hasWrapped,
    goTo,
    next,
    previous,
    getDistance,
    handleDragEnd,
    handleKeyDown
  };
}
