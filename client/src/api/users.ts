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

export const getPeople = (
  userId: string
): Promise<AxiosResponse<UserSuggestion[]>> => {
  return instance.get(`users/people/${userId}`);
};
interface FollowUserParams {
  userIdToFollow: string;
  currUserId: string;
}

export const followUser = ({
  userIdToFollow,
  currUserId,
}: FollowUserParams): Promise<AxiosResponse<User>> => {
  return instance.put(`users/${userIdToFollow}/follow`, { userId: currUserId });
};

interface UnfolllowUserParams {
  userIdToUnfollow: string;
  currUserId: string;
}
export const unfollowUser = ({
  userIdToUnfollow,
  currUserId,
}: UnfolllowUserParams): Promise<AxiosResponse<User>> => {
  return instance.put(`users/${userIdToUnfollow}/unfollow`, {
    userId: currUserId,
  });
};

export const updateUser =({}):Promise<AxiosResponse<User>>  => {
  return instance.put(`users`);
}