import { useFeed } from "feed/hooks";
import { useEffect, useState } from "react";
import { Feed } from "./Feed";
import { Sidebar } from "./Sidebar";
import { useAuth } from '../../auth/utils';

export function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data, status } = useFeed();
  const {user}=useAuth();
  useEffect(() => {
    if (data) setPosts(data);
  }, [data, user]);

  return (
    <div className="container justify-center flex">
      <Feed posts={posts} />
      <Sidebar />
    </div>
  );
}
