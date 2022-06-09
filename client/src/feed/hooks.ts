import { useAuth } from "auth";
import { useQuery } from "react-query";
import { getTimelinePosts } from "../api/posts";
import { useMutation } from "react-query";
import { followUser, unfollowUser } from "api";
export const useFeed = () => {
  const { user } = useAuth();

  const fetchTimelinePosts = async () => {
    const { data } = await getTimelinePosts(user?._id || "");
    //sort by date
    return data.sort((a, b) => {
      //@ts-ignore
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    // return data;
  };
  const { data, status } = useQuery(["feed", user?._id], fetchTimelinePosts);

  // const {data, status} = useQuery(["feed", user?._id],  () => {
  //   console.debug(">>", user?._id);
  //   return  getTimelinePosts(user?._id || "");
  // });
  return { data, status };
};

export const useFollow = (userOfProfile: User) => {
  const { user: currUser, setUser } = useAuth();
  const {
    mutate: unfollowUserMutation,
    error,
    isLoading,
    isSuccess: unfollowedSuccessfully,
  } = useMutation(unfollowUser, {
    onSuccess: (data) => {
      if (data.data) {
        updateUserFollowing(userOfProfile._id, "unfollow");
      }
    },
    onError: (err) => {
      console.log("err in unfollowUser", err);
    },
  });

  const { mutate: followUserMutation, isSuccess: followedSuccessfully } =
    useMutation(followUser, {
      onSuccess: (data) => {
        if (data.data) {
          updateUserFollowing(userOfProfile._id, "follow");
        }
      },
      onError: (err) => {
        console.log("err in followUser", err);
      },
    });

  const updateUserFollowing = (userOfProfileId: string, action: string) => {
    //Unfollow user
    if (action === "unfollow") {
      if (currUser && userOfProfileId) {
        setUser({
          ...currUser,
          following: currUser.following.filter(
            (following) => following !== userOfProfileId
          ),
        });
      }
    }
    //follow user
    if (action === "follow" && currUser && userOfProfileId) {
      setUser({
        ...currUser,
        following: [...currUser.following, userOfProfileId],
      });
    }
  };
  return {
    followUserMutation,
    unfollowUserMutation,
    followedSuccessfully,
    unfollowedSuccessfully,
  };
};
