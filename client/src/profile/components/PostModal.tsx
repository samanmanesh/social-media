import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useAuth } from "../../auth/utils";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post : Post | undefined;
};

const PostModal = ({ isOpen, setIsOpen, post }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useAuth();
  const closeModal = () => {
    setIsOpen(false);
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
          <Dialog.Panel className="bg-white rounded-lg relative">
            <div className="grid grid-cols-3 gap-4 lg:max-w-6xl h-screen max-h-[45rem]">
              {post && (
                <img
                  src={post.img}
                  alt=""
                  className=" object-cover col-span-2 h-full w-full"
                />
              )}
              <div className="px-2 py-4   ">
                <div className="flex space-x-4">
                  <img
                    src={
                      user?.profilePicture
                        ? user.profilePicture
                        : PF + "people/no-image-avatar2.png"
                    }
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-lg font-semibold">
                    {user?.username}
                  </span>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default PostModal;
