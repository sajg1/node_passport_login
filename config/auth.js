// Passport gives a method for req.isAuthenticated
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            return next();
        }
        req.flash('error_msg', 'Please log in to view the dashboard');
        res.redirect('/users/login');
    }
};