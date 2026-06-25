"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import styles from "./Header.module.css";

const navItems = [
  { label: "Utama", href: "/" },
  { label: "Arkib", href: "/arkib/2025" },
  { label: "Bantuan", href: "/#bantuan" }
];

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        Arkib Reunion Negara
      </Link>
      <nav className={styles.nav} aria-label="Navigasi utama">
        {navItems.map((item) => (
          <Link key={item.href} className={styles.navLink} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.loginWrap}>
        <button
          aria-expanded={isLoginOpen}
          className={styles.login}
          onClick={() => setIsLoginOpen((value) => !value)}
          type="button"
        >
          <UserRound size={18} aria-hidden="true" />
          <span>Log masuk</span>
          <ChevronDown size={15} aria-hidden="true" />
        </button>

        {isLoginOpen ? (
          <div className={styles.loginMenu}>
            <Link className={styles.loginChoice} href="/admin/login" onClick={() => setIsLoginOpen(false)}>
              <ShieldCheck size={18} aria-hidden="true" />
              <span>
                <strong>Admin</strong>
                <small>Untuk urus kandungan.</small>
              </span>
            </Link>
            <a
              className={styles.loginChoice}
              href="/tukar-hadiah?login=rakyat"
              onClick={() => setIsLoginOpen(false)}
            >
              <UsersRound size={18} aria-hidden="true" />
              <span>
                <strong>Rakyat biasa</strong>
                <small>Untuk tengok cabutan sendiri.</small>
              </span>
            </a>
          </div>
        ) : null}
      </div>
      <button className={styles.menuButton} type="button" aria-label="Buka menu">
        <Menu size={22} aria-hidden="true" />
      </button>
    </header>
  );
}
