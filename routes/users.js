const express = require('express');
const router = express.Router();

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req,res) => res.render('register'));

// Register Handle (handles posting of form in register.ejs to /users/register)
router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('hello');
});

module.exports = router;