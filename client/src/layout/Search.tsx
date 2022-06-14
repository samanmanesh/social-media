import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { getAllUsers } from "api";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
type Props = {};

export default function Search({}: Props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    data: users,
    error,
  } = useQuery("allUsers", getAllUsers, {
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const results = useMemo(() => {
    if (!users || !query) return [];
    return users.data.filter((user) => {
      return user.username.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, users]);

  useEffect(() => {
    setQuery("");
    document.activeElement && (document.activeElement as HTMLElement).blur();
  }, [location]);

  const onChange = (user: string) => {
    navigate(`/profile/${user}`);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <Combobox
      value={query}
      // onChange={(user) => {
      //   navigate(`/profile/${user}`);
      // }}
      onChange={onChange}
    >
      {({ open }) => (
        <div className="relative hidden sm:flex flex-col ">
          <SearchIcon className="w-5 h-5 absolute left-2 top-1 text-gray-500 cursor-pointer items-center" />
          <Combobox.Input
            // onChange={(e) => setQuery(e.target.value)}
            onChange={onChangeInput}
            className="min-w-fit p-1 pl-8 h-7 border rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
          />
          {open && (
            <Combobox.Options
              static
              className="divide-y border rounded-md bg-white absolute top-full inset-x-0 mt-2"
            >
              {results.length === 0 && (
                <div className="p-8 text-center flex flex-col items-center">
                  <p className="text-sm">No results</p>
                </div>
              )}
              {results.map((user) => (
                <Combobox.Option
                  key={user._id}
                  value={user.username}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <Link
                      to={`/profile/${user.username}`}
                      className={`
                      flex px-4 py-2 space-x-3  
                      ${active ? "bg-gray-200" : ""}
                      ${selected ? "font-medium" : ""}
                      `}
                    >
                      <img
                        className="rounded-full w-8 h-8  border border-gray-500 object-cover text-xs text-center text-gray-400 "
                        src={
                          user?.profilePicture
                            ? user?.profilePicture
                            : PF + "people/no-image-avatar2.png"
                        }
                        alt={user.username}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm">{user.username}</span>
                        <span className="text-xs text-gray-500">Following</span>
                      </div>
                    </Link>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      )}
    </Combobox>
  );

  // return (
  //   <Popover className="hidden sm:flex flex-col relative">
  //     <Popover.Button className="relative items-center flex" as="div">
  //       <SearchIcon
  //         className="w-4 h-4 absolute left-2 text-gray-500 cursor-pointer"
  //         onClick={openSearchModal}
  //       />
  //       <input
  //         placeholder="Search"
  //         className="min-w-fit p-1 pl-8 h-7 border rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
  //         type="search"
  //         name="search"
  //         value={query}
  //         onChange={onChange}
  //         autoCapitalize="none"
  //         autoComplete="off"
  //         spellCheck="false"
  //         onFocus={openSearchModal}
  //         onBlur={closeSearchModal}
  //       />
  //     </Popover.Button>
  //     {searchModalOpen && (
  //       <div className="fixed inset-0" onClick={closeSearchModal} />
  //     )}
  //     <Transition
  //       show={searchModalOpen}
  //       enter="transition ease-in duration-100"
  //       enterFrom="opacity-0"
  //       enterTo="opacity-100"
  //       leave="transition ease-in duration-100"
  //       leaveFrom="opacity-100"
  //       leaveTo="opacity-0"
  //     >
  //       <Popover.Panel
  //         static
  //         className="absolute top-full bg-white border rounded-md shadow -inset-x-6 mt-2 divide-y"
  //       >
  // {results.length === 0 && (
  //   <div className="p-8 text-center flex flex-col items-center">
  //     <p className="text-sm">No results</p>
  //   </div>
  // )}
  //         {results.length > 0 &&
  //           results.map((user) => (
  //             <Link
  //               className="px-4 py-2 block"
  //               key={user._id}
  //               to={`/profile/${user.username}`}
  //             >
  //               <div className="flex items-center">
  //                 <img
  //                   className="w-8 h-8 rounded-full mr-3"
  //                   src={"https://picsum.photos/seed/1655244341243/300/300"}
  //                   alt={user.username}
  //                 />
  //                 <div className="flex-1">
  //                   <p className="text-sm">{user.username}</p>
  //                 </div>
  //               </div>
  //             </Link>
  //           ))}
  //       </Popover.Panel>
  //     </Transition>
  //   </Popover>
  // );
}

{
  /* <Listbox value={query} onChange={setQuery}>
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
      </Listbox> */
}
