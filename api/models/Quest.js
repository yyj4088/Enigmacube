/**
* Quests.js
*
* @description :: quests model imported from localhost MySql server at 15/10/2015 16:17:5.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  tableName: 'quest',

  attributes: {
    id : {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    elementsIdStart : {
      type: 'integer',
      columnName: 'elements_id_start'
    },
    elementsIdStop : {
      type: 'integer',
      columnName: 'elements_id_stop'
    },
    title : {
      type: 'string',
      size: 255
    },
    type : {
      type: 'integer'
    },
    level : {
      type: 'integer'
    },
    money : {
      type: 'integer'
    },
    xp : {
      type: 'integer'
    },
    questsIdParent : {
      type: 'integer',
      columnName: 'quests_id_parent'
    },
    status : {
      type: 'integer'
    },
    function : {
      type: 'text'
    },
    articlesStart : {
      type: 'text',
      columnName: 'articles_start'
    },
    articlesStop : {
      type: 'text',
      columnName: 'articles_stop'
    },
    articlesHelp : {
      type: 'text',
      columnName: 'articles_help'
    },
    audiosStart : {
      type: 'string',
      size: 255,
      columnName: 'audios_start'
    },
    audiosStop : {
      type: 'string',
      size: 255,
      columnName: 'audios_stop'
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
