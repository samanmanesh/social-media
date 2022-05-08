import { AxiosResponse } from "axios";
import { instance } from "./index";

export const getUser = async (userId: string): Promise<AxiosResponse<User>> => {
  return (await instance.get(`users/${userId}`));
};
