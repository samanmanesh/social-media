import { useAuth } from "auth";
import { useQuery } from "react-query";
import { getTimelinePosts } from "../api/posts";

export const useFeed = () => {
  const { user } = useAuth();
  console.log("useFeed user", user);

  const fetchTimelinePosts = async () => {
    const { data } = await getTimelinePosts(user?._id || "");
    return data;
  };

  // const {data, status} = useQuery(["feed", user?._id],  () => {
  //   console.debug(">>", user?._id);
  //   return  getTimelinePosts(user?._id || "");
  // });
  const { data, status } = useQuery(["feed", user?._id], fetchTimelinePosts);
  console.log("useFeed data", data);
  return { data, status };
};
