import Post from "../models/post.js";

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
