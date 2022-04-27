import Post from "../models/post.js";

export const createPost = async (req, res) => {
  
  const newPost = new Post(req.body);
  try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
