/**
* Stuffs.js
*
* @description :: stuffs model imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'stuff',

  attributes: {
    id : {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name : {
      type: 'string',
      size: 255
    },
    comment : {
      type: 'text'
    },
    image : {
      type: 'string',
      size: 255
    },
    hp : {
      type: 'integer'
    },
    ammo : {
      type: 'integer'
    },
    createdAt: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    },
    updatedAt: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    }
  }
};
