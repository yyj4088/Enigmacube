module.exports = {

    tableName: 'map',

    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
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
        small: {
            type: 'boolean',
            index: true
        },
        backgroundPx: {
            type: 'string',
            size: 255
        },
        backgroundNx: {
            type: 'string',
            size: 255
        },
        backgroundPy: {
            type: 'string',
            size: 255
        },
        backgroundNy: {
            type: 'string',
            size: 255
        },
        backgroundPz: {
            type: 'string',
            size: 255
        },
        backgroundNz: {
            type: 'string',
            size: 255
        },
        module: {
            type: 'string',
            size: 255
        },
        action: {
            type: 'text'
        },
        script: {
            type: 'text'
        },
        bot: {
            type: 'integer'
        },
        title: {
            type: 'string',
            size: 255
        },
        image: {
            type: 'string',
            size: 255
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
            model: 'zone',
            required: true
        }
    }
};
