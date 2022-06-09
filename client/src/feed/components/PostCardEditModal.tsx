import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PostCardEditModal = ({isOpen,
  setIsOpen}: Props) => {

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
          <Dialog.Panel className="bg-white rounded-xl relative flex flex-col">
            <Dialog.Title
              className={`font-bold py-6 px-12 border-b w-full text-center   `}
            >
              
            </Dialog.Title>
            <hr className=" text-lg text-black" />

            <label
              htmlFor="file"
              className=" text-blue-500 font-semibold p-3 text-center cursor-pointer "
            >
              {" "}
            </label>
            <hr className=" text-lg text-black" />

            {/* {user?.profilePicture && (
              <button
                onClick={removeProfilePhoto}
                className="text-red-500 font-semibold p-3"
              >
                {" "}
                Remove Current Photo
              </button>
            )} */}

            <hr className=" text-lg text-black" />

            <button onClick={closeModal} className=" font-semibold py-3">
              {" "}
              Cancel
            </button>
            
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default PostCardEditModal