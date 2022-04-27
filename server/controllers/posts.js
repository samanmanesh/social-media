import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
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
    const currentUser = await User.findById(req.body.userId);

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
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
