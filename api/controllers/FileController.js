module.exports = {

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    setAvatar: function (req, res) {
        var upload = req.file('avatar'),
            file = upload._files[0].stream,
            headers = file.headers,
            id = req.param('id'),
            date = new Date();

        if (_.indexOf(['image/jpeg', 'image/jpg', 'image/png'], headers['content-type']) === -1) {
            return res.badRequest('No jpg/png');
        }

        upload.upload({
            maxBytes: 10000000,
            dirname: 'avatar/' + date.getFullYear() + '/' + date.getMonth() + '/' + id
        }, function whenDone(err, uploadedFiles) {

            if (err) return res.negotiate(err);
            if (!uploadedFiles.length) return res.badRequest('No file was uploaded');

            var url = require('util').format('%s/images/avatar/%s', sails.getBaseUrl(), id);

            User.update({id: id}, {
                avatar: url,
                avatarFile: uploadedFiles[0].fd
            })
                .exec(function (err) {
                    if (err) return res.negotiate(err);
                    return res.json({
                        success: 1,
                        image: url
                    });
                });
        });
    },

    /**
     *
     * @param req
     * @param res
     */
    getAvatar: function (req, res) {
        req.validate({
            id: 'string'
        });

        User.findOne(req.param('id')).exec(function (err, user) {
            if (err) return res.negotiate(err);
            if (!user || !user.avatarFile) return res.notFound();

            var SkipperDisk = require('skipper-disk'),
                fileAdapter = SkipperDisk();

            fileAdapter.read(user.avatarFile)
                .on('error', function (err) {
                    return res.serverError(err);
                })
                .pipe(res);
        });
    },

    /**
     *
     * @param req
     * @param res
     */
    deleteAvatar: function (req, res) {
        var id = req.param('id');

        User.findOne(id).exec(function (err, user) {
            if (err) return res.negotiate(err);
            if (!user || !user.avatarFile) return res.notFound();

            User.update({id: id}, {
                avatar: null,
                avatarFile: null
            })
                .exec(function (err) {
                    if (err) return res.negotiate(err);
                    return res.json({
                        success: 1,
                        image: null
                    });
                });
        });
    },

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    setSkin: function (req, res) {
        var upload = req.file('skin'),
            file = upload._files[0].stream,
            headers = file.headers,
            id = req.param('id'),
            date = new Date();

        if (_.indexOf(['image/jpeg', 'image/jpg', 'image/png'], headers['content-type']) === -1) {
            return res.badRequest('No jpg/png');
        }

        upload.upload({
            maxBytes: 10000000,
            dirname: 'skin/' + date.getFullYear() + '/' + date.getMonth() + '/' + id
        }, function whenDone(err, uploadedFiles) {

            if (err) return res.negotiate(err);
            if (!uploadedFiles.length) return res.badRequest('No file was uploaded');

            var url = require('util').format('%s/images/skin/%s', sails.getBaseUrl(), id);

            User.update({id: id}, {
                skin: url,
                skinFile: uploadedFiles[0].fd
            })
                .exec(function (err) {
                    if (err) return res.negotiate(err);
                    return res.json({
                        success: 1,
                        image: url
                    });
                });
        });
    },

    /**
     *
     * @param req
     * @param res
     */
    getSkin: function (req, res) {
        req.validate({
            id: 'string'
        });

        User.findOne(req.param('id')).exec(function (err, user) {
            if (err) return res.negotiate(err);
            if (!user || !user.skinFile) return res.notFound();

            var SkipperDisk = require('skipper-disk'),
                fileAdapter = SkipperDisk();

            fileAdapter.read(user.skinFile)
                .on('error', function (err) {
                    return res.serverError(err);
                })
                .pipe(res);
        });
    },

    /**
     *
     * @param req
     * @param res
     */
    deleteSkin: function (req, res) {
        var id = req.param('id');

        User.findOne(id).exec(function (err, user) {
            if (err) return res.negotiate(err);
            if (!user || !user.skinFile) return res.notFound();

            User.update({id: id}, {
                skin: null,
                skinFile: null
            })
                .exec(function (err) {
                    if (err) return res.negotiate(err);
                    return res.json({
                        success: 1,
                        image: null
                    });
                });
        });
    }
};
