import express from "express";
import { authenticate } from "../controllers/auth.js";
const router = express.Router();


//REGISTER
router.post("/register", authenticate);

router.get("/", (req, res) => {
  res.send("Hey this is auth route");
});

export default router;
