import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "auth";
import { useFollow } from "feed/hooks";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userOfPost: User;
};

const PostCardEditModal = ({ isOpen, setIsOpen, userOfPost }: Props) => {
  const { user } = useAuth();
  const [userStatus, setUserStatus] = useState({
    isCurrentUser: false,
    isFollowing: false,
  });

  useEffect(() => {
    if (user && userOfPost && user._id === userOfPost._id) {
      setUserStatus({
        isCurrentUser: true,
        isFollowing: false,
      });
    } else {
      //user data
      if (user?.following.includes(userOfPost._id)) {
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
  }, [userOfPost, user]);
  const {
    followUserMutation,
    unfollowUserMutation,
    followedSuccessfully,
    unfollowedSuccessfully,
  } = useFollow(userOfPost);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (followedSuccessfully) {
      setUserStatus({
        isCurrentUser: false,
        isFollowing: true,
      });
    }
    if (unfollowedSuccessfully) {
      setUserStatus({
        isCurrentUser: false,
        isFollowing: false,
      });
    }
  }, [followedSuccessfully, unfollowedSuccessfully]);

  //here we only need unfollow feature compared to ProfileHeader
  const followHandler = async () => {
    if (userStatus.isFollowing && user) {
      unfollowUserMutation({
        userIdToUnfollow: userOfPost._id,
        currUserId: user._id,
      });
      console.log("unfollowedSuccessfully", unfollowedSuccessfully);
      closeModal();
    } else if (user && !userStatus.isFollowing) {
      followUserMutation({
        userIdToFollow: userOfPost._id,
        currUserId: user._id,
      });
    }
  };

  /* here for menu for delete post if you are the user , with Unfollow user, go to post , cancel */

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 grid place-items-center"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-500"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-80" />
        </Transition.Child>
        <Transition.Child
          as="div"
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-500"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="bg-white rounded-xl relative flex flex-col md:w-72">
            {/* if the post is realated to the account user then don't show unfollow features shows edit instead  */}

            {userOfPost._id === user?._id ? (
              <button onClick={followHandler} className="text-red-500 font-semibold py-4">
                Delete
              </button>
            ) : (
              <button
                onClick={followHandler}
                className="text-red-500 font-semibold py-4"
              >
                {" "}
                Unfollow
              </button>
            )}
            <hr className=" text-lg text-black" />

            <button className=" font-semibold py-4"> Go to post</button>

            <hr className=" text-lg text-black" />

            <button onClick={closeModal} className=" font-semibold py-4">
              {" "}
              Cancel
            </button>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default PostCardEditModal;
