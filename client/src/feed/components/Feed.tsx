import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import {  getTimelinePosts } from "api";
interface Props {} // extends React.HTMLAttributes<HTMLDivElement> {}

export function Feed({ ...props }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //letter needs to be logged in user to see their posts
      // const res = await axios.get("posts/timeline/62687513cdb831c3abb54c54");
      const res = await getTimelinePosts("6278167416616ac15d842712");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

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
