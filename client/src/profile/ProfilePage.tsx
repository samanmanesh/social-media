import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileGallery from "./components/ProfileGallery";
import { getUser, getUserPosts } from "api";
import ProfileHeader from "./components/ProfileHeader";

type Props = {};

//todo make the num of followers and following ✔︎
//todo make the num of posts ✔︎
// todo make the num of likes ✔︎
// todo make the num of comments

const ProfilePage = (props: Props) => {
  const params = useParams();
  const [userPosts, setUserPosts] = useState([] as Post[]);
  const [user, setUser] = useState({} as User);

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
  }, [ params.username]);

  // console.log("userPosts", userPosts);
  // console.log("user", user);

  // const usersDetails = useMemo(() => {
  //   console.log("user in userDetails", user);
  //   let numOfFollowers = user && user.followers?.length;
  //   let numOfFollowing = user && user.following?.length;
  //   return { numOfFollowers, numOfFollowing };
  // }, [user]);
  // console.log("usersDetails", usersDetails);

  // const postsDetails = useMemo(() => {
  //   let numOfPosts = userPosts.length;
  //   let numOfLikes = userPosts.reduce((acc, post) => {
  //     return acc + post.likes.length;
  //   }, 0);
  // return { numOfPosts, numOfLikes };
  // }, [userPosts]);
  // console.log("postsDetails", postsDetails);

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
    </div>
  );
};

export default ProfilePage;
