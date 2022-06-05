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
      name: "name",
      label: "Name",
      description:
        "Help people discover your account by using the name you're known by: either your full name, nickname, or business name",
      type: "text",
    },
    {
      name: "username",
      label: "Username",
      description: "",
      type: "text",
    },
    {
      name: "desc",
      label: "Bio",
      description: "Tell us a little about yourself",
      type: "textarea",
    },
    {
      name: "email",
      label: "Email",
      description: "",
      type: "text",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-md mt-8">
      <div className="flex space-x-6 max-w-lg py-4 md:px-32">
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : PF + "people/no-image-avatar2.png"
          }
          alt="profileImage"
          className="rounded-full w-10 h-10 md:w-14 md:h-14 border border-gray-500 object-cover"
        />

        <div className="space-x-4">
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
          <form
            key={index}
            className="grid md:grid-cols-5 gap-x-8 gap-y-2"
            action="submit"
          >
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
                  className="w-full border rounded p-1"
                />
              ) : (
                <textarea id={field.name} className="w-full border rounded" />
              )}
              <p className="text-xs text-gray-600 my-2"> {field.description}</p>
            </div>
          </form>
        ))}
        <button className="text-white bg-blue-500 text-sm font-bold border px-2 py-1 rounded md:mx-52">Submit</button>
      </div>
    </div>
  );
};

export default SettingPage;
