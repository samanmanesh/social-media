// const router = require('express').Router(); // old version of express
import express from "express";
const router = express.Router();

//module.exports = router; old version of express

router.get("/", (req, res) => {
  res.send("Users works");
});

export default router;
