require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const msgRoute = require("./routes/messages");
const { verifySession } = require("./verifications/verifySession");
const socket = require("socket.io");

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.use(cors({ credentials: true, origin: true })); // TODO -- Not safe!

app.use(
  sessions({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use("/api/messages", verifySession, msgRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}... `);
});

const io = socket(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data.messsage);
    }
  });
});
