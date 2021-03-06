var express = require('express');
var path = require('path')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');
var bcrypt = require('bcrypt')

const PORT = process.env.PORT || 3000;

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      bcrypt.compare(password, user.password, function(err, res) {
        if (err) return cb(err);
        if (res === false) {
          return cb(null, false);
        } else {
          return cb(null, user);
        }
      });
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+'/static/'));

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    console.log("HIT2")
    res.sendFile(__dirname+'/static/view.html')
  });

app.get('/*',
  function(req, res){
    if(req.isAuthenticated()){
      res.redirect("/dashboard")
    }else{
      res.sendFile(__dirname+'/static/view.html')
    }
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log("HIT 1")
    res.redirect('/dashboard');
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
});
