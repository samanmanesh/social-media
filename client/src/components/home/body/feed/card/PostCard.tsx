import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { HeartIcon, AnnotationIcon } from "@heroicons/react/outline";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {format} from "timeago.js";
import { Link } from 'react-router-dom';
import { getUser } from "api";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
}

export default function PostCard({ post, ...props }: Props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ; // public folder path in env file for routing to work
  const [user, setUser] = useState({} as User);
  // const [numLikes, setNumLikes] = useState(post.likes.length);
  //todo fist check if you like it or not and then set the icon
  //todo make a list of likes by users 
  // const [isLiked, setIsLiked] = useState(false);
  // const liked = useMemo(() => {
  //   post.likes.includes(USER_ID);
  // }, [post]);
  // const numLikes: number = useMemo(() => {
  //   const { likes } = post;
  //   if (likes.includes(USER_ID)) {
  //   } else {
  //   }
  //   return -1;
  // }, [isLiked, post])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser({userId: post.userId});
      setUser(res.data);
    };
    fetchUser();  
  }, [post.userId]);

  //getting the user's name and profile picture for each post
  // const user = useMemo(() => Users.find((u) => u.id === post.userId), []);

  return (
    <div
      {...props}
      className="bg-white border rounded-[2px] border-gray-400 w-full"
    >
      <div className="p-2 border-b border-black flex items-center justify-between">
        <div className="flex">
          <Link to={`/profile/${user.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt="profile"
            className=" w-9 h-9 rounded-full object-cover border border-gray-400"
          />
          </Link>
          <span className="pl-2 font-semibold">{user?.username}</span>
        </div>
        <button>
          <DotsHorizontalIcon className="w-3 h-3" />
        </button>
      </div>
      <div className="aspect-square w-full">
        <img
          src={PF +"/post/"+ post.img}
          alt="postImage"
          className="object-cover h-full w-full"
        />
      </div>
      <button className="p-2 border-y border-black w-full flex space-x-3">
        <HeartIcon className="w-7 h-7" />
        <AnnotationIcon className="w-7 h-7" />
      </button>
      <div className="flex flex-col space-y-1 p-2">
        <span className="">Liked by mohammadgh4907 and others </span>
        <span>
          {user?.username} {post?.desc}
          <button className="text-s text-gray-600">more</button>
        </span>
        <span className="text-s text-gray-600">View all 1,8,932 comments</span>
        <span className="text-gray-800 text-sm">{format(post.createdAt)}</span>
      </div>
      <div className="border-t  w-full p-4 flex justify-between">
        <input type="text" placeholder="Add a comment..." className="w-full" />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
}
