/**
* UsersQuest.js
*
* @description :: usersQuest model imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'userQuest',

  attributes: {
    id : {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    usersId : {
      type: 'integer',
      index: true,
      columnName: 'users_id'
    },
    questsId : {
      type: 'integer',
      index: true,
      columnName: 'quests_id'
    },
    status : {
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
