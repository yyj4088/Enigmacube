module.exports = {

    /**
     *
     * @param req
     * @param res
     */
    index: function (req, res) {
        User.find().sort('createdAt DESC').exec(function indexCB(err, users) {
            if (err) return res.negotiate(err);

            var breadcrumbs = [{
                title: 'Users',
                active: true
            }];

            res.view('user/index', {
                users: users,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller,
                errors: req.flash('error'),
                infos: req.flash('info')
            });
        });
    },

    /**
     *
     * @param req
     * @param res
     */
    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Users',
            link: '/admin/user'
        }, {
            title: 'nouvelle user',
            active: true
        }];

        res.view('user/form', {
            route: '/admin/user',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller,
            errors: req.flash('error'),
            infos: req.flash('info')
        });
    },

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    edit: function (req, res) {
        var id = req.param('id');

        if (!id) return res.badRequest('No id provided.');

        User.findOne(id)
            .populate('stuffsUser')
            .populate('questsUser')
            .then(function (user) {
                var logs = Log.find({user: id}),
                    stats = Stat.find({user: id}),
                    zones = Zone.find().sort('name DESC'),
                    stuffs = Stuff.find().sort('name DESC');

                return [user, zones, stuffs, logs, stats];
            })
            .spread(function (user, zones, stuffs, logs, stats) {

                var breadcrumbs = [{
                    title: 'Users',
                    link: '/admin/user'
                }, {
                    title: user.name,
                    active: true
                }];

                res.view('user/form', {
                    route: '/admin/user/' + user.id,
                    user: user,
                    zones: zones,
                    logs: logs,
                    stats: stats,
                    stuffs: stuffs,
                    breadcrumbs: breadcrumbs,
                    controller: req.options.controller,
                    errors: req.flash('error'),
                    infos: req.flash('info')
                });
            })
            .fail(function (err) {
                return res.serverError(err);
            });
    },

    /**
     *
     * @param req
     * @param res
     */
    insert: function (req, res) {
        User.create(req.params.all(), function createCB(err, user) {
            if (err) {
                req.flash('error', 'Une erreur est survenue lors de la création de l\'utilisateur');
                return res.redirect('/admin/user');
            }

            req.flash('info', 'L\'utilisateur a bien été modifié');
            return res.redirect('/admin/user');
        })
    },

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    update: function (req, res) {
        var id = req.param('id'),
            password = req.param('password');

        if (!id) return res.badRequest('No id provided.');

        User.findOne(id)
            .exec(function deleteCB(err, user) {
                if (err) return res.badRequest('No user');

                User.update({id: id}, req.params.all(), function afterwards(err, users) {
                    if (err) {
                        req.flash('error', 'Une erreur est survenue lors de la mise à jour de l\'utilisateur');
                        return res.redirect('/admin/user');
                    }

                    if (password.length) {
                        Passport.update({user: id}, {password: password}, function afterwards(err, passports) {
                            if (err) {
                                req.flash('error', 'Une erreur est survenue lors du changement de mot de passe');
                                return res.redirect('/admin/user');
                            }

                            req.flash('info', 'Le mot de passe de l\'utilisateur a bien été modifié');
                            req.flash('info', 'L\'utilisateur a bien été modifié');
                            return res.redirect('/admin/user');
                        });
                    }
                    else {
                        req.flash('info', 'L\'utilisateur a bien été modifié');
                        return res.redirect('/admin/user');
                    }
                });
            });
    },

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    delete: function (req, res) {
        var id = req.param('id');

        if (!id) return res.badRequest('No id provided.');

        User.findOne(id)
            .exec(function deleteCB(err, user) {
                if (err) return res.badRequest('No user');

                user.destroy(function (err) {
                    if (err) {
                        req.flash('error', 'Une erreur est survenue lors de la suppression de l\'utilisateur');
                        return res.redirect('/admin/user');
                    }

                    req.flash('info', 'L\'utilisateur a bien été supprimé');
                    return res.redirect('/admin/user');
                });

            });
    }
};
