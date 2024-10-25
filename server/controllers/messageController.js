const asyncHandler = require("express-async-handler");
const {  mongoose } = require("mongoose");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const ChatModel = require("../models/chatModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    // Create the message
    let message = await Message.create(newMessage);

    // Populate the sender and chat fields
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

    // Populate the users in the chat
    const populatedMessage = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    console.log('Created Message:', message);


    // Update the latest message in the chat
    await ChatModel.findByIdAndUpdate(chatId, { latestMessage: populatedMessage });

    // Respond with the populated message
    res.json(populatedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(400);
    throw new Error(error.message);
  }
});


module.exports = { allMessages, sendMessage };
