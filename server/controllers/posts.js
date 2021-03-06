import Post from "../models/post.js";
import User from "../models/user.js";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "cloudinary";

const MAX_FILE_SIZE = 10485760;

export const uploadPost = async (req, res) => {
  if (req.file) {
    //version promise
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      try {
        let result = await streamUpload(req);
        return result;
      } catch (error) {
        return error;
      }
    }

    // if size of file is greater than 10mb then reject
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).send({
        message: "File size is too large",
      });
    }

    await upload(req)
      .then((uploaded) => {
        return res.status(200).send(uploaded.url);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send(error);
      });
  } else {
    return res.status(400).send("No file uploaded");
  }
};

export const createPost = async (req, res) => {
  console.log("createPost", req.body.data);
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatePost = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (post.userId === req.body.userId) {
      const updatedPost = await post.updateOne({ $set: req.body });
      return res
        .status(200)
        .json({ message: "Post updated successfully", updatedPost });
    } else
      return res.status(401).json("You are not authorized to update this post");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted successfully" });
    } else
      return res.status(401).json("You are not authorized to delete this post");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json({ message: "Post liked successfully" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({ message: "Post unliked successfully" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getTimeLinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendsPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    const allPosts = userPosts.concat(...friendsPosts);
    // posts.push(...userPosts, ...friendsPosts[0]);
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({ userId: user._id });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};
