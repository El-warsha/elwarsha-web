import { api } from "@core/api";
import type {
  Capability,
  Membership,
  MembershipRole,
  SessionResponse,
  SessionUser,
} from "@core/api/generated";
import { ElWarshaApiError } from "@elwarsha/api-client";
import { useQuery } from "@tanstack/react-query";

export type {
  Capability,
  Membership,
  MembershipRole,
  SessionResponse,
  SessionUser,
};

export type Session = SessionResponse;

export type SessionState =
  | { status: "loading"; session: null; error: null }
  | { status: "authenticated"; session: Session; error: null }
  | { status: "unauthenticated"; session: null; error: null }
  | { status: "error"; session: null; error: ElWarshaApiError };

export type UseSessionResult = SessionState;
export function useSession(): UseSessionResult {
  const { data, error, isError, isPending } =
    useQuery<SessionResponse, ElWarshaApiError>({
      queryKey: ["session"],
      queryFn: () => api.me(),
    });

  if (isPending) {
    return { status: "loading", session: null, error: null };
  }

  // Check errors before cached data
  if (isError) {
    if (error.status === 401) {
      return { status: "unauthenticated", session: null, error: null };
    }

    return { status: "error", session: null, error };
  }

  if (data) {
    return { status: "authenticated", session: data, error: null };
  }

  return { status: "loading", session: null, error: null };
}