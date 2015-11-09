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

                        row.createdAt = Helper.date(row.createdAt);
                        row.updatedAt = Helper.date(row.updatedAt);

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

                user.createdAt = Helper.date(user.createdAt);
                user.updatedAt = Helper.date(user.updatedAt);

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

                    Log.add(user.id, 'user.delete.destroy');

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
                user: id,
                limit: limit,
                skip: start,
                or: [
                    {id: {'contains': search.value}},
                    {name: {'contains': search.value}},
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
                    options.sort = {status: order[0].dir};
                    break;
                case '3':
                    options.sort = {bullet: order[0].dir};
                    break;
                case '4':
                    options.sort = {createdAt: order[0].dir};
                    break;
                case '5':
                    options.sort = {updatedAt: order[0].dir};
                    break;
                default :
                    options.sort = {id: 'asc'};
                    break;
            }
        }

        UserStuff.find(options)
            .populate('stuff')
            .then(function (stuffUser) {
                delete options.limit;
                delete options.skip;
                var count = UserStuff.find({user: id}),
                    filter = UserStuff.find(options).populate('stuff');
                return [stuffUser, count, filter];
            })
            .spread(function (stuffUser, count, filter) {

                var list = [];

                if (stuffUser.length) {
                    stuffUser.forEach(function (row) {

                        row.createdAt = Helper.date(row.createdAt);
                        row.updatedAt = Helper.date(row.updatedAt);

                        list.push([
                            row.id,
                            '<a href="/admin/stuff/' + row.stuff.id + '">' + row.name + '</a>',
                            row.status ? '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' : '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
                            row.bullet,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/stuff/' + row.stuff.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="javascript:;" class="js-stuffButtonRemove" data-id="' + row.id + '" data-href="/admin/user/' + id + '/stuff/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
                        ]);
                    });
                }

                Log.add(user.id, 'user.listStuff.spread');

                return res.json({
                    draw: req.param('draw'),
                    data: list,
                    recordsTotal: count.length,
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
    insertStuff: function (req, res) {
        var id = req.param('id'),
            stuffId = req.param('stuff'),
            status = req.param('status'),
            bullet = req.param('bullet');

        if (!id || !stuffId) {
            return res.badRequest('No id provided.');
        }

        Stuff.findOne(stuffId).exec(function editCB(err, stuff) {
            if (err) {
                return res.serverError(err);
            }
            else if (stuff === undefined) {
                return res.badRequest('No id provided.');
            }

            UserStuff.create({user: id, stuff: stuff.id, name: stuff.name, status: status, bullet: bullet}, function createCB(err, userStuff) {

                Log.add(user.id, 'user.insertStuff.create');

                return res.json({
                    error: err,
                    stuff: userStuff
                });
            });
        });
    },

    /**
     *
     * @param req
     * @param res
     */
    deleteStuff: function (req, res) {
        var id = req.param('id');
        var stuff = req.param('stuff');

        if (!id || !stuff) return res.badRequest('No id provided.');

        UserStuff.findOne(stuff)
            .exec(function deleteCB(err, stuffUser) {
                if (err || !stuffUser) return res.badRequest('No user');

                Log.add(user.id, 'user.deleteStuff.destroy');

                stuffUser.destroy(function (err) {
                    return res.json({
                        error: err,
                        stuff: stuffUser
                    });
                });
            });
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
                limit: limit,
                skip: start,
                or: [
                    {id: {'contains': search.value}},
                    {createdAt: {'contains': search.value}},
                    {title: {'contains': search.value}},
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
                case '3':
                    options.sort = {createdAt: order[0].dir};
                    break;
                case '4':
                    options.sort = {updatedAt: order[0].dir};
                    break;
                default :
                    options.sort = {id: 'asc'};
                    break;
            }
        }

        UserQuest.find(options)
            .populate('quest')
            .then(function (questUser) {
                delete options.limit;
                delete options.skip;
                var count = UserQuest.find(options),
                    filter = UserQuest.find(options).populate('quest');
                return [questUser, count, filter];
            })
            .spread(function (questUser, count, filter) {

                var list = [];

                if (questUser.length) {
                    questUser.forEach(function (row) {

                        row.createdAt = Helper.date(row.createdAt);
                        row.updatedAt = Helper.date(row.updatedAt);

                        list.push([
                            row.id,
                            '<a href="/admin/quest/' + row.quest.id + '">' + row.quest.title + '</a>',
                            row.quest.comment,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/quest/' + row.quest.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="javascript:;" class="js-questButtonRemove" data-id="' + row.id + '" data-href="/admin/user/' + id + '/quest/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
                        ]);
                    });
                }

                Log.add(user.id, 'user.listQuest.spread');

                return res.json({
                    draw: req.param('draw'),
                    data: list,
                    recordsTotal: count.length,
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
    insertQuest: function (req, res) {
        var id = req.param('id'),
            questId = req.param('quest');

        if (!id || !questId) {
            return res.badRequest('No id provided.');
        }

        Quest.findOne(questId).exec(function editCB(err, quest) {
            if (err) {
                return res.serverError(err);
            }
            UserQuest.create({user: id, quest: quest.id, title: quest.title}, function createCB(err, userQuest) {

                Log.add(user.id, 'user.insertQuest.create');

                res.json({
                    error: err,
                    quest: userQuest
                });
            });
        });
    },

    /**
     *
     * @param req
     * @param res
     */
    deleteQuest: function (req, res) {
        var id = req.param('id');
        var quest = req.param('quest');

        if (!id || !quest) return res.badRequest('No id provided.');

        UserQuest.findOne(quest)
            .exec(function deleteCB(err, questUser) {
                if (err || !questUser) return res.badRequest('No user');

                questUser.destroy(function (err) {

                    Log.add(user.id, 'user.deleteQuest.destroy');

                    return res.json({
                        error: err,
                        stuff: questUser
                    });
                });
            });
    }
};
