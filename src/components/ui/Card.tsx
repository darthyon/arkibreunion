import styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return <section className={styles.card}>{children}</section>;
}
