import { UserRemoveIcon } from "@heroicons/react/solid";
import { unfollowUser, followUser } from "api";
import { useAuth } from "../../auth/utils";

interface UserDetails {
  numOfPosts: number;
  numOfLikes: number;
  numOfComments: number;
  numOfFollowers: number;
  numOfFollowing: number;
}
interface UserStatus {
  isCurrentUser: boolean;
  isFollowing: boolean;
}

type Props = {
  user: User;
  userDetails: UserDetails;
  userStatus: UserStatus;
  setUserStatus: (userStatus: UserStatus) => void;
};

const ProfileHeader = ({
  user,
  userDetails,
  userStatus,
  setUserStatus,
}: Props) => {
  console.log("user", user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user: currUser, setUser } = useAuth();

  // use mutation to follow or unfollow user when the button is clicked and update the user with setUser in auth

  //todo: need to update the user in auth
  const updateUserFollowing = (userId: string, action: string) => {
    //Unfollow user
    if (action === "unfollow") {
      if (currUser && userId) {
        setUser({
          ...currUser,
          following: currUser.following.filter(
            (following) => following !== userId
          ),
        });
      }
    }

    //follow user
    if (action === "follow" && currUser && userId) {
      setUser({ ...currUser, following: [...currUser.following, userId] });
    }
  };

  const followHandler = async () => {
    console.log("following Handler");
    if (userStatus.isFollowing && currUser) {
      try {
        const result = await unfollowUser(user._id, currUser?._id);
        if (result.data) {
          updateUserFollowing(user._id, "unfollow");
          setUserStatus({
            isCurrentUser: false,
            isFollowing: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else if (currUser && !userStatus.isFollowing) {
      try {
        const result = await followUser(user._id, currUser?._id);
        if (result.data) {
          updateUserFollowing(user._id, "follow");
          setUserStatus({
            isCurrentUser: false,
            isFollowing: true,
          });
        }
      } catch (err) {
        console.log("follow user error", err);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl flex-1 flex border-b border-gray-400 py-8">
        <div className="px-4 py-2 mr-4 md:ml-12 md:mr-16 flex-shrink-0 grid place-items-center">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt="profileImage"
            className="rounded-full w-20 h-20 md:w-36 md:h-36 border border-gray-500 object-cover"
          />
        </div>
        <div className="flex-1">
          {/* Username Section */}
          <div className="flex flex-col sm:flex-row items-start mb-4">
            <h1
              title={user.username}
              className="font-medium text-2xl overflow-hidden whitespace-nowrap text-ellipsis w-40 sm:w-52 cursor-default"
            >
              {user.username}
            </h1>

            {/* here for button we need to show it based on if its current user?, a random profile, or a profile we followed  */}
            {userStatus.isCurrentUser ? (
              <button className="w-full sm:w-max mt-2 sm:mt-0 sm:ml-2 border px-2 py-1 text-neutral-700 font-bold text-sm whitespace-nowrap rounded">
                Edit Profile
              </button>
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
            <span>
              <strong>{userDetails.numOfFollowers}</strong> followers
            </span>
            <span>
              <strong>{userDetails.numOfFollowing}</strong> following
            </span>
          </div>
          <div className="mt-2">
            {/* <p className="font-medium">Name</p>
            <p>bio what ever they want put here</p> */}
            {user.desc}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
