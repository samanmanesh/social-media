import { useAuth } from "auth";
import { useQuery } from "react-query";
import { getTimelinePosts } from "../api/posts";

export const useFeed = () => {
  const { user } = useAuth();

  const fetchTimelinePosts = async () => {
    const { data } = await getTimelinePosts(user?._id || "");
    //sort by date
    return data.sort((a, b) => {
      //@ts-ignore
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    // return data;
  };
  const { data, status } = useQuery(["feed", user?._id], fetchTimelinePosts);

  // const {data, status} = useQuery(["feed", user?._id],  () => {
  //   console.debug(">>", user?._id);
  //   return  getTimelinePosts(user?._id || "");
  // });
  return { data, status };
};
