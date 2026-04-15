import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
const server = express();
dotenv.config();

// middlewares 
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

// all routers 
server.use('/api/auth' , authRouter);
server.use('/api/user' , userRouter);
server.use('/api/user/post' , postRouter);
server.use('/api/user/comment' , commentRouter);
// test route 
server.get('/' , (req,res)=>{
    res.status(200).json({
        succses:true,
        message:"this is working true"
    })
})


const port = process.env.PORT;
server.listen(port , ()=>{
    connectDB();
    console.log("Our Server is running on this port =>:: " , port);
});


