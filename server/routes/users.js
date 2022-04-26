import express from "express";
import { getUsers, updateUser, deleteUser, followUser } from "../controllers/users.js";
const router = express.Router();

//get a users by id
router.get("/:id", getUsers);

//update user by id
router.put("/:id", updateUser);

//delete a user by id
router.delete("/:id", deleteUser);

//follow a user
router.put("/follow/:id", followUser);
//unfollow a user


export default router;
