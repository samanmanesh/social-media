import Navbar from "../navbar/Navbar";

export default function TopBar() {
  return (
    <div className="flex justify-between p-4">
      <span className="font-freehand font-black text-3xl">Xenophone</span>

      <input
        type="text"
        placeholder="Search"
        className="p-1 h-7 bg-neutral-800 rounded w-80 focus:outline-none focus:ring focus:border-blue-500"
      />
      <Navbar />
    </div>
  );
}
