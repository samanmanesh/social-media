import { AxiosResponse } from "axios";
import { instance } from "./index";

export interface UserSuggestion {
  _id: string;
  username: string;
  profilePicture: string;
}

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

export const getPeople = (userId : string): Promise<AxiosResponse<UserSuggestion[]>> => {
  return instance.get(`users/people/${userId}`);
}

export const followUser = (userId: string, currUserId :string): Promise<AxiosResponse<User>> => {
  return instance.put(`users/${userId}/follow`, {userId: currUserId});
}

export const unfollowUser = (userId: string, currUserId :string): Promise<AxiosResponse<User>> => {
  return instance.put(`users/${userId}/unfollow`, {userId: currUserId});
}
