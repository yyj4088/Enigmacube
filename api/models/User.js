var User = {
    schema: true,

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: 'string',
            unique: true,
            required: true
        },
        email: {
            type: 'email',
            unique: true,
            required: true
        },
        passports: {
            collection: 'Passport',
            via: 'user'
        },
        headers: {
            type: 'json'
        },
        ip: {
            type: 'string',
            size: 20,
            index: true
        },
        avatar: {
            type: 'string',
            size: 255
        },
        avatarFile: {
            type: 'string',
            size: 255
        },
        skin: {
            type: 'string',
            size: 255
        },
        skinFile: {
            type: 'string',
            size: 255
        },
        comment: {
            type: 'string',
            size: 255
        },
        x: {
            type: 'float',
            required: true
        },
        y: {
            type: 'float',
            required: true
        },
        z: {
            type: 'float',
            required: true
        },
        speed: {
            type: 'float'
        },
        gravity: {
            type: 'float'
        },
        directionX: {
            type: 'float'
        },
        directionY: {
            type: 'float'
        },
        hp: {
            type: 'integer'
        },
        hpMax: {
            type: 'integer'
        },
        mp: {
            type: 'integer'
        },
        mpMax: {
            type: 'integer'
        },
        xp: {
            type: 'integer'
        },
        money: {
            type: 'integer'
        },
        moneyBank: {
            type: 'integer'
        },
        level: {
            type: 'integer'
        },
        stuff: {
            model: 'userStuff'
        },
        zone: {
            model: 'zone',
            required: true
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

module.exports = User;
