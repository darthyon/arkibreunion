import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import styles from "./TukarHadiahPage.module.css";

type ParticipantLoginProps = {
  error?: string;
  onSubmit: (values: { name: string; pin: string }) => void;
};

export function ParticipantLogin({ error, onSubmit }: ParticipantLoginProps) {
  return (
    <form
      className={styles.loginForm}
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        onSubmit({
          name: String(formData.get("name") ?? ""),
          pin: String(formData.get("pin") ?? "")
        });
      }}
    >
      <FormField label="Nama">
        <input autoComplete="name" name="name" placeholder="Contoh: Aina" />
      </FormField>

      <FormField label="PIN">
        <input autoComplete="one-time-code" inputMode="numeric" name="pin" placeholder="4821" />
      </FormField>

      {error ? <p className={styles.formError}>{error}</p> : null}

      <Button type="submit">
        <LogIn size={17} aria-hidden="true" />
        Masuk
      </Button>
    </form>
  );
}
