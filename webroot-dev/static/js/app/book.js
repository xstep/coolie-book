/*!
 * book
 * @author ydr.me
 * @create 2015-09-03 18:31
 */


define(function (require, exports, module) {
    'use strict';

    var xhr = require('../alien/core/communication/xhr.js');
    var selector = require('../alien/core/dom/selector.js');
    var attribute = require('../alien/core/dom/attribute.js');
    var event = require('../alien/core/event/touch.js');
    var alert = require('../alien/widgets/alert.js');
    var controller = require('../alien/utils/controller.js');
    var Prettify = require('../alien/ui/prettify/index.js');
    var $navs = selector.query('#nav li');
    var $main = selector.query('#main')[0];
    var $content = selector.query('#content')[0];
    var history = window.history;
    var APP = window.APP;
    var app = {};
    var navMap = {};
    var lastURL = location.pathname;

    // 实现 nav
    app.buildNav = function () {
        var $navLinks = selector.query('#nav a');

        $navLinks.forEach(function ($link) {
            var href = attribute.attr($link, 'href');

            navMap[href] = selector.parent($link)[0];
        });
    };

    // 监听 pathname
    app.listenNav = function () {
        var pathname = location.pathname;
        var className = 'active';
        var $nav = navMap[pathname];

        attribute.removeClass($navs, className);
        attribute.addClass($nav, className);
    };

    // 获取页面
    app.getPage = function (url) {
        xhr.ajax({
            url: url,
            cache: true
        }).on('success', function (json) {
            attribute.html($content, json.content);
            document.title = (json.pageName ? json.pageName + ' - ' : '') + APP.title;
            app.listenNav();
            controller.nextFrame(function () {
                attribute.scrollTop($main, 0);
                app.buildPrettify();
            });
        }).on('error', function () {
            alert('页面内容获取失败');
        });
    };

    // 实现页面
    app.buildPage = function () {
        var $nav = selector.query('#nav')[0];

        event.on($nav, 'click', 'a', function () {
            var url = attribute.attr(this, 'href');

            if (location.pathname === url) {
                return false;
            }

            history.pushState({}, null, url);
            app.getPage(url);
            return false;
        });

        event.on(window, 'popstate', function (eve) {
            var url = location.pathname;

            if (url === lastURL) {
                return;
            }

            lastURL = url;
            app.getPage(url);
        });
    };

    // 语法高亮
    app.buildPrettify = function () {
        new Prettify('#main pre');
    };

    app.buildNav();
    app.buildPage();
    app.buildPrettify();
    app.listenNav();
});