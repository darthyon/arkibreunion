import styles from "./Toast.module.css";

type ToastProps = {
  children: React.ReactNode;
};

export function Toast({ children }: ToastProps) {
  return <div className={styles.toast}>{children}</div>;
}
