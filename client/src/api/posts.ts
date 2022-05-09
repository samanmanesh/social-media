import { AxiosResponse } from "axios";
import { instance } from "./index";

export const getTimelinePosts = (
  userId: string
): Promise<AxiosResponse<Post[]>> => {
  return instance.get(`posts/timeline/${userId}`);
};

export const getUserPosts = (
  username: string
): Promise<AxiosResponse<Post[]>> => {
  console.log("username in getUserPosts: ", username)
  return instance.get(`posts/profile/${username}`);
};
