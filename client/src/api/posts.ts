import { AxiosResponse } from "axios";
import { instance } from "./index";

export const getTimelinePosts = (userId: string): Promise<AxiosResponse<Post[]>> => {
  return instance.get(`posts/timeline/${userId}`);
};
