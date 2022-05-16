import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "./components/ProfileGallery";
import { getUser, getUserPosts } from "api";
import ProfileHeader from "./components/ProfileHeader";
import { useAuth } from "auth";

type Props = {};

//todo make the num of followers and following ✔︎
//todo make the num of posts ✔︎
// todo make the num of likes ✔︎
// todo make the num of comments
// todo check is the user is admin or check if the user is the same as the current user then show the profile related to the user

const ProfilePage = (props: Props) => {
  const params = useParams();
  const [userPosts, setUserPosts] = useState([] as Post[]);
  const [user, setUser] = useState({} as User);
  const { handleSignOut } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      //user data
      const { data: userData } = await getUser({ username: params.username });
      //user posts
      const { data: posts } = await getUserPosts(userData.username);
      setUser(userData);
      setUserPosts(posts);
    };
    fetchUserData();
  }, [params.username]);

  const userDetails = useMemo(() => {
    let numOfFollowers = 0;
    let numOfFollowing = 0;
    let numOfComments = 0;
    let numOfLikes = 0;
    let numOfPosts = 0;

    let getDetails = (user: User) => {
      numOfPosts = userPosts ? userPosts?.length : 0;
      numOfFollowers = user ? user.followers?.length : 0;
      numOfFollowing = user ? user.following?.length : 0;
    };

    getDetails(user);
    return {
      numOfPosts,
      numOfLikes,
      numOfComments,
      numOfFollowers,
      numOfFollowing,
    };
  }, [userPosts, user]);

  return (
    <div className=" container flex flex-col">
      <ProfileHeader user={user} userDetails={userDetails} />
      <ProfileGallery userPosts={userPosts} userDetails={userDetails} />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default ProfilePage;
