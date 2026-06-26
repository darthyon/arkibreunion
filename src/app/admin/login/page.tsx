"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(undefined);

    const formData = new FormData(event.currentTarget);
    try {
      await signIn("password", {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        flow: "signIn"
      });
      router.push("/");
    } catch {
      setError("Email atau kata laluan salah.");
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <header className={styles.head}>
          <img className={styles.mark} src="/icon.svg" alt="Arkib Reunion Negara" />
          <h1>Log Masuk Admin</h1>
          <p>Hanya untuk organiser. Rakyat biasa guna PIN di Tukar Hadiah.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField label="Email">
            <input autoComplete="email" name="email" type="email" placeholder="admin@reunion.my" />
          </FormField>

          <FormField label="Kata Laluan">
            <input autoComplete="current-password" name="password" type="password" placeholder="••••••••" />
          </FormField>

          {error ? <p className={styles.error}>{error}</p> : null}

          <Button type="submit" disabled={submitting}>
            <LogIn size={17} aria-hidden="true" />
            {submitting ? "Sedang masuk…" : "Log Masuk"}
          </Button>
        </form>
      </div>
    </div>
  );
}
