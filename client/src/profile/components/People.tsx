import { useFollow } from "accounts/hooks";
import { UserSuggestion } from "api";
import { useAuth } from "auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  closeModal: () => void;
  user: UserSuggestion;
};

const People = ({ closeModal, user: person }: Props) => {
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
      <Link
        to={`/profile/${person.username}`}
        className="flex space-x-3 m-2 "
        onClick={closeModal} 
      >
        <img
          className="rounded-full w-8 h-8 object-cover "
          src={
            person.profilePicture
              ? person.profilePicture
              : PF + "people/no-image-avatar2.png"
          }
          alt={person.username}
        />
        <div className="text-xs font-semibold self-center">
          {person.username}
        </div>
      </Link>
      <button
        className={`border border-gray-500 rounded mx-4 my-2 px-2 py-1 ${
          !userStatus.isFollowing && "bg-blue-500 text-white border"
        } `}
        onClick={followHandler}
      >
        {userStatus.isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default People;
