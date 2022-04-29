import Navbar from "./navbar/Navbar";
import Search from "./navbar/Search";

export default function Header() {
  return (
    <div className="flex justify-around px-16 py-2 border-b border-black ">
      <span className="font-freehand font-black text-3xl drop-shadow-2xl">
        Xenophone
      </span>
      <Search />
      <Navbar />
    </div>
  );
}
