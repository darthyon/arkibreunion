"use client";

import { useCallback, useSyncExternalStore } from "react";

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(queryText: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const query = window.matchMedia(queryText);
      query.addEventListener("change", onStoreChange);

      return () => query.removeEventListener("change", onStoreChange);
    },
    [queryText]
  );

  const getSnapshot = useCallback(() => window.matchMedia(queryText).matches, [queryText]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
