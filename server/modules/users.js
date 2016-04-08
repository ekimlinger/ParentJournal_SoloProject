var express = require("express");
var router = express.Router();
var User = require("../models/user");
var path = require("path");



router.get("/", function(req,res,next){
    res.json(req.isAuthenticated());
});

router.get("/name", function(req,res,next){
    console.log("Logged in: ", req.isAuthenticated());
    if(req.isAuthenticated()){
      var resUser = {
          id: req.user.id,
          username: req.user.username,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          datecreated: req.user.lastlogin
      };
      res.json(resUser);
    } else{
      res.send();
    }
});

module.exports = router;
