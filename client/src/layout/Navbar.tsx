import { Menu, Transition } from "@headlessui/react";
import { HomeIcon, PlusIcon } from "@heroicons/react/solid";
import { CogIcon, UserCircleIcon } from "@heroicons/react/outline";

import {
  HeartIcon,
  ChatAltIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import PostShareModal from "./PostShareModal";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/utils";
import React from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleSignOut } = useAuth();
  const username = user?.username;

  const openModal = () => {
    setIsOpen(true);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work

  //todo change the icon solid and outline based on the current page user is on
  console.log("user2", user?.profilePicture);
  return (
    <div className="flex items-center space-x-5 mx-2">
      <Link to="/">
        <HomeIcon className="w-7 h-7" />
      </Link>

      <button>
        <ChatAltIcon className="w-7 h-7 " />
      </button>

      <button onClick={openModal}>
        <PlusIcon className="w-6 h-6 border-2 border-black rounded-lg" />
      </button>
      <PostShareModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <button className="relative">
        <UserGroupIcon className="w-7 h-7" />
        <span className="absolute top-4 left-6"> +1 </span>
      </button>
      <button className="">
        <HeartIcon className="w-7 h-7" />
      </button>
      {/* use global state to go to user profile when its clicked */}
      {/* <Link to={`/profile/${user.id}`}  className="rounded-full  w-7 h-7" > */}

      <Menu
        as="div"
        className="relative inline-block text-left rounded-full w-7 h-7"
      >
        <Menu.Button>
          <img
            src={
              user?.profilePicture
                ?  user.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt={user?.username}
            className=" w-7 h-7 rounded-full object-cover border border-gray-400 alt-image:font-semibold text-center text-xs text-gray-500"
          />
        </Menu.Button>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
            <div className=" ">
              <Menu.Item>
                {({ active }) => (
                  <Link to={`/profile/${username}`}>
                    <div
                      className={`${
                        active ? "bg-slate-100" : "text-gray-900"
                      } group flex w-full items-center px-3 py-2 text-sm space-x-4 `}
                    >
                      <UserCircleIcon className="w-5 h-5 " />
                      <span>Profile</span>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-slate-100" : "text-gray-900"
                    } group flex w-full items-center px-3 py-2 text-sm space-x-4 `}
                  >
                    <CogIcon className="w-5 h-5 " />
                    <span>Settings</span>
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSignOut}
                    className={`${
                      active ? "bg-slate-100" : "text-gray-900"
                    } group flex w-full items-center px-3 py-2 text-sm space-x-3 `}
                  >
                    <span>Log Out</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
