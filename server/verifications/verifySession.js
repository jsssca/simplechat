const User = require("../model/User");
// middleware to check if there is and active session
const verifySession = async (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.json({ msg: "User is not logged in." });
  }
  next();
};

module.exports = { verifySession };
