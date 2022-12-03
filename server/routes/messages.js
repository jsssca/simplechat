const {
  addMessage,
  getMessages,
  getChats,
  getUsers,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsgs", getMessages);
router.get("/getchats", getChats);
router.get("/getusers", getUsers);

module.exports = router;
