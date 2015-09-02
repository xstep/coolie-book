/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-04-29 14:23
 */


'use strict';

var express = require('./express.js');
var routers = require('./routers.js');
var howdo = require('howdo');
var configs = require('../configs.js');
var cache = require('ydr-utils').cache;
var pkg = require('../package.json');

cache.config({
    debug: 'local' === configs.env
});

cache.set('app.configs', configs);

module.exports = function () {
    howdo
        .task(express)
        .task(routers)
        .follow(function (err, app) {
            if (err) {
                console.error(err);
                return process.exit(-1);
            }

            console.log('\n############################################');
            console.log(pkg.name + '@' + pkg.version, 'http://localhost:' + configs.port);
            console.log('############################################\n');
        });
};

  