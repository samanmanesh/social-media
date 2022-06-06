import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getFriends,
  uploadUserProfileImage
} from "../controllers/users.js";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "cloudinary";

const router = express.Router();
const upload = multer();
//get a users by id
// router.get("/:id", getUsers);

//get a user by query (id or username)
router.get("/", getUsers);

//update user by id
router.put("/:id", updateUser);

//upload a user image into cloudinary
router.post("/upload", upload.single("file"), uploadUserProfileImage);

//delete a user by id
router.delete("/:id", deleteUser);

//follow a user
router.put("/:id/follow", followUser);

//unfollow a user
router.put("/:id/unfollow", unfollowUser);

//get friends friends
router.get("/people/:userId", getFriends)

export default router;
