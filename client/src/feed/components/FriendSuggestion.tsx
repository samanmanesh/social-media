import { useFollow } from "accounts/hooks";
import { UserSuggestion } from "api";
import { useAuth } from "auth";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  person: UserSuggestion;
}

export const FriendSuggestion = ({ person, ...props }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user } = useAuth();
  const { followUserMutation, unfollowUserMutation } = useFollow(person);

  const [userStatus, setUserStatus] = useState({
    isCurrentUser: false,
    isFollowing: false,
  });

  useEffect(() => {
    if (user && person && user._id === person._id) {
      setUserStatus({
        isCurrentUser: true,
        isFollowing: false,
      });
    } else {
      //user data
      if (user?.following.includes(person._id)) {
        setUserStatus({
          isCurrentUser: false,
          isFollowing: true,
        });
      } else {
        setUserStatus({
          isCurrentUser: false,
          isFollowing: false,
        });
      }
    }
  }, [person, user]);

  const followHandler = async () => {
    if (userStatus.isFollowing && user) {
      unfollowUserMutation({
        userIdToUnfollow: person._id,
        currUserId: user._id,
      });
    } else if (user && !userStatus.isFollowing) {
      followUserMutation({
        userIdToFollow: person._id,
        currUserId: user._id,
      });
    }
  };
  return (
    <div className="flex justify-between ">
      <div className="flex">
        <Link to={`/profile/${person.username}`}>
          <img
            src={
              person.profilePicture
                ? person.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt={person.username}
            className="w-9 h-9 rounded-full object-cover border border-gray-400 text-xs text-gray-400 text-center"
          />
        </Link>
        <div className="flex flex-col ml-3 text-xs ">
          <Link to={`/profile/${person.username}`}>
            <span className="font-semibold">{person.username}</span>
          </Link>
          <span className="text-gray-500">Suggested for you</span>
        </div>
      </div>
      <button
        className="text-blue-500 text-xs font-semibold"
        onClick={followHandler}
      >
        Follow
      </button>
    </div>
  );
};
