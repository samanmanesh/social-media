import { AxiosResponse } from "axios";
import { instance } from "./index";

export interface UserRegisterCredentials {
  username: string;
  password: string;
  email?: string;
}

export const registerUser = async (userCredentials: UserRegisterCredentials): Promise<AxiosResponse<User>> => {
  return instance.post("auth/register", userCredentials);
}