import { instance } from "api";
import { userCredentials } from "components/context/AuthActions";
import { Actions } from "components/context/AuthReducer";

interface Props {
  userCredentials: userCredentials;
  dispatch: React.Dispatch<any>;
}

export const login = async ({ userCredentials, dispatch }: Props) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await instance.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error: any) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
