import { instance } from "api";
import { Action } from "components/context/AuthReducer";
import { useContext } from "react";
import { AuthUpdateContext } from "../components/context/AuthContext";
import { ACTIONS } from '../components/context/AuthReducer';

export interface userCredentials {
  username?: string ;
  email?: string;
  password: string;
}
interface Props {
  userCredentials: userCredentials;
}

export const login = async ({ userCredentials }: Props) => {
  

  return instance.post("auth/login", userCredentials);
  // dispatch({ type: ACTIONS.LOGIN_START });

  // try {
  //   const res = await instance.post("auth/login", userCredentials);
  //   // dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: res.data });
  // } catch (error: any) {
  //   // dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: error });
  // }
};
