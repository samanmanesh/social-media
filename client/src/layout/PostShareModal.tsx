import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUploaderHandler from "utils/FileUploaderHandler";
// import FileUploaderHandler from "../utils/FileUploaderHandler";
import { useAuth } from "auth";
import { useMutation } from "react-query";
import { createPost } from "api";

//TODO: make a drag and drop file uploader for images
//TODO: on server side use multer to upload files and store them in the cdn and return the url to the client and the address of that url to dbs (check the web final assignment)

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function PostShareModal({ isOpen, setIsOpen }: Props) {
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null);
  const { mutate, isLoading, error } = useMutation(createPost, {
    onSuccess: (data) => {
      console.log("data", data);
      // setIsOpen(false);
    },
  });

  console.log("file", file);
  const { user } = useAuth();

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(desc.current?.value);
    // console.log(file);
    if (user && file) {
      const newPost = {
        userId: user._id,
        desc: desc.current?.value,
        img: file,
      };
      // mutate(newPost);
      console.log("newPost", newPost);
    }
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
          <Dialog.Panel className="bg-white rounded-lg relative ">
            <Dialog.Title className="font-bold py-3 border-b  w-full text-center">
              Create new post
            </Dialog.Title>
            <hr className=" text-lg text-black" />

            <FileUploaderHandler file={file} setFile={setFile} />

            <div className=" rounded-full w-5 h-5">
              <img
                src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"
                alt="profile"
                className=" w-5 h-5 rounded-full bg-cover"
              />
            </div>
            <form action="" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Write a caption..."
                className="w-full border "
                ref={desc}
              />

              <button type="submit" className="text-blue-500 font-semibold">Share</button>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
