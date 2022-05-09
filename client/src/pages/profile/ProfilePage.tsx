import axios, { AxiosPromise } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "../../components/profile/profilegallery/ProfileGallery";
import ProfileHeader from "../../components/profile/profileheader/ProfileHeader";
import { getUser, getUserPosts } from "api";

type Props = {};

const ProfilePage = (props: Props) => {
  const params = useParams();
  console.log("username in ProfilePage: ", params.username);

  const [userPosts, setUserPosts] = useState([] as Post[]);
  const [user, setUser] = useState({} as User);

  //todo: get user data from api
  //todo: get users posts from api

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser({ username: params.username });
      setUser(user.data);
      console.log("user: ", user.data);
      const posts =  await getUserPosts(user.data.username);
      setUserPosts(posts.data);
      console.log("posts: ", posts.data);
    };

    // const fetchPosts = async () => {
    //   const res = await axios.get(`posts/profile/${params.username}`);
    //   console.log("User post res", res);
    //   setUserPosts(res.data);
    // };

    fetchUserData();
    // fetchPosts();
  }, []);

  return (
    <div className=" container flex flex-col">
      <ProfileHeader />
      <ProfileGallery />
    </div>
  );
};
export default ProfilePage;
