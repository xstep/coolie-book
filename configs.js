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

module.exports = {
    port: 10081,
    env: env,
    bookPath: path.join(__dirname, './book'),
    webroot: path.join(__dirname, './webroot-' + webroot),
    //webroot: path.join(__dirname, './webroot-pro'),
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


