import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { HeartIcon, AnnotationIcon } from "@heroicons/react/outline";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { getUser } from "api";
import { useAuth } from "../../auth/utils";
import { useMutation } from "react-query";
import { likePost } from "../../api/posts";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
}

export function PostCard({ post, ...props }: Props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const [user, setUser] = useState({} as User);
  const { user: currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);

  //todo make a list of likes by users
  //todo if user click on others it must get an array of users name who liked it

  const { mutate, isLoading, error } = useMutation(likePost, {
    onSuccess: (data) => {
      setIsLiked(!isLiked);
      setNumLikes(isLiked ? numLikes - 1 : numLikes + 1);
    },
  });

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

    //check if user liked the post
    currentUser && setIsLiked(post.likes.includes(currentUser._id));
    //setting num of likes
    setNumLikes(post.likes.length);
  }, [post.userId, currentUser, post.likes]);

  // console.log("numLikes", numLikes);
  // console.log("isLiked", isLiked);

  const onClickLike = () => {
    if (currentUser) {
      const req = {
        postId: post._id,
        userId: currentUser._id,
      };
      mutate(req);
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
          <DotsHorizontalIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="aspect-square w-full">
        <img
          src={post.img}
          alt="postImage"
          className="object-cover h-full w-full"
        />
      </div>
      <button
        onClick={onClickLike}
        className="p-2 border-y border-black w-full flex space-x-3"
      >
        {isLiked ? (
          <HeartIcon className="w-7 h-7 fill-red-500 text-red-600" />
        ) : (
          <HeartIcon className="w-7 h-7" />
        )}
        <AnnotationIcon className="w-7 h-7" />
      </button>
      <div className="flex flex-col space-y-1 p-2">
        {/* here needs for "the like by" to have a list of followers that likes each post */}

        {numLikes === 1 ? (
          <span className="">Liked by a person </span>
        ) : numLikes > 1 ? (
          <span className="">
            Liked by mohammadgh4907 and {numLikes} others{" "}
          </span>
        ) : (
          <span className="">Liked by {numLikes} people</span>
        )}

        {/* needs for "more" if it's more than a numbers of words then expand more button appears */}
        <div className="space-x-2">
          <span className="font-medium cursor-pointer hover:underline underline-offset-4 ">{user?.username}</span>
          <span>
            {post?.desc?.length > 100 ? (
              <button className="text-s text-gray-600"> more</button>
            ) : (
              <span>{post?.desc}</span>
            )}
          </span>
        </div>
        <span className="text-s text-gray-600">View all 1,932 comments</span>
        <span className="text-gray-800 text-sm">{format(post.createdAt)}</span>
      </div>
      <div className="border-t w-full p-4 flex justify-between">
        <input type="text" placeholder="Add a comment..." className="w-full" />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
}
