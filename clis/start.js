/*!
 * 启动文件
 * @author ydr.me
 * @create 2014-12-02 22:59
 */


'use strict';

var configs = require('../configs.js');
var supervisor = require('supervisor');
var args = [];

args.push(__filename);
args.push('-w');
args.push('./webserver/,./bookroot/');
args.push('-e');
args.push('js,md');
args.push('app.js');


// 开发环境
if (configs.env === 'local') {
    supervisor.run(args);
}
// 生产环境
else {
    require('../app.js');
}

