import { useFeed } from "feed/hooks";
import { useEffect, useState } from "react";
import { Feed } from "./Feed";
import { Sidebar } from "./Sidebar";

export function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data, status } = useFeed();

  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  return (
    <div className="container justify-center flex">
      <Feed posts={posts} />
      <Sidebar />
    </div>
  );
}
