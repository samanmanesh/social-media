import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} from "../controllers/users.js";
const router = express.Router();

//get a users by id
// router.get("/:id", getUsers);

//get a user by query (id or username)
router.get("/", getUsers);

//update user by id
router.put("/:id", updateUser);

//delete a user by id
router.delete("/:id", deleteUser);

//follow a user
router.put("/:id/follow", followUser);

//unfollow a user
router.put("/:id/unfollow", unfollowUser);

export default router;
