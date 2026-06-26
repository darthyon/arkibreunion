"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import styles from "./PreviousReunionStrip.module.css";

export function PreviousReunionStrip() {
  const items = useQuery(api.archive.list) ?? [];

  return (
    <section className={styles.strip}>
      <header>
        <h2>Reunion Terdahulu</h2>
        <p>Arkib untuk tahun-tahun yang lepas. Bukti reunion memang pernah berlaku.</p>
      </header>
      <div className={styles.list}>
        {items.map((item) => (
          <a key={item.year} href={`/arkib/${item.year}`}>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
