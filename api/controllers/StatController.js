module.exports = {

    index: function (req, res) {
        var breadcrumbs = [{
            title: 'Stats',
            active: true
        }];

        res.view('stat/index', {
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

        Stat.find(options)
            .paginate({page: page, limit: limit})
            .sort(sort)
            .then(function (rows) {
                var count = Stat.count(),
                    filter = Stat.count(options);
                return [rows, count, filter];
            })
            .spread(function (rows, count, filter) {

                var list = [];

                if (rows.length) {
                    rows.forEach(function (row) {
                        list.push([
                            row.id,
                            '<a href="/admin/stat/' + row.id + '">' + row.title + '</a>',
                            row.user.username,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/stat/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/stat/' + row.id + '/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
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
