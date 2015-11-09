module.exports = {

    tableName: 'quest',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: 'string',
            size: 255
        },
        comment: {
            type: 'text'
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
