import { Listbox, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { getAllUsers } from "api";

import { Fragment, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
type Props = {};

export default function Search({}: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [seachModaIsOpen, setSearchModaIsOpen] = useState(false);

  const {
    isLoading,
    data: users,
    error,
  } = useQuery("allUsers", getAllUsers, {
    onSuccess: (data) => {
      console.log("data for UseQueery", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = useMemo(() => {
    if (!users) return [];
    console.log("users", users.data);
    return users.data.filter((user) => {
      return user.username.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, users]);

  console.log("results", results);
  // const { search, setSearch } = useSearch();

  const openSearchModal = () => {
    console.log("open search modal");
    setSearchModaIsOpen(true);
  };
  return (
    <div className="relative hidden items-center  sm:flex">
      <SearchIcon className="w-4 h-4 absolute left-2 text-gray-500" />
      <input
        placeholder="Search"
        className="min-w-fit p-1 pl-7 h-7 border rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
        type="search"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={openSearchModal}
      />
      {seachModaIsOpen && (
        <Transition
          show={seachModaIsOpen}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gray-100 z-10">
            {results &&
              results.map((user) => {
                return (
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center">
                      <img
                        className="w-8 h-8 rounded-full text-center text-gray-500 text-xs"
                        src={
                          user.profilePicture
                            ? user.profilePicture
                            : "https://via.placeholder.com/150"
                        }
                        alt={user.username}
                      />
                      <span className="ml-2">{user.username}</span>
                    </div>
                    <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded">
                      Follow
                    </button>
                  </div>
                );
              })}
          </div>
        </Transition>
      )}

      {/* <Listbox value={query} onChange={setQuery}>
        <div className="relative  bg-blue-300">
          <input
            placeholder="Search"
            className="min-w-fit p-1 pl-7 h-7 border rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            type="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"></Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {results &&
                results.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={person.username}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.username}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox> */}
    </div>
  );
}
