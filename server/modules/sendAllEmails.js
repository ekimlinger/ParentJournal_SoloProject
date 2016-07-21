//EMAIL FUNCTIONS ---> sendDaily(emailAddress)
var sendDaily = require('../models/dailyEmail.js');
var sendWeekly = require('../models/weeklyEmail.js');

//MONGOOSE
var Entry = require('../models/entries.js');
var User = require("../models/user");


User.find({ "notifications.0" : true }, function(err,data){
  if(err){
    console.log(err);
  }else{
    var dailyEmailList = data;
    // console.log(dailyEmailList);
    // dailyEmailList.forEach(checkDailyEntries);
  }
});
User.find({ "notifications.1" : true }, function(err,data){
  if(err){
    console.log(err);
  }else{
    var weeklyEmailList = data;
    // console.log(weeklyEmailList);
    // weeklyEmailList.forEach();
  }
});



// WORKING ON THIS

// function checkDailyEntries(user, index){
//   var currentUser = user;
//   console.log(currentUser._id);
//   Entry.find({user: currentUser._id, date: Date.now()}, function(err, data){
//     if(err){
//       console.log(err);
//     } else{
//       console.log("Data from Entry find:", data);
//       if(data === "[]"){
//         console.log("This user has no entries today: ", currentUser.username);
//       } else{
//         console.log("This user has made an entry today: ", currentUser.username, data);
//       }
//     }
//   });
// }

// //Get users that need dailyEmails store users in array
// //Get users that need weeklyEmails store users in array
//
// //Find users that haven't posted an entry today
// //Find users that haven't posted an entry this week
//
// //Find
//
//
function sendAllEmails(){
  sendDaily("ekimlinger@gmail.com");
  sendWeekly("ekimlinger@gmail.com");
}

module.exports = sendAllEmails;
