import express from "express";
import { registerUser, authenticate } from "../controllers/auth.js";
const router = express.Router();


//REGISTER
router.post("/register", registerUser);

//LOGIN
router.post("/login", authenticate);
  

router.get("/", (req, res) => {
  res.send("Hey this is auth route");
});

export default router;
