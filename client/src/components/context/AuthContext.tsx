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
export const AuthContext = createContext({} as User);

export const AuthUpdateContext = createContext((payload: any) => {});

export const AuthContextProvider = ({ children }: Props) => {
  // const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)
  const [userSate, setUserSate] = useState({} as User);
  
  const updateAuthContext = (userData: User) => {
    setUserSate(userData);
  };

  return (
    <AuthContext.Provider value={userSate}>
      <AuthUpdateContext.Provider value={updateAuthContext}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};
