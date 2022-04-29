import React from "react";
import Sidebar from "../sidebar/Sidebar";
import PostCard from "./card/PostCard";

interface Props {} // extends React.HTMLAttributes<HTMLDivElement> {}

export default function Feed({...props}: Props) {
  const arrOfPosts = Array(10).fill(0);
  return (
    <div className="container flex">
      <div className="space-y-5 w-full grid place-content-end ">
        {arrOfPosts.map((p, index) => (
          <PostCard key={index} />
        ))}
      </div>
      <Sidebar />
    </div>
  );
}
