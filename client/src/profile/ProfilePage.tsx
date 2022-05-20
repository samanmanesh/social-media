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

// todo check is the user is admin or check if the user is the same as the current user then show the profile related to the user  ✔︎

const ProfilePage = (props: Props) => {
  const params = useParams();
  const [userPosts, setUserPosts] = useState([] as Post[]);
  const [userOfProfile, setUserOfProfile] = useState({} as User);
  const {  user } = useAuth();
  useEffect(() => {
    
    const fetchUserData = async () => {
      if (user && params.username === user?.username) {
        setUserOfProfile(user);
      } else {
        //user data
        const { data: userData } = await getUser({ username: params.username });
        setUserOfProfile(userData);
      }
      //user posts
      
      const { data: posts } = await getUserPosts(userOfProfile.username);
      // setUserOfProfile(userData);
      setUserPosts(posts);
    };

    fetchUserData();

  }, [params.username]);

  console.log("userOfProfile", userOfProfile);
  console.log("userPosts", userPosts);

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

    getDetails(userOfProfile);
    return {
      numOfPosts,
      numOfLikes,
      numOfComments,
      numOfFollowers,
      numOfFollowing,
    };
  }, [userPosts, userOfProfile]);

  return (
    <div className=" container flex flex-col">
      <ProfileHeader user={userOfProfile} userDetails={userDetails} />
      <ProfileGallery userPosts={userPosts} userDetails={userDetails} />
    </div>
  );
};

export default ProfilePage;
