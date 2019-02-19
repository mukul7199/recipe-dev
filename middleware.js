const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.headers["x-auth-token"] || req.headers["authenticate"];
  if (token && token.startsWith("Bearer")) {
    tokens = token.split(" ");
    token = tokens[1];
  }
  if (token) {
    jwt.verify(token, "secret", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        res.send(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticate
};
