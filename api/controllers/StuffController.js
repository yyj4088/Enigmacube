module.exports = {

    index: function (req, res) {
        Stuff.find().sort('createdAt DESC').exec(function indexCB(err, stuffs) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Stuffs',
                active: true
            }];

            res.view('stuff/index', {
                stuffs: stuffs,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller,
                alert: req.query.alert
            });
        });
    },

    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Stuffs',
            link: '/admin/stuff'
        }, {
            title: 'nouvelle stuff',
            active: true
        }];

        res.view('stuff/form', {
            action: '/admin/stuff',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

    edit: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Stuff.findOne(id).exec(function editCB(err, stuff) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Stuffs',
                link: '/admin/stuff'
            }, {
                title: stuff.name,
                active: true
            }];

            res.view('stuff/form', {
                action: '/admin/stuff/' + stuff.id + '/update',
                stuff: stuff,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        Stuff.create(req.params.all(), function createCB(err, stuff) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/stuff');
        })
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Stuff.update({id: id}, req.params.all(), function afterwards(err, stuffs) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/stuff');
        })
    },

    delete: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Stuff.findOne(id).exec(function deleteCB(err, stuff) {
            if (err) {
                return res.serverError(err);
            }

            stuff.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                res.redirect('/admin/stuff');
            });

        });
    }

};
