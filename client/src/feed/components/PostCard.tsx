import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { HeartIcon, AnnotationIcon } from "@heroicons/react/outline";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { getUser } from "api";
import { useAuth } from "../../auth/utils";
import { useMutation } from 'react-query';
import { likePost } from '../../api/posts';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
}

export function PostCard({ post, ...props }: Props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const [user, setUser] = useState({} as User);
  const { user: currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);

  // const [numLikes, setNumLikes] = useState(post.likes.length);
  //todo fist check if you like it or not and then set the icon
  //todo make a list of likes by users
  //todo if user click on others it must get an array of users name who liked it

  const {mutate, isLoading, error} = useMutation(likePost , {
    onSuccess: (data) => {
      setIsLiked(!isLiked);
    },
  }) 

  useEffect(() => {
    currentUser && setIsLiked( post.likes.includes(currentUser._id));
    setNumLikes(post.likes.length);
  }, [currentUser, post]);
  console.log( "numLikes", numLikes);


  useEffect(() => {
    // if post is for current user then dont fetch user otherwise fetch user
    const fetchUser = async () => {
      if (currentUser && post.userId === currentUser?._id) {
        setUser(currentUser);
      } else {
        const res = await getUser({ userId: post.userId });
        setUser(res.data);
      }
    };
    fetchUser();
  }, [post.userId, currentUser]);

  //getting the user's name and profile picture for each post
  // const user = useMemo(() => Users.find((u) => u.id === post.userId), []);

  const onClickLike = () => {
    if (currentUser) {
      mutate(post._id, userId: currentUser._id);
    

      if (isLiked) {
        setNumLikes(numLikes - 1);
        
      } else {
        setNumLikes(numLikes + 1);
      }
      setIsLiked(!isLiked);
    }
  };


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
                user.profilePicture
                  ? PF + "/people/" + user.profilePicture
                  : PF + "people/no-image-avatar2.png"
              }
              alt="profile"
              className=" w-9 h-9 rounded-full object-cover border border-gray-400"
            />
          </Link>
          <Link to={`/profile/${user.username}`}>
            <span className="pl-2 font-semibold">{user?.username}</span>
          </Link>
        </div>
        <button>
          <DotsHorizontalIcon className="w-3 h-3" />
        </button>
      </div>
      <div className="aspect-square w-full">
        <img
          src={PF + "/post/" + post.img}
          alt="postImage"
          className="object-cover h-full w-full"
        />
      </div>
      <button onClick={onClick} className="p-2 border-y border-black w-full flex space-x-3">
        {isLiked ? (
          <HeartIcon className="w-7 h-7 fill-red-500 text-red-600" />
        ) : (
          <HeartIcon className="w-7 h-7" />
        )}
        <AnnotationIcon className="w-7 h-7" />
      </button>
      <div className="flex flex-col space-y-1 p-2">
        {/* here needs num of likes and if you like it or not */}
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
