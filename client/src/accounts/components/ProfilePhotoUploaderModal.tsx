import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import toast from "react-hot-toast";

type Image = File | null;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setFile: (file: Image) => void;
  setImage: (image: Image) => void;
  file: any;
  image: any;
  user: User | null;
}

function ProfilePhotoUploaderModal({
  user,
  file,
  image,
  setFile,
  setImage,
  isOpen,
  setIsOpen,
}: Props) {
  const closeModal = () => {
    setIsOpen(false);
    setFile(null);
    setImage(null);
  };
  const removeProfilePhoto = () => {
    if (user) {
      //remove from server and update user
      //remove from state
      setImage(null);
      setFile(null);
    }
  };

  const MAX_FILE_SIZE = 10485760;
  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files[0].size > MAX_FILE_SIZE) {
      toast.error("File size should be less than 10MB");
      // setFile(null);
      setFile(null);

      return;
    } else if (e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log("file", e.target.files[0]);
      setIsOpen(false);
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
              className={`font-bold py-6 px-12 border-b w-full text-center  ${
                file && "flex justify-between"
              } `}
            >
              {user?.profilePicture ? (
                <span className="p-16 text-lg">Change Profile Photo</span>
              ) : (
                <span className="p-16 text-lg"> Add Profile Photo</span>
              )}
            </Dialog.Title>
            <hr className=" text-lg text-black" />

            <label
              htmlFor="file"
              className=" text-blue-500 font-semibold p-3 text-center cursor-pointer "
            >
              {" "}
              Upload Photo
            </label>
            <hr className=" text-lg text-black" />

            {user?.profilePicture && (
              <button
                onClick={removeProfilePhoto}
                className="text-red-500 font-semibold p-3"
              >
                {" "}
                Remove Current Photo
              </button>
            )}

            <hr className=" text-lg text-black" />

            <button onClick={closeModal} className=" font-semibold py-3">
              {" "}
              Cancel
            </button>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleChange}
              accept=".JPG,.PNG,.JPEG"
              className="hidden "
            />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default ProfilePhotoUploaderModal;
