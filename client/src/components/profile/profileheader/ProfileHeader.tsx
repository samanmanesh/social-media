import React from "react";

type Props = {};

const ProfileHeader = (props: Props) => {
  return (
    <div className="flex border-b border-gray-400">
      <div>
        {" "}
        <img
          src="./assets/people/courtney-hill-aixlh4umWQw-unsplash.jpg"
          alt=""
          className="rounded-full w-20 h-20 border border-gray-500 object-cover"
        />
      </div>
      <div className="">
        <div className="font-semibold">
        <h1>User Name</h1>
        <button>Edit Profile</button>
        </div>
        <div >
          <span> 19 posts</span> 
          <span> 2,987 followers</span>
          <span> 1,903 following</span>
        </div>
        <div className="">
          <p> Name </p>
          <div>bio what ever they want put here</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
