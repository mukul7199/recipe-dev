const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then(users => res.send({ users }))
    .catch(e => console.log(e));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      console.log(user);
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          jwt.sign(user.toJSON(), "secret", (err, token) => {
            res.send({ token });
            console.log(token);
          });
        } else {
          res.status(401).json({ message: "Passwords dont match" });
        }
      });
    })
    .catch(e => res.send({ message: "user not found" }));
});

router.post("/signup", (req, res) => {
  let { email, username, password } = req.body;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      password = hash;
      console.log(hash);
      const newUser = new User({
        email,
        username,
        password
      });
      newUser
        .save()
        .then(user => res.send({ user }))
        .catch(e => console.log(e));
    });
  });
});

module.exports = router;
