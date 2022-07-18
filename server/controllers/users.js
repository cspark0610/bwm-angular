const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).json({ message: "Password or email is missing" });
  }

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      return res.status(422).json({ message: "something went wrong" });
    }
    if (!foundUser) {
      return res
        .status(422)
        .json({ message: `Not found User with email ${email}` });
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
    return res.status(422).json({ message: "wrong password" });
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
      return res.status(422).json({ message: "undefined error" });
    }
    if (existingUser) {
      return res
        .status(422)
        .json({ message: "Email is in use, user already exists" });
    }

    User.create({ username, email, password }, (err, user) => {
      if (err) {
        return res.status(422).json({ message: "undefined error" });
      }
      return res.json({
        message: `User created successfully ${JSON.stringify(user)}`,
      });
    });
  });
};
