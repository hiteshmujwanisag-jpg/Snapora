import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId }).sort({ timestamp: 1 }).populate('sender', 'name avatar');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
