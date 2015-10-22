module.exports = {

    tableName: 'zone',

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
        x: {
            type: 'integer',
            index: true
        },
        y: {
            type: 'integer',
            index: true
        },
        z: {
            type: 'integer',
            index: true
        },
        parent: {
            model: 'zone'
        },
        audio: {
            type: 'string',
            size: 255
        },
        botMoneyMin: {
            type: 'integer'
        },
        botMoneyMax: {
            type: 'integer'
        },
        background: {
            type: 'string',
            size: 255
        },
        backgroundColor: {
            type: 'string',
            size: 10
        },
        degradation: {
            type: 'integer'
        },
        frequency: {
            type: 'integer'
        },
        script: {
            type: 'text'
        },
        skybox: {
            type: 'integer'
        },
        ambiance: {
            type: 'string',
            size: 10
        },
        sun: {
            type: 'boolean'
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
