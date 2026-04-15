import User from "../model/User.js";

export const getMyProfile = async (req , res)=>{
    try {
        const myProfile = req.user;

        res.status(200).json({
            succses:true,
            message:"this is your profile",
            myProfile
        });
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"get my profile api problem ",
            error:error.message
        })
    }
}


export const getUserProfile = async (req , res)=>{
    try {
        const {id} = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                succses:false,
                message:"user is not found",

            });
        }

        res.status(200).json({
            succses:true,
            message:"this is the user profile",
            user
        });



      
    } catch (error) {
          res.status(500).json({
            succses:false,
            message:"get User profile api problem ",
            error:error.message
        })
    }
}


  export const updateProfile = async (req,res)=>{
            try {
                const user = await User.findById(req.user._id);
                user.username = req.body.username || user.username;

                user.bio = req.body.bio || user.bio;
                user.profilePic = req.body.profilePic || user.profilePic;

                await user.save();

                res.status(200).json({
                    succses:false,
                    message:"user profile is updated",
                    user
                })
            } catch (error) {
                 res.status(500).json({
            succses:false,
            message:"update User profile api problem ",
            error:error.message
        })
            }
        }


export const followUser = async (req , res)=>{
    try {
        
        const {id} = req.params;
 
        const userToFollow = await User.findById(id);

        const currentUser = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({
                succses:false,
                message:"User is not Found"
            })
        }

        // check already follow or not 

        if (currentUser.following.includes(userToFollow._id)) {
            return res.status(400).json({
                succses:false,
                message:"user already following"
            });
        }


        currentUser.following.push(userToFollow._id);
        userToFollow.followers.push(currentUser._id);

        res.status(200).json({
            succses:false,
            messsage:"User followed",
            userToFollow
        });


    } catch (error) {
           res.status(500).json({
            succses:false,
            message:"follow User profile api problem ",
            error:error.message
        })
}
}


export const unfollowUser = async (req,res)=>{
    try {
         const {id} = req.params;
 
        const userToUnfollow = await User.findById(id);

        const currentUser = await User.findById(req.user._id);

     currentUser.following = currentUser.following.filter(
        id => id.toString() !== userToUnfollow._id.toString()
     );

     userToUnfollow.followers = userToUnfollow.followers.filter(
        id => id.toString() !== currentUser._id.toString()
     );

     await currentUser.save();
     await userToUnfollow.save();

     res.status(200).json({
        succses:false,
        message:"user unfollowed",
        userToUnfollow
     })

    } catch (error) {
         res.status(500).json({
            succses:false,
            message:"unFollow User profile api problem ",
            error:error.message
        })
    }
}