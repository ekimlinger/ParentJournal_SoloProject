var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');


router.post('/login', passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    var resUser = {
        id: req.user.id,
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        children: req.user.children,
        notifications: req.user.notifications,
        datecreated: req.user.lastlogin
    };
    res.json(resUser);
});

router.post('/register', function(req,res,next){
  console.log(req.params);
  var newUser = {
    username: req.params.username,
    firstname: req.params.firstname,
    lastname: req.params.lastname,
    password: req.params.password
  };

  // Check that username/email has not been taken yet
  User.find({username: newUser.username},function(err,data){
    if (err) {
      console.log(err);
      res.send(500);
    } else{
      console.log("Data from find: ", data);
      if(!data.length){
        // If there are no users that match the username create new user
        newUser.children = [];
        newUser.notifications = [true,true];
        console.log("About to save: ", newUser);
        User.create(newUser, function(err,post){
            if(err){
              next(err);
              res.send(500);
            } else {
              res.send(200);
            }
        });
      }else{
        res.send(401);
      }
    }
  });
});


router.get("/name", function(req,res,next){

    console.log("Logged in: ", req.isAuthenticated());
    if(req.isAuthenticated()){
      var resUser = {
          id: req.user.id,
          username: req.user.username,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          children: req.user.children,
          notifications: req.user.notifications,
          datecreated: req.user.lastlogin
      };
      res.json(resUser);
    } else{
      res.send();
    }
});


module.exports = router;
