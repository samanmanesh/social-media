import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/users.js";
const router = express.Router();

//get a users
router.get("/", getUsers);

//update user
router.put("/:id", updateUser);

//delete a user 
router.delete("/:id", deleteUser);
//follow a user
//unfollow a user


export default router;
