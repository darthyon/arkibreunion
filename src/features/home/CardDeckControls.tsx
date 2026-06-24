import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CardDeckControls.module.css";

type CardDeckControlsProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function CardDeckControls({ onPrevious, onNext }: CardDeckControlsProps) {
  return (
    <div className={styles.controls}>
      <button type="button" onClick={onPrevious} aria-label="Kad sebelumnya">
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button type="button" onClick={onNext} aria-label="Kad seterusnya">
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
