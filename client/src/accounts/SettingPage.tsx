import React from "react";
import { useAuth } from "auth";

type Props = {};

// username
// email
// desc

const SettingPage = (props: Props) => {
  const { user, setUser } = useAuth();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work

  const onFieldChange = (field: keyof User, value: any) => {
    if (!user) return;

    // const newUser: User = {
    //   ...user,
    //   [field]: value,
    // };

    // setUser(newUser);
  };

  const fields: {
    name: keyof User;
    label: string;
    description: string;
    type: "text" | "textarea";
  }[] = [
    {
      name: "username",
      label: "Username",
      description: "",
      type: "text",
    },
    {
      name: "desc",
      label: "Description",
      description: "Tell us a little about yourself",
      type: "textarea",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-md mt-8">
      <div className="flex space-x-6 max-w-lg py-4 md:px-28">
        <div className="">
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
            className="font-bold text-xl text-gray-800 px-4"
          >
            {user?.username}
          </h1>
          <button className="text-blue-500 text-sm font-bold ">
            Change Profile Photo
          </button>
        </div>
      </div>

      <div className="max-w-lg space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="grid md:grid-cols-5 gap-x-8 gap-y-2">
            <div className="md:col-span-2 md:text-right">
              <label htmlFor={field.name} className="font-semibold capitalize">
                {field.label}
              </label>
            </div>
            <div className="md:col-span-3">
              {field.type === "text" ? (
                <input
                  type="text"
                  id={field.name}
                  className="w-full border rounded"
                />
              ) : (
                <textarea id={field.name} className="w-full border rounded" />
              )}
              <p className="text-sm text-gray-600 my-2"> {field.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingPage;
