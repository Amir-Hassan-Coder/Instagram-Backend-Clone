import express from "express"
import { protect } from "../middlewares/authMiddleware.js";
import { followUser, getMyProfile, getUserProfile, unfollowUser, updateProfile } from "../controller/userController.js";

const userRouter = express.Router();
userRouter.get('/me' , protect , getMyProfile);
userRouter.get('/:id' , protect ,  getUserProfile);

userRouter.put('/update' , protect , updateProfile);

userRouter.post("/follow/:id" , protect , followUser);
userRouter.post("/unfollow/:id" , protect , unfollowUser);

export default userRouter