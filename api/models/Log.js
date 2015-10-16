/**
* UsersLogs.js
*
* @description :: usersLogs model imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'userLog',

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
    elementId : {
      type: 'integer',
      columnName: 'element_id'
    },
    type : {
      type: 'string',
      size: 255
    },
    date : {
      type: 'datetime'
    },
    x : {
      type: 'integer'
    },
    y : {
      type: 'integer'
    },
    z : {
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
