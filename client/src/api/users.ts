import { AxiosResponse } from "axios";
import { instance } from "./index";

export interface UserSuggestion {
  _id: string;
  username: string;
  profilePicture: string;
}

interface FollowUserParams {
  userIdToFollow: string;
  currUserId: string;
}
interface UnfolllowUserParams {
  userIdToUnfollow: string;
  currUserId: string;
}

interface UpdateUserParams {
  userId: string;
  userDataToUpdated: User | Partial<User>;
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

export const followUser = ({
  userIdToFollow,
  currUserId,
}: FollowUserParams): Promise<AxiosResponse<User>> => {
  return instance.put(`users/${userIdToFollow}/follow`, { userId: currUserId });
};

export const unfollowUser = ({
  userIdToUnfollow,
  currUserId,
}: UnfolllowUserParams): Promise<AxiosResponse<User>> => {
  return instance.put(`users/${userIdToUnfollow}/unfollow`, {
    userId: currUserId,
  });
};

export const uploadUserProfileImage = (file: any): Promise<AxiosResponse> => {
  return instance.post("/users/upload", file);
};

export const updateUserData = (
  data: UpdateUserParams
): Promise<AxiosResponse<User>> => {
  return instance.put(`users/${data.userId}`, data.userDataToUpdated);
};


//todo: remove a user profile from the server and cloudinary and the client
//todo: remove a user from the server and the client
//getting followers and following of a user data from the server
export const getFollowers = (userId: string): Promise<AxiosResponse<User[]>> => {
  return instance.get(`users/${userId}/followers`);
}

export const getFollowing = (userId: string): Promise<AxiosResponse<User[]>> => {
  return instance.get(`users/${userId}/following`);
}

