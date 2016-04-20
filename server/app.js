var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//PASSPORT
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var localStrategy = require("passport-local");

//MONGO
var mongoose = require("mongoose");
var mongoURI =
 // process.env.MONGOLAB_URI ||
 // process.env.MONGOHQ_URL ||
 'mongodb://heroku_6kldsp05:KVrXHRxYCskhDmd96CkC35aZy0M=@ds013951.mlab.com:13951/heroku_6kldsp05';
 // 'mongodb://localhost/parent_journal';

 var MongoDB = mongoose.connect(mongoURI).connection;


//MODELS
var User = require("./models/user.js");


//ROUTES
var router = require("./modules/index.js");
var register = require("./modules/register.js");
var user = require("./modules/users.js");


app.use(session({
    secret: "secret",
    key: "user",
    resave: true,
    s: false,
    cookie: {maxAge: 6000000000000000000000000000, secure: false}
}));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());


MongoDB.on("error", function(err){
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once("open", function(err){
    console.log("Mongo Connection Open");
});


//  *********** CURRENTLY UNDER MAINTENANCE ************
//  SENDS EMAIL DAILY TO ALL USERS BASED ON PREFERENCES
//  AND IF THEY HAVE POSTED TODAY OR THIS WEEK

var sendAllEmails = require("./modules/sendAllEmails.js");

// setInterval(function(){ // Set interval for checking
//     var date = new Date(); // Create a Date object to find out what time it is
//     if(date.getHours() === 21 && date.getMinutes() === 38){ // Check the time
//       sendAllEmails();
//     }
// }, 60000);
// sendAllEmails();

//PASSPORT SESSION
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });
});

passport.use("local", new localStrategy({
      passReqToCallback : true,
      usernameField: 'username'
    }, function(req, username, password, done){
        User.findOne({username: username}, function(err,user){
            if(err) throw err;
            if(!user){
              return done(null, false, {message: "Incorrect username or password"});
            }

            user.comparePassword(password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                  return done(null, user);
                } else {
                  done( null, false, {message: "Incorrect username or password"});
                }
            });
        });
    }
));


app.post("/login", passport.authenticate("local", {
    successRedirect: "/assets/views/index.html",
    failureRedirect: "/assets/views/login.html"
}));

app.use('/register', register);
app.use('/user', user);
app.use('/', router);

app.set("port",(process.env.PORT || 3000));

app.listen(app.get("port"),function(){
  console.log("Listening on port: ", app.get("port"));
});



module.exports = app;
