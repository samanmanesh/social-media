import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { HeartIcon, AnnotationIcon } from "@heroicons/react/outline";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { Users } from "../../../../DummyData";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: {
    id: string;
    userId: string;
    desc: string;
    img: string;
    likes: string[];
  };
}

export default function PostCard({ post, ...props }: Props) {
  const USER_ID = "3";
  // const [isLiked, setIsLiked] = useState(false);
  const liked = useMemo(() => {
    post.likes.includes(USER_ID);
  }, [post]);
  // const numLikes: number = useMemo(() => {
  //   const { likes } = post;
  //   if (likes.includes(USER_ID)) {
  //   } else {
  //   }
  //   return -1;
  // }, [isLiked, post])

  console.log(post);

  //getting the user's name and profile picture for each post
  const user = useMemo(() => Users.find((u) => u.id === post.userId), []);

  return (
    <div {...props} className="bg-white border rounded border-gray-400 w-full">
      <div className="p-2 border-b border-black flex items-center justify-between">
        <div className="flex">
          <img
            src={user?.profilePicture}
            alt="profile"
            className=" w-9 h-9 rounded-full object-cover border border-gray-400"
          />
          <span className="pl-2 font-semibold">{user?.userName}</span>
        </div>
        <button>
          <DotsHorizontalIcon className="w-3 h-3" />
        </button>
      </div>
      <div className="aspect-square w-full">
        <img src={post.img} alt="post" className="object-cover h-full w-full" />
      </div>
      <button className="p-2 border-y border-black w-full flex space-x-3">
        <HeartIcon className="w-7 h-7" />
        <AnnotationIcon className="w-7 h-7" />
      </button>
      <div className="flex flex-col space-y-1 p-2">
        <span className="">Liked by mohammadgh4907 and others</span>
        <span>
          {user?.userName} {post?.desc}
          <button className="text-s text-gray-600">more</button>
        </span>
        <span className="text-s text-gray-600">View all 1,8,932 comments</span>
        <span className="text-gray-800 text-sm">1 week ago</span>
      </div>
      <div className="border-t  w-full p-4 flex justify-between">
        <input type="text" placeholder="Add a comment..." className="w-full" />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
}
