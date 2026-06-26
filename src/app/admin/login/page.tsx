"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogIn } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  // One-time account creation: visit /admin/login?setup=1 to create the single
  // admin account, then use the plain sign-in form thereafter.
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
      setError(isSetup ? "Gagal cipta akaun." : "Email atau kata laluan salah.");
      setSubmitting(false);
    }
  }

  return (
    <PageContainer size="readable">
      <PageHeader
        title={isSetup ? "Cipta Akaun Admin" : "Log Masuk Admin"}
        description="Hanya untuk organiser. Rakyat biasa guna PIN di Tukar Hadiah."
      />
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: 360 }}>
        <FormField label="Email">
          <input autoComplete="email" name="email" type="email" placeholder="admin@reunion.my" />
        </FormField>

        <FormField label="Kata Laluan">
          <input autoComplete="current-password" name="password" type="password" placeholder="••••••••" />
        </FormField>

        {error ? <p style={{ color: "var(--color-danger, #c0392b)" }}>{error}</p> : null}

        <Button type="submit" disabled={submitting}>
          <LogIn size={17} aria-hidden="true" />
          {submitting
            ? "Sedang masuk…"
            : isSetup
              ? "Cipta Akaun"
              : "Log Masuk"}
        </Button>
      </form>
    </PageContainer>
  );
}
