import { AxiosResponse } from "axios";
import { instance } from "./index";

export const getTimeline = (userId: string): Promise<AxiosResponse<Post[]>> => {
  return instance.get(`posts/timeline/${userId}`);
};
