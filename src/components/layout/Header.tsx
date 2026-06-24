import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import styles from "./Header.module.css";

const navItems = [
  { label: "Utama", href: "/" },
  { label: "Arkib", href: "/arkib/2025" },
  { label: "Bantuan", href: "/#bantuan" }
];

export function Header() {
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
      <Link className={styles.login} href="/admin/login">
        <UserRound size={18} aria-hidden="true" />
        <span>Log masuk</span>
      </Link>
      <button className={styles.menuButton} type="button" aria-label="Buka menu">
        <Menu size={22} aria-hidden="true" />
      </button>
    </header>
  );
}
