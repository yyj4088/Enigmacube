module.exports = {

    index: function (req, res) {
        Log.find()
            .populate('user')
            .sort('createdAt DESC')
            .exec(function indexCB(err, logs) {
                if (err) {
                    return res.serverError(err);
                }

                var breadcrumbs = [{
                    title: 'Logs',
                    active: true
                }];

                res.view('log/index', {
                    logs: logs,
                    breadcrumbs: breadcrumbs,
                    controller: req.options.controller,
                    alert: req.query.alert
                });
            });
    },

    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Logs',
            link: '/admin/log'
        }, {
            title: 'nouvelle log',
            active: true
        }];

        res.view('log/form', {
            action: '/admin/log',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

    edit: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Log.findOne(id).exec(function editCB(err, log) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Logs',
                link: '/admin/log'
            }, {
                title: log.name,
                active: true
            }];

            res.view('log/form', {
                action: '/admin/log/' + log.id + '/update',
                log: log,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        Log.create(req.params.all(), function createCB(err, log) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/log');
        })
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Log.update({id: id}, req.params.all(), function afterwards(err, logs) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/log');
        })
    },

    delete: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Log.findOne(id).exec(function deleteCB(err, log) {
            if (err) {
                return res.serverError(err);
            }

            log.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                res.redirect('/admin/log');
            });

        });
    }
};
