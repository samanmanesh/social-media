import { createContext, useReducer } from "react";
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

export const AuthContext = createContext(INITIAL_STATE);
export const AuthUpdateContext = createContext((payload: any) => {});

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  // const updateContext = (action: ActionTypes, value?: any) => {

  //   return dispatch({ type: action, payload: value });
  // };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
      }}
    >
      <AuthUpdateContext.Provider value={dispatch}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};
