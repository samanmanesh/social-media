import axios, { AxiosPromise } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "../../components/profile/profilegallery/ProfileGallery";
import ProfileHeader from "../../components/profile/profileheader/ProfileHeader";
import { getUser, getUserPosts } from "api";

type Props = {};

const ProfilePage = (props: Props) => {
  const params = useParams();
  const [userPosts, setUserPosts] = useState([] as Post[]);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const fetchUserData = async () => {
      //user data
      const user = await getUser({ username: params.username });
      setUser(user.data);
      //user posts
      const posts = await getUserPosts(user.data.username);
      setUserPosts(posts.data);
    };

    fetchUserData();
  }, []);

  return (
    <div className=" container flex flex-col">
      <ProfileHeader />
      <ProfileGallery />
    </div>
  );
};
export default ProfilePage;
