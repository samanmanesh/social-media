import { userCredentials } from "../components/context/AuthReducer";
import { Actions } from "../components/context/AuthActions";
import { instance } from "api";

interface Props {
  userCredentials: userCredentials;
  dispatch: React.Dispatch<Actions>;
}

export const login = ({ userCredentials, dispatch }: Props) => {
  dispatch({ type: "LOGIN_START" });
  return instance.post("auth/login", userCredentials);
};
