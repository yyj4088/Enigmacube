module.exports = {

    login: function (req, res) {

        if (req.session.authenticated) {
            return res.redirect('/admin');
        }

        var strategies = sails.config.passport
            , providers = {};

        Object.keys(strategies).forEach(function (key) {
            if (key === 'local') {
                return;
            }

            providers[key] = {
                name: strategies[key].name
                , slug: key
            };
        });

        res.view({
            providers: providers,
            errors: req.flash('error'),
            infos: req.flash('info')
        });
    },

    logout: function (req, res) {
        req.logout();
        req.session.authenticated = false;
        req.flash('info', 'Vous avez été déconnecté');

        Log.add(user.id, 'passport.logout.success');
        res.redirect(req.query.next);
    },

    register: function (req, res) {
        res.view({
            errors: req.flash('error'),
            infos: req.flash('info')
        });
    },

    provider: function (req, res) {
        passport.endpoint(req, res);
    },

    callback: function (req, res) {
        function tryAgain(err) {

            var flashError = req.flash('error')[0];

            if (err && !flashError) {
                req.flash('error', 'Error.Passport.Generic');
            } else if (flashError) {
                req.flash('error', flashError);
            }
            req.flash('form', req.body);

            var action = req.param('action');

            switch (action) {
                case 'register':
                    res.redirect(req.query.next || '/register');
                    break;
                case 'disconnect':
                    res.redirect(req.query.next || 'back');
                    break;
                default:
                    res.redirect(req.query.next || '/login');
            }
        }

        passport.callback(req, res, function (err, user, challenges, statuses) {
            if (err || !user) {
                return tryAgain(challenges);
            }

            req.login(user, function (err) {
                if (err) {
                    return tryAgain(err);
                }

                User.update(user.id, {ip: req.ip, headers: req.headers}).exec(function afterwards(err, updated) {

                    if (err) {
                        Log.add(user.id, 'passport.callback.login.update.error');
                        return;
                    }

                    Log.add(user.id, 'passport.callback.login.update.success');

                    req.session.authenticated = true;
                    res.redirect(req.query.next || '/');
                });
            });
        });
    },

    disconnect: function (req, res) {
        passport.disconnect(req, res);
    }

};