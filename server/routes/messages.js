const {
  addMessage,
  getMessages,
  getChats,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsgs", getMessages);
router.post("/getchats", getChats);

module.exports = router;
