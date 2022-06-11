import { Dialog, Transition } from "@headlessui/react";
import { useFollow } from "accounts/hooks";
import { deletePost } from "api";
import { useAuth } from "auth";
import React, { Fragment, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userOfPost: User;
  post: Post;
  firstModal: boolean;
};

const PostCardEditModal = ({
  isOpen,
  setIsOpen,
  userOfPost,
  post,
  firstModal,
}: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user } = useAuth();
  const [openPromptModal, setOpenPromptModal] = useState(false);
  const [userStatus, setUserStatus] = useState({
    isCurrentUser: false,
    isFollowing: false,
  });
  const {
    followUserMutation,
    unfollowUserMutation,
    followedSuccessfully,
    unfollowedSuccessfully,
  } = useFollow(userOfPost);

  const { mutate: deletePostMutate } = useMutation(deletePost, {
    onSuccess: (data) => {
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error("Error deleting post");
    },
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

  const closeModal = () => {
    setIsOpen(false);
    setOpenPromptModal(false);
  };
  const showPromptModal = () => {
    setOpenPromptModal(true);
  };
  const hidePromptModal = () => {
    setOpenPromptModal(false);
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
      closeModal();
    } else if (user && !userStatus.isFollowing) {
      followUserMutation({
        userIdToFollow: userOfPost._id,
        currUserId: user._id,
      });
    }
  };

  const deletePostHandler = async () => {
    if (user && userOfPost) {
      deletePostMutate({ postId: post._id, userId: user._id });
    }
    closeModal();
  };

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
          <Dialog.Overlay
            className={`absolute inset-0 ${
              firstModal && "bg-black bg-opacity-80"
            } `}
          />
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
          {!openPromptModal && (
            <Dialog.Panel className="bg-white rounded-xl relative flex flex-col md:w-72 min-w-[10rem]">
              {userOfPost._id === user?._id ? (
                <button
                  onClick={deletePostHandler}
                  className="text-red-500 font-semibold py-4"
                >
                  Delete
                </button>
              ) : (
                <button
                  onClick={showPromptModal}
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
          )}

          {openPromptModal && (
            <Dialog.Panel className="bg-white rounded-xl relative flex flex-col items-center md:w-72 py-4">
              <img
                src={
                  userOfPost.profilePicture
                    ? userOfPost.profilePicture
                    : PF + "people/no-image-avatar2.png"
                }
                alt={userOfPost.username}
                className=" w-10 h-10 rounded-full object-cover border border-gray-400 alt-image:font-semibold text-center text-xs text-gray-500"
              />

              <span className="text-center font-semibold py-4 border-b w-full border-gray-300">
                Unfollow {userOfPost.username} ?{" "}
              </span>

              <button
                onClick={followHandler}
                className="py-3 w-full rounded border-b border-gray-300 text-red-500 font-semibold"
              >
                Unfollow
              </button>
              <button
                onClick={hidePromptModal}
                className="py-3 w-full font-semibold"
              >
                Cancel
              </button>
            </Dialog.Panel>
          )}
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default PostCardEditModal;
