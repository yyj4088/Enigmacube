module.exports = function (req, res, next) {
    if (req.session.authenticated) {
        return next();
    }

    req.flash('info', 'Vous avez été déconnecté');
    return res.redirect('/');
};
