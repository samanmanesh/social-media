import { Dialog, Transition } from "@headlessui/react";
import { getFollowers, getFollowing } from "api";
import { useAuth } from "auth";
import React, { Fragment, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { UserSuggestion } from "api";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const FollowingModal = ({ isOpen, setIsOpen }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user } = useAuth();
  const [following, setFollowing] = useState([] as UserSuggestion[]);
  // const [followers, setFollowers] = useState([] as UserSuggestion[] | any);
  const closeModal = () => {
    setIsOpen(false);
  };
  const { mutate: getFollowingMutate } = useMutation(getFollowing, {
    onSuccess: (data) => {
      setFollowing(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const fetchFollowing = async () => {
      if (user) {
        getFollowingMutate(user._id);
      }
    };
    fetchFollowing();
  }, [user]);

  console.log("following", following);

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
          <Dialog.Panel className="bg-white rounded-lg relative m-4 max-h-96">
            <Dialog.Title className="text-xl font-bold text-center border-b px-4 py-2 md:w-96 ">
              Following
            </Dialog.Title>
            <div className=" items-center ">
              {following &&
                following.map((following) => (
                  <div className="flex justify-between ">
                    <Link
                      to={`/profile/${following.username}`}
                      className="flex space-x-3 m-2 "
                      onClick={closeModal}
                    >
                      <img
                        className="rounded-full w-8 h-8 object-cover "
                        src={
                          following.profilePicture
                            ? following.profilePicture
                            : PF + "people/no-image-avatar2.png"
                        }
                        alt={following.username}
                      />
                      <div className="text-xs  font-semibold self-center">
                        {following.username}
                      </div>
                    </Link>
                    <button className="border rounded mx-4 my-2 p-1">
                      Following
                    </button>
                  </div>
                ))}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FollowingModal;
