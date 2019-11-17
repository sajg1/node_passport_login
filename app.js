const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
// This returns a promise so needs .then and .catch
// useNewURLParser is needed to avoid complaints in the console
mongoose.connect(db, {useNewURLParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS
//app.use must be above app.set or layouts will not work
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/index'));

//allows use of login and register route preceded by users
app.use('/users', require('./routes/users'));




const PORT  = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))