import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUploaderHandler from "../../../../helper/FileUploaderHandler";

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
          <Dialog.Panel className="bg-white rounded-lg relative p-5">
            <Dialog.Title className="p-5">Create new post</Dialog.Title>
            <hr/>

            <FileUploaderHandler />

            
            <input
              type="file"
              name="Select from computer"
              className=" block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 placeholder:boo"
            />

            <div className=" rounded-full w-5 h-5">
              <img
                src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"
                alt="profile"
                className=" w-5 h-5 rounded-full bg-cover"
              />
            </div>

            <input
              type="text"
              placeholder="Write a caption..."
              className="w-full border "
            />

            <button className="text-blue-500 font-semibold">Share</button>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
