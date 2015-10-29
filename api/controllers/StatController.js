/**
* UsersStats.js
*
* @description :: usersStats controller imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/controllers
*/


module.exports = {

    index: function (req, res) {
        Stat.find().sort('createdAt DESC').exec(function indexCB(err, stats) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Stats',
                active: true
            }];

            res.view('stat/index', {
                stats: stats,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller,
                alert: req.query.alert
            });
        });
    },

    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Stats',
            link: '/admin/stat'
        }, {
            title: 'nouvelle stat',
            active: true
        }];

        res.view('stat/form', {
            action: '/admin/stat',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

    edit: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Stat.findOne(id).exec(function editCB(err, stat) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Stats',
                link: '/admin/stat'
            }, {
                title: stat.name,
                active: true
            }];

            res.view('stat/form', {
                action: '/admin/stat/' + stat.id + '/update',
                stat: stat,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        Stat.create(req.params.all(), function createCB(err, stat) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/stat');
        })
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Stat.update({id: id}, req.params.all(), function afterwards(err, stats) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/stat');
        })
    },

    delete: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Stat.findOne(id).exec(function deleteCB(err, stat) {
            if (err) {
                return res.serverError(err);
            }

            stat.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                res.redirect('/admin/stat');
            });

        });
    }

};
