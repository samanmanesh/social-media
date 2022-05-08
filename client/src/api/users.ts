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
  console.log("call the get User with params", params);
  
  return instance.get(`users`, {
    params
  });
};
