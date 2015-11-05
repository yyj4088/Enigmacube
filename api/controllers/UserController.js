module.exports = {

    /**
     *
     * @param req
     * @param res
     */
    index: function (req, res) {
        var breadcrumbs = [{
            title: 'Users',
            active: true
        }];

        res.view('user/index', {
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
     */
    list: function (req, res) {

        var search = req.param('search'),
            order = req.param('order'),
            start = req.param('start'),
            limit = req.param('limit'),
            page = start / limit + 1,
            options = {
                sort: {id: 'desc'},
                or: [
                    {id: {'contains': search.value}},
                    {username: {'contains': search.value}},
                    {email: {'contains': search.value}},
                    {level: {'contains': search.value}},
                    {createdAt: {'contains': search.value}},
                    {updatedAt: {'contains': search.value}}
                ]
            };

        if (order[0].column) {
            switch (order[0].column) {
                case '0':
                    options.sort = {id: order[0].dir};
                    break;
                case '1':
                    options.sort = {username: order[0].dir};
                    break;
                case '2':
                    options.sort = {email: order[0].dir};
                    break;
                case '3':
                    options.sort = {level: order[0].dir};
                    break;
                case '4':
                    options.sort = {createdAt: order[0].dir};
                    break;
                case '5':
                    options.sort = {updatedAt: order[0].dir};
                    break;
            }
        }

        User.find(options)
            .paginate({page: page, limit: limit})
            .then(function (rows) {
                var count = User.count(),
                    filter = User.find(options);
                return [rows, count, filter];
            })
            .spread(function (rows, count, filter) {

                var list = [];

                if (rows.length) {
                    rows.forEach(function (row) {
                        list.push([
                            row.id,
                            '<a href="/admin/user/' + row.id + '">' + row.username + '</a>',
                            row.email,
                            row.level,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/user/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/user/' + row.id + '/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
                        ]);
                    });
                }

                res.json({
                    draw: req.param('draw'),
                    data: list,
                    recordsTotal: count,
                    recordsFiltered: filter.length
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
            .then(function (user) {
                var logs = Log.find({user: id}).populate('user'),
                    stats = Stat.find({user: id}).populate('user'),
                    zones = Zone.find().sort('name DESC'),
                    stuffs = Stuff.find().sort('name DESC'),
                    quests = Quest.find().sort('title DESC');

                return [user, zones, quests, stuffs, logs, stats];
            })
            .spread(function (user, zones, quests, stuffs, logs, stats) {

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
                    quests: quests,
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
        });
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
    },

    /**
     *
     * @param req
     * @param res
     */
    listStuff: function (req, res) {

        var id = req.param('id'),
            search = req.param('search'),
            order = req.param('order'),
            start = req.param('start'),
            limit = req.param('limit'),
            options = {
                sort: {id: 'desc'},
                limit: limit,
                skip: start,
                or: [
                    {id: {'contains': search.value}},
                    {name: {'contains': search.value}},
                    {comment: {'contains': search.value}},
                    {createdAt: {'contains': search.value}},
                    {updatedAt: {'contains': search.value}}
                ]
            };

        if (order[0].column) {
            switch (order[0].column) {
                case '0':
                    options.sort = {id: order[0].dir};
                    break;
                case '1':
                    options.sort = {name: order[0].dir};
                    break;
                case '2':
                    options.sort = {comment: order[0].dir};
                    break;
                case '3':
                    options.sort = {createdAt: order[0].dir};
                    break;
                case '4':
                    options.sort = {updatedAt: order[0].dir};
                    break;
            }
        }

        User.findOne(id)
            .populate('stuffsUser', options)
            .then(function (user) {
                delete options.limit;
                delete options.skip;
                var count = User.findOne(id).populate('stuffsUser'),
                    filter = User.findOne(id).populate('stuffsUser', options);
                return [user, count, filter];
            })
            .spread(function (user, count, filter) {

                var list = [];

                if (user.stuffsUser.length) {
                    user.stuffsUser.forEach(function (row) {
                        list.push([
                            row.id,
                            '<a href="/admin/stuff/' + row.id + '">' + row.name + '</a>',
                            row.comment,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/stuff/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/user/' + row.id + '/stuff/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
                        ]);
                    });
                }

                res.json({
                    draw: req.param('draw'),
                    data: list,
                    recordsTotal: count.stuffsUser.length,
                    recordsFiltered: filter.stuffsUser.length
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
    insertStuff: function (req, res) {
    },

    /**
     *
     * @param req
     * @param res
     */
    deleteStuff: function (req, res) {
    },

    /**
     *
     * @param req
     * @param res
     */
    listQuest: function (req, res) {

        var id = req.param('id'),
            search = req.param('search'),
            order = req.param('order'),
            start = req.param('start'),
            limit = req.param('limit'),
            options = {
                sort: {id: 'desc'},
                limit: limit,
                skip: start,
                or: [
                    {id: {'contains': search.value}},
                    {title: {'contains': search.value}},
                    {comment: {'contains': search.value}},
                    {createdAt: {'contains': search.value}},
                    {updatedAt: {'contains': search.value}}
                ]
            };

        if (order[0].column) {
            switch (order[0].column) {
                case '0':
                    options.sort = {id: order[0].dir};
                    break;
                case '1':
                    options.sort = {title: order[0].dir};
                    break;
                case '2':
                    options.sort = {comment: order[0].dir};
                    break;
                case '3':
                    options.sort = {createdAt: order[0].dir};
                    break;
                case '4':
                    options.sort = {updatedAt: order[0].dir};
                    break;
            }
        }

        User.findOne(id)
            .populate('questsUser', options)
            .then(function (user) {
                delete options.limit;
                delete options.skip;
                var count = User.findOne(id).populate('questsUser'),
                    filter = User.findOne(id).populate('questsUser', options);
                return [user, count, filter];
            })
            .spread(function (user, count, filter) {

                var list = [];

                if (user.questsUser.length) {
                    user.questsUser.forEach(function (row) {
                        list.push([
                            row.id,
                            '<a href="/admin/quest/' + row.id + '">' + row.title + '</a>',
                            row.comment,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/quest/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/user/' + row.id + '/quest/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
                        ]);
                    });
                }

                res.json({
                    draw: req.param('draw'),
                    data: list,
                    recordsTotal: count.questsUser.length,
                    recordsFiltered: filter.questsUser.length
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
    insertQuest: function (req, res) {
    },

    /**
     *
     * @param req
     * @param res
     */
    deleteQuest: function (req, res) {
    }
};
