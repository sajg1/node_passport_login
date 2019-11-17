const express = require('express');
const router = express.Router();

// Welcome page
// changed from send to render in order to render the welcome.ejs view
router.get('/', (req, res) => res.render('welcome'));

// Dashboard Page
router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;