

import { AuthState } from "./AuthContext";
type ActionTypes = "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE";
export interface Action {
  type: ActionTypes;
  payload?: User ;
}

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload ? action.payload : null,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};

export default authReducer;

