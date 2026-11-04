import { useCallback, useEffect, useState } from "react";
import { api } from "@core/api";
import type {
  Capability,
  Membership,
  MembershipRole,
  SessionResponse,
  SessionUser,
} from "@core/api/generated";

export type { Capability, Membership, MembershipRole, SessionResponse, SessionUser };
export type Session = SessionResponse;

export type SessionState =
  | { status: "loading"; session: null; error: null }
  | { status: "authenticated"; session: Session; error: null }
  | { status: "unauthenticated"; session: null; error: null }
  | { status: "error"; session: null; error: unknown };

export type UseSessionResult = SessionState & {
  logout: () => Promise<void>;
};
// save promise session on flight to avoid multiple requests
let inFlightSessionPromise: Promise<SessionResponse> | null = null;
// save user data from backend
let sessionCache: SessionResponse | null = null;

export function clearSessionCache(): void {
  inFlightSessionPromise = null;
  sessionCache = null;
}

export function fetchSession(): Promise<SessionResponse> {
  if (sessionCache) {
    return Promise.resolve(sessionCache);
  }
  // if there is already a request in flight, return that promise
  if (!inFlightSessionPromise) {
    inFlightSessionPromise = api
      .me()
      .then((session) => {
        sessionCache = session;
        return session;
      })
      .finally(() => {
        inFlightSessionPromise = null;
      });
  }
  return inFlightSessionPromise;
}

export function useSession(): UseSessionResult {
  const [state, setState] = useState<SessionState>(() =>
    sessionCache
      ? { status: "authenticated", session: sessionCache, error: null }
      : { status: "loading", session: null, error: null },
  );
  // fetch session on mount
  useEffect(() => {
    let cancelled = false;

    fetchSession()
      .then((session) => {
        // if the request was not cancelled, update the state to authenticated
        if (!cancelled) {
          setState({ status: "authenticated", session, error: null });
        }
      })
      .catch((err: unknown) => {
        // if the request was not cancelled, update the state to error
        if (!cancelled) {
          sessionCache = null;
          const status = (err as { status?: number })?.status;
          if (status === 401) {
            setState({ status: "unauthenticated", session: null, error: null });
          } else {
            setState({ status: "error", session: null, error: err });
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);
  //stay keep refrence to the logout function to avoid re-rendering
  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      clearSessionCache();
      setState({ status: "unauthenticated", session: null, error: null });
    }
  }, []);

  return {
    ...state,
    logout,
  };
}
