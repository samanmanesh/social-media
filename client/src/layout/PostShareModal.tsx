import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUploaderHandler from "utils/FileUploaderHandler";
// import FileUploaderHandler from "../utils/FileUploaderHandler";
import { useAuth } from "auth";
import { useMutation } from "react-query";
import { createPost, uploadPost } from "api";

//TODO: make a drag and drop file uploader for images
//TODO: on server side use multer to upload files and store them in the cdn and return the url to the client and the address of that url to dbs (check the web final assignment)
//TODO: there is problem that could'nt use two use mutate in one component, I want to use one for uploading img in cloudinary in backend with request and another for create post with the url of the img for first request
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function PostShareModal({ isOpen, setIsOpen }: Props) {
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null as any);
  const { user } = useAuth();
  // const [uploadedData, setUploadedData] = useState(null as any);
  const { mutate, isLoading, error, data } = useMutation(uploadPost, {
    onSuccess: (data) => {
      console.log("data", data.data);
      // setUploadedData(data);
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
    // console.log(desc.current?.value);
    // console.log(file);
    if (user && file) {
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("description", desc.current?.value || "");
      // formData.append("userId", user._id);
      // const newPost = {
      //   userId: user._id,
      //   desc: desc.current?.value,
      //   img:
      // };
      console.log("formData", formData.getAll("file"));

      //display the uploaded image

      mutate(formData);
      // console.log("newPost", newPost);
    }
  };

  useEffect(() => {
    if (file) setImage(URL.createObjectURL(file));
  }, [file]);

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
            {!file && !image ? (
              <FileUploaderHandler
                file={file}
                setFile={setFile}
                setImage={setImage}
              />
            ) : (
              <div className="flex justify-center">
                {image && <img src={image} alt="" />}
                <div>
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

                    <button
                      type="submit"
                      className="text-blue-500 font-semibold"
                    >
                      Share
                    </button>
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
