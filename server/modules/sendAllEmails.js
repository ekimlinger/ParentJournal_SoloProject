//EMAIL FUNCTIONS ---> sendDaily(emailAddress)
var sendDaily = require('../models/dailyEmail.js');
var sendWeekly = require('../models/weeklyEmail.js');

//MONGOOSE
var Entry = require('../models/entries.js');
var User = require("../models/user");


var moment = require('moment');

var globalDaily = [];
var globalWeekly = [];

var globalDailyInactive = [];
var globalWeeklyInactive = [];

var updateDailyEmailList = function(){
  User.find({ "notifications.0" : true }, function(err,data){
    if(err){
      console.log(err);
    }else{
      for (var i = 0; i < data.length; i++) {
        var username = data[i].username;
        globalDaily.push(username);
      }
    }
    // console.log("Daily email subscribers: ", dailyEmailList, dailyEmailList.length);
    return dailyEmailList;
  });
}

var updateWeeklyEmailList = function() {
  User.find({ "notifications.1" : true }, function(err,data){
    if(err){
      console.log(err);
    }else{
      var weeklyEmailList = [];
      for (var i = 0; i < data.length; i++) {
        var user = data[i];
        globalWeekly.push(user.username)
      }
      // console.log("Weekly email subscribers: ", weeklyEmailList);
      return weeklyEmailList;
    }
  });
}



// Checks the dailyEmailList and returns the users that haven't posted
function checkDailyEntries(){
  console.log("Daily email list ", globalDaily);
  for (var i = 0; i < globalDaily.length; i++) {
    var currentUser = globalDaily[i]
    var currentDate = new Date().toISOString().slice(0,10);
    console.log(currentDate);
    Entry.find({user: currentUser._id, date: currentDate}, function(err, data){
      if(err){
        console.log(err);
      } else{
        if(data[0] === undefined){
          if(globalDailyInactive.indexOf(currentUser.username) == -1){
            globalDailyInactive.push(currentUser.username);
          }
        }
      }
    });
    console.log("Inactive users for today: ", globalDailyInactive);
  }
}

//Checks the weeklyEmailList and returns users that haven't posted
function checkWeeklyEntries(){
  for (var i = 0; i < globalWeekly.length; i++) {
    var currentUser = globalWeekly[i];
    var currentDate = new Date().toISOString().slice(0,10);
    //need to push in last 7 days
    var datesToCheck = [];
    for (var i = 0; i < datesToCheck.length; i++) {
      Entry.find({user: currentUser._id, date: datesToCheck[i]}, function(err, data){
        if(err){
          console.log(err);
        } else{
          if(data[0] === undefined){
            if(globalWeeklyInactive.indexOf(currentUser.username) == -1){
              globalWeeklyInactive.push(currentUser.username)
            }
          }
        }
      });
    }
  }
  console.log("Inactive users for this week: ", globalWeeklyInactive);
}




//Check for subscription changes daily
setInterval(function(){
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 17 && date.getMinutes() === 10){ // Check the time
      updateDailyEmailList();
      updateWeeklyEmailList();
    }
}, 60000);

//Check for subscription changes daily
setInterval(function(){
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 23 && date.getMinutes() === 55){ // Check the time
      checkDailyEntries();
      checkWeeklyEntries();
    }
}, 30000);


function sendAllEmails(){
  sendDaily(globalDaily);
  sendWeekly(globalWeekly);
}

module.exports = sendAllEmails;
