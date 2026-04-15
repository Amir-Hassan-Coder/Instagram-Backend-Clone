import User from "../model/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils.js/generateToken.js";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({
        succses: false,
        message: "plz fill the fileds",
      });
    }
    // check user already exits or Not
    const exitsUser = await User.findOne({ email });
    if (exitsUser) {
      return res.status(403).json({
        succses: false,
        message: "this is user is already exits",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPass });

    generateToken(user._id, res);

    res.status(201).json({
      succses: true,
      message: "user is registerd succsesfully",
      regUser: user,
    });
  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "user register api problem",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        succses: false,
        message: "plz fill the fileds",
      });
    }

    const user = await User.findOne({email});
    // check user register or not 
    if (!user) {
      return res.status(403).json({
        succses: false,
        message: "this user is not register plz register first then try to login",
      });
    }

    // compare password 

    const isMatch = await bcrypt.compare(password , user.password );
    if (!isMatch) {
        return res.status(403).json({
        succses: false,
        message: "plz provide a correct password",
      });
    }

    const token = generateToken(user._id , res);

    res.status(200).json({
        succses:true,
        message:"user login succsesfully",
        loginUser:user,
        token
    })


  } catch (error) {
    res.status(500).json({
      succses: false,
      message: "user register api problem",
    });
  }
};


export const logOut = async (req,res)=>{
    try {
        res.cookie("token" , "" , {
            maxAge:0
        });

        res.status(200).json({
            succses:true,
            message:"user logout succsesfully"
        })
    } catch (error) {
         res.status(500).json({
      succses: false,
      message: "user register api problem",
    });
    }
}