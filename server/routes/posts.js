import express from "express";
import {
  createPost,
  updatePost,
  uploadPost,
  deletePost,
  likePost,
  getPost,
  getTimeLinePosts,
  getUserPosts
} from "../controllers/posts.js";
import multer from "multer";



const router = express.Router();


const upload = multer(); // no {storage:storage} since we are not using diskStorage

//create a post
router.post("/",  createPost);

//upload a post
router.post("/upload", upload.single("file"), uploadPost);

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

