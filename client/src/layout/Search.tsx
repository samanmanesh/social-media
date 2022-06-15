import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { getAllUsers } from "api";
import { useAuth } from "auth";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
type Props = {};

//todo just if user followed the search user then show following text

export default function Search({}: Props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { user: currUser } = useAuth();

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
                        {currUser?.following.includes(user._id) && (
                          <span className="text-xs text-gray-500">
                            Following
                          </span>
                        )}
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
}
