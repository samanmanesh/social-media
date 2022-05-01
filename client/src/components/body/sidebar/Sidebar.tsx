import Suggestion from '../feed/commonFriends/Suggestion';
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ ...props }: Props) {
  return (
    <div className="w-96 h-96 sticky flex-shrink-0  p-6">
      <div className="flex space-x-4">
        <img
          src="./assets/people/bailey-burton-1QyI-cct-_A-unsplash.jpg"
          alt="profile"
          className="rounded-full w-14 h-14 object-cover border border-gray-400 "
        />
        <div className="flex flex-col mt-2 text-sm">
          <span className="font-semibold">dualipa</span>
          <span className="text-gray-800">Dua 💋</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between font-semibold">
        <span className="text-gray-500"> Suggestions For You</span>
        <button className="">See All</button>
      </div>
      <div className="flex flex-col space-y-4 p-2">
      <Suggestion/>
      <Suggestion/>
      <Suggestion/>
      </div>
    </div>
  );
}
