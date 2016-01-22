/*!
 * 配置文件
 * @author ydr.me
 * @create 2015-07-09 10:57
 */


'use strict';

var path = require('path');
// dev/test/pro
var env = process.env.ENVIRONMENT || 'local';
var webroot = env === 'local' ? 'dev' : 'pro';
var root = __dirname;

module.exports = {
    port: 18083,
    env: env,
    root: root,
    bookroot: path.join(root, './bookroot'),
    webroot: path.join(root, './webroot-' + webroot),
    //webroot: path.join(root, './webroot-pro'),
    cookie: {
        secret: 'xiaomaolv'
    },
    // 1MB
    maxLength: 1024 * 1024,
    weixin: {
        appid: '',
        secret: ''
    }
};


