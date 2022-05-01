import { HomeIcon, PlusIcon } from "@heroicons/react/solid";
import {
  HeartIcon,
  ChatAltIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import PostShareModal from './share/PostShareModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex items-center space-x-4 mx-2">
      <button>
        <HomeIcon className="w-6 h-6" />
      </button>
      <button>
        <ChatAltIcon className="w-6 h-6" />
      </button>

      <button onClick={openModal}>
        <PlusIcon className="w-6 h-6" />
      </button>
      <PostShareModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <button className="relative">
        <UserGroupIcon className="w-6 h-6" />
        <span className="absolute top-4 left-6"> +1 </span>
      </button>
      <button className="">
        <HeartIcon className="w-6 h-6" />
      </button>
      <button className="rounded-full  w-6 h-6">
        {" "}
        <img
          src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"
          alt="profile"
          className=" w-6 h-6 rounded-full bg-cover"
        />{" "}
      </button>
    </div>
  );
}
