import { FriendSuggestion } from "./FriendSuggestion";
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ ...props }: Props) {
  return (
    <div className="h-96 sticky flex-shrink-0 top-20 p-6 hidden lg:block ml-8 w-80">
      <div className="flex space-x-4">
        <img
          src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"
          alt="profile"
          className="rounded-full w-14 h-14 object-cover border border-gray-400 "
        />
        <div className="flex flex-col mt-2 text-sm">
          <span className="font-semibold">dualipa</span>
          <span className="text-gray-800">Dua 💋</span>
        </div>
      </div>
      <div className="mt-6 flex justify-between font-semibold">
        <span className="text-gray-500"> Suggestions For You</span>
        <button className="">See All</button>
      </div>
      <div className="flex flex-col space-y-4 p-3">
        <FriendSuggestion />
      </div>
      <div className="text-gray-400 text-xs font-medium p-3">
        © 2022 SAMAN MANESH
      </div>
    </div>
  );
}
