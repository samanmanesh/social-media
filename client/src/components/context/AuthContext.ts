import { createContext } from "react";

const INITIAL_STATE = {
  user: null,
  isFetchig: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);