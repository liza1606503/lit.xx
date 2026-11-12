"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  totalPoints: number;
  testsPassed: number;
}

export function useCurrentUser() {
  const { data: session, status } = useSession();

  const user = useMemo<CurrentUser | null>(() => {
    if (status !== "authenticated" || !session?.user) return null;
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      totalPoints: session.user.totalPoints ?? 0,
      testsPassed: session.user.testsPassed ?? 0,
    };
  }, [session, status]);

  const loading = status === "loading";

  return { user, loading };
}
