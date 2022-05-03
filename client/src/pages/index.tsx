import Feed from "../components/home/feed/Feed";
import Sidebar from "../components/home/sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className="container max-w-6xl flex flex-col md:flex-row pt-6">
      <Feed />
      <Sidebar />
    </div>
  );
}
