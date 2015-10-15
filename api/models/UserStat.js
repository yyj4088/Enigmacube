/**
* UsersStats.js
*
* @description :: usersStats model imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'userStat',

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
    move : {
      type: 'integer'
    },
    buyDrug : {
      type: 'integer',
      columnName: 'buy_drug'
    },
    sellDrug : {
      type: 'integer',
      columnName: 'sell_drug'
    },
    buyBuilding : {
      type: 'integer',
      columnName: 'buy_building'
    },
    sellBuilding : {
      type: 'integer',
      columnName: 'sell_building'
    },
    buyItem : {
      type: 'integer',
      columnName: 'buy_item'
    },
    sellItem : {
      type: 'integer',
      columnName: 'sell_item'
    },
    victory : {
      type: 'integer'
    },
    defeat : {
      type: 'integer'
    },
    mission : {
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
