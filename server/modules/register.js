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
    console.log("About to save: ", newUser);
    User.create(newUser, function(err,post){
        if(err){
          next(err);
          res.send({error: "Something went wrong, please try again!"});
        } else {
          res.redirect("/");
        }
    });
});

module.exports = router;
