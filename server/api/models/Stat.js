module.exports = {

    tableName: 'stat',

    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: 'json'
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
            model: 'user'
        }
    }
};
