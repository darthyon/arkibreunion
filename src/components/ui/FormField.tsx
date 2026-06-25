import styles from "./FormField.module.css";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
};

export function FormField({ label, children, hint, error }: FormFieldProps) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
      {error ? <small className={styles.error}>{error}</small> : hint ? <small>{hint}</small> : null}
    </label>
  );
}
