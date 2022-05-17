import { instance } from "api";
import { AxiosResponse } from 'axios';

export interface UserLoginCredentials {
  username: string;
  password: string;
  email?: string;
}
interface Props {
  userCredentials: UserLoginCredentials;
}

export const login = async (userCredentials: UserLoginCredentials): Promise<AxiosResponse<User>> => {
  return instance.post("auth/login", userCredentials);
};
