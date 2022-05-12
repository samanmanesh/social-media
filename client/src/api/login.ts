import { instance } from "api";
import { userCredentials } from "components/context/AuthActions";
import { Action } from "components/context/AuthReducer";
import { useContext } from "react";
import { AuthUpdateContext } from "../components/context/AuthContext";
import { ACTIONS } from '../components/context/AuthReducer';

interface Props {
  userCredentials: userCredentials;
  // dispatch: React.Dispatch<any>;
}

export const login = async ({ userCredentials }: Props) => {
  dispatch({ type: ACTIONS.LOGIN_START });

  try {
    const res = await instance.post("auth/login", userCredentials);
    dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: res.data });
  } catch (error: any) {
    dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: error });
  }
};
