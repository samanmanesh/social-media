import { UserSuggestion } from "api";
import React from "react";
import { Link } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  person: UserSuggestion;
}

export const FriendSuggestion = ({ person, ...props }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work

  return (
    <div className="flex justify-between ">
      <div className="flex">
        <Link to={`/profile/${person.username}`}>
          <img
            src={
              person.profilePicture
                ? PF + "/people/" + person.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border border-gray-400"
          />
        </Link>
        <div className="flex flex-col ml-3 text-xs ">
          <Link to={`/profile/${person.username}`}>
            <span className="font-semibold">{person.username}</span>
          </Link>
          <span className="text-gray-500">Suggested for you</span>
        </div>
      </div>
      <button className="text-blue-500 text-xs font-semibold">Follow</button>
    </div>
  );
};
