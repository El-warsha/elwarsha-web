import { createContext } from "react";
import { SessionState } from "./index";



export const SessionContext=createContext<SessionState | undefined>(undefined)