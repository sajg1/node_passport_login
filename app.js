const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

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