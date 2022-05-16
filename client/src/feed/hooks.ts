import { AuthContext, useAuth } from "auth";
import { useContext } from "react";
import { useQuery } from "react-query";
import { textChangeRangeIsUnchanged } from "typescript";
import { threadId } from "worker_threads";
import { getTimelinePosts } from "../api/posts";

export const useFeed = () => {
  const { user } = useAuth();
  console.log("useFeed user", user?.country);

  const { data, status } = useQuery(["feed", user?._id], () => {
    console.debug('>>', user?._id)
    return getTimelinePosts(user?._id || "");
  });

  console.log("useFeed data", data);
  return { data, status };
};
