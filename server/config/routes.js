module.exports.routes = {

    '/':  'AuthController.login',


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
    'get /admin':  'DashboardController.index',


    // Article
    'get /admin/article': 'ArticleController.index',

    'get /admin/article/new': 'ArticleController.create',
    'post /admin/article': 'ArticleController.insert',

    'get /admin/article/:id': 'ArticleController.edit',
    'post /admin/article/:id/update': 'ArticleController.update',
    'put /admin/article/:id': 'ArticleController.update',

    'get /admin/article/:id/delete': 'ArticleController.delete',
    'delete /admin/article/:id': 'ArticleController.delete',


    // Log
    'get /admin/log': 'LogController.index',

    'get /admin/log/new': 'LogController.create',
    'post /admin/log': 'LogController.insert',

    'get /admin/log/:id': 'LogController.edit',
    'post /admin/log/:id/update': 'LogController.update',
    'put /admin/log/:id': 'LogController.update',

    'get /admin/log/:id/delete': 'LogController.delete',
    'delete /admin/log/:id': 'LogController.delete',


    // Map
    'get /admin/map': 'MapController.index',

    'get /admin/map/new': 'MapController.create',
    'post /admin/map': 'MapController.insert',

    'get /admin/map/:id': 'MapController.edit',
    'post /admin/map/:id/update': 'MapController.update',
    'put /admin/map/:id': 'MapController.update',

    'get /admin/map/:id/delete': 'MapController.delete',
    'delete /admin/map/:id': 'MapController.delete',


    // Quest
    'get /admin/quest': 'QuestController.index',

    'get /admin/quest/new': 'QuestController.create',
    'post /admin/quest': 'QuestController.insert',

    'get /admin/quest/:id': 'QuestController.edit',
    'post /admin/quest/:id/update': 'QuestController.update',
    'put /admin/quest/:id': 'QuestController.update',

    'get /admin/quest/:id/delete': 'QuestController.delete',
    'delete /admin/quest/:id': 'QuestController.delete',


    // Stat
    'get /admin/stat': 'StatController.index',

    'get /admin/stat/new': 'StatController.create',
    'post /admin/stat': 'StatController.insert',

    'get /admin/stat/:id': 'StatController.edit',
    'post /admin/stat/:id/update': 'StatController.update',
    'put /admin/stat/:id': 'StatController.update',

    'get /admin/stat/:id/delete': 'StatController.delete',
    'delete /admin/stat/:id': 'StatController.delete',


    // Stuff
    'get /admin/stuff': 'StuffController.index',

    'get /admin/stuff/new': 'StuffController.create',
    'post /admin/stuff': 'StuffController.insert',

    'get /admin/stuff/:id': 'StuffController.edit',
    'post /admin/stuff/:id/update': 'StuffController.update',
    'put /admin/stuff/:id': 'StuffController.update',

    'get /admin/stuff/:id/delete': 'StuffController.delete',
    'delete /admin/stuff/:id': 'StuffController.delete',


    // User
    'get /admin/user': 'UserController.index',

    'get /admin/user/new': 'UserController.create',
    'post /admin/user': 'UserController.insert',

    'get /admin/user/:id': 'UserController.edit',
    'post /admin/user/:id/update': 'UserController.update',
    'put /admin/user/:id': 'UserController.update',

    'get /admin/user/:id/delete': 'UserController.delete',
    'delete /admin/user/:id': 'UserController.delete',


    // Zone
    'get /admin/zone': 'ZoneController.index',

    'get /admin/zone/new': 'ZoneController.create',
    'post /admin/zone': 'ZoneController.insert',

    'get /admin/zone/:id': 'ZoneController.edit',
    'post /admin/zone/:id/update': 'ZoneController.update',
    'put /admin/zone/:id': 'ZoneController.update',

    'get /admin/zone/:id/delete': 'ZoneController.delete',
    'delete /admin/zone/:id': 'ZoneController.delete'

};
