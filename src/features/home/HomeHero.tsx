import { Badge } from "@/components/ui/Badge";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={styles.hero}>
      <Badge>Rekod Rasmi</Badge>
      <h1>
        <span>Rancang reunion. Simpan rekod.</span>
        <span>Elak tanya dalam WhatsApp 14 kali.</span>
      </h1>
      <p>
        Tempat rasmi untuk simpan keputusan, tugasan, dan kenangan. Bukan sekadar bergantung pada
        chat yang tenggelam.
      </p>
    </section>
  );
}
