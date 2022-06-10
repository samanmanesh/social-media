import { Dialog, Transition } from "@headlessui/react";
import { getFollowers, getFollowing } from "api";
import { useAuth } from "auth";
import React, { Fragment, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { UserSuggestion } from "api";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const FollowingModal = ({ isOpen, setIsOpen }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user } = useAuth();
  const [following, setFollowing] = useState([] as UserSuggestion[] | any);
  const [followers, setFollowers] = useState([] as UserSuggestion[] | any);
  const closeModal = () => {
    setIsOpen(false);
  };
  const { mutate: getFollowingMutate } = useMutation(getFollowing, {
    onSuccess: (data) => {
      setFollowing(data);
      // console.log("data on Get Following success", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: getFollowersMutate } = useMutation(getFollowers, {
    onSuccess: (data) => {
      setFollowers(data);
      console.log("data on Get Followers success", data);
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
    const fetchFollowers = async () => {
      if (user) {
         getFollowersMutate(user._id);
      }
    };

    fetchFollowing();
    fetchFollowers();
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
          <Dialog.Panel className="bg-white rounded-lg relative m-4"></Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FollowingModal;
