var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");
var User = require("../models/user");

router.get("/", function(req,res,next){
    res.sendFile(path.resolve(__dirname, "../public/assets/views/register.html"));
});

router.post("/", function(req, res, next){
    var newUser = req.body;
    newUser.children = [];
    newUser.notifications = [true,true];
    console.log("Made it up here! Saved : ", newUser);
    User.create(req.body, function(err,post){
        if(err){
          next(err);
        } else {
          res.redirect("/");
        }
    });
});

module.exports = router;
