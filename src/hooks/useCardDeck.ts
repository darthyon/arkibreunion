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

export function useCardDeck({
  itemCount,
  initialIndex = DEFAULT_ACTIVE_HOME_CARD_INDEX
}: UseCardDeckOptions) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goTo = useCallback(
    (index: number) => {
      if (itemCount <= 0) {
        return;
      }

      const nextIndex = ((index % itemCount) + itemCount) % itemCount;
      setActiveIndex(nextIndex);
    },
    [itemCount]
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

      if (offset.x < -swipeDistance || velocity.x < -swipeVelocity) {
        next();
        return;
      }

      if (offset.x > swipeDistance || velocity.x > swipeVelocity) {
        previous();
      }
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

  return {
    activeIndex,
    goTo,
    next,
    previous,
    getDistance,
    handleDragEnd,
    handleKeyDown
  };
}
