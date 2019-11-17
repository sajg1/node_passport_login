const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport Config
// this line allows us to require the config file and pass it the parameter, passport.
// ...so no need to require it in passport.js
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
// This returns a promise so needs .then and .catch
// useNewURLParser is needed to avoid complaints in the console
mongoose.connect(db, {useNewURLParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS Middleware
//app.use must be above app.set or layouts will not work
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser Middleware(now incl in express) can get data from our form using req.body
app.use(express.urlencoded({ extended: false}));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

// Passport Middleware
// must be after express sessions
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware (gives us access to req.flash)
app.use(flash());

// Global Variables
// creating own middleware
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'));

//allows use of login and register route preceded by users
app.use('/users', require('./routes/users'));




const PORT  = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))