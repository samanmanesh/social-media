import { Dialog, Transition } from "@headlessui/react";
import { getFollowers } from "api";
import { useAuth } from "auth";
import React, { Fragment, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { UserSuggestion } from "api";
import { Link } from "react-router-dom";
import People from "./People";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const FollowersModal = ({ isOpen, setIsOpen }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user } = useAuth();
  const [followers, setFollowers] = useState([] as UserSuggestion[]);
  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutate: getFollowersMutate } = useMutation(getFollowers, {
    onSuccess: (data) => {
      setFollowers(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const fetchFollowers = async () => {
      if (user) {
        getFollowersMutate(user._id);
      }
    };

    fetchFollowers();
  }, [user]);

  console.log("followers", followers);

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
              Followers
            </Dialog.Title>
            <div className=" items-center ">
              {followers &&
                followers.map((followers) => (
                  <People key={followers._id} user={followers}  closeModal={closeModal}/>
                  // <div className="flex justify-between ">
                  //   <Link
                  //     to={`/profile/${followers.username}`}
                  //     className="flex space-x-3 m-2 "
                  //     onClick={closeModal}
                  //   >
                  //     <img
                  //       className="rounded-full w-8 h-8 object-cover "
                  //       src={
                  //         followers.profilePicture
                  //           ? followers.profilePicture
                  //           : PF + "people/no-image-avatar2.png"
                  //       }
                  //       alt={followers.username}
                  //     />
                  //     <div className="text-xs  font-semibold self-center">
                  //       {followers.username}
                  //     </div>
                  //   </Link>
                  //   <button className="border rounded mx-4 my-2 p-1">
                  //     {/* follow unfollow  */}
                  //     Follow
                  //   </button>
                  // </div>
                ))}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FollowersModal;
