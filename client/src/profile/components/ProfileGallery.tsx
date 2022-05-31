import { HeartIcon } from "@heroicons/react/solid";

// import { Posts } from "../../DummyData";
interface UserDetails {
  numOfPosts: number;
  numOfLikes: number;
  numOfComments: number;
  numOfFollowers: number;
  numOfFollowing: number;
}

type Props = {
  userPosts: Post[];
  userDetails: UserDetails;
};

const ProfileGallery = ({ userPosts, userDetails }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="flex justify-center">
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl flex-1 mt-6">
        {userPosts.map((p, index) => (
          <div
            key={index}
            className={`aspect-square cursor-pointer relative flex items-center justify-center group`}
          >
            <img
              src={p.img}
              alt="post"
              className="object-cover w-full h-full  hover:brightness-75"
            />
            <div className="absolute flex space-x-2 justify-center items-center invisible group-hover:visible">
              <HeartIcon className="w-7 h-7 text-white" />
              <span className=" text-white text-lg">{p.likes.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGallery;
