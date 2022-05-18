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
  const { user } = useAuth();
  const username = user?.username;

  const openModal = () => {
    setIsOpen(true);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work

  return (
    <div className="flex items-center space-x-5 mx-2">
      <Link to="/">
        <HomeIcon className="w-7 h-7" />
      </Link>

      <button>
        <ChatAltIcon className="w-7 h-7" />
      </button>

      <button onClick={openModal}>
        <PlusIcon className="w-7 h-7" />
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
                ? PF + "/people/" + user.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt="profile"
            className=" w-7 h-7 rounded-full object-cover border border-gray-400"
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
                  <button
                    className={`${
                      active ? "bg-slate-100" : "text-gray-900"
                    } group flex w-full items-center px-3 py-2 text-sm space-x-3 `}
                  >
                    <UserCircleIcon className="w-5 h-5 " />
                    <span>Profile</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-slate-100" : "text-gray-900"
                    } group flex w-full items-center px-3 py-2 text-sm space-x-3 `}
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

      {/* <Menu as="div">
          <Menu.Button>
            <img
              src={
                user?.profilePicture
                  ? PF + "/people/" + user.profilePicture
                  : PF + "people/no-image-avatar2.png"
              }
              alt="profile"
              className=" w-7 h-7 rounded-full object-cover border border-gray-400"
            />  
          </Menu.Button>
          <Menu.Items className="bg-white border rounded w-40 ">
            <Menu.Item>
              {({ active }) => <Link to={`/profile/${username}`}>Profile</Link>}
            </Menu.Item>
            <Menu.Item>{({ active }) => <button>Settings</button>}</Menu.Item>
            <hr />
            <Menu.Item>{({ active }) => <button>Log Out</button>}</Menu.Item>
          </Menu.Items>
        </Menu> */}
      {/* </div> */}
      {/* <Link to={`/profile/${username}`} className="rounded-full  w-7 h-7" >
        {" "}
        <img
          src={
            user?.profilePicture
              ? PF + "/people/" + user.profilePicture
              : PF + "people/no-image-avatar2.png"
          }
          alt="profile"
          className=" w-7 h-7 rounded-full object-cover border border-gray-400"
        />{" "}
      </Link> */}
    </div>
  );
}
