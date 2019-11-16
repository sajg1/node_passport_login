const express = require('express');

const app = express();

//Routes

//Index
app.use('/', require('./routes/index'));

//Users - allows use of login and register route preceded by users
app.use('/users', require('./routes/users'));




const PORT  = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))