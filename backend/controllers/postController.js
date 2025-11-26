import Post from "../models/post.model.js";
import User from "../models/user.model.js";


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getFollowingPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("following");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({
      user: { $in: user.following }
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const createPost = async (req, res) => {
  try {
    const { caption, hashtags, taggedUsers, location, media } = req.body;

    if (!media || media.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Post must contain at least one media file"
      });
    }

    const post = await Post.create({
      user: req.user.id,
      media,
      caption,
      hashtags,
      taggedUsers,
      location
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const posts = await Post.find({ user: userId })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const toggleSavePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);

    const isSaved = user.savedPosts.includes(postId);

    await User.findByIdAndUpdate(userId, {
      [isSaved ? "$pull" : "$addToSet"]: { savedPosts: postId }
    });

    res.status(200).json({
      success: true,
      message: isSaved ? "Post unsaved" : "Post saved"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.includes(userId);

    await Post.findByIdAndUpdate(postId, {
      [hasLiked ? "$pull" : "$addToSet"]: { likes: userId }
    });

    res.status(200).json({
      success: true,
      message: hasLiked ? "Post unliked" : "Post liked"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

