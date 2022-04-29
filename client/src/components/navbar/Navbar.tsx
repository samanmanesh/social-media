import { HeartIcon, UserGroupIcon, ChatAltIcon,PlusIcon, HomeIcon} from "@heroicons/react/solid";
import Home from '../../pages/home/Home';

export default function Navbar() {
  return (
    <div className="flex items-center  ">
      <div className="rounded-full border border-black w-8 h-8"></div>
      <div className="">
        <HeartIcon className="w-8 h-8" />
      </div>

      <div>< UserGroupIcon className="w-8 h-8 "/></div>
      <div>< ChatAltIcon className="w-8 h-8"/></div>
      <div><PlusIcon className="w-8 h-8"/></div>
      <div> <HomeIcon className="w-8 h-8"/></div>
    </div>
  );
}
