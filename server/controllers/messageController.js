const Messages = require("../model/Message");
const User = require("../model/User");
const Users = require("../model/User");

// Get all of the messages between the current user and another user
const getMessages = async (req, res, next) => {
  const { partner } = req.body; // other user
  try {
    const userOne = await Users.findById(req.session.userId); // get current user id from session -- TODO -- export this to a function
    const userTwo = await Users.findOne({ username: partner }); // Check the other user exists
    if (!userTwo) {
      return res.json({ msg: "This user does not exist!", status: false });
    }

    // 1. find all messages between userOne and userTwo
    const messages = await Messages.find({
      $or: [
        {
          to: userOne,
          from: userTwo,
        },
        {
          to: userTwo,
          from: userOne,
        },
      ],
    })
      .sort({ updatedAt: 1 })
      .populate({ path: "from", model: User }); // TODO -- limit

    // 2. create a list
    const msgs = messages.map((msg) => {
      return {
        id: msg._id,
        from: msg.from.username,
        message: msg.message.text,
        timestamp: msg.updatedAt,
      };
    });

    // 3. return the list
    return res.json(msgs);
  } catch (err) {
    next(err);
  }
};

// Add a message from the current user to another user
const addMessage = async (req, res, next) => {
  const { to, message } = req.body; // other user and message to add
  try {
    const sender = await Users.findById(req.session.userId); // get current user id from session
    const recipient = await Users.findOne({ username: to }); // Check the other user exists
    if (!recipient) {
      return res.json({ msg: "This user does not exist!", status: false });
    }

    // 1. create and add a message
    const msg = await Messages.create({
      message: {
        text: message,
      },
      to: recipient,
      from: sender,
    });

    // 2. return the new message info
    if (msg) {
      return res.json({
        id: msg._id,
        message: msg.message.text,
        to: recipient.username,
        from: sender.username,
        timestamp: msg.updatedAt,
      });
    }
  } catch (err) {
    next(err);
  }

  return res.json({ msg: "Message could not be added to the database." });
};

// Get aLL available users
const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    users.map((u) => {
      return { username: u.username, avatar: u.avatar };
    });
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get all chats between the current user and other users
const getChats = async (req, res, next) => {
  try {
    const currentUser = await Users.findById(req.session.userId); // get current user id from session

    // 1. find all of the most recent messages between the current user and other users
    const allChats = await Messages.aggregate([
      {
        $match: {
          $or: [
            {
              to: currentUser._id,
            },
            {
              from: currentUser._id,
            },
          ],
        },
      },
      {
        $project: {
          to: 1,
          from: 1,
          message: 1,
          updatedAt: 1,
          fromTo: ["$from", "$to"],
        },
      },
      {
        $unwind: "$fromTo",
      },
      {
        $sort: {
          fromTo: 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          fromTo: {
            $push: "$fromTo",
          },
          from: {
            $first: "$from",
          },
          to: {
            $first: "$to",
          },
          message: {
            $first: "$message",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $group: {
          _id: "$fromTo",
          from: {
            $first: "$from",
          },
          to: {
            $first: "$to",
          },
          message: {
            $first: "$message",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
        },
      },
    ]); // TODO -- limit

    await Users.populate(allChats, { path: "from" });

    await Users.populate(allChats, { path: "to" });

    // 2. create and return a list of chats
    const chats = allChats.map((chat) => {
      const username =
        chat.from.username === currentUser.username
          ? chat.to.username
          : chat.from.username;

      const avatar =
        chat.from.username === currentUser.username
          ? chat.to.avatar
          : chat.from.avatar;

      return {
        user: {
          username: username,
          avatar: avatar,
        },
        timestamp: chat.updatedAt,
        snippet: chat.message.text,
      };
    });

    return res.json(chats);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMessages, addMessage, getChats, getUsers };

// getChats ?? returns chat snippets for given user ??
