const Messages = require("../model/Message");
const User = require("../model/User");
const Users = require("../model/User");

const getMessages = async (req, res, next) => {
  const { partner } = req.body;
  try {
    const userOne = await Users.findOne({ username: "Lettuce" }); // TODO -- get from session!!
    const userTwo = await Users.findOne({ username: partner }); // TODO -- make sure user exists!!

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
      .populate({ path: "from", model: User });

    const msgs = messages.map((msg) => {
      return {
        id: msg._id,
        from: msg.from.username,
        message: msg.message.text,
        timestamp: msg.updatedAt,
      };
    });

    return res.json(msgs);
  } catch (err) {
    next(err);
  }
};

const addMessage = async (req, res, next) => {
  const { to, message } = req.body;
  try {
    const sender = await Users.findOne({ username: "Lettuce" }); // TODO -- get from session!!
    const recipient = await Users.findOne({ username: to }); // TODO -- make sure user exists!!
    const m = await Messages.create({
      message: {
        text: message,
      },
      to: recipient,
      from: sender,
    });

    if (m) {
      return res.json({ msg: "Message sent!" });
    }
  } catch (err) {
    next(err);
  }

  return res.json({ msg: "Message could not be added to the database." });
};

const getChats = async (req, res, next) => {
  try {
    const currentUser = await Users.findOne({ username: "Lettuce" }); // TODO -- get from session!!

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
    ]);

    await Users.populate(allChats, { path: "from" });

    await Users.populate(allChats, { path: "to" });

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
        username: username,
        avatar: avatar,
        timestamp: chat.updatedAt,
        snippet: chat.message.text, // use snippet func()
      };
    });

    return res.json(chats);
  } catch (err) {
    next(err);
  }

  // for each user find all messages in order and limit 1
};

module.exports = { getMessages, addMessage, getChats };

// getChats ?? returns chat snippets for given user ??
