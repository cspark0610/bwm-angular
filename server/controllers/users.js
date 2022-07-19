const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).json({ message: "Password or email is missing" });
  }

  User.findOne({ email }, (err, foundUser) => {
    if (err) return res.mongoError(err);

    if (!foundUser) {
      return res.sendApiError({
        title: "User not found",
        detail: "User with email provided was not found",
      });
    }
    if (foundUser.hasSamePassword(password)) {
      const token = jwt.sign(
        {
          sub: foundUser._id,
          username: foundUser.username,
        },
        config.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ token });
    }
    return res.sendApiError({
      title: "Invalid password",
      detail: "Invalid password",
    });
  });
};

/*
payload generated encodede by jwt.sign()
{
  "sub": "62d5accba724478d095a3f1b",
  "username": "Matias",
  "iat": 1658171842,
  "exp": 1658258242
}
*/

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).json({ message: "Password or email is missing" });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).json({ message: "Passwords do not match" });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.mongoError(err);
    }
    if (existingUser) {
      return res.sendApiError({
        title: "User already exists",
        detail: "User with email provided already exists",
      });
    }

    User.create({ username, email, password }, (err, user) => {
      if (err) return res.mongoError(err);

      return res.json({
        message: `User created successfully with id: ${user._id}`,
      });
    });
  });
};
