module.exports = {

    /**
     *
     * @param req
     * @param res
     */
    index: function (req, res) {
        var breadcrumbs = [{
            title: 'Quests',
            active: true
        }];

        return res.view('quest/index', {
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
                    {title: {'contains': search.value}},
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
                    options.sort = {title: order[0].dir};
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

        Quest.find(options)
            .paginate({page: page, limit: limit})
            .then(function (rows) {
                var count = Quest.count(),
                    filter = Quest.count(options);
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
                            '<a href="/admin/quest/' + row.id + '">' + row.title + '</a>',
                            row.comment,
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/quest/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/quest/' + row.id + '/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
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
            title: 'Quests',
            link: '/admin/quest'
        }, {
            title: 'nouvelle quest',
            active: true
        }];

        return res.view('quest/form', {
            action: '/admin/quest',
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

        Quest.findOne(id).exec(function editCB(err, quest) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Quests',
                link: '/admin/quest'
            }, {
                title: quest.name,
                active: true
            }];

            quest.createdAt = Helper.date(quest.createdAt);
            quest.updatedAt = Helper.date(quest.updatedAt);

            return res.view('quest/form', {
                action: '/admin/quest/' + quest.id + '/update',
                quest: quest,
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
        Quest.create(req.params.all(), function createCB(err, quest) {
            if (err) {
                return res.serverError(err);
            }

            return res.redirect('/admin/quest');
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

        Quest.update({id: id}, req.params.all(), function afterwards(err, quests) {
            if (err) {
                return res.serverError(err);
            }

            return res.redirect('/admin/quest');
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

        Quest.findOne(id).exec(function deleteCB(err, quest) {
            if (err) {
                return res.serverError(err);
            }

            quest.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                return res.redirect('/admin/quest');
            });

        });
    }

};
