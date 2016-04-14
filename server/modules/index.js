var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Entry = require('../models/entries.js');


router.post("/entries", function(req, res, next) {
  var entry = new Entry({
    user: req.body.userID,
    child: req.body.child,
    rating: req.body.rating,
    phrases: req.body.phrases,
    things: req.body.things,
    journal: req.body.journal,
    notes: req.body.notes,
    accomplishments: req.body.accomplishments,
    date: req.body.date
  });

  entry.save(function(err, entry) {
    if (err) {
      console.log(err);
    }
    res.send(entry);
  });
});


////
//  GET ENTRIES BY REQ.USER._ID INSTEAD OF PARAMS!!!!!
///
router.get("/entries/:date", function(req, res, next) {

  if (req.isAuthenticated()) {
    var userID = req.user._id;
    var reqDate = req.params.date;
    Entry.find({
      user: userID,
      date: reqDate
    }, function(err, data) {
      if (err) {
        console.log(err);
        res.send();
      } else {
        res.send(data);
      }
    });
  } else{
    res.send();
  }
});

router.put("/entries/:entryID", function(req, res, next) {
  var entryID = req.params.entryID;
  var updatedEntry = req.body;
  console.log(updatedEntry);

  Entry.update({
    _id: entryID
  }, updatedEntry, function(err, data) {
    if (err) {
      console.log(err);
      res.send();
    } else {
      res.send("Hey this got sent and returned!");
    }
  });
});

router.delete("/entries/:entryID", function(req, res, next) {

  if (req.isAuthenticated()) {
    console.log("Hey I'm here and I got your request for entries!", req.params);
    var entryID = req.params.entryID;
    Entry.findOneAndRemove({
      _id: entryID
    }, function(err, data) {
      if (err) {
        console.log(err);
        res.send();
      } else {
        res.send(data);
      }
    });

  } else {
    console.log("Trying to delete entries but you're not logged in!");
    res.send();
  }

});


router.get("/logout", function(req, res) {
  req.logout();
  res.redirect('/');
});


router.get("/*", function(req, res) {
  if (req.isAuthenticated()) {
    var file = req.params[0] || "assets/views/index.html";
  } else {
    var file = req.params[0] || "assets/views/login.html";
  }
  res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
