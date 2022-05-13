import { instance } from "api";

export interface UserCredentials {
  username: string;
  password: string;
  email?: string;
}
interface Props {
  userCredentials: UserCredentials;
}

export const login = async (userCredentials: UserCredentials) => {
  return instance.post("auth/login", userCredentials);
};
