
import Navbar from "./navbar/Navbar";
import Search from './navbar/Search';

export default function Header() {
  return (
    <div className="flex justify-between px-16 py-2 border-b border-black ">
      <span className="font-freehand font-black text-3xl">Xenophone</span>
      <Search />
      <Navbar />
    </div>
  );
}
