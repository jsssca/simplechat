const {
  addMessage,
  getMessages,
  getChats,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsgs", getMessages);
router.get("/getchats", getChats);

module.exports = router;
