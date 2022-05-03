import React from "react";
import Sidebar from "../sidebar/Sidebar";
import PostCard from "./card/PostCard";
import { Users, Posts } from '../../DummyData';
interface Props {} // extends React.HTMLAttributes<HTMLDivElement> {}

export default function Feed({...props}: Props) {
  // const arrOfPosts = Array(10).fill(0);
  
  return (
    <div className="container max-w-6xl flex flex-col md:flex-row pt-6">
      <div className="space-y-5 w-full">
        {Posts.map((p, index) => (
          <PostCard key={index} post={p} />
        ))}
      </div>
      <Sidebar className=""/>
    </div>
  );
}
