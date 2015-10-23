module.exports = {

    tableName: 'stuff',

    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: 'string',
            size: 255
        },
        comment: {
            type: 'text'
        },
        image: {
            type: 'string',
            size: 255
        },
        hp: {
            type: 'integer'
        },
        ammo: {
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
        user: {
            collection: 'user',
            via: 'stuff'
        }
    }
};
