/**
* UsersStuffs.js
*
* @description :: usersStuffs model imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'userStuff',

  attributes: {
    id : {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    usersId : {
      type: 'integer',
      columnName: 'users_id'
    },
    stuffsId : {
      type: 'integer',
      columnName: 'stuffs_id'
    },
    stuffsPosition : {
      type: 'integer',
      columnName: 'stuffs_position'
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
