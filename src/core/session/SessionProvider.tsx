import type { ReactNode } from "react";

import { useSession } from ".";
import { SessionContext } from "./SessionContext";

type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({
  children,
}: SessionProviderProps) {
  const sessionState = useSession();

  return (
    <SessionContext.Provider value={sessionState}>
      {children}
    </SessionContext.Provider>
  );
}