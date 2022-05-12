import { createContext, useReducer } from "react";
import authReducer, { Action } from "./AuthReducer";

export interface AuthState {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  dispatch: React.Dispatch<Action>;
}

const INITIAL_STATE: AuthState = {
  user: null,
  isFetching: false,
  error: false,
  dispatch: () => {},
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
