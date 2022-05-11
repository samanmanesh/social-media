import { AxiosResponse } from "axios";
import { instance } from "./index";

export const getUser = (params: {
  userId?: string;
  username?: string;
}): Promise<AxiosResponse<User>> => {
  const { userId, username } = params;
  if (!userId && !username) {
    throw new Error("Must pass either `userId` or `username`");
  }
  return instance.get(`users`, {
    params,
  });
};