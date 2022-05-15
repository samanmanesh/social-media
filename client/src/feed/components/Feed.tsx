import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import {  getTimelinePosts } from "api";
import { useFeed } from '../hooks';
interface Props {} // extends React.HTMLAttributes<HTMLDivElement> {}

export function Feed({ ...props }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const {data, status} = useFeed();
  console.log("data in Feed", data);

  // useEffect(() => {
  //   const fetchPosts = async () => {
      
  //     // const res = await getTimelinePosts("6278167416616ac15d842712");
  //     // setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div className="space-y-5 flex-1 mt-6 max-w-xl">
      {posts && posts.map((p: Post) => <PostCard key={p._id} post={p} />)}
      {!posts.length && (
        <div className="flex  w-full h-full justify-center items-center ">
          <div className="flex justify-center text-medium font-semibold text-gray-500">
            Add a post to see it here
            {/* here needs global state for postShareModal */}
            {/* <PostShareModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
          </div>
        </div>
      )}
    </div>
  );
}
