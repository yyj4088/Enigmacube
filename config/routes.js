module.exports.routes = {

    '/': 'AuthController.login',


    // Auth
    'get /login': 'AuthController.login',
    'get /logout': 'AuthController.logout',
    'get /register': 'AuthController.register',

    'post /auth/local': 'AuthController.callback',
    'post /auth/local/:action': 'AuthController.callback',

    'get /auth/:provider': 'AuthController.provider',
    'get /auth/:provider/callback': 'AuthController.callback',
    'get /auth/:provider/:action': 'AuthController.callback',


    // Dashboard
    'get /admin': 'DashboardController.index',


    // Article
    'get /admin/article': 'ArticleController.index',
    'post /admin/article/list': 'ArticleController.list',

    'get /admin/article/new': 'ArticleController.create',
    'post /admin/article': 'ArticleController.insert',

    'get /admin/article/:id': 'ArticleController.edit',
    'post /admin/article/:id/update': 'ArticleController.update',
    'put /admin/article/:id': 'ArticleController.update',

    'get /admin/article/:id/delete': 'ArticleController.delete',
    'delete /admin/article/:id': 'ArticleController.delete',


    // Log
    'get /admin/log': 'LogController.index',
    'post /admin/log/list': 'LogController.list',

    'get /admin/log/new': 'LogController.create',
    'post /admin/log': 'LogController.insert',

    'get /admin/log/:id': 'LogController.edit',
    'post /admin/log/:id/update': 'LogController.update',
    'put /admin/log/:id': 'LogController.update',

    'get /admin/log/:id/delete': 'LogController.delete',
    'delete /admin/log/:id': 'LogController.delete',


    // Map
    'get /admin/map': 'MapController.index',
    'post /admin/map/list': 'MapController.list',

    'get /admin/map/new': 'MapController.create',
    'post /admin/map': 'MapController.insert',

    'get /admin/map/:id': 'MapController.edit',
    'post /admin/map/:id/update': 'MapController.update',
    'put /admin/map/:id': 'MapController.update',

    'get /admin/map/:id/delete': 'MapController.delete',
    'delete /admin/map/:id': 'MapController.delete',


    // Quest
    'get /admin/quest': 'QuestController.index',
    'post /admin/quest/list': 'QuestController.list',

    'get /admin/quest/new': 'QuestController.create',
    'post /admin/quest': 'QuestController.insert',

    'get /admin/quest/:id': 'QuestController.edit',
    'post /admin/quest/:id/update': 'QuestController.update',
    'put /admin/quest/:id': 'QuestController.update',

    'get /admin/quest/:id/delete': 'QuestController.delete',
    'delete /admin/quest/:id': 'QuestController.delete',


    // Stat
    'get /admin/stat': 'StatController.index',
    'post /admin/stat/list': 'StatController.list',

    'get /admin/stat/new': 'StatController.create',
    'post /admin/stat': 'StatController.insert',

    'get /admin/stat/:id': 'StatController.edit',
    'post /admin/stat/:id/update': 'StatController.update',
    'put /admin/stat/:id': 'StatController.update',

    'get /admin/stat/:id/delete': 'StatController.delete',
    'delete /admin/stat/:id': 'StatController.delete',


    // Stuff
    'get /admin/stuff': 'StuffController.index',
    'post /admin/stuff/list': 'StuffController.list',

    'get /admin/stuff/new': 'StuffController.create',
    'post /admin/stuff': 'StuffController.insert',

    'get /admin/stuff/:id': 'StuffController.edit',
    'post /admin/stuff/:id/update': 'StuffController.update',
    'put /admin/stuff/:id': 'StuffController.update',

    'get /admin/stuff/:id/delete': 'StuffController.delete',
    'delete /admin/stuff/:id': 'StuffController.delete',


    /**
     * User
     */
    // index and list
    'get /admin/user': 'UserController.index',
    'post /admin/user/list': 'UserController.list',

    // create
    'get /admin/user/new': 'UserController.create',
    'post /admin/user': 'UserController.insert',

    // edit
    'get /admin/user/:id': 'UserController.edit',
    'post /admin/user/:id/update': 'UserController.update',
    'put /admin/user/:id': 'UserController.update',

    // delete
    'get /admin/user/:id/delete': 'UserController.delete',
    'delete /admin/user/:id': 'UserController.delete',

    // stuff
    'post /admin/user/:id/stuff': 'UserController.listStuff',
    'post /admin/user/:id/stuff/add': 'UserController.insertStuff',
    'post /admin/user/:id/stuff/delete': 'UserController.deleteStuff',
    'delete /admin/user/:id/stuff': 'UserController.deleteStuff',

    // quest
    'post /admin/user/:id/quest': 'UserController.listQuest',
    'post /admin/user/:id/quest/add': 'UserController.insertQuest',
    'post /admin/user/:id/quest/delete': 'UserController.deleteQuest',
    'delete /admin/user/:id/quest': 'UserController.deleteQuest',

    // stat
    'post /admin/user/:id?/stat': 'StatController.list',

    // log
    'post /admin/user/:id?/log': 'LogController.list',


    // Zone
    'get /admin/zone': 'ZoneController.index',
    'post /admin/zone/list': 'ZoneController.list',

    'get /admin/zone/new': 'ZoneController.create',
    'post /admin/zone': 'ZoneController.insert',

    'get /admin/zone/:id': 'ZoneController.edit',
    'post /admin/zone/:id/update': 'ZoneController.update',
    'put /admin/zone/:id': 'ZoneController.update',

    'get /admin/zone/:id/delete': 'ZoneController.delete',
    'delete /admin/zone/:id': 'ZoneController.delete',


    // File
    'post /admin/user/:id/avatar': 'FileController.setAvatar',
    'get /admin/user/:id/avatar': 'FileController.deleteAvatar',
    'get /images/avatar/:id': 'FileController.getAvatar',

    'post /admin/user/:id/skin': 'FileController.setSkin',
    'get /admin/user/:id/skin': 'FileController.deleteSkin',
    'get /images/skin/:id': 'FileController.getSkin'

};
