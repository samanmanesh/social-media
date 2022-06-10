import { UserRemoveIcon } from "@heroicons/react/solid";
import { useAuth } from "../../auth/utils";
import { Link } from "react-router-dom";
import { useFollow } from "accounts/hooks";
// import { useFollow } from "feed";
import { useState } from "react";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal";

interface UserDetails {
  numOfPosts: number;
  numOfLikes: number;
  numOfComments: number;
  numOfFollowers: number;
  numOfFollowing: number;
}
export interface UserStatus {
  isCurrentUser: boolean;
  isFollowing: boolean;
}

type Props = {
  userOfProfile: User;
  userDetails: UserDetails;
  userStatus: UserStatus;
  setUserStatus: (userStatus: UserStatus) => void;
};

const ProfileHeader = ({
  userOfProfile,
  userDetails,
  userStatus,
  setUserStatus,
}: Props) => {
  console.log("user", userOfProfile);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user: currUser, setUser } = useAuth();
  const {
    followUserMutation,
    unfollowUserMutation,
    followedSuccessfully,
    unfollowedSuccessfully,
  } = useFollow(userOfProfile);

  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);

  const followHandler = async () => {
    if (userStatus.isFollowing && currUser) {
      unfollowUserMutation({
        userIdToUnfollow: userOfProfile._id,
        currUserId: currUser._id,
      });
      unfollowedSuccessfully &&
        setUserStatus({
          isCurrentUser: false,
          isFollowing: false,
        });
    } else if (currUser && !userStatus.isFollowing) {
      followUserMutation({
        userIdToFollow: userOfProfile._id,
        currUserId: currUser._id,
      });
      followedSuccessfully &&
        setUserStatus({
          isCurrentUser: false,
          isFollowing: true,
        });
    }
  };

  const followModalHandler = (action: string) => {
    if (action === "following") {
      setOpenFollowingModal(true);
      setOpenFollowersModal(false);
    } else if (action === "followers") {
      setOpenFollowersModal(true);
      setOpenFollowingModal(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl flex-1 flex border-b border-gray-400 py-8">
        <div className="px-4 py-2 mr-4 md:ml-12 md:mr-16 flex-shrink-0 grid place-items-center">
          <img
            src={
              userOfProfile?.profilePicture
                ? userOfProfile.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt={userOfProfile?.username}
            className="rounded-full w-20 h-20 md:w-36 md:h-36 border border-gray-500 object-cover text-xs text-center text-gray-400 "
          />
        </div>
        <div className="flex-1">
          {/* Username Section */}
          <div className="flex flex-col sm:flex-row items-start mb-4">
            <h1
              title={userOfProfile.username}
              className="font-medium text-2xl overflow-hidden whitespace-nowrap text-ellipsis w-40 sm:w-52 cursor-default"
            >
              {userOfProfile.username}
            </h1>

            {/* here for button we need to show it based on if its current user?, a random profile, or a profile we followed  */}
            {userStatus.isCurrentUser ? (
              <Link
                to="/accounts/edit"
                className="w-full sm:w-max mt-2 sm:mt-0 sm:ml-2 border px-2 py-1 text-neutral-800 font-bold text-sm whitespace-nowrap rounded text-center"
              >
                Edit Profile
              </Link>
            ) : userStatus.isFollowing ? (
              <div className="flex space-x-2 my-4 sm:my-0 ">
                <button className="w-full sm:w-max sm:mx-2 sm:mt-0 sm:ml-2 border px-2 py-1 text-neutral-700 font-bold text-sm whitespace-nowrap rounded ">
                  Message
                </button>
                <UserRemoveIcon
                  onClick={followHandler}
                  className="w-16 h-[1.8rem] rounded border p-0.5 cursor-pointer"
                />
              </div>
            ) : (
              <button
                onClick={followHandler}
                className="w-full sm:w-max mt-2 sm:mt-0 sm:ml-2  px-2 py-1 text-white font-bold text-sm whitespace-nowrap rounded bg-blue-500"
              >
                Follow
              </button>
            )}
          </div>
          <div className="hidden sm:block space-x-4 md:space-x-10 font-medium">
            <span>
              <strong>{userDetails.numOfPosts}</strong> posts
            </span>
            <span onClick={()=>followModalHandler("followers")} className="cursor-pointer">
              <strong>{userDetails.numOfFollowers}</strong> followers
            </span>
            <span onClick={()=>followModalHandler("following")} className="cursor-pointer">
              <strong>{userDetails.numOfFollowing}</strong> following
            </span>
          </div>
          <div className="mt-2">
            {/* <p className="font-medium">Name</p>
            <p>bio what ever they want put here</p> */}
            {userOfProfile.desc}
          </div>
        </div>
      </div>
      <FollowingModal
        isOpen={openFollowingModal}
        setIsOpen={setOpenFollowingModal}
      />
      <FollowersModal
        isOpen={openFollowersModal}
        setIsOpen={setOpenFollowersModal}
      />
    </div>
  );
};

export default ProfileHeader;
