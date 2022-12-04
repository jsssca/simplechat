const User = require("../model/User");
const bcrypt = require("bcrypt");
const {
  registerValidation,
  loginValidation,
} = require("../validations/validation");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  // Validation 1 to check user input
  // const { error } = loginValidation(req.body);
  // if (error) {
  //   return res.json({ msg: error["details"][0]["message"], status: false });
  // }

  // Validation 2 to check if user exists!
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ msg: "Incorrect email or password", status: false });
  }

  // Validation 3 to check user password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ msg: "Incorrect email or password", status: false });
  }

  req.session.userId = user._id;

  return res.json({
    status: true,
    token: {
      user: {
        username: user.username,
        avatar: user.avatar,
      },
    },
  });
};

const register = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;

  // Validation 1 to check user input
  // const { error } = registerValidation(req.body);
  // if (error) {
  //   return res.json({ msg: error["details"][0]["message"], status: false });
  // }

  // Validation 2 to check if username is already taken
  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    return res.json({ msg: "Username is taken!", status: false });
  }

  // Validation 3 to check if the email is being used by an existing account
  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    return res.json({ msg: "Email is in use", status: false });
  }

  //hash password
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Add User
  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
    avatar: avatar,
  });
  try {
    const savedUser = await user.save();
  } catch (err) {
    next(err);
  }
  delete user.password;
  return res.json({ status: true, user });
};

const logout = async (req, res, next) => {
  req.session.destroy(() => {
    res.json({ msg: "User has been logged out." });
  });
};

module.exports = { login, register, logout };
