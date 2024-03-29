module.exports = {

    index: function (req, res) {
        var breadcrumbs = [{
            title: 'Logs',
            active: true
        }];

        res.view('log/index', {
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
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
            sort = {id: 'desc'},
            options = {
                or: [
                    {id: {'contains': search.value}},
                    {title: {'contains': search.value}},
                    {createdAt: {'contains': search.value}},
                    {updatedAt: {'contains': search.value}}
                ]
            };

        if (order[0].column) {
            switch (order[0].column) {
                case '0':
                    sort = {id: order[0].dir};
                    break;
                case '1':
                    sort = {title: order[0].dir};
                    break;
                case '3':
                    sort = {createdAt: order[0].dir};
                    break;
                case '4':
                    sort = {updatedAt: order[0].dir};
                    break;
            }
        }

        Log.find(options)
            .paginate({page: page, limit: limit})
            .sort(sort)
            .then(function (rows) {
                var count = Log.count(),
                    filter = Log.count(options);
                return [rows, count, filter];
            })
            .spread(function (rows, count, filter) {

                var list = [];

                if (rows.length) {
                    rows.forEach(function (row) {
                        list.push([
                            row.id,
                            '<a href="/admin/log/' + row.id + '">' + row.title + '</a>',
                            row.username,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/log/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/log/' + row.id + '/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
                        ]);
                    });
                }

                res.json({
                    draw: req.param('draw'),
                    data: list,
                    recordsTotal: count,
                    recordsFiltered: filter
                });
            })
            .fail(function (err) {
                return res.serverError(err);
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
