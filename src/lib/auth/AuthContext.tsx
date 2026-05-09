"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authApi } from "@/lib/api/endpoints";
import { ApiError, getStoredUserId, setStoredUserId } from "@/lib/api/client";
import type { UserResponse } from "@/lib/api/types";

interface AuthContextValue {
  userId: string | null;
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
  signIn: (userId: string) => void;
  signOut: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserIdState] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // localStorage hydration: deferred until after mount to avoid SSR/CSR mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserIdState(getStoredUserId());
  }, []);

  const refresh = useCallback(async () => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.me();
      setUser(data);
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 404)) {
        setStoredUserId(null);
        setUserIdState(null);
        setUser(null);
        setError(null);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인 정보를 불러오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // refresh() updates state inside async callbacks; flagged because the
  // synchronous setLoading/setError fire before awaits.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const signIn = useCallback((nextUserId: string) => {
    setStoredUserId(nextUserId);
    setUserIdState(nextUserId);
  }, []);

  const signOut = useCallback(() => {
    setStoredUserId(null);
    setUserIdState(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ userId, user, loading, error, signIn, signOut, refresh }),
    [userId, user, loading, error, signIn, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
