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
  const { user } = useAuth();
  const [userStatus, setUserStatus] = useState({
    isCurrentUser: false,
    isFollowing: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && params.username === user?.username) {
        setUserOfProfile(user);
        setUserStatus({
          isCurrentUser: true,
          isFollowing: false,
        });
      } else {
        //user data
        const { data: userData } = await getUser({ username: params.username });
        setUserOfProfile(userData);
        if (user?.following.includes(userData._id)) {
          setUserStatus({
            isCurrentUser: false,
            isFollowing: true,
          });
        } else {
          setUserStatus({
            isCurrentUser: false,
            isFollowing: false,
          });
        }
      }
    };

    fetchUserData();
  }, [params.username, user]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      //user posts
      console.log("user of profile", userOfProfile);
      const { data: posts } = await getUserPosts(userOfProfile.username);
      posts.sort((a, b) => {
        //@ts-ignore
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      // setUserOfProfile(userData);
      setUserPosts(posts);
    };
    if (userOfProfile) fetchUserPosts();
  }, [userOfProfile ]);

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
      numOfLikes = userPosts
        ? userPosts.reduce((acc, curr) => {
            return acc + curr.likes.length;
          }, 0)
        : 0;
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
      <ProfileHeader
        user={userOfProfile}
        userDetails={userDetails}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
      />
      <ProfileGallery userPosts={userPosts} userDetails={userDetails} />
      <div className="p-8 flex items-center justify-center text-sm text-slate-600">
        © 2022 Hilarion By Saman Manesh
      </div>
    </div>
  );
};

export default ProfilePage;
