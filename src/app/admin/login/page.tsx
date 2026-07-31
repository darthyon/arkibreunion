"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import styles from "./login.module.css";

// `?setup=1` switches the form to the one-time bootstrap flow. The backend is
// the real gate: auth.ts rejects signUp once any user exists, so this URL is
// harmless after the first organiser account is created.
function AdminLoginForm() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const isSetup = useSearchParams().get("setup") === "1";
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
        flow: isSetup ? "signUp" : "signIn"
      });
      router.push("/");
    } catch {
      setError(
        isSetup
          ? "Akaun admin sudah wujud. Guna log masuk biasa."
          : "Email atau kata laluan salah."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <header className={styles.head}>
          <img className={styles.mark} src="/icon.svg" alt="Arkib Reunion Negara" />
          <h1>{isSetup ? "Daftar Akaun Admin" : "Log Masuk Admin"}</h1>
          <p>
            {isSetup
              ? "Pendaftaran sekali sahaja. Satu akaun organiser dibenarkan."
              : "Hanya untuk organiser. Rakyat biasa guna PIN di Tukar Hadiah."}
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField label="Email">
            <input autoComplete="email" name="email" type="email" placeholder="admin@reunion.my" />
          </FormField>

          <FormField label="Kata Laluan">
            <input
              autoComplete={isSetup ? "new-password" : "current-password"}
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </FormField>

          {error ? <p className={styles.error}>{error}</p> : null}

          <Button type="submit" disabled={submitting}>
            <LogIn size={17} aria-hidden="true" />
            {submitting ? "Sedang masuk…" : isSetup ? "Daftar" : "Log Masuk"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
