import jwt from "jsonwebtoken"
import User from "../model/User.js"

export const protect = async (req , res , next)=>{
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).json({
                succses:false,
                message:"not authrized token"
            })
        }

        const decoded = jwt.verify(token , process.env.SE_KEY);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({
                succses:false,
                message:"User is Not Found"
            });
        }

        req.user = user;

       next();
    } catch (error) {
         return res.status(401).json({ message: "Token failed" });
    }
}

// 69df386c7f13ce1f3cf66699

// 69df5b60b00033388793a668
