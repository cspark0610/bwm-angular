const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

function parseToken(token) {
  try {
    const decodedToken = jwt.verify(token.split(" ")[1], config.JWT_SECRET);
    return { decodedToken };
  } catch (error) {
    return { error: error.message };
  }
}

function notAuthorized(res) {
  return res.json({
    errors: [
      {
        title: "Not Authorized!",
        detail: "You need to log in to get an access!",
      },
    ],
  });
}

exports.onlyAuthUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return notAuthorized(res);
  const { decodedToken, error } = parseToken(token);
  if (error) return res.status(401).json({ error });

  const foundUser = await User.findById(decodedToken.sub).exec();
  if (!foundUser) {
    return res.status(422).json({
      message: "Not found user with id: " + decodedToken.sub,
    });
  }
  res.locals.user = foundUser;
  next();
};

/*


*/
