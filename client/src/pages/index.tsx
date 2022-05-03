import Feed from "../components/home/body/feed/Feed";
import Sidebar from "../components/home/body/sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className="container justify-center flex bg-blue-300">
      <Feed />
      <Sidebar />
    </div>
  );
}
