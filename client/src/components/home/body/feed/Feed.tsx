import PostCard from "./card/PostCard";
import { Posts } from "../../../DummyData";
interface Props {} // extends React.HTMLAttributes<HTMLDivElement> {}

export default function Feed({ ...props }: Props) {
  return (
    <div className="space-y-5 flex-1 mt-6 max-w-xl">
      {Posts.map((p, index) => (
        <PostCard key={index} post={p} />
      ))}
    </div>
  );
}
