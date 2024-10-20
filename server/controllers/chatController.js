const expressAsyncHandler = require("express-async-handler");
const chatModel = require("../models/chatModel");
const User = require("../models/userModel");

const addToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // Check if the requester is an admin
  const chat = await chatModel.findById(chatId);

  if (!chat) {
    return res.status(404).json({ message: "Chat Not Found" });
  }

  if (chat.groupAdmin._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only admins can add users!" });
  }

  // Add the user to the group
  const added = await chatModel.findByIdAndUpdate(
    chatId,
    {
      $addToSet: { users: userId }, // Use $addToSet to avoid duplicates
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    return res.status(404).json({ message: "Chat Not Found" });
  } else {
    res.json(added);
  }
});


const fetchChats = expressAsyncHandler(async (req, res) => {
    try {
      chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await chatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await chatModel.create(chatData);
        const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  });


  const removeFromGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await chatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });

const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
  
    var users = JSON.parse(req.body.users);
  
    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }
  
    users.push(req.user);
  
    try {
      const groupChat = await chatModel.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });
  
      const fullGroupChat = await chatModel.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  const renameGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await chatModel.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  });

module.exports={addToGroup,removeFromGroup,accessChat,fetchChats,renameGroup,createGroupChat};