var express = require("express");
var router = express.Router();

const uid2 = require('uid2');
const bcrypt = require("bcrypt");
require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["firstname", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({
    firstname: req.body.firstname,
    username: req.body.username,
  }).then((data) => {
    if (!data) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });
      newUser.save().then(() => {
        res.json({ result: true, user: "created" });
      });
    } else {
      res.json({ result: false, user: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({
    username: req.body.username,
  }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, user: data.token });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.get('/:token', (req,res) => {
User.findOne({token: req.params.token}).then(data => {
  if (data) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: 'Users not found' });
  }
})
})

module.exports = router;
