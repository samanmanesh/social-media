import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUploaderHandler from "utils/FileUploaderHandler";
import { useAuth } from "auth";
import { useMutation } from "react-query";
import { createPost, uploadPost } from "api";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/solid";

//TODO: on server side use multer to upload files and store them in the cdn and return the url to the client and the address of that url to dbs (check the web final assignment)✔︎
//TODO: there is problem that could'nt use two use mutate in one component, I want to use one for uploading img in cloudinary in backend with request and another for create post with the url of the img for first request ✔︎
//TODO: make a drag and drop file uploader for images
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function PostShareModal({ isOpen, setIsOpen }: Props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null as any);
  const { user } = useAuth();
  const { mutate, isLoading, error, data } = useMutation(uploadPost, {
    onSuccess: (data) => {
      console.log("data", data.data);
      if (user) {
        const newPost = {
          userId: user._id,
          desc: desc.current?.value,
          img: data.data,
        };
        console.log("newPost", newPost);
        createPostMutation(newPost);
      }
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const { mutate: createPostMutation } = useMutation(createPost, {
    onSuccess: (data) => {
      console.log("data in createPost", data);
      setIsOpen(false);
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && file) {
      const formData = new FormData();
      formData.append("file", file);

      console.log("formData", formData.getAll("file"));
      mutate(formData);
    }
  };

  useEffect(() => {
    if (file) setImage(URL.createObjectURL(file));
  }, [file]);

  const onClickReturnButton = () => {
    setIsOpen(false);
    setFile(null);
    setImage(null);
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
          <Dialog.Panel className="bg-white rounded-lg relative">
            <Dialog.Title className="font-bold py-3 border-b w-full text-center flex justify-between">
              <ArrowLeftIcon
                className="w-4 mx-3 cursor-pointer"
                onClick={onClickReturnButton}
              />
              <span>Create new post</span>
              <button
                type="submit"
                className="text-blue-500 font-semibold mx-3"
              >
                Share
              </button>
            </Dialog.Title>
            <hr className=" text-lg text-black" />
            {!file && !image ? (
              <FileUploaderHandler file={file} setFile={setFile} />
            ) : (
              <div className="grid grid-cols-3 gap-4 lg:max-w-6xl h-screen max-h-[45rem]">
                {image && (
                  <img
                    src={image}
                    alt=""
                    className=" object-cover col-span-2 h-full w-full"
                  />
                )}
                <div className="p-3 space-y-4">
                  <div className="flex space-x-4">
                    <img
                      src={user?.profilePicture ? user.profilePicture : PF + "people/no-image-avatar2.png"}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-lg font-semibold">
                      {user?.username}
                    </span>
                  </div>

                  <form action="" onSubmit={onSubmit}>
                    <input
                      type="text"
                      placeholder="Write a caption..."
                      className="w-full  whitespace-pre-wrap my-4"
                      ref={desc}
                    />
                  </form>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
