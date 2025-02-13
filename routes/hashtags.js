var express = require("express");
var router = express.Router();
require("../models/connection");
const Hashtags = require("../models/hashtags");

router.get("/all", (req, res) => {
  Hashtags.find()
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        res.json({ result: true, Hashtags: data });
      }

      res.json({ result: false, error: "Can't reach hashtags/all" });
    });
});

router.post("/add", (req, res) => {
  const postedHashtag = req.body.hashtag;

  Hashtags.find()
    .then((response) => response.json())
    .then((data) => {
      const isExist = data.findOne(
        (element) => element.hashtag === postedHashtag
      );
      if (isExist) {
        data
          .updateOne({ hashtag: postedHashtag }, { $inc: { counter: +1 } })
          .then((response) => response.json())
          .then((data) => {
            res.json({ result: true, hashtagUpdate: data.hashtag });
          });
      }
      res.json({ result: true });
    });
});

module.exports = router;
