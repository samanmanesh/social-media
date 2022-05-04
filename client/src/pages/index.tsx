import Feed from "../components/home/body/feed/Feed";
import Sidebar from "../components/home/body/sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className="container justify-center flex">
      <Feed />
      <Sidebar />
    </div>
  );
}
