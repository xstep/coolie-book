/**
 * 启动文件
 * @author ydr.me
 * @create 2014-12-02 22:59
 */


'use strict';


var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

var pkg = require('../package.json');
var configs = require('../configs.js');

var INSTALL_MODULES = 'npm install --registry=http://registry.npm.taobao.org';
var ROOT = path.join(__dirname, '../');
var PM2_JSON = path.join(ROOT, 'pm2.json');
var NODE_MODULES_DIR = path.join(ROOT, 'node_modules');


/**
 * 执行系统命令
 * @param cmds {Array|String} 命令数组
 * @param [callback] {Function} 执行完毕回调
 */
var exec = function (cmds, callback) {
    cmds = typeof(cmds) === 'string' ? [cmds] : cmds;

    var point = 1;
    process.stdout.write('.');
    var interval = setInterval(function () {
        process.stdout.cursorTo(point);
        process.stdout.write('.');
        point++;
    }, 1000);

    childProcess.exec(cmds.join('&&'), function (err, stdout, stderr) {
        clearInterval(interval);
        process.stdout.clearLine();
        process.stdout.write('\n');

        if (err) {
            console.log(err.message);
            return process.exit(1);
        }

        console.log(stdout);
        console.log(stderr);

        if (typeof callback === 'function') {
            callback();
        }
    });
};


/**
 * 检查目录是否为目录
 * @param dir
 * @returns {boolean}
 */
var isDirectory = function (dir) {
    var stat;

    try {
        stat = fs.statSync(dir);
    } catch (err) {
        return false;
    }

    return stat.isDirectory();
};


// 本地启动
var startLocal = function (callback) {
    var supervisor = require('supervisor');
    var args = [];

    args.push(__filename);
    args.push('-w');
    args.push('./webserver/,./bookroot/');
    args.push('-e');
    args.push('js,md');
    args.push('app.js');

    supervisor.run(args);
    callback();
};


// pm2 启动
var startPM2 = function (callback) {
    exec('pm2 start ' + PM2_JSON, callback);
};


// 启动
var start = function () {
    var done = function () {

    };

    if (configs.env === 'local') {
        startLocal(done);
    } else {
        startPM2(done);
    }
};


if (isDirectory(NODE_MODULES_DIR)) {
    exec(INSTALL_MODULES, start);
} else {
    start();
}
