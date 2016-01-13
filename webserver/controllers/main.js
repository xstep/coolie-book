/**
 * main
 * @author ydr.me
 * @create 2015-04-29 15:13
 */


'use strict';

var pkg = require('../../package.json');

// 主页
exports.getIndex = function (req, res, next) {
    res.send(pkg.name + '@' + pkg.version);
};


// book
exports.book = function (name, uri, data) {
    return function (req, res, next) {
        var isAjax = req.headers['x-requested-with'] === 'XMLHttpRequest';

        data.pageName = name;

        if (isAjax) {
            return res.json({
                title: data.title,
                pageName: data.pageName,
                content: data.content
            });
        }

        res.render('book.html', data);
    };
};


