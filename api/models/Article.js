module.exports = {

    tableName: 'article',

    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: 'string',
            size: 255
        },
        content: {
            type: 'text'
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
        },
        zone: {
            model: 'zone'
        }
    }
};
