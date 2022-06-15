import { useAuth } from "auth";
import { useMutation } from "react-query";
import { followUser, unfollowUser, UserSuggestion } from "api";
import { toast } from 'react-hot-toast';

export const useFollow = (userOfProfile: User | UserSuggestion) => {
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
     toast.error("Error unfollowing user");
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
