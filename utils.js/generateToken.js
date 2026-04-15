import jwt from "jsonwebtoken"

const generateToken = (userId , res)=>{
    const token = jwt.sign({userId} , process.env.SE_KEY , {expiresIn:"1d"});

    res.cookie("token" , token , {
        httpOnly:true
    })

  return token
}

export default generateToken