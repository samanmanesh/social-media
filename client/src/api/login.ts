import { instance } from "api";
import { AxiosResponse } from 'axios';

export interface UserCredentials {
  username: string;
  password: string;
  email?: string;
}
interface Props {
  userCredentials: UserCredentials;
}

export const login = async (userCredentials: UserCredentials): Promise<AxiosResponse<User>> => {
  return instance.post("auth/login", userCredentials);
};
