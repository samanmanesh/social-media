import Navbar from "./navbar/Navbar";
import Search from "./search/Search";

export default function Header() {
  return (
    <div className="flex justify-around px-16 py-2 border-b border-black sticky top-0">
      <span 
      style={{
        filter: 'drop-shadow(0px 5px 3px rgba(0,0,0,0.2))',
      }}
      className="font-freehand font-black text-3xl drop-shadow-lg">
        Xenophone
      </span>
      <Search />
      <Navbar />
    </div>
  );
}
