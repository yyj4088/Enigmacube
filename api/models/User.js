var User = {
    schema: true,

    attributes: {
        username: {
            type: 'string',
            unique: true
        },
        email: {
            type: 'email',
            unique: true
        },
        passports: {
            collection: 'Passport',
            via: 'user'
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
        skin: {
            type: 'string',
            size: 255
        },
        comment: {
            type: 'string',
            size: 255
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
        positionX: {
            type: 'float'
        },
        positionY: {
            type: 'float'
        },
        positionZ: {
            type: 'float'
        },
        speed: {
            type: 'float'
        },
        gravity: {
            type: 'float'
        },
        currentDirectionX: {
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
            model: 'stuff'
        },
        bullet: {
            type: 'integer'
        },
        zone: {
            model: 'zone'
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
        stuffsUser: {
            collection: 'stuff',
            via: 'usersStuff'
        },
        questsUser: {
            collection: 'quest',
            via: 'usersQuest'
        }
    }
};

module.exports = User;
