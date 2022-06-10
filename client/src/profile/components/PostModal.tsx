import { Dialog, Transition } from "@headlessui/react";
import {
  AnnotationIcon,
  DotsHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../auth/utils";
import { format } from "timeago.js";
import PostCardEditModal from "feed/components/PostCardEditModal";
import { useMutation } from "react-query";
import { likePost } from "api";
import { UserStatus } from "./ProfileHeader";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: Post | undefined;
  userStatus: UserStatus;
};

const PostModal = ({ isOpen, setIsOpen, post, userStatus }: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  //todo if another user visit the profile can like a post and it will be added to the list of likes otherwise it will be the owner of page
  const { mutate, isLoading, error } = useMutation(likePost, {
    onSuccess: (data) => {
      setIsLiked(!isLiked);
      setNumLikes(isLiked ? numLikes - 1 : numLikes + 1);
    },
  });

  useEffect(() => {
    // if post is for current user then don't fetch user otherwise fetch user
    // const fetchUser = async () => {
    //   if (user && post.userId === user?._id) {
    //     setUserOfPost(user);
    //   } else {
    //     const res = await getUser({ userId: post.userId });
    //     setUserOfPost(res.data);
    //   }
    // };
    // fetchUser();
    // userStatus.isuser

    //check if user liked the post
    if (post && user) {
      setIsLiked(post.likes.includes(user._id));
      //setting num of likes
      setNumLikes(post.likes.length);
    }
  }, [post?.userId, user, post?.likes]);

  const onClickLike = () => {
    if (user && post) {
      const req = {
        postId: post._id,
        userId: user._id,
      };
      mutate(req);
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 grid place-items-center"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-500"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-80" />
        </Transition.Child>
        <Transition.Child
          as="div"
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-500"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="bg-white rounded-lg relative m-4">
            {/* For md size upper screen */}
            <div
              className={` md:grid  md:grid-cols-3 lg:max-w-6xl md:h-screen md:max-h-[50rem] hidden md:visible`}
            >
              {post && (
                <img
                  src={post.img}
                  alt=""
                  className=" object-cover col-span-2 h-full w-full"
                />
              )}
              <div className="py-2  ">
                <div className="flex items-center justify-between ml-4">
                  <div className="flex items-center space-x-4 py-4">
                    <img
                      src={
                        user?.profilePicture
                          ? user.profilePicture
                          : PF + "people/no-image-avatar2.png"
                      }
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-lg font-semibold">
                      {user?.username}
                    </span>
                  </div>
                  <DotsHorizontalIcon
                    className="w-4 h-4 mr-4 cursor-pointer "
                    onClick={openModal}
                  />
                  {post && user && (
                    <PostCardEditModal
                      isOpen={modalIsOpen}
                      setIsOpen={setModalIsOpen}
                      userOfPost={user}
                      post={post}
                      firstModal={false}
                    />
                  )}
                </div>
                <hr />
                <div className=" text-lg font-semibold p-4 ">
                  <div className="flex space-x-3 items-center ">
                    <img
                      src={
                        user?.profilePicture
                          ? user.profilePicture
                          : PF + "people/no-image-avatar2.png"
                      }
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover mr-1"
                    />

                    <span className="text-sm font-bold">{user?.username}</span>
                    <p className="text-sm font-normal w-full">{post?.desc}</p>
                  </div>
                  <span className="text-gray-800 text-xs font-extralight md:ml-12">
                    {post && format(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            {/* For sm size lower screen */}
            <div className="visible md:hidden">
              <div className="p-2 border-b border-black flex items-center justify-between ">
                <div className="flex items-center space-x-1">
                  <img
                    src={
                      user?.profilePicture
                        ? user?.profilePicture
                        : PF + "people/no-image-avatar2.png"
                    }
                    alt={user?.username}
                    className=" w-9 h-9 rounded-full object-cover border border-gray-400 alt-image:font-semibold text-center text-xs text-gray-500"
                  />
                  <span className="pl-2 font-semibold ">{user?.username}</span>
                </div>
                <button>
                  <DotsHorizontalIcon className="w-4 h-4" onClick={openModal} />
                </button>
                {post && user && (
                  <PostCardEditModal
                    isOpen={modalIsOpen}
                    setIsOpen={setModalIsOpen}
                    userOfPost={user}
                    post={post}
                    firstModal={false}
                  />
                )}
              </div>
              <div className="aspect-square w-full">
                <img
                  src={post?.img}
                  alt="postImage"
                  className="object-cover h-full w-full"
                />
              </div>
              <button
                onClick={onClickLike}
                className="p-2 border-y border-black w-full flex space-x-3"
              >
                {isLiked ? (
                  <HeartIcon className="w-7 h-7 fill-red-500 text-red-600" />
                ) : (
                  <HeartIcon className="w-7 h-7" />
                )}
                <AnnotationIcon className="w-7 h-7" />
              </button>
              <div className="flex flex-col space-y-1 p-2">
                {numLikes === 1 ? (
                  <span className="">Liked by a person </span>
                ) : numLikes > 1 ? (
                  <span className="">
                    Liked by mohammadgh4907 and {numLikes} others{" "}
                  </span>
                ) : (
                  <span className="">Liked by {numLikes} people</span>
                )}
                <div className="space-x-2">
                  <span className="font-medium cursor-pointer hover:underline underline-offset-4 ">
                    {user?.username}
                  </span>
                  <span>
                    {post && post?.desc?.length > 100 ? (
                      <button className="text-s text-gray-600"> more</button>
                    ) : (
                      <span>{post?.desc}</span>
                    )}
                  </span>
                </div>
                <span className="text-gray-800 text-sm">
                  {post && format(post.createdAt)}
                </span>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default PostModal;
