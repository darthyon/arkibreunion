import type { HomeCardItem } from "@/types/homepage";
import styles from "./CardDeckDots.module.css";

type CardDeckDotsProps = {
  cards: HomeCardItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CardDeckDots({ cards, activeIndex, onSelect }: CardDeckDotsProps) {
  return (
    <div className={styles.dots} aria-label="Pilih kad" role="tablist">
      {cards.map((card, index) => (
        <button
          key={card.id}
          type="button"
          aria-label={`Pergi ke kad ${card.title}`}
          aria-current={index === activeIndex ? "true" : undefined}
          aria-selected={index === activeIndex}
          role="tab"
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
