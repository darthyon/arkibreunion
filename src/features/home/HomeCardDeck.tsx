"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import type { PanInfo } from "motion/react";
import { Pencil } from "lucide-react";
import { api } from "@convex/_generated/api";
import { homeCards } from "@/data/homepage";
import { useCardDeck } from "@/hooks/useCardDeck";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import { Button } from "@/components/ui/Button";
import { CardDeckControls } from "./CardDeckControls";
import { CardDeckDots } from "./CardDeckDots";
import { HomeCard } from "./HomeCard";
import { EventDialog, type EventFormValues } from "./dialogs/EventDialog";
import styles from "./HomeCardDeck.module.css";

const springTransition = {
  type: "spring",
  stiffness: 220,
  damping: 34,
  mass: 1
} as const;

const reducedTransition = {
  duration: 0.01
} as const;

// Back cards trail the front one slightly so the stack reads as layered depth
// rather than one rigid object sliding sideways.
const DEPTH_STAGGER = 0.035;

// zIndex is animated, not snapped. Motion coerces it with the `int` value type,
// so the interpolated values stay valid CSS and cards cross over each other
// mid-flight instead of popping in front on the first frame.
function getCardMotion(distance: number, mode: "desktop" | "tablet" | "mobile") {
  const sign = Math.sign(distance);
  const abs = Math.abs(distance);

  const offsets = {
    desktop: { near: 268, far: 456 },
    tablet: { near: 202, far: 344 },
    mobile: { near: 164, far: 314 }
  }[mode];

  if (abs === 0) {
    return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
  }

  if (abs === 1) {
    return {
      x: sign * offsets.near,
      y: mode === "mobile" ? 18 : 28,
      scale: mode === "mobile" ? 0.92 : 0.88,
      rotate: sign * (mode === "mobile" ? 1.4 : 2),
      opacity: 0.96,
      zIndex: 20
    };
  }

  if (abs === 2) {
    return {
      x: sign * offsets.far,
      y: mode === "mobile" ? 26 : 44,
      scale: mode === "mobile" ? 0.8 : 0.78,
      rotate: sign * (mode === "mobile" ? 2.3 : 3.5),
      opacity: mode === "mobile" ? 0.55 : 0.9,
      zIndex: 10
    };
  }

  return {
    x: sign * (offsets.far + 180),
    y: mode === "mobile" ? 42 : 56,
    scale: 0.72,
    rotate: sign * 4,
    opacity: 0,
    zIndex: 0
  };
}

// A card that jumps from one end of the deck to the other (distance +2 becomes
// -2 on a 5-card loop) must not spring across the whole stack. Move it
// instantly while it is invisible, then fade it back in on the far side.
function getCardTransition({
  distance,
  wrapped,
  velocity,
  prefersReducedMotion
}: {
  distance: number;
  wrapped: boolean;
  velocity: number;
  prefersReducedMotion: boolean;
}) {
  if (prefersReducedMotion) {
    return reducedTransition;
  }

  if (wrapped) {
    const instant = { duration: 0 } as const;

    return {
      ...springTransition,
      x: instant,
      y: instant,
      rotate: instant,
      scale: instant,
      zIndex: instant,
      opacity: { duration: 0.26, ease: "easeOut" }
    };
  }

  return {
    ...springTransition,
    delay: Math.abs(distance) * DEPTH_STAGGER,
    x: { ...springTransition, velocity, delay: Math.abs(distance) * DEPTH_STAGGER }
  };
}

export function HomeCardDeck() {
  // Cards are static structure; the summary card's title + facts derive from the
  // live event record so admin edits propagate. Static values are the fallback.
  const event = useQuery(api.event.get);
  const updateEvent = useMutation(api.event.update);
  const { isAdmin: isAuthedAdmin } = useAdmin();
  const { isPreviewing } = usePreview();
  const isAdmin = isAuthedAdmin && !isPreviewing;
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  const cards = useMemo(() => {
    if (!event) return homeCards;
    return homeCards.map((card) =>
      card.id === "summary"
        ? {
            ...card,
            title: event.name,
            summaryRows: [
              { label: "Tarikh", value: event.dateText, icon: "calendar" as const },
              { label: "Tempoh", value: event.durationText, icon: "clock" as const },
              { label: "Lokasi", value: event.location, icon: "location" as const },
              {
                label: "Peserta",
                value: `${event.participantCount} orang berdaftar`,
                icon: "people" as const
              }
            ]
          }
        : card
    );
  }, [event]);

  const deck = useCardDeck({ itemCount: cards.length, initialIndex: 2 });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1110px)");
  const prefersReducedMotion = useReducedMotion();
  const [toast, setToast] = useState<string | null>(null);

  const mode = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  const placements = cards.map((card, index) => {
    const distance = deck.getDistance(index);

    return { card, index, distance, wrapped: deck.hasWrapped(distance) };
  });

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2600);

    return () => window.clearTimeout(timer);
  }, [toast]);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    deck.handleDragEnd({
      offset: info.offset,
      velocity: info.velocity
    });
  }

  function showAlbumToast() {
    setToast("Album belum dibuka. Sabar, negara sedang memproses.");
  }

  async function handleSaveEvent(values: EventFormValues) {
    await updateEvent(values);
    setIsEventDialogOpen(false);
    setToast("Ringkasan event dikemaskini.");
  }

  return (
    <section
      className={styles.deck}
      aria-label="Kad utama"
      aria-roledescription="carousel"
      onKeyDown={deck.handleKeyDown}
    >
      <div className={styles.frame}>
        <div className={styles.cards}>
        {placements.map(({ card, index, distance, wrapped }) => {
            const motionState = getCardMotion(distance, mode);

            return (
              <HomeCard
                key={card.id}
                card={card}
                distance={distance}
                isActive={index === deck.activeIndex}
                motionState={
                  wrapped ? { ...motionState, opacity: [0, motionState.opacity] } : motionState
                }
                transition={getCardTransition({
                  distance,
                  wrapped,
                  velocity: deck.dragVelocity,
                  prefersReducedMotion
                })}
                dragEnabled={index === deck.activeIndex}
                onDragEnd={handleDragEnd}
                onSelect={() => deck.goTo(index)}
                onComingSoon={showAlbumToast}
              />
            );
        })}
        </div>
        <CardDeckControls onPrevious={deck.previous} onNext={deck.next} />
      </div>
      <CardDeckDots cards={cards} activeIndex={deck.activeIndex} onSelect={deck.goTo} />
      {isAdmin ? (
        <div className={styles.adminBar}>
          <Button onClick={() => setIsEventDialogOpen(true)} variant="secondary">
            <Pencil size={16} aria-hidden="true" />
            Edit Ringkasan
          </Button>
        </div>
      ) : null}
      <div className={styles.toast} aria-live="polite" aria-atomic="true">
        {toast ? <span>{toast}</span> : null}
      </div>

      <EventDialog
        event={
          event
            ? {
                name: event.name,
                dateText: event.dateText,
                durationText: event.durationText,
                location: event.location,
                participantCount: event.participantCount,
                note: event.note
              }
            : undefined
        }
        onClose={() => setIsEventDialogOpen(false)}
        onSave={handleSaveEvent}
        open={isEventDialogOpen}
      />
    </section>
  );
}
