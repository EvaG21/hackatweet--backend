var express = require("express");
var router = express.Router();
require("../models/connection");
const Hashtags = require("../models/hashtags");

router.get("/all", (req, res) => {
  Hashtags.find().then((data) => {
    if (data) {
      res.json({ result: true, hashtags: data });
      return;
    }
    res.json({ result: false, error: "Can't reach hashtags/all" });
    return;
  });
});

router.post("/add", (req, res) => {
  const postedHashtag = req.body.hashtag;

    Hashtags.findOne({ hashtag: postedHashtag }).then((data) => {
      if (data) {
        Hashtags.updateOne({ hashtag: postedHashtag }, { $inc: {'counter': 1}  })
          .then((data) => {
            res.json({
              result: true,
              hashtagUpdate:
                "Hashtag updated"
            });
            return;
          });
      } else {
        const newHashtag = new Hashtags({
          hashtag: postedHashtag,
          counter: 1,
        });

        newHashtag.save().then((data) => {
          res.json({
            result: true,
            statut: "New hashtag created : " + data.hashtag,
          });
          return;
        });
      }
    });
  });
  

module.exports = router;
