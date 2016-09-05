//sendMail("parentjournals@gmail.com");
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var pjAuthJSON = require('./client_id.json');
var pjAuth = pjAuthJSON["web"];


// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
// generator.on('token', function(token){
//     console.log('New token for %s: %s', token.user, token.accessToken);
// });

// Old transporter
// var transporter = nodemailer.createTransport('smtps://parentjournals%40gmail.com:password@smtp.gmail.com');
// login
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'parentjournals@gmail.com',
            clientId: pjAuth['client_id'],
            clientSecret: pjAuth['client_secret'],
            refreshToken: pjAuth['refresh_token'],
            accessToken: pjAuth['access_token']
        })
    }
});



var emailString = '<body> <div class="allContents"> <h1>Daily Reminder!</h1> <div class="content"> <p> It looks like you haven\'t made any journal entries for today! <br><br>You can update your journal entries by logging in using the button below, and clicking the “Add” button on your homepage! <br><br>If you no longer wish to receive these emails, you can update your preferences by going to: <br><br>Home —&gt; Settings —&gt; Notifications </p></div><div="footer"> <button class="link"> <a href="http://parentjournal.herokuapp.com">Parent Journal</a> </button> </div> </div><style>body{font-family: Arial; color: white; margin: 0;}.allContents{background: #f5f6d4;}h1{background: #85DB18; background: linear-gradient(#85DB18, #009626); color: #white; font-size: 40px; text-align: center; padding: 25px; margin: 0;}.content{width: 80%; background-color: #ffffff; color: black; border-radius: 3px; box-shadow: 4px 4px black; margin: 20px auto; padding: 10px 30px;}.footer{background: #aaa; width: auto; text-align: center; padding: 20px auto;}.link{font-size: 30px; border: none; outline: none; padding: 5px 10px; border-radius: 3px; background: rgb(255,87,34); color: #ffffff;}.link a{color: black; text-decoration: none;}</style> </body>' ;


// setup e-mail data with unicode symbols
var dailyEmail = function(username){
    return{
            from: '"Parent Journal 👥" <parentjournals@gmail.com>', // sender address
            to: username, // list of receivers
            subject: 'Daily Reminder! ✔', // Subject line
            // text: 'Hello world 🐴', // plaintext body
            html: emailString // html body
          }
};

// Function to send emails to users that have not posted today
var sendDaily = function(usernameList){
  if (usernameList.length > 0){
    console.log("Sending daily emails to: ", usernameList);
    for (var i = 0; i < usernameList.length; i++) {
      var username = usernameList[i];
      // Check if user's email is valid
      if(validateEmail(username)){
        transporter.sendMail(dailyEmail(username), function(error, info){
          if(error){
              return console.log(error);
          } else{
            console.log('Message sent: ' + info.response);
          }
        });
      } else{
        console.log("This user's email address is invalid (daily): ", username);
      }
    }
  }else{
    console.log("No inactive users today!");
  }
};

//Validates the email address that user has provided
function validateEmail(email) {
  // email.slice(0);
  // email.slice(email.length-1);
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

transporter.sendMail(dailyEmail("ekimlinger@gmail.com"), function(error, info){
  if(error){
      return console.log(error);
  } else{
    console.log('Message sent: ' + info.response);
  }
});

module.exports = sendDaily;
