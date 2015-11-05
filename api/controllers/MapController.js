module.exports = {

    /**
     *
     * @param req
     * @param res
     */
    index: function (req, res) {
        var breadcrumbs = [{
            title: 'Maps',
            active: true
        }];

        res.view('map/index', {
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
            options = {
                sort: {id: 'desc'},
                or: [
                    {id: {'contains': search.value}},
                    {name: {'contains': search.value}},
                    {comment: {'contains': search.value}},
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
                    options.sort = {comment: order[0].dir};
                    break;
                case '3':
                    options.sort = {createdAt: order[0].dir};
                    break;
                case '4':
                    options.sort = {updatedAt: order[0].dir};
                    break;
            }
        }

        Map.find(options)
            .paginate({page: page, limit: limit})
            .then(function (rows) {
                var count = Map.count(),
                    filter = Map.count(options);
                return [rows, count, filter];
            })
            .spread(function (rows, count, filter) {

                var list = [];

                if (rows.length) {
                    rows.forEach(function (row) {
                        list.push([
                            row.id,
                            '<a href="/admin/map/' + row.id + '">' + row.name + '</a>',
                            row.comment,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/map/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/map/' + row.id + '/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
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

    /**
     *
     * @param req
     * @param res
     */
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

    /**
     *
     * @param req
     * @param res
     */
    insert: function (req, res) {
        Map.create(req.params.all(), function createCB(err, map) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/map');
        })
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

        Map.update({id: id}, req.params.all(), function afterwards(err, maps) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/map');
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
