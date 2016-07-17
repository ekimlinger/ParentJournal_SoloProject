var express = require("express");
var router = express.Router();
var User = require("../models/user");
var path = require("path");



router.get("/", function(req,res,next){
    res.json(req.isAuthenticated());
});

router.post("/addChild",function(req,res,next){
  var newChild = req.body;
  console.log("Adding Child", newChild ,", logged in: ", req.isAuthenticated());
  if(req.isAuthenticated()){
    console.log(req.user._id);
    User.update({_id: req.user._id},
      { $push: {children: newChild}
    }, function(err){
      if(err){
        console.log(err);
      }
    });
    res.send(newChild);
  }else{
    res.send(newChild);
  }
});

router.put("/notifications", function(req,res,next){
  var emails = req.body;
  if(req.isAuthenticated()){
    console.log("reqIsAuth, updating email list: ", emails);
    console.log(req.id);
    User.update({_id: req.user.id},
      { notifications : emails}, function(err){
      if(err){
        console.log(err);
      }
    });
    res.send(emails);
  }else{
    res.send("Not logged in, failed to update notifications");
  }
});
router.put("/email", function(req,res,next){
  if(req.isAuthenticated()){
    var emailAddress = req.body.new1;
    console.log("reqIsAuth, updating email list: ", emailAddress);
    User.update({id: req.user.id},
      { username : emailAddress}, function(err){
      if(err){
        console.log(err);
      }
    });
    res.send(emailAddress);
  }else{
    res.send("Not logged in, failed to update email address");
  }
});

router.delete("/deleteChild/:childID",function(req,res,next){
  if(req.isAuthenticated()){
    var childID = parseInt(req.params.childID);
    var userID = req.user.username;
    console.log("childID: ", childID);

    var reqDate = req.params.date;
    User.find({username: userID}, function(err,data){
      if(err){
        console.log(err);
        res.send();
      } else{
        var childArray = data[0].children;
        console.log("Array before splice: ", childArray);
        childArray.splice(childID, 1);
        console.log("Array after splice: ", childArray);
        User.update(
          {username: userID},
          {children: childArray}, function(err){
            if(err){
              console.log(err);
            } else{
              res.send("You successfully removed a child! :(");
            }
        });
      }
    });

  } else{
    console.log("Trying to delete entries but you're not logged in!");
    res.send();
  }

});

router.get("/name", function(req,res,next){
    console.log("Logged in: ", req.isAuthenticated());
    if(req.isAuthenticated()){
      var resUser = {
          id: req.user.id,
          username: req.user.username,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          children:
          req.user.children,
          password: req.user.password,
          notifications: req.user.notifications,
          datecreated: req.user.lastlogin
      };
      res.json(resUser);
    } else{
      res.send();
    }
});

module.exports = router;
