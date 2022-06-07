import React, { useEffect, useState } from "react";
import { useAuth } from "auth";
import ProfilePhotoUploaderModal from "./components/ProfilePhotoUploaderModal";
import { useMutation } from "react-query";
import { uploadUserProfileImage } from "api";

import { updateUserData } from "../api/users";
import toast from "react-hot-toast";

type Props = {};

// username
// email
// desc

//todo: let user change any options of the fileds bellow incoluding the profile picture and when press submit a propmpt will appear to confirm that the user is sure that he want to change the options then the user will be updated
//todo : check if user change something then send request to the server to update the user data

//?? problem with the updating the page when use setUser is updated the page will not update
//?? remember when uploading a new profile remove the previous profile photo from the cloudinary
const SettingPage = (props: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  const { user, setUser } = useAuth(); //final change after sending the request to the server to update the user data
  const [currUserData, setCurrUserData] = useState(user); // a copy of the user data to be used to update the user data
  const [finalUpdatedUser, setFinalUpdatedUser] = useState(null as User | null); // the user data that will be updated after the user press submit

  const [isOpen, setIsOpen] = useState(false);

  const [file, setFile] = useState(null as File | null); // the file that the user will upload
  const [image, setImage] = useState(null as any); // the image that the user will upload

  console.log("currUserData", currUserData);
  const {
    mutate: uploadPhoto,
    isLoading,
    error,
    data,
  } = useMutation(uploadUserProfileImage, {
    onSuccess: (data) => {
      console.log("data in uploadUserProifleImage on success", data);

      if (finalUpdatedUser && data.data) {
        const newUserData = {
          ...finalUpdatedUser,
          profilePicture: data.data,
        };
        const { password, ...newUserDataWithoutPassword } = newUserData; // remove the password from the user data to not change it

        updateUser({
          userId: finalUpdatedUser._id,
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
      // setIsOpen(false);
      setUser(data.data);
      window.location.reload();
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
  }, [file]);

  useEffect(() => {
    if (!currUserData) return;
    // if (image) setCurrUserData({ ...currUserData, profilePicture: image });
    // setUpdatedUser({ ...currUserData });
  }, [image]);

  useEffect(() => {
    if (!currUserData) return;
    setFinalUpdatedUser({ ...currUserData });
  }, [currUserData]);

  // this is for when the user change the value of the inputs in the form
  const onFieldChange = (field: keyof User, value: any) => {
    if (!user || !currUserData) return;
    const newUser: User = {
      ...currUserData,
      [field]: value,
    };
    // setCurrUserData(newUser);
    setFinalUpdatedUser(newUser);
  };

  // this is for when the user press submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(
      JSON.stringify(currUserData) === JSON.stringify(finalUpdatedUser)
    );
    console.log(!file);
    if (
      JSON.stringify(currUserData) === JSON.stringify(finalUpdatedUser) &&
      !file
    ) {
      toast.error("No changes made");
      return;
    }

    console.log("currUserData", currUserData);

    // if there is a file or image then upload it to the server otherwise update the user
    if (file) {
      console.log("hit the file");
      const formData = new FormData();
      formData.append("file", file);
      console.log("formData", formData.getAll("file"));
      uploadPhoto(formData);
    } else {
      if (finalUpdatedUser) {
        const { password, ...newUserDataWithoutPassword } = finalUpdatedUser; // remove the password from the user data to not change it
        updateUser({
          userId: finalUpdatedUser._id,
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
    description: string;
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
      description: "",
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
      description: "",
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
            title={currUserData?.username}
            className="font-bold text-xl text-gray-800 px-4"
          >
            {currUserData?.username}
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
                  id={field.name}
                  className="w-full border rounded p-1 placeholder:text-black"
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  placeholder={field.value}
                />
              ) : (
                <textarea
                  id={field.name}
                  className="w-full border rounded placeholder:text-black"
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  placeholder={user?.desc}
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
