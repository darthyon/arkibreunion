"use client";

import type { HomeCardItem } from "@/types/homepage";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, MapPin, NotebookText, UsersRound } from "lucide-react";
import { motion, type PanInfo, type Transition } from "motion/react";
import styles from "./HomeCard.module.css";

type HomeCardProps = {
  card: HomeCardItem;
  isActive: boolean;
  distance: number;
  motionState: {
    x: number;
    y: number;
    scale: number;
    rotate: number;
    opacity: number;
    zIndex: number;
    boxShadow: string;
  };
  transition: Transition;
  dragEnabled: boolean;
  onSelect: () => void;
  onComingSoon: () => void;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
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
  motionState,
  transition,
  dragEnabled,
  onSelect,
  onComingSoon,
  onDragEnd
}: HomeCardProps) {
  const didDragRef = useRef(false);
  const stateClass =
    Math.abs(distance) === 0 ? styles.active : Math.abs(distance) === 1 ? styles.near : styles.far;

  function handleCardClick() {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }

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
      <button className={styles.cta} type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onComingSoon}>
        <span>{card.cta}</span>
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    ) : (
      <Link className={styles.cta} href={card.href} onPointerDown={(event) => event.stopPropagation()}>
        <span>{card.cta}</span>
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    )
  ) : (
    <button className={styles.cta} type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onSelect}>
      <span>{card.cta}</span>
      <ArrowRight size={17} aria-hidden="true" />
    </button>
  );

  return (
    <motion.article
      className={`${styles.card} ${styles[card.tone]} ${stateClass}`}
      animate={motionState}
      drag={dragEnabled ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.28}
      dragMomentum={false}
      onDragStart={() => {
        didDragRef.current = false;
      }}
      onDrag={(_, info) => {
        if (Math.abs(info.offset.x) > 6) {
          didDragRef.current = true;
        }
      }}
      onDragEnd={(event, info) => {
        onDragEnd(event, info);
        window.setTimeout(() => {
          didDragRef.current = false;
        }, 80);
      }}
      style={{ zIndex: motionState.zIndex }}
      transition={transition}
      whileDrag={
        dragEnabled
          ? {
              cursor: "grabbing",
              scale: motionState.scale * 1.01
            }
          : undefined
      }
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
