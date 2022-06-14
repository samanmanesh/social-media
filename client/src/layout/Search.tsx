import { SearchIcon } from "@heroicons/react/outline";
import useSearch from './hooks/useSearch';
type Props = {};

export default function Search({}: Props) {
  // const {search, setSearch}= useSearch();
  
  
  
  const onClickHandler = (e : React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setSearch(e.target.value);
  };

  const onKeyDownHandler = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // setSearch(e.target.value);
    }
  };

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setSearch(e.target.value);
  }



  return (
    <div className="relative hidden items-center  sm:flex">
      <SearchIcon className="w-4 h-4 absolute left-2 text-gray-500" />
      <input
        placeholder="Search"
        className="min-w-fit p-1 pl-7 h-7 border rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
        type="search"
        name="search"
        onChange={handleSearch}
        // onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
      />
    </div>
  );
}
