/**
* Names.js
*
* @description :: names model imported from localhost MySql server at 15/10/2015 16:17:4.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'name',

  attributes: {
    id : {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name : {
      type: 'string',
      size: 128
    },
    frequency : {
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
