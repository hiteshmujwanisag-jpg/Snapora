import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  ],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  isGroup: { type: Boolean, default: false },
  name: String,
  updatedAt: { type: Date, default: Date.now }
});

ChatSchema.index({ participants: 1, updatedAt: -1 });

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat
