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
    console.debug("fetching");

    
    const fetchUserData =  async () => {
      //user data
      // Promise.all([
      //   getUser({ userId: params.userId }),
      //   getUserPosts({ userId: params.userId }),
      // ]).then(([user, posts]) => {
      //   setUser(user.data);
      //   setUserPosts(posts.data);
      // }
      // );
      const { data: userData } = await getUser({ username: params.username });

      //user posts
      const { data: posts } = await getUserPosts(userData.username);
      setUser(userData);
      setUserPosts(posts);
    };
    fetchUserData();
  }, []);

  console.log("userPosts", userPosts);
  console.log("user", user);

  const usersDetails = useMemo(() => {
    console.log("user in userDetails", user);
    let numOfFollowers = user && user.followers?.length;
    let numOfFollowing = user && user.following?.length;
    return { numOfFollowers, numOfFollowing };
  }, [user]);
  console.log("usersDetails", usersDetails);

  const postsDetails = useMemo(() => {
    let numOfPosts = userPosts.length;
    let numOfLikes = userPosts.reduce((acc, post) => {
      return acc + post.likes.length;
    }, 0);
  return { numOfPosts, numOfLikes };
  }, [userPosts]);
  console.log("postsDetails", postsDetails);

  // const data = useMemo(() => {
  //   let numOfFollowers = 0;
  //   let numOfFollowing = 0;
  //   let numOfComments = 0;
  //   let numOfLikes = 0;
  //   let numOfPosts = 0;

  //   let getDetails = (user: User) => {
  //     console.debug("hit use memo", userPosts, user);
  //     numOfPosts = userPosts ? userPosts.length : 0;
  //     numOfFollowers = user ? user.followers.length : 0;
  //     numOfFollowing = user ? user.following.length : 0;
  //   };

  //   getDetails(user);
  //   return {
  //     numOfPosts,
  //     numOfLikes,
  //     numOfComments,
  //     numOfFollowers,
  //     numOfFollowing,
  //   };
  // }, [userPosts, user]);

  // console.log("data :", data);

  return (
    <div className=" container flex flex-col">
      <ProfileHeader user={user} />
      <ProfileGallery getUserPosts={userPosts} />
    </div>
  );
};

export default ProfilePage;
