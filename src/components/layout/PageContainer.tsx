import styles from "./PageContainer.module.css";

type PageContainerProps = {
  children: React.ReactNode;
  size?: "page" | "readable" | "narrow";
};

export function PageContainer({ children, size = "page" }: PageContainerProps) {
  return <div className={styles[size]}>{children}</div>;
}
