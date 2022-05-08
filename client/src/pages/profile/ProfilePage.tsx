import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "../../components/profile/profilegallery/ProfileGallery";
import ProfileHeader from "../../components/profile/profileheader/ProfileHeader";
import { getUser } from "api";

type Props = {};

const ProfilePage = (props: Props) => {
  const params = useParams();
  console.log("username: ", params.username);

  const [userPosts, setUserPosts] = useState([]);

//todo: get user data from api
//todo: get users posts from api

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser({ username: params.username });
      console.log("username: ", params.username);
      console.log("user: ", user);
    };

    fetchUserData();
    const fetchPosts = async () => {
      const res = await axios.get(`posts/profile/${params.username}`);
      console.log("User post res", res);
      setUserPosts(res.data);
    };
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
