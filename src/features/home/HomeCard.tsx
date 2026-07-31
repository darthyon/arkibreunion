"use client";

import type { HomeCardItem } from "@/types/homepage";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CalendarDays, Clock3, MapPin, NotebookText, UsersRound } from "lucide-react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { wrapPosition } from "@/hooks/useCardDeck";
import type { DeckRanges } from "./deck-ranges";
import styles from "./HomeCard.module.css";

type HomeCardProps = {
  card: HomeCardItem;
  isActive: boolean;
  distance: number;
  /** This card's index in the deck, used to derive its offset from centre. */
  index: number;
  /** Shared, fractional position of the whole deck. */
  offset: MotionValue<number>;
  itemCount: number;
  ranges: DeckRanges;
  onSelect: () => void;
  onComingSoon: () => void;
};

const summaryIcons = {
  calendar: CalendarDays,
  clock: Clock3,
  location: MapPin,
  people: UsersRound,
  note: NotebookText
};

type CountdownCopy = {
  label: string;
  value: string;
};

const dayInMs = 24 * 60 * 60 * 1000;

function parseDateOnly(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getCountdownCopy(targetDate: string): CountdownCopy {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = parseDateOnly(targetDate);
  const days = Math.round((target.getTime() - today.getTime()) / dayInMs);

  if (days > 1) {
    return {
      label: "Countdown",
      value: `${days} hari lagi`
    };
  }

  if (days === 1) {
    return {
      label: "Countdown",
      value: "Esok"
    };
  }

  if (days === 0) {
    return {
      label: "Countdown",
      value: "D-Day"
    };
  }

  return {
    label: "Status",
    value: "Sudah berlangsung"
  };
}

function SummaryCountdown({ targetDate }: { targetDate: string }) {
  const [copy] = useState(() => getCountdownCopy(targetDate));

  return (
    <div className={styles.countdown} aria-label={`${copy.label}: ${copy.value}`}>
      <span>{copy.label}</span>
      <strong>{copy.value}</strong>
    </div>
  );
}

export function HomeCard({
  card,
  isActive,
  distance,
  index,
  offset,
  itemCount,
  ranges,
  onSelect,
  onComingSoon
}: HomeCardProps) {
  const stateClass =
    Math.abs(distance) === 0 ? styles.active : Math.abs(distance) === 1 ? styles.near : styles.far;

  // How far this card sits from the centre right now, looped into the deck's
  // range so it re-enters from the opposite side.
  const position = useTransform(offset, (value) => wrapPosition(index - value, itemCount));

  const x = useTransform(position, ranges.anchors, ranges.x);
  const y = useTransform(position, ranges.anchors, ranges.y);
  const scale = useTransform(position, ranges.anchors, ranges.scale);
  const rotate = useTransform(position, ranges.anchors, ranges.rotate);
  const opacity = useTransform(position, ranges.anchors, ranges.opacity);
  const zIndexValue = useTransform(position, ranges.anchors, ranges.zIndex);
  // z-index has to be an integer, and interpolation produces fractions.
  const zIndex = useTransform(zIndexValue, Math.round);

  function handleCardClick() {
    if (isActive && card.isComingSoon) {
      onComingSoon();
      return;
    }

    onSelect();
  }

  const cta = card.tone === "summary" && card.countdownTargetDate ? (
    <SummaryCountdown targetDate={card.countdownTargetDate} />
  ) : isActive ? (
    card.isComingSoon ? (
      <button className={styles.cta} type="button" onClick={onComingSoon}>
        <span>{card.cta}</span>
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    ) : (
      <Link className={styles.cta} href={card.href}>
        <span>{card.cta}</span>
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    )
  ) : (
    <button className={styles.cta} type="button" onClick={onSelect}>
      <span>{card.cta}</span>
      <ArrowRight size={17} aria-hidden="true" />
    </button>
  );

  return (
    <motion.article
      className={`${styles.card} ${styles[card.tone]} ${stateClass}`}
      style={{ x, y, scale, rotate, opacity, zIndex }}
      aria-current={isActive ? "true" : undefined}
    >
      <button
        className={styles.selectButton}
        type="button"
        onClick={handleCardClick}
        aria-label={isActive ? `${card.title} sedang aktif` : `Pilih kad ${card.title}`}
      >
        <span className={styles.number}>{card.number}</span>
        {card.badge ? <span className={styles.badge}>{card.badge}</span> : null}
        <h2>{card.title}</h2>
        <p>{card.description}</p>
      </button>

      {card.tone === "summary" && isActive ? (
        <div className={styles.summaryRows}>
          {card.summaryRows?.map((row) => {
            const Icon = summaryIcons[row.icon];

            return (
              <div className={styles.summaryRow} key={row.label}>
                <Icon size={18} aria-hidden="true" />
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            );
          })}
        </div>
      ) : card.tone !== "summary" ? (
        <div className={styles.illustrationWrap} aria-hidden="true">
          <Image src={card.illustration} alt="" width={190} height={180} priority={isActive} />
        </div>
      ) : null}

      {cta}
    </motion.article>
  );
}
