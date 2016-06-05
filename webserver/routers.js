/*!
 * 路由
 * @author ydr.me
 * @create 2015-04-29 14:32
 */


'use strict';

var express = require('express');
var configs = require('../configs.js');
var book = require('./utils/').book;

// 更为详尽配置的静态服务器
var staticOptions = {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html'],
    index: false,
    maxAge: '30d',
    redirect: true
};


module.exports = function (next, app) {
    var controllers = require('./controllers/');

    app.use(controllers.middleware.strictRouting);
    app.use(controllers.middleware.readCache);
    app.all(controllers.middleware.checkLogin);

    book.buildRouters(app, controllers.main.book, configs.bookroot);

    // test

    // 程序路由优先，最后静态路由
    app.use('/', express.static(configs.webroot, staticOptions));


    // 路由终点
    app.use(controllers.middleware.clientError);
    app.use(controllers.middleware.serverError);


    next(null, app);
};
