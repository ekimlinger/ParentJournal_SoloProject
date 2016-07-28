var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");
var User = require("../models/user");

router.get("/validate/:username",function(req,res, next){
  var username = req.params.username;
  console.log("Username: ", username);
  User.find({username: username},function(err,data){
    if (err) {
      console.log(err);
      res.send(500);
    } else{
      var validate;
      console.log("Data from find: ", data);
      if(!data.length){
        // If there are no users that match the user name, validate email
        validate = true;
        res.send(validate);
      }else{
        validate = false;
        res.send(validate);
      }
    }
  });
});

router.get("/", function(req,res,next){
    res.sendFile(path.resolve(__dirname, "../public/assets/views/register.html"));
});

router.post("/", function(req, res, next){
    console.log(req.body);
    var newUser = req.body;
    newUser.children = [];
    newUser.notifications = [true,true];
    console.log("About to save: ", newUser);
    User.create(newUser, function(err,post){
        if(err){
          next(err);
          res.send({error: "Something went wrong, please try again!"});
        } else {
          res.redirect("/new-user");
        }
    });
});

module.exports = router;
