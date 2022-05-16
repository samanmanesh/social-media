import { useFeed } from "feed/hooks";
import { useState } from "react";
import { Feed } from "./Feed";
import { Sidebar } from "./Sidebar";

export function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const { data, status } = useFeed();

  return (
    <div className="container justify-center flex">
      <Feed posts={posts} />
      <Sidebar />
    </div>
  );
}
