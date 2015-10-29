/**
 * Zones.js
 *
 * @description :: zones controller imported from localhost MySql server at 15/10/2015 16:17:5.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {

    index: function (req, res) {
        Zone.find().sort('createdAt DESC').exec(function indexCB(err, zones) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Zones',
                active: true
            }];

            res.view('zone/index', {
                zones: zones,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller,
                alert: req.query.alert
            });
        });
    },

    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Zones',
            link: '/admin/zone'
        }, {
            title: 'nouvelle zone',
            active: true
        }];

        res.view('zone/form', {
            action: '/admin/zone',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

    edit: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Zone.findOne(id).exec(function editCB(err, zone) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Zones',
                link: '/admin/zone'
            }, {
                title: zone.name,
                active: true
            }];

            res.view('zone/form', {
                action: '/admin/zone/' + zone.id + '/update',
                zone: zone,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        Zone.create(req.params.all(), function createCB(err, zone) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/zone');
        })
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Zone.update({id: id}, req.params.all(), function afterwards(err, zones) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/zone');
        })
    },

    delete: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Zone.findOne(id).exec(function deleteCB(err, zone) {
            if (err) {
                return res.serverError(err);
            }

            zone.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                res.redirect('/admin/zone');
            });

        });
    }

};
