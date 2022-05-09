import { Posts } from "../../DummyData";

type Props = {
  getUserPosts: Post[];
};

const ProfileGallery = (props: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  return (
    <div className="flex justify-center">
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl flex-1 mt-6">
        {Posts.map((p, index) => (
          <div key={index} className=" aspect-square">
            <img
              src={PF + p.img}
              alt="post"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGallery;
