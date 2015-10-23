/**
 * Map.js
 *
 * @description :: map controller imported from localhost MySql server at 15/10/2015 16:17:4.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {

    index: function (req, res) {
        Map.find().sort('createdAt DESC').exec(function indexCB(err, maps) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Maps',
                active: true
            }];

            res.view('map/index', {
                maps: maps,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Maps',
            link: '/admin/map'
        }, {
            title: 'nouvelle map',
            active: true
        }];

        res.view('map/form', {
            action: '/admin/map',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

    edit: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Map.findOne(id).exec(function editCB(err, map) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Maps',
                link: '/admin/map'
            }, {
                title: map.name,
                active: true
            }];

            res.view('map/form', {
                action: '/admin/map/' + map.id + '/update',
                map: map,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        Map.create(req.params.all(), function createCB(err, map) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/map');
        })
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Map.update({id: id}, req.params.all(), function afterwards(err, maps) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/map');
        })
    },

    delete: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Map.findOne(id).exec(function deleteCB(err, map) {
            if (err) {
                return res.serverError(err);
            }

            map.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                res.redirect('/admin/map');
            });

        });
    }

};
