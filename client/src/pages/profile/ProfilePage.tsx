import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "../../components/profile/profilegallery/ProfileGallery";
import ProfileHeader from "../../components/profile/profileheader/ProfileHeader";

type Props = {};

const ProfilePage = (props: Props) => {
  const params = useParams();
  console.log("username: ", params.username);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // console.log("posts/profile/" + params.username);
      //proxy didn't work for this one 
      const res = await axios.get(`http://localhost:8800/api/posts/profile/${params.username}`);
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
