require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const msgRoute = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
//root with express-session middleware
app.use("/api/messages", msgRoute);

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
