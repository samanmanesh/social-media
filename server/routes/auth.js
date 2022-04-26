import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
  res.send("Hey this is auth route");
});

export default router;
