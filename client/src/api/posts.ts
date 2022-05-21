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
  return instance.get(`posts/profile/${username}`);
};

export const likePost = (id: string, userId: string):Promise<AxiosResponse> => {
  return instance.post(`${id}/like/` , {userId});

}
