import { PageContainer } from "@/components/layout/PageContainer";
import { HomeHero } from "./HomeHero";
import { HomeCardDeck } from "./HomeCardDeck";
import { PreviousReunionStrip } from "./PreviousReunionStrip";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <PageContainer>
      <div className={styles.page}>
        <HomeHero />
        <HomeCardDeck />
        <PreviousReunionStrip />
      </div>
    </PageContainer>
  );
}
