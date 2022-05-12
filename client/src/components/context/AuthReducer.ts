

import { AuthState } from "./AuthContext";
type ActionTypes = "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE";
export interface Actions {
  type: ActionTypes;
  payload?: User ;
}

const AuthReducer = (state: AuthState, action: Actions) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload ? action.payload : null,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};

export default AuthReducer;

