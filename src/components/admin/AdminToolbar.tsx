import styles from "./AdminToolbar.module.css";

type AdminToolbarProps = {
  children?: React.ReactNode;
};

export function AdminToolbar({ children }: AdminToolbarProps) {
  return <div className={styles.toolbar}>{children}</div>;
}
