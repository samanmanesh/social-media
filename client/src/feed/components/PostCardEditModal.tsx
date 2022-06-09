import { Dialog, Transition } from "@headlessui/react";
import { useFollow } from "feed/hooks";
import React, { Fragment } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const PostCardEditModal = ({ isOpen, setIsOpen }: Props) => {
  // const {
  //   followUserMutation,
  //   unfollowUserMutation,
  //   followedSuccessfully,
  //   unfollowedSuccessfully,
  // } = useFollow(userOfProfile);

  const closeModal = () => {
    setIsOpen(false);
  };

  const followHandler = async () => {
    // if (userStatus.isFollowing && currUser) {
    //   unfollowUserMutation({
    //     userIdToUnfollow: userOfProfile._id,
    //     currUserId: currUser._id,
    //   });
    //   unfollowedSuccessfully &&
    //     setUserStatus({
    //       isCurrentUser: false,
    //       isFollowing: false,
    //     });
    // } else if (currUser && !userStatus.isFollowing) {
    //   followUserMutation({
    //     userIdToFollow: userOfProfile._id,
    //     currUserId: currUser._id,
    //   });
    //   followedSuccessfully &&
    //     setUserStatus({
    //       isCurrentUser: false,
    //       isFollowing: true,
    //     });
    // }
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
            <button
              onClick={followHandler}
              className="text-red-500 font-semibold py-4"
            >
              {" "}
              Unfollow
            </button>
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
