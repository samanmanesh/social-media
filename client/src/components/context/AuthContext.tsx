import { createContext, useReducer } from "react";
import AuthReducer, { Actions } from "./AuthReducer";

export interface AuthState {
  user: User | null;
  isFetching: boolean;
  error: any;
  dispatch: React.Dispatch<Actions>; 
}

const INITIAL_STATE: AuthState = {
  user: null,
  isFetching: false,
  error: null,
  
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }: Props) => {
  
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

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
