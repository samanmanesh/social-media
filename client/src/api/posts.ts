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

interface likeRequest {
  postId: string;
  userId: string;
}

export const likePost = (params : likeRequest):Promise<AxiosResponse> => {
  return instance.put(`/posts/${params.postId}/like`, { userId: params.userId });
}
