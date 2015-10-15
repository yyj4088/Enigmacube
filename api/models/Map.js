/**
* Map.js
*
* @description :: map model imported from localhost MySql server at 15/10/2015 16:17:4.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'map',

  attributes: {
    id : {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    zonesId : {
      type: 'integer',
      columnName: 'zones_id'
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
    subX : {
      type: 'integer'
    },
    subY : {
      type: 'integer'
    },
    subZ : {
      type: 'integer'
    },
    backgroundPx : {
      type: 'string',
      size: 255,
      columnName: 'background_px'
    },
    backgroundNx : {
      type: 'string',
      size: 255,
      columnName: 'background_nx'
    },
    backgroundPy : {
      type: 'string',
      size: 255,
      columnName: 'background_py'
    },
    backgroundNy : {
      type: 'string',
      size: 255,
      columnName: 'background_ny'
    },
    backgroundPz : {
      type: 'string',
      size: 255,
      columnName: 'background_pz'
    },
    backgroundNz : {
      type: 'string',
      size: 255,
      columnName: 'background_nz'
    },
    module : {
      type: 'string',
      size: 255
    },
    action : {
      type: 'text'
    },
    function : {
      type: 'text'
    },
    bot : {
      type: 'integer'
    },
    title : {
      type: 'string',
      size: 255
    },
    image : {
      type: 'string',
      size: 255
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
