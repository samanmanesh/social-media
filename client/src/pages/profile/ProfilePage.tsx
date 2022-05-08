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

  console.debug("!!:", params);
  useEffect(() => {
    const fetchPosts = async () => {
      // console.log("posts/profile/" + params.username);
      //proxy didn't work for this one 
      // await axios.get("posts/timeline/62687513cdb831c3abb54c54");
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
