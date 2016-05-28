/**
 * book
 * @author ydr.me
 * @create 2015-09-03 18:31
 */


'use strict';


var ajax = require('blear.core.ajax');
var selector = require('blear.core.selector');
var attribute = require('blear.core.attribute');
var layout = require('blear.core.layout');
var transform = require('blear.core.transform');
var event = require('blear.core.event');
var time = require('blear.utils.time');
var array = require('blear.utils.array');


var navItemEls = selector.query('#nav li');
var navActionEl = selector.query('#navAction')[0];
var mainEl = selector.query('#main')[0];
var contentEl = selector.query('#content')[0];
var navEl = selector.query('#nav')[0];
var history = window.history;
var APP = window.APP;
var navMap = {};
var lastURL = location.pathname;
var navActive = false;
var activeClass = 'active';


// 实现 nav
var buildNav = function () {
    var navLinkEls = selector.query('#nav a');

    array.each(navLinkEls, function (index, linkEl) {
        var href = attribute.attr(linkEl, 'href');

        navMap[href] = selector.parent(linkEl)[0];
    });

    event.on(navActionEl, 'click', function () {
        attribute[(navActive ? 'remove' : 'add') + 'Class'](navEl, activeClass);
        navActive = !navActive;
    });
};

// 监听 pathname
var listenNav = function () {
    var pathname = location.pathname;
    var $navItem = navMap[pathname];

    array.each(navItemEls, function (index, navEl) {
        attribute.removeClass(navEl, activeClass);
    });

    attribute.addClass($navItem, activeClass);

    if (navActive) {
        attribute.removeClass(navEl, activeClass);
        navActive = false;
    }
};

var buildProgress = (function () {
    var progressEl = selector.query('#progress')[0];

    return {
        start: function () {
            transform.transit(progressEl, {
                width: '40%',
                opacity: 1
            });
        },
        done: function () {
            transform.transit(progressEl, {
                width: '100%'
            }, function () {
                attribute.style(progressEl, {
                    width: 0,
                    opacity: 0
                });
            });
        }
    };
}());

// 获取页面
var getPage = function (url) {
    buildProgress.start();
    ajax({
        url: url,
        cache: true,
        onSuccess: function (json) {
            attribute.html(contentEl, json.content);
            document.title = (json.pageName ? json.pageName + ' - ' : '') + APP.title;
            listenNav();
            time.nextFrame(function () {
                layout.scrollTop(mainEl, 0);
                buildPrettify();
            });
        },
        onError: function () {
            alert('页面内容获取失败');
        },
        onComplete: function () {
            buildProgress.done();
        }
    });
};

// 实现页面
var buildPage = function () {
    var navEl = selector.query('#nav')[0];
    var onclick = function () {
        var url = attribute.attr(this, 'href');

        if (location.pathname === url) {
            return false;
        }

        history.pushState({}, null, url);
        lastURL = url;
        getPage(url);
        return false;
    };

    event.on(navEl, 'click', 'a', onclick);
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
    // return new Prettify('#main pre');
};

buildNav();
buildPage();
buildPrettify();
listenNav();