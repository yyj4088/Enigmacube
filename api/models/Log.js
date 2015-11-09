module.exports = {

    tableName: 'log',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: 'string',
            size: 50
        },
        content: {
            type: 'text'
        },
        createdAt: {
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        updatedAt: {
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        user: {
            model: 'user',
            required: true
        }
    },

    /**
     *
     * @param id
     * @param title
     * @param content
     * @param callback
     */
    add: function (id, title, content, callback) {
        var params = {
            title: title,
            content: content,
            user: id
        };
        Log.create(params, function createCB(err, log) {
            if (err) {
                return res.serverError(err);
            }

            if (callback) callback(log);
        });
    }
};
