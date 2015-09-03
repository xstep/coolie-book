/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-09-03 18:31
 */


define(function (require, exports, module) {
    'use strict';

    var xhr = require('../alien/core/communication/xhr.js');
    var selector = require('../alien/core/dom/selector.js');
    var attribute = require('../alien/core/dom/attribute.js');
    var $navs = selector.query('#nav li');
    var app = {};
    var navMap = {};

    // 实现 nav
    app.buildNav = function () {
        var $navLink = selector.query('#nav a');

        $navLink.forEach(function ($link) {
            var href = $link.href;

            navMap[href] = selector.parent($link);
        });
    };

    // 监听 pathname
    app.listenNav = function () {
        var pathname = location.pathname;
        var className = 'active';
        var $nav = navMap[pathname];

        attribute.removeClass($navs, className);
        attribute.addClass($nav, className)
    };

    app.buildNav();
    app.listenNav();
});