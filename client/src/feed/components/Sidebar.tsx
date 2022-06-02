import { FriendSuggestion } from "./FriendSuggestion";
import { useAuth } from "../../auth/utils";
import React, { useEffect } from "react";
import { getPeople, UserSuggestion } from "api";
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ ...props }: Props) {
  const { user } = useAuth();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work

  const [people, setPeople] = React.useState<UserSuggestion[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        if (user) {
          const peopleList = await getPeople(user._id);
          const excludeCurrentUser = peopleList.data.filter(
            (person) => person._id !== user._id
          );
          const firstFive = excludeCurrentUser.slice(0, 5);
          // setPeople(peopleList.data);
          setPeople(firstFive);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPeople();
  }, [user]);

  console.log("people : ", people);

  return (
    <div className="h-96 sticky flex-shrink-0 top-28 p-6 hidden lg:block ml-8 w-80">
      <div className="flex space-x-4">
        <img
          src={
            user?.profilePicture
              ? PF + "/people/" + user.profilePicture
              : PF + "people/no-image-avatar2.png"
          }
          alt="profile"
          className="rounded-full w-14 h-14 object-cover border border-gray-400 "
        />
        <div className="flex flex-col mt-2 text-sm">
          <span className="font-semibold">{user?.username}</span>
          <span className="text-gray-800">{user?.desc}</span>
        </div>
      </div>
      <div className="mt-6 flex justify-between font-semibold">
        <span className="text-gray-500"> Suggestions For You</span>
        <button className="">See All</button>
      </div>
      <div className="flex flex-col space-y-4 p-3">
        {people.map((person) => (
          <FriendSuggestion key={person._id} person={person} />
        ))}
      </div>
      <div className="text-gray-400 text-xs font-medium p-3">
        © 2022 SAMAN MANESH
      </div>
    </div>
  );
}
