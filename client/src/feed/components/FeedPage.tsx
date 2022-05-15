import { Feed } from "./Feed";
import { Sidebar } from "./Sidebar";

export function FeedPage() {
  return (
    <div className="container justify-center flex">
      <Feed />
      <Sidebar />
    </div>
  );
}
