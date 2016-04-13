//EMAIL FUNCTIONS ---> sendDaily(emailAddress)
var sendDaily = require('../models/dailyEmail.js');
var sendWeekly = require('../models/weeklyEmail.js');

//MONGOOSE
var Entry = require('../models/entries.js');
var User = require("../models/user");


User.find({}, function(err,data){
  var allUsersArray = data;
  for (var i = 0; i < allUsersArray.length; i++) {
    var currentUser = allUsersArray[i];
    console.log(currentUser.id);
    Entry.find({user: currentUser.id, date: Date.now()}, function(err,data){
      if(err){
        console.log(err);
      } else{
        if(data){
          console.log("This user doesn't have an entry today: ", currentUser.username);
        } else{
          console.log("This user has an entry today: ", currentUser.username, data);
        }
      }
    });
  }

});
