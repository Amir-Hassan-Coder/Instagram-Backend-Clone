import Comment from "../model/Comment.js";
import Post from "../model/Post.js";

export const addComment = async (req , res)=>{
    try {
        const {text} = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
        user:req.user._id,
        post:post._id,

        text
    });

    post.comments.push(comment._id);

    await post.save();

    res.status(201).json({
        succses:false,
        message:"commet is added",
        comment
    });
    } catch (error) {
        return res.status(500).json({
            succses:false,
            message:"add Comment api problem",
            error: error.message
        })
    }
}

export const deleteComment = async (req , res)=>{
    try {
        const comment = await Comment.findById(req.params.id);

         if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

 if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne(); 

    res.status(200).json({
        succses:false,
        message:"Comment Deleted Succsesfully",
        comment
    });

    } catch (error) {
        return res.status(500).json({
            succses:false,
            message:"add Comment api problem"
        })
    }
}