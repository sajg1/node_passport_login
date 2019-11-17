const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req,res) => res.render('register'));

// Register Handle (handles posting of form in register.ejs to /users/register)
router.post('/register', (req, res) => {
    // used to pull elements out of req.body
    const { name, email, password, password2 } = req.body;
    let errors = [];
    // Check all fields are required, otherwise send message
    if (!name || !email || !password || !password2) {
        errors.push({msg : 'Please fill in all fields'})
    }
    // Check passwords match
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'})
    }
    // Check password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'})
    }
    // If any errors are pushed, I want to re-render the register form
    // When rendering with a template it is possible to pass in values like below
    if (errors.length > 0 ) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation is passed

        // returns a promise and can now access user details
        User.findOne({ email: email})
        .then (user => {
            if(user) {
                // User already exists
                errors.push({ msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw error;
                        // Set password to the hash
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can login')
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    }))
            } 
        });
    }
});

// Login Handle
// failureFlash message will be from whichever of the passport.js localstrategy errors.
// A global variable for 'error' is setup in app.js and added to partial/mesaages.
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
})

module.exports = router;