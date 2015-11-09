module.exports = {

    tableName: 'user_quest',

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
        quest: {
            model: 'quest',
            required: true
        },
        title: {
            type: 'string',
            size: 255
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
