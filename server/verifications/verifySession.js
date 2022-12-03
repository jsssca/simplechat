const User = require("../model/User");

const verifySession = async (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.json({ msg: "User is not logged in." });
  }
  next();
};

module.exports = { verifySession };
