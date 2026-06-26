"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

// Single source of truth for admin gating. Logged-in = admin.
// isLoading is true while the query resolves — treat as not-admin until known.
export function useAdmin() {
  const admin = useQuery(api.admin.currentAdmin);
  return {
    admin: admin ?? null,
    isAdmin: !!admin,
    isLoading: admin === undefined
  };
}
