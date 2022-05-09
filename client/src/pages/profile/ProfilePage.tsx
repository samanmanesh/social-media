import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "../../components/profile/profilegallery/ProfileGallery";
import ProfileHeader from "../../components/profile/profileheader/ProfileHeader";
import { getUser, getUserPosts } from "api";

type Props = {};

const ProfilePage = (props: Props) => {
  const params = useParams();
  console.log("username: ", params.username);

  const [userPosts, setUserPosts] = useState([]);

  //todo: get user data from api
  //todo: get users posts from api

  useEffect(() => {
    const fetchUserData = async () => {
      const user:User = await getUser({ username: params.username });
      const posts = await getUserPosts({ username: user.username});
    };

    const fetchPosts = async () => {
      const res = await axios.get(`posts/profile/${params.username}`);
      console.log("User post res", res);
      setUserPosts(res.data);
    };

    fetchUserData();
    fetchPosts();
  }, []);

  return (
    <div className=" container flex flex-col">
      <ProfileHeader />
      <ProfileGallery />
    </div>
  );
};
export default ProfilePage;
