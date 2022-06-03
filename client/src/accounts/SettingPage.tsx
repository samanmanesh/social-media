import React from "react";
import { useAuth } from "auth";

type Props = {};

const SettingPage = (props: Props) => {
  const { user } = useAuth();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  return (
    <div>
      <div className="px-4 py-2 mr-4 md:ml-12 md:mr-16 flex-shrink-0 grid place-items-center">
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : PF + "people/no-image-avatar2.png"
          }
          alt="profileImage"
          className="rounded-full w-20 h-20 md:w-36 md:h-36 border border-gray-500 object-cover"
        />
      </div>
      <h1
        title={user?.username}
        className="font-medium text-2xl overflow-hidden whitespace-nowrap text-ellipsis w-40 sm:w-52 cursor-default"
      >
        {user?.username}
      </h1>

      <button className="text-blue-500 text-sm ">Change Profile Photo</button>
    </div>
  );
};

export default SettingPage;
