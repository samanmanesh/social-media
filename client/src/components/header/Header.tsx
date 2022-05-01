import Navbar from "./navbar/Navbar";
import Search from "./search/Search";

export default function Header() {
  return (
    <>
    
    <div className="flex justify-around x-40 py-2 border-b border-black sticky inset-x-0 top-0 bg-white">
      <span 
      style={{
        filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.2))',
      }}
      className="font-freehand font-black text-3xl drop-shadow-lg">
        Xenophone
      </span>
      <Search />
      <Navbar />
    </div> 
    </>
  );
}
