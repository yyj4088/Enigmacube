module.exports = {

    index: function (req, res) {
        var breadcrumbs = [{
            title: 'Articles',
            active: true
        }];

        res.view('article/index', {
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
                case '2':
                    sort = {status: order[0].dir};
                    break;
                case '4':
                    sort = {createdAt: order[0].dir};
                    break;
                case '5':
                    sort = {updatedAt: order[0].dir};
                    break;
            }
        }

        Article.find(options)
            .populate('zone')
            .paginate({page: page, limit: limit})
            .sort(sort)
            .then(function (rows) {
                var count = Article.count(),
                    filter = Article.count(options);
                return [rows, count, filter];
            })
            .spread(function (rows, count, filter) {

                var list = [];

                if (rows.length) {
                    rows.forEach(function (row) {
                        list.push([
                            row.id,
                            '<a href="/admin/article/' + row.id + '">' + row.title + '</a>',
                            row.status ? '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' : '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
                            row.createdAt,
                            row.updatedAt,
                            '<a href="/admin/article/' + row.id + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="/admin/article/' + row.id + '/delete"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></a>'
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
            title: 'Articles',
            link: '/admin/article'
        }, {
            title: 'nouvelle article',
            active: true
        }];

        res.view('article/form', {
            action: '/admin/article',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

    edit: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Article.findOne(id)
            .then(function (article) {
                var zones = Zone.find().sort('name DESC');
                return [article, zones];
            })
            .spread(function (article, zones) {

                var breadcrumbs = [{
                    title: 'Articles',
                    link: '/admin/article'
                }, {
                    title: article.name,
                    active: true
                }];

                res.view('article/form', {
                    action: '/admin/article/' + article.id + '/update',
                    article: article,
                    zones: zones,
                    breadcrumbs: breadcrumbs,
                    controller: req.options.controller
                });
            })
            .fail(function (err) {
                return res.serverError(err);
            });
    },

    insert: function (req, res) {
        Article.create(req.params.all(), function createCB(err, article) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/article?alert=insert');
        });
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Article.update({id: id}, req.params.all(), function afterwards(err, articles) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/article?alert=save');
        });
    },

    delete: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Article.findOne(id).exec(function deleteCB(err, article) {
            if (err) {
                return res.serverError(err);
            }

            article.destroy(function (err) {
                if (err) {
                    res.serverError(err);
                    return;
                }

                res.redirect('/admin/article?alert=delete');
            });
        });
    }
};
