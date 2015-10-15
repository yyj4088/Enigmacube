/**
* Articles.js
*
* @description :: articles model imported from localhost MySql server at 15/10/2015 16:17:4.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'article',

  attributes: {
    id : {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    title : {
      type: 'string',
      size: 50
    },
    content : {
      type: 'text'
    },
    reponse : {
      type: 'text'
    },
    status : {
      type: 'integer'
    },
    zonesId : {
      type: 'integer',
      columnName: 'zones_id'
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
