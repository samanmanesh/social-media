import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Search from "./search/Search";

export default function Header() {
  return (
    <div className="sticky inset-x-0 top-0 border-b border-gray-300 bg-white">
      <div className="py-3 container max-w-7xl flex justify-between">
        <Link
          to="/"
          style={{
            filter: "drop-shadow(0px 2px 1px rgba(0,0,0,0.2))",
          }}
          className="font-freehand font-black text-3xl drop-shadow-lg"
        >
          Xenophone
        </Link>
        <div className="hidden lg:block">
          <Search />
        </div>
        <Navbar />
      </div>
    </div>
  );
}
