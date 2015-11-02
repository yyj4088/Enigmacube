module.exports = {

    index: function (req, res) {
        Quest.find().sort('createdAt DESC').exec(function indexCB(err, quests) {
            if (err) {
                return res.serverError(err);
            }

            var breadcrumbs = [{
                title: 'Quests',
                active: true
            }];

            res.view('quest/index', {
                quests: quests,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller,
                alert: req.query.alert
            });
        });
    },

    create: function (req, res) {
        var breadcrumbs = [{
            title: 'Quests',
            link: '/admin/quest'
        }, {
            title: 'nouvelle quest',
            active: true
        }];

        res.view('quest/form', {
            action: '/admin/quest',
            breadcrumbs: breadcrumbs,
            controller: req.options.controller
        });
    },

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

            res.view('quest/form', {
                action: '/admin/quest/' + quest.id + '/update',
                quest: quest,
                breadcrumbs: breadcrumbs,
                controller: req.options.controller
            });
        });
    },

    insert: function (req, res) {
        Quest.create(req.params.all(), function createCB(err, quest) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/quest');
        })
    },

    update: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Quest.update({id: id}, req.params.all(), function afterwards(err, quests) {
            if (err) {
                return res.serverError(err);
            }

            res.redirect('/admin/quest');
        })
    },

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

                res.redirect('/admin/quest');
            });

        });
    }

};
