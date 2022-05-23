import { AxiosResponse } from "axios";
import { instance } from "./index";

interface likeRequest {
  postId: string;
  userId: string;
}

interface postRequest {
  userId : string;
  desc: string | undefined;
  img: string | undefined;
}
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

export const likePost = (params: likeRequest): Promise<AxiosResponse> => {
  return instance.put(`/posts/${params.postId}/like`, {
    userId: params.userId,
  });
};


export const createPost = (post: postRequest): Promise<AxiosResponse> => {
  return instance.post("/posts", post);
}