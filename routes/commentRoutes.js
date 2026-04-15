import express from "express"
import { addComment, deleteComment } from "../controller/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post('/add/:id' , protect , addComment);
commentRouter.delete('/delete/:id' ,protect , deleteComment);
export default commentRouter;