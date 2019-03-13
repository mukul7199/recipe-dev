const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["x-auth-token"];
  console.log("Token " + token);
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
        res.status(401).send({ message: "user not found" });
      }
    });
  } else {
    res.status(401);
  }
};

module.exports = {
  authenticate
};
