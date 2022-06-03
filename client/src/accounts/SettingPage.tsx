import React from "react";
import { useAuth } from "auth";

type Props = {};

const SettingPage = (props: Props) => {
  const { user } = useAuth();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  return (
    <div className="container">
      <div className="flex space-x-6">
        <div className="  ">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : PF + "people/no-image-avatar2.png"
            }
            alt="profileImage"
            className="rounded-full w-10 h-10 md:w-14 md:h-14 border border-gray-500 object-cover"
          />
        </div>
        <div className=" space-x-4">
          <h1
            title={user?.username}
            className="font-semibold text-xl text-gray-800 px-4 py-"
          >
            {user?.username}
          </h1>
          <button className="text-blue-500 text-sm font-bold">
            Change Profile Photo
          </button>
        </div>
      </div>

      <form action="">
        <label htmlFor="" className="font-semibold">
          {" "}
          Name{" "}
        </label>
        <input type="text" className="border" />
        <div className="text-sm text-gray-600">
          Help people discover your account by using the name you're known by:
          either your full name, nickname, or business name.
        </div>
        <label htmlFor="" className="font-semibold">
          {" "}
          Username{" "}
        </label>
        <input type="text" className="border" />
        <label htmlFor="" className="font-semibold">
          {" "}
          Bio{" "}
        </label>
        <textarea
          placeholder="Write a caption..."
          className=" w-full outline-none border rounded my-4 min-h-[15ch] p-1 "
        />
        <label htmlFor="" className="font-semibold">
          {" "}
          Email{" "}
        </label>
        <input type="text" className="border" />
      </form>
      <button className=" bg-blue-500 text-white rounded p-1">Submit</button>
    </div>
  );
};

export default SettingPage;
