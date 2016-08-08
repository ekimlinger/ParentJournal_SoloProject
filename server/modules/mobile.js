var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var User = require('../models/user');


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

  console.log(req.body);
  var newUser = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };

  // Check that username/email has not been taken yet
  User.find({username: newUser.username},function(err,data){
    if (err) {
      console.log(err);
      res.status(500).send();
    } else{

      if(!data.length){
        // If there are no users that match the username create new user
        newUser.children = [];
        newUser.notifications = [true,true];

        User.create(newUser, function(err,post){
            if(err){
              next(err);
              res.status(500).send();
            } else {
              res.status(200).send();
            }
        });
      }else{
        res.status(401).send();
      }
    }
  });
});


router.get("/name", function(req,res,next){

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
      res.status(401).send());
    }
});


module.exports = router;
