/**
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
    var $navAction = selector.query('#navAction')[0];
    var $main = selector.query('#main')[0];
    var $content = selector.query('#content')[0];
    var $nav = selector.query('#nav')[0];
    var history = window.history;
    var APP = window.APP;
    var navMap = {};
    var lastURL = location.pathname;
    var navActive = false;
    var activeClass = 'active';


    // 实现 nav
    var buildNav = function () {
        var $navLinks = selector.query('#nav a');

        $navLinks.forEach(function ($link) {
            var href = attribute.attr($link, 'href');

            navMap[href] = selector.parent($link)[0];
        });

        event.on($navAction, 'click', function () {
            attribute[(navActive ? 'remove' : 'add') + 'Class']($nav, activeClass);
            navActive = !navActive;
        });
    };

    // 监听 pathname
    var listenNav = function () {
        var pathname = location.pathname;
        var $navItem = navMap[pathname];

        attribute.removeClass($navs, activeClass);
        attribute.addClass($navItem, activeClass);

        if (navActive) {
            attribute.removeClass($nav, activeClass);
            navActive = false;
        }
    };

    var buildProgress = (function () {
        var $progress = selector.query('#progress')[0];
        var nextFrame = 0;

        return {
            start: function () {
                attribute.css($progress, {
                    opacity: 1,
                    width: 0
                });
                controller.clearFrame(nextFrame);
                nextFrame = controller.nextFrame(function () {
                    attribute.css($progress, 'width', '10%');
                });
            },
            done: function () {
                attribute.css($progress, 'width', '100%');
                controller.clearFrame(nextFrame);
                nextFrame = controller.nextFrame(function () {
                    attribute.css($progress, 'opacity', 0);
                });
            }
        };
    }());

    // 获取页面
    var getPage = function (url) {
        buildProgress.start();
        xhr.ajax({
            url: url,
            cache: true
        }).on('success', function (json) {
            attribute.html($content, json.content);
            document.title = (json.pageName ? json.pageName + ' - ' : '') + APP.title;
            listenNav();
            controller.nextFrame(function () {
                attribute.scrollTop($main, 0);
                buildPrettify();
            });
        }).on('error', function () {
            alert('页面内容获取失败');
        }).on('finish', function () {
            buildProgress.done();
        });
    };

    // 实现页面
    var buildPage = function () {
        var $nav = selector.query('#nav')[0];
        var onclick = function () {
            var url = attribute.attr(this, 'href');

            if (location.pathname === url) {
                return false;
            }

            history.pushState({}, null, url);
            getPage(url);
            return false;
        };

        event.on($nav, 'click', 'a', onclick);
        event.on(document, 'click', '.j-pjax', onclick);

        event.on(window, 'popstate', function (eve) {
            var url = location.pathname;

            if (url === lastURL) {
                return;
            }

            lastURL = url;
            getPage(url);
        });
    };

    // 语法高亮
    var buildPrettify = function () {
        return new Prettify('#main pre');
    };

    buildNav();
    buildPage();
    buildPrettify();
    listenNav();
});