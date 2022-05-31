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
          <div key={index} className={`aspect-square cursor-pointer hover:brightness-75 `}>
            <img
              src={p.img}
              alt="post"
              className="object-cover w-full h-full "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGallery;
