import React, { useEffect, useState } from "react";
import { useAuth } from "auth";
import ProfilePhotoUploaderModal from "./components/ProfilePhotoUploaderModal";
import { useMutation } from "react-query";
import { uploadUserProfileImage } from "api";

import { updateUserData } from "../api/users";
import toast from "react-hot-toast";

type Props = {};

//todo:  remember when uploading a new profile remove the previous profile photo from the cloudinary
const SettingPage = (props: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user, setUser } = useAuth(); //final change after sending the request to the server to update the user data
  const [currUserData, setCurrUserData] = useState(user); // a copy of the user data to be used to update the user data
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null as File | null); // the file that the user will upload
  const [image, setImage] = useState(null as any); // the image that the user will upload

  const { mutate: uploadPhoto } = useMutation(uploadUserProfileImage, {
    onSuccess: (data) => {
      if (currUserData && data.data) {
        const newUserData = {
          ...currUserData,
          profilePicture: data.data,
        };
        const { password, ...newUserDataWithoutPassword } = newUserData; // remove the password from the user data to not change it
        updateUser({
          userId: currUserData._id,
          userDataToUpdated: newUserDataWithoutPassword,
        });
      } else {
        toast.error("Error in uploading post");
      }
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const { mutate: updateUser } = useMutation(updateUserData, {
    onSuccess: (data) => {
      console.log("data in updateUserData success", data);
      setUser(data.data);
      setCurrUserData(data.data);
      toast.success("User data updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  // this is for image upload if the user upload a new image show the new image in the modal rather than the old image
  useEffect(() => {
    if (file) setImage(URL.createObjectURL(file));
    else setImage(user?.profilePicture || null);
  }, [file, user?.profilePicture]);

  // this is for when the user change the value of the inputs in the form
  const onFieldChange = (field: keyof User, value: any) => {
    if (!user || !currUserData) return;
    const newUser: User = {
      ...currUserData,
      [field]: value,
    };
    setCurrUserData(newUser);
  };

  // this is for when the user press submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (JSON.stringify(currUserData) === JSON.stringify(user) && !file) {
      toast.error("No changes made");
      return;
    }
    // if there is a file or image then upload it to the server otherwise update the user
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // console.log("formData", formData.getAll("file"));
      uploadPhoto(formData);
    } else {
      if (currUserData) {
        const { password, ...newUserDataWithoutPassword } = currUserData; // remove the password from the user data to not change it

        updateUser({
          userId: currUserData._id,
          userDataToUpdated: newUserDataWithoutPassword,
        });
      }
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const fields: {
    name: keyof User;
    label: string;
    description?: string;
    type: "text" | "textarea";
    value: any;
  }[] = [
    {
      name: "name",
      label: "Name",
      description:
        "Help people discover your account by using the name you're known by: either your full name, nickname, or business name",
      type: "text",
      value: currUserData?.name,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      value: currUserData?.username,
    },
    {
      name: "desc",
      label: "Bio",
      description: "Tell us a little about yourself",
      type: "textarea",
      value: currUserData?.desc,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      value: currUserData?.email,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-md mt-8">
      <div className="flex space-x-6 max-w-lg py-4 md:px-32">
        <img
          src={
            image
              ? image
              : user?.profilePicture ?? PF + "people/no-image-avatar2.png"
          }
          alt={user?.username + "'s profile picture"}
          className="rounded-full w-10 h-10 md:w-14 md:h-14 border border-gray-500 object-cover alt-image:font-semibold text-center text-xs text-gray-500"
        />

        <div className="space-x-4">
          <h1
            title={user?.username}
            className="font-bold text-xl text-gray-800 px-4"
          >
            {user?.username}
          </h1>
          <button
            className="text-blue-500 text-sm font-bold "
            onClick={openModal}
          >
            {currUserData?.profilePicture
              ? "Change Profile Photo"
              : "Add Profile Photo"}
          </button>
          <ProfilePhotoUploaderModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={currUserData}
            file={file}
            setFile={setFile}
            image={image}
            setImage={setImage}
          />
        </div>
      </div>

      <div className="max-w-lg space-y-4">
        {fields.map((field, index) => (
          <form
            key={index}
            className="grid md:grid-cols-5 gap-x-8 gap-y-2"
            action=""
            onSubmit={onSubmit}
            id="submitForm"
          >
            <div className="md:col-span-2 md:text-right">
              <label htmlFor={field.name} className="font-semibold capitalize">
                {field.label}
              </label>
            </div>
            <div className="md:col-span-3">
              {user && field.type === "text" ? (
                <input
                  type="text"
                  className="w-full border rounded p-1 placeholder:text-black"
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  value={field.value}
                />
              ) : (
                <textarea
                  className="w-full border rounded placeholder:text-black"
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  value={field.value}
                  maxLength={field.name === "desc" ? 150 : undefined}
                />
              )}

              <p className="text-xs text-gray-600 my-2"> {field.description}</p>
            </div>
          </form>
        ))}
        <button
          form="submitForm"
          type="submit"
          className="text-white bg-blue-500 text-sm font-bold border px-2 py-1 rounded md:mx-52"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
