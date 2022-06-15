import { useAuth } from "auth";
import React, { useEffect } from "react";
import { getPeople, UserSuggestion } from "api";
import { FriendSuggestion } from "./components/FriendSuggestion";

type Props = {};

const FriendsPage = (props: Props) => {
  const { user } = useAuth();
  const [people, setPeople] = React.useState<UserSuggestion[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        if (user) {
          const peopleList = await getPeople(user._id);
          const excludeCurrentUser = peopleList.data.filter(
            (person) => person._id !== user._id
          );
          setPeople(excludeCurrentUser);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPeople();
  }, [user]);

  return (
    <div className="container mt-20 grid max-w-5xl">
      <h1 className="p-3 text-base font-bold">Suggested</h1>
      <div className="flex h-full flex-col justify-between rounded shadow">
        <div className="flex flex-col space-y-4 p-3">
          {people.map((person) => (
            <FriendSuggestion key={person._id} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
