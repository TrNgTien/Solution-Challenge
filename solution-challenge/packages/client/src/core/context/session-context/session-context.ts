import { createContext } from "react";

export type SessionData = {
  userEmail: string;
};

type SessionContextData = {
  data: SessionData;
  loginUrl: string;
  isAuthenticated: boolean;
  removeAuthCookies: () => void;
};

export const SessionContext = createContext<SessionContextData>({
  data: {
    userEmail: '',
  },
  loginUrl: '',
  isAuthenticated: false,
  removeAuthCookies: () => {},
});
