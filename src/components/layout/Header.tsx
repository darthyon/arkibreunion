"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  ChevronDown,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  UserRound,
  UsersRound
} from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { usePreview } from "@/components/PreviewProvider";
import styles from "./Header.module.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, admin } = useAdmin();
  const { isPreviewing, togglePreview, setPreviewing } = usePreview();
  const { signOut } = useAuthActions();

  async function handleSignOut() {
    setIsMenuOpen(false);
    setPreviewing(false);
    await signOut();
  }

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        Arkib Reunion Negara
      </Link>
      <div className={styles.loginWrap}>
        {isAdmin ? (
          <>
            <button
              aria-expanded={isMenuOpen}
              className={styles.adminButton}
              onClick={() => setIsMenuOpen((value) => !value)}
              type="button"
            >
              <ShieldCheck size={17} aria-hidden="true" />
              <span className={styles.adminName}>{admin?.name}</span>
              {isPreviewing ? <span className={styles.previewDot} aria-label="Preview aktif" /> : null}
              <ChevronDown size={15} aria-hidden="true" />
            </button>

            {isMenuOpen ? (
              <div className={styles.adminMenu}>
                <button
                  className={styles.menuItem}
                  onClick={() => {
                    togglePreview();
                    setIsMenuOpen(false);
                  }}
                  type="button"
                >
                  {isPreviewing ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
                  <span>
                    <strong>{isPreviewing ? "Keluar preview" : "Preview sebagai guest"}</strong>
                    <small>{isPreviewing ? "Kembali ke mod admin." : "Tengok macam rakyat biasa nampak."}</small>
                  </span>
                </button>
                <button className={styles.menuItem} onClick={handleSignOut} type="button">
                  <LogOut size={17} aria-hidden="true" />
                  <span>
                    <strong>Log keluar</strong>
                    <small>Tamatkan sesi admin.</small>
                  </span>
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <button
              aria-expanded={isMenuOpen}
              className={styles.login}
              onClick={() => setIsMenuOpen((value) => !value)}
              type="button"
            >
              <UserRound size={18} aria-hidden="true" />
              <span>Log masuk</span>
              <ChevronDown size={15} aria-hidden="true" />
            </button>

            {isMenuOpen ? (
              <div className={styles.loginMenu}>
                <Link className={styles.loginChoice} href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                  <ShieldCheck size={18} aria-hidden="true" />
                  <span>
                    <strong>Admin</strong>
                    <small>Untuk urus kandungan.</small>
                  </span>
                </Link>
                <a
                  className={styles.loginChoice}
                  href="/tukar-hadiah?login=rakyat"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UsersRound size={18} aria-hidden="true" />
                  <span>
                    <strong>Rakyat biasa</strong>
                    <small>Untuk tengok cabutan sendiri.</small>
                  </span>
                </a>
              </div>
            ) : null}
          </>
        )}
      </div>
    </header>
  );
}
