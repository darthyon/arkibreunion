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

function getCardMotion(distance: number, mode: "desktop" | "tablet" | "mobile") {
  const sign = Math.sign(distance);
  const abs = Math.abs(distance);

  const offsets = {
    desktop: { near: 268, far: 456 },
    tablet: { near: 202, far: 344 },
    mobile: { near: 164, far: 314 }
  }[mode];

  if (abs === 0) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      zIndex: 30,
      boxShadow: "0 24px 56px rgba(20, 18, 12, 0.18), 0 5px 15px rgba(20, 18, 12, 0.1)"
    };
  }

  if (abs === 1) {
    return {
      x: sign * offsets.near,
      y: mode === "mobile" ? 18 : 28,
      scale: mode === "mobile" ? 0.92 : 0.88,
      rotate: sign * (mode === "mobile" ? 1.4 : 2),
      opacity: 0.96,
      zIndex: 20,
      boxShadow: "0 16px 34px rgba(20, 18, 12, 0.14)"
    };
  }

  if (abs === 2) {
    return {
      x: sign * offsets.far,
      y: mode === "mobile" ? 26 : 44,
      scale: mode === "mobile" ? 0.8 : 0.78,
      rotate: sign * (mode === "mobile" ? 2.3 : 3.5),
      opacity: mode === "mobile" ? 0.55 : 0.9,
      zIndex: 10,
      boxShadow: "0 10px 24px rgba(20, 18, 12, 0.11)"
    };
  }

  return {
    x: sign * (offsets.far + 180),
    y: mode === "mobile" ? 42 : 56,
    scale: 0.72,
    rotate: sign * 4,
    opacity: 0,
    zIndex: 0,
    boxShadow: "0 0 0 rgba(20, 18, 12, 0)"
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
  const transition = prefersReducedMotion ? reducedTransition : springTransition;

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
        {cards.map((card, index) => (
            <HomeCard
              key={card.id}
              card={card}
              distance={deck.getDistance(index)}
              isActive={index === deck.activeIndex}
              motionState={getCardMotion(deck.getDistance(index), mode)}
              transition={transition}
              dragEnabled={index === deck.activeIndex}
              onDragEnd={handleDragEnd}
              onSelect={() => deck.goTo(index)}
              onComingSoon={showAlbumToast}
            />
        ))}
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
