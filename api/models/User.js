var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        username: {type: 'string', unique: true},
        email: {type: 'email', unique: true},
        passports: {collection: 'Passport', via: 'user'},
        ip : {
            type: 'string',
            size: 20
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
            type: 'integer'
        },
        positionX: {
            type: 'float',
            columnName: 'position_x'
        },
        positionY: {
            type: 'float',
            columnName: 'position_y'
        },
        positionZ: {
            type: 'float',
            columnName: 'position_Z'
        },
        speed: {
            type: 'float'
        },
        gravity: {
            type: 'float'
        },
        currentDirectionX: {
            type: 'float',
            columnName: 'current_direction_x'
        },
        hp: {
            type: 'integer'
        },
        hpMax: {
            type: 'integer',
            columnName: 'hp_max'
        },
        mp: {
            type: 'integer'
        },
        mpMax: {
            type: 'integer',
            columnName: 'mp_max'
        },
        xp: {
            type: 'integer'
        },
        money: {
            type: 'integer'
        },
        moneyBank: {
            type: 'integer',
            columnName: 'money_bank'
        },
        level: {
            type: 'integer'
        },
        stuffsIdHandLeft: {
            type: 'integer',
            columnName: 'stuffs_id_hand_left'
        },
        stuffsIdHandRight: {
            type: 'integer',
            columnName: 'stuffs_id_hand_right'
        },
        stuffsCountHandLeft: {
            type: 'integer',
            columnName: 'stuffs_count_hand_left'
        },
        stuffsCountHandRight: {
            type: 'integer',
            columnName: 'stuffs_count_hand_right'
        },
        zonesId: {
            type: 'integer',
            columnName: 'zones_id'
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
