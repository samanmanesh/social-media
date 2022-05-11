import { userCredentials } from "../components/context/AuthReducer";
import { Actions } from "../components/context/AuthActions";
import { instance } from "api";

interface Props {
  userCredentials: userCredentials;
  dispatch: React.Dispatch<Actions>;
}

export const login = async (
  userCredentials: userCredentials,
  dispatch: React.Dispatch<Actions>
) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await instance.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
