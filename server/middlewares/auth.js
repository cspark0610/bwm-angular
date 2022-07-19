const User = require("../models/user");
const jwt = require("jsonwebtoken");

function parseToken(token) {
  try {
    const decodedToken = jwt.verify(token.split(" ")[1], config.JWT_SECRET);
    return { decodedToken };
  } catch (error) {
    return { error: error.message };
  }
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: "Not Authorized!",
        detail: "You need to log in to get an access!",
      },
    ],
  });
}

exports.onlyAuthUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const { decodedToken, error } = parseToken(token);
    if (error) {
      return res.status(422).send({ error });
    }

    User.findById(decodedToken.sub, (error, foundUser) => {
      if (error) {
        return res.status(422).send({
          message: "Not found user with id: " + decodedToken.sub,
        });
      }
      if (!foundUser) return notAuthorized(res);

      res.locals.user = foundUser;
      next();
    });
  }
  return notAuthorized(res);
};
