import { userCredentials } from "../components/context/AuthReducer";
import { Actions } from "../components/context/AuthActions";
import { instance } from "api";

export const login = (userCredentials: userCredentials, dispatch ) => {
  dispatch({ type: "LOGIN_START" });
  return instance.post("auth/login", userCredentials);
};
