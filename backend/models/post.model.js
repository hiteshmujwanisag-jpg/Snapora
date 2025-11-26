import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  media: [
    {
      url: { type: String, required: true },
      type: { type: String, enum: ["image", "video"], required: true }
    }
  ],

  caption: {
    type: String,
    trim: true,
    maxlength: 2200
  },

  hashtags: [{
    type: String,
    lowercase: true,
    trim: true
  }],

  taggedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  location: {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  commentsCount: {
    type: Number,
    default: 0
  },

  visibility: {
    type: String,
    enum: ["public", "friends", "private"],
    default: "public"
  },

  isArchived: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Post = mongoose.model("Post",postSchema)
export default Post;