import express from "express";
import User from '../models/user.js';
const router = express.Router();


//REGISTER
router.post("/register", async (req, res) => {
  // const user = new User(req.body); for client side request
  const user = new User ({
    userName: "Sam",
    email: "Sam@gmail.com",
    password: "12345678",
  })

  try {
    const newUser = await user.save();
    res.send(newUser);
  }
  catch (err) {
    res.send(err);
  }
});

router.get("/", (req, res) => {
  res.send("Hey this is auth route");
});

export default router;
