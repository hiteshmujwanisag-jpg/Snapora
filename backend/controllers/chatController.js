import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const getOrCreatePrivateChat = async (req, res) => {
  const user1 = req.user._id;
  const { user2 } = req.body; // other user id

  try {
    let chat = await Chat.findOne({ participants: { $all: [user1, user2], $size: 2 } }).populate('participants', '-password').populate('lastMessage');
    if (!chat) {
      chat = await Chat.create({ participants: [user1, user2], unreadCount: { [user2]: 0, [user1]: 0 } });
      chat = await Chat.findById(chat._id).populate('participants', '-password');
    }
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserChats = async (req, res) => {
  const userId = req.user._id;
  try {
    const chats = await Chat.find({ participants: userId })
      .populate('participants', '-password')
      .populate({ path: 'lastMessage', populate: { path: 'sender', select: 'name' } })
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


