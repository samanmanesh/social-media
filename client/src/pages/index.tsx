import Feed from "../components/home/body/feed/Feed";
import Sidebar from "../components/home/body/sidebar/Sidebar";


export default function HomePage() {
  return (
    <div className="container max-w-6xl flex flex-col md:flex-row pt-6">
      <Feed />
      <Sidebar />
    </div>
  );
}
