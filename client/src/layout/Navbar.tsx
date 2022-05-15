import { HomeIcon, PlusIcon } from "@heroicons/react/solid";
import {
  HeartIcon,
  ChatAltIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import PostShareModal from './PostShareModal';
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
      <Link to="/profile/dua" className="rounded-full  w-7 h-7" >
        {" "}
        <img
          src={PF+"people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"}
          alt="profile"
          className=" w-7 h-7 rounded-full object-cover border border-gray-400"
        />{" "}
      </Link>
    </div>
  );
}
