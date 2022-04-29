import { SearchIcon } from "@heroicons/react/outline";
import Navbar from "../navbar/Navbar";

export default function TopBar() {
  return (
    <div className="flex justify-between p-4 border-b border-black">
      <span className="font-freehand font-black text-3xl">Xenophone</span>

      <div className="relative flex items-center">
        <SearchIcon className="w-4 h-4 absolute left-2" />
        <input
          type="text"
          placeholder="Search"
          className="p-1 pl-7 h-7 border rounded border-black w-80 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <Navbar />
    </div>
  );
}
