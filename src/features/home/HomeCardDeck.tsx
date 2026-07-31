"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Pencil } from "lucide-react";
import { api } from "@convex/_generated/api";
import { homeCards } from "@/data/homepage";
import { useCardDeck } from "@/hooks/useCardDeck";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import { Button } from "@/components/ui/Button";
import { getDeckRanges, type DeckMode } from "./deck-ranges";
import { CardDeckControls } from "./CardDeckControls";
import { CardDeckDots } from "./CardDeckDots";
import { HomeCard } from "./HomeCard";
import { EventDialog, type EventFormValues } from "./dialogs/EventDialog";
import styles from "./HomeCardDeck.module.css";

// Horizontal travel that equals one card step, per breakpoint. This is the
// near-card offset, so a card follows the pointer roughly 1:1.
const STEP_WIDTH = {
  desktop: 268,
  tablet: 202,
  mobile: 164
} as const;

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

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1110px)");
  const prefersReducedMotion = useReducedMotion();
  const [toast, setToast] = useState<string | null>(null);

  const mode: DeckMode = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
  const ranges = useMemo(() => getDeckRanges(mode, cards.length), [mode, cards.length]);

  const deck = useCardDeck({
    itemCount: cards.length,
    initialIndex: 2,
    stepWidth: STEP_WIDTH[mode],
    prefersReducedMotion
  });

  // Resting distance from centre, used only for the depth CSS classes. The
  // live position each card animates on is a motion value, not React state.
  function getDistance(index: number) {
    const midpoint = Math.floor(cards.length / 2);
    let distance = index - deck.activeIndex;

    if (distance > midpoint) {
      distance -= cards.length;
    }

    if (distance < -midpoint) {
      distance += cards.length;
    }

    return distance;
  }

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2600);

    return () => window.clearTimeout(timer);
  }, [toast]);

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
        <div
          className={`${styles.cards} ${deck.isDragging ? styles.dragging : ""}`}
          {...deck.dragHandlers}
        >
        {cards.map((card, index) => (
            <HomeCard
              key={card.id}
              card={card}
              index={index}
              itemCount={cards.length}
              offset={deck.offset}
              ranges={ranges}
              distance={getDistance(index)}
              isActive={index === deck.activeIndex}
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
