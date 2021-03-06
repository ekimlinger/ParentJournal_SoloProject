var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');

//PASSPORT
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var localStrategy = require("passport-local");

//MONGO
var mongoose = require("mongoose");
var mongoURI =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    // 'mongodb://127.0.0.1:27017/parent_journal' ||
    'mongodb://heroku_6kldsp05:lfkfhr248c2uuuds2dnsprqp6s@ds013951.mlab.com:13951/heroku_6kldsp05';

var MongoDB = mongoose.connect(mongoURI).connection;


//MODELS
var User = require("./models/user.js");


//ROUTES
var router = require("./modules/index.js");
var register = require("./modules/register.js");
var user = require("./modules/users.js");
var mobile = require("./modules/mobile.js");


app.use(session({
    secret: "secret",
    key: "user",
    resave: true,
    saveUninitialized: true,
    s: false,
    cookie: {
        maxAge: 6000000000000000000000000000,
        secure: false
    }
}));


app.use(cookieParser());

app.use(express.static(__dirname + '/'));
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());


MongoDB.on("error", function(err) {
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once("open", function(err) {
    console.log("Mongo Connection Open on: ", mongoURI);
});


//PASSPORT SESSION
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) done(err);
        done(null, user);
    });
});

passport.use("local", new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
}, function(req, username, password, done) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            return done(null, false, {
                message: "Incorrect username or password"
            });
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                done(null, false, {
                    message: "Incorrect username or password"
                });
            }
        });
    });
}));


//  *********** CURRENTLY UNDER MAINTENANCE ************
//  SENDS EMAIL DAILY TO ALL USERS BASED ON PREFERENCES
//  AND IF THEY HAVE POSTED TODAY OR THIS WEEK

var sendAllEmails = require("./modules/sendAllEmails.js");


// Routers
app.post("/login", passport.authenticate("local", {
    successRedirect: "/assets/views/index.html",
    failureRedirect: "/assets/views/failed-login.html"
}));

app.use('/mobile', mobile);
app.use('/register', register);
app.use('/user', user);
app.use('/', router);

app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function() {
    console.log("Listening on port: ", app.get("port"));
});



module.exports = app;
