import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getTimeLinePosts,
  getUserPosts
} from "../controllers/posts.js";

const router = express.Router();

//create a post
router.post("/", upload.single("file"), createPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like and dislike a post
router.put("/:id/like", likePost);

//get a post
router.get("/:id", getPost);

//get timeline posts
router.get("/timeline/:userId", getTimeLinePosts);

//get user's  all posts
router.get("/profile/:username", getUserPosts);

// router.get("/", (req, res) => {
//   res.send("Hello from Posts");
// });

export default router;

