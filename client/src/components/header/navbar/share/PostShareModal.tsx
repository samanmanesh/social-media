import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function PostShareModal({ isOpen, setIsOpen }: Props) {
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
          <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50" />
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
          <Dialog.Panel className="bg-white  rounded-lg relative">
            <Dialog.Title>Create new post</Dialog.Title>
            <hr />
            <input type="file" className=" w-26"/>
            <button>Select from computer</button>

            <div className=" rounded-full w-5 h-5">
              <img src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg" alt="profile" className=" w-5 h-5 rounded-full bg-cover" />
            </div>
            <input type="text" placeholder="Write a caption..." className="w-full border" />

            <button className="text-blue-500 font-semibold">Share</button>

          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
