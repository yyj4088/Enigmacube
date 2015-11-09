module.exports = {

    /**
     *
     * @param req
     * @param res
     */
    index: function (req, res) {
        var breadcrumbs = [{
            title: 'Logs',
            active: true
        }];

        return res.view('log/index', {
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

        var id = req.param('id'),
            search = req.param('search'),
            order = req.param('order'),
            start = req.param('start'),
            limit = req.param('limit'),
            page = start / limit + 1,
            options = {
                sort: {id: 'asc'},
                or: [
                    {id: {'contains': search.value}},
                    {title: {'contains': search.value}},
                    {createdAt: {'contains': search.value}},
                    {updatedAt: {'contains': search.value}}
                ]
            };

        if (id) options.user = id;

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
            }
        }

        Log.find(options)
            .populate('user')
            .paginate({page: page, limit: limit})
            .then(function (rows) {
                var count = Log.count(),
                    filter = Log.count(options);
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
                            '<a href="/admin/log/' + row.id + '">' + row.title + '</a>',
                            row.user.username,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/log/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/log/' + row.id + '/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
                        ]);
                    });
                }

                return res.json({
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

    /**
     *
     * @param req
     * @param res
     */
    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Logs',
            link: '/admin/log'
        }, {
            title: 'nouvelle log',
            active: true
        }];

        return res.view('log/form', {
            action: '/admin/log',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
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

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Log.findOne(id)
            .exec(function editCB(err, log) {
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

                log.createdAt = Helper.date(log.createdAt);
                log.updatedAt = Helper.date(log.updatedAt);

                return res.view('log/form', {
                    action: '/admin/log/' + log.id + '/update',
                    log: log,
                    breadcrumbs: breadcrumbs,
                    controller: req.options.controller
                });
            });
    },

    /**
     *
     * @param req
     * @param res
     */
    insert: function (req, res) {
        Log.create(req.params.all(), function createCB(err, log) {
            if (err) {
                return res.serverError(err);
            }

            return res.redirect('/admin/log');
        });
    },

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Log.update({id: id}, req.params.all(), function afterwards(err, logs) {
            if (err) {
                return res.serverError(err);
            }

            return res.redirect('/admin/log');
        })
    },

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
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

                return res.redirect('/admin/log');
            });

        });
    }
};
