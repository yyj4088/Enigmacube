/**
 * User.js
 *
 * @description :: articles controller imported from localhost MySql server at 15/10/2015 16:17:4.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {

    index: function (req, res) {
        User.find().sort('createdAt DESC').exec(function indexCB(err, users) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Users',
                active: true
            }];

            res.view('user/index', {
                users: users,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Users',
            link: '/admin/user'
        }, {
            title: 'nouvelle user',
            active: true
        }];

        res.view('user/form', {
            action: '/admin/user',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

    edit: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        User.findOne(id).exec(function editCB(err, user) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Users',
                link: '/admin/user'
            }, {
                title: user.name,
                active: true
            }];

            res.view('user/form', {
                action: '/admin/user/' + user.id + '/update',
                user: user,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        User.create(req.params.all(), function createCB(err, user) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/user');
        })
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        User.update({id: id}, req.params.all(), function afterwards(err, users) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/user');
        })
    },

    delete: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        User.findOne(id).exec(function deleteCB(err, user) {
            if (err) {
                return res.serverError(err);
            }

            user.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                res.redirect('/admin/user');
            });

        });
    }

};
