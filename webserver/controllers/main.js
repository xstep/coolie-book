/**
 * main
 * @author ydr.me
 * @create 2015-04-29 15:13
 */


'use strict';

var Router = require('express').Router;

var router = new Router();
var book = require('../utils/book.js');
var configs = require('../../configs.js');


// book
var buildController = function (name, uri, data) {
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


book.buildRouters(router, buildController, configs.bookroot);


module.exports = router;


