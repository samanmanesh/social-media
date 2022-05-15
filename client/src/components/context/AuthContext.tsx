import { createContext, useReducer, useState } from "react";
import authReducer, { Action, ActionTypes } from "./AuthReducer";

export interface AuthState {
  user: User | null;
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: AuthState = {
  user: null,
  isFetching: false,
  error: false,
};

type Props = {
  children: React.ReactNode;
};

// export const AuthContext = createContext(INITIAL_STATE);
// export const AuthUpdateContext = createContext((payload: any) => {});
export const AuthContext = createContext({} as User | null);

export const AuthUpdateContext = createContext((payload: any) => {});

export const AuthContextProvider = ({ children }: Props) => {
  const [userState, setUserState] = useState({} as User | null);
  const updateAuthContext = (userData: User) => {
    setUserState(userData);
  };

  return (
    <AuthContext.Provider value={userState}>
      <AuthUpdateContext.Provider value={updateAuthContext}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};
