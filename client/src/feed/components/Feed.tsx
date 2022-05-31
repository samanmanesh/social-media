import { PlusIcon } from "@heroicons/react/solid";
import PostShareModal from "layout/PostShareModal";
import { useState } from "react";
import { PostCard } from "./PostCard";
interface Props {
  posts: Post[];
} // extends React.HTMLAttributes<HTMLDivElement> {}

export function Feed({ posts, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-5 flex-1 mt-6 max-w-xl">
      {posts && posts.map((p: Post) => <PostCard key={p._id} post={p} />)}
      {!posts.length && (
        <div className="flex  w-full h-full justify-center items-center ">
          <div className="flex justify-center  ">
            <span className="text-gray-500 text-medium font-semibold">
              Add a post to see it here
            </span>
            <button onClick={openModal}>
              <PlusIcon className="w-6 h-6 border-2 border-black rounded-lg mx-2" />
            </button>
            <PostShareModal isOpen={isOpen} setIsOpen={setIsOpen} />
            {/* here needs global state for postShareModal */}
            {/* I guess we could do it with seperate state: make use state for isOpen and pass it to PostShareModal */}
            {/* <PostShareModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
          </div>
        </div>
      )}
    </div>
  );
}
