import express from "express";
import { getUsers, updateUser } from "../controllers/users.js";
const router = express.Router();

router.get("/", getUsers);

//update user
router.put("/:id", updateUser);
//get a user
//delete a user 
//follow a user
//unfollow a user


export default router;
