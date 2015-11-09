module.exports = {

    tableName: 'user_stuff',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            model: 'user',
            required: true
        },
        stuff: {
            model: 'stuff',
            required: true
        },
        name: {
            type: 'string',
            size: 255
        },
        bullet: {
            type: 'integer'
        },
        status: {
            type: 'integer'
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
        }
    }
};
