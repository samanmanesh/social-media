import express from "express";
import { createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

//create a post
router.post("/", createPost);

//update a post
router.put("/:id", updatePost);
//delete a post
router.delete("/:id", deletePost);
//like a post
router.put("/:id/like", likePost);
//get a post
//get timeline posts

router.get("/", (req, res) => {
  res.send("Hello from Posts");
});

export default router;
