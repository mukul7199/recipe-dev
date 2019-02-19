const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then(users => res.send({ users }))
    .catch(e => console.log(e));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (user.password === password) {
      jwt.sign(user.toJSON(), "secret", (err, token) => {
        res.send(token);
        // console.log(token, err);
      });
    } else {
      res.send(401);
    }
  });
});

router.post("/signup", (req, res) => {
  const { email, username, password } = req.body;
  const newUser = new User({
    email,
    username,
    password
  });
  newUser.save().then(user => res.send({ user }));
});

module.exports = router;
