const express = require('express');
const router = express.Router();

// changed from send to render in order to render the welcome.ejs view
router.get('/', (req, res) => res.render('welcome'));
module.exports = router;