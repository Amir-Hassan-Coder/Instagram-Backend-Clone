import express from "express"
import { createPost, deletePost, getAllPosts, likePost, updatePost } from "../controller/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const postRouter =express.Router();

postRouter.post('/create' , protect, createPost);
postRouter.post('/like/:id' , protect, likePost);
postRouter.get('/get' , protect, getAllPosts);
postRouter.put('/update/:id' , protect, updatePost);
postRouter.delete('/delete/:id' , protect, deletePost);
export default postRouter;