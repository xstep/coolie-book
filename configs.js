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
    api: {
        dangkrServer: {
            local: 'http://192.168.2.21:8080',
            dev: 'http://192.168.2.21:8080',
            test: 'http://test.dangkr.com',
            pro: 'http://service.dangkr.com'
        }[env]
    },
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


