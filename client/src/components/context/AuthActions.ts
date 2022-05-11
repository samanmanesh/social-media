import { AuthState } from "./AuthContext";
type ActionTypes = "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE";
interface Actions {
  type: ActionTypes;
  payload?: any;
}

const AuthReducer = (state: AuthState, action: Actions) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
