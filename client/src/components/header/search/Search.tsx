import { SearchIcon } from "@heroicons/react/outline";
type Props = {};

export default function Search({}: Props) {
  return (
    <div className="relative hidden items-center  sm:flex">
      <SearchIcon className="w-4 h-4 absolute left-2 text-gray-500" />
      <input
        type="text"
        placeholder="Search"
        className="min-w-fit p-1 pl-7 h-7 border rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
}
