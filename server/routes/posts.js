import express from "express";
import { createPost, updatePost } from "../controllers/posts.js";

const router = express.Router();


//create a post
router.post( '/', createPost );

//update a post
router.put( '/:id', updatePost );
//delete a post
//like a post
//get a post 
//get timeline posts



router.get('/', (req, res) => {
  res.send('Hello from Posts')
  });














export default router;