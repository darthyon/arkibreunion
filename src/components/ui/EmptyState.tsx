import { Button } from "./Button";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  title = "Belum diproses.",
  description = "Fail ini belum diproses oleh pihak berwajib.",
  actionHref = "/",
  actionLabel = "Balik ke Arkib"
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button href={actionHref}>{actionLabel}</Button>
    </div>
  );
}
