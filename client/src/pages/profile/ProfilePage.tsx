import axios, { AxiosPromise } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "../../components/profile/profilegallery/ProfileGallery";
import ProfileHeader from "../../components/profile/profileheader/ProfileHeader";
import { getUser, getUserPosts } from "api";

type Props = {};

//todo make the num of followers and following
//todo make the num of posts
// todo make the num of likes
// todo make the num of comments
//

const ProfilePage = (props: Props) => {
  // let numOfPosts = 0;
  // let numOfLikes = 0;
  // let numOfComments = 0;
  // let numOfFollowers = 0;
  // let numOfFollowing = 0;

  const params = useParams();
  const [userPosts, setUserPosts] = useState([] as Post[]);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const fetchUserData = async () => {
      //user data
      const userData = await getUser({ username: params.username });
      setUser(userData.data);
      console.log("user : ", user);
      //user posts
      const posts = await getUserPosts(userData.data.username);
      console.log(posts.data);

      setUserPosts(posts.data);
      console.log("userPosts", userPosts);
    };
    fetchUserData();
  }, []);

  // const data = useMemo(() => {
  //   let numOfPosts = userPosts ? userPosts.length : 0;

  //   let numOfFollowers = user ? user.followers.length : 0;
  //   let numOfFollowing = user ? user.following.length : 0;
  //   let numOfComments = 0;

  //   return {
  //     numOfPosts,
  //     // numOfLikes,
  //     numOfComments,
  //     numOfFollowers,
  //     numOfFollowing,
  //   };
  // }, [userPosts, user]);

  // console.log(data);

  return (
    <div className=" container flex flex-col">
      <ProfileHeader user={user} />
      <ProfileGallery getUserPosts={userPosts} />
    </div>
  );
};

export default ProfilePage;
