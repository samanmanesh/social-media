import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  isFetchig: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value{{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
      }}
      dispatch
    >
      {children}
    </AuthContext.Provider>
  );
};
