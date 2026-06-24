import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "./EmptyState";
import styles from "./PlaceholderPage.module.css";

type PlaceholderPageProps = {
  title?: string;
  description?: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PageContainer size="readable">
      <div className={styles.page}>
        <EmptyState title={title} description={description} />
      </div>
    </PageContainer>
  );
}
