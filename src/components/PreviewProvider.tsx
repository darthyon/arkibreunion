"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type PreviewContextValue = {
  isPreviewing: boolean;
  togglePreview: () => void;
  setPreviewing: (value: boolean) => void;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

// Admin "preview as guest" state. Toggled from the header, consumed by pages
// to hide admin controls. Lives above AppShell so it persists across navigation.
export function PreviewProvider({ children }: { children: ReactNode }) {
  const [isPreviewing, setPreviewing] = useState(false);
  return (
    <PreviewContext.Provider
      value={{ isPreviewing, setPreviewing, togglePreview: () => setPreviewing((v) => !v) }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("usePreview must be used within PreviewProvider");
  return ctx;
}
