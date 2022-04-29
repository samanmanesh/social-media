import { HomeIcon, UserGroupIcon, PlusIcon } from "@heroicons/react/solid";
import { HeartIcon, ChatAltIcon } from "@heroicons/react/outline";

export default function Navbar() {
  return (
    <div className="flex items-center space-x-3 ">
      <button>
        <HomeIcon className="w-7 h-7" />
      </button>
      <button>
        <ChatAltIcon className="w-7 h-7" />
      </button>
      <button>
        <PlusIcon className="w-7 h-7" />
      </button>
      <button>
        <UserGroupIcon className="w-7 h-7 " />
      </button>
      <button className="">
        <HeartIcon className="w-7 h-7" />
      </button>
      <button className="rounded-full border border-black w-7 h-7 ">
        {" "}
        <img
          src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"
          alt="profile"
          className=" w-7 h-7 rounded-full "
        />{" "}
      </button>
    </div>
  );
}
