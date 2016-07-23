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
        var user = data[i];
        globalDaily.push(user);
      }
    }
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
        globalWeekly.push(user)
      }
    }
  });
}


// Runs through email list to perform check
function checkDailyEntries(){
  globalDailyInactive = [];
  console.log("Daily email list length", globalDaily.length);
  globalDaily.forEach(checkDailyUser);
}

// Checks user's entries individually and adds to list if they haven't made any
function checkDailyUser(user){
  var date = new Date().toISOString().slice(0,10);
  Entry.find({user: user._id, date: date}, function(err, data){
    if(err){
      console.log(err);
    } else{
      if(data.length === 0){
        globalDailyInactive.push(user.username);
      }
    }
  });
}

// Runs through email list to perform check
function checkWeeklyEntries(){
  globalWeeklyInactive = [];
  console.log("Weekly email list length", globalWeekly.length);
  globalWeekly.forEach(checkWeeklyUser);
}

// Checks user's entries individually and adds to list if they haven't made any
function checkWeeklyUser(user){
  var last7dates = [];
  for (var i = 0; i < 7; i++) {
    last7dates.push(moment().subtract(i,"days").format("YYYY-MM-DD"))
  }
  Entry.find({user: user._id, date: {$in: last7dates}}, function(err, data){
    if(err){
      console.log(err);
    } else{
      console.log("Data length from user search: ", data.length, user.username);
      if(data.length === 0){
        globalWeeklyInactive.push(user.username);
        console.log("Pushing weekly inactive users: ", globalWeeklyInactive);
      }
    }
  });
}

//Initiate email lists from db
updateDailyEmailList();
updateWeeklyEmailList();

//Check for subscription changes daily
setInterval(function(){
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 19 && date.getMinutes() === 58){ // Check the time
      updateDailyEmailList();
      if(moment().weekday() == 7){
        updateWeeklyEmailList();
      }
    }
    // console.log("daily email list: ", globalDaily);
}, 60000);

//Checks if subscribed users have made entires daily
setInterval(function(){
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 19 && date.getMinutes() === 59){ // Check the time
      checkDailyEntries();
      if(moment().weekday() == 7){
        checkWeeklyEntries();
      }
    }
}, 60000);

//
setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 20 && date.getMinutes() === 00){ // Check the time
      sendAllEmails();
    }
}, 60000);
// sendAllEmails();


function sendAllEmails(){
  if(moment().weekday() == 7){
    // Remove users from daily that are in weekly (no duplicate emails being sent)
    for (var i = 0; i < globalWeeklyInactive.length; i++) {
      var username = globalWeeklyInactive[i];
      for (var j = 0; j < globalDailyInactive.length; i++) {
        if(username == globalDailyInactive[j]){
          globalDailyInactive.slice(j,1);
        }
      }
    }
    sendWeekly(globalWeeklyInactive);
  } else{
    sendDaily(globalDailyInactive);
  }
}


module.exports = sendAllEmails;
