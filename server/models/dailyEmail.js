//sendMail("parentjournals@gmail.com");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://parentjournals%40gmail.com:seven89Ten@smtp.gmail.com');


var emailString = '<body> <div class="allContents"> <h1>Daily Reminder!</h1> <div class="content"> <p> It looks like you haven\'t made any journal entries for today! <br><br>You can update your journal entries by logging in using the button below, and clicking the “Add” button on your homepage! <br><br>If you no longer wish to receive these emails, you can update your preferences by going to: <br><br>Home —&gt; Settings —&gt; Notifications </p></div><h1> <button class="link"> <a href="http://localhost:3000">Parent Journal</a> </button> </h1> </div><style>body{font-family: Arial; color: white; margin: 0;}.allContents{background: #787878;}h1{background-color: #2E2E2E; color: #ddd; font-size: 40px; text-align: center; padding: 25px; margin: 0;}.content{width: 80%; background-color: #444444; border-radius: 3px; box-shadow: 4px 4px black; margin: 20px auto; padding: 10px 30px;}.link{font-size: 30px; border: none; outline: none; padding: 5px 10px; border-radius: 3px; background: rgb(76,175,80);}.link a{color: black; text-decoration: none;}</style> </body>' ;


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

var sendDaily = function(username){
  transporter.sendMail(dailyEmail(username), function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}

module.exports = sendDaily;
