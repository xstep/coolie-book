/*!
 * 控制器中间件
 * @author ydr.me
 * @create 2015-04-29 14:33
 */


'use strict';

var urlHelper = require('url');
var REG_ENDXIE = /(\/|\.[^\.\/]+)$/;
var cache = require('ydr-utils').cache;
var configs = cache.get('app.configs');


// 严格 url
exports.strictRouting = function (req, res, next) {
    var urlParser = urlHelper.parse(req.originalUrl);
    var pathname = urlParser.pathname;
    var search = urlParser.search;

    res.set('x-frame-options', 'sameorigin');
    res.set('x-ua-compatible', 'IE=Edge,chrome=1');

    if (!REG_ENDXIE.test(pathname)) {
        return res.redirect(pathname + '/' + (search ? search : ''));
    }

    next();
};


// 检查登录
var REG_API = /^\/api\/.*$/i;
exports.checkLogin = function (req, res, next) {
    next();
};


// 读取缓存
exports.readCache = function (req, res, next) {
    res.locals.$url = urlHelper.parse(req.originalUrl, true, true);
    next();
};


// 404
exports.clientError = function (req, res, next) {
    res.json({code: 404, message: 'page not found'});
};


// 500
exports.serverError = function (err, req, res, next) {
    console.error(err);
    console.log(err.stack);
    res.json({code: err.code || 500, message: err.message || 'server error'});
};
