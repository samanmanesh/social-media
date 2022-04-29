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
    <div className="flex items-center space-x-4">
      <button>
        <HomeIcon className="w-7 h-7" />
      </button>
      <button>
        <ChatAltIcon className="w-7 h-7" />
      </button>

      <button onClick={openModal}>
        <PlusIcon className="w-7 h-7" />
      </button>
      <PostShareModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <button className="relative">
        <UserGroupIcon className="w-7 h-7" />
        <span className="absolute top-4 left-7"> +1 </span>
      </button>
      <button className="">
        <HeartIcon className="w-7 h-7" />
      </button>
      <button className="rounded-full  w-7 h-7">
        {" "}
        <img
          src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"
          alt="profile"
          className=" w-7 h-7 rounded-full bg-cover"
        />{" "}
      </button>
    </div>
  );
}
