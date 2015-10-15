/**
* Zones.js
*
* @description :: zones model imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'zone',

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
    x : {
      type: 'integer'
    },
    y : {
      type: 'integer'
    },
    z : {
      type: 'integer'
    },
    idParent : {
      type: 'integer',
      columnName: 'id_parent'
    },
    audio : {
      type: 'string',
      size: 255
    },
    botMoneyMin : {
      type: 'integer',
      columnName: 'bot_money_min'
    },
    botMoneyMax : {
      type: 'integer',
      columnName: 'bot_money_max'
    },
    background : {
      type: 'string',
      size: 255
    },
    backgroundColor : {
      type: 'string',
      size: 10,
      columnName: 'background_color'
    },
    degradation : {
      type: 'integer'
    },
    frequency : {
      type: 'integer'
    },
    function : {
      type: 'text'
    },
    skybox : {
      type: 'integer'
    },
    ambience : {
      type: 'string',
      size: 10
    },
    sun : {
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
