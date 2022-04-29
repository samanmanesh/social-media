import Navbar from "../Navbar";

export default function TopBar() {
  return (
    <div class=" flex justify-between p-4">
      <span class=" font-MsMadi italic font-black font text-2xl ">
        Xenophon
      </span>

      <input
        type="text"
        placeholder="Search"
        class=" p-1 bg-neutral-800 rounded w-80 focus:outline-none focus:ring focus:border-blue-500"
      />
      <Navbar />
    </div>
  );
}
