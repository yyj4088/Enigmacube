/**
 * Articles.js
 *
 * @description :: articles controller imported from localhost MySql server at 15/10/2015 16:17:4.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {

    index: function (req, res) {
        Article.find().sort('createdAt DESC').exec(function indexCB(err, articles) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Articles',
                active: true
            }];

            res.view('article/index', {
                articles: articles,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
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

        Article.findOne(id).exec(function editCB(err, article) {
            if (err) {
                return res.serverError(err);
            }

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
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        Article.create(req.params.all(), function createCB(err, article) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/article');
        })
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

            res.redirect('/admin/article');
        })
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

                res.redirect('/admin/article');
            });

        });
    }
};
