import express from "express";
import { createPost, updatePost, deletePost, likePost, getPost } from "../controllers/posts.js";

const router = express.Router();

//create a post
router.post("/", createPost);

//update a post
router.put("/:id", updatePost);
//delete a post
router.delete("/:id", deletePost);
//like and dislike a post
router.put("/:id/like", likePost);
//get a post
router.get("/:id", getPost);
//get timeline posts

router.get("/", (req, res) => {
  res.send("Hello from Posts");
});

export default router;
