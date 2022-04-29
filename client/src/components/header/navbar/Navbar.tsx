import {
  HeartIcon,
  UserGroupIcon,
  ChatAltIcon,
  PlusIcon,
  HomeIcon,
} from "@heroicons/react/solid";

export default function Navbar() {
  return (
    <div className="flex items-center space-x-3 ">
      <button>
        <HomeIcon className="w-8 h-8" />
      </button>
      <button>
        <PlusIcon className="w-8 h-8" />
      </button>
      <button>
        <ChatAltIcon className="w-8 h-8" />
      </button>
      <button>
        <UserGroupIcon className="w-8 h-8 " />
      </button>
      <button className="">
        <HeartIcon className="w-8 h-8" />
      </button>
      <button className="rounded-full border border-black w-9 h-9 ">
        {" "}
        <img
          src="./assets/people/aben-tefra-UB2S23kSZLM-unsplash.jpg"
          alt="profile"
          className=" w-9 h-9 rounded-full "
        />{" "}
      </button>
    </div>
  );
}
