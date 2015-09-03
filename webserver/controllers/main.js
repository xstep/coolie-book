/*!
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
        data.pageName = name;
        res.render('book.html', data);
    };
};


