"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent
} from "react";
import { animate, useMotionValue, type AnimationPlaybackControls } from "motion/react";
import { DEFAULT_ACTIVE_HOME_CARD_INDEX } from "@/lib/constants";

type UseCardDeckOptions = {
  itemCount: number;
  initialIndex?: number;
  /** Pixels of horizontal travel that equal one card step. */
  stepWidth: number;
  prefersReducedMotion: boolean;
};

const SETTLE_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 34,
  mass: 1
} as const;

/** Movement below this is a tap, not a drag, so taps still select a card. */
const DRAG_THRESHOLD = 4;
/** Seconds of flick velocity projected forward when picking the landing card. */
const FLICK_PROJECTION = 0.14;
/** A flick can skip at most this far, so the deck never spins away. */
const MAX_FLICK_CARDS = 1.6;

/**
 * Folds an unbounded deck position into [-itemCount/2, itemCount/2) so the deck
 * loops. Cards are fully transparent at the extremes, so the jump across the
 * seam is invisible.
 */
export function wrapPosition(value: number, itemCount: number) {
  const half = itemCount / 2;

  return ((((value + half) % itemCount) + itemCount) % itemCount) - half;
}

/**
 * Drives the home card deck as one continuous position rather than a discrete
 * index, so a drag anywhere on the deck moves every card together and the
 * release settles on the nearest card.
 */
export function useCardDeck({
  itemCount,
  initialIndex = DEFAULT_ACTIVE_HOME_CARD_INDEX,
  stepWidth,
  prefersReducedMotion
}: UseCardDeckOptions) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);

  // Fractional position of the deck, in cards. Unbounded: it keeps counting up
  // or down and is wrapped only when a card reads it.
  const offset = useMotionValue(initialIndex);

  const settleRef = useRef<AnimationPlaybackControls | null>(null);
  const stepWidthRef = useRef(stepWidth);
  const reducedMotionRef = useRef(prefersReducedMotion);
  // Set on release after a real drag, so the click that follows a drag does not
  // also activate a card or follow a CTA link.
  const suppressClickRef = useRef(false);
  const pointerRef = useRef({
    id: null as number | null,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    moved: false
  });

  useEffect(() => {
    stepWidthRef.current = stepWidth;
    reducedMotionRef.current = prefersReducedMotion;
  }, [stepWidth, prefersReducedMotion]);

  useEffect(() => () => settleRef.current?.stop(), []);

  const normalize = useCallback(
    (index: number) => ((index % itemCount) + itemCount) % itemCount,
    [itemCount]
  );

  // Animates the deck to a target position, given in the same unbounded units
  // as `offset`. Velocity is in cards per second.
  const settle = useCallback(
    (target: number, velocity = 0) => {
      settleRef.current?.stop();
      setActiveIndex(normalize(target));

      if (reducedMotionRef.current) {
        offset.set(target);
        return;
      }

      settleRef.current = animate(offset, target, { ...SETTLE_SPRING, velocity });
    },
    [normalize, offset]
  );

  const move = useCallback(
    (delta: number) => settle(Math.round(offset.get()) + delta),
    [offset, settle]
  );

  const next = useCallback(() => move(1), [move]);
  const previous = useCallback(() => move(-1), [move]);

  // Travels the short way round to the requested card.
  const goTo = useCallback(
    (index: number) => {
      if (itemCount <= 0) {
        return;
      }

      const current = Math.round(offset.get());
      const midpoint = Math.floor(itemCount / 2);
      let delta = normalize(index) - normalize(current);

      if (delta > midpoint) {
        delta -= itemCount;
      }

      if (delta < -midpoint) {
        delta += itemCount;
      }

      settle(current + delta);
    },
    [itemCount, normalize, offset, settle]
  );

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.button !== 0) {
      return;
    }

    settleRef.current?.stop();
    event.currentTarget.setPointerCapture(event.pointerId);

    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startOffset: offset.get(),
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      moved: false
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const pointer = pointerRef.current;

    if (pointer.id !== event.pointerId) {
      return;
    }

    const dx = event.clientX - pointer.startX;

    if (!pointer.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      pointer.moved = true;
      setIsDragging(true);
    }

    if (!pointer.moved) {
      return;
    }

    const elapsed = event.timeStamp - pointer.lastTime;

    if (elapsed > 0) {
      pointer.velocity = ((event.clientX - pointer.lastX) / elapsed) * 1000;
      pointer.lastX = event.clientX;
      pointer.lastTime = event.timeStamp;
    }

    // Dragging right pulls earlier cards in, which lowers the position.
    offset.set(pointer.startOffset - dx / stepWidthRef.current);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLElement>) {
    const pointer = pointerRef.current;

    if (pointer.id !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    pointer.id = null;

    if (!pointer.moved) {
      return;
    }

    setIsDragging(false);
    suppressClickRef.current = true;

    const current = offset.get();
    const velocityInCards = -pointer.velocity / stepWidthRef.current;
    const projected = current + velocityInCards * FLICK_PROJECTION;
    const clamped = Math.max(
      current - MAX_FLICK_CARDS,
      Math.min(current + MAX_FLICK_CARDS, projected)
    );

    settle(Math.round(clamped), velocityInCards);
  }

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

  // Swallows the click that a drag leaves behind, including clicks on the CTA
  // links inside a card.
  function handleClickCapture(event: React.MouseEvent) {
    if (!suppressClickRef.current) {
      return;
    }

    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  return {
    activeIndex,
    isDragging,
    offset,
    goTo,
    next,
    previous,
    handleKeyDown,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      onClickCapture: handleClickCapture
    }
  };
}
