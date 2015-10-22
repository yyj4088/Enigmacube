module.exports = {

    tableName: 'quest',

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
        type: {
            type: 'integer'
        },
        level: {
            type: 'integer'
        },
        money: {
            type: 'integer'
        },
        xp: {
            type: 'integer'
        },
        parent: {
            model: 'quest'
        },
        status: {
            type: 'integer'
        },
        script: {
            type: 'text'
        },
        mapStart: {
            model: 'map'
        },
        mapStop: {
            model: 'map'
        },
        articleStart: {
            model: 'article'
        },
        articleStop: {
            model: 'article'
        },
        articleHelp: {
            model: 'article'
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
            collection: 'user',
            via: 'quest'
        }
    }
};
