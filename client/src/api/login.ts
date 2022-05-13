import { instance } from "api";
import { Action } from "components/context/AuthReducer";
import { useContext } from "react";
import { AuthUpdateContext } from "../components/context/AuthContext";
import { ACTIONS } from '../components/context/AuthReducer';

export interface userCredentials {
  username: string ;
  password: string;
  email?: string;
}
interface Props {
  userCredentials: userCredentials;
}

export const login = async ({ userCredentials }: Props) => {
  
  return instance.post("auth/login", userCredentials);
};
