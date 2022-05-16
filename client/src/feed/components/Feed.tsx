import { PostCard } from "./PostCard";
interface Props {
  posts: Post[];
} // extends React.HTMLAttributes<HTMLDivElement> {}

export function Feed({ posts, ...props }: Props) {
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
