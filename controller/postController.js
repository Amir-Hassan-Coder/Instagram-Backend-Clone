import Post from "../model/Post.js";

export const createPost = async (req , res)=>{
    try {
        const {caption , image} = req.body;

        if (!caption) {
            return res.status(403).json({
                succses:false,
                message:"caption is required"
            });
        }

        const post = await Post.create({
    user: req.user._id,
    caption,
    image
});
        res.status(201).json({
            succses:true,
            message:"Post is created succsesfully ",
            post
        });
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"User Post Api Problem",
            error: error.message
        })
    }
}


export const  getAllPosts = async (req,res)=>{
    try {
        const post = await Post.find().populate("user" , "username profilePic");
        if (post.length === 0 || !post) {
            return res.status(404).json({
                succses:false,
                message:"Post is not found"
            });
        }

        res.status(200).json({
            succses:true,
            message:"all post is " , 
            post
        });
    } catch (error) {
         res.status(500).json({
            succses:false,
            message:"User Get Api Problem",
            error: error.message
        })
    }
}



export const updatePost = async (req,res)=>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                succses:false,
                message:"Post is not Found"
            });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                succses:false,
                message:"Not Authorized"
            })
        }

        post.caption = req.body.caption || post.caption; 
         post.image = req.body.image || post.image; 

         await post.save();

         res.status(200).json({
            message:"post is updated succsesfully",
            post
         })
    } catch (error) {
         res.status(500).json({
            succses:false,
            message:"User Post update Api Problem",
            error: error.message
        })
    }
}


export const deletePost = async (req,res)=>{
    try {
        const {id} = req.params;

        const post = await Post.findById(id);

        if (!post) {
      return res.status(404).json({ message: "Post not found" });
     
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    
    }

    const delPost = await Post.deleteOne();

    res.status(200).json({
        succses:true,
        message:"Post is deleted Succsesfully",
        delPost
    })
    } catch (error) {
         res.status(500).json({
            succses:false,
            message:"User Post update Api Problem",
            error: error.message
        })
    }
}


// like post 

export const likePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                succses:false,
                message:"post not found"
            })
        }

        const userId = req.user._id;

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
           post.likes = post.likes.filter(
            (id)=> id.toString() !== userId.toString()
           )
           await post.save();
           return res.status(200).json({
            succses:true,
               message:"Post unliked"
           })
        }


        post.likes.push(userId);

        await post.save();

        res.status(200).json({
            succses:true,
            message:"post Liked"
        })
    } catch (error) {
        res.status(500).json({
            succses:false,
            message:"user like post problem"
        })
    }
}