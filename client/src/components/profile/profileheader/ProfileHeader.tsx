interface UserDetails{
  numOfPosts: number;
      numOfLikes  : number;
      numOfComments : number;
      numOfFollowers : number;
      numOfFollowing : number;
}

type Props = {
  user: User;
  userDetails: UserDetails;
};

const ProfileHeader = ({user, userDetails}: Props) => {
  console.log("user", user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl flex-1 flex border-b border-gray-400 py-8">
        <div className="px-4 py-2 mr-4 md:mr-8 flex-shrink-0 grid place-items-center">
          <img
            src={PF+"/people/courtney-hill-aixlh4umWQw-unsplash.jpg"}
            alt=""
            className="rounded-full w-20 h-20 md:w-36 md:h-36 border border-gray-500 object-cover"
          />
        </div>
        <div className="flex-1">
          {/* Username Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <h1 title={user.username} className="font-medium text-2xl overflow-hidden whitespace-nowrap text-ellipsis w-56 sm:w-64 cursor-default">
              {user.username}
            </h1>
            <button className="w-full sm:w-max mt-2 sm:mt-0 sm:ml-2 border px-2 py-1 text-neutral-700 font-medium whitespace-nowrap rounded">
              Edit Profile
            </button>
          </div>
          <div className="hidden sm:block space-x-4 md:space-x-8">
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
