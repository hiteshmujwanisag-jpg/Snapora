import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";


export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    const comment = await Comment.create({
      post: postId,
      user: req.user.id,
      text
    });

    await Post.findByIdAndUpdate(postId, {
  $inc: { commentsCount: 1 }
});

    res.status(201).json({
      success: true,
      message: "Comment added",
      comment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const parentComment = await Comment.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const reply = await Comment.create({
      post: parentComment.post,
      user: req.user.id,
      text,
      parentComment: commentId
    });

    res.status(201).json({
      success: true,
      message: "Reply added",
      reply
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username avatar")
      .sort({ createdAt: 1 });

    const map = {};
    const result = [];

    comments.forEach(c => {
      map[c._id] = { ...c.toObject(), replies: [] };
    });

    comments.forEach(c => {
      if (c.parentComment) {
        map[c.parentComment]?.replies.push(map[c._id]);
      } else {
        result.push(map[c._id]);
      }
    });

    res.status(200).json({
      success: true,
      comments: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
