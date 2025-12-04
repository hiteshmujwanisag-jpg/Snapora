
import Message from '../models/message.model.js'
import Chat from '../models/chat.model.js'
import User from '../models/user.model.js'
import jwt from "jsonwebtoken"


export const onlineUsers = new Map(); // userId => socketId (last)

export default function initSocket(io) {
  io.on('connection', async (socket) => {
 
    // expect token in query or auth header
     const cookie = socket.handshake.headers.cookie;
      
        let token = ""
         
     if(cookie){
        token = cookie?.split("token=")[1]?.split(";")[0];
     }else{
    
     token = socket.handshake.auth?.token ||
      socket.handshake.headers?.token ||
      socket.handshake.query?.token;
     }

     
    
    
    let userId = null;

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
        onlineUsers.set(userId.toString(), socket.id);
          console.log("socket connected",onlineUsers,token,userId)
      }
    } catch (err) {
      // no auth — allow guest or disconnect
      console.log('Socket auth failed');
    }

    // join rooms when client asks (room = chatId)
    socket.on('join_chat', (chatId) => {
      socket.join(chatId);
    });

    // leave chat
    socket.on('leave_chat', (chatId) => {
      socket.leave(chatId);
    });

    // send message (client emits)
    // data: { chatId, text, attachments? }
    socket.on('send_message', async (data) => {
      try {
        if (!userId) return;
        const { chatId, text, attachments } = data;
        const message = await Message.create({
          chatId,
          sender: userId,
          text,
          attachments,
          timestamp: new Date()
        });

        // update chat lastMessage & unread counts for other participants
        const chat = await Chat.findById(chatId);
        if (chat) {
          chat.lastMessage = message._id;
          chat.updatedAt = new Date();

          await chat.save();
        }

        // populate sender for emit
        await message.populate('sender', 'name avatar').execPopulate?.() || await message.populate('sender', 'name avatar');

        // emit to all in chat room
        io.to(chatId.toString()).emit('message_received', message);

        // if recipient offline, optionally send push notification via provider (not included)
      } catch (err) {
        console.error('send_message error', err);
      }
    });


    socket.on('disconnect', () => {
      if (userId) {
        onlineUsers.delete(userId.toString());
        io.emit('user_offline', { userId });
      }
    });
  });
}

